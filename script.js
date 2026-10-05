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
      if (e.metaKey || e.ctrlKey || e.shiftKey || reduce || touch) return;
      e.preventDefault();
      document.body.classList.add('leaving');
      setTimeout(function () { window.location.href = href; }, 180);
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
  $$('[data-email-text]').forEach(function (el) { el.textContent = SITE.email; });
  $$('[data-handle]').forEach(function (el) {
    var url = SITE[el.getAttribute('data-handle')] || '';
    var h = url.replace(/\/+$/, '').split('/').pop().replace(/^@/, '');
    if (h) el.textContent = '@' + h;
  });
  $$('[data-top]').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
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

  /* Home hero video: always loops while visible. If the browser blocks autoplay
     (energy saving mode for example), it starts at the visitor's first touch, click or scroll. */
  var heroVid = $('.hero-video');
  if (heroVid) {
    if (window.matchMedia('(min-width: 821px) and (min-aspect-ratio: 4/5)').matches) heroVid.poster = 'assets/home/hero-wide-poster.jpg';
    heroVid.muted = true;
    var heroVisible = true;
    var playHero = function () { if (heroVisible && heroVid.paused) heroVid.play().catch(function () {}); };
    var kick = function () { playHero(); if (!heroVid.paused) ['pointerdown', 'touchstart', 'keydown', 'scroll'].forEach(function (t) { window.removeEventListener(t, kick); }); };
    ['pointerdown', 'touchstart', 'keydown', 'scroll'].forEach(function (t) { window.addEventListener(t, kick, { passive: true }); });
    heroVid.addEventListener('canplay', playHero);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { heroVisible = en.isIntersecting; if (heroVisible) playHero(); else heroVid.pause(); });
      }).observe(heroVid);
    }
    playHero();
  }

  /* Home category blocks: video plays on hover (or when visible on touch screens) */
  $$('.world video').forEach(function (v) {
    var card = v.parentNode;
    v.muted = true;
    v.addEventListener('error', function () { v.hidden = true; });
    v.addEventListener('playing', function () { v.classList.add('playing'); });
    function start() { v.preload = 'auto'; v.play().catch(function () {}); }
    function stop() { v.pause(); v.classList.remove('playing'); try { v.currentTime = 0; } catch (e) {} }
    if (touch) {
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          entries.forEach(function (en) { if (en.isIntersecting) start(); else stop(); });
        }, { threshold: 0.6 }).observe(card);
      }
    } else {
      card.addEventListener('mouseenter', start);
      card.addEventListener('mouseleave', stop);
      card.addEventListener('focus', start);
      card.addEventListener('blur', stop);
    }
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
    /* On phones, only the most visible video plays, so the page stays smooth */
    var seen = new Map(), playing = null;
    var vio = ('IntersectionObserver' in window && touch) ? new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.intersectionRatio >= 0.6) seen.set(en.target, en.intersectionRatio); else seen.delete(en.target);
      });
      var best = null, max = 0;
      seen.forEach(function (r, v) { if (r > max) { max = r; best = v; } });
      if (best === playing) return;
      if (playing) playing.pause();
      playing = best;
      if (best) best.play().catch(function () {});
    }, { threshold: [0, 0.6, 0.8, 1] }) : null;

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
        media.setAttribute('muted', ''); media.preload = 'none';
        if (it.poster) media.poster = 'assets/' + key + '/' + it.poster;
        media.src = src;
        if (vio) vio.observe(media);
        else {
          tile.addEventListener('mouseenter', function () { media.play().catch(function () {}); });
          tile.addEventListener('mouseleave', function () { media.pause(); });
        }
      } else {
        media = document.createElement('img');
        media.loading = 'lazy'; media.decoding = 'async'; media.alt = it.alt || '';
        media.src = 'assets/' + key + '/sm/' + it.file;
        media.addEventListener('error', function retry(e) {
          media.removeEventListener('error', retry);
          e.stopImmediatePropagation();
          media.addEventListener('error', function () { tile.classList.add('missing'); media.remove(); });
          media.src = src;
        });
      }
      if (isVideo) media.addEventListener('error', function () { tile.classList.add('missing'); media.remove(); });
      tile.appendChild(media);

      var ph = document.createElement('span');
      ph.className = 'ph'; ph.textContent = it.file;
      tile.appendChild(ph);

      tile.addEventListener('click', function () { if (!tile.classList.contains('missing')) openLb(tile); });
      tiles.push(tile);
      reveal(tile);
    });
  }

  /* Gallery: masonry. Each tile goes into the shortest column; the tiles then grow slightly
     so every column ends at the same height (no overlap, no movement, no empty gap). */
  if (tiles.length) {
    var cols = 0;
    var heights = tiles.map(function (t) {
      var r = (t.style.getPropertyValue('--ratio') || '3 / 4').split('/');
      var h = (parseFloat(r[1]) || 4) / (parseFloat(r[0]) || 3);
      t.style.setProperty('--h', (h * 10).toFixed(3));
      return h;
    });
    var layout = function () {
      var w = gallery.clientWidth;
      var n = Math.min(tiles.length, w >= 900 ? 3 : 2);
      if (!w || n === cols) return;
      cols = n;
      gallery.innerHTML = '';
      var colEls = [], sums = [];
      for (var c = 0; c < n; c++) {
        var col = document.createElement('div');
        col.className = 'gcol';
        gallery.appendChild(col);
        colEls.push(col); sums.push(0);
      }
      tiles.forEach(function (t, i) {
        var k = sums.indexOf(Math.min.apply(null, sums));
        colEls[k].appendChild(t);
        sums[k] += heights[i] + 0.06;
      });
    };
    layout();
    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(layout, 120); });
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

  /* Contact form: sent directly through FormSubmit, then a thank-you message replaces the form */
  var form = $('#contact-form');
  if (form) {
    var btn = $('button[type="submit"]', form);
    var status = $('.form-status', form);
    var label = btn.textContent;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      if (d.get('_honey')) return;
      btn.disabled = true;
      btn.textContent = 'Sending...';
      status.textContent = '';
      fetch('https://formsubmit.co/ajax/' + SITE.email, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: d.get('name'),
          brand: d.get('brand') || '-',
          email: d.get('email'),
          message: d.get('message'),
          _subject: 'New collaboration request: ' + (d.get('brand') || d.get('name')),
          _template: 'table',
          _captcha: 'false'
        })
      }).then(function (r) { return r.json(); }).then(function (res) {
        if (String(res.success) !== 'true') throw new Error(res.message || 'Not sent');
        form.classList.add('sent');
        $('.form-done', form).hidden = false;
      }).catch(function () {
        btn.disabled = false;
        btn.textContent = label;
        status.innerHTML = 'Something went wrong. Please email me at <a href="mailto:' + SITE.email + '">' + SITE.email + '</a>.';
      });
    });
  }
})();
