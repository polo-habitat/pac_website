/* P.A.C. — animations natives, zéro dépendance. */
(function () {
  'use strict';

  var reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Choréographie du hero : classe .pret une fois les polices prêtes
     (plafond de 300 ms pour ne jamais retarder le contenu). */
  var arme = false;
  function armer() {
    if (arme) return;
    arme = true;
    requestAnimationFrame(function () {
      document.body.classList.add('pret');
    });
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(armer);
  }
  setTimeout(armer, 300);

  /* En-tête : ombre portée après défilement. */
  var entete = document.querySelector('.entete');
  if (entete) {
    var poser = function () {
      entete.classList.toggle('pose', window.scrollY > 12);
    };
    window.addEventListener('scroll', poser, { passive: true });
    poser();
  }

  /* Menu mobile. */
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav-principale');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var ouvert = nav.classList.toggle('ouvert');
      burger.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
      burger.querySelector('.burger-txt').textContent = ouvert ? 'Fermer' : 'Menu';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('ouvert');
        burger.setAttribute('aria-expanded', 'false');
        burger.querySelector('.burger-txt').textContent = 'Menu';
      }
    });
  }

  /* Révélations au scroll : une seule fois, jamais de layout. */
  var cibles = document.querySelectorAll('.reveal');
  if (cibles.length && 'IntersectionObserver' in window && !reduit) {
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('vu');
          obs.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    cibles.forEach(function (c) { obs.observe(c); });
  } else {
    cibles.forEach(function (c) { c.classList.add('vu'); });
  }

  /* Compteurs frappés (34 ans, etc.) : ease-out-quint. */
  var compteurs = document.querySelectorAll('[data-compte]');
  function animerCompteur(el) {
    var fin = parseInt(el.getAttribute('data-compte'), 10);
    var suffixe = el.getAttribute('data-suffixe') || '';
    if (reduit || !fin) {
      el.textContent = fin + suffixe;
      return;
    }
    var t0 = null, duree = 1400;
    function pas(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / duree, 1);
      var e = 1 - Math.pow(1 - p, 5);
      el.textContent = Math.round(fin * e) + suffixe;
      if (p < 1) requestAnimationFrame(pas);
    }
    requestAnimationFrame(pas);
  }
  if (compteurs.length && 'IntersectionObserver' in window) {
    var obsC = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (e.isIntersecting) {
          animerCompteur(e.target);
          obsC.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    compteurs.forEach(function (c) { obsC.observe(c); });
  } else {
    compteurs.forEach(animerCompteur);
  }

  /* Parallaxe discrète du visuel hero (transform seul, rAF throttlé). */
  var visuel = document.querySelector('.hero-visuel img');
  if (visuel && !reduit && window.matchMedia('(min-width: 56rem)').matches) {
    var tick = false;
    window.addEventListener('scroll', function () {
      if (tick) return;
      tick = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, 900);
        visuel.style.transform = 'translateY(' + y * 0.06 + 'px) scale(1.06)';
        tick = false;
      });
    }, { passive: true });
  }
})();
