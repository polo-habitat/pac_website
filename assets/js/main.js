/* P.A.C. — animations natives, zéro dépendance. La classe `js` est posée
   par un script inline dans <head> ; sans JS tout le contenu est visible. */
(function () {
  'use strict';

  var mqReduit = window.matchMedia('(prefers-reduced-motion: reduce)');
  var racine = document.documentElement;

  /* Choréographie du hero : classe .pret quand les polices sont prêtes
     (plafond de 300 ms pour ne jamais retarder le contenu). */
  var arme = false;
  function armer() {
    if (arme) return;
    arme = true;
    requestAnimationFrame(function () { racine.classList.add('pret'); });
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(armer);
  }
  setTimeout(armer, 300);

  /* Menu mobile : bascule, fermeture par lien, Échap ou clic extérieur. */
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav-principale');
  function fermerMenu() {
    if (!nav || !nav.classList.contains('ouvert')) return;
    nav.classList.remove('ouvert');
    burger.setAttribute('aria-expanded', 'false');
    burger.querySelector('.burger-txt').textContent = 'Menu';
  }
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var ouvert = nav.classList.toggle('ouvert');
      burger.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
      burger.querySelector('.burger-txt').textContent = ouvert ? 'Fermer' : 'Menu';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') fermerMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('ouvert')) {
        fermerMenu();
        burger.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('ouvert') &&
          !nav.contains(e.target) && !burger.contains(e.target)) {
        fermerMenu();
      }
    });
  }

  /* Révélations au scroll : une seule fois, transform/opacity uniquement. */
  var cibles = document.querySelectorAll('.reveal');
  if (cibles.length && 'IntersectionObserver' in window && !mqReduit.matches) {
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

  /* Compteurs : la valeur finale est dans le HTML (SEO, sans-JS) ;
     le JS repart de zéro et anime en ease-out-quint. */
  var compteurs = document.querySelectorAll('[data-compte]');
  function animerCompteur(el) {
    var fin = parseInt(el.getAttribute('data-compte'), 10);
    var suffixe = el.getAttribute('data-suffixe') || '';
    if (mqReduit.matches || !fin) return; /* le HTML affiche déjà la valeur finale */
    var t0 = null, duree = 1400;
    function pas(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / duree, 1);
      var e = 1 - Math.pow(1 - p, 5);
      el.textContent = Math.round(fin * e) + suffixe;
      if (p < 1) requestAnimationFrame(pas);
    }
    el.textContent = '0' + suffixe;
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
  }

  /* Marquee : bouton pause (WCAG 2.2.2) + pause hors viewport (batterie). */
  var defile = document.querySelector('.defile');
  var pauseBtn = document.querySelector('.defile-pause');
  if (defile && pauseBtn) {
    var enPause = false;
    pauseBtn.addEventListener('click', function () {
      enPause = !enPause;
      defile.classList.toggle('pause', enPause);
      pauseBtn.setAttribute('aria-pressed', enPause ? 'true' : 'false');
      pauseBtn.textContent = enPause ? '▶' : '❚❚';
      pauseBtn.setAttribute('aria-label',
        enPause ? 'Relancer le défilement' : 'Mettre le défilement en pause');
    });
    if ('IntersectionObserver' in window) {
      var obsD = new IntersectionObserver(function (entrees) {
        entrees.forEach(function (e) {
          defile.classList.toggle('pause', enPause || !e.isIntersecting);
        });
      }, { threshold: 0 });
      obsD.observe(defile);
    }
  }

  /* Si l'utilisateur active « réduire le mouvement » en cours de session. */
  if (mqReduit.addEventListener) {
    mqReduit.addEventListener('change', function (e) {
      if (e.matches) {
        cibles.forEach(function (c) { c.classList.add('vu'); });
      }
    });
  }
})();
