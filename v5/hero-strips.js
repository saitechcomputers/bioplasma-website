/* Hero section strips + animated scroll cues (all pages)
   Works with app.js seamless navigation: <main> is swapped without a reload,
   so everything is delegated or re-initialised when <main> changes. */
(function () {
  "use strict";

  var root = document.documentElement;
  var header = document.getElementById("siteHeader");
  function getPill() { return document.getElementById("bioplasmaFloatPill"); }
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var strip = null;
  var sectionObserver = null;

  function smoothTo(el) {
    if (!el) return;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  function findTab(attr, val) {
    return strip ? strip.querySelector("[" + attr + '="' + val + '"]') : null;
  }

  function setActive(tab) {
    if (!strip) return;
    strip.querySelectorAll(".hero-strip-tab").forEach(function (t) {
      var on = t === tab;
      t.classList.toggle("active", on);
      if (on) t.setAttribute("aria-current", "true"); else t.removeAttribute("aria-current");
    });
    var grid = tab && tab.parentElement;
    if (grid && grid.scrollWidth > grid.clientWidth) {
      grid.scrollTo({ left: tab.offsetLeft - 16, behavior: reduceMotion ? "auto" : "smooth" });
    }
  }

  /* ---------- layout measurements ---------- */
  function measure() {
    if (strip && !strip.classList.contains("is-stuck")) root.style.setProperty("--hs-h", strip.getBoundingClientRect().height + "px");
    var dock = document.querySelector(".lilly-cinema-dock");
    if (dock) root.style.setProperty("--dock-h", dock.getBoundingClientRect().height + "px");
    var box = document.querySelector(".subpage-video-hero .container, .lilly-video-hero .container");
    if (box) {
      var pad = parseFloat(getComputedStyle(box).paddingRight) || 0;
      root.style.setProperty("--cue-right", Math.max(16, window.innerWidth - box.getBoundingClientRect().right + pad) + "px");
    }
    placeHomeCue();
  }

  /* Home: park the cue in the free space between the copy column and the product card */
  function placeHomeCue() {
    var cue = document.querySelector(".lilly-video-hero .hero-scroll-cue");
    if (!cue) return;
    var hero = cue.closest("section");
    if (!hero.querySelector(".lilly-cinema-dock")) return;
    var card = hero.querySelector(".lilly-glass-card");
    var hr = hero.getBoundingClientRect();
    var copyRight = 0;
    hero.querySelectorAll(".lilly-trust-row > *, .lilly-hero-ctas > *, .lilly-hero-subtext").forEach(function (k) {
      copyRight = Math.max(copyRight, k.getBoundingClientRect().right);
    });
    var cardRect = card && card.offsetParent ? card.getBoundingClientRect() : null;
    var x = cardRect && cardRect.left > copyRight ? (copyRight + cardRect.left) / 2 : hr.left + hr.width / 2;
    cue.style.left = (x - hr.left) + "px";
    cue.classList.remove("is-hidden");
    var cr = cue.getBoundingClientRect();
    var hits = Array.prototype.some.call(hero.querySelectorAll(".lilly-trust-row > *, .lilly-hero-ctas > *, .lilly-glass-card"), function (el) {
      var r = el.getBoundingClientRect();
      return r.width && !(cr.right < r.left - 8 || cr.left > r.right + 8 || cr.bottom < r.top - 8 || cr.top > r.bottom + 8);
    });
    cue.classList.toggle("is-hidden", hits);
  }

  /* ---------- sticky strip follows the header ---------- */
  function syncSticky() {
    if (!strip || !strip.isConnected || !strip.classList.contains("is-sticky")) return;
    var top = 0;
    var hiding = header && (header.classList.contains("is-collapsed-away") || header.classList.contains("lv-hdr-hide"));
    if (header && !hiding) {
      top = Math.round(header.offsetHeight);
    }
    root.style.setProperty("--stick-top", top + "px");
    var stuck = window.scrollY > 10 && strip.getBoundingClientRect().top <= top + 1;
    strip.classList.toggle("is-stuck", stuck);
    var grid = strip.querySelector(".hero-strip-grid");
    var reserve = 0;
    var pill = getPill();
    if (stuck && pill && pill.classList.contains("is-visible")) {
      var pr = pill.getBoundingClientRect(), gr = grid.getBoundingClientRect();
      var curPad = parseFloat(grid.style.paddingRight) || 0;
      if (pr.width > 0 && pr.left < gr.right) reserve = Math.ceil(gr.right - pr.left + 14);
      else if (curPad) reserve = curPad;
    }
    grid.style.paddingRight = reserve ? reserve + "px" : "";
  }

  var ticking = false;
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function () {
        document.body.classList.toggle("hero-scrolled", window.scrollY > 60);
        syncSticky();
        ticking = false;
      });
    }
    clearTimeout(onScroll.t1); clearTimeout(onScroll.t2);
    onScroll.t1 = setTimeout(syncSticky, 180);
    onScroll.t2 = setTimeout(syncSticky, 450);
  }

  /* ---------- per-page init (runs on load and after every seamless navigation) ---------- */
  function init() {
    strip = document.querySelector("main .hero-strip");
    document.body.classList.toggle("has-hero-strip-page", !!strip);
    if (sectionObserver) { sectionObserver.disconnect(); sectionObserver = null; }

    if (strip) {
      /* Careers: live opening counts */
      strip.querySelectorAll("[data-job-count]").forEach(function (el) {
        var dept = el.getAttribute("data-job-count");
        var n = document.querySelectorAll(dept === "all" ? ".job-card[data-job-dept]" : '.job-card[data-job-dept="' + dept + '"]').length;
        el.textContent = n + (n === 1 ? " opening" : " openings");
      });

      /* About: highlight the section currently in view */
      var tabs = strip.classList.contains("is-sticky")
        ? Array.prototype.slice.call(strip.querySelectorAll('a.hero-strip-tab[href^="#"]')) : [];
      if (tabs.length && "IntersectionObserver" in window) {
        var visible = {};
        sectionObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting ? en.intersectionRatio : 0; });
          var best = null, bestRatio = 0;
          tabs.forEach(function (t) {
            var r = visible[t.getAttribute("href").slice(1)] || 0;
            if (r > bestRatio) { bestRatio = r; best = t; }
          });
          if (best && !best.classList.contains("active")) setActive(best);
        }, { rootMargin: "-30% 0px -45% 0px", threshold: [0, 0.15, 0.4, 0.75] });
        tabs.forEach(function (t) {
          var sec = document.querySelector(t.getAttribute("href"));
          if (sec) sectionObserver.observe(sec);
        });
      }
    }

    document.body.classList.toggle("hero-scrolled", window.scrollY > 60);
    measure();
    syncSticky();
    applyPlaceholders();
    setTimeout(measure, 300);
  }

  /* ---------- delegated clicks (survive <main> swaps) ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!t.closest) return;

    var cue = t.closest(".hero-scroll-cue");
    if (cue) {
      var hero = cue.closest("section");
      var next = hero && hero.nextElementSibling;
      while (next && next.classList.contains("hero-strip")) next = next.nextElementSibling;
      if (next) { e.preventDefault(); smoothTo(next); }
      return;
    }

    var tab = t.closest(".hero-strip-tab");
    if (tab && strip && strip.contains(tab)) {
      var href = tab.getAttribute("href");
      if (href && href.charAt(0) === "#") {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          setActive(tab);
          smoothTo(target);
          if (history.replaceState) history.replaceState(history.state, "", href);
        }
        return;
      }
      var cat = tab.getAttribute("data-strip-cat");
      if (cat) {
        var catPill = document.querySelector('#explorerCategoryPills [data-cat-id="' + cat + '"]');
        if (catPill) catPill.click();
        setActive(tab);
        smoothTo(document.getElementById("medicinesExplorerSection"));
        return;
      }
      var sci = tab.getAttribute("data-strip-sci");
      if (sci) {
        var card = document.querySelector('#scienceCardsMount [data-sci-idx="' + sci + '"]');
        if (card) card.click();
        setActive(tab);
        smoothTo(document.getElementById("platforms"));
        return;
      }
      var job = tab.getAttribute("data-strip-job");
      if (job) {
        var btn = document.querySelector('#careersFilterMount [data-job-filter="' + job + '"]');
        if (btn) btn.click();
        setActive(tab);
        smoothTo(document.getElementById("openings"));
      }
      return;
    }
  });

  /* keep the strip in sync with the page's own filter controls
     (capture phase: app.js re-renders these buttons inside its own click handler) */
  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!strip || !t.closest || t.closest(".hero-strip")) return;
    var pillBtn = t.closest("#explorerCategoryPills [data-cat-id]");
    if (pillBtn) {
      var ct = findTab("data-strip-cat", pillBtn.getAttribute("data-cat-id"));
      if (ct) setActive(ct); else setActive(null);
      return;
    }
    var sciCard = t.closest("#scienceCardsMount [data-sci-idx]");
    if (sciCard) { var st = findTab("data-strip-sci", sciCard.getAttribute("data-sci-idx")); if (st) setActive(st); return; }
    var jobBtn = t.closest("#careersFilterMount [data-job-filter]");
    if (jobBtn) { var jt = findTab("data-strip-job", jobBtn.getAttribute("data-job-filter")); if (jt) setActive(jt); }
  }, true);

  /* Products: hero search feeds the explorer search */
  document.addEventListener("submit", function (e) {
    var form = e.target.closest && e.target.closest("[data-hero-search]");
    if (!form) return;
    e.preventDefault();
    var q = form.querySelector("input").value.trim();
    var allPill = document.querySelector('#explorerCategoryPills [data-cat-id="all"]');
    if (allPill && !allPill.classList.contains("active")) allPill.click();
    var input = document.getElementById("explorerSearchInput");
    if (input) {
      input.value = q;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
    form.querySelector("input").blur(); /* close the phone keyboard so results are visible */
    smoothTo(document.getElementById("medicinesExplorerSection"));
  });

  /* ---------- observers ---------- */
  if ("MutationObserver" in window) {
    var resync = new MutationObserver(function () { syncSticky(); setTimeout(syncSticky, 380); });
    if (header) resync.observe(header, { attributes: true, attributeFilter: ["class"] });
    var watchPill = function () {
      var p = getPill();
      if (p) resync.observe(p, { attributes: true, attributeFilter: ["class"] });
      else setTimeout(watchPill, 500);
    };
    watchPill();

    var main = document.querySelector("main");
    if (main) {
      var pending = null;
      new MutationObserver(function (muts) {
        var swapped = muts.some(function (m) {
          return Array.prototype.some.call(m.addedNodes, function (n) {
            return n.nodeType === 1 && n.matches && n.matches("section.subpage-video-hero, section.lilly-video-hero, nav.hero-strip");
          });
        });
        if (!swapped) return;
        clearTimeout(pending);
        pending = setTimeout(init, 30);
      }).observe(main, { childList: true });
    }
  }

  /* ---------- mobile: same short placeholder in both product searches ---------- */
  var phoneQuery = window.matchMedia("(max-width: 760px)");
  function applyPlaceholders() {
    ["explorerSearchInput", "quickSearchModalInput", "heroSearchInput"].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (!el.hasAttribute("data-ph-desktop")) el.setAttribute("data-ph-desktop", el.getAttribute("placeholder") || "");
      el.setAttribute("placeholder", phoneQuery.matches ? "Search medicines" : el.getAttribute("data-ph-desktop"));
    });
  }
  if (phoneQuery.addEventListener) phoneQuery.addEventListener("change", applyPlaceholders);
  else if (phoneQuery.addListener) phoneQuery.addListener(applyPlaceholders);
  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("[data-open-quick-search]")) setTimeout(applyPlaceholders, 0);
  });

  /* mobile: the keyboard's Search / Enter key closes the keyboard so results are visible */
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" || !phoneQuery.matches) return;
    var t = e.target;
    if (t && (t.id === "explorerSearchInput" || t.id === "quickSearchModalInput")) {
      e.preventDefault();
      t.blur();
    }
  });

  /* mobile: while the on-screen keyboard is open (a text field has focus), hide the
     bottom menu bar, WhatsApp and back-to-top so they don't ride up over the content */
  var TYPING = "input:not([type=checkbox]):not([type=radio]):not([type=button]):not([type=submit]), textarea, select, [contenteditable='true']";
  var kbTimer = null;
  document.addEventListener("focusin", function (e) {
    if (!phoneQuery.matches || !e.target.matches || !e.target.matches(TYPING)) return;
    clearTimeout(kbTimer);
    document.body.classList.add("kb-open");
  });
  document.addEventListener("focusout", function () {
    clearTimeout(kbTimer);
    kbTimer = setTimeout(function () {
      var a = document.activeElement;
      if (!(a && a.matches && a.matches(TYPING))) document.body.classList.remove("kb-open");
    }, 120);
  });
  /* Android: closing the keyboard with the back button keeps focus — watch the viewport too */
  if (window.visualViewport) {
    var fullH = window.visualViewport.height;
    window.visualViewport.addEventListener("resize", function () {
      var h = window.visualViewport.height;
      if (h > fullH) fullH = h;
      if (document.body.classList.contains("kb-open") && h > fullH - 80) document.body.classList.remove("kb-open");
      else if (!document.body.classList.contains("kb-open") && h < fullH - 150 && phoneQuery.matches) {
        var a = document.activeElement;
        if (a && a.matches && a.matches(TYPING)) document.body.classList.add("kb-open");
      }
    });
  }

  /* science picker (phones / tablets): after choosing a platform, bring its animation into view */
  var stackedQuery = window.matchMedia("(max-width: 1120px)");
  document.addEventListener("click", function (e) {
    if (!stackedQuery.matches || !e.target.closest || !e.target.closest("#scienceCardsMount [data-sci-idx]")) return;
    setTimeout(function () {
      var box = document.querySelector(".science-microscope-box");
      if (!box) return;
      var r = box.getBoundingClientRect();
      if (r.top < 70 || r.top > window.innerHeight * 0.55) smoothTo(box);
    }, 60);
  });

  /* ---------- copy protection: block copy / cut / drag of page text ---------- */
  var COPY_OK = "input, textarea, select, [contenteditable='true'], a[href^='tel:'], a[href^='mailto:']";
  function copyAllowed(node) {
    var el = node && (node.nodeType === 1 ? node : node.parentElement);
    return !!(el && el.closest && el.closest(COPY_OK));
  }
  ["copy", "cut"].forEach(function (type) {
    document.addEventListener(type, function (e) {
      var sel = window.getSelection ? window.getSelection() : null;
      var active = document.activeElement;
      if (active && active.matches && active.matches("input, textarea")) return;
      if (sel && sel.rangeCount && copyAllowed(sel.anchorNode) && copyAllowed(sel.focusNode)) return;
      e.preventDefault();
    });
  });
  document.addEventListener("dragstart", function (e) {
    if (!copyAllowed(e.target)) e.preventDefault();
  });
  document.addEventListener("selectstart", function (e) {
    if (!copyAllowed(e.target)) e.preventDefault();
  });

  /* ---------- back-to-top button with scroll-progress ring ---------- */
  var RING = 2 * Math.PI * 21; /* r = 21 in a 48-unit viewBox */
  var topBtn = document.createElement("button");
  topBtn.type = "button";
  topBtn.className = "lv-to-top";
  topBtn.setAttribute("aria-label", "Back to top");
  topBtn.title = "Back to top";
  topBtn.innerHTML =
    '<svg class="lv-to-top-ring" viewBox="0 0 48 48" aria-hidden="true">' +
      '<circle class="lv-to-top-track" cx="24" cy="24" r="21"/>' +
      '<circle class="lv-to-top-bar" cx="24" cy="24" r="21" stroke-dasharray="' + RING.toFixed(2) + '" stroke-dashoffset="' + RING.toFixed(2) + '"/>' +
    '</svg>' +
    '<span class="lv-to-top-core" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg></span>';
  document.body.appendChild(topBtn);
  var topBar = topBtn.querySelector(".lv-to-top-bar");

  function goTop(e) {
    if (e) e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    topBtn.blur();
  }
  topBtn.addEventListener("click", goTop);
  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest(".footer-to-top")) goTop(e);
  });

  function syncTopBtn() {
    var y = window.scrollY;
    var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    var p = Math.min(1, Math.max(0, y / max));
    topBar.style.strokeDashoffset = (RING * (1 - p)).toFixed(2);
    /* visible on every device once the visitor is about one screen down — scrolling up or down */
    topBtn.classList.toggle("is-shown", y > window.innerHeight * 0.9);
    topBtn.classList.toggle("is-done", p > 0.97);
  }

  window.addEventListener("resize", measure);
  window.addEventListener("load", measure);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("scroll", syncTopBtn, { passive: true });
  window.addEventListener("resize", syncTopBtn);
  init();
  syncTopBtn();
})();
