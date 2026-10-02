(function () {
  var SITE = window.SITE || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var touch = window.matchMedia('(hover: none)').matches;

  /* Header */
  var header = $('.site-header');
  var toggle = $('.nav-toggle');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  toggle.addEventListener('click', function () {
    var open = header.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('no-scroll', open);
  });

  /* Page transition: fade out before leaving */
  $$('a[href]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!/\.html$/.test(href) || a.target === '_blank') return;
    a.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || reduce) return;
      e.preventDefault();
      document.body.classList.add('leaving');
      setTimeout(function () { window.location.href = href; }, 280);
    });
  });
  window.addEventListener('pageshow', function () { document.body.classList.remove('leaving'); });

  /* Contact info and footer year */
  $$('[data-email]').forEach(function (el) {
    el.href = 'mailto:' + SITE.email;
    if (el.hasAttribute('data-show')) el.textContent = SITE.email;
  });
  $$('[data-social]').forEach(function (el) {
    el.href = SITE[el.getAttribute('data-social')] || '#';
    el.target = '_blank';
    el.rel = 'noopener';
  });
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* Titles: split into words and letters for the entrance animation */
  $$('[data-split]').forEach(function (el) {
    var text = el.textContent.trim();
    el.setAttribute('aria-label', text);
    el.classList.add('split');
    el.textContent = '';
    var n = 0;
    text.split(' ').forEach(function (word, wi, arr) {
      var w = document.createElement('span');
      w.className = 'w'; w.setAttribute('aria-hidden', 'true');
      word.split('').forEach(function (ch) {
        var c = document.createElement('span');
        c.className = 'c'; c.textContent = ch; c.style.setProperty('--i', n++);
        w.appendChild(c);
      });
      el.appendChild(w);
      if (wi < arr.length - 1) el.appendChild(document.createTextNode(' '));
    });
  });

  /* Scroll reveal */
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 }) : null;
  function reveal(el) {
    if (io && !reduce) io.observe(el); else el.classList.add('in');
  }
  $$('.reveal').forEach(reveal);

  /* Gallery */
  var gallery = $('[data-gallery]');
  var tiles = [];
  if (gallery) {
    var key = gallery.getAttribute('data-gallery');
    var items = (SITE.galleries && SITE.galleries[key]) || [];
    var vio = ('IntersectionObserver' in window && touch) ? new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) en.target.play().catch(function () {});
        else en.target.pause();
      });
    }, { threshold: 0.6 }) : null;

    items.forEach(function (it, i) {
      var src = 'assets/' + key + '/' + it.file;
      var isVideo = /\.(mp4|webm|mov)$/i.test(it.file);
      var tile = document.createElement('button');
      tile.type = 'button';
      tile.className = 'tile' + (isVideo ? ' is-video' : '');
      tile.style.setProperty('--ratio', it.ratio || '3 / 4');
      tile.style.setProperty('--i', i % 6);
      tile.setAttribute('aria-label', it.alt || 'Open');
      tile.dataset.src = src;
      tile.dataset.video = isVideo ? '1' : '';
      tile.dataset.alt = it.alt || '';

      var media;
      if (isVideo) {
        media = document.createElement('video');
        media.muted = true; media.loop = true; media.playsInline = true;
        media.setAttribute('muted', ''); media.preload = 'metadata';
        if (it.poster) media.poster = 'assets/' + key + '/' + it.poster;
        media.src = src;
        if (vio) vio.observe(media);
        else {
          tile.addEventListener('mouseenter', function () { media.play().catch(function () {}); });
          tile.addEventListener('mouseleave', function () { media.pause(); });
        }
      } else {
        media = document.createElement('img');
        media.loading = 'lazy'; media.alt = it.alt || ''; media.src = src;
      }
      media.addEventListener('error', function () { tile.classList.add('missing'); media.remove(); });
      tile.appendChild(media);

      var ph = document.createElement('span');
      ph.className = 'ph'; ph.textContent = it.file;
      tile.appendChild(ph);

      tile.addEventListener('click', function () { if (!tile.classList.contains('missing')) openLb(tile); });
      gallery.appendChild(tile);
      tiles.push(tile);
      reveal(tile);
    });
  }

  /* Gallery: gentle parallax on the tiles */
  if (tiles.length && !reduce && !touch) {
    var speeds = [0.05, -0.035, 0.08, -0.05, 0.03, -0.07];
    var ticking = false;
    var update = function () {
      var mid = window.innerHeight / 2;
      tiles.forEach(function (t, i) {
        var r = t.getBoundingClientRect();
        if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
        var off = (r.top + r.height / 2 - mid) * speeds[i % speeds.length];
        t.style.setProperty('--py', off.toFixed(1) + 'px');
      });
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* Lightbox */
  var lb, stage, current = -1;
  function buildLb() {
    lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.innerHTML = '<button class="lb-close" aria-label="Close">&times;</button>' +
      '<button class="lb-prev" aria-label="Previous">&lsaquo;</button>' +
      '<button class="lb-next" aria-label="Next">&rsaquo;</button><div class="lb-stage"></div>';
    document.body.appendChild(lb);
    stage = $('.lb-stage', lb);
    $('.lb-close', lb).addEventListener('click', closeLb);
    $('.lb-prev', lb).addEventListener('click', function () { step(-1); });
    $('.lb-next', lb).addEventListener('click', function () { step(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
  }
  function usable() { return tiles.filter(function (t) { return !t.classList.contains('missing'); }); }
  function show(tile) {
    stage.innerHTML = '';
    var el;
    if (tile.dataset.video) {
      el = document.createElement('video');
      el.src = tile.dataset.src; el.controls = true; el.autoplay = true; el.loop = true; el.playsInline = true;
    } else {
      el = document.createElement('img');
      el.src = tile.dataset.src; el.alt = tile.dataset.alt;
    }
    stage.appendChild(el);
  }
  function openLb(tile) {
    if (!lb) buildLb();
    var list = usable();
    current = list.indexOf(tile);
    show(tile);
    lb.classList.add('open');
    document.body.classList.add('no-scroll');
  }
  function step(d) {
    var list = usable();
    current = (current + d + list.length) % list.length;
    show(list[current]);
  }
  function closeLb() {
    lb.classList.remove('open');
    stage.innerHTML = '';
    document.body.classList.remove('no-scroll');
  }

  /* Contact form: opens the visitor's mail app */
  var form = $('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var subject = 'Collaboration: ' + (d.get('brand') || 'new brand');
      var body = d.get('message') + '\n\n' + d.get('name') + '\n' + d.get('email');
      window.location.href = 'mailto:' + SITE.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
})();
