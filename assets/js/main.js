/* P.A.C. — moteur d'animations natif, zéro dépendance.
   La classe `js` est posée par un script inline dans <head> ; sans JS tout
   le contenu est visible. Tout est transform/opacity/clip-path, interruptible,
   et désactivé par prefers-reduced-motion. */
(function () {
  'use strict';

  /* Choix client : les animations jouent pour tous, y compris quand l'OS
     signale prefers-reduced-motion (paramètre Windows souvent involontaire).
     Elles restent courtes, interruptibles, et le marquee a un bouton pause. */
  var mqReduit = { matches: false };
  var mqPointeur = window.matchMedia('(pointer: fine)');
  var racine = document.documentElement;

  /* ---------- Split text : mots (statements) et lettres (wordmark) ---------- */
  function splitMots(el) {
    var compteur = 0;
    function traiter(noeud) {
      var enfants = Array.prototype.slice.call(noeud.childNodes);
      enfants.forEach(function (n) {
        if (n.nodeType === 3) {
          var morceaux = n.textContent.split(/(\s+)/);
          var frag = document.createDocumentFragment();
          morceaux.forEach(function (m) {
            if (!m) return;
            if (/^\s+$/.test(m)) {
              frag.appendChild(document.createTextNode(m));
            } else {
              var mot = document.createElement('span');
              mot.className = 'mot';
              var int = document.createElement('span');
              int.className = 'mot-int';
              int.style.setProperty('--i', compteur++);
              int.textContent = m;
              mot.appendChild(int);
              frag.appendChild(mot);
            }
          });
          noeud.replaceChild(frag, n);
        } else if (n.nodeType === 1) {
          traiter(n);
        }
      });
    }
    traiter(el);
    el.classList.add('split');
  }

  function splitLettres(el) {
    var texte = el.textContent;
    el.textContent = '';
    Array.prototype.forEach.call(texte, function (c, i) {
      var lettre = document.createElement('span');
      lettre.className = 'lettre';
      var int = document.createElement('span');
      int.className = 'lettre-int';
      int.style.setProperty('--i', i);
      int.textContent = c;
      lettre.appendChild(int);
      el.appendChild(lettre);
    });
  }

  if (!mqReduit.matches) {
    document.querySelectorAll('.hero-statement, .statement, .banniere h1')
      .forEach(splitMots);
    var wm = document.querySelector('.wordmark');
    if (wm) splitLettres(wm);
    /* figures marquées : révélation au clip-path + parallaxe */
    document.querySelectorAll('.panneau-visuel, .duo figure').forEach(function (f) {
      f.classList.add('img-reveal');
      f.setAttribute('data-parallaxe', '');
    });
  }

  /* ---------- Préloader rideau (une fois par session) ---------- */
  var dejaVu = false;
  try { dejaVu = sessionStorage.getItem('pac_vu') === '1'; } catch (e) {}
  var arme = false;
  function armer() {
    if (arme) return;
    arme = true;
    /* rAF pour caler l'ajout sur une frame, minuteur de secours si le
       rendu est gelé (onglet occulté) */
    requestAnimationFrame(function () { racine.classList.add('pret'); });
    setTimeout(function () { racine.classList.add('pret'); }, 250);
  }

  if (!mqReduit.matches && !dejaVu) {
    try { sessionStorage.setItem('pac_vu', '1'); } catch (e) {}
    var rideau = document.createElement('div');
    rideau.className = 'rideau';
    rideau.setAttribute('aria-hidden', 'true');
    rideau.innerHTML = '<div class="rideau-int"><span class="rideau-logo">P.A.C.</span><span class="rideau-ligne"></span></div>';
    document.body.appendChild(rideau);
    var lever = function () {
      rideau.classList.add('leve');
      setTimeout(armer, 220);
      setTimeout(function () { rideau.remove(); }, 1100);
    };
    if (document.fonts && document.fonts.ready) {
      var fini = false;
      var go = function () { if (!fini) { fini = true; setTimeout(lever, 350); } };
      document.fonts.ready.then(go);
      setTimeout(go, 900);
    } else {
      setTimeout(lever, 700);
    }
  } else {
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(armer);
    setTimeout(armer, 300);
  }

  /* ---------- Menu mobile ---------- */
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

  /* ---------- Révélations au scroll ---------- */
  var cibles = document.querySelectorAll('.reveal, .split, .img-reveal');
  var enAttente = [];
  function reveler(el) {
    el.classList.add('vu', 'split-vu');
    var idx = enAttente.indexOf(el);
    if (idx > -1) enAttente.splice(idx, 1);
    if (el.classList.contains('img-reveal')) {
      /* après la révélation, libérer l'image pour la parallaxe */
      setTimeout(function () {
        el.setAttribute('data-parallaxe-pret', '');
        var im = el.querySelector('img');
        if (im) im.style.transition = 'none';
      }, 1450);
    }
  }
  function toutMontrer() {
    cibles.forEach(reveler);
  }
  if (cibles.length && 'IntersectionObserver' in window && !mqReduit.matches) {
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (e.isIntersecting) {
          reveler(e.target);
          obs.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    cibles.forEach(function (c) {
      /* hero et bannière sont animés par la choréographie de chargement */
      if (c.closest('.hero') || c.closest('.banniere')) return;
      enAttente.push(c);
      obs.observe(c);
    });
  } else {
    toutMontrer();
  }
  /* Balayage de secours : si le rendu a été gelé (onglet occulté) pendant
     un défilement, l'observer peut manquer des éléments déjà passés. */
  function balayer() {
    if (!enAttente.length) return;
    var h = window.innerHeight;
    enAttente.slice().forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < h * 0.94 && r.bottom > 0) reveler(el);
    });
  }
  window.addEventListener('scroll', balayer, { passive: true });
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) setTimeout(balayer, 120);
  });
  setTimeout(balayer, 600);

  /* Les h1 de bannière se révèlent au chargement, comme le hero */
  document.querySelectorAll('.banniere .split').forEach(function (el) {
    setTimeout(function () { el.classList.add('split-vu'); }, dejaVu ? 300 : 1000);
  });

  /* ---------- Compteurs ---------- */
  var compteurs = document.querySelectorAll('[data-compte]');
  function animerCompteur(el) {
    var fin = parseInt(el.getAttribute('data-compte'), 10);
    var suffixe = el.getAttribute('data-suffixe') || '';
    if (mqReduit.matches || !fin) return;
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

  /* ---------- Marquee : pause bouton + pause hors viewport ---------- */
  var defile = document.querySelector('.defile');
  var pauseBtn = document.querySelector('.defile-pause');
  if (defile && pauseBtn) {
    var enPause = false;
    if (!mqReduit.matches) {
      defile.querySelector('.defile-piste').style.animation = 'defile 40s linear infinite';
    }
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

  /* ---------- Boucle scroll : engrenages, wordmark, parallaxe ---------- */
  if (!mqReduit.matches) {
    var engrenages = document.querySelectorAll('.engrenage');
    var wordmark = document.querySelector('.wordmark');
    var parallaxes = document.querySelectorAll('[data-parallaxe] img');
    var derniereY = -1;
    function boucle() {
      var y = window.scrollY;
      if (y !== derniereY) {
        derniereY = y;
        engrenages.forEach(function (g) {
          g.style.transform = 'rotate(' + (y * 0.06) + 'deg)';
        });
        if (wordmark) {
          wordmark.style.transform = 'translateX(' + (-y * 0.08) + 'px)';
        }
        var h = window.innerHeight;
        parallaxes.forEach(function (img) {
          /* on ne pilote l'image qu'une fois sa révélation terminée */
          if (!img.closest('[data-parallaxe-pret]')) return;
          var r = img.getBoundingClientRect();
          if (r.bottom < -100 || r.top > h + 100) return;
          var d = (r.top + r.height / 2 - h / 2) / h; /* -0.5 → 0.5 environ */
          img.style.transform = 'translateY(' + (d * -22) + 'px) scale(1.1)';
        });
      }
      requestAnimationFrame(boucle);
    }
    requestAnimationFrame(boucle);
  }

  /* ---------- Curseur personnalisé (pointeur fin) ---------- */
  if (mqPointeur.matches && !mqReduit.matches) {
    var point = document.createElement('div');
    point.className = 'curseur';
    var halo = document.createElement('div');
    halo.className = 'curseur-halo';
    document.body.appendChild(point);
    document.body.appendChild(halo);

    var sx = -100, sy = -100, hx = -100, hy = -100, visible = false;
    document.addEventListener('pointermove', function (e) {
      sx = e.clientX; sy = e.clientY;
      if (!visible) {
        visible = true;
        racine.classList.add('curseur-actif');
        hx = sx; hy = sy;
      }
    }, { passive: true });
    document.addEventListener('pointerleave', function () {
      visible = false;
      racine.classList.remove('curseur-actif');
    });
    (function suivre() {
      hx += (sx - hx) * 0.16;
      hy += (sy - hy) * 0.16;
      point.style.transform = 'translate(' + (sx - 4) + 'px,' + (sy - 4) + 'px)';
      var t = halo.classList.contains('sur-lien') ? 32 : 19;
      halo.style.transform = 'translate(' + (hx - t) + 'px,' + (hy - t) + 'px)';
      requestAnimationFrame(suivre);
    })();
    document.addEventListener('pointerover', function (e) {
      halo.classList.toggle('sur-lien',
        !!e.target.closest('a, button, summary'));
    }, { passive: true });
  }

  /* ---------- Pilules magnétiques ---------- */
  if (mqPointeur.matches && !mqReduit.matches) {
    document.querySelectorAll('.pilule, .plaque, .tel-entete, .defile-pause')
      .forEach(function (el) {
        el.addEventListener('pointermove', function (e) {
          var r = el.getBoundingClientRect();
          var dx = e.clientX - (r.left + r.width / 2);
          var dy = e.clientY - (r.top + r.height / 2);
          el.style.transform = 'translate(' + dx * 0.22 + 'px,' + dy * 0.3 + 'px)';
        });
        el.addEventListener('pointerleave', function () {
          el.style.transform = '';
        });
      });
  }

  /* ---------- Bascule reduced-motion en cours de session ---------- */
  if (mqReduit.addEventListener) {
    mqReduit.addEventListener('change', function (e) {
      if (e.matches) {
        toutMontrer();
        racine.classList.remove('curseur-actif');
      }
    });
  }
})();
