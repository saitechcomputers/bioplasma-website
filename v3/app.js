/**
 * Bioplasma Biologicals Pvt. Ltd. (LV Bioplasma) — V3 Interactive Engine
 * Synthesizes Eli Lilly editorial clarity, Merck vibrant cellular science,
 * and Emcure corporate therapeutic portal capabilities across all V3 pages.
 */
(function () {
  "use strict";

  const DATA = window.BIOPLASMA_DATA;
  if (!DATA) return;

  const state = {
    lang: localStorage.getItem("bioplasma_v3_lang") || "en",
    heroIndex: 0,
    heroTimer: null,
    heroPaused: false,
    activeDivision: "gastro",
    activeSciIndex: 0,
    category: "all",
    quickNeedId: null,
    dosageForm: "all",
    sugarFreeOnly: false,
    rxOnly: false,
    searchQuery: "",
    viewMode: "grid", // "grid" | "table"
    compareIds: [],
    currentModalMedId: null,
    selectedEnquiryMeds: new Set(["aadirise-d3", "pantheta-dsr", "bioipc"])
  };

  /* ---------- Hero Slides Dataset (Emcure Slider + Lilly Editorial + Merck Blob) ---------- */
  const HERO_SLIDES = [
    {
      num: "01",
      tabTitleEn: "Our Purpose",
      tabTitleHi: "हमारा उद्देश्य",
      tabSubEn: "Everyday clinical healing",
      tabSubHi: "दैनिक चिकित्सा उत्कृष्टता",
      tagEn: "A Formulation Company • Gurugram NCR, India",
      tagHi: "फार्मास्युटिकल एवं न्यूट्रास्युटिकल • गुरुग्राम NCR",
      headlineEn: 'Medicines built around <span class="accent-word">human comfort</span> &amp; clinical precision.',
      headlineHi: 'मानवीय आराम और <span class="accent-word">सटीक विज्ञान</span> से निर्मित आधुनिक दवाइयाँ।',
      subEn: "Bioplasma Biologicals Private Limited (LV Bioplasma) pairs globally trusted pharmaceutical actives with gentle, high-bioavailability delivery systems so patients recover faster and adhere effortlessly.",
      subHi: "बायोप्लाज़्मा बायोलॉजिकल्स प्रा. लि. (LV Bioplasma) विश्व-स्तरीय तत्वों और आधुनिक डिलीवरी तकनीक से ऐसी दवाइयाँ बनाता है जो शरीर में तेज़ी से असर करें और लेने में बेहद आसान हों।",
      blobGradient: "linear-gradient(135deg, rgba(245,158,11,0.24), rgba(213,43,30,0.16), rgba(15,76,129,0.18))",
      medId: "aadirise-d3"
    },
    {
      num: "02",
      tabTitleEn: "Vibrant Science",
      tabTitleHi: "उन्नत विज्ञान",
      tabSubEn: "Nano & Liposomal delivery",
      tabSubHi: "नैनो और लिपोसोमल तकनीक",
      tagEn: "Vibrant Delivery Engineering • Bioavailability First",
      tagHi: "आधुनिक ड्रग डिलीवरी • उच्च अवशोषण",
      headlineEn: 'Where <span class="accent-word">microscopic</span> formulation meets gentle absorption.',
      headlineHi: 'जहाँ <span class="accent-word">सूक्ष्म विज्ञान</span> देता है बिना साइड-इफेक्ट तेज़ अवशोषण।',
      blobGradient: "linear-gradient(135deg, rgba(225,29,100,0.24), rgba(80,50,145,0.22), rgba(2,132,199,0.18))",
      subEn: "Phospholipid-shielded Liposomal Iron with 4th-gen Quatrefolic®, 60,000 IU Nano-Droplet Vitamin D3 shots, and resilient probiotic endospores engineered to bypass harsh gastric degradation.",
      subHi: "लिपोसोमल आयरन + Quatrefolic®, नैनो-ड्रॉपलेट विटामिन D3 शॉट और एसिड-रेज़िस्टेंट प्रोबायोटिक स्पोर्स जो पेट को बिना परेशान किए पूरा पोषण पहुँचाते हैं।",
      medId: "bioipc"
    },
    {
      num: "03",
      tabTitleEn: "Gastro Precision",
      tabTitleHi: "गैस्ट्रो केयर",
      tabSubEn: "EC + IR + SR Capsules",
      tabSubHi: "टैबलेट-इन-कैप्सूल तकनीक",
      tagEn: "Acid-Peptic & Motility Care • Dual-Phase Architecture",
      tagHi: "एसिडिटी और रिफ्लक्स नियंत्रण • 24-घंटे सुरक्षा",
      headlineEn: 'Immediate relief <span class="accent-word">harmonized</span> with 24-hour acid control.',
      headlineHi: 'तुरंत राहत और <span class="accent-word">पूरे 24 घंटे</span> एसिडिटी व रिफ्लक्स से सुरक्षा।',
      blobGradient: "linear-gradient(135deg, rgba(3,105,161,0.24), rgba(13,148,136,0.22), rgba(79,70,229,0.18))",
      subEn: "PANTHETA™ DSR and RABTHETA™ DSR isolate Enteric-Coated PPIs alongside split 10 mg Immediate-Release and 20 mg Sustained-Release Domperidone inside one precision Tablet-in-Capsule.",
      subHi: "PANTHETA™ DSR और RABTHETA™ DSR में उन्नत टैबलेट-इन-कैप्सूल तकनीक है जो जी मिचलाने में तुरंत आराम और पूरे दिन एसिड से सुरक्षा देती है।",
      medId: "pantheta-dsr"
    },
    {
      num: "04",
      tabTitleEn: "Maternal & Bone",
      tabTitleHi: "मातृत्व व हड्डियाँ",
      tabSubEn: "Aquamin™ & Micronized Rx",
      tabSubHi: "Aquamin™ और महिला स्वास्थ्य",
      tagEn: "Global Branded Actives • Women's & Orthopedic Care",
      tagHi: "अंतर्राष्ट्रीय शुद्ध तत्व • हड्डी व मातृत्व देखभाल",
      headlineEn: 'Bio-pure marine minerals &amp; <span class="accent-word">trusted</span> maternal care.',
      headlineHi: 'प्राकृतिक समुद्री कैल्शियम और <span class="accent-word">सुरक्षित</span> मातृत्व पोषण।',
      blobGradient: "linear-gradient(135deg, rgba(21,128,61,0.22), rgba(2,132,199,0.22), rgba(225,29,72,0.16))",
      subEn: "From Irish Aquamin™ 74-mineral red marine algae calcium paired with arterial-protective Vitamin K2-7 to micronized Dydrogesterone and sugar-free Cranberry L-Arginine sachets.",
      subHi: "आयरलैंड के समुद्री शैवाल Aquamin™ (72 सूक्ष्म खनिजों सहित) और विटामिन K2-7 से लेकर माइक्रोनाइज़्ड डाइड्रोजेस्टेरोन व क्रैनबेरी L-Arginine सैशे तक।",
      medId: "adenocal-k2"
    }
  ];

  /* ---------- Therapeutic Divisions Rich Metadata ---------- */
  const DIVISIONS_META = [
    {
      id: "gastro",
      titleEn: "Gastroenterology & Acid-Peptic Care",
      titleHi: "गैस्ट्रोएंटरोलॉजी और एसिड-पेप्टिक देखभाल",
      descEn: "Precision Tablet-in-Capsule PPI + split IR/SR prokinetics for GERD and dyspepsia, paired with cooling mucosal anesthetic-antacid gel and gut-restorative spore probiotics.",
      descHi: "GERD, तेज़ एसिडिटी, खट्टी डकार, अल्सर और जी मिचलाने के लिए आधुनिक टैबलेट-इन-कैप्सूल (DSR) और तुरंत ठंडक देने वाला शुगर-फ्री मिंट जेल।",
      medIds: ["pantheta-dsr", "rabtheta-dsr", "novacaine", "preimmune-aqua"]
    },
    {
      id: "bone",
      titleEn: "Orthopedics, Bone Matrix & Vitamin D3",
      titleHi: "हड्डियाँ, समुद्री कैल्शियम और विटामिन D3",
      descEn: "Addressing India's widespread Vitamin D and skeletal mineral gap through 60,000 IU Nano-Droplet D3 shots and ~86.5% bioavailable Aquamin™ marine calcium + Vitamin K2-7.",
      descHi: "हड्डियों की मज़बूती, कमर दर्द और कैल्शियम अवशोषण के लिए 60,000 IU नैनो D3 शॉट और पचने में हल्का समुद्री शैवाल कैल्शियम (Aquamin™ + K2-7)।",
      medIds: ["aadirise-d3", "adenocal-k2"]
    },
    {
      id: "womens",
      titleEn: "Gynecology & Maternal Vascular Nutrition",
      titleHi: "स्त्री-रोग एवं गर्भावस्था संपूर्ण देखभाल",
      descEn: "Comprehensive obstetric and gynecological support spanning IP-grade micronized Dydrogesterone 10 mg, uteroplacental Nitric Oxide L-Arginine sachets, Liposomal Iron, and Marine Calcium.",
      descHi: "गर्भावस्था की सुरक्षा, बेहतर रक्त प्रवाह (L-Arginine), हीमोग्लोबिन सुधार और हार्मोनल संतुलन (Dydrofy® 10 mg) के लिए विशेष श्रृंखला।",
      medIds: ["dydrofy", "argiluck", "bioipc", "adenocal-k2"]
    },
    {
      id: "hematinic",
      titleEn: "Hematology & Liposomal Anemia Care",
      titleHi: "हीमोग्लोबिन और लिपोसोमल आयरन केयर",
      descEn: "Next-generation phospholipid-encapsulated Ferric Pyrophosphate paired with genuine 4th-gen Quatrefolic®, active P5P (Vit B6), Vit B12, and Glycine — zero metallic taste or constipation.",
      descHi: "बिना कब्ज़, बिना मतली और बिना धातु जैसे स्वाद के तेज़ी से हीमोग्लोबिन बढ़ाने वाला आधुनिक लिपोसोमल आयरन + Quatrefolic® टैबलेट।",
      medIds: ["bioipc"]
    },
    {
      id: "probiotic",
      titleEn: "Gut Immunology & Spore Probiotics",
      titleHi: "आंतों की सुरक्षा और प्रोबायोटिक इम्युनिटी",
      descEn: "2 Billion heat- and gastric-acid-resilient Bacillus clausii spores suspended in a pure, tasteless 5 ml ready-to-drink mini vial for pediatric and adult gut recovery.",
      descHi: "बच्चों और बड़ों दोनों के लिए बिल्कुल पानी जैसा बेस्वाद 5 ml रेडी-टू-ड्रिंक प्रोबायोटिक जो एंटीबायोटिक और दस्त में आंतों का संतुलन बनाए रखे।",
      medIds: ["preimmune-aqua"]
    }
  ];

  /* ---------- Merck-Style Microscopic SVG Diagrams ---------- */
  function getScienceSVG(index) {
    if (index === 0) {
      // Nano-Droplet Micellar Dispersion
      return `
        <svg viewBox="0 0 420 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Nano-Droplet Vitamin D3 Diagram">
          <defs>
            <radialGradient id="nanoGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#FBBF24" stop-opacity="0.95"/>
              <stop offset="70%" stop-color="#EA580C" stop-opacity="0.55"/>
              <stop offset="100%" stop-color="#EA580C" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <path d="M20 215 Q110 198 210 215 T400 215" stroke="rgba(255,255,255,0.28)" stroke-width="2" stroke-dasharray="5 5"/>
          <text x="24" y="240" fill="rgba(255,255,255,0.65)" font-size="11" font-family="Space Grotesk, sans-serif">INTESTINAL ENTEROCYTE MEMBRANE (RAPID UPTAKE)</text>
          <!-- Conventional large oil drop blocked -->
          <circle cx="95" cy="95" r="46" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
          <text x="95" y="92" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="10" font-weight="700">Conventional</text>
          <text x="95" y="106" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="9">Large Oil Globule</text>
          <!-- Arrow to Nano Micelles -->
          <path d="M158 95 H205" stroke="#FBBF24" stroke-width="2.2" stroke-linecap="round"/>
          <polygon points="205,90 215,95 205,100" fill="#FBBF24"/>
          <!-- Nano droplets cluster -->
          <circle cx="275" cy="68" r="22" fill="url(#nanoGlow)"/>
          <circle cx="322" cy="86" r="18" fill="url(#nanoGlow)"/>
          <circle cx="258" cy="122" r="19" fill="url(#nanoGlow)"/>
          <circle cx="305" cy="134" r="24" fill="url(#nanoGlow)"/>
          <circle cx="352" cy="122" r="16" fill="url(#nanoGlow)"/>
          <circle cx="285" cy="176" r="14" fill="url(#nanoGlow)"/>
          <circle cx="328" cy="178" r="13" fill="url(#nanoGlow)"/>
          <text x="305" y="34" text-anchor="middle" fill="#FDE68A" font-size="11" font-family="Space Grotesk, sans-serif" font-weight="700">60,000 IU NANO-MICELLES</text>
        </svg>`;
    }
    if (index === 1) {
      // Liposomal Phospholipid Bilayer Shield
      return `
        <svg viewBox="0 0 420 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Liposomal Iron Phospholipid Shield">
          <circle cx="210" cy="130" r="92" stroke="#F43F5E" stroke-width="3" stroke-dasharray="8 6" fill="rgba(244,63,94,0.08)"/>
          <circle cx="210" cy="130" r="70" stroke="#FB7185" stroke-width="2" fill="rgba(225,29,100,0.16)"/>
          <circle cx="210" cy="130" r="42" fill="#BE123C"/>
          <text x="210" y="126" text-anchor="middle" fill="#FFFFFF" font-size="13" font-weight="800">Fe³⁺ 27 mg</text>
          <text x="210" y="143" text-anchor="middle" fill="#FFE4E6" font-size="9.5" font-family="Space Grotesk, sans-serif">PROTECTED CORE</text>
          <text x="64" y="54" fill="#FDA4AF" font-size="10.5" font-family="Space Grotesk, sans-serif" font-weight="700">PHOSPHOLIPID BILAYER</text>
          <line x1="115" y1="60" x2="152" y2="82" stroke="#FDA4AF" stroke-width="1.5"/>
          <rect x="292" y="176" width="112" height="46" rx="10" fill="rgba(16,185,129,0.18)" stroke="#34D399"/>
          <text x="348" y="196" text-anchor="middle" fill="#A7F3D0" font-size="10" font-weight="700">+ Quatrefolic®</text>
          <text x="348" y="211" text-anchor="middle" fill="#D1FAE5" font-size="9">P5P • B12 • Glycine</text>
        </svg>`;
    }
    if (index === 2) {
      // Aquamin Honeycomb Marine Matrix + K2-7
      return `
        <svg viewBox="0 0 420 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Aquamin Honeycomb Matrix">
          <!-- Honeycomb hexagons -->
          <g stroke="#38BDF8" stroke-width="2" fill="rgba(56,189,248,0.13)">
            <polygon points="130,70 156,55 182,70 182,100 156,115 130,100"/>
            <polygon points="182,70 208,55 234,70 234,100 208,115 182,100"/>
            <polygon points="156,115 182,100 208,115 208,145 182,160 156,145"/>
            <polygon points="208,115 234,100 260,115 260,145 234,160 208,145"/>
            <polygon points="130,160 156,145 182,160 182,190 156,205 130,190"/>
            <polygon points="182,160 208,145 234,160 234,190 208,205 182,190"/>
          </g>
          <text x="195" y="34" text-anchor="middle" fill="#7DD3FC" font-size="11" font-family="Space Grotesk, sans-serif" font-weight="700">AQUAMIN™ POROUS MARINE MATRIX (~86.5% BIOAVAILABLE)</text>
          <rect x="280" y="92" width="118" height="76" rx="14" fill="rgba(56,189,248,0.16)" stroke="#38BDF8"/>
          <text x="339" y="118" text-anchor="middle" fill="#FFFFFF" font-size="12" font-weight="800">Ca 330 mg</text>
          <text x="339" y="136" text-anchor="middle" fill="#BAE6FD" font-size="10">Mg 25 mg + 72 Minerals</text>
          <text x="339" y="154" text-anchor="middle" fill="#34D399" font-size="10" font-weight="700">+ Vit K2-7 &amp; D3</text>
        </svg>`;
    }
    // Tablet-in-Capsule EC + IR + SR
    return `
      <svg viewBox="0 0 420 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Tablet-in-Capsule EC IR SR Architecture">
        <rect x="58" y="78" width="304" height="104" rx="52" stroke="rgba(255,255,255,0.45)" stroke-width="2.5" fill="rgba(255,255,255,0.06)"/>
        <path d="M210 78 V182" stroke="rgba(255,255,255,0.22)" stroke-dasharray="4 4"/>
        <!-- EC PPI Core -->
        <rect x="86" y="102" width="76" height="56" rx="16" fill="#0284C7" stroke="#7DD3FC" stroke-width="1.8"/>
        <text x="124" y="127" text-anchor="middle" fill="#FFF" font-size="11" font-weight="800">EC PPI</text>
        <text x="124" y="143" text-anchor="middle" fill="#E0F2FE" font-size="9">Acid-Protected</text>
        <!-- IR Unit -->
        <circle cx="212" cy="130" r="28" fill="#F59E0B" stroke="#FDE68A" stroke-width="1.8"/>
        <text x="212" y="127" text-anchor="middle" fill="#151821" font-size="11" font-weight="800">10mg IR</text>
        <text x="212" y="141" text-anchor="middle" fill="#151821" font-size="8.5" font-weight="700">Fast Relief</text>
        <!-- SR Unit -->
        <rect x="262" y="102" width="76" height="56" rx="28" fill="#10B981" stroke="#A7F3D0" stroke-width="1.8"/>
        <text x="300" y="127" text-anchor="middle" fill="#052E16" font-size="11" font-weight="800">20mg SR</text>
        <text x="300" y="143" text-anchor="middle" fill="#052E16" font-size="8.5" font-weight="700">24h Shield</text>
        <text x="210" y="48" text-anchor="middle" fill="#A5F3FC" font-size="11" font-family="Space Grotesk, sans-serif" font-weight="700">PRECISION TABLET-IN-CAPSULE (PANTHETA™ / RABTHETA™ DSR)</text>
      </svg>`;
  }

  /* ---------- Utility Helpers ---------- */
  function getMedById(id) {
    return DATA.medicines.find((m) => m.id === id) || DATA.medicines[0];
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function t(en, hi) {
    return state.lang === "hi" && hi ? hi : en;
  }

  /* ---------- Sticky Header & Mobile Drawer ---------- */
  function initHeaderAndNav() {
    const header = document.getElementById("siteHeader");
    if (header) {
      window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 18);
      }, { passive: true });
    }

    const mobToggle = document.getElementById("mobileMenuToggle");
    const mobDrawer = document.getElementById("mobileNavDrawer");
    if (mobToggle && mobDrawer) {
      mobToggle.addEventListener("click", () => {
        const isOpen = mobDrawer.classList.toggle("open");
        mobToggle.setAttribute("aria-expanded", String(isOpen));
      });
      mobDrawer.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => mobDrawer.classList.remove("open"));
      });
    }

    // Language switchers
    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.lang = btn.getAttribute("data-set-lang") === "hi" ? "hi" : "en";
        localStorage.setItem("bioplasma_v3_lang", state.lang);
        syncLanguageUI();
      });
    });

    // Global委托 click for [data-open-med]
    document.addEventListener("click", (e) => {
      const medTrigger = e.target.closest("[data-open-med]");
      if (medTrigger) {
        e.preventDefault();
        const medId = medTrigger.getAttribute("data-open-med");
        openMonographModal(medId);
      }
      const searchTrigger = e.target.closest("[data-open-quick-search]");
      if (searchTrigger) {
        e.preventDefault();
        openQuickSearchModal();
      }
    });

    // Keyboard shortcut `/` or `Ctrl+K` / `Cmd+K`
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openQuickSearchModal();
      } else if (e.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
        e.preventDefault();
        const inlineSearch = document.getElementById("explorerSearchInput");
        if (inlineSearch) {
          inlineSearch.focus();
          inlineSearch.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          openQuickSearchModal();
        }
      } else if (e.key === "Escape") {
        closeAllModals();
      } else if (document.getElementById("monographModalBackdrop")?.classList.contains("open")) {
        if (e.key === "ArrowRight") stepMonographModal(1);
        if (e.key === "ArrowLeft") stepMonographModal(-1);
      }
    });
  }

  /* ---------- Hero Carousel (Homepage) ---------- */
  function initHeroCarousel() {
    const heroRoot = document.getElementById("heroCarouselRoot");
    if (!heroRoot) return;

    const tabsMount = document.getElementById("heroTabsMount");
    if (tabsMount) {
      tabsMount.innerHTML = HERO_SLIDES.map((s, idx) => `
        <button type="button" class="hero-tab-btn ${idx === 0 ? "active" : ""}" data-hero-idx="${idx}">
          <span class="hero-tab-progress"></span>
          <span class="hero-tab-num">${s.num}</span>
          <span class="hero-tab-title" data-hero-tab-title="${idx}">${t(s.tabTitleEn, s.tabTitleHi)}</span>
          <span class="hero-tab-sub" data-hero-tab-sub="${idx}">${t(s.tabSubEn, s.tabSubHi)}</span>
        </button>
      `).join("");

      tabsMount.querySelectorAll(".hero-tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = Number(btn.getAttribute("data-hero-idx"));
          setHeroSlide(idx, true);
        });
      });
    }

    heroRoot.addEventListener("mouseenter", () => { state.heroPaused = true; });
    heroRoot.addEventListener("mouseleave", () => { state.heroPaused = false; });

    setHeroSlide(0, false);
    startHeroTimer();
  }

  function startHeroTimer() {
    clearInterval(state.heroTimer);
    state.heroTimer = setInterval(() => {
      if (!state.heroPaused) {
        setHeroSlide((state.heroIndex + 1) % HERO_SLIDES.length, false);
      }
    }, 6500);
  }

  function setHeroSlide(idx, resetClock) {
    state.heroIndex = idx;
    const slide = HERO_SLIDES[idx];
    const med = getMedById(slide.medId);

    const tagEl = document.getElementById("heroSlideTagText");
    const headEl = document.getElementById("heroHeadline");
    const subEl = document.getElementById("heroSubtext");
    const blobEl = document.getElementById("merckCellBlob");
    const techEl = document.getElementById("stageTechPill");
    const rxEl = document.getElementById("stageRxFlag");
    const imgEl = document.getElementById("stagePackshotImg");
    const packWrap = document.getElementById("stagePackshotWrap");
    const medTitleEl = document.getElementById("stageMedTitle");
    const medDescEl = document.getElementById("stageMedDesc");
    const openBtn = document.getElementById("stageOpenMedBtn");

    if (tagEl) tagEl.textContent = t(slide.tagEn, slide.tagHi);
    if (headEl) headEl.innerHTML = t(slide.headlineEn, slide.headlineHi);
    if (subEl) subEl.textContent = t(slide.subEn, slide.subHi);
    if (blobEl) blobEl.style.background = slide.blobGradient;

    if (techEl) techEl.textContent = med.technology;
    if (rxEl) {
      rxEl.textContent = med.rxRequired ? "Rx Prescription" : (med.sugarFree ? "Sugar-Free" : "Supplement");
      rxEl.classList.toggle("is-rx", Boolean(med.rxRequired));
    }
    if (imgEl) {
      imgEl.src = med.image;
      imgEl.alt = `${med.name} packshot`;
    }
    if (packWrap) packWrap.setAttribute("data-open-med", med.id);
    if (medTitleEl) medTitleEl.textContent = med.name;
    if (medDescEl) medDescEl.textContent = med.genericSummary;
    if (openBtn) openBtn.setAttribute("data-open-med", med.id);

    document.querySelectorAll(".hero-tab-btn").forEach((btn, i) => {
      btn.classList.toggle("active", i === idx);
      // Restart CSS progress bar animation cleanly
      const prog = btn.querySelector(".hero-tab-progress");
      if (prog && i === idx) {
        prog.style.animation = "none";
        void prog.offsetWidth;
        prog.style.animation = "";
      }
    });

    if (resetClock) startHeroTimer();
  }

  /* ---------- Lilly Health Need & Symptom Finder ---------- */
  function renderQuickNeeds() {
    const mount = document.getElementById("quickNeedsMount");
    if (!mount) return;

    const icons = ["💧", "🦴", "🤱", "🩸", "🛡️", "🍃"];
    mount.innerHTML = DATA.quickNeeds.map((need, idx) => {
      const medNames = need.medicineIds.map((id) => getMedById(id).name);
      const isActive = state.quickNeedId === need.id;
      return `
        <button type="button" class="need-card ${isActive ? "active" : ""}" style="--need-accent:${need.color}" data-need-id="${need.id}">
          <div>
            <div class="need-card-top">
              <span class="need-icon-badge" aria-hidden="true">${icons[idx % icons.length]}</span>
              <span class="need-count-tag">${need.medicineIds.length} ${need.medicineIds.length === 1 ? "Medicine" : "Medicines"}</span>
            </div>
            <h3 style="margin-top:14px;">${escapeHtml(t(need.titleEn, need.titleHi))}</h3>
            <p>${escapeHtml(t(need.subEn, need.subHi))}</p>
          </div>
          <div class="need-med-tags">
            ${medNames.map((n) => `<span>${escapeHtml(n)}</span>`).join("")}
          </div>
        </button>
      `;
    }).join("");

    mount.querySelectorAll(".need-card").forEach((card) => {
      card.addEventListener("click", () => {
        const needId = card.getAttribute("data-need-id");
        const explorerEl = document.getElementById("medicinesExplorerSection");
        if (!explorerEl) {
          window.location.href = `products.html?need=${encodeURIComponent(needId)}`;
          return;
        }
        state.quickNeedId = state.quickNeedId === needId ? null : needId;
        state.category = "all";
        renderQuickNeeds();
        renderExplorer();
        explorerEl.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  /* ---------- Emcure Therapeutic Divisions Tabbed Showcase ---------- */
  function renderDivisionsShowcase() {
    const tabsEl = document.getElementById("divisionsTabsMount");
    const panelEl = document.getElementById("divisionPanelMount");
    if (!tabsEl || !panelEl) return;

    tabsEl.innerHTML = DIVISIONS_META.map((div) => `
      <button type="button" class="div-tab-btn ${state.activeDivision === div.id ? "active" : ""}" data-div-id="${div.id}">
        <span>${escapeHtml(t(div.titleEn.split("&")[0].trim(), div.titleHi.split("और")[0].trim()))}</span>
        <span class="div-tab-count">${div.medIds.length}</span>
      </button>
    `).join("");

    tabsEl.querySelectorAll(".div-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeDivision = btn.getAttribute("data-div-id");
        renderDivisionsShowcase();
      });
    });

    const currentDiv = DIVISIONS_META.find((d) => d.id === state.activeDivision) || DIVISIONS_META[0];
    const divMeds = currentDiv.medIds.map((id) => getMedById(id));

    panelEl.innerHTML = `
      <div class="div-panel-head">
        <div>
          <span class="eyebrow eyebrow-cobalt">${t("Therapeutic Division", "चिकित्सा विभाग")}</span>
          <h3>${escapeHtml(t(currentDiv.titleEn, currentDiv.titleHi))}</h3>
          <p>${escapeHtml(t(currentDiv.descEn, currentDiv.descHi))}</p>
        </div>
        <a href="products.html?category=${encodeURIComponent(currentDiv.id)}" class="btn btn-outline btn-sm">
          ${t("Filter in Formulary", "सभी देखें")}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
      <div class="div-meds-mini-grid">
        ${divMeds.map((m) => `
          <div class="div-mini-card" data-open-med="${m.id}" role="button" tabindex="0">
            <div class="div-mini-top">
              <img src="${m.image}" alt="${escapeHtml(m.name)}" loading="lazy" />
              <div>
                <h4>${escapeHtml(m.name)}</h4>
                <small>${escapeHtml(m.dosageForm)} • ${escapeHtml(m.packSize)}</small>
              </div>
            </div>
            <p style="font-size:0.82rem;color:var(--ink-body);line-height:1.45;">${escapeHtml(t(m.taglineEn, m.taglineHi))}</p>
            <div style="display:flex;align-items:center;justify-content:space-between;font-size:0.76rem;font-weight:700;color:var(--lilly-crimson);">
              <span>${t("Inspect Monograph →", "पूरी जानकारी देखें →")}</span>
              <span style="color:var(--ink-muted);">${m.rxRequired ? "Rx" : "Sugar-Free"}</span>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  /* ---------- Merck "Vibrant Science" Interactive Microscope Lab ---------- */
  function renderScienceLab() {
    const cardsMount = document.getElementById("scienceCardsMount");
    const svgMount = document.getElementById("scienceSvgMount");
    const capMount = document.getElementById("scienceCaptionMount");
    if (!cardsMount || !svgMount || !capMount) return;

    cardsMount.innerHTML = DATA.technologies.map((tech, idx) => `
      <button type="button" class="sci-selector-card ${state.activeSciIndex === idx ? "active" : ""}" style="--sci-color:${tech.accent}" data-sci-idx="${idx}">
        <div class="sci-badge-row">
          <span class="sci-tag">${escapeHtml(tech.badge)}</span>
          <span class="sci-med-ref">${escapeHtml(tech.medicine)}</span>
        </div>
        <h3>${escapeHtml(t(tech.titleEn, tech.titleHi))}</h3>
        <p>${escapeHtml(t(tech.descEn, tech.descHi))}</p>
      </button>
    `).join("");

    cardsMount.querySelectorAll(".sci-selector-card").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeSciIndex = Number(btn.getAttribute("data-sci-idx"));
        renderScienceLab();
      });
    });

    const activeTech = DATA.technologies[state.activeSciIndex] || DATA.technologies[0];
    const linkedMed = getMedById(activeTech.medicineId);
    svgMount.innerHTML = getScienceSVG(state.activeSciIndex);
    capMount.innerHTML = `
      <span class="sci-tag" style="--sci-color:${activeTech.accent};margin-bottom:10px;display:inline-block;">${escapeHtml(activeTech.badge)}</span>
      <h4>${escapeHtml(t(activeTech.titleEn, activeTech.titleHi))} — ${escapeHtml(activeTech.medicine)}</h4>
      <p>${escapeHtml(t(activeTech.descEn, activeTech.descHi))}</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <button type="button" class="btn btn-crimson btn-sm" data-open-med="${linkedMed.id}">
          ${t("Open Clinical Monograph", "मोनोग्राफ खोलें")}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </button>
        <a href="${linkedMed.pdfUrl}" target="_blank" rel="noopener" class="btn btn-ghost-light btn-sm">
          ${t("Official PDF Brochure", "PDF ब्रोशर")}
        </a>
      </div>
    `;
  }

  /* ---------- Complete 9-Medicine Explorer (Grid & Clinical Table) ---------- */
  function initExplorerControls() {
    const section = document.getElementById("medicinesExplorerSection");
    if (!section) return;

    // Populate Dosage Form select
    const dosageSelect = document.getElementById("explorerDosageSelect");
    if (dosageSelect) {
      const forms = Array.from(new Set(DATA.medicines.map((m) => m.dosageForm)));
      dosageSelect.innerHTML = `<option value="all">${t("All Dosage Forms", "सभी खुराक रूप")}</option>` +
        forms.map((f) => `<option value="${escapeHtml(f)}">${escapeHtml(f)}</option>`).join("");
      dosageSelect.value = state.dosageForm;
      dosageSelect.addEventListener("change", () => {
        state.dosageForm = dosageSelect.value;
        renderExplorer();
      });
    }

    const searchInput = document.getElementById("explorerSearchInput");
    const clearBtn = document.getElementById("explorerSearchClear");
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        state.searchQuery = searchInput.value.trim();
        if (clearBtn) clearBtn.classList.toggle("visible", state.searchQuery.length > 0);
        renderExplorer();
      });
    }
    if (clearBtn && searchInput) {
      clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        state.searchQuery = "";
        clearBtn.classList.remove("visible");
        renderExplorer();
      });
    }

    const sugarBtn = document.getElementById("explorerSugarBtn");
    if (sugarBtn) {
      sugarBtn.addEventListener("click", () => {
        state.sugarFreeOnly = !state.sugarFreeOnly;
        sugarBtn.classList.toggle("active", state.sugarFreeOnly);
        renderExplorer();
      });
    }

    const viewBtns = document.querySelectorAll("[data-view-mode]");
    viewBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        state.viewMode = btn.getAttribute("data-view-mode") === "table" ? "table" : "grid";
        viewBtns.forEach((b) => b.classList.toggle("active", b === btn));
        renderExplorer();
      });
    });

    const resetBtn = document.getElementById("resetExplorerFiltersBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        state.category = "all";
        state.quickNeedId = null;
        state.dosageForm = "all";
        state.sugarFreeOnly = false;
        state.rxOnly = false;
        state.searchQuery = "";
        if (searchInput) searchInput.value = "";
        if (clearBtn) clearBtn.classList.remove("visible");
        if (dosageSelect) dosageSelect.value = "all";
        if (sugarBtn) sugarBtn.classList.remove("active");
        renderQuickNeeds();
        renderExplorer();
      });
    }

    renderExplorer();
  }

  function getFilteredMedicines() {
    const q = state.searchQuery.toLowerCase();
    const activeNeed = state.quickNeedId
      ? DATA.quickNeeds.find((n) => n.id === state.quickNeedId)
      : null;

    return DATA.medicines.filter((m) => {
      if (activeNeed && !activeNeed.medicineIds.includes(m.id)) return false;
      if (state.category !== "all") {
        if (state.category === "rx") {
          if (!m.rxRequired) return false;
        } else {
          const inPrimary = m.category === state.category;
          const inSecondary = (m.secondaryCategories || []).includes(state.category);
          if (!inPrimary && !inSecondary) return false;
        }
      }
      if (state.dosageForm !== "all" && m.dosageForm !== state.dosageForm) return false;
      if (state.sugarFreeOnly && !m.sugarFree) return false;
      if (state.rxOnly && !m.rxRequired) return false;

      if (q) {
        const hay = [
          m.name,
          m.shortTitle,
          m.genericSummary,
          m.technology,
          m.dosageForm,
          m.taglineEn,
          m.taglineHi,
          ...(m.keywords || []),
          ...(m.indications || [])
        ].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  function renderExplorer() {
    const catMount = document.getElementById("explorerCategoryPills");
    const gridMount = document.getElementById("explorerMount");
    const statusStrip = document.getElementById("explorerFilterStatus");
    const statusText = document.getElementById("explorerFilterStatusText");
    if (!gridMount) return;

    if (catMount) {
      const cats = [
        ...DATA.categories,
        { id: "rx", labelEn: "Rx Prescription (3)", labelHi: "डॉक्टर के पर्चे वाली (Rx)" }
      ];
      catMount.innerHTML = cats.map((c) => `
        <button type="button" class="cat-pill-btn ${state.category === c.id && !state.quickNeedId ? "active" : ""}" data-cat-id="${c.id}">
          ${escapeHtml(t(c.labelEn, c.labelHi))}
        </button>
      `).join("");

      catMount.querySelectorAll(".cat-pill-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          state.category = btn.getAttribute("data-cat-id");
          state.quickNeedId = null;
          renderQuickNeeds();
          renderExplorer();
        });
      });
    }

    const filtered = getFilteredMedicines();
    const isFiltered = state.category !== "all" || state.quickNeedId || state.dosageForm !== "all" || state.sugarFreeOnly || state.searchQuery;

    if (statusStrip && statusText) {
      statusStrip.classList.toggle("visible", Boolean(isFiltered));
      statusText.textContent = t(
        `Showing ${filtered.length} of ${DATA.medicines.length} Bioplasma formulations`,
        `कुल ${DATA.medicines.length} में से ${filtered.length} दवाइयाँ दिखाई जा रही हैं`
      );
    }

    if (filtered.length === 0) {
      gridMount.innerHTML = `
        <div style="text-align:center;padding:56px 20px;background:var(--surface);border-radius:var(--radius-lg);border:1px solid var(--line-strong);">
          <h3 style="font-size:1.25rem;margin-bottom:8px;">${t("No matching formulations found", "कोई मिलान वाली दवाई नहीं मिली")}</h3>
          <p style="color:var(--ink-muted);margin-bottom:18px;">${t("Try clearing your search term or resetting active filters to view all 9 Bioplasma medicines.", "सभी 9 दवाइयाँ देखने के लिए फ़िल्टर रीसेट करें।")}</p>
        </div>
      `;
      return;
    }

    if (state.viewMode === "table") {
      gridMount.innerHTML = `
        <div class="clinical-table-wrap">
          <table class="clinical-table">
            <thead>
              <tr>
                <th>${t("Brand", "ब्रांड नाम")}</th>
                <th>${t("Active Composition", "मुख्य साल्ट / संरचना")}</th>
                <th>${t("Delivery Technology", "डिलीवरी तकनीक")}</th>
                <th>${t("Dosage & Pack", "खुराक व पैक")}</th>
                <th>${t("Actions", "विवरण")}</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map((m) => `
                <tr data-open-med="${m.id}">
                  <td>
                    <div style="display:flex;align-items:center;gap:12px;">
                      <img src="${m.image}" alt="${escapeHtml(m.name)}" style="width:46px;height:46px;object-fit:contain;" loading="lazy" />
                      <div>
                        <strong style="font-size:0.96rem;display:block;">${escapeHtml(m.name)}</strong>
                        <span class="med-sched-chip ${m.rxRequired ? "rx" : ""}" style="display:inline-block;margin-top:3px;">${m.rxRequired ? "Rx Only" : "Sugar-Free"}</span>
                      </div>
                    </div>
                  </td>
                  <td style="max-width:300px;color:var(--ink-body);font-weight:500;">${escapeHtml(m.genericSummary)}</td>
                  <td><span class="med-tech-chip">${escapeHtml(m.technology)}</span></td>
                  <td style="color:var(--ink-muted);font-size:0.82rem;">${escapeHtml(m.dosageForm)}<br/>${escapeHtml(m.packSize)}</td>
                  <td onclick="event.stopPropagation();">
                    <div style="display:flex;gap:8px;align-items:center;">
                      <button type="button" class="btn btn-cobalt btn-sm" data-open-med="${m.id}">${t("Monograph", "विवरण")}</button>
                      <a href="${m.pdfUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">PDF</a>
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
      return;
    }

    gridMount.innerHTML = `
      <div class="medicines-grid">
        ${filtered.map((m) => {
          const inCompare = state.compareIds.includes(m.id);
          return `
            <article class="med-card" style="--med-accent:${m.accent}">
              <div class="med-card-visual" data-open-med="${m.id}" title="Click to inspect full monograph">
                <div class="med-badges-top">
                  <span class="med-tech-chip">${escapeHtml(m.technology)}</span>
                  <span class="med-sched-chip ${m.rxRequired ? "rx" : ""}">${m.rxRequired ? "Rx Prescription" : (m.sugarFree ? "Sugar-Free" : "Supplement")}</span>
                </div>
                <img src="${m.image}" alt="${escapeHtml(m.name)} packshot" loading="lazy" />
              </div>
              <div class="med-card-body">
                <div class="med-dosage-meta">${escapeHtml(m.dosageForm)} • ${escapeHtml(m.packSize)}</div>
                <h3 class="med-card-title" data-open-med="${m.id}">${escapeHtml(m.name)}</h3>
                <div class="med-card-salt">${escapeHtml(m.genericSummary)}</div>
                <p class="med-card-desc">${escapeHtml(t(m.taglineEn, m.taglineHi))}</p>
                <div class="med-card-actions">
                  <button type="button" class="btn btn-cobalt btn-sm" data-open-med="${m.id}">
                    ${t("Full Monograph", "पूरी जानकारी")}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </button>
                  <div style="display:flex;gap:6px;align-items:center;">
                    <a href="${m.pdfUrl}" target="_blank" rel="noopener" class="compare-check-btn" title="Download Official PDF">PDF</a>
                    <button type="button" class="compare-check-btn ${inCompare ? "selected" : ""}" data-toggle-compare="${m.id}">
                      ${inCompare ? "✓ Compared" : "+ Compare"}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    `;

    gridMount.querySelectorAll("[data-toggle-compare]").forEach((btn) => {
      btn.addEventListener("click", () => {
        toggleCompareMedicine(btn.getAttribute("data-toggle-compare"));
      });
    });
  }

  /* ---------- Side-by-Side Formulation Comparator ---------- */
  function toggleCompareMedicine(medId) {
    const idx = state.compareIds.indexOf(medId);
    if (idx >= 0) {
      state.compareIds.splice(idx, 1);
    } else {
      if (state.compareIds.length >= 3) {
        state.compareIds.shift();
      }
      state.compareIds.push(medId);
    }
    renderExplorer();
    syncCompareDock();
  }

  function syncCompareDock() {
    let dock = document.getElementById("compareDock");
    if (!dock) {
      dock = document.createElement("div");
      dock.id = "compareDock";
      dock.className = "compare-dock";
      document.body.appendChild(dock);
    }

    if (state.compareIds.length === 0) {
      dock.classList.remove("visible");
      return;
    }

    dock.classList.add("visible");
    dock.innerHTML = `
      <div class="compare-dock-pills">
        ${state.compareIds.map((id) => {
          const m = getMedById(id);
          return `<span class="compare-pill-tag">${escapeHtml(m.name)} <button type="button" data-rm-cmp="${id}" aria-label="Remove" style="color:#FCA5A5;font-weight:800;">✕</button></span>`;
        }).join("")}
      </div>
      <button type="button" class="btn btn-crimson btn-sm" id="openCompareModalBtn">
        ${t(`Compare (${state.compareIds.length})`, `तुलना करें (${state.compareIds.length})`)}
      </button>
      <button type="button" class="btn btn-ghost-light btn-sm" id="clearCompareAllBtn">${t("Clear", "हटाएँ")}</button>
    `;

    dock.querySelectorAll("[data-rm-cmp]").forEach((b) => {
      b.addEventListener("click", () => toggleCompareMedicine(b.getAttribute("data-rm-cmp")));
    });
    dock.querySelector("#openCompareModalBtn")?.addEventListener("click", openCompareModal);
    dock.querySelector("#clearCompareAllBtn")?.addEventListener("click", () => {
      state.compareIds = [];
      renderExplorer();
      syncCompareDock();
    });
  }

  function openCompareModal() {
    ensureSharedModals();
    const backdrop = document.getElementById("compareModalBackdrop");
    const body = document.getElementById("compareModalBody");
    if (!backdrop || !body) return;

    const meds = state.compareIds.map((id) => getMedById(id));
    body.innerHTML = `
      <div class="clinical-table-wrap">
        <table class="clinical-table">
          <thead>
            <tr>
              <th>Specification</th>
              ${meds.map((m) => `<th>${escapeHtml(m.name)}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Packshot</strong></td>
              ${meds.map((m) => `<td><img src="${m.image}" alt="${escapeHtml(m.name)}" style="height:95px;object-fit:contain;" /></td>`).join("")}
            </tr>
            <tr>
              <td><strong>Active Composition</strong></td>
              ${meds.map((m) => `<td>${escapeHtml(m.genericSummary)}</td>`).join("")}
            </tr>
            <tr>
              <td><strong>Delivery Platform</strong></td>
              ${meds.map((m) => `<td><span class="med-tech-chip">${escapeHtml(m.technology)}</span></td>`).join("")}
            </tr>
            <tr>
              <td><strong>Dosage Form &amp; Pack</strong></td>
              ${meds.map((m) => `<td>${escapeHtml(m.dosageForm)} (${escapeHtml(m.packSize)})</td>`).join("")}
            </tr>
            <tr>
              <td><strong>Regulatory / Sugar Status</strong></td>
              ${meds.map((m) => `<td>${m.rxRequired ? "<strong style='color:#BE123C;'>Rx Prescription</strong>" : "OTC / Supplement"} • ${m.sugarFree ? "100% Sugar-Free" : "Standard"}</td>`).join("")}
            </tr>
            <tr>
              <td><strong>Primary Indications</strong></td>
              ${meds.map((m) => `<td>${(m.indications || []).slice(0, 4).map(escapeHtml).join("; ")}</td>`).join("")}
            </tr>
            <tr>
              <td><strong>Official Literature</strong></td>
              ${meds.map((m) => `<td><a href="${m.pdfUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">Download PDF</a></td>`).join("")}
            </tr>
          </tbody>
        </table>
      </div>
    `;

    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  /* ---------- Three-Symbol Emblem Pillars & Brochure Vault ---------- */
  function renderPillarsAndBrochures() {
    const pillarsMount = document.getElementById("pillarsEditorialMount");
    if (pillarsMount) {
      const svgs = [
        `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
        `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
        `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`
      ];
      pillarsMount.innerHTML = DATA.company.pillars.map((p, idx) => `
        <div class="pillar-card" style="--p-color:${p.color}">
          <div class="pillar-num-row">
            <div class="pillar-icon-circle">${svgs[idx]}</div>
            <span class="pillar-num">SYMBOL 0${idx + 1}</span>
          </div>
          <h3>${escapeHtml(t(p.titleEn, p.titleHi))}</h3>
          <p>${escapeHtml(t(p.descEn, p.descHi))}</p>
        </div>
      `).join("");
    }

    const brochureMount = document.getElementById("brochuresVaultMount");
    if (brochureMount) {
      brochureMount.innerHTML = DATA.medicines.map((m) => `
        <div class="brochure-card">
          <div class="brochure-thumb" data-open-med="${m.id}" title="Click to inspect ${escapeHtml(m.name)} monograph">
            <img src="${m.brochureImg}" alt="${escapeHtml(m.name)} Official Visual Aid" loading="lazy" />
          </div>
          <div class="brochure-body">
            <div>
              <h4>${escapeHtml(m.name)}</h4>
              <span>${escapeHtml(m.dosageForm)} • ${escapeHtml(m.packSize)}</span>
            </div>
            <a href="${m.pdfUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">
              PDF ↗
            </a>
          </div>
        </div>
      `).join("");
    }
  }

  /* ---------- Shared Modals Injection (Works on Every Page!) ---------- */
  function ensureSharedModals() {
    if (document.getElementById("monographModalBackdrop")) return;

    const modalHtml = `
      <!-- Clinical Monograph Modal -->
      <div class="modal-backdrop" id="monographModalBackdrop" role="dialog" aria-modal="true" aria-label="Clinical Monograph">
        <div class="modal-window">
          <div class="modal-header-bar">
            <div style="display:flex;gap:8px;align-items:center;">
              <button type="button" class="btn btn-outline btn-sm" id="monoPrevBtn">← Prev</button>
              <button type="button" class="btn btn-outline btn-sm" id="monoNextBtn">Next →</button>
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
              <button type="button" class="btn btn-outline btn-sm" id="monoPrintBtn">🖨️ Print</button>
              <button type="button" class="btn btn-crimson btn-sm" id="monoCloseBtn">✕ Close</button>
            </div>
          </div>
          <div class="modal-body-scroll" id="monographModalBody"></div>
        </div>
      </div>

      <!-- Compare Modal -->
      <div class="modal-backdrop" id="compareModalBackdrop" role="dialog" aria-modal="true" aria-label="Compare Formulations">
        <div class="modal-window">
          <div class="modal-header-bar">
            <strong style="font-size:1rem;">Side-by-Side Formulation Comparison</strong>
            <button type="button" class="btn btn-crimson btn-sm" id="compareCloseBtn">✕ Close</button>
          </div>
          <div class="modal-body-scroll" id="compareModalBody"></div>
        </div>
      </div>

      <!-- Global Quick Search Modal -->
      <div class="modal-backdrop" id="quickSearchBackdrop" role="dialog" aria-modal="true" aria-label="Quick Search">
        <div class="modal-window" style="max-width:680px;">
          <div class="modal-header-bar">
            <strong style="font-size:0.96rem;">Search Bioplasma Formulary &amp; Symptoms</strong>
            <button type="button" class="btn btn-outline btn-sm" id="quickSearchCloseBtn">✕ Esc</button>
          </div>
          <div class="modal-body-scroll">
            <input type="search" id="quickSearchModalInput" class="search-input" style="padding-left:18px;" placeholder="Type medicine (e.g. Bioipc, Pantheta), salt (Vitamin D3, Iron), or symptom..." autocomplete="off" />
            <div class="quick-search-list" id="quickSearchResultsMount"></div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHtml);

    document.getElementById("monoCloseBtn")?.addEventListener("click", closeAllModals);
    document.getElementById("compareCloseBtn")?.addEventListener("click", closeAllModals);
    document.getElementById("quickSearchCloseBtn")?.addEventListener("click", closeAllModals);
    document.getElementById("monoPrintBtn")?.addEventListener("click", () => window.print());
    document.getElementById("monoPrevBtn")?.addEventListener("click", () => stepMonographModal(-1));
    document.getElementById("monoNextBtn")?.addEventListener("click", () => stepMonographModal(1));

    ["monographModalBackdrop", "compareModalBackdrop", "quickSearchBackdrop"].forEach((id) => {
      const el = document.getElementById(id);
      el?.addEventListener("click", (e) => {
        if (e.target === el) closeAllModals();
      });
    });

    const qsInput = document.getElementById("quickSearchModalInput");
    qsInput?.addEventListener("input", () => renderQuickSearchResults(qsInput.value));
  }

  function closeAllModals() {
    ["monographModalBackdrop", "compareModalBackdrop", "quickSearchBackdrop"].forEach((id) => {
      document.getElementById(id)?.classList.remove("open");
    });
    document.body.style.overflow = "";
  }

  function openQuickSearchModal() {
    ensureSharedModals();
    const backdrop = document.getElementById("quickSearchBackdrop");
    const input = document.getElementById("quickSearchModalInput");
    if (!backdrop || !input) return;
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
    renderQuickSearchResults(input.value);
    setTimeout(() => input.focus(), 50);
  }

  function renderQuickSearchResults(query) {
    const mount = document.getElementById("quickSearchResultsMount");
    if (!mount) return;
    const q = (query || "").trim().toLowerCase();
    const matches = DATA.medicines.filter((m) => {
      if (!q) return true;
      const hay = [m.name, m.genericSummary, m.technology, ...(m.keywords || []), ...(m.indications || [])].join(" ").toLowerCase();
      return hay.includes(q);
    });

    mount.innerHTML = matches.map((m) => `
      <div class="qs-result-row" data-open-med="${m.id}">
        <div class="qs-result-left">
          <img src="${m.image}" alt="${escapeHtml(m.name)}" />
          <div>
            <strong style="display:block;font-size:0.96rem;">${escapeHtml(m.name)}</strong>
            <span style="font-size:0.8rem;color:var(--ink-muted);">${escapeHtml(m.genericSummary)}</span>
          </div>
        </div>
        <span style="font-size:0.78rem;font-weight:700;color:var(--lilly-crimson);">View →</span>
      </div>
    `).join("");
  }

  function stepMonographModal(delta) {
    if (!state.currentModalMedId) return;
    const idx = DATA.medicines.findIndex((m) => m.id === state.currentModalMedId);
    const nextIdx = (idx + delta + DATA.medicines.length) % DATA.medicines.length;
    openMonographModal(DATA.medicines[nextIdx].id);
  }

  function openMonographModal(medId) {
    ensureSharedModals();
    closeAllModals();
    const m = getMedById(medId);
    state.currentModalMedId = m.id;

    const backdrop = document.getElementById("monographModalBackdrop");
    const body = document.getElementById("monographModalBody");
    if (!backdrop || !body) return;

    const perks = state.lang === "hi" ? m.easyGuide.keyPerksHi : m.easyGuide.keyPerksEn;

    body.innerHTML = `
      <div class="monograph-hero">
        <div class="monograph-pack-box">
          <img src="${m.image}" alt="${escapeHtml(m.name)} packshot" />
        </div>
        <div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
            <span class="med-tech-chip">${escapeHtml(m.technology)}</span>
            <span class="med-sched-chip ${m.rxRequired ? "rx" : ""}">${m.rxRequired ? "Rx Prescription Required" : "Health Supplement / OTC"}</span>
            ${m.sugarFree ? `<span class="med-sched-chip">100% Sugar-Free</span>` : ""}
          </div>
          <h2 style="font-size:clamp(1.75rem,3vw,2.4rem);font-weight:800;line-height:1.1;margin-bottom:6px;">${escapeHtml(m.name)}</h2>
          <p style="font-size:0.96rem;font-weight:600;color:var(--bio-cobalt);margin-bottom:12px;">${escapeHtml(m.shortTitle)}</p>
          <p style="font-size:0.94rem;color:var(--ink-body);margin-bottom:18px;">${escapeHtml(t(m.taglineEn, m.taglineHi))}</p>
          <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:0.82rem;color:var(--ink-muted);margin-bottom:18px;">
            <span><strong>Pack:</strong> ${escapeHtml(m.packSize)}</span>
            <span>•</span>
            <span><strong>Form:</strong> ${escapeHtml(m.dosageForm)}</span>
            <span>•</span>
            <span><strong>Profile:</strong> ${escapeHtml(m.flavour)}</span>
          </div>
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <a href="${m.pdfUrl}" target="_blank" rel="noopener" class="btn btn-crimson btn-sm">
              Download Official PDF Brochure ↗
            </a>
            <a href="contact.html?med=${encodeURIComponent(m.id)}" class="btn btn-outline btn-sm">
              Enquire for Distribution / Samples
            </a>
          </div>
        </div>
      </div>

      <!-- Easy Patient & Clinician Summary -->
      <div class="mono-section-block">
        <h4>${t("Patient-Friendly Overview (EN / हिंदी)", "आसान रोगी मार्गदर्शिका")}</h4>
        <div class="easy-patient-box">
          <div>
            <strong style="display:block;margin-bottom:4px;font-size:0.88rem;">${t("What is it?", "यह क्या है?")}</strong>
            <p style="font-size:0.86rem;color:var(--ink-body);margin-bottom:12px;">${escapeHtml(t(m.easyGuide.whatIsItEn, m.easyGuide.whatIsItHi))}</p>
            <strong style="display:block;margin-bottom:4px;font-size:0.88rem;">${t("Who is it recommended for?", "यह किसके लिए उपयोगी है?")}</strong>
            <p style="font-size:0.86rem;color:var(--ink-body);">${escapeHtml(t(m.easyGuide.whoIsItForEn, m.easyGuide.whoIsItHi))}</p>
          </div>
          <div>
            <strong style="display:block;margin-bottom:8px;font-size:0.88rem;">${t("Key Compliance Benefits", "मुख्य लाभ")}</strong>
            <ul style="display:flex;flex-direction:column;gap:7px;">
              ${perks.map((pk) => `<li style="font-size:0.85rem;color:var(--ink-body);display:flex;gap:8px;"><span style="color:var(--bio-emerald);font-weight:800;">✓</span><span>${escapeHtml(pk)}</span></li>`).join("")}
            </ul>
          </div>
        </div>
      </div>

      <!-- Complete Composition Table -->
      <div class="mono-section-block">
        <h4>${t("Active Composition & Nutritional / Pharmacopoeial Strength", "संपूर्ण संरचना और मात्रा")}</h4>
        <div class="clinical-table-wrap">
          <table class="comp-table">
            <thead>
              <tr>
                <th>Active Ingredient</th>
                <th>Specification / Role</th>
                <th>Strength</th>
                <th>% RDA / Reference</th>
              </tr>
            </thead>
            <tbody>
              ${m.composition.map((c) => `
                <tr>
                  <td><strong>${escapeHtml(c.ingredient)}</strong></td>
                  <td style="color:var(--ink-body);">${escapeHtml(c.detail)}</td>
                  <td><strong style="color:var(--bio-cobalt);">${escapeHtml(c.strength)}</strong></td>
                  <td>
                    <span>${escapeHtml(c.rda)}</span>
                    ${c.rdaPct ? `<div class="rda-bar"><span style="width:${Math.min(100, c.rdaPct)}%"></span></div>` : ""}
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <!-- 3-Step Mechanism of Action -->
      <div class="mono-section-block">
        <h4>${t("3-Phase Mechanism of Action", "दवा कैसे काम करती है (Mechanism)")}</h4>
        <div class="moa-steps-grid">
          ${m.mechanism.map((step) => `
            <div class="moa-card">
              <small>${escapeHtml(step.step)}</small>
              <h5>${escapeHtml(step.title)}</h5>
              <p>${escapeHtml(step.desc)}</p>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Indications & Dosage -->
      <div class="mono-section-block" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;">
        <div style="background:var(--bg-warm);padding:18px;border-radius:var(--radius-md);border:1px solid var(--line);">
          <h4 style="margin-bottom:10px;">Clinical Indications</h4>
          <ul style="display:flex;flex-direction:column;gap:6px;">
            ${m.indications.map((ind) => `<li style="font-size:0.85rem;color:var(--ink-body);">• ${escapeHtml(ind)}</li>`).join("")}
          </ul>
        </div>
        <div style="background:var(--bg-warm);padding:18px;border-radius:var(--radius-md);border:1px solid var(--line);">
          <h4 style="margin-bottom:10px;">Recommended Administration</h4>
          <p style="font-size:0.88rem;color:var(--ink-body);margin-bottom:12px;">${escapeHtml(m.dosage)}</p>
          <div style="font-size:0.78rem;color:var(--ink-muted);padding-top:10px;border-top:1px solid var(--line);">
            <strong>Note:</strong> ${m.rxRequired ? "Schedule Prescription formulation — strictly administer under a Registered Medical Practitioner's advice." : "Use as directed by the Physician / Healthcare Professional."}
          </div>
        </div>
      </div>

      <!-- Visual Aid Preview -->
      <div class="mono-section-block" style="margin-bottom:0;">
        <h4>Official Visual-Aid Artwork Preview</h4>
        <div style="border-radius:var(--radius-md);overflow:hidden;border:1px solid var(--line-strong);max-height:360px;">
          <img src="${m.brochureImg}" alt="${escapeHtml(m.name)} brochure" style="width:100%;object-fit:cover;" loading="lazy" />
        </div>
      </div>
    `;

    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
    body.scrollTop = 0;
  }

  /* ---------- Partner & Clinician Enquiry Form ---------- */
  function initEnquiryForm() {
    const form = document.getElementById("bioplasmaEnquiryForm");
    const chipsMount = document.getElementById("enquiryMedChipsMount");
    if (!form) return;

    // Preselect med from URL if passed (?med=bioipc)
    const params = new URLSearchParams(window.location.search);
    const urlMed = params.get("med");
    if (urlMed && DATA.medicines.some((m) => m.id === urlMed)) {
      state.selectedEnquiryMeds.add(urlMed);
    }

    function renderChips() {
      if (!chipsMount) return;
      chipsMount.innerHTML = DATA.medicines.map((m) => {
        const active = state.selectedEnquiryMeds.has(m.id);
        return `<button type="button" class="med-form-chip ${active ? "active" : ""}" data-enq-med="${m.id}">${active ? "✓ " : "+ "}${escapeHtml(m.name)}</button>`;
      }).join("");

      chipsMount.querySelectorAll(".med-form-chip").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-enq-med");
          if (state.selectedEnquiryMeds.has(id)) state.selectedEnquiryMeds.delete(id);
          else state.selectedEnquiryMeds.add(id);
          renderChips();
        });
      });
    }
    renderChips();

    function buildEnquiryPayload() {
      const name = document.getElementById("enqName")?.value.trim() || "";
      const role = document.getElementById("enqRole")?.value || "Distributor / Stockist";
      const phone = document.getElementById("enqPhone")?.value.trim() || "";
      const city = document.getElementById("enqCity")?.value.trim() || "";
      const email = document.getElementById("enqEmail")?.value.trim() || "Not provided";
      const msg = document.getElementById("enqMessage")?.value.trim() || "Please share literature and partnership details.";
      const selectedNames = Array.from(state.selectedEnquiryMeds).map((id) => getMedById(id).name).join(", ") || "Full 9-Product Portfolio";

      const subject = `[LV Bioplasma Enquiry] ${role} — ${name} (${city})`;
      const body = [
        `Dear Bioplasma Biologicals Desk (Gurugram NCR),`,
        ``,
        `Name / Firm: ${name}`,
        `Category: ${role}`,
        `Phone / WhatsApp: ${phone}`,
        `City & State: ${city}`,
        `Email: ${email}`,
        `Formulations of Interest: ${selectedNames}`,
        ``,
        `Requirement / Message:`,
        msg
      ].join("\n");

      return { name, phone, city, subject, body };
    }

    const feedbackEl = document.getElementById("enqFeedbackMsg");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const payload = buildEnquiryPayload();
      if (!payload.name || !payload.phone || !payload.city) {
        if (feedbackEl) {
          feedbackEl.textContent = "Please fill in your Name, Phone/WhatsApp number, and City.";
          feedbackEl.classList.add("show");
        }
        return;
      }
      const mailto = `mailto:${DATA.company.email}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(payload.body)}`;
      window.location.href = mailto;
      if (feedbackEl) {
        feedbackEl.textContent = `Opening your email client addressed to ${DATA.company.email}. You can also copy the enquiry text below.`;
        feedbackEl.classList.add("show");
      }
    });

    document.getElementById("copyEnquiryTextBtn")?.addEventListener("click", async () => {
      const payload = buildEnquiryPayload();
      try {
        await navigator.clipboard.writeText(payload.body);
        if (feedbackEl) {
          feedbackEl.textContent = `Enquiry text copied! Send via email to ${DATA.company.email}.`;
          feedbackEl.classList.add("show");
        }
      } catch (_) {
        if (feedbackEl) {
          feedbackEl.textContent = `Please email us directly at ${DATA.company.email}.`;
          feedbackEl.classList.add("show");
        }
      }
    });
  }

  /* ---------- FAQ Accordion ---------- */
  function initFaqAccordion() {
    document.querySelectorAll(".faq-q").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        item?.classList.toggle("open");
      });
    });
  }

  /* ---------- URL Parameter Hydration ---------- */
  function applyUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    const need = params.get("need");
    const openMed = params.get("open");

    if (cat) state.category = cat;
    if (need) state.quickNeedId = need;
    if (openMed && DATA.medicines.some((m) => m.id === openMed)) {
      setTimeout(() => openMonographModal(openMed), 180);
    }
  }

  /* ---------- Language UI Sync ---------- */
  function syncLanguageUI() {
    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-set-lang") === state.lang);
    });

    // Update Hero Tab Titles
    HERO_SLIDES.forEach((s, idx) => {
      const tEl = document.querySelector(`[data-hero-tab-title="${idx}"]`);
      const sEl = document.querySelector(`[data-hero-tab-sub="${idx}"]`);
      if (tEl) tEl.textContent = t(s.tabTitleEn, s.tabTitleHi);
      if (sEl) sEl.textContent = t(s.tabSubEn, s.tabSubHi);
    });

    if (document.getElementById("heroCarouselRoot")) {
      setHeroSlide(state.heroIndex, false);
    }
    renderQuickNeeds();
    renderDivisionsShowcase();
    renderScienceLab();
    renderPillarsAndBrochures();
    if (document.getElementById("medicinesExplorerSection")) {
      renderExplorer();
    }
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    applyUrlParams();
    initHeaderAndNav();
    initHeroCarousel();
    renderQuickNeeds();
    renderDivisionsShowcase();
    renderScienceLab();
    initExplorerControls();
    renderPillarsAndBrochures();
    initEnquiryForm();
    initFaqAccordion();
    syncLanguageUI();
  });
})();
