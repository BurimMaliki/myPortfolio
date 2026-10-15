/* ==========================================================================
   RBSoft — frontend behaviour (vanilla, dependency-free)
   Everything here is a presentation layer: the site is fully readable and
   functional with JavaScript disabled or if any block below fails.
   ========================================================================== */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var GLYPHS = '01<>/{}[]#$%&=+*';

  function $(s, c) { return (c || doc).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); }
  function pad(n, w) { n = String(n); while (n.length < w) { n = '0' + n; } return n; }
  function hexByte() { return pad(Math.floor(Math.random() * 256).toString(16).toUpperCase(), 2); }

  /* ---------- 1. Initialisation sequence (presentation layer) ---------- */
  var bootEl = $('#boot');
  var booting = root.classList.contains('booting') && !!bootEl;

  function finishBoot() {
    if (!booting) { return; }
    booting = false;
    bootEl.classList.add('is-done');
    var bar = $('#bootBar');
    var pct = $('#bootPct');
    if (bar) { bar.style.width = '100%'; }
    if (pct) { pct.textContent = '100'; }
    window.setTimeout(function () {
      bootEl.classList.add('is-out');
      window.setTimeout(function () {
        if (bootEl.parentNode) { bootEl.parentNode.removeChild(bootEl); }
        root.classList.remove('booting');
        root.classList.add('boot-done');
        try { window.sessionStorage.setItem('rb-boot', '1'); } catch (e) { /* private mode */ }
        doc.dispatchEvent(new CustomEvent('rb:ready'));
      }, 480);
    }, 240);
  }

  if (booting && !reduced) {
    (function runBoot() {
      var hexWrap = $('#bootHex');
      var bar = $('#bootBar');
      var pct = $('#bootPct');
      var COLS = 8, ROWS = 6, spans = [];
      if (hexWrap) {
        for (var i = 0; i < COLS * ROWS; i++) {
          var s = doc.createElement('span');
          s.textContent = hexByte();
          hexWrap.appendChild(s);
          spans.push(s);
        }
      }
      var DURATION = 880;
      var t0 = null;
      var lastSwap = 0;
      var forced = false;

      function force() { forced = true; }
      window.addEventListener('error', force, { once: true });
      window.setTimeout(function () {
        window.removeEventListener('error', force);
        finishBoot();
      }, 1600); /* hard failsafe: never block the site */

      function frame(t) {
        if (!booting) { return; }
        if (t0 === null) { t0 = t; }
        var p = Math.min((t - t0) / DURATION, 1);
        if (bar) { bar.style.width = (p * 100).toFixed(1) + '%'; }
        if (pct) { pct.textContent = pad(Math.floor(p * 100), 3); }
        if (t - lastSwap > 55 && spans.length) {
          lastSwap = t;
          for (var k = 0; k < 9; k++) {
            var s = spans[Math.floor(Math.random() * spans.length)];
            s.textContent = hexByte();
            s.className = Math.random() < 0.14 ? 'hot' : (Math.random() < 0.3 ? 'dim' : '');
          }
        }
        if (p < 1 && !forced) {
          window.requestAnimationFrame(frame);
        } else {
          finishBoot();
        }
      }
      window.requestAnimationFrame(frame);
    })();
  } else {
    root.classList.remove('booting');
    root.classList.add('boot-done');
    if (bootEl && bootEl.parentNode) { bootEl.parentNode.removeChild(bootEl); }
    /* defer so listeners registered later in this script still receive it */
    window.setTimeout(function () { doc.dispatchEvent(new CustomEvent('rb:ready')); }, 0);
  }

  /* ---------- 2. Character-decode reveal (signature motion) ---------- */
  function decode(el) {
    var original = el.getAttribute('data-text') || el.textContent;
    el.setAttribute('data-text', original);
    if (reduced) { el.textContent = original; return; }
    el.setAttribute('aria-busy', 'true');
    var DURATION = 520;
    var t0 = null;
    function frame(t) {
      if (t0 === null) { t0 = t; }
      var p = Math.min((t - t0) / DURATION, 1);
      var shown = Math.floor(p * original.length);
      var out = original.slice(0, shown);
      for (var i = shown; i < original.length; i++) {
        var ch = original[i];
        out += (ch === ' ' || ch === '\n') ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      el.textContent = out;
      if (p < 1) { window.requestAnimationFrame(frame); }
      else { el.textContent = original; el.removeAttribute('aria-busy'); }
    }
    window.requestAnimationFrame(frame);
  }

  var heroTitle = $('.hero__title[data-decode]');
  if (heroTitle) {
    doc.addEventListener('rb:ready', function () { decode(heroTitle); }, { once: true });
  }
  $$('[data-decode]').forEach(function (el) {
    if (el === heroTitle) { return; }
    if (!('IntersectionObserver' in window)) { return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { decode(el); io.unobserve(el); }
      });
    }, { threshold: 0.6 });
    io.observe(el);
  });

  /* ---------- 3. Restrained reveal-on-scroll ---------- */
  var revealables = $$('[data-reveal]');
  if (revealables.length && 'IntersectionObserver' in window && !reduced) {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          rio.unobserve(en.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealables.forEach(function (el) { rio.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- 4. Scroll-spy for the section navigation ---------- */
  var links = $$('.secnav__link');
  var sections = $$('[data-spy]');
  function setActive(id) {
    links.forEach(function (a) {
      if (a.getAttribute('href') === '#' + id) { a.setAttribute('aria-current', 'true'); }
      else { a.removeAttribute('aria-current'); }
    });
  }
  if (sections.length && 'IntersectionObserver' in window) {
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { setActive(en.target.id); }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { sio.observe(s); });
  }
  setActive('start');

  /* ---------- 5. Hero terminal: live hex stream + progress (decorative) ---------- */
  var stream = $('#hexStream');
  var heroBar = $('#heroBar');
  var heroPct = $('#heroPct');
  var tokens = [];
  if (stream) {
    var lines = stream.textContent.trim().split('\n');
    stream.textContent = '';
    lines.forEach(function (line, li) {
      line.trim().split(/\s+/).forEach(function (tok) {
        var s = doc.createElement('span');
        s.textContent = tok;
        stream.appendChild(s);
        stream.appendChild(doc.createTextNode(' '));
        tokens.push(s);
      });
      if (li < lines.length - 1) { stream.appendChild(doc.createTextNode('\n')); }
    });
  }
  var streamActive = !reduced && tokens.length > 0;
  var heroVisible = true;
  if (stream && 'IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { heroVisible = en.isIntersecting; });
    }, { threshold: 0 });
    vio.observe(stream);
  }
  if (streamActive) {
    window.setInterval(function () {
      if (doc.hidden || !heroVisible) { return; }
      for (var k = 0; k < 5; k++) {
        var s = tokens[Math.floor(Math.random() * tokens.length)];
        s.textContent = hexByte();
        s.className = Math.random() < 0.1 ? 'hot' : '';
      }
    }, 120);
  }
  if (heroBar && heroPct) {
    if (reduced) {
      heroBar.style.width = '100%';
      heroPct.textContent = '100%';
    } else {
      var PERIOD = 7000;
      (function loop(t) {
        if (!doc.hidden && heroVisible) {
          var p = (t % PERIOD) / PERIOD;
          heroBar.style.width = (p * 100).toFixed(0) + '%';
          heroPct.textContent = pad(Math.floor(p * 100), 2) + '%';
        }
        window.requestAnimationFrame(loop);
      })(0);
    }
  }

  /* ---------- 6. Local clock (real system state) ---------- */
  var clock = $('#clock');
  function tick() {
    if (!clock) { return; }
    var d = new Date();
    clock.textContent = pad(d.getHours(), 2) + ':' + pad(d.getMinutes(), 2) + ':' + pad(d.getSeconds(), 2);
  }
  tick();
  window.setInterval(tick, 1000);
})();
