/* ============================================================
   BIOPLASMA BIOLOGICALS V2 — "THE FORMULARY" INTERACTIONS
   script.js
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const DATA = window.BIOPLASMA_DATA || { medicines: [], categories: [], quickNeeds: [], technologies: [] };
  const MEDS = DATA.medicines || [];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const CATEGORY_LABELS = {
    bone: 'Bone & Vit D3',
    gastro: 'Gastro & Acid Care',
    womens: "Women's & Maternal",
    hematinic: 'Liposomal Iron',
    probiotic: 'Gut & Probiotic'
  };

  /* ---------- Preloader (fast on repeat page views) ---------- */
  const pre = document.getElementById('preloader');
  const seenPre = sessionStorage.getItem('bp_v2_seen');
  const hidePre = () => {
    if (pre) pre.classList.add('done');
    sessionStorage.setItem('bp_v2_seen', '1');
  };
  if (seenPre) {
    setTimeout(hidePre, 240);
  } else {
    window.addEventListener('load', () => setTimeout(hidePre, 950));
    setTimeout(hidePre, 1450);
  }

  /* Ensure page-sweep resets if restored from bfcache */
  const sweep = document.getElementById('page-sweep');
  window.addEventListener('pageshow', () => {
    sweep?.classList.remove('active');
  });

  /* ---------- Nav scroll state ---------- */
  const navInner = document.querySelector('.nav-inner');
  window.addEventListener('scroll', () => {
    if (!navInner) return;
    navInner.style.boxShadow = window.scrollY > 24
      ? '0 22px 50px -26px rgba(11, 44, 73, 0.48)'
      : 'var(--shadow-soft)';
  }, { passive: true });

  /* ---------- Mobile menu ---------- */
  const burger = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-menu');
  const closeMenu = () => {
    burger?.classList.remove('open');
    menu?.classList.remove('open');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
    burger?.setAttribute('aria-expanded', 'false');
  };
  burger?.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    menu?.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    burger.setAttribute('aria-expanded', String(open));
  });
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  /* ---------- Scroll progress + spine fill ---------- */
  const prog = document.getElementById('scroll-progress');
  const spineFill = document.querySelector('.spine-fill');
  const onScroll = () => {
    const d = document.documentElement;
    const p = d.scrollTop / (d.scrollHeight - d.clientHeight || 1);
    if (prog) prog.style.width = (p * 100) + '%';
    if (spineFill) spineFill.style.height = (p * 100) + '%';
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Spine scrollspy (section label) ---------- */
  const spineLabel = document.getElementById('spine-label');
  const spots = document.querySelectorAll('[data-spine]');
  if (spineLabel && spots.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const t = e.target.getAttribute('data-spine');
          spineLabel.innerHTML = `BIOPLASMA &nbsp;/&nbsp; <b>${t}</b>`;
        }
      });
    }, { threshold: 0.35 });
    spots.forEach(s => spy.observe(s));
  }

  /* ---------- Reveal + mask reveal ---------- */
  const observeReveals = (root = document) => {
    const reveals = root.querySelectorAll('.reveal:not(.visible), .mask:not(.visible)');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      reveals.forEach(el => io.observe(el));
    } else {
      reveals.forEach(el => el.classList.add('visible'));
    }
  };
  observeReveals();

  /* ---------- Number counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dur = 1250;
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = (Number.isInteger(target) ? Math.round(target * eased) : (target * eased).toFixed(0)) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    }, { threshold: 0.55 });
    counters.forEach(c => cio.observe(c));
  }

  /* ---------- Parallax (capsule + glow + media) ---------- */
  const finePointer = window.matchMedia('(pointer:fine)').matches;
  if (!reduce && finePointer) {
    const layers = document.querySelectorAll('[data-parallax]');
    if (layers.length) {
      let mx = 0, my = 0;
      window.addEventListener('mousemove', (e) => {
        mx = e.clientX / window.innerWidth - 0.5;
        my = e.clientY / window.innerHeight - 0.5;
      }, { passive: true });
      const loop = () => {
        const sy = window.scrollY;
        layers.forEach(l => {
          const sp = parseFloat(l.dataset.parallax) || 0.1;
          const rot = l.dataset.rot ? ` rotate(${l.dataset.rot}deg)` : '';
          l.style.transform = `translate(${mx * sp * 38}px, ${my * sp * 38 - sy * sp * 0.22}px)${rot}`;
        });
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }
  } else {
    document.documentElement.classList.add('touch');
  }

  /* ---------- Page transition sweep ---------- */
  const bindPageSweep = (root = document) => {
    root.querySelectorAll('a[href]').forEach(link => {
      if (link.dataset.sweepBound) return;
      link.dataset.sweepBound = '1';
      const href = link.getAttribute('href');
      if (!href) return;
      const baseHref = href.split('?')[0].split('#')[0];
      if (baseHref.endsWith('.html') && !link.target && !link.hasAttribute('download')) {
        link.addEventListener('click', (e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          const currentFile = (window.location.pathname.split('/').pop() || 'index.html');
          if (baseHref === currentFile && href.includes('#')) return;
          e.preventDefault();
          closeMenu();
          sweep?.classList.add('active');
          setTimeout(() => { window.location.href = href; }, 440);
        });
      }
    });
  };
  bindPageSweep();

  /* ============================================================
     FEATURED FORMULATION SPOTLIGHT ROTATOR (Home & Formulary)
     ============================================================ */
  const spotStage = document.querySelector('[data-spotlight]');
  if (spotStage && MEDS.length) {
    const spotIds = (spotStage.getAttribute('data-spotlight') || 'aadirise-d3,pantheta-dsr,bioipc,adenocal-k2').split(',');
    const spotMeds = spotIds.map(id => MEDS.find(m => m.id === id.trim())).filter(Boolean);
    let sIdx = 0;
    let spotTimer = null;

    const imgEl = spotStage.querySelector('.fr-packshot');
    const chipTitle = spotStage.querySelector('.fr-chip b');
    const chipSub = spotStage.querySelector('.fr-chip small');
    const dotsWrap = spotStage.querySelector('.fr-switcher');
    const copyTitle = document.getElementById('spot-copy-title');
    const copyDesc = document.getElementById('spot-copy-desc');
    const copyOpenBtn = document.getElementById('spot-open-btn');
    const copyPdfBtn = document.getElementById('spot-pdf-btn');

    const renderSpot = (idx) => {
      sIdx = (idx + spotMeds.length) % spotMeds.length;
      const m = spotMeds[sIdx];
      if (!m) return;
      if (imgEl) {
        imgEl.style.opacity = '0.25';
        setTimeout(() => {
          imgEl.src = m.image;
          imgEl.alt = `${m.name} packshot`;
          imgEl.style.opacity = '1';
        }, 140);
      }
      if (chipTitle) chipTitle.textContent = m.name;
      if (chipSub) chipSub.textContent = `${m.technology} · ${m.dosageForm}`;
      spotStage.dataset.activeMed = m.id;
      if (copyTitle) copyTitle.textContent = m.name;
      if (copyDesc) copyDesc.textContent = `${m.genericSummary} — ${m.taglineEn}`;
      if (copyOpenBtn) copyOpenBtn.dataset.openMed = m.id;
      if (copyPdfBtn) copyPdfBtn.href = m.pdfUrl;
      dotsWrap?.querySelectorAll('.fr-dot').forEach((d, i) => d.classList.toggle('active', i === sIdx));
    };

    if (dotsWrap && spotMeds.length > 1) {
      dotsWrap.innerHTML = spotMeds.map((m, i) =>
        `<button type="button" class="fr-dot ${i === 0 ? 'active' : ''}" aria-label="Show ${m.name}"></button>`
      ).join('');
      dotsWrap.querySelectorAll('.fr-dot').forEach((btn, i) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          renderSpot(i);
          resetSpotTimer();
        });
      });
    }

    spotStage.addEventListener('click', () => {
      const id = spotStage.dataset.activeMed || spotMeds[sIdx]?.id;
      if (id) openMonograph(id);
    });

    const resetSpotTimer = () => {
      if (spotTimer) clearInterval(spotTimer);
      if (spotMeds.length > 1 && !reduce) {
        spotTimer = setInterval(() => renderSpot(sIdx + 1), 4600);
      }
    };
    renderSpot(0);
    resetSpotTimer();
  }

  /* ============================================================
     DYNAMIC FORMULARY INDEX + FILTERS (products.html)
     ============================================================ */
  const fullFormulary = document.getElementById('full-formulary');
  if (fullFormulary && MEDS.length) {
    const quickBar = document.getElementById('quick-needs-bar');
    const searchInp = document.getElementById('product-search');
    const chips = document.querySelectorAll('.chip[data-filter]');
    const noRes = document.getElementById('no-results');
    const countLbl = document.getElementById('formulary-count');

    let activeCat = 'all';
    let activeNeedId = null;

    if (quickBar && DATA.quickNeeds) {
      quickBar.innerHTML = DATA.quickNeeds.map(n => `
        <button type="button" class="need-pill" data-need="${n.id}">
          <span class="dot" style="background:${n.color}"></span>
          <span>${n.titleEn}</span>
        </button>
      `).join('');
    }

    const renderRows = () => {
      const q = (searchInp?.value || '').toLowerCase().trim();
      const activeNeed = DATA.quickNeeds?.find(n => n.id === activeNeedId);

      const filtered = MEDS.filter(m => {
        let catOk = true;
        if (activeCat === 'rx') {
          catOk = Boolean(m.rxRequired);
        } else if (activeCat !== 'all') {
          catOk = m.category === activeCat || (m.secondaryCategories || []).includes(activeCat);
        }
        const needOk = !activeNeed || activeNeed.medicineIds.includes(m.id);
        const hay = [
          m.name, m.shortTitle, m.genericSummary, m.dosageForm, m.technology,
          m.taglineEn, m.taglineHi, ...(m.keywords || []), ...(m.indications || [])
        ].join(' ').toLowerCase();
        const qOk = !q || hay.includes(q);
        return catOk && needOk && qOk;
      });

      if (countLbl) {
        countLbl.textContent = `Showing ${filtered.length} of ${MEDS.length} formulations`;
      }

      fullFormulary.innerHTML = filtered.map((m, i) => {
        const idxStr = `/ ${String(i + 1).padStart(2, '0')}`;
        const catTag = CATEGORY_LABELS[m.category] || m.category;
        return `
          <div class="rx-row" role="button" tabindex="0" data-open-med="${m.id}">
            <div class="rx-idx">${idxStr}</div>
            <div class="rx-thumb"><img src="${m.image}" alt="${m.name}" loading="lazy" /></div>
            <div class="rx-main">
              <div class="rx-title-line">
                <span class="rx-name">${m.name}</span>
                <span class="rx-tag">${catTag}</span>
                ${m.rxRequired ? '<span class="rx-tag rx-badge">Rx Prescription</span>' : '<span class="rx-tag sf-badge">Sugar-Free</span>'}
              </div>
              <div class="rx-salt">${m.genericSummary}</div>
              <p class="rx-desc">${m.taglineEn}</p>
            </div>
            <div class="rx-end">
              <a href="${m.pdfUrl}" target="_blank" rel="noopener" class="rx-pdf-link" onclick="event.stopPropagation();" title="Open Official PDF Brochure">PDF</a>
              <span class="rx-go" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </span>
            </div>
          </div>
        `;
      }).join('');

      if (noRes) noRes.style.display = filtered.length ? 'none' : 'block';
    };

    chips.forEach(c => c.addEventListener('click', () => {
      chips.forEach(x => x.classList.remove('active'));
      c.classList.add('active');
      activeCat = c.dataset.filter || 'all';
      activeNeedId = null;
      quickBar?.querySelectorAll('.need-pill').forEach(p => p.classList.remove('active'));
      renderRows();
    }));

    quickBar?.addEventListener('click', (e) => {
      const pill = e.target.closest('.need-pill');
      if (!pill) return;
      const nid = pill.dataset.need;
      activeNeedId = (activeNeedId === nid) ? null : nid;
      quickBar.querySelectorAll('.need-pill').forEach(p => p.classList.toggle('active', p.dataset.need === activeNeedId));
      if (activeNeedId) {
        activeCat = 'all';
        chips.forEach(x => x.classList.toggle('active', x.dataset.filter === 'all'));
      }
      renderRows();
    });

    searchInp?.addEventListener('input', renderRows);
    renderRows();
  }

  /* ============================================================
     OFFICIAL VISUAL-AID BROCHURE VAULT (products & certifications)
     ============================================================ */
  const brochureMount = document.getElementById('brochure-vault');
  if (brochureMount && MEDS.length) {
    brochureMount.innerHTML = MEDS.map(m => `
      <article class="brochure-card reveal">
        <div class="brochure-thumb" data-open-med="${m.id}" data-view="brochure" title="Inspect ${m.name} visual-aid">
          <img src="${m.brochureImg}" alt="${m.name} Official Visual-Aid Brochure" loading="lazy" />
        </div>
        <div class="brochure-body">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
            <h3>${m.name}</h3>
            <span class="rx-tag">${m.packSize}</span>
          </div>
          <p>${m.shortTitle}</p>
          <div class="brochure-actions">
            <a href="${m.pdfUrl}" target="_blank" rel="noopener" class="primary-dl">Open PDF</a>
            <button type="button" class="sec-view" data-open-med="${m.id}">Full Monograph</button>
          </div>
        </div>
      </article>
    `).join('');
    observeReveals(brochureMount);
  }

  /* ============================================================
     UNIVERSAL EDITORIAL CLINICAL MONOGRAPH MODAL (#rx-modal)
     ============================================================ */
  let modalLang = 'en';
  let modalMedIdx = 0;
  let modalStageView = 'packshot';

  const ensureModal = () => {
    let el = document.getElementById('rx-modal');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'rx-modal';
    el.className = 'rx-modal-backdrop';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Clinical Formulation Monograph');
    el.innerHTML = `
      <div class="rx-modal-sheet">
        <div class="rx-modal-bar">
          <div class="rx-modal-nav">
            <button type="button" class="m-pill-btn" id="m-prev">← Prev</button>
            <button type="button" class="m-pill-btn" id="m-next">Next →</button>
          </div>
          <div class="rx-modal-tools">
            <button type="button" class="m-pill-btn active" id="m-lang-en">EN</button>
            <button type="button" class="m-pill-btn" id="m-lang-hi">हिंदी</button>
            <button type="button" class="m-pill-btn" id="m-print" title="Print Monograph">Print</button>
            <button type="button" class="m-pill-btn" id="m-close">✕ Close</button>
          </div>
        </div>
        <div class="rx-modal-body" id="rx-modal-content"></div>
      </div>
    `;
    document.body.appendChild(el);

    el.addEventListener('click', (e) => {
      if (e.target === el) closeMonograph();
    });
    el.querySelector('#m-close')?.addEventListener('click', closeMonograph);
    el.querySelector('#m-print')?.addEventListener('click', () => window.print());
    el.querySelector('#m-prev')?.addEventListener('click', () => {
      modalMedIdx = (modalMedIdx - 1 + MEDS.length) % MEDS.length;
      renderMonographContent();
    });
    el.querySelector('#m-next')?.addEventListener('click', () => {
      modalMedIdx = (modalMedIdx + 1) % MEDS.length;
      renderMonographContent();
    });
    el.querySelector('#m-lang-en')?.addEventListener('click', () => {
      modalLang = 'en';
      el.querySelector('#m-lang-en')?.classList.add('active');
      el.querySelector('#m-lang-hi')?.classList.remove('active');
      renderMonographContent();
    });
    el.querySelector('#m-lang-hi')?.addEventListener('click', () => {
      modalLang = 'hi';
      el.querySelector('#m-lang-hi')?.classList.add('active');
      el.querySelector('#m-lang-en')?.classList.remove('active');
      renderMonographContent();
    });

    return el;
  };

  const renderMonographContent = () => {
    const m = MEDS[modalMedIdx];
    const mount = document.getElementById('rx-modal-content');
    if (!m || !mount) return;

    const isHi = modalLang === 'hi';
    const catTag = CATEGORY_LABELS[m.category] || m.category;
    const stageSrc = modalStageView === 'brochure' ? m.brochureImg : m.image;
    const perks = isHi ? m.easyGuide.keyPerksHi : m.easyGuide.keyPerksEn;

    mount.innerHTML = `
      <div class="m-hero">
        <div class="m-stage">
          <div class="m-stage-img-wrap">
            <img src="${stageSrc}" alt="${m.name}" id="m-stage-img" />
          </div>
          <div class="m-stage-tabs">
            <button type="button" class="m-stage-tab ${modalStageView === 'packshot' ? 'active' : ''}" data-stage="packshot">3D Packshot</button>
            <button type="button" class="m-stage-tab ${modalStageView === 'brochure' ? 'active' : ''}" data-stage="brochure">Visual-Aid Artwork</button>
          </div>
        </div>
        <div>
          <div class="m-head-badges">
            <span class="rx-tag">${catTag}</span>
            <span class="rx-tag">${m.classification}</span>
            ${m.rxRequired ? '<span class="rx-tag rx-badge">Rx — Physician Prescription</span>' : '<span class="rx-tag sf-badge">Sugar-Free</span>'}
          </div>
          <h2 class="m-title">${m.name}</h2>
          <div class="m-sub">${m.shortTitle}</div>
          <p class="m-tagline">${isHi ? m.taglineHi : m.taglineEn}</p>
          <div class="m-meta-grid">
            <div class="m-meta-box"><small>Dosage Form</small><b>${m.dosageForm}</b></div>
            <div class="m-meta-box"><small>Presentation</small><b>${m.packSize}</b></div>
            <div class="m-meta-box"><small>Delivery Science</small><b>${m.technology}</b></div>
            <div class="m-meta-box"><small>Palatability</small><b>${m.flavour}</b></div>
          </div>
          <div class="m-cta-row">
            <a href="${m.pdfUrl}" target="_blank" rel="noopener" class="cap-btn sm">
              Official PDF Brochure
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
            <a href="contact.html?product=${encodeURIComponent(m.id)}" class="cap-btn sm ghost">Enquire / Order</a>
          </div>
        </div>
      </div>

      <div class="m-section">
        <h3 class="m-section-head">${isHi ? 'सरल रोगी एवं परिवार मार्गदर्शिका' : 'Patient & Clinician Quick Guide'}</h3>
        <div class="m-guide-grid">
          <div class="m-guide-card">
            <h4>${isHi ? 'यह दवा क्या है?' : 'What It Does'}</h4>
            <p>${isHi ? m.easyGuide.whatIsItHi : m.easyGuide.whatIsItEn}</p>
          </div>
          <div class="m-guide-card">
            <h4>${isHi ? 'किनके लिए उपयोगी है?' : 'Who It Supports'}</h4>
            <p>${isHi ? m.easyGuide.whoIsItForHi : m.easyGuide.whoIsItForEn}</p>
          </div>
        </div>
        <div class="m-perks">
          ${perks.map(p => `<span class="m-perk">✦ ${p}</span>`).join('')}
        </div>
      </div>

      <div class="m-section">
        <h3 class="m-section-head">Active Composition &amp; Nutritional Profile</h3>
        <div style="overflow-x:auto;">
          <table class="m-comp-table">
            <thead>
              <tr>
                <th>Active Ingredient</th>
                <th>Strength</th>
                <th>Reference / %RDA</th>
              </tr>
            </thead>
            <tbody>
              ${m.composition.map(c => `
                <tr>
                  <td><strong>${c.ingredient}</strong><small>${c.detail}</small></td>
                  <td><strong>${c.strength}</strong></td>
                  <td>${c.rda}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="m-section">
        <h3 class="m-section-head">3-Phase Mechanism of Action</h3>
        <div class="m-mech-grid">
          ${m.mechanism.map(mc => `
            <div class="m-mech-card">
              <div class="m-mech-step">${mc.step}</div>
              <h4>${mc.title}</h4>
              <p>${mc.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="m-section">
        <div class="m-two-col">
          <div>
            <h3 class="m-section-head">Clinical Highlights</h3>
            <ul class="m-list">
              ${m.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
          </div>
          <div>
            <h3 class="m-section-head">Key Therapeutic Indications</h3>
            <ul class="m-list">
              ${m.indications.map(ind => `<li>${ind}</li>`).join('')}
            </ul>
          </div>
        </div>
        <div class="m-dosage-box">
          <small>Recommended Administration &amp; Guidance</small>
          <p>${m.dosage}${m.rxRequired ? ' <strong>(Schedule Rx Formulation: Use strictly under the prescription of a Registered Medical Practitioner.)</strong>' : ''}</p>
        </div>
      </div>
    `;

    mount.querySelectorAll('[data-stage]').forEach(btn => {
      btn.addEventListener('click', () => {
        modalStageView = btn.dataset.stage || 'packshot';
        renderMonographContent();
      });
    });
    bindPageSweep(mount);
  };

  const openMonograph = (medId, view = 'packshot') => {
    const idx = MEDS.findIndex(m => m.id === medId);
    if (idx === -1) return;
    modalMedIdx = idx;
    modalStageView = view;
    const modal = ensureModal();
    renderMonographContent();
    modal.classList.add('open');
    modal.querySelector('.rx-modal-body')?.scrollTo({ top: 0 });
    document.body.style.overflow = 'hidden';
  };

  const closeMonograph = () => {
    const modal = document.getElementById('rx-modal');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  /* Global delegation for [data-open-med] */
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-med]');
    if (!trigger) return;
    if (e.target.closest('a[href$=".pdf"]')) return;
    e.preventDefault();
    openMonograph(trigger.dataset.openMed, trigger.dataset.view || 'packshot');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement?.hasAttribute('data-open-med')) {
      e.preventDefault();
      openMonograph(document.activeElement.dataset.openMed);
      return;
    }
    const modal = document.getElementById('rx-modal');
    if (!modal || !modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeMonograph();
    if (e.key === 'ArrowLeft') {
      modalMedIdx = (modalMedIdx - 1 + MEDS.length) % MEDS.length;
      renderMonographContent();
    }
    if (e.key === 'ArrowRight') {
      modalMedIdx = (modalMedIdx + 1) % MEDS.length;
      renderMonographContent();
    }
  });

  /* Auto-open monograph if ?med=... in URL */
  const params = new URLSearchParams(window.location.search);
  const queryMed = params.get('med');
  if (queryMed && MEDS.some(m => m.id === queryMed)) {
    setTimeout(() => openMonograph(queryMed), 350);
  }

  /* ============================================================
     CONTACT PAGE — FORMULATION CHIPS & DIRECT EMAIL ENQUIRY
     ============================================================ */
  const contactChips = document.getElementById('contact-med-chips');
  const selectedMeds = new Set();
  if (contactChips && MEDS.length) {
    const preProd = params.get('product');
    if (preProd) selectedMeds.add(preProd);

    contactChips.innerHTML = MEDS.map(m => `
      <button type="button" class="med-chip ${selectedMeds.has(m.id) ? 'selected' : ''}" data-med-chip="${m.id}">
        ${m.name}
      </button>
    `).join('');

    contactChips.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-med-chip]');
      if (!chip) return;
      const id = chip.dataset.medChip;
      if (selectedMeds.has(id)) {
        selectedMeds.delete(id);
        chip.classList.remove('selected');
      } else {
        selectedMeds.add(id);
        chip.classList.add('selected');
      }
    });
  }

  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const copyBtn = document.getElementById('copy-enquiry-btn');

  const buildEnquiryPayload = () => {
    const name = document.getElementById('name')?.value.trim() || '';
    const role = document.getElementById('subject')?.value || 'General Enquiry';
    const phone = document.getElementById('phone')?.value.trim() || '';
    const city = document.getElementById('city')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const msg = document.getElementById('message')?.value.trim() || '';
    const chosenNames = MEDS.filter(m => selectedMeds.has(m.id)).map(m => m.name);

    const subject = `[Bioplasma Website Enquiry] ${role} — ${name || 'Partner'}`;
    const body = [
      `Bioplasma Biologicals Pvt. Ltd. — Website Enquiry`,
      `--------------------------------------------------`,
      `Name / Firm: ${name}`,
      `Category: ${role}`,
      `Phone / WhatsApp: ${phone}`,
      `City & State: ${city}`,
      email ? `Email: ${email}` : null,
      `Formulations of Interest: ${chosenNames.length ? chosenNames.join(', ') : 'Complete 9-Medicine Range'}`,
      ``,
      `Message / Requirement:`,
      msg || 'Please share product details, pricing / distribution terms, and literature.'
    ].filter(Boolean).join('\n');

    return { subject, body };
  };

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }
    const { subject, body } = buildEnquiryPayload();
    window.location.href = `mailto:admin@bioplasmabio.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (formSuccess) {
      formSuccess.innerHTML = `Your enquiry draft has been opened in your email client addressed to <strong>admin@bioplasmabio.com</strong>. You can also copy the formatted text anytime using the button above.`;
      formSuccess.classList.add('show');
    }
  });

  copyBtn?.addEventListener('click', async () => {
    const { body } = buildEnquiryPayload();
    try {
      await navigator.clipboard.writeText(body);
      if (formSuccess) {
        formSuccess.innerHTML = `Enquiry text copied to clipboard! Paste and send to <strong>admin@bioplasmabio.com</strong>.`;
        formSuccess.classList.add('show');
      }
    } catch {
      if (formSuccess) {
        formSuccess.innerHTML = `Please email your requirement directly to <strong>admin@bioplasmabio.com</strong>.`;
        formSuccess.classList.add('show');
      }
    }
  });

  /* ---------- Literature / Newsletter Forms ---------- */
  document.querySelectorAll('.news-form').forEach(nf => {
    nf.addEventListener('submit', (e) => {
      e.preventDefault();
      const inp = nf.querySelector('input');
      const btn = nf.querySelector('button');
      if (inp?.value && btn) {
        const emailVal = inp.value.trim();
        const orig = btn.innerHTML;
        btn.textContent = 'Request Prepared ✓';
        window.location.href = `mailto:admin@bioplasmabio.com?subject=${encodeURIComponent('Digital Visual-Aid & Literature Request — LV Bioplasma')}&body=${encodeURIComponent(`Hello Bioplasma Team,\n\nPlease share the latest product updates and 9-formulation visual-aid PDF kit with: ${emailVal}\n\nThank you.`)}`;
        inp.value = '';
        setTimeout(() => { btn.innerHTML = orig; }, 3200);
      }
    });
  });

  /* ---------- Back to top ---------- */
  const topBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    topBtn?.classList.toggle('show', window.scrollY > 560);
  }, { passive: true });
  topBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
