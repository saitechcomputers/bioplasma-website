/**
 * Bioplasma Biologicals Private Limited — Interactive Application Controller
 * Zero external runtime dependencies; works offline (file://) & on web servers.
 */
(function () {
  "use strict";

  const DATA = window.BIOPLASMA_DATA;
  if (!DATA) return;

  const UI_STRINGS = {
    en: {
      heroEyebrow: "Pharmaceutical & Nutraceutical Formulations • India",
      heroTitleHtml: 'Precision Formulations Built for <span class="gradient-text">Better Healing & Everyday Life</span>',
      heroSub: "Bioplasma Biologicals Private Limited (LV Bioplasma) develops advanced oral nano-shots, liposomal hematinics, marine-algae calcium matrices, probiotic suspensions, and dual-release gastro capsules.",
      exploreBtn: "Explore All 9 Medicines",
      partnerBtn: "Distributor & Doctor Enquiry",
      stat1Val: "9+",
      stat1Lbl: "Specialized Formulations",
      stat2Val: "5",
      stat2Lbl: "Therapeutic Divisions",
      stat3Val: "Next-Gen",
      stat3Lbl: "Nano, Liposomal & EC+IR+SR",
      finderKicker: "Easy Health Guide",
      finderTitle: "Find by Health Need or Symptom",
      finderDesc: "Tap any health area below to instantly filter matching Bioplasma formulations — simple for families, clear for clinicians.",
      portfolioKicker: "Complete Product Portfolio",
      portfolioTitle: "Our 9 Specialized Medicines",
      portfolioDesc: "Click any medicine card for full composition, %RDA, mechanism of action, easy guide, and official downloadable brochure.",
      searchPlaceholder: "Search medicine name, salt (e.g. Vitamin D3, Iron, Pantoprazole), or symptom...",
      allForms: "All Dosage Forms",
      sugarFreeOnly: "Sugar-Free Only",
      viewDetails: "Full Details & Guide",
      brochureBtn: "PDF",
      compareAdd: "+ Compare",
      compareAdded: "✓ Comparing",
      rxBadge: "Rx Prescription",
      suppBadge: "Supplement / OTC",
      sfBadge: "Sugar-Free",
      tabEasy: "Easy Guide",
      tabComp: "Composition & Mechanism",
      tabClin: "Indications & Dosage",
      tabBrochure: "Official Brochure",
      whatIsIt: "What is this medicine?",
      whoIsItFor: "Who is it commonly used for?",
      patientPerks: "Patient Comfort & Compliance Advantages",
      techKicker: "Formulation Science",
      techTitle: "Advanced Drug Delivery Technologies",
      techDesc: "Engineered to maximize intestinal absorption while minimizing gastric side effects.",
      brochuresKicker: "Visual-Aid Vault",
      brochuresTitle: "Official Product Brochures & Cartons",
      brochuresDesc: "Preview high-resolution visual aids online or download original PDF files for clinical & distribution reference.",
      aboutKicker: "Corporate Identity",
      aboutTitle: "About Bioplasma Biologicals Pvt. Ltd.",
      enquireNow: "Enquire About This Product"
    },
    hi: {
      heroEyebrow: "उच्च-गुणवत्ता फ़ार्मास्यूटिकल एवं न्यूट्रास्यूटिकल निर्माता • भारत",
      heroTitleHtml: 'आधुनिक विज्ञान और <span class="gradient-text">बेहतर स्वास्थ्य देखभाल</span> का संगम',
      heroSub: "बायोप्लाज़्मा बायोलॉजिकल्स प्रा. लि. (LV Bioplasma) नैनो-विटामिन D3 शॉट, लिपोसोमल आयरन, समुद्री शैवाल कैल्शियम, प्रोबायोटिक सस्पेंशन और आधुनिक गैस्ट्रो कैप्सूल प्रदान करता है।",
      exploreBtn: "सभी 9 दवाइयाँ देखें",
      partnerBtn: "डिस्ट्रीब्यूटर / डॉक्टर संपर्क",
      stat1Val: "9+",
      stat1Lbl: "विशेष दवा फ़ॉर्मूले",
      stat2Val: "5",
      stat2Lbl: "चिकित्सा श्रेणियाँ",
      stat3Val: "आधुनिक",
      stat3Lbl: "नैनो, लिपोसोमल व DSR तकनीक",
      finderKicker: "आसान स्वास्थ्य गाइड",
      finderTitle: "लक्षण या स्वास्थ्य आवश्यकता से खोजें",
      finderDesc: "किसी भी स्वास्थ्य ज़रूरत पर टैप करें और तुरंत संबंधित दवाइयों की आसान जानकारी देखें।",
      portfolioKicker: "संपूर्ण उत्पाद श्रृंखला",
      portfolioTitle: "हमारी सभी 9 प्रमुख दवाइयाँ",
      portfolioDesc: "पूरी संरचना (Composition), काम करने का तरीका, सरल हिंदी गाइड और आधिकारिक PDF ब्रोशर देखने के लिए किसी भी कार्ड पर क्लिक करें।",
      searchPlaceholder: "दवा का नाम, साल्ट (जैसे Vitamin D3, Iron, Pantoprazole) या लक्षण लिखें...",
      allForms: "सभी प्रकार (गोलियाँ/तरल)",
      sugarFreeOnly: "केवल शुगर-फ्री",
      viewDetails: "पूरी जानकारी देखें",
      brochureBtn: "PDF",
      compareAdd: "+ तुलना करें",
      compareAdded: "✓ चयनित",
      rxBadge: "Rx डॉक्टर की सलाह से",
      suppBadge: "हेल्थ सप्लीमेंट",
      sfBadge: "शुगर-फ्री",
      tabEasy: "सरल गाइड (Easy Guide)",
      tabComp: "संरचना और कार्यप्रणाली",
      tabClin: "उपयोग और खुराक",
      tabBrochure: "आधिकारिक ब्रोशर (PDF)",
      whatIsIt: "यह दवा क्या है और कैसे मदद करती है?",
      whoIsItFor: "यह मुख्य रूप से किनके लिए उपयोगी है?",
      patientPerks: "रोगी के लिए मुख्य सुविधाएँ",
      techKicker: "आधुनिक फ़ॉर्मूलेशन विज्ञान",
      techTitle: "उन्नत ड्रग-डिलीवरी तकनीकें",
      techDesc: "बेहतर अवशोषण और पेट पर बिना किसी दुष्प्रभाव के तेज़ असर के लिए विकसित।",
      brochuresKicker: "डाउनलोड सेंटर",
      brochuresTitle: "सभी 9 दवाइयों के आधिकारिक PDF ब्रोशर",
      brochuresDesc: "डॉक्टरों, फ़ार्मासिस्ट और डिस्ट्रीब्यूटर्स के लिए सभी उत्पादों के मूल विज़ुअल-एड PDF एक स्थान पर।",
      aboutKicker: "कंपनी परिचय",
      aboutTitle: "बायोप्लाज़्मा बायोलॉजिकल्स प्रा. लि. के बारे में",
      enquireNow: "इस दवा के लिए पूछताछ करें"
    }
  };

  // Application State
  const state = {
    lang: getSavedLang(),
    category: "all",
    quickNeedId: null,
    dosageForm: "all",
    sugarFreeOnly: false,
    searchQuery: "",
    spotlightIdx: 0,
    spotlightTimer: null,
    activeModalMedId: null,
    activeModalTab: "easy",
    brochureZoomed: false,
    compareIds: [],
    inquirySelectedMeds: new Set()
  };

  function getSavedLang() {
    try {
      const saved = localStorage.getItem("bioplasma_lang");
      return saved === "hi" ? "hi" : "en";
    } catch (_) {
      return "en";
    }
  }

  function saveLang(lang) {
    try {
      localStorage.setItem("bioplasma_lang", lang);
    } catch (_) {}
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getMedById(id) {
    return DATA.medicines.find((m) => m.id === id) || null;
  }

  // ---------- DOM Cache ----------
  const els = {};
  function cacheDom() {
    const ids = [
      "siteHeader", "mobileMenuBtn", "mobileDrawerNav", "langEnBtn", "langHiBtn",
      "heroEyebrow", "heroTitle", "heroSub", "heroExploreBtn", "heroPartnerBtn",
      "stat1Val", "stat1Lbl", "stat2Val", "stat2Lbl", "stat3Val", "stat3Lbl",
      "spotlightCard", "spotlightBadge", "spotlightStage", "spotlightImg",
      "spotlightTitle", "spotlightDesc", "spotlightDots", "spotPrevBtn", "spotNextBtn", "spotOpenBtn",
      "finderKicker", "finderTitle", "finderDesc", "quickNeedsGrid",
      "portfolioKicker", "portfolioTitle", "portfolioDesc",
      "searchInput", "searchShortcut", "searchClearBtn", "dosageSelect", "sugarToggleBtn", "sugarToggleLbl",
      "categoryTabs", "activeFilterBanner", "activeFilterText", "resetFiltersBtn", "medicinesGrid",
      "techKicker", "techTitle", "techDesc", "techGrid",
      "brochuresKicker", "brochuresTitle", "brochuresDesc", "brochureStripGrid",
      "aboutKicker", "aboutTitle", "pillarsStack",
      "inquiryMedChips", "inquiryForm", "inqName", "inqRole", "inqPhone", "inqCity", "inqEmail", "inqMessage",
      "copyInquiryBtn", "inquiryFeedback",
      "medModalBackdrop", "modalCloseBtn", "modalPrevBtn", "modalNextBtn", "modalPrintBtn",
      "modalContentMount",
      "compareTray", "compareTrayPills", "openCompareModalBtn", "clearCompareBtn",
      "compareModalBackdrop", "compareModalCloseBtn", "compareTableMount",
      "mobCompareBadge", "mobSearchTrigger", "mobCompareTrigger"
    ];
    ids.forEach((id) => {
      els[id] = document.getElementById(id);
    });
  }

  // ---------- Hero Spotlight ----------
  function renderSpotlight() {
    const med = DATA.medicines[state.spotlightIdx];
    if (!med || !els.spotlightImg) return;
    els.spotlightStage.style.setProperty("--spot-soft", med.accentSoft);
    els.spotlightBadge.textContent = med.technology;
    els.spotlightBadge.style.color = med.accent;
    els.spotlightImg.src = med.image;
    els.spotlightImg.alt = med.name + " packshot";
    els.spotlightTitle.textContent = med.name;
    els.spotlightDesc.textContent = state.lang === "hi" ? med.taglineHi : med.taglineEn;
    els.spotOpenBtn.textContent = UI_STRINGS[state.lang].viewDetails;

    els.spotlightDots.innerHTML = DATA.medicines
      .map(
        (m, idx) =>
          `<button type="button" class="spotlight-dot ${idx === state.spotlightIdx ? "active" : ""}" data-spot-idx="${idx}" aria-label="Show ${escapeHtml(m.name)}"></button>`
      )
      .join("");
  }

  function startSpotlightAuto() {
    stopSpotlightAuto();
    state.spotlightTimer = setInterval(() => {
      state.spotlightIdx = (state.spotlightIdx + 1) % DATA.medicines.length;
      renderSpotlight();
    }, 4800);
  }

  function stopSpotlightAuto() {
    if (state.spotlightTimer) {
      clearInterval(state.spotlightTimer);
      state.spotlightTimer = null;
    }
  }

  // ---------- Quick Needs Strip ----------
  function renderQuickNeeds() {
    if (!els.quickNeedsGrid) return;
    els.quickNeedsGrid.innerHTML = DATA.quickNeeds
      .map((need) => {
        const isActive = state.quickNeedId === need.id;
        const title = state.lang === "hi" ? need.titleHi : need.titleEn;
        const sub = state.lang === "hi" ? need.subHi : need.subEn;
        const countLabel =
          state.lang === "hi" ? `${need.medicineIds.length} दवाइयाँ` : `${need.medicineIds.length} options`;
        return `
          <button type="button" class="need-card ${isActive ? "active" : ""}" style="--need-color: ${need.color}" data-need-id="${need.id}">
            <div class="need-card-top">
              <span class="need-dot"></span>
              <span class="need-count">${escapeHtml(countLabel)}</span>
            </div>
            <div>
              <h3>${escapeHtml(title)}</h3>
              <p>${escapeHtml(sub)}</p>
            </div>
          </button>
        `;
      })
      .join("");
  }

  // ---------- Dosage Form Dropdown & Category Tabs ----------
  function populateDosageSelect() {
    if (!els.dosageSelect) return;
    const forms = [
      { val: "all", en: UI_STRINGS.en.allForms, hi: UI_STRINGS.hi.allForms },
      { val: "tablet", en: "Tablets (3)", hi: "टैबलेट / गोलियाँ (3)" },
      { val: "capsule", en: "DSR Capsules (2)", hi: "DSR कैप्सूल (2)" },
      { val: "liquid", en: "Oral Shots, Gel & Suspension (3)", hi: "नैनो शॉट, जेल व सस्पेंशन (3)" },
      { val: "sachet", en: "Oral Granules Sachet (1)", hi: "पाउडर सैशे (1)" }
    ];
    els.dosageSelect.innerHTML = forms
      .map(
        (f) =>
          `<option value="${f.val}" ${state.dosageForm === f.val ? "selected" : ""}>${escapeHtml(
            state.lang === "hi" ? f.hi : f.en
          )}</option>`
      )
      .join("");
  }

  function renderCategoryTabs() {
    if (!els.categoryTabs) return;
    els.categoryTabs.innerHTML = DATA.categories
      .map((cat) => {
        const active = state.category === cat.id && !state.quickNeedId;
        const lbl = state.lang === "hi" ? cat.labelHi : cat.labelEn;
        return `<button type="button" class="cat-tab ${active ? "active" : ""}" data-cat-id="${cat.id}">${escapeHtml(lbl)}</button>`;
      })
      .join("");
  }

  function matchesDosageGroup(med, group) {
    if (group === "all") return true;
    const df = med.dosageForm.toLowerCase();
    if (group === "tablet") return df.includes("tablet");
    if (group === "capsule") return df.includes("capsule");
    if (group === "sachet") return df.includes("sachet");
    if (group === "liquid") return df.includes("shot") || df.includes("gel") || df.includes("suspension");
    return true;
  }

  function getFilteredMedicines() {
    const q = state.searchQuery.trim().toLowerCase();
    const activeNeed = DATA.quickNeeds.find((n) => n.id === state.quickNeedId);

    return DATA.medicines.filter((med) => {
      if (activeNeed && !activeNeed.medicineIds.includes(med.id)) return false;

      if (!activeNeed && state.category !== "all") {
        const inPrimary = med.category === state.category;
        const inSecondary = (med.secondaryCategories || []).includes(state.category);
        if (!inPrimary && !inSecondary) return false;
      }

      if (!matchesDosageGroup(med, state.dosageForm)) return false;
      if (state.sugarFreeOnly && !med.sugarFree) return false;

      if (q) {
        const haystack = [
          med.name,
          med.shortTitle,
          med.genericSummary,
          med.technology,
          med.flavour,
          med.taglineEn,
          med.taglineHi,
          ...(med.indications || []),
          ...(med.keywords || []),
          ...(med.composition || []).map((c) => `${c.ingredient} ${c.detail}`)
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }

  // ---------- Product Portfolio Grid ----------
  function renderMedicinesGrid() {
    if (!els.medicinesGrid) return;
    const t = UI_STRINGS[state.lang];
    const filtered = getFilteredMedicines();

    // Update Active Filter Banner
    const activeNeed = DATA.quickNeeds.find((n) => n.id === state.quickNeedId);
    const hasFilter =
      Boolean(activeNeed) ||
      state.category !== "all" ||
      state.dosageForm !== "all" ||
      state.sugarFreeOnly ||
      state.searchQuery.trim().length > 0;

    if (hasFilter) {
      els.activeFilterBanner.classList.add("visible");
      const needNote = activeNeed
        ? ` • ${state.lang === "hi" ? activeNeed.titleHi : activeNeed.titleEn}`
        : "";
      els.activeFilterText.textContent =
        state.lang === "hi"
          ? `${filtered.length} दवाइयाँ प्रदर्शित हो रही हैं${needNote}`
          : `Showing ${filtered.length} of ${DATA.medicines.length} Bioplasma formulations${needNote}`;
    } else {
      els.activeFilterBanner.classList.remove("visible");
    }

    if (filtered.length === 0) {
      els.medicinesGrid.innerHTML = `
        <div class="empty-state">
          <h3 style="margin:0 0 8px;color:var(--text-strong);">${
            state.lang === "hi" ? "कोई मिलान वाली दवा नहीं मिली" : "No matching medicine found"
          }</h3>
          <p style="margin:0 0 16px;color:var(--text-muted);">${
            state.lang === "hi"
              ? "कृपया फ़िल्टर रीसेट करें या दूसरा शब्द खोजें।"
              : "Try clearing one of the active filters or searching a broader symptom."
          }</p>
          <button type="button" class="btn btn-primary btn-sm" id="emptyResetBtn">${
            state.lang === "hi" ? "सभी 9 दवाइयाँ दिखाएँ" : "Reset & Show All 9 Medicines"
          }</button>
        </div>
      `;
      const emptyBtn = document.getElementById("emptyResetBtn");
      if (emptyBtn) emptyBtn.addEventListener("click", resetAllFilters);
      return;
    }

    els.medicinesGrid.innerHTML = filtered
      .map((med) => {
        const isCompared = state.compareIds.includes(med.id);
        const tagline = state.lang === "hi" ? med.taglineHi : med.taglineEn;
        return `
          <article class="med-card" style="--med-accent: ${med.accent}; --med-soft: ${med.accentSoft};">
            <div class="med-card-top-bar"></div>
            <div class="med-card-stage" data-open-med="${med.id}" role="button" tabindex="0" aria-label="Inspect ${escapeHtml(med.name)}">
              <div class="med-badges-overlay">
                <div class="badge-group">
                  <span class="pill-badge ${med.rxRequired ? "rx" : ""}">${escapeHtml(
          med.rxRequired ? t.rxBadge : t.suppBadge
        )}</span>
                  ${med.sugarFree ? `<span class="pill-badge sf">${escapeHtml(t.sfBadge)}</span>` : ""}
                </div>
                <button type="button" class="compare-check-btn ${isCompared ? "selected" : ""}" data-compare-id="${med.id}">
                  ${escapeHtml(isCompared ? t.compareAdded : t.compareAdd)}
                </button>
              </div>
              <img src="${escapeHtml(med.image)}" alt="${escapeHtml(med.name)} 3D Package" loading="lazy" />
            </div>

            <div class="med-card-body">
              <div class="med-tech-label">${escapeHtml(med.technology)}</div>
              <h3 class="med-card-title" data-open-med="${med.id}">${escapeHtml(med.name)}</h3>
              <div class="med-generic">${escapeHtml(med.genericSummary)}</div>
              <p class="med-tagline">${escapeHtml(tagline)}</p>

              <div class="med-meta-chips">
                <span class="meta-chip">${escapeHtml(med.dosageForm)}</span>
                <span class="meta-chip">${escapeHtml(med.packSize)}</span>
                ${
                  med.flavour && !med.flavour.toLowerCase().includes("unflavoured") && !med.flavour.toLowerCase().includes("gelatin")
                    ? `<span class="meta-chip">${escapeHtml(med.flavour)}</span>`
                    : ""
                }
              </div>

              <div class="med-card-actions">
                <button type="button" class="btn btn-primary btn-sm" data-open-med="${med.id}">
                  ${escapeHtml(t.viewDetails)}
                </button>
                <a href="${escapeHtml(med.pdfUrl)}" target="_blank" rel="noopener" class="btn btn-outline btn-sm" title="Open Official PDF Brochure">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/></svg>
                  ${escapeHtml(t.brochureBtn)}
                </a>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function resetAllFilters() {
    state.category = "all";
    state.quickNeedId = null;
    state.dosageForm = "all";
    state.sugarFreeOnly = false;
    state.searchQuery = "";
    if (els.searchInput) els.searchInput.value = "";
    if (els.searchClearBtn) els.searchClearBtn.classList.remove("visible");
    if (els.searchShortcut) els.searchShortcut.style.display = "";
    if (els.sugarToggleBtn) els.sugarToggleBtn.classList.remove("active");
    populateDosageSelect();
    renderQuickNeeds();
    renderCategoryTabs();
    renderMedicinesGrid();
  }

  // ---------- Delivery Technologies Section ----------
  function renderTechnologies() {
    if (!els.techGrid) return;
    els.techGrid.innerHTML = DATA.technologies
      .map((tech) => {
        const title = state.lang === "hi" ? tech.titleHi : tech.titleEn;
        const desc = state.lang === "hi" ? tech.descHi : tech.descEn;
        return `
          <div class="tech-card" style="--tech-accent: ${tech.accent}">
            <div>
              <span class="tech-badge">${escapeHtml(tech.badge)}</span>
              <h3>${escapeHtml(title)}</h3>
              <p>${escapeHtml(desc)}</p>
            </div>
            <button type="button" class="tech-link-btn" data-open-med="${tech.medicineId}">
              <span>${escapeHtml(tech.medicine)}</span>
              <span>→</span>
            </button>
          </div>
        `;
      })
      .join("");
  }

  // ---------- Brochure Vault Strip ----------
  function renderBrochureVault() {
    if (!els.brochureStripGrid) return;
    els.brochureStripGrid.innerHTML = DATA.medicines
      .map(
        (med) => `
          <div class="brochure-mini-card">
            <div class="brochure-mini-left">
              <img src="${escapeHtml(med.image)}" alt="${escapeHtml(med.name)}" loading="lazy" />
              <div style="min-width:0;">
                <div class="brochure-mini-title">${escapeHtml(med.name)}</div>
                <div class="brochure-mini-sub">${escapeHtml(med.packSize)}</div>
              </div>
            </div>
            <div class="brochure-mini-actions">
              <button type="button" class="btn btn-outline btn-sm" data-open-brochure="${med.id}">
                ${state.lang === "hi" ? "देखें" : "Preview"}
              </button>
              <a href="${escapeHtml(med.pdfUrl)}" download="${escapeHtml(med.pdfFileName)}" class="btn btn-primary btn-sm" title="Download PDF">
                PDF
              </a>
            </div>
          </div>
        `
      )
      .join("");
  }

  // ---------- Corporate 3-Emblem Pillars ----------
  function renderPillars() {
    if (!els.pillarsStack) return;
    const svgMap = {
      smile:
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
      drop:
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
      leaf:
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>'
    };
    els.pillarsStack.innerHTML = DATA.company.pillars
      .map((p) => {
        const title = state.lang === "hi" ? p.titleHi : p.titleEn;
        const desc = state.lang === "hi" ? p.descHi : p.descEn;
        return `
          <div class="pillar-card">
            <div class="pillar-icon-box" style="background:${p.color}">
              ${svgMap[p.icon] || ""}
            </div>
            <div>
              <h3>${escapeHtml(title)}</h3>
              <p>${escapeHtml(desc)}</p>
            </div>
          </div>
        `;
      })
      .join("");
  }

  // ---------- Inquiry Medicine Selector Chips ----------
  function renderInquiryChips() {
    if (!els.inquiryMedChips) return;
    els.inquiryMedChips.innerHTML = DATA.medicines
      .map((m) => {
        const selected = state.inquirySelectedMeds.has(m.name);
        return `<button type="button" class="med-select-chip ${selected ? "selected" : ""}" data-inq-med="${escapeHtml(
          m.name
        )}">${escapeHtml(m.name)}</button>`;
      })
      .join("");
  }

  // ---------- Language Update ----------
  function applyLanguage() {
    const t = UI_STRINGS[state.lang];
    document.documentElement.lang = state.lang === "hi" ? "hi" : "en";

    if (els.langEnBtn) els.langEnBtn.classList.toggle("active", state.lang === "en");
    if (els.langHiBtn) els.langHiBtn.classList.toggle("active", state.lang === "hi");

    if (els.heroEyebrow) els.heroEyebrow.textContent = t.heroEyebrow;
    if (els.heroTitle) els.heroTitle.innerHTML = t.heroTitleHtml;
    if (els.heroSub) els.heroSub.textContent = t.heroSub;
    if (els.heroExploreBtn) els.heroExploreBtn.textContent = t.exploreBtn;
    if (els.heroPartnerBtn) els.heroPartnerBtn.textContent = t.partnerBtn;

    if (els.stat1Val) els.stat1Val.textContent = t.stat1Val;
    if (els.stat1Lbl) els.stat1Lbl.textContent = t.stat1Lbl;
    if (els.stat2Val) els.stat2Val.textContent = t.stat2Val;
    if (els.stat2Lbl) els.stat2Lbl.textContent = t.stat2Lbl;
    if (els.stat3Val) els.stat3Val.textContent = t.stat3Val;
    if (els.stat3Lbl) els.stat3Lbl.textContent = t.stat3Lbl;

    if (els.finderKicker) els.finderKicker.textContent = t.finderKicker;
    if (els.finderTitle) els.finderTitle.textContent = t.finderTitle;
    if (els.finderDesc) els.finderDesc.textContent = t.finderDesc;

    if (els.portfolioKicker) els.portfolioKicker.textContent = t.portfolioKicker;
    if (els.portfolioTitle) els.portfolioTitle.textContent = t.portfolioTitle;
    if (els.portfolioDesc) els.portfolioDesc.textContent = t.portfolioDesc;
    if (els.searchInput) els.searchInput.placeholder = t.searchPlaceholder;
    if (els.sugarToggleLbl) els.sugarToggleLbl.textContent = t.sugarFreeOnly;

    if (els.techKicker) els.techKicker.textContent = t.techKicker;
    if (els.techTitle) els.techTitle.textContent = t.techTitle;
    if (els.techDesc) els.techDesc.textContent = t.techDesc;

    if (els.brochuresKicker) els.brochuresKicker.textContent = t.brochuresKicker;
    if (els.brochuresTitle) els.brochuresTitle.textContent = t.brochuresTitle;
    if (els.brochuresDesc) els.brochuresDesc.textContent = t.brochuresDesc;

    if (els.aboutKicker) els.aboutKicker.textContent = t.aboutKicker;
    if (els.aboutTitle) els.aboutTitle.textContent = t.aboutTitle;

    renderSpotlight();
    renderQuickNeeds();
    populateDosageSelect();
    renderCategoryTabs();
    renderMedicinesGrid();
    renderTechnologies();
    renderBrochureVault();
    renderPillars();

    if (state.activeModalMedId) {
      renderMedicineModal(state.activeModalMedId, state.activeModalTab);
    }
  }

  // ---------- Full Interactive Medicine Detail Modal ----------
  function openMedicineModal(medId, initialTab) {
    state.activeModalMedId = medId;
    state.activeModalTab = initialTab || "easy";
    state.brochureZoomed = false;
    renderMedicineModal(medId, state.activeModalTab);
    els.medModalBackdrop.classList.add("open");
    document.body.classList.add("modal-open");
  }

  function closeMedicineModal() {
    state.activeModalMedId = null;
    els.medModalBackdrop.classList.remove("open");
    if (!els.compareModalBackdrop.classList.contains("open")) {
      document.body.classList.remove("modal-open");
    }
  }

  function navigateModal(delta) {
    if (!state.activeModalMedId) return;
    const idx = DATA.medicines.findIndex((m) => m.id === state.activeModalMedId);
    if (idx === -1) return;
    const nextIdx = (idx + delta + DATA.medicines.length) % DATA.medicines.length;
    state.activeModalMedId = DATA.medicines[nextIdx].id;
    state.brochureZoomed = false;
    renderMedicineModal(state.activeModalMedId, state.activeModalTab);
  }

  function renderMedicineModal(medId, activeTab) {
    const med = getMedById(medId);
    if (!med || !els.modalContentMount) return;
    const t = UI_STRINGS[state.lang];
    const isHi = state.lang === "hi";

    const perks = isHi ? med.easyGuide.keyPerksHi : med.easyGuide.keyPerksEn;
    const whatText = isHi ? med.easyGuide.whatIsItHi : med.easyGuide.whatIsItEn;
    const whoText = isHi ? med.easyGuide.whoIsItForHi : med.easyGuide.whoIsItForEn;

    els.modalContentMount.style.setProperty("--modal-accent", med.accent);
    els.modalContentMount.style.setProperty("--modal-soft", med.accentSoft);

    els.modalContentMount.innerHTML = `
      <div class="modal-hero-grid">
        <div class="modal-packshot-box">
          <img src="${escapeHtml(med.image)}" alt="${escapeHtml(med.name)}" />
        </div>
        <div>
          <div class="badge-group" style="margin-bottom:8px;">
            <span class="pill-badge ${med.rxRequired ? "rx" : ""}">${escapeHtml(med.classification)}</span>
            ${med.sugarFree ? `<span class="pill-badge sf">${escapeHtml(t.sfBadge)}</span>` : ""}
            <span class="pill-badge" style="background:var(--bg-subtle);color:${med.accent};">${escapeHtml(
      med.technology
    )}</span>
          </div>
          <h2 class="modal-title">${escapeHtml(med.name)}</h2>
          <p class="modal-subtitle">${escapeHtml(med.shortTitle)}</p>
          <p style="margin:0;color:var(--text-muted);font-size:0.92rem;">${escapeHtml(
            isHi ? med.taglineHi : med.taglineEn
          )}</p>

          <div class="modal-quick-specs">
            <div class="spec-box">
              <div class="spec-box-label">${isHi ? "खुराक का रूप" : "Dosage Form"}</div>
              <div class="spec-box-val">${escapeHtml(med.dosageForm)}</div>
            </div>
            <div class="spec-box">
              <div class="spec-box-label">${isHi ? "पैक साइज़" : "Pack Presentation"}</div>
              <div class="spec-box-val">${escapeHtml(med.packSize)}</div>
            </div>
            <div class="spec-box">
              <div class="spec-box-label">${isHi ? "स्वाद / विशेषता" : "Flavour / Profile"}</div>
              <div class="spec-box-val">${escapeHtml(med.flavour)}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-tabs" role="tablist">
        <button type="button" class="modal-tab-btn ${activeTab === "easy" ? "active" : ""}" data-modal-tab="easy">${escapeHtml(
      t.tabEasy
    )}</button>
        <button type="button" class="modal-tab-btn ${activeTab === "comp" ? "active" : ""}" data-modal-tab="comp">${escapeHtml(
      t.tabComp
    )}</button>
        <button type="button" class="modal-tab-btn ${activeTab === "clin" ? "active" : ""}" data-modal-tab="clin">${escapeHtml(
      t.tabClin
    )}</button>
        <button type="button" class="modal-tab-btn ${
          activeTab === "brochure" ? "active" : ""
        }" data-modal-tab="brochure">${escapeHtml(t.tabBrochure)}</button>
      </div>

      <!-- TAB 1: EASY GUIDE -->
      <div class="modal-pane ${activeTab === "easy" ? "active" : ""}">
        <div class="easy-guide-grid">
          <div class="easy-card">
            <h4>${escapeHtml(t.whatIsIt)}</h4>
            <p>${escapeHtml(whatText)}</p>
          </div>
          <div class="easy-card">
            <h4>${escapeHtml(t.whoIsItFor)}</h4>
            <p>${escapeHtml(whoText)}</p>
          </div>
        </div>
        <h4 style="margin:0 0 10px;color:var(--text-strong);">${escapeHtml(t.patientPerks)}</h4>
        <ul class="perks-list">
          ${perks.map((p) => `<li><span>✓</span><span>${escapeHtml(p)}</span></li>`).join("")}
        </ul>
        ${
          med.rxRequired
            ? `<div class="dosage-callout" style="background:#fff1f2;border-color:#fecdd3;color:#9f1239;margin-top:16px;">
                <strong>${isHi ? "चिकित्सीय सलाह आवश्यक (Rx):" : "Prescription Advisory (Rx):"}</strong>
                ${
                  isHi
                    ? "यह एक प्रिस्क्रिप्शन दवा है। इसे केवल पंजीकृत डॉक्टर की सलाह और निर्धारित खुराक के अनुसार ही लें।"
                    : "This is a prescription formulation. Always use strictly under the supervision and dosage schedule of a Registered Medical Practitioner."
                }
              </div>`
            : ""
        }
      </div>

      <!-- TAB 2: COMPOSITION & MECHANISM -->
      <div class="modal-pane ${activeTab === "comp" ? "active" : ""}">
        <div class="comp-table-wrap">
          <table class="comp-table">
            <thead>
              <tr>
                <th>${isHi ? "सक्रिय घटक (Active Ingredient)" : "Active Ingredient"}</th>
                <th>${isHi ? "विवरण / ग्रेड" : "Specification / Role"}</th>
                <th>${isHi ? "मात्रा (Strength)" : "Strength"}</th>
                <th>${isHi ? "%RDA / मानक" : "%RDA / Reference"}</th>
              </tr>
            </thead>
            <tbody>
              ${med.composition
                .map(
                  (row) => `
                  <tr>
                    <td style="font-weight:800;color:var(--text-strong);">${escapeHtml(row.ingredient)}</td>
                    <td style="color:var(--text-muted);">${escapeHtml(row.detail)}</td>
                    <td style="font-weight:800;white-space:nowrap;">${escapeHtml(row.strength)}</td>
                    <td>
                      <div style="font-weight:700;font-size:0.82rem;">${escapeHtml(row.rda)}</div>
                      ${
                        row.rdaPct
                          ? `<div class="rda-bar-track"><div class="rda-bar-fill" style="width:${Math.min(
                              100,
                              row.rdaPct
                            )}%"></div></div>`
                          : ""
                      }
                    </td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
        </div>

        <h4 style="margin:0 0 12px;color:var(--text-strong);">${
          isHi ? "शरीर में काम करने का वैज्ञानिक तरीका (Mechanism of Action)" : "Step-by-Step Mechanism of Action"
        }</h4>
        <div class="moa-grid">
          ${med.mechanism
            .map(
              (m) => `
              <div class="moa-step-card">
                <div class="moa-step-num">${escapeHtml(m.step)}</div>
                <h5>${escapeHtml(m.title)}</h5>
                <p>${escapeHtml(m.desc)}</p>
              </div>
            `
            )
            .join("")}
        </div>
      </div>

      <!-- TAB 3: CLINICAL INDICATIONS & DOSAGE -->
      <div class="modal-pane ${activeTab === "clin" ? "active" : ""}">
        <div class="clinical-two-col">
          <div>
            <h4 style="margin:0 0 10px;color:var(--text-strong);">${
              isHi ? "प्रमुख चिकित्सीय उपयोग (Indications)" : "Clinical Indications"
            }</h4>
            <ul class="check-list">
              ${med.indications.map((ind) => `<li>• ${escapeHtml(ind)}</li>`).join("")}
            </ul>
          </div>
          <div>
            <h4 style="margin:0 0 10px;color:var(--text-strong);">${
              isHi ? "मुख्य वैज्ञानिक लाभ (Clinical Highlights)" : "Key Clinical Advantages"
            }</h4>
            <ul class="check-list">
              ${med.highlights.map((hl) => `<li>✓ ${escapeHtml(hl)}</li>`).join("")}
            </ul>
          </div>
        </div>
        <div class="dosage-callout">
          <strong>${isHi ? "सामान्य सेवन विधि / खुराक:" : "Recommended Administration & Dosage:"}</strong>
          ${escapeHtml(med.dosage)}
        </div>
      </div>

      <!-- TAB 4: OFFICIAL BROCHURE VIEWER -->
      <div class="modal-pane ${activeTab === "brochure" ? "active" : ""}">
        <div class="brochure-viewer-toolbar">
          <div style="font-size:0.88rem;font-weight:700;color:var(--text-strong);">
            ${escapeHtml(med.pdfFileName)}
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button type="button" class="btn btn-outline btn-sm" id="toggleBrochureZoomBtn">
              ${state.brochureZoomed ? "100% Fit Width" : "🔍 Zoom 165%"}
            </button>
            <a href="${escapeHtml(med.pdfUrl)}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">
              Open Original PDF
            </a>
            <a href="${escapeHtml(med.pdfUrl)}" download="${escapeHtml(
      med.pdfFileName
    )}" class="btn btn-primary btn-sm">
              Download PDF
            </a>
          </div>
        </div>
        <div class="brochure-canvas ${state.brochureZoomed ? "zoomed" : ""}" id="brochureCanvas">
          <img src="${escapeHtml(med.brochureImg)}" alt="Official ${escapeHtml(med.name)} Visual-Aid Brochure" />
        </div>
      </div>

      <div style="margin-top:22px;padding-top:16px;border-top:1px solid var(--border-light);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
        <div style="font-size:0.82rem;color:var(--text-muted);">
          Manufactured in India for <strong>Bioplasma Biologicals Private Limited</strong> (Gurugram, NCR)
        </div>
        <button type="button" class="btn btn-primary btn-sm" data-enquire-med="${escapeHtml(med.name)}">
          ${escapeHtml(t.enquireNow)} →
        </button>
      </div>
    `;

    const zoomBtn = document.getElementById("toggleBrochureZoomBtn");
    if (zoomBtn) {
      zoomBtn.addEventListener("click", () => {
        state.brochureZoomed = !state.brochureZoomed;
        const canvas = document.getElementById("brochureCanvas");
        if (canvas) canvas.classList.toggle("zoomed", state.brochureZoomed);
        zoomBtn.textContent = state.brochureZoomed ? "100% Fit Width" : "🔍 Zoom 165%";
      });
    }
  }

  // ---------- Side-by-Side Comparison Tool ----------
  function toggleCompare(medId) {
    const idx = state.compareIds.indexOf(medId);
    if (idx >= 0) {
      state.compareIds.splice(idx, 1);
    } else {
      if (state.compareIds.length >= 3) {
        state.compareIds.shift(); // Keep sleek 3-column comparison max
      }
      state.compareIds.push(medId);
    }
    updateCompareUI();
    renderMedicinesGrid();
  }

  function updateCompareUI() {
    const count = state.compareIds.length;
    if (els.compareTray) {
      els.compareTray.classList.toggle("visible", count > 0);
    }
    if (els.mobCompareBadge) {
      els.mobCompareBadge.textContent = String(count);
      els.mobCompareBadge.classList.toggle("visible", count > 0);
    }
    if (els.compareTrayPills) {
      els.compareTrayPills.innerHTML = state.compareIds
        .map((id) => {
          const m = getMedById(id);
          if (!m) return "";
          return `
            <span class="compare-mini-pill">
              ${escapeHtml(m.name)}
              <button type="button" data-remove-compare="${m.id}" aria-label="Remove ${escapeHtml(m.name)}">✕</button>
            </span>
          `;
        })
        .join("");
    }
    if (els.openCompareModalBtn) {
      els.openCompareModalBtn.textContent =
        state.lang === "hi" ? `तुलना देखें (${count})` : `Compare (${count})`;
    }
  }

  function openCompareModal() {
    if (state.compareIds.length === 0) {
      // Pre-populate popular gastro comparison if user taps Compare from mobile bar when empty
      state.compareIds = ["pantheta-dsr", "rabtheta-dsr", "novacaine"];
      updateCompareUI();
      renderMedicinesGrid();
    }
    renderCompareTable();
    els.compareModalBackdrop.classList.add("open");
    document.body.classList.add("modal-open");
  }

  function closeCompareModal() {
    els.compareModalBackdrop.classList.remove("open");
    if (!els.medModalBackdrop.classList.contains("open")) {
      document.body.classList.remove("modal-open");
    }
  }

  function renderCompareTable() {
    const meds = state.compareIds.map(getMedById).filter(Boolean);
    if (!els.compareTableMount) return;

    els.compareTableMount.innerHTML = `
      <div class="compare-table-wrap">
        <table class="compare-table">
          <thead>
            <tr>
              <th>Specification</th>
              ${meds
                .map(
                  (m) => `
                  <td style="text-align:center;background:#f8fafc;">
                    <img src="${escapeHtml(m.image)}" alt="${escapeHtml(
                    m.name
                  )}" style="height:95px;margin:0 auto 8px;object-fit:contain;" />
                    <div style="font-weight:800;font-size:1.05rem;color:var(--text-strong);">${escapeHtml(m.name)}</div>
                    <div style="font-size:0.76rem;color:${m.accent};font-weight:700;">${escapeHtml(m.technology)}</div>
                  </td>
                `
                )
                .join("")}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Active Composition</th>
              ${meds.map((m) => `<td><strong>${escapeHtml(m.genericSummary)}</strong></td>`).join("")}
            </tr>
            <tr>
              <th>Dosage Form & Pack</th>
              ${meds.map((m) => `<td>${escapeHtml(m.dosageForm)}<br><span style="color:var(--text-muted)">${escapeHtml(m.packSize)}</span></td>`).join("")}
            </tr>
            <tr>
              <th>Flavour & Sugar Status</th>
              ${meds
                .map(
                  (m) =>
                    `<td>${escapeHtml(m.flavour)}<br><strong style="color:#15803d">${
                      m.sugarFree ? "✓ Sugar-Free" : "Standard"
                    }</strong></td>`
                )
                .join("")}
            </tr>
            <tr>
              <th>Regulatory Category</th>
              ${meds
                .map(
                  (m) =>
                    `<td>${
                      m.rxRequired
                        ? '<span class="pill-badge rx">Rx Prescription</span>'
                        : '<span class="pill-badge">Health Supplement / OTC</span>'
                    }</td>`
                )
                .join("")}
            </tr>
            <tr>
              <th>Primary Indications</th>
              ${meds.map((m) => `<td>${m.indications.slice(0, 4).map(escapeHtml).join("<br>• ")}</td>`).join("")}
            </tr>
            <tr>
              <th>Brochure & Details</th>
              ${meds
                .map(
                  (m) => `
                  <td>
                    <button type="button" class="btn btn-primary btn-sm" data-compare-to-detail="${m.id}">Full Guide</button>
                    <a href="${escapeHtml(m.pdfUrl)}" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="margin-top:6px;">PDF</a>
                  </td>
                `
                )
                .join("")}
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // ---------- Inquiry Form Handling ----------
  function buildInquiryBody() {
    const name = els.inqName.value.trim() || "Prospective Partner";
    const role = els.inqRole.value;
    const phone = els.inqPhone.value.trim() || "Not provided";
    const city = els.inqCity.value.trim() || "Not provided";
    const email = els.inqEmail.value.trim() || "Not provided";
    const meds =
      state.inquirySelectedMeds.size > 0
        ? Array.from(state.inquirySelectedMeds).join(", ")
        : "Complete Bioplasma Portfolio (All 9 Formulations)";
    const msg = els.inqMessage.value.trim() || "Please share product details, availability, and commercial terms.";

    return [
      `Dear Bioplasma Biologicals Team,`,
      ``,
      `Inquiry Type: ${role}`,
      `Name / Organization: ${name}`,
      `Phone / WhatsApp: ${phone}`,
      `City / State: ${city}`,
      `Email: ${email}`,
      `Products of Interest: ${meds}`,
      ``,
      `Message:`,
      msg,
      ``,
      `---`,
      `Sent via www.bioplasmabio.com Web Portal`
    ].join("\n");
  }

  function initEvents() {
    // Scroll shadow on sticky header
    window.addEventListener(
      "scroll",
      () => {
        if (els.siteHeader) {
          els.siteHeader.classList.toggle("scrolled", window.scrollY > 12);
        }
      },
      { passive: true }
    );

    // Mobile Menu
    if (els.mobileMenuBtn && els.mobileDrawerNav) {
      els.mobileMenuBtn.addEventListener("click", () => {
        els.mobileDrawerNav.classList.toggle("open");
      });
      els.mobileDrawerNav.addEventListener("click", (e) => {
        if (e.target.tagName === "A") els.mobileDrawerNav.classList.remove("open");
      });
    }

    // Language Switcher
    if (els.langEnBtn) {
      els.langEnBtn.addEventListener("click", () => {
        state.lang = "en";
        saveLang("en");
        applyLanguage();
      });
    }
    if (els.langHiBtn) {
      els.langHiBtn.addEventListener("click", () => {
        state.lang = "hi";
        saveLang("hi");
        applyLanguage();
      });
    }

    // Hero Spotlight Events
    if (els.spotlightCard) {
      els.spotlightCard.addEventListener("mouseenter", stopSpotlightAuto);
      els.spotlightCard.addEventListener("mouseleave", startSpotlightAuto);
    }
    if (els.spotPrevBtn) {
      els.spotPrevBtn.addEventListener("click", () => {
        state.spotlightIdx = (state.spotlightIdx - 1 + DATA.medicines.length) % DATA.medicines.length;
        renderSpotlight();
      });
    }
    if (els.spotNextBtn) {
      els.spotNextBtn.addEventListener("click", () => {
        state.spotlightIdx = (state.spotlightIdx + 1) % DATA.medicines.length;
        renderSpotlight();
      });
    }
    if (els.spotlightStage) {
      els.spotlightStage.addEventListener("click", () => {
        openMedicineModal(DATA.medicines[state.spotlightIdx].id, "easy");
      });
    }
    if (els.spotOpenBtn) {
      els.spotOpenBtn.addEventListener("click", () => {
        openMedicineModal(DATA.medicines[state.spotlightIdx].id, "easy");
      });
    }
    if (els.spotlightDots) {
      els.spotlightDots.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-spot-idx]");
        if (!btn) return;
        state.spotlightIdx = Number(btn.dataset.spotIdx);
        renderSpotlight();
      });
    }

    // Quick Needs Click
    if (els.quickNeedsGrid) {
      els.quickNeedsGrid.addEventListener("click", (e) => {
        const card = e.target.closest("[data-need-id]");
        if (!card) return;
        const needId = card.dataset.needId;
        state.quickNeedId = state.quickNeedId === needId ? null : needId;
        if (state.quickNeedId) state.category = "all";
        renderQuickNeeds();
        renderCategoryTabs();
        renderMedicinesGrid();
        const portSec = document.getElementById("medicines");
        if (portSec && state.quickNeedId) {
          portSec.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }

    // Search & Filters
    if (els.searchInput) {
      els.searchInput.addEventListener("input", () => {
        state.searchQuery = els.searchInput.value;
        const hasVal = state.searchQuery.length > 0;
        if (els.searchClearBtn) els.searchClearBtn.classList.toggle("visible", hasVal);
        if (els.searchShortcut) els.searchShortcut.style.display = hasVal ? "none" : "";
        renderMedicinesGrid();
      });
    }
    if (els.searchClearBtn) {
      els.searchClearBtn.addEventListener("click", () => {
        state.searchQuery = "";
        els.searchInput.value = "";
        els.searchClearBtn.classList.remove("visible");
        if (els.searchShortcut) els.searchShortcut.style.display = "";
        els.searchInput.focus();
        renderMedicinesGrid();
      });
    }
    if (els.dosageSelect) {
      els.dosageSelect.addEventListener("change", () => {
        state.dosageForm = els.dosageSelect.value;
        renderMedicinesGrid();
      });
    }
    if (els.sugarToggleBtn) {
      els.sugarToggleBtn.addEventListener("click", () => {
        state.sugarFreeOnly = !state.sugarFreeOnly;
        els.sugarToggleBtn.classList.toggle("active", state.sugarFreeOnly);
        renderMedicinesGrid();
      });
    }
    if (els.categoryTabs) {
      els.categoryTabs.addEventListener("click", (e) => {
        const tab = e.target.closest("[data-cat-id]");
        if (!tab) return;
        state.category = tab.dataset.catId;
        state.quickNeedId = null;
        renderQuickNeeds();
        renderCategoryTabs();
        renderMedicinesGrid();
      });
    }
    if (els.resetFiltersBtn) {
      els.resetFiltersBtn.addEventListener("click", resetAllFilters);
    }

    // Delegated Clicks across Document (Open Modal, Compare, Brochure Preview, Inquiry Preselect)
    document.addEventListener("click", (e) => {
      const compareBtn = e.target.closest("[data-compare-id]");
      if (compareBtn) {
        e.stopPropagation();
        toggleCompare(compareBtn.dataset.compareId);
        return;
      }

      const removeCompare = e.target.closest("[data-remove-compare]");
      if (removeCompare) {
        toggleCompare(removeCompare.dataset.removeCompare);
        return;
      }

      const openMed = e.target.closest("[data-open-med]");
      if (openMed) {
        openMedicineModal(openMed.dataset.openMed, "easy");
        return;
      }

      const openBrochure = e.target.closest("[data-open-brochure]");
      if (openBrochure) {
        openMedicineModal(openBrochure.dataset.openBrochure, "brochure");
        return;
      }

      const modalTab = e.target.closest("[data-modal-tab]");
      if (modalTab && state.activeModalMedId) {
        state.activeModalTab = modalTab.dataset.modalTab;
        renderMedicineModal(state.activeModalMedId, state.activeModalTab);
        return;
      }

      const compareToDetail = e.target.closest("[data-compare-to-detail]");
      if (compareToDetail) {
        closeCompareModal();
        openMedicineModal(compareToDetail.dataset.compareToDetail, "comp");
        return;
      }

      const enquireMed = e.target.closest("[data-enquire-med]");
      if (enquireMed) {
        const medName = enquireMed.dataset.enquireMed;
        state.inquirySelectedMeds.add(medName);
        renderInquiryChips();
        closeMedicineModal();
        const contactEl = document.getElementById("contact");
        if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
        return;
      }

      const inqChip = e.target.closest("[data-inq-med]");
      if (inqChip) {
        const name = inqChip.dataset.inqMed;
        if (state.inquirySelectedMeds.has(name)) {
          state.inquirySelectedMeds.delete(name);
        } else {
          state.inquirySelectedMeds.add(name);
        }
        renderInquiryChips();
      }
    });

    // Modal Controls
    if (els.modalCloseBtn) els.modalCloseBtn.addEventListener("click", closeMedicineModal);
    if (els.modalPrevBtn) els.modalPrevBtn.addEventListener("click", () => navigateModal(-1));
    if (els.modalNextBtn) els.modalNextBtn.addEventListener("click", () => navigateModal(1));
    if (els.modalPrintBtn) els.modalPrintBtn.addEventListener("click", () => window.print());
    if (els.medModalBackdrop) {
      els.medModalBackdrop.addEventListener("click", (e) => {
        if (e.target === els.medModalBackdrop) closeMedicineModal();
      });
    }

    // Compare Modal Controls
    if (els.openCompareModalBtn) els.openCompareModalBtn.addEventListener("click", openCompareModal);
    if (els.clearCompareBtn) {
      els.clearCompareBtn.addEventListener("click", () => {
        state.compareIds = [];
        updateCompareUI();
        renderMedicinesGrid();
      });
    }
    if (els.compareModalCloseBtn) els.compareModalCloseBtn.addEventListener("click", closeCompareModal);
    if (els.compareModalBackdrop) {
      els.compareModalBackdrop.addEventListener("click", (e) => {
        if (e.target === els.compareModalBackdrop) closeCompareModal();
      });
    }

    // Mobile Bottom Bar Shortcuts
    if (els.mobSearchTrigger) {
      els.mobSearchTrigger.addEventListener("click", () => {
        const sec = document.getElementById("medicines");
        if (sec) sec.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          if (els.searchInput) els.searchInput.focus();
        }, 350);
      });
    }
    if (els.mobCompareTrigger) {
      els.mobCompareTrigger.addEventListener("click", openCompareModal);
    }

    // Keyboard Shortcuts ('/' for search, Esc & Left/Right for modal)
    document.addEventListener("keydown", (e) => {
      const tag = (e.target && e.target.tagName) || "";
      const isInput = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";

      if ((e.key === "/" || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")) && !isInput) {
        e.preventDefault();
        if (els.searchInput) {
          els.searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
          els.searchInput.focus();
        }
      } else if (e.key === "Escape") {
        if (els.medModalBackdrop.classList.contains("open")) closeMedicineModal();
        if (els.compareModalBackdrop.classList.contains("open")) closeCompareModal();
      } else if (state.activeModalMedId && !isInput) {
        if (e.key === "ArrowLeft") navigateModal(-1);
        if (e.key === "ArrowRight") navigateModal(1);
      }
    });

    // Inquiry Form Submit & Copy
    if (els.inquiryForm) {
      els.inquiryForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const role = els.inqRole.value;
        const name = els.inqName.value.trim() || "Partner";
        const subject = encodeURIComponent(`[Bioplasma Inquiry] ${role} — ${name}`);
        const body = encodeURIComponent(buildInquiryBody());
        window.location.href = `mailto:${DATA.company.email}?subject=${subject}&body=${body}`;
        if (els.inquiryFeedback) {
          els.inquiryFeedback.textContent =
            "Opening your email client addressed to admin@bioplasmabio.com. You can also click 'Copy Inquiry Details' if you prefer pasting into Gmail/Webmail.";
          els.inquiryFeedback.classList.add("visible");
        }
      });
    }

    if (els.copyInquiryBtn) {
      els.copyInquiryBtn.addEventListener("click", async () => {
        const text = buildInquiryBody();
        try {
          await navigator.clipboard.writeText(text);
          if (els.inquiryFeedback) {
            els.inquiryFeedback.textContent =
              "✓ Inquiry summary copied! Send it directly to admin@bioplasmabio.com.";
            els.inquiryFeedback.classList.add("visible");
          }
        } catch (_) {
          if (els.inquiryFeedback) {
            els.inquiryFeedback.textContent = "Please email us directly at admin@bioplasmabio.com.";
            els.inquiryFeedback.classList.add("visible");
          }
        }
      });
    }
  }

  // ---------- Bootstrap ----------
  document.addEventListener("DOMContentLoaded", () => {
    cacheDom();
    renderInquiryChips();
    applyLanguage();
    updateCompareUI();
    initEvents();
    startSpotlightAuto();
  });
})();
