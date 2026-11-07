/**
 * LV Bioplasma Biologicals Private Limited — V4 Interactive Cinema Engine
 * Tagline: (Working with Nature Through Bio-Technology for a Healthy Life)
 *   - Full-bleed dual-buffered crossfading background HD video reel
 *   - WCAG 2.2 Play/Pause motion accessibility control & live progress dock
 *   - Widescreen 4-chapter Brand Film Theater Modal ("Watch Our Story")
 *   - Complete 9-Medicine Formulary, Comparator, Quick Search & Bilingual EN/HI
 */
(function () {
  "use strict";

  const DATA = window.BIOPLASMA_DATA;
  if (!DATA) return;

  function formatProductName(raw) {
    return String(raw || "")
      .replace(/[®™]/g, "")
      .replace(/\((?:R|TM)\)/gi, "")
      .replace(/\s+/g, " ")
      .trim()
      .toUpperCase();
  }

  function formatTechBadge(med) {
    const raw = String(med?.techBadge || med?.technology || "")
      .replace(/[®™]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toUpperCase();
    return raw.length > 26 ? `${raw.slice(0, 24).trim()}…` : raw;
  }

  if (Array.isArray(DATA.medicines)) {
    DATA.medicines.forEach((m) => {
      m.name = formatProductName(m.name);
      m.techBadge = formatTechBadge(m);
    });
  }
  if (Array.isArray(DATA.technologies)) {
    DATA.technologies.forEach((tech) => {
      if (tech.medicine) tech.medicine = formatProductName(tech.medicine);
    });
  }

  const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const state = {
    lang: "en",
    heroIndex: 0,
    heroVideoPaused: prefersReducedMotion,
    heroHoverHold: false,
    heroElapsedMs: 0,
    heroDurationMs: 8500,
    heroLastTick: 0,
    heroRafId: null,
    activeVideoSlot: "A",
    filmChapterIndex: 0,
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

  /* ---------- V4 Cinema Hero Video Stories (6 Local HD MP4 Chapters) ---------- */
  const HERO_SLIDES = [
    {
      num: "01",
      videoSrc: "assets/video/hero-human-life.mp4",
      tabTitleEn: "Nature & Bio-Tech",
      tabTitleHi: "प्रकृति और बायो-टेक",
      tabSubEn: "For a Healthy Life",
      tabSubHi: "स्वस्थ जीवन के लिए",
      tagEn: "LV Bioplasma Biologicals • Bio-Technology for Health",
      tagHi: "एलवी बायोप्लाज़्मा • जैव-प्रौद्योगिकी से स्वस्थ जीवन",
      headlineEn: 'Working with nature through <span class="accent-word">bio-technology</span> for a healthy life.',
      headlineHi: 'स्वस्थ जीवन के लिए जैव-प्रौद्योगिकी के माध्यम से <span class="accent-word">प्रकृति के साथ कार्य</span>।',
      subEn: "Inspired by life’s meaningful moments across every generation — LV Bioplasma Biologicals pairs globally trusted actives with gentle nano, liposomal, and dual-release formulations.",
      subHi: "बचपन से बुज़ुर्गों तक हर पीढ़ी की सेहत के लिए — LV बायोप्लाज़्मा बायोलॉजिकल्स विश्व-स्तरीय तत्वों और सौम्य डिलीवरी विज्ञान से तेज़ असर वाली दवाइयाँ बनाता है।",
      glowColor: "radial-gradient(circle, rgba(245, 158, 11, 0.34) 0%, transparent 70%)",
      medId: "aadirise-d3",
      ctaHref: "#medicinesExplorerSection",
      ctaLabelEn: "Explore All Our Medicines",
      ctaLabelHi: "हमारी सभी दवाइयाँ देखें"
    },
    {
      num: "02",
      videoSrc: "assets/video/hero-formulation-lab.mp4",
      tabTitleEn: "Nano Formulation Lab",
      tabTitleHi: "नैनो फॉर्मूलेशन लैब",
      tabSubEn: "Precision liquid micro-dosing",
      tabSubHi: "उन्नत सूक्ष्म डिलीवरी विज्ञान",
      tagEn: "Vibrant Delivery Science • Gurugram NCR, India",
      tagHi: "आधुनिक ड्रग डिलीवरी विज्ञान • गुरुग्राम NCR",
      headlineEn: 'Where <span class="accent-word">nano-droplet</span> discovery meets gentle absorption.',
      headlineHi: 'जहाँ <span class="accent-word">नैनो-ड्रॉपलेट</span> विज्ञान देता है तेज़ और सौम्य अवशोषण।',
      subEn: "From 60,000 IU sugar-free Vitamin D3 nano-micelles to phospholipid-shielded Liposomal Iron + 4th-gen Quatrefolic®, our liquid & cellular engineering eliminates harsh GI irritation.",
      subHi: "60,000 IU शुगर-फ्री विटामिन D3 नैनो-शॉट से लेकर लिपोसोमल आयरन + Quatrefolic® तक — बिना पेट की जलन या धातु जैसे स्वाद के संपूर्ण अवशोषण।",
      glowColor: "radial-gradient(circle, rgba(225, 29, 100, 0.34) 0%, transparent 70%)",
      medId: "bioipc",
      ctaHref: "#medicinesExplorerSection",
      ctaLabelEn: "Explore All Our Medicines",
      ctaLabelHi: "हमारी सभी दवाइयाँ देखें"
    },
    {
      num: "03",
      videoSrc: "assets/video/hero-cellular-uptake.mp4",
      tabTitleEn: "Cellular Bioavailability",
      tabTitleHi: "कोशिकीय जैव-उपलब्धता",
      tabSubEn: "Aquamin™ & Spore Probiotics",
      tabSubHi: "Aquamin™ व प्रोबायोटिक सुरक्षा",
      tagEn: "Bio-Pure Global Actives • Cellular Precision",
      tagHi: "अंतर्राष्ट्रीय शुद्ध तत्व • कोशिकीय पोषण",
      headlineEn: 'Bio-pure <span class="accent-word">marine minerals</span> reaching every living cell.',
      headlineHi: 'शरीर की हर कोशिका तक पहुँचने वाला <span class="accent-word">शुद्ध समुद्री</span> पोषण।',
      subEn: "Porous Irish Aquamin™ marine algae calcium (~86.5% bioavailable with 72 trace minerals + Vitamin K2-7) and 2 Billion resilient Bacillus clausii spores built for cellular harmony.",
      subHi: "आयरलैंड का समुद्री शैवाल कैल्शियम Aquamin™ (~86.5% अवशोषण + विटामिन K2-7) और 2 बिलियन Bacillus clausii प्रोबायोटिक स्पोर्स।",
      glowColor: "radial-gradient(circle, rgba(56, 189, 248, 0.34) 0%, transparent 70%)",
      medId: "adenocal-k2",
      ctaHref: "#medicinesExplorerSection",
      ctaLabelEn: "Explore All Our Medicines",
      ctaLabelHi: "हमारी सभी दवाइयाँ देखें"
    },
    {
      num: "04",
      videoSrc: "assets/video/hero-capsule-gmp.mp4",
      tabTitleEn: "WHO-GMP Capsules",
      tabTitleHi: "WHO-GMP कैप्सूल तकनीक",
      tabSubEn: "EC + IR + SR Gastro Relief",
      tabSubHi: "24-घंटे एसिडिटी व रिफ्लक्स सुरक्षा",
      tagEn: "WHO-GMP Manufacturing • Tablet-in-Capsule Tech",
      tagHi: "WHO-GMP प्रमाणित निर्माण • टैबलेट-इन-कैप्सूल",
      headlineEn: 'Dual-phase <span class="accent-word">capsule precision</span> for 24-hour acid control.',
      headlineHi: 'तुरंत राहत और पूरे 24 घंटे सुरक्षा के लिए <span class="accent-word">सटीक कैप्सूल</span> विज्ञान।',
      subEn: "PANTHETA DSR and RABTHETA DSR combine Enteric-Coated PPIs with split 10 mg Immediate-Release and 20 mg Sustained-Release Domperidone inside one WHO-GMP capsule.",
      subHi: "PANTHETA DSR और RABTHETA DSR में एंटरिक-कोटेड PPI के साथ 10 mg IR और 20 mg SR डोमपेरिडोन की उन्नत टैबलेट-इन-कैप्सूल तकनीक है।",
      glowColor: "radial-gradient(circle, rgba(16, 185, 129, 0.34) 0%, transparent 70%)",
      medId: "pantheta-dsr",
      ctaHref: "#medicinesExplorerSection",
      ctaLabelEn: "Explore All Our Medicines",
      ctaLabelHi: "हमारी सभी दवाइयाँ देखें"
    },
    {
      num: "05",
      videoSrc: "assets/video/hero-careers.mp4?v=2",
      tabTitleEn: "Careers",
      tabTitleHi: "करियर व अवसर",
      tabSubEn: "Build Your Healthcare Career",
      tabSubHi: "स्वास्थ्य सेवा में करियर बनाएँ",
      tagEn: "Careers at LV Bioplasma • Pan-India Growth",
      tagHi: "LV बायोप्लाज़्मा करियर • अखिल भारतीय अवसर",
      headlineEn: 'Build your career where <span class="accent-word">science meets</span> human impact.',
      headlineHi: 'जहाँ <span class="accent-word">विज्ञान और सेवा</span> मिलते हैं, वहाँ अपना करियर बनाएँ।',
      subEn: "Join LV Bioplasma Biologicals across Field Sales, Product Management, QA/QC, and Corporate Operations — expanding nationwide with merit-based growth.",
      subHi: "फील्ड सेल्स, प्रोडक्ट मैनेजमेंट, QA/QC और कॉर्पोरेट ऑपरेशंस में हमारे तेज़ी से बढ़ते परिवार से जुड़ें।",
      glowColor: "radial-gradient(circle, rgba(168, 85, 247, 0.34) 0%, transparent 70%)",
      medId: "dydrofy",
      ctaHref: "careers.html",
      ctaLabelEn: "Explore Careers & Open Roles",
      ctaLabelHi: "करियर और रिक्तियाँ देखें"
    },
    {
      num: "06",
      videoSrc: "assets/video/hero-contact.mp4",
      tabTitleEn: "Contact Us",
      tabTitleHi: "संपर्क करें",
      tabSubEn: "Partner & Corporate Desk",
      tabSubHi: "पार्टनर व कॉर्पोरेट डेस्क",
      tagEn: "Contact Us • Sector-34 Gurugram NCR HQ",
      tagHi: "संपर्क करें • सेक्टर-34 गुरुग्राम मुख्यालय",
      headlineEn: 'Connect with our <span class="accent-word">corporate desk</span> across India.',
      headlineHi: 'पूरे भारत में हमारे <span class="accent-word">कॉर्पोरेट डेस्क</span> से जुड़ें।',
      subEn: "For pharmaceutical stockist & distributor partnerships, clinical product monographs, hospital pharmacy supply, or product inquiries, reach our Gurugram NCR team directly.",
      subHi: "डिस्ट्रीब्यूटरशिप, डॉक्टर मोनोग्राफ, अस्पताल सप्लाई या उत्पाद जानकारी के लिए हमारे गुरुग्राम मुख्यालय से सीधे संपर्क करें।",
      glowColor: "radial-gradient(circle, rgba(14, 165, 233, 0.34) 0%, transparent 70%)",
      medId: "argiluck",
      ctaHref: "contact.html",
      ctaLabelEn: "Contact Us / Partner Desk",
      ctaLabelHi: "हमसे संपर्क करें"
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
      descHi: "गर्भावस्था की सुरक्षा, बेहतर रक्त प्रवाह (L-Arginine), हीमोग्लोबिन सुधार और हार्मोनल संतुलन (DYDROFY 10 mg) के लिए विशेष श्रृंखला।",
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

  /* ---------- Microscopic SVG Diagrams ---------- */
  function getScienceSVG(index) {
    if (index === 0) {
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
          <circle cx="95" cy="95" r="46" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
          <text x="95" y="92" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="10" font-weight="700">Conventional</text>
          <text x="95" y="106" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="9">Large Oil Globule</text>
          <path d="M158 95 H205" stroke="#FBBF24" stroke-width="2.2" stroke-linecap="round"/>
          <polygon points="205,90 215,95 205,100" fill="#FBBF24"/>
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
      return `
        <svg viewBox="0 0 420 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Aquamin Honeycomb Matrix">
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
    return `
      <svg viewBox="0 0 420 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Tablet-in-Capsule EC IR SR Architecture">
        <rect x="58" y="78" width="304" height="104" rx="52" stroke="rgba(255,255,255,0.45)" stroke-width="2.5" fill="rgba(255,255,255,0.06)"/>
        <path d="M210 78 V182" stroke="rgba(255,255,255,0.22)" stroke-dasharray="4 4"/>
        <rect x="86" y="102" width="76" height="56" rx="16" fill="#0284C7" stroke="#7DD3FC" stroke-width="1.8"/>
        <text x="124" y="127" text-anchor="middle" fill="#FFF" font-size="11" font-weight="800">EC PPI</text>
        <text x="124" y="143" text-anchor="middle" fill="#E0F2FE" font-size="9">Acid-Protected</text>
        <circle cx="212" cy="130" r="28" fill="#F59E0B" stroke="#FDE68A" stroke-width="1.8"/>
        <text x="212" y="127" text-anchor="middle" fill="#151821" font-size="11" font-weight="800">10mg IR</text>
        <text x="212" y="141" text-anchor="middle" fill="#151821" font-size="8.5" font-weight="700">Fast Relief</text>
        <rect x="262" y="102" width="76" height="56" rx="28" fill="#10B981" stroke="#A7F3D0" stroke-width="1.8"/>
        <text x="300" y="127" text-anchor="middle" fill="#052E16" font-size="11" font-weight="800">20mg SR</text>
        <text x="300" y="143" text-anchor="middle" fill="#052E16" font-size="8.5" font-weight="700">24h Shield</text>
        <text x="210" y="48" text-anchor="middle" fill="#A5F3FC" font-size="11" font-family="Space Grotesk, sans-serif" font-weight="700">PRECISION TABLET-IN-CAPSULE (PANTHETA / RABTHETA DSR)</text>
      </svg>`;
  }

  /* ---------- Helpers ---------- */
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

  function t(en, _hi) {
    return en;
  }

  /* ---------- Bespoke Bioplasma Scroll-Collapsible Header + Floating Logo Command Menu ---------- */
  const FLOATING_NAV_ITEMS = [
    {
      href: "index.html",
      label: "Home",
      eyebrow: "LV Bioplasma V6 • 4-Stakeholder Ecosystem",
      title: "Working with nature through bio-technology for a healthy life.",
      desc: "Unified healthcare platform built for Doctors, Customers & Patients, Stockists & Distributors, and Field Employees — powered by Smart Carton QR.",
      cardTitle: "LV Bioplasma V6 Hub",
      cardSub: "Doctors • Customers • Stockists • Employees",
      videoSrc: "assets/video/hero-human-life.mp4",
      quickLinks: [
        { label: "4-Stakeholder Hub", href: "index.html#ecosystemHubSection" },
        { label: "Smart Carton QR", href: "qr.html", isPrimary: true }
      ]
    },
    {
      href: "products.html",
      label: "Products",
      eyebrow: "Complete Medicine Formulary",
      title: "Evidence-backed medicines across 5 specialties.",
      desc: "Click any product below to inspect its clinical monograph or scan its Smart Carton QR code.",
      cardTitle: "Complete Formulary",
      cardSub: "AADIRISE D3 • BIOIPC • ADENOCAL-K2 • PANTHETA DSR & MORE",
      videoSrc: "assets/video/hero-capsule-gmp.mp4",
      quickLinks: [
        ...(DATA.medicines || []).map((m) => ({ label: m.name, medId: m.id })),
        { label: "View All Formulations", href: "products.html", isPrimary: true }
      ]
    },
    {
      href: "doctors.html",
      label: "Doctors",
      eyebrow: "Clinician Scientific Portal",
      title: "Precision delivery science & transparent clinical monographs.",
      desc: "Search active compositions, %RDA profiles, 3-phase mechanisms of action, and request physician samples or clinic detailing.",
      cardTitle: "For Doctors & Clinicians",
      cardSub: "Clinical Formulary • Bio-Delivery Evidence • Sample Desk",
      videoSrc: "assets/video/hero-formulation-lab.mp4",
      quickLinks: [
        { label: "Doctor Portal", href: "doctors.html", isPrimary: true },
        { label: "Vibrant Science", href: "science.html" }
      ]
    },
    {
      href: "stockists.html",
      label: "Stockists",
      eyebrow: "Trade, Super-Stockist & Hospital Supply",
      title: "Partner across high-growth territories nationwide.",
      desc: "Explore Alu-Alu, Nano-Shot, and Spore Probiotic packaging standards, institutional supply, and fast-track Gurugram NCR dispatch.",
      cardTitle: "For Stockists & Distributors",
      cardSub: "Territory Onboarding • Packaging Specs • Direct HQ Desk",
      videoSrc: "assets/video/hero-contact.mp4",
      quickLinks: [
        { label: "Stockist Portal", href: "stockists.html", isPrimary: true },
        { label: "Apply for Territory", href: "stockists.html#stockistEnquirySection" }
      ]
    },
    {
      href: "qr.html",
      label: "Smart QR",
      eyebrow: "Scan-to-Product Carton Technology",
      title: "Every medicine carton connects directly to its verified digital twin.",
      desc: "Scan any LV Bioplasma QR code via mobile camera to open instant Customer Guides (EN/हिंदी), Doctor Monographs, and Authenticity Verification.",
      cardTitle: "Smart Carton QR Studio",
      cardSub: "Live Camera Scanner • Download Carton QRs • Mobile Preview",
      videoSrc: "assets/video/hero-cellular-uptake.mp4",
      quickLinks: [
        { label: "Open QR Command Hub", href: "qr.html", isPrimary: true },
        { label: "Test AADIRISE D3 Scan Page", href: "p/?id=aadirise-d3" }
      ]
    },
    {
      href: "science.html",
      label: "Science",
      eyebrow: "Drug-Delivery Platforms",
      title: "Microscopic engineering, macroscopic outcomes.",
      desc: "Explore Nano-Droplet D3 micelles, phospholipid Liposomal Iron, Irish Aquamin™ marine matrix, and EC+IR+SR Tablet-in-Capsule architecture.",
      cardTitle: "Vibrant Delivery Science",
      cardSub: "Interactive delivery viewport & WHO-GMP quality standards",
      videoSrc: "assets/video/hero-formulation-lab.mp4",
      quickLinks: [
        { label: "4 Delivery Vehicles", href: "science.html", isPrimary: true },
        { label: "Quality Standards", href: "science.html" }
      ]
    },
    {
      href: "careers.html",
      label: "Careers",
      eyebrow: "Employees & Pan-India Field Force",
      title: "Build your career where science meets impact.",
      desc: "Access our interactive MR Digital Clinic QR Detailing Kit and explore open roles across Field Sales, PMT, QA/QC, and Corporate HQ.",
      cardTitle: "Employees & Careers Hub",
      cardSub: "MR Digital Detailing Deck • Open Roles • CV Upload",
      videoSrc: "assets/video/hero-careers.mp4?v=2",
      quickLinks: [
        { label: "MR Detailing Deck", href: "careers.html#mrDetailingSection" },
        { label: "Open Positions", href: "careers.html#openings", isPrimary: true }
      ]
    },
    {
      href: "about.html",
      label: "About",
      eyebrow: "Enterprise Scale & Vision",
      title: "Pioneering excellence in nuessential vitamins.",
      desc: "Discover our foundation, global scientific alliances, WHO-GMP testing standards, corporate mission, and Director’s message.",
      cardTitle: "About LV Bioplasma",
      cardSub: "Corporate Story • Our Mission • Director’s Message",
      videoSrc: "assets/video/hero-human-life.mp4",
      quickLinks: [
        { label: "Our Mission", href: "about.html#mission" },
        { label: "Director’s Message", href: "about.html#director" },
        { label: "Contact HQ", href: "contact.html", isPrimary: true }
      ]
    }
  ];

  let closeCommandMenuFn = null;
  let syncCommandMenuActiveFn = null;
  let updateScrollBarAndHeaderFn = null;

  function getCurrentPageFilename() {
    const raw = window.location.pathname.split("/").pop().split("?")[0].split("#")[0];
    return raw || "index.html";
  }

  function initLillyScrollNav() {
    if (document.getElementById("bioScrollProgressTrack")) return;

    // 1. Top Left-to-Right Scroll Progress Bar
    const progTrack = document.createElement("div");
    progTrack.id = "bioScrollProgressTrack";
    progTrack.className = "bio-scroll-progress-track";
    progTrack.setAttribute("aria-hidden", "true");
    progTrack.innerHTML = `<div class="bio-scroll-progress-fill" id="bioScrollProgressFill"></div>`;
    document.body.appendChild(progTrack);

    // 2. Signature Top-Center Floating Bioplasma Logo Capsule Island (Appears when Top Header Hides on Scroll)
    const pillEl = document.createElement("div");
    pillEl.id = "bioplasmaFloatPill";
    pillEl.className = "bio-float-pill";
    pillEl.setAttribute("role", "region");
    pillEl.setAttribute("aria-label", "LV Bioplasma Quick Navigation");
    pillEl.innerHTML = `
      <span class="bio-float-pill-aura" aria-hidden="true"></span>
      <a href="index.html" class="bio-float-pill-brand" aria-label="LV Bioplasma Home">
        <img src="assets/brand/logo-footer-light.png?v=6.0" alt="LV Bioplasma" class="bio-float-pill-logo" />
      </a>
      <span class="bio-float-pill-sep" aria-hidden="true"></span>
      <button type="button" class="bio-float-pill-burger" id="bioFloatPillBurger" aria-label="Open LV Bioplasma Navigation Menu" aria-expanded="false" aria-controls="bioplasmaCommandMenu">
        <i></i><i></i><i></i>
      </button>
    `;
    document.body.appendChild(pillEl);

    const pillBrandLink = pillEl.querySelector(".bio-float-pill-brand");
    const burgerBtn = pillEl.querySelector("#bioFloatPillBurger");

    pillBrandLink?.addEventListener("click", (e) => {
      if (getCurrentPageFilename() === "index.html") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });

    // 3. Backdrop + Bespoke LV Bioplasma Floating Command Panel
    const backdrop = document.createElement("div");
    backdrop.id = "bioplasmaCommandBackdrop";
    backdrop.className = "bio-cmd-backdrop";
    document.body.appendChild(backdrop);

    const panel = document.createElement("aside");
    panel.id = "bioplasmaCommandMenu";
    panel.className = "bio-cmd-panel";
    panel.setAttribute("aria-label", "LV Bioplasma Navigation Hub");
    panel.setAttribute("aria-hidden", "true");
    panel.innerHTML = `
      <div class="bio-cmd-glow" aria-hidden="true"></div>
      <div class="bio-cmd-top">
        <a href="index.html" class="bio-cmd-brand" data-cmd-nav>
          <img src="assets/brand/logo-footer-light.png?v=6.0" alt="LV Bioplasma Biologicals Private Limited" />
        </a>

        <nav class="bio-cmd-nav" aria-label="Floating Primary Navigation">
          ${FLOATING_NAV_ITEMS.map((item, idx) => `
            <a href="${item.href}" class="bio-cmd-link" data-cmd-idx="${idx}" data-cmd-href="${item.href}" data-cmd-nav>
              ${escapeHtml(item.label)}
            </a>
          `).join("")}
        </nav>

        <div class="bio-cmd-actions">
          <button type="button" class="bio-cmd-search-btn" data-open-quick-search aria-label="Quick Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span>Search</span>
          </button>
          <a href="contact.html" class="btn btn-crimson btn-sm" data-cmd-nav>Partner / Enquire</a>
          <button type="button" class="bio-cmd-close-btn" id="bioCmdCloseBtn" aria-label="Close Navigation Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>

      <div class="bio-cmd-divider"></div>

      <div class="bio-cmd-showcase">
        <div class="bio-cmd-copy">
          <span class="bio-cmd-eyebrow" id="bioCmdEyebrow">LV Bioplasma Biologicals</span>
          <h3 class="bio-cmd-title" id="bioCmdTitle">Putting everyday health above all.</h3>
          <p class="bio-cmd-desc" id="bioCmdDesc"></p>
          <div class="bio-cmd-quick-chips" id="bioCmdQuickChips"></div>
        </div>

        <a href="index.html" class="bio-cmd-feature-card" id="bioCmdFeatureCard" data-cmd-nav>
          <video id="bioCmdFeatureVideo" muted loop playsinline preload="metadata" aria-hidden="true"></video>
          <div class="bio-cmd-feature-scrim" aria-hidden="true"></div>
          <div class="bio-cmd-feature-content">
            <div>
              <strong id="bioCmdCardTitle">LV Bioplasma Biologicals</strong>
              <span id="bioCmdCardSub">Working with Nature Through Bio-Technology for a Healthy Life</span>
            </div>
            <span class="bio-cmd-feature-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </span>
          </div>
        </a>
      </div>
    `;
    document.body.appendChild(panel);

    let cmdOpen = false;
    const hasFinePointer = () => window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    function renderCmdShowcase(idx) {
      const item = FLOATING_NAV_ITEMS[idx] || FLOATING_NAV_ITEMS[0];
      const eyebrowEl = document.getElementById("bioCmdEyebrow");
      const titleEl = document.getElementById("bioCmdTitle");
      const descEl = document.getElementById("bioCmdDesc");
      const chipsEl = document.getElementById("bioCmdQuickChips");
      const cardEl = document.getElementById("bioCmdFeatureCard");
      const cardTitleEl = document.getElementById("bioCmdCardTitle");
      const cardSubEl = document.getElementById("bioCmdCardSub");
      const vidEl = document.getElementById("bioCmdFeatureVideo");

      if (eyebrowEl) eyebrowEl.textContent = item.eyebrow;
      if (titleEl) titleEl.textContent = item.title;
      if (descEl) descEl.textContent = item.desc;
      if (cardEl) cardEl.setAttribute("href", item.href);
      if (cardTitleEl) cardTitleEl.textContent = item.cardTitle;
      if (cardSubEl) cardSubEl.textContent = item.cardSub;

      if (chipsEl) {
        chipsEl.innerHTML = (item.quickLinks || []).map((q) => {
          if (q.medId) {
            return `<button type="button" class="bio-cmd-chip bio-cmd-med-chip" data-open-med="${escapeHtml(q.medId)}">${escapeHtml(q.label)}</button>`;
          }
          const extraCls = q.isPrimary ? " bio-cmd-chip-primary" : "";
          return `<a href="${q.href}" class="bio-cmd-chip${extraCls}" data-cmd-nav>${escapeHtml(q.label)} →</a>`;
        }).join("");
      }

      if (vidEl) {
        if (vidEl.getAttribute("src") !== item.videoSrc) {
          vidEl.src = item.videoSrc;
        }
        if (cmdOpen && !prefersReducedMotion) {
          vidEl.muted = true;
          vidEl.play().catch(() => {});
        }
      }

      panel.querySelectorAll(".bio-cmd-link").forEach((lnk, i) => {
        lnk.classList.toggle("is-previewed", i === idx);
      });
    }

    function syncActivePageInCmd(targetFn) {
      const fn = targetFn || getCurrentPageFilename();
      let activeIdx = 0;
      panel.querySelectorAll(".bio-cmd-link").forEach((lnk, i) => {
        const isAct = lnk.getAttribute("data-cmd-href") === fn;
        lnk.classList.toggle("active", isAct);
        if (isAct) activeIdx = i;
      });
      renderCmdShowcase(activeIdx);
    }

    let lastOpenedAt = 0;

    function openCommandMenu() {
      if (cmdOpen) return;
      cmdOpen = true;
      lastOpenedAt = Date.now();
      syncActivePageInCmd();
      panel.classList.add("is-open");
      panel.classList.add("is-opening");
      panel.setAttribute("aria-hidden", "false");
      backdrop.classList.add("is-open");
      pillEl.classList.add("is-menu-open");
      if (burgerBtn) burgerBtn.setAttribute("aria-expanded", "true");

      setTimeout(() => {
        panel.classList.remove("is-opening");
      }, 420);

      const vidEl = document.getElementById("bioCmdFeatureVideo");
      if (vidEl && !prefersReducedMotion) {
        vidEl.muted = true;
        vidEl.play().catch(() => {});
      }
    }

    function closeCommandMenu() {
      if (!cmdOpen) return;
      cmdOpen = false;
      panel.classList.remove("is-open");
      panel.classList.remove("is-opening");
      panel.setAttribute("aria-hidden", "true");
      backdrop.classList.remove("is-open");
      pillEl.classList.remove("is-menu-open");
      if (burgerBtn) burgerBtn.setAttribute("aria-expanded", "false");
      const vidEl = document.getElementById("bioCmdFeatureVideo");
      if (vidEl) vidEl.pause();
    }

    closeCommandMenuFn = closeCommandMenu;
    syncCommandMenuActiveFn = syncActivePageInCmd;

    // Toggle menu exclusively on click of burger or pill area (no jarring hover-open)
    burgerBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (cmdOpen) closeCommandMenu();
      else openCommandMenu();
    });

    pillEl.addEventListener("click", (e) => {
      // If user clicked the brand logo link, allow normal navigation
      if (e.target.closest(".bio-float-pill-brand")) return;
      e.preventDefault();
      e.stopPropagation();
      if (cmdOpen) closeCommandMenu();
      else openCommandMenu();
    });

    // Hovering any of the 6 headings dynamically updates showcase preview
    panel.querySelectorAll(".bio-cmd-link").forEach((lnk) => {
      const idx = Number(lnk.getAttribute("data-cmd-idx"));
      lnk.addEventListener("mouseenter", () => renderCmdShowcase(idx));
      lnk.addEventListener("focus", () => renderCmdShowcase(idx));
    });

    // Close on X button or backdrop click
    document.getElementById("bioCmdCloseBtn")?.addEventListener("click", closeCommandMenu);
    backdrop.addEventListener("click", closeCommandMenu);

    // Capture phase event listener on command panel to completely block accidental ghost clicks
    panel.addEventListener("click", (e) => {
      // 1. Guard against ghost clicks or accidental clicks while opening
      if (Date.now() - lastOpenedAt < 420) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // 2. If user intentionally clicked brand logo inside open command menu
      const brandTarget = e.target.closest(".bio-cmd-brand");
      if (brandTarget) {
        closeCommandMenu();
        if (getCurrentPageFilename() === "index.html") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      // 3. Normal navigation links, monograph product chips, or search trigger
      if (e.target.closest("[data-cmd-nav]") || e.target.closest("[data-open-quick-search]") || e.target.closest("[data-open-med]") || e.target.closest("[data-open-qr]")) {
        closeCommandMenu();
      }
    }, true);

    // Scroll Progress + Top Header Collapse Engine
    const header = document.getElementById("siteHeader");
    const progFill = document.getElementById("bioScrollProgressFill");

    const updateScrollState = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      const docEl = document.documentElement;
      const maxScroll = Math.max(1, docEl.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, y / maxScroll));

      if (progFill) {
        progFill.style.transform = `scaleX(${progress.toFixed(4)})`;
      }

      const collapseHeader = y > 68;
      if (header) {
        header.classList.toggle("is-collapsed-away", collapseHeader);
        if (collapseHeader) {
          document.getElementById("mobileNavDrawer")?.classList.remove("open");
        }
      }
      pillEl.classList.toggle("is-visible", collapseHeader);

      if (!collapseHeader && cmdOpen) {
        closeCommandMenu();
      }
    };

    updateScrollBarAndHeaderFn = updateScrollState;
    syncActivePageInCmd();
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState, { passive: true });
  }

  /* ---------- Sticky / Transparent-to-Solid Header & Nav ---------- */
  function initHeaderAndNav() {
    try {
      localStorage.removeItem("bioplasma_v4_lang");
    } catch (_) {}

        initLillyScrollNav();

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

    // Global delegated clicks
    document.addEventListener("click", (e) => {
      const qrTrigger = e.target.closest("[data-open-qr]");
      if (qrTrigger) {
        e.preventDefault();
        e.stopPropagation();
        openQrModal(qrTrigger.getAttribute("data-open-qr"));
        return;
      }
      const medTrigger = e.target.closest("[data-open-med]");
      if (medTrigger) {
        e.preventDefault();
        openMonographModal(medTrigger.getAttribute("data-open-med"));
        return;
      }
      const searchTrigger = e.target.closest("[data-open-quick-search]");
      if (searchTrigger) {
        e.preventDefault();
        openQuickSearchModal();
        return;
      }
      const filmTrigger = e.target.closest("[data-open-brand-film]");
      if (filmTrigger) {
        e.preventDefault();
        openBrandFilmModal(state.heroIndex);
      }
    });

    // Keyboard shortcuts
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
        if (closeCommandMenuFn) closeCommandMenuFn();
        closeAllModals();
      } else if (document.getElementById("monographModalBackdrop")?.classList.contains("open")) {
        if (e.key === "ArrowRight") stepMonographModal(1);
        if (e.key === "ArrowLeft") stepMonographModal(-1);
      }
    });
  }

  /* ---------- LILLY.COM FULL-BLEED BACKGROUND VIDEO HERO ENGINE ---------- */
  function getActiveHeroVideoEl() {
    return document.getElementById(state.activeVideoSlot === "A" ? "heroVideoA" : "heroVideoB");
  }

  function getStandbyHeroVideoEl() {
    return document.getElementById(state.activeVideoSlot === "A" ? "heroVideoB" : "heroVideoA");
  }

  function initHeroVideoCinema() {
    const heroRoot = document.getElementById("heroCarouselRoot");
    if (!heroRoot) return;

    state.activeVideoSlot = "A";
    ["heroVideoA", "heroVideoB"].forEach(vidId => {
      const v = document.getElementById(vidId);
      if (v) {
        v.muted = true;
        v.defaultMuted = true;
        v.loop = true;
        v.playsInline = true;
      }
    });

    // Preload all 6 hero packshot images into memory for zero image swap blink
    HERO_SLIDES.forEach(s => {
      const m = getMedById(s.medId);
      if (m && m.image) {
        const preImg = new Image();
        preImg.src = m.image;
      }
    });

    const tabsMount = document.getElementById("heroTabsMount");
    if (tabsMount) {
      tabsMount.innerHTML = HERO_SLIDES.map((s, idx) => `
        <button type="button" class="cinema-chapter-btn ${idx === 0 ? "active" : ""}" data-hero-idx="${idx}" role="tab" aria-selected="${idx === 0}">
          <span class="cinema-chapter-progress" data-hero-prog="${idx}"></span>
          <span class="cinema-chapter-top">
            <span class="cinema-chapter-num">SCENE ${s.num}</span>
            <span class="cinema-live-chip">LIVE</span>
          </span>
          <span class="cinema-chapter-title" data-hero-tab-title="${idx}">${t(s.tabTitleEn, s.tabTitleHi)}</span>
          <span class="cinema-chapter-sub" data-hero-tab-sub="${idx}">${t(s.tabSubEn, s.tabSubHi)}</span>
        </button>
      `).join("");

      tabsMount.querySelectorAll(".cinema-chapter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = Number(btn.getAttribute("data-hero-idx"));
          setHeroSlide(idx, true);
        });
      });
    }

    const prevBtn = document.getElementById("heroPrevSceneBtn");
    if (prevBtn) {
      prevBtn.onclick = () => {
        setHeroSlide((state.heroIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length, true);
      };
    }

    const nextBtn = document.getElementById("heroNextSceneBtn");
    if (nextBtn) {
      nextBtn.onclick = () => {
        setHeroSlide((state.heroIndex + 1) % HERO_SLIDES.length, true);
      };
    }

    // Keyboard Arrow Keys Navigation (Left & Right Arrow Keys)
    if (!window.__bioplasmaHeroKeyBound) {
      window.__bioplasmaHeroKeyBound = true;
      window.addEventListener("keydown", (e) => {
        if (!document.getElementById("heroCarouselRoot")) return;
        if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) return;
        if (e.key === "ArrowLeft") {
          setHeroSlide((state.heroIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length, true);
        } else if (e.key === "ArrowRight") {
          setHeroSlide((state.heroIndex + 1) % HERO_SLIDES.length, true);
        }
      });
    }

    // WCAG Accessibility Pause / Play Background Video Toggle
    const toggleBtn = document.getElementById("heroVideoToggleBtn");
    if (toggleBtn) {
      toggleBtn.onclick = () => {
        setHeroPausedState(!state.heroVideoPaused);
      };
    }

    // Initial boot of Scene 01
    setHeroSlide(0, false, true);
    syncHeroPauseButtonUI();

    if (state.heroVideoPaused) {
      getActiveHeroVideoEl()?.pause();
    } else {
      getActiveHeroVideoEl()?.play().catch(() => {});
    }

    startHeroRafLoop();
  }

  function setHeroPausedState(paused) {
    state.heroVideoPaused = paused;
    const heroRoot = document.getElementById("heroCarouselRoot");
    heroRoot?.classList.toggle("is-paused", paused);

    const activeVid = getActiveHeroVideoEl();
    if (activeVid) {
      if (paused) {
        activeVid.pause();
      } else {
        activeVid.play().catch(() => {});
      }
    }
    state.heroLastTick = performance.now();
    syncHeroPauseButtonUI();
  }

  function syncHeroPauseButtonUI() {
    const toggleBtn = document.getElementById("heroVideoToggleBtn");
    const iconSpan = document.getElementById("heroVideoToggleIcon");
    const labelSpan = document.getElementById("heroVideoToggleLabel");
    if (!toggleBtn) return;

    toggleBtn.classList.toggle("is-paused", state.heroVideoPaused);
    toggleBtn.setAttribute("aria-pressed", String(state.heroVideoPaused));
    toggleBtn.setAttribute(
      "aria-label",
      state.heroVideoPaused ? "Play background video" : "Pause background video"
    );

    if (iconSpan) {
      iconSpan.innerHTML = state.heroVideoPaused
        ? `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`;
    }

    if (labelSpan) {
      labelSpan.textContent = state.heroVideoPaused
        ? t("Play Video", "वीडियो चलाएँ")
        : t("Pause Video", "वीडियो रोकें");
    }
  }

  function startHeroRafLoop() {
    if (state.heroRafId) cancelAnimationFrame(state.heroRafId);
    state.heroLastTick = performance.now();

    function tick(now) {
      const dt = Math.min(100, Math.max(0, now - state.heroLastTick));
      state.heroLastTick = now;

      const modalOpen = Boolean(document.querySelector(".modal-backdrop.open"));
      if (!state.heroVideoPaused && !modalOpen) {
        state.heroElapsedMs += dt;
        const pct = Math.min(100, (state.heroElapsedMs / state.heroDurationMs) * 100);
        const activeProg = document.querySelector(`[data-hero-prog="${state.heroIndex}"]`);
        if (activeProg) {
          activeProg.style.setProperty("--chapter-progress", `${pct.toFixed(1)}%`);
        }

        if (state.heroElapsedMs >= state.heroDurationMs) {
          setHeroSlide((state.heroIndex + 1) % HERO_SLIDES.length, false);
        }
      }

      state.heroRafId = requestAnimationFrame(tick);
    }

    state.heroRafId = requestAnimationFrame(tick);
  }

  function crossfadeHeroVideo(targetSrc) {
    const currentVid = getActiveHeroVideoEl();
    const standbyVid = getStandbyHeroVideoEl();
    if (!currentVid || !standbyVid) return;

    // If initial load already matches currentVid src, ensure playing
    if (currentVid.getAttribute("src") === targetSrc && currentVid.classList.contains("is-active")) {
      if (!state.heroVideoPaused) {
        currentVid.play().catch(() => {});
      }
      return;
    }

    standbyVid.src = targetSrc;
    standbyVid.currentTime = 0;

    const executeSwap = () => {
      standbyVid.classList.add("is-active");
      currentVid.classList.remove("is-active");
      state.activeVideoSlot = state.activeVideoSlot === "A" ? "B" : "A";
      setTimeout(() => {
        currentVid.pause();
      }, 950);
    };

    if (!state.heroVideoPaused) {
      const playPromise = standbyVid.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.then(executeSwap).catch(executeSwap);
      } else {
        executeSwap();
      }
    } else {
      standbyVid.load();
      executeSwap();
    }
  }

  function setHeroSlide(idx, manualTrigger, skipVideoSwap) {
    state.heroIndex = idx;
    state.heroElapsedMs = 0;
    const slide = HERO_SLIDES[idx];
    const med = getMedById(slide.medId);

    if (!skipVideoSwap) {
      crossfadeHeroVideo(slide.videoSrc);
    }

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

    // Smooth micro-fade to eliminate sudden layout snapping
    const faders = [headEl, subEl, imgEl, medTitleEl, medDescEl, techEl].filter(Boolean);
    faders.forEach(el => {
      el.style.transition = "opacity 0.15s ease, transform 0.15s ease";
      el.style.opacity = "0.2";
      el.style.transform = "translateY(2px)";
    });

    setTimeout(() => {
      if (tagEl) tagEl.textContent = t(slide.tagEn, slide.tagHi);
      if (headEl) headEl.innerHTML = t(slide.headlineEn, slide.headlineHi);
      if (subEl) subEl.textContent = t(slide.subEn, slide.subHi);
      if (blobEl) blobEl.style.background = slide.glowColor;

      const heroCtaLink = document.querySelector("#heroCarouselRoot .bio-hero-ctas a.btn-crimson, #heroCarouselRoot .lilly-hero-ctas a.btn-crimson");
      const heroCtaSpan = document.querySelector("[data-i18n-explore-btn]");
      if (heroCtaLink && slide.ctaHref) {
        heroCtaLink.setAttribute("href", slide.ctaHref);
      }
      if (heroCtaSpan && slide.ctaLabelEn) {
        heroCtaSpan.textContent = t(slide.ctaLabelEn, slide.ctaLabelHi || slide.ctaLabelEn);
      }

      if (techEl) techEl.textContent = med.techBadge || med.technology;
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
      const qrStageBtn = document.getElementById("stageOpenQrBtn");
      if (qrStageBtn) qrStageBtn.setAttribute("data-open-qr", med.id);

      faders.forEach(el => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    }, 120);

    document.querySelectorAll(".cinema-chapter-btn").forEach((btn, i) => {
      const isAct = i === idx;
      btn.classList.toggle("active", isAct);
      btn.setAttribute("aria-selected", String(isAct));
      const prog = btn.querySelector(".cinema-chapter-progress");
      if (prog) {
        prog.style.setProperty("--chapter-progress", isAct ? "0%" : (i < idx ? "100%" : "0%"));
      }
    });

    if (manualTrigger && state.heroVideoPaused) {
      getActiveHeroVideoEl()?.pause();
    }
  }

  /* ---------- Widescreen Brand Film Theater Modal ("Watch Our Story") ---------- */
  function openBrandFilmModal(startIdx) {
    ensureSharedModals();
    closeAllModals();

    const backdrop = document.getElementById("brandFilmBackdrop");
    if (!backdrop) return;

    // Pause background hero video while theater modal is open
    getActiveHeroVideoEl()?.pause();

    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
    loadBrandFilmChapter(typeof startIdx === "number" ? startIdx : 0);
  }

  function loadBrandFilmChapter(idx) {
    state.filmChapterIndex = idx;
    const slide = HERO_SLIDES[idx] || HERO_SLIDES[0];
    const med = getMedById(slide.medId);

    const player = document.getElementById("brandFilmPlayer");
    const eyebrow = document.getElementById("brandFilmEyebrow");
    const title = document.getElementById("brandFilmTitle");
    const desc = document.getElementById("brandFilmDesc");
    const medBtn = document.getElementById("brandFilmMedBtn");
    const strip = document.getElementById("brandFilmStripMount");

    if (eyebrow) eyebrow.textContent = `CHAPTER ${slide.num} • ${t(slide.tagEn, slide.tagHi)}`;
    if (title) title.innerHTML = t(slide.headlineEn, slide.headlineHi);
    if (desc) desc.textContent = t(slide.subEn, slide.subHi);
    if (medBtn) {
      medBtn.textContent = `${t("Inspect", "देखें")} ${med.name} →`;
      medBtn.setAttribute("data-open-med", med.id);
    }

    if (strip) {
      strip.innerHTML = HERO_SLIDES.map((s, i) => `
        <button type="button" class="film-strip-btn ${i === idx ? "active" : ""}" data-film-idx="${i}">
          <span>CHAPTER ${s.num}</span>
          ${escapeHtml(t(s.tabTitleEn, s.tabTitleHi))}
        </button>
      `).join("");

      strip.querySelectorAll("[data-film-idx]").forEach((btn) => {
        btn.addEventListener("click", () => {
          loadBrandFilmChapter(Number(btn.getAttribute("data-film-idx")));
        });
      });
    }

    if (player) {
      player.src = slide.videoSrc;
      player.currentTime = 0;
      player.play().catch(() => {});
    }
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

  /* ---------- 5 Therapeutic Divisions Tabbed Showcase ---------- */
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
            <div style="display:flex;align-items:center;justify-content:space-between;font-size:0.76rem;font-weight:700;color:var(--bio-crimson);">
              <span>${t("Inspect Monograph →", "पूरी जानकारी देखें →")}</span>
              <span style="color:var(--ink-muted);">${m.rxRequired ? "Rx" : "Sugar-Free"}</span>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  /* ---------- Interactive Microscope Lab ---------- */
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
        <button type="button" class="btn-qr-trigger" data-open-qr="${linkedMed.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM18 18h3v3h-3zM14 19h3"/></svg>
          <span>Carton QR</span>
        </button>
      </div>
    `;
  }

  /* ---------- Complete 9-Medicine Explorer ---------- */
  function initExplorerControls() {
    const section = document.getElementById("medicinesExplorerSection");
    if (!section) return;

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
        `Showing ${filtered.length} LV Bioplasma formulations`,
        `${filtered.length} दवाइयाँ दिखाई जा रही हैं`
      );
    }

    if (filtered.length === 0) {
      gridMount.innerHTML = `
        <div style="text-align:center;padding:56px 20px;background:var(--surface);border-radius:var(--radius-lg);border:1px solid var(--line-strong);">
          <h3 style="font-size:1.25rem;margin-bottom:8px;">${t("No matching formulations found", "कोई मिलान वाली दवाई नहीं मिली")}</h3>
          <p style="color:var(--ink-muted);margin-bottom:18px;">${t("Try clearing your search term or resetting active filters to view all LV Bioplasma medicines.", "सभी LV बायोप्लाज्मा दवाइयाँ देखने के लिए फ़िल्टर रीसेट करें।")}</p>
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
                  <td><span class="med-tech-chip">${escapeHtml(m.techBadge || m.technology)}</span></td>
                  <td style="color:var(--ink-muted);font-size:0.82rem;">${escapeHtml(m.dosageForm)}<br/>${escapeHtml(m.packSize)}</td>
                  <td onclick="event.stopPropagation();">
                    <div style="display:flex;gap:8px;align-items:center;">
                      <button type="button" class="btn btn-cobalt btn-sm" data-open-med="${m.id}">${t("Monograph", "विवरण")}</button>
                      <button type="button" class="btn-qr-trigger" data-open-qr="${m.id}" title="Scan Carton QR">QR</button>
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
                    return `
            <article class="med-card" style="--med-accent:${m.accent}">
              <div class="med-card-visual" data-open-med="${m.id}" title="Click to inspect full monograph">
                <div class="med-badges-top">
                  <span class="med-tech-chip">${escapeHtml(m.techBadge || m.technology)}</span>
                  <span class="med-sched-chip ${m.rxRequired ? "rx" : ""}">${m.rxRequired ? "Rx Prescription" : (m.sugarFree ? "Sugar-Free" : "Supplement")}</span>
                </div>
                <div class="med-packshot-stage">
                  <img src="${m.image}" alt="${escapeHtml(m.name)} packshot" loading="lazy" />
                </div>
              </div>
              <div class="med-card-body">
                <div class="med-dosage-meta">${escapeHtml(m.dosageForm)} • ${escapeHtml(m.packSize)}</div>
                <h3 class="med-card-title" data-open-med="${m.id}">${escapeHtml(m.name)}</h3>
                <div class="med-card-salt">${escapeHtml(m.genericSummary)}</div>
                <p class="med-card-desc">${escapeHtml(t(m.taglineEn, m.taglineHi))}</p>
                <div class="med-card-actions">
                  <button type="button" class="btn btn-cobalt btn-sm" data-open-med="${m.id}" style="width:100%;justify-content:center;">
                    ${t("Full Monograph", "पूरी जानकारी")}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </button>
                  <button type="button" class="btn-qr-trigger" data-open-qr="${m.id}" title="Scan or Download Carton QR Code">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM18 18h3v3h-3z"/></svg>
                    <span>QR</span>
                  </button>
                </div>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    `;


  }

  /* ---------- Three-Symbol Emblem Pillars ---------- */
  function renderPillars() {
    const pillarsMount = document.getElementById("pillarsEditorialMount");
    if (pillarsMount) {
      const symbols = [
        "assets/brand/emblem-symbol-1.png",
        "assets/brand/emblem-symbol-2.png",
        "assets/brand/emblem-symbol-3.png"
      ];
      pillarsMount.innerHTML = DATA.company.pillars.map((p, idx) => `
        <div class="pillar-card" style="--p-color:${p.color}">
          <div class="pillar-num-row">
            <div class="pillar-icon-circle">
              <img src="${symbols[idx]}" alt="Symbol 0${idx + 1}" style="width:30px;height:30px;object-fit:contain;display:block;" />
            </div>
            <span class="pillar-num">SYMBOL 0${idx + 1}</span>
          </div>
          <h3>${escapeHtml(t(p.titleEn, p.titleHi))}</h3>
          <p>${escapeHtml(t(p.descEn, p.descHi))}</p>
        </div>
      `).join("");
    }
  }

  /* ---------- Shared Modals Injection (Monograph, Compare, Search & Brand Film!) ---------- */
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
              <button type="button" class="btn btn-crimson btn-sm" id="monoCloseBtn">✕ Close</button>
            </div>
          </div>
          <div class="modal-body-scroll" id="monographModalBody"></div>
        </div>
      </div>

      <!-- Global Quick Search Modal -->
      <div class="modal-backdrop" id="quickSearchBackdrop" role="dialog" aria-modal="true" aria-label="Quick Search">
        <div class="modal-window" style="max-width:680px;">
          <div class="modal-header-bar">
            <strong style="font-size:0.96rem;">Search LV Bioplasma Formulary &amp; Symptoms</strong>
            <button type="button" class="btn btn-outline btn-sm" id="quickSearchCloseBtn">✕ Esc</button>
          </div>
          <div class="modal-body-scroll">
            <input type="search" id="quickSearchModalInput" class="search-input" style="padding-left:18px;" placeholder="Type medicine (e.g. BIOIPC, PANTHETA DSR), salt (Vitamin D3, Iron), or symptom..." autocomplete="off" />
            <div class="quick-search-list" id="quickSearchResultsMount"></div>
          </div>
        </div>
      </div>

      <!-- Widescreen Brand Film Theater Modal ("Watch Our Story") -->
      <div class="modal-backdrop" id="brandFilmBackdrop" role="dialog" aria-modal="true" aria-label="LV Bioplasma Brand Story Reel">
        <div class="film-modal-window">
          <div class="film-modal-header">
            <div style="display:flex;align-items:center;gap:10px;">
              <span class="live-pulse-dot" aria-hidden="true"></span>
              <strong style="font-size:0.94rem;letter-spacing:0.02em;">LV Bioplasma • Working with Nature for a Healthy Life (4-Chapter Story Reel)</strong>
            </div>
            <button type="button" class="btn btn-crimson btn-sm" id="brandFilmCloseBtn">✕ Close Reel</button>
          </div>
          <div class="film-stage-wrap">
            <video id="brandFilmPlayer" controls muted playsinline preload="metadata"></video>
            <div class="film-caption-overlay">
              <div class="film-caption-copy">
                <small id="brandFilmEyebrow">CHAPTER 01</small>
                <h3 id="brandFilmTitle">Working with nature through bio-technology for a healthy life.</h3>
                <p id="brandFilmDesc"></p>
              </div>
              <button type="button" class="btn btn-crimson btn-sm" id="brandFilmMedBtn" data-open-med="aadirise-d3">
                Inspect AADIRISE D3 →
              </button>
            </div>
          </div>
          <div class="film-chapters-strip" id="brandFilmStripMount"></div>
        </div>
      </div>

      <!-- Holographic Smart Carton QR Modal -->
      <div class="modal-backdrop" id="qrModalBackdrop" role="dialog" aria-modal="true" aria-label="Smart Carton QR Code">
        <div class="qr-modal-window">
          <div class="qr-modal-top">
            <div style="display:flex;align-items:center;gap:9px;">
              <span class="nav-qr-dot" aria-hidden="true"></span>
              <strong style="font-size:0.94rem;">Smart Carton QR • Instant Scan</strong>
            </div>
            <button type="button" class="btn btn-crimson btn-sm" id="qrModalCloseBtn">✕ Close</button>
          </div>
          <div class="qr-modal-body" id="qrModalBodyMount"></div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHtml);

    document.getElementById("monoCloseBtn")?.addEventListener("click", closeAllModals);
        document.getElementById("quickSearchCloseBtn")?.addEventListener("click", closeAllModals);
    document.getElementById("brandFilmCloseBtn")?.addEventListener("click", closeAllModals);
    document.getElementById("qrModalCloseBtn")?.addEventListener("click", closeAllModals);
    document.getElementById("monoPrevBtn")?.addEventListener("click", () => stepMonographModal(-1));
    document.getElementById("monoNextBtn")?.addEventListener("click", () => stepMonographModal(1));

    const filmPlayer = document.getElementById("brandFilmPlayer");
    filmPlayer?.addEventListener("ended", () => {
      const nextChapter = (state.filmChapterIndex + 1) % HERO_SLIDES.length;
      loadBrandFilmChapter(nextChapter);
    });

    ["monographModalBackdrop", "quickSearchBackdrop", "brandFilmBackdrop", "qrModalBackdrop"].forEach((id) => {
      const el = document.getElementById(id);
      el?.addEventListener("click", (e) => {
        if (e.target === el) closeAllModals();
      });
    });

    const qsInput = document.getElementById("quickSearchModalInput");
    qsInput?.addEventListener("input", () => renderQuickSearchResults(qsInput.value));
  }

  function closeAllModals() {
    const filmPlayer = document.getElementById("brandFilmPlayer");
    if (filmPlayer) filmPlayer.pause();

    ["monographModalBackdrop", "quickSearchBackdrop", "brandFilmBackdrop", "qrModalBackdrop"].forEach((id) => {
      document.getElementById(id)?.classList.remove("open");
    });
    document.body.style.overflow = "";

    // Resume hero background video if it wasn't explicitly paused by user
    if (!state.heroVideoPaused) {
      getActiveHeroVideoEl()?.play().catch(() => {});
    }
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
        <span style="font-size:0.78rem;font-weight:700;color:var(--bio-crimson);">View →</span>
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
            <a href="contact.html?med=${encodeURIComponent(m.id)}" class="btn btn-crimson btn-sm">
              Enquire for Distribution / Samples →
            </a>
            <button type="button" class="btn-qr-trigger" data-open-qr="${m.id}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM18 18h3v3h-3z"/></svg>
              <span>Scan Carton QR</span>
            </button>
            <a href="p/?id=${encodeURIComponent(m.id)}" class="btn btn-outline btn-sm">
              Mobile Scan View ↗
            </a>
          </div>
        </div>
      </div>

      <!-- Easy Patient & Clinician Summary -->
      <div class="mono-section-block">
        <h4>Patient-Friendly Overview</h4>
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
      <div class="mono-section-block" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;margin-bottom:0;">
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

    const params = new URLSearchParams(window.location.search);
    const urlMed = params.get("med");
    if (urlMed && DATA.medicines.some((m) => m.id === urlMed)) {
      state.selectedEnquiryMeds.add(urlMed);
    }

// Chips selector removed per user request

    function buildEnquiryPayload() {
      const name = document.getElementById("enqName")?.value.trim() || "";
      const role = document.getElementById("enqRole")?.value || "Distributor / Stockist";
      const phone = document.getElementById("enqPhone")?.value.trim() || "";
      const city = document.getElementById("enqCity")?.value.trim() || "";
      const email = document.getElementById("enqEmail")?.value.trim() || "Not provided";
      const msg = document.getElementById("enqMessage")?.value.trim() || "Please share literature and partnership details.";
      const selectedNames = Array.from(state.selectedEnquiryMeds).map((id) => getMedById(id).name).join(", ") || "Full Product Portfolio";

      const subject = `[LV Bioplasma Enquiry] ${role} — ${name} (${city})`;
      const body = [
        `Dear LV Bioplasma Biologicals Desk (Gurugram NCR),`,
        ``,
        `Name / Firm: ${name}`,
        `Category: ${role}`,
        `Phone / WhatsApp: ${phone}`,
        `City & State: ${city}`,
        `Email: ${email}`,
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

    state.category = cat || "all";
    state.quickNeedId = need || null;
    if (openMed && DATA.medicines.some((m) => m.id === openMed)) {
      setTimeout(() => openMonographModal(openMed), 180);
    }
  }

  /* ---------- Language UI Sync ---------- */
  function syncLanguageUI() {
    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-set-lang") === state.lang);
    });

    const exploreBtnTxt = document.querySelector("[data-i18n-explore-btn]");
    if (exploreBtnTxt) exploreBtnTxt.textContent = t("Explore All Our Medicines", "हमारी सभी दवाइयाँ देखें");

    HERO_SLIDES.forEach((s, idx) => {
      const tEl = document.querySelector(`[data-hero-tab-title="${idx}"]`);
      const sEl = document.querySelector(`[data-hero-tab-sub="${idx}"]`);
      if (tEl) tEl.textContent = t(s.tabTitleEn, s.tabTitleHi);
      if (sEl) sEl.textContent = t(s.tabSubEn, s.tabSubHi);
    });

    if (document.getElementById("heroCarouselRoot")) {
      setHeroSlide(state.heroIndex, false, true);
      syncHeroPauseButtonUI();
    }
    renderQuickNeeds();
    renderDivisionsShowcase();
    renderScienceLab();
    renderPillars();
    if (document.getElementById("medicinesExplorerSection")) {
      renderExplorer();
    }
  }

  /* ---------- Floating WhatsApp Icon Widget (Icon Only, No Phone Text or Call Icon) ---------- */
  function initFloatingContactWidget() {
    if (document.getElementById("floatingContactDock")) return;
    const dock = document.createElement("div");
    dock.id = "floatingContactDock";
    dock.className = "floating-contact-dock";
    dock.innerHTML = `
      <a href="https://wa.me/919319491093?text=Hello%20LV%20Bioplasma,%20I%20would%20like%20to%20enquire%20about%20your%20products." target="_blank" rel="noopener" class="whatsapp-float-btn" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="36" height="36" fill="#FFFFFF" aria-hidden="true"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
      </a>
    `;
    document.body.appendChild(dock);
  }

  /* ---------- Subpage Ambient Video Toggle ---------- */
  function initSubpageVideo() {
    const subVid = document.getElementById("subpageAmbientVideo");
    const subVidBtn = document.getElementById("subpageVideoToggleBtn");
    if (!subVid) return;

    subVid.muted = true;
    subVid.defaultMuted = true;
    subVid.loop = true;
    subVid.playsInline = true;

    if (prefersReducedMotion) {
      subVid.pause();
      if (subVidBtn) {
        subVidBtn.classList.add("is-paused");
        subVidBtn.setAttribute("aria-pressed", "true");
        const lbl = subVidBtn.querySelector("[data-subvid-label]");
        if (lbl) lbl.textContent = "Play Video";
      }
    } else {
      subVid.play().catch(() => {});
      if (subVidBtn) {
        subVidBtn.classList.remove("is-paused");
        subVidBtn.setAttribute("aria-pressed", "false");
        const lbl = subVidBtn.querySelector("[data-subvid-label]");
        if (lbl) lbl.textContent = t("Pause Video", "वीडियो रोकें");
      }
    }

    if (subVidBtn) {
      subVidBtn.onclick = () => {
        if (subVid.paused) {
          subVid.play().catch(() => {});
          subVidBtn.classList.remove("is-paused");
          subVidBtn.setAttribute("aria-pressed", "false");
          const lbl = subVidBtn.querySelector("[data-subvid-label]");
          if (lbl) lbl.textContent = t("Pause Video", "वीडियो रोकें");
        } else {
          subVid.pause();
          subVidBtn.classList.add("is-paused");
          subVidBtn.setAttribute("aria-pressed", "true");
          const lbl = subVidBtn.querySelector("[data-subvid-label]");
          if (lbl) lbl.textContent = t("Play Video", "वीडियो चलाएँ");
        }
      };
    }
  }

  /* ---------- Careers Page Interactive Engine ---------- */
  function initCareersPage() {
    const filterBtns = document.querySelectorAll("[data-job-filter]");
    const jobCards = document.querySelectorAll(".job-card");
    if (filterBtns.length > 0) {
      filterBtns.forEach(btn => {
        btn.onclick = () => {
          filterBtns.forEach(b => {
            b.classList.remove("btn-crimson", "active");
            b.classList.add("btn-outline");
          });
          btn.classList.remove("btn-outline");
          btn.classList.add("btn-crimson", "active");

          const filterVal = btn.getAttribute("data-job-filter");
          jobCards.forEach(card => {
            const cardDept = card.getAttribute("data-job-dept");
            card.style.display = (filterVal === "all" || cardDept === filterVal) ? "flex" : "none";
          });
        };
      });
    }

    const applyButtons = document.querySelectorAll(".apply-job-btn");
    const positionInput = document.getElementById("jobPosition");
    const formSection = document.getElementById("applyFormSection");
    if (applyButtons.length > 0) {
      applyButtons.forEach(button => {
        button.onclick = () => {
          const title = button.getAttribute("data-job-title") || "";
          if (positionInput) positionInput.value = title;
          if (formSection) formSection.scrollIntoView({ behavior: "smooth" });
          const nameInput = document.getElementById("applicantName");
          if (nameInput) nameInput.focus();
        };
      });
    }

    const cvInput = document.getElementById("applicantCv");
    const cvDropZone = document.getElementById("cvDropZone");
    const cvEmptyState = document.getElementById("cvEmptyState");
    const cvFileState = document.getElementById("cvFileState");
    const cvFileName = document.getElementById("cvFileName");
    const cvFileSize = document.getElementById("cvFileSize");
    const removeCvBtn = document.getElementById("removeCvBtn");
    const cvErrorMsg = document.getElementById("cvErrorMessage");
    let selectedCvFile = null;

    function handleCvFile(file) {
      if (!file) return;
      const allowed = [".pdf", ".doc", ".docx"];
      const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
      if (!allowed.includes(ext)) {
        alert("Please upload a valid CV file in PDF, DOC, or DOCX format.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10 MB limit. Please select a smaller CV file.");
        return;
      }
      selectedCvFile = file;
      if (cvFileName) cvFileName.textContent = file.name;
      if (cvFileSize) cvFileSize.textContent = `${(file.size / 1024).toFixed(1)} KB • Verified & Attached`;
      if (cvEmptyState) cvEmptyState.style.display = "none";
      if (cvFileState) cvFileState.style.display = "flex";
      if (cvDropZone) {
        cvDropZone.classList.add("has-file");
        cvDropZone.classList.remove("error-border");
      }
      if (cvErrorMsg) cvErrorMsg.style.display = "none";
    }

    if (cvDropZone && cvInput) {
      cvDropZone.onclick = (e) => {
        if (e.target !== removeCvBtn && !removeCvBtn?.contains(e.target)) {
          cvInput.click();
        }
      };
      cvDropZone.ondragover = (e) => {
        e.preventDefault();
        cvDropZone.classList.add("dragover");
      };
      cvDropZone.ondragleave = () => {
        cvDropZone.classList.remove("dragover");
      };
      cvDropZone.ondrop = (e) => {
        e.preventDefault();
        cvDropZone.classList.remove("dragover");
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          cvInput.files = e.dataTransfer.files;
          handleCvFile(e.dataTransfer.files[0]);
        }
      };
      cvInput.onchange = () => {
        if (cvInput.files && cvInput.files.length > 0) {
          handleCvFile(cvInput.files[0]);
        }
      };
      if (removeCvBtn) {
        removeCvBtn.onclick = (e) => {
          e.stopPropagation();
          cvInput.value = "";
          selectedCvFile = null;
          if (cvEmptyState) cvEmptyState.style.display = "block";
          if (cvFileState) cvFileState.style.display = "none";
          if (cvDropZone) cvDropZone.classList.remove("has-file", "error-border");
          if (cvErrorMsg) cvErrorMsg.style.display = "none";
        };
      }
    }

    const careerForm = document.getElementById("careerApplicationForm");
    if (careerForm) {
      careerForm.onsubmit = function(e) {
        e.preventDefault();
        if (!selectedCvFile && (!cvInput.files || cvInput.files.length === 0)) {
          if (cvDropZone) {
            cvDropZone.classList.add("error-border");
            if (cvErrorMsg) cvErrorMsg.style.display = "flex";
            cvDropZone.scrollIntoView({ behavior: "smooth", block: "center" });
          }
          return false;
        }

        const fileObj = selectedCvFile || cvInput.files[0];
        const name = document.getElementById("applicantName")?.value.trim() || "";
        const phone = document.getElementById("applicantPhone")?.value.trim() || "";
        const email = document.getElementById("applicantEmail")?.value.trim() || "";
        const city = document.getElementById("applicantCity")?.value.trim() || "";
        const dept = document.getElementById("jobDepartment")?.value || "";
        const exp = document.getElementById("jobExperience")?.value || "";
        const pos = document.getElementById("jobPosition")?.value.trim() || "General Application";
        const notes = document.getElementById("applicantNotes")?.value.trim() || "";

        const subject = encodeURIComponent(`Job Application: ${pos} - ${name} (${city}) [CV: ${fileObj.name}]`);
        const body = encodeURIComponent(
          `Dear HR Team,\n\nI would like to apply for the position of "${pos}" at LV Bioplasma Biologicals Private Limited.\n\n` +
          `APPLICANT DETAILS:\n` +
          `• Full Name: ${name}\n` +
          `• Mobile/WhatsApp: ${phone}\n` +
          `• Email: ${email}\n` +
          `• Current City & State: ${city}\n` +
          `• Department: ${dept}\n` +
          `• Total Experience: ${exp}\n` +
          `• Position: ${pos}\n` +
          `• MANDATORY CV ATTACHED: ${fileObj.name} (${(fileObj.size / 1024).toFixed(1)} KB)\n\n` +
          `BACKGROUND & NOTES:\n${notes || "Please find my attached resume for your consideration."}\n\n` +
          `Warm regards,\n${name}\n${phone}`
        );

        const successBox = document.getElementById("applicationSuccessBox");
        const whatsAppBtn = document.getElementById("whatsAppCvBtn");
        if (successBox) {
          successBox.style.display = "block";
          successBox.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        if (whatsAppBtn) {
          const waText = encodeURIComponent(
            `Hello HR Team at LV Bioplasma, I am ${name} from ${city}. I have applied for the position of "${pos}". My CV (${fileObj.name}) is attached.`
          );
          whatsAppBtn.href = `https://wa.me/919319491093?text=${waText}`;
        }

        window.location.href = `mailto:admin@bioplasmabio.com?subject=${subject}&body=${body}`;
      };
    }

    const copyBtn = document.getElementById("copyCareerDetailsBtn");
    if (copyBtn) {
      copyBtn.onclick = function() {
        const name = document.getElementById("applicantName")?.value.trim() || "[Your Name]";
        const phone = document.getElementById("applicantPhone")?.value.trim() || "[Phone]";
        const email = document.getElementById("applicantEmail")?.value.trim() || "[Email]";
        const city = document.getElementById("applicantCity")?.value.trim() || "[City]";
        const dept = document.getElementById("jobDepartment")?.value || "";
        const exp = document.getElementById("jobExperience")?.value || "";
        const pos = document.getElementById("jobPosition")?.value.trim() || "General Application";
        const notes = document.getElementById("applicantNotes")?.value.trim() || "";
        const cvName = selectedCvFile ? selectedCvFile.name : (cvInput?.files?.[0]?.name || "CV Not Selected");

        const text = `Job Application - LV Bioplasma Biologicals\n` +
          `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nCity: ${city}\n` +
          `Department: ${dept}\nExperience: ${exp}\nPosition: ${pos}\n` +
          `CV File: ${cvName}\n` +
          `Notes: ${notes}`;

        navigator.clipboard.writeText(text).then(() => {
          const orig = copyBtn.innerText;
          copyBtn.innerText = "✓ Copied!";
          setTimeout(() => { copyBtn.innerText = orig; }, 2000);
        }).catch(() => {
          alert("Application text copied. Please send your CV to admin@bioplasmabio.com");
        });
      };
    }
  }


  /* ==========================================================================
     V6 NEXT-LEVEL ENGINES: QR MODAL, 4-PERSONA ECOSYSTEM, SMARTPHONE QR SIM,
     MOLECULAR CANVAS, 3D TILT, CAMERA QR SCANNER & DEDICATED PORTALS
     ========================================================================== */
  const LIVE_QR_BASE = "https://saitechcomputers.github.io/bioplasma-website/v6/p/?id=";
  const DOMAIN_QR_BASE = "https://www.bioplasmabio.com/v6/p/?id=";
  let activeCameraStream = null;
  let activeScanRaf = null;

  function stopActiveCameraScanner() {
    if (activeScanRaf) {
      cancelAnimationFrame(activeScanRaf);
      activeScanRaf = null;
    }
    if (activeCameraStream) {
      activeCameraStream.getTracks().forEach((tr) => tr.stop());
      activeCameraStream = null;
    }
  }

  function openQrModal(medId, useDomainMode) {
    ensureSharedModals();
    closeAllModals();
    const m = getMedById(medId);
    const backdrop = document.getElementById("qrModalBackdrop");
    const mount = document.getElementById("qrModalBodyMount");
    if (!backdrop || !mount) return;

    let domainMode = Boolean(useDomainMode);

    function renderQrModalContent() {
      const qrImgSrc = domainMode ? `assets/qr/domain/${m.id}.svg` : `assets/qr/${m.id}.svg`;
      const fullScanUrl = (domainMode ? DOMAIN_QR_BASE : LIVE_QR_BASE) + encodeURIComponent(m.id);
      const localScanHref = `p/?id=${encodeURIComponent(m.id)}`;

      mount.innerHTML = `
        <div style="display:inline-flex;gap:6px;background:rgba(255,255,255,0.08);padding:4px;border-radius:999px;margin-bottom:8px;">
          <button type="button" class="v6-widget-pill ${!domainMode ? "active" : ""}" data-qr-mode="live" style="font-size:0.72rem;padding:5px 12px;">Live Scan URL</button>
          <button type="button" class="v6-widget-pill ${domainMode ? "active" : ""}" data-qr-mode="domain" style="font-size:0.72rem;padding:5px 12px;">bioplasmabio.com</button>
        </div>
        <h3 style="font-size:1.35rem;font-weight:800;margin-bottom:2px;">${escapeHtml(m.name)}</h3>
        <p style="font-size:0.8rem;color:rgba(255,255,255,0.74);margin-bottom:6px;">${escapeHtml(m.dosageForm)} • ${escapeHtml(m.packSize)}</p>

        <div class="qr-modal-stage">
          <img src="${qrImgSrc}" alt="${escapeHtml(m.name)} Smart Carton QR Code" />
          <span class="v6-laser-beam" aria-hidden="true"></span>
        </div>

        <div class="qr-url-pill">${escapeHtml(fullScanUrl)}</div>

        <div class="qr-modal-actions">
          <a href="${localScanHref}" class="btn btn-crimson btn-sm" style="justify-content:center;">
            Open Product Scan Page ↗
          </a>
          <button type="button" class="btn btn-ghost-light btn-sm" id="copyQrLinkModalBtn" style="justify-content:center;">
            Copy QR Link
          </button>
          <a href="assets/qr/${m.id}.png" download="LV-Bioplasma-${m.id}-QR.png" class="btn btn-ghost-light btn-sm" style="justify-content:center;">
            Download Carton PNG
          </a>
          <a href="${qrImgSrc}" download="LV-Bioplasma-${m.id}-Vector-QR.svg" class="btn btn-ghost-light btn-sm" style="justify-content:center;">
            Download Print SVG
          </a>
        </div>
      `;

      mount.querySelectorAll("[data-qr-mode]").forEach((btn) => {
        btn.onclick = () => {
          domainMode = btn.getAttribute("data-qr-mode") === "domain";
          renderQrModalContent();
        };
      });

      const copyBtn = document.getElementById("copyQrLinkModalBtn");
      if (copyBtn) {
        copyBtn.onclick = () => {
          navigator.clipboard.writeText(fullScanUrl).then(() => {
            copyBtn.textContent = "✓ Link Copied!";
            setTimeout(() => { copyBtn.textContent = "Copy QR Link"; }, 1800);
          }).catch(() => {});
        };
      }
    }

    renderQrModalContent();
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  /* ---------- 60fps Molecular Bio-Particles Canvas ---------- */
  let bioCanvasRaf = null;
  function initMolecularCanvas() {
    if (bioCanvasRaf) {
      cancelAnimationFrame(bioCanvasRaf);
      bioCanvasRaf = null;
    }
    if (prefersReducedMotion) return;

    const host = document.querySelector(".bio-video-hero, .subpage-video-hero");
    if (!host) return;

    let canvas = host.querySelector(".v6-molecular-canvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.className = "v6-molecular-canvas";
      canvas.setAttribute("aria-hidden", "true");
      host.appendChild(canvas);
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = ["#F59E0B", "#38BDF8", "#00A658", "#FCA5A5"];
    let w = 0, h = 0;
    const nodes = Array.from({ length: 28 }, (_, i) => ({
      x: Math.random() * 1200,
      y: Math.random() * 680,
      vx: (Math.random() - 0.5) * 0.42,
      vy: (Math.random() - 0.5) * 0.42,
      r: 2 + (i % 3) * 1.3,
      c: colors[i % colors.length]
    }));

    function resize() {
      const rect = host.getBoundingClientRect();
      w = Math.max(320, rect.width);
      h = Math.max(260, rect.height);
      canvas.width = w;
      canvas.height = h;
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    function step() {
      if (!document.body.contains(canvas)) return;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 145) {
            ctx.strokeStyle = `rgba(125, 211, 252, ${(1 - dist / 145) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.fillStyle = a.c;
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }
      bioCanvasRaf = requestAnimationFrame(step);
    }
    bioCanvasRaf = requestAnimationFrame(step);
  }

  /* ---------- 3D Perspective Hover Tilt & Cursor Radial Spotlight ---------- */
  function initTiltAndSpotlight() {
    if (prefersReducedMotion) return;
    if (window.__v6TiltBound) return;
    window.__v6TiltBound = true;

    document.addEventListener("pointermove", (e) => {
      if (e.pointerType === "touch") return;
      const card = e.target.closest?.(".med-card, .v6-persona-card, .pillar-card, .need-card, .v6-qr-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mx", `${x.toFixed(0)}px`);
      card.style.setProperty("--my", `${y.toFixed(0)}px`);

      const rx = ((y / rect.height) - 0.5) * -5.2;
      const ry = ((x / rect.width) - 0.5) * 5.2;
      card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-3px)`;
    }, { passive: true });

    document.addEventListener("pointerout", (e) => {
      const card = e.target.closest?.(".med-card, .v6-persona-card, .pillar-card, .need-card, .v6-qr-card");
      if (card && !card.contains(e.relatedTarget)) {
        card.style.transform = "";
      }
    }, { passive: true });
  }

  /* ---------- Scroll-Reveal Animation Engine ---------- */
  function initScrollReveals() {
    const targets = document.querySelectorAll(".v6-reveal");
    if (!targets.length) return;
    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    targets.forEach((el) => io.observe(el));
  }

  /* ---------- 4-Stakeholder Ecosystem Hub (Doctors • Customers • Stockists • Employees) ---------- */
  const ECOSYSTEM_PERSONAS = [
    {
      id: "doctors",
      badge: "STAKEHOLDER 01",
      icon: "🩺",
      grad: "var(--v6-doc-grad)",
      solid: "#1D4ED8",
      title: "Doctors & Clinicians",
      short: "Complete %RDA compositions, 3-phase MOA, delivery evidence & sample requests.",
      ctaLabel: "Open Clinician Desk",
      portalHref: "doctors.html",
      portalBtn: "Enter Doctor Portal →",
      kicker: "CLINICAL EXCELLENCE • EVIDENCE-BACKED FORMULARY",
      stageTitle: "Designed for rapid outpatient & hospital clinical reference.",
      stageDesc: "Inspect pharmacopoeial salts, branded global actives (Aquamin™, Quatrefolic®), bioavailability mechanisms, and request clinical monographs or physician samples directly.",
      perks: [
        "<b>100% Transparent</b> active strengths & %RDA tables",
        "<b>4 Bio-Delivery Vehicles</b> minimizing GI intolerance",
        "<b>Instant Carton QR</b> opens clinical monograph on phone",
        "<b>Direct Medical Desk</b> for samples & KOL literature"
      ],
      filterOptions: [
        { id: "all", label: "All Specialties" },
        { id: "gastro", label: "Gastro & PPI" },
        { id: "bone", label: "Ortho & Bone" },
        { id: "womens", label: "Gynae & Maternal" },
        { id: "hematinic", label: "Anemia Care" }
      ]
    },
    {
      id: "customers",
      badge: "STAKEHOLDER 02",
      icon: "💚",
      grad: "var(--v6-cust-grad)",
      solid: "#00A658",
      title: "Customers & Patients",
      short: "Scan your medicine carton QR for genuine verification & easy EN/हिंदी guides.",
      ctaLabel: "Explore Patient Care",
      portalHref: "qr.html",
      portalBtn: "Scan a Medicine QR →",
      kicker: "PATIENT COMFORT • BILINGUAL EASY GUIDES & VERIFICATION",
      stageTitle: "Scan any LV Bioplasma carton to know your medicine in seconds.",
      stageDesc: "Every product features a dedicated mobile QR code that verifies authenticity, explains 'What is it for?' in simple English & सरल हिंदी, and highlights sugar-free / palatable dosing.",
      perks: [
        "<b>Carton QR Scan</b> verifies authentic LV Bioplasma pack",
        "<b>Simple EN & हिंदी</b> patient compliance overview",
        "<b>Gentle Formulations</b> — sugar-free shots & liposomal shield",
        "<b>1-Tap Helpline</b> via WhatsApp (+91 93194 91093)"
      ],
      filterOptions: [
        { id: "sugarfree", label: "🍃 Sugar-Free" },
        { id: "acidity-reflux", label: "💧 Acidity & Gas" },
        { id: "bones-vitd", label: "🦴 Bone & Vit D3" },
        { id: "pregnancy-support", label: "🤱 Maternal Care" },
        { id: "gut-diarrhoea", label: "🛡️ Gut Immunity" }
      ]
    },
    {
      id: "stockists",
      badge: "STAKEHOLDER 03",
      icon: "📦",
      grad: "var(--v6-stock-grad)",
      solid: "#D52B1E",
      title: "Stockists & Distributors",
      short: "WHO-GMP moisture-barrier packs, fast-moving Rx + OTC mix & territory tie-ups.",
      ctaLabel: "Check Territory",
      portalHref: "stockists.html",
      portalBtn: "Open Stockist Portal →",
      kicker: "PAN-INDIA TRADE • SUPER-STOCKIST & HOSPITAL SUPPLY",
      stageTitle: "High-repeat specialty portfolio built for strong channel velocity.",
      stageDesc: "Partner directly with our Sector-34 Gurugram NCR headquarters for district/state stockist rights, hospital pharmacy tenders, and tamper-evident Smart QR cartons.",
      perks: [
        "<b>WHO-GMP Certified</b> Alu-Alu, Nano-Shot & Mini-Vial packs",
        "<b>Smart QR Cartons</b> boost chemist & patient trust",
        "<b>Balanced Rx + Supplement</b> high-repeat prescription cycle",
        "<b>Prompt Dispatch</b> from Gurugram NCR central hub"
      ],
      filterOptions: [
        { id: "all", label: "Full Trade Line" },
        { id: "Oral Nano Shot", label: "4×5ml Nano Shots" },
        { id: "Hard Gelatin Capsule (EC + IR + SR)", label: "DSR Capsules" },
        { id: "Film-Coated Tablet", label: "Tablets" },
        { id: "Oral Liquid Suspension Gel", label: "200ml Gel & Sachet" }
      ]
    },
    {
      id: "employees",
      badge: "STAKEHOLDER 04",
      icon: "💼",
      grad: "var(--v6-emp-grad)",
      solid: "#0D9488",
      title: "Employees & Field Force",
      short: "Digital MR clinic QR detailing deck, fast-track appraisals & pan-India careers.",
      ctaLabel: "Launch MR Kit & Jobs",
      portalHref: "careers.html",
      portalBtn: "MR Kit & Open Roles →",
      kicker: "EMPOWERING OUR PEOPLE • DIGITAL CLINIC DETAILING",
      stageTitle: "Next-gen digital tools & merit-driven growth for every team member.",
      stageDesc: "Field Medical Representatives and Area Managers can pull up instant 30-second clinical pitch cards and scannable Doctor QR codes right during clinic visits — plus explore open roles.",
      perks: [
        "<b>Instant Clinic QR Deck</b> for paperless doctor detailing",
        "<b>Differentiated Brands</b> (Liposomal, Nano, Aquamin™)",
        "<b>Fast-Track Appraisals</b> & transparent field incentives",
        "<b>Pan-India Expansion</b> across ABM, MR, PMT & QA/QC"
      ],
      filterOptions: [
        { id: "aadirise-d3", label: "Pitch: AADIRISE D3" },
        { id: "bioipc", label: "Pitch: BIOIPC" },
        { id: "adenocal-k2", label: "Pitch: ADENOCAL-K2" },
        { id: "pantheta-dsr", label: "Pitch: PANTHETA DSR" },
        { id: "dydrofy", label: "Pitch: DYDROFY" }
      ]
    }
  ];

  function initEcosystemHub() {
    const cardsMount = document.getElementById("v6PersonaCardsMount");
    const stageMount = document.getElementById("v6PersonaStageMount");
    if (!cardsMount || !stageMount) return;

    let activePersonaId = "doctors";
    let activeSubFilter = "all";

    function renderHub() {
      const persona = ECOSYSTEM_PERSONAS.find((p) => p.id === activePersonaId) || ECOSYSTEM_PERSONAS[0];

      cardsMount.innerHTML = ECOSYSTEM_PERSONAS.map((p) => `
        <button type="button" class="v6-persona-card ${p.id === activePersonaId ? "active" : ""}" style="--p-grad:${p.grad};--p-solid:${p.solid};" data-persona-id="${p.id}">
          <div>
            <div class="persona-top-bar">
              <span class="v6-persona-icon" aria-hidden="true">${p.icon}</span>
              <span class="v6-persona-badge">${p.badge}</span>
            </div>
            <h3 style="margin-top:14px;">${escapeHtml(p.title)}</h3>
            <p>${escapeHtml(p.short)}</p>
          </div>
          <div class="v6-persona-foot">
            <span>${escapeHtml(p.ctaLabel)}</span>
            <span>→</span>
          </div>
        </button>
      `).join("");

      cardsMount.querySelectorAll("[data-persona-id]").forEach((btn) => {
        btn.onclick = () => {
          activePersonaId = btn.getAttribute("data-persona-id");
          const nextP = ECOSYSTEM_PERSONAS.find((x) => x.id === activePersonaId);
          activeSubFilter = nextP?.filterOptions?.[0]?.id || "all";
          renderHub();
        };
      });

      // Build right-side interactive widget rows tailored to active persona
      let widgetContentHtml = "";
      if (activePersonaId === "employees") {
        const pitchMed = getMedById(activeSubFilter === "all" ? "aadirise-d3" : activeSubFilter);
        widgetContentHtml = `
          <div style="display:grid;grid-template-columns:auto 1fr;gap:16px;align-items:center;background:rgba(5,16,33,0.72);padding:16px;border-radius:18px;border:1px solid rgba(255,255,255,0.15);">
            <div style="width:94px;height:94px;background:#fff;border-radius:14px;padding:6px;">
              <img src="assets/qr/${pitchMed.id}.svg" alt="${escapeHtml(pitchMed.name)} QR" style="width:100%;height:100%;object-fit:contain;" />
            </div>
            <div>
              <span style="font-size:0.7rem;font-weight:800;color:#34D399;letter-spacing:0.08em;">MR CLINIC E-DETAILER • ${escapeHtml(pitchMed.techBadge)}</span>
              <h4 style="font-size:1.15rem;font-weight:800;margin:3px 0;">${escapeHtml(pitchMed.name)}</h4>
              <p style="font-size:0.8rem;color:rgba(255,255,255,0.8);margin-bottom:8px;">${escapeHtml(pitchMed.genericSummary)}</p>
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <button type="button" class="btn btn-crimson btn-sm" data-open-med="${pitchMed.id}" style="padding:6px 13px;font-size:0.76rem;">Full Detailing View</button>
                <button type="button" class="btn-glass-qr" data-open-qr="${pitchMed.id}" style="padding:6px 12px;font-size:0.76rem;">Enlarge Doctor QR</button>
              </div>
            </div>
          </div>
          <div style="margin-top:12px;padding:12px 14px;border-radius:14px;background:rgba(255,255,255,0.06);font-size:0.8rem;color:rgba(255,255,255,0.88);">
            <strong style="color:#7DD3FC;">Key Clinic Hook:</strong> ${escapeHtml(pitchMed.highlights[0] || pitchMed.taglineEn)}
          </div>
        `;
      } else {
        let medsList = DATA.medicines;
        if (activePersonaId === "doctors" && activeSubFilter !== "all") {
          medsList = DATA.medicines.filter((m) => m.category === activeSubFilter || (m.secondaryCategories || []).includes(activeSubFilter));
        } else if (activePersonaId === "customers") {
          if (activeSubFilter === "sugarfree") {
            medsList = DATA.medicines.filter((m) => m.sugarFree);
          } else {
            const need = DATA.quickNeeds.find((n) => n.id === activeSubFilter);
            if (need) medsList = need.medicineIds.map((id) => getMedById(id));
          }
        } else if (activePersonaId === "stockists" && activeSubFilter !== "all") {
          if (activeSubFilter === "Oral Liquid Suspension Gel") {
            medsList = DATA.medicines.filter((m) => m.dosageForm.includes("Gel") || m.dosageForm.includes("Sachet") || m.dosageForm.includes("Mini Bottle"));
          } else {
            medsList = DATA.medicines.filter((m) => m.dosageForm === activeSubFilter);
          }
        }

        widgetContentHtml = `
          <div class="v6-widget-med-rows">
            ${medsList.map((m) => `
              <div class="v6-widget-med-row">
                <div class="v6-widget-med-left">
                  <img src="${m.image}" alt="${escapeHtml(m.name)}" loading="lazy" />
                  <div>
                    <strong>${escapeHtml(m.name)}</strong>
                    <span>${activePersonaId === "stockists" ? `${escapeHtml(m.dosageForm)} • ${escapeHtml(m.packSize)}` : escapeHtml(m.genericSummary)}</span>
                  </div>
                </div>
                <div style="display:flex;gap:6px;flex-shrink:0;">
                  <button type="button" class="btn btn-ghost-light btn-sm" data-open-med="${m.id}" style="padding:6px 11px;font-size:0.75rem;">${activePersonaId === "customers" ? "Guide" : "Specs"}</button>
                  <button type="button" class="btn-glass-qr" data-open-qr="${m.id}" style="padding:6px 10px;font-size:0.75rem;">QR</button>
                </div>
              </div>
            `).join("")}
          </div>
        `;
      }

      stageMount.innerHTML = `
        <div class="v6-stage-grid">
          <div>
            <span class="v6-stage-kicker">${persona.icon} ${escapeHtml(persona.kicker)}</span>
            <h3 class="v6-stage-title">${escapeHtml(persona.stageTitle)}</h3>
            <p class="v6-stage-desc">${escapeHtml(persona.stageDesc)}</p>
            <div class="v6-stage-perks">
              ${persona.perks.map((pk) => `<div class="v6-stage-perk"><span>✦</span><span>${pk}</span></div>`).join("")}
            </div>
            <div style="display:flex;gap:12px;flex-wrap:wrap;">
              <a href="${persona.portalHref}" class="btn btn-crimson">${escapeHtml(persona.portalBtn)}</a>
              <a href="qr.html" class="btn btn-ghost-light">Smart Carton QR Studio</a>
            </div>
          </div>

          <div class="v6-stage-widget">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;gap:8px;">
              <strong style="font-size:0.84rem;letter-spacing:0.04em;text-transform:uppercase;color:#7DD3FC;">Interactive ${escapeHtml(persona.title)} Explorer</strong>
              <span style="font-size:0.74rem;color:rgba(255,255,255,0.68);">Live Instant Preview</span>
            </div>
            <div class="v6-widget-pills">
              ${persona.filterOptions.map((opt) => `
                <button type="button" class="v6-widget-pill ${opt.id === activeSubFilter ? "active" : ""}" data-sub-filter="${escapeHtml(opt.id)}">
                  ${escapeHtml(opt.label)}
                </button>
              `).join("")}
            </div>
            ${widgetContentHtml}
          </div>
        </div>
      `;

      stageMount.querySelectorAll("[data-sub-filter]").forEach((pill) => {
        pill.onclick = () => {
          activeSubFilter = pill.getAttribute("data-sub-filter");
          renderHub();
        };
      });
    }

    renderHub();
  }

  /* ---------- Interactive Smartphone Carton QR Simulator (Homepage) ---------- */
  function initSmartQrShowcase() {
    const pillsMount = document.getElementById("v6QrMedPillsMount");
    const dockMount = document.getElementById("v6LiveQrDockMount");
    const phoneMount = document.getElementById("v6PhoneScreenMount");
    if (!pillsMount || !dockMount || !phoneMount) return;

    let selectedId = "aadirise-d3";
    let phoneTab = "patient"; // "patient" | "doctor"
    let phoneLang = "en";     // "en" | "hi"

    function renderSim() {
      const m = getMedById(selectedId);
      pillsMount.innerHTML = DATA.medicines.map((med) => `
        <button type="button" class="v6-qr-med-btn ${med.id === selectedId ? "active" : ""}" data-sim-med="${med.id}">
          ${escapeHtml(med.name)}
        </button>
      `).join("");

      pillsMount.querySelectorAll("[data-sim-med]").forEach((btn) => {
        btn.onclick = () => {
          selectedId = btn.getAttribute("data-sim-med");
          renderSim();
        };
      });

      const liveUrl = LIVE_QR_BASE + encodeURIComponent(m.id);
      dockMount.innerHTML = `
        <div class="v6-scannable-box" title="Point your phone camera here to test live!">
          <img src="assets/qr/${m.id}.svg" alt="Scan ${escapeHtml(m.name)} QR Code" />
          <span class="v6-laser-beam" aria-hidden="true"></span>
        </div>
        <div>
          <span style="display:inline-block;font-size:0.72rem;font-weight:800;color:#34D399;letter-spacing:0.08em;margin-bottom:4px;">LIVE SCANNABLE CARTON QR</span>
          <h4 style="font-size:1.25rem;font-weight:800;margin-bottom:4px;">${escapeHtml(m.name)}</h4>
          <p style="font-size:0.83rem;color:rgba(255,255,255,0.8);margin-bottom:12px;">
            Point your smartphone camera at this QR code right now — or click below to open the exact mobile destination page!
          </p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <a href="p/?id=${encodeURIComponent(m.id)}" class="btn btn-crimson btn-sm">Open Scanned Page ↗</a>
            <a href="assets/qr/${m.id}.png" download="LV-Bioplasma-${m.id}-QR.png" class="btn btn-ghost-light btn-sm">Download PNG</a>
            <a href="qr.html" class="btn btn-ghost-light btn-sm">All Product QRs</a>
          </div>
          <div style="margin-top:8px;font-family:var(--font-tech);font-size:0.69rem;color:rgba(125,211,252,0.85);word-break:break-all;">
            ${escapeHtml(liveUrl)}
          </div>
        </div>
      `;

      const whatText = phoneLang === "hi" ? m.easyGuide.whatIsItHi : m.easyGuide.whatIsItEn;
      const perks = (phoneLang === "hi" ? m.easyGuide.keyPerksHi : m.easyGuide.keyPerksEn).slice(0, 3);

      phoneMount.innerHTML = `
        <div class="v6-phone-notch" aria-hidden="true"></div>
        <div class="v6-phone-verified-bar">
          <span>✓</span>
          <span>${phoneLang === "hi" ? "प्रमाणित LV बायोप्लाज़्मा उत्पाद" : "Verified Authentic LV Bioplasma Pack"}</span>
        </div>
        <div class="v6-phone-pack">
          <img src="${m.image}" alt="${escapeHtml(m.name)}" />
          <div style="font-size:0.69rem;font-weight:800;color:#0284C7;letter-spacing:0.06em;">${escapeHtml(m.techBadge)}</div>
          <strong style="font-size:1.12rem;display:block;color:#0B2545;">${escapeHtml(m.name)}</strong>
          <span style="font-size:0.73rem;color:#64748B;">${escapeHtml(m.dosageForm)} • ${escapeHtml(m.packSize)}</span>
        </div>

        <div class="v6-phone-tabs">
          <button type="button" class="v6-phone-tab ${phoneTab === "patient" ? "active" : ""}" data-p-tab="patient">💚 Customer Guide</button>
          <button type="button" class="v6-phone-tab ${phoneTab === "doctor" ? "active" : ""}" data-p-tab="doctor">🩺 Doctor Rx Specs</button>
        </div>

        <div class="v6-phone-body">
          ${phoneTab === "patient" ? `
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <strong style="font-size:0.76rem;color:#0F4C81;">${phoneLang === "hi" ? "उपयोग व लाभ" : "Easy Patient Summary"}</strong>
                <button type="button" id="v6PhoneLangToggle" style="font-size:0.7rem;font-weight:800;padding:2px 9px;border-radius:999px;background:#DBEAFE;color:#1D4ED8;">
                  ${phoneLang === "en" ? "हिंदी में देखें" : "Switch to English"}
                </button>
              </div>
              <p style="font-size:0.76rem;color:#334155;line-height:1.45;margin-bottom:8px;">${escapeHtml(whatText)}</p>
              <div style="display:flex;flex-direction:column;gap:4px;">
                ${perks.map((pk) => `<div style="font-size:0.73rem;color:#0F172A;display:flex;gap:6px;"><b style="color:#00A658;">✓</b><span>${escapeHtml(pk)}</span></div>`).join("")}
              </div>
            </div>
          ` : `
            <div>
              <strong style="font-size:0.76rem;color:#0F4C81;display:block;margin-bottom:6px;">Active Composition & Dosage</strong>
              <div style="display:flex;flex-direction:column;gap:5px;margin-bottom:8px;">
                ${m.composition.slice(0, 3).map((c) => `
                  <div style="display:flex;justify-content:space-between;gap:8px;font-size:0.73rem;padding:5px 8px;background:#FFFFFF;border-radius:8px;border:1px solid #E2E8F0;">
                    <span style="font-weight:700;color:#1E293B;">${escapeHtml(c.ingredient.replace("↳ ", ""))}</span>
                    <b style="color:#0284C7;white-space:nowrap;">${escapeHtml(c.strength)}</b>
                  </div>
                `).join("")}
              </div>
              <div style="font-size:0.72rem;color:#475569;background:#FEF3C7;padding:6px 8px;border-radius:8px;">
                <b>Dosage:</b> ${escapeHtml(m.dosage)}
              </div>
            </div>
          `}
          <a href="p/?id=${encodeURIComponent(m.id)}" style="margin-top:10px;display:block;text-align:center;padding:9px;border-radius:12px;background:#0B2545;color:#FFFFFF;font-size:0.76rem;font-weight:800;">
            Launch Full Mobile Product Page →
          </a>
        </div>
      `;

      phoneMount.querySelectorAll("[data-p-tab]").forEach((b) => {
        b.onclick = () => {
          phoneTab = b.getAttribute("data-p-tab");
          renderSim();
        };
      });
      const langBtn = document.getElementById("v6PhoneLangToggle");
      if (langBtn) {
        langBtn.onclick = () => {
          phoneLang = phoneLang === "en" ? "hi" : "en";
          renderSim();
        };
      }
    }

    renderSim();
  }

  /* ---------- Smart Carton QR Command Hub & Live Camera Scanner (qr.html) ---------- */
  function initQrHubPage() {
    const masterMount = document.getElementById("v6QrMasterGridMount");
    if (!masterMount) return;

    let useDomain = false;
    const modeBtns = document.querySelectorAll("[data-qr-hub-mode]");
    const batchInput = document.getElementById("v6BatchTagInput");
    const printBtn = document.getElementById("v6PrintQrSheetBtn");

    function renderMasterGrid() {
      const batchVal = (batchInput?.value || "").trim();
      masterMount.innerHTML = DATA.medicines.map((m) => {
        const svgPath = useDomain ? `assets/qr/domain/${m.id}.svg` : `assets/qr/${m.id}.svg`;
        const base = useDomain ? DOMAIN_QR_BASE : LIVE_QR_BASE;
        const targetUrl = base + encodeURIComponent(m.id) + (batchVal ? `&batch=${encodeURIComponent(batchVal)}` : "");
        const localHref = `p/?id=${encodeURIComponent(m.id)}${batchVal ? `&batch=${encodeURIComponent(batchVal)}` : ""}`;
        return `
          <article class="v6-qr-card" style="--med-accent:${m.accent}">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px;">
                <span class="med-tech-chip">${escapeHtml(m.techBadge)}</span>
                <span class="med-sched-chip ${m.rxRequired ? "rx" : ""}">${m.rxRequired ? "Rx" : "Sugar-Free"}</span>
              </div>
              <div class="v6-qr-card-visual">
                <img src="${svgPath}" alt="${escapeHtml(m.name)} Carton QR" class="v6-qr-card-code" />
                <img src="${m.image}" alt="${escapeHtml(m.name)} Packshot" class="v6-qr-card-pack" loading="lazy" />
              </div>
              <h3 style="font-size:1.18rem;font-weight:800;margin-top:12px;">${escapeHtml(m.name)}</h3>
              <p style="font-size:0.8rem;color:var(--ink-muted);margin-bottom:6px;">${escapeHtml(m.dosageForm)} • ${escapeHtml(m.packSize)}</p>
              <div style="font-family:var(--font-tech);font-size:0.69rem;color:#0F4C81;background:#F1F5F9;padding:6px 9px;border-radius:8px;word-break:break-all;">
                ${escapeHtml(targetUrl)}
              </div>
            </div>
            <div class="no-print" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              <a href="${localHref}" class="btn btn-cobalt btn-sm" style="justify-content:center;">Open Page ↗</a>
              <a href="assets/qr/${m.id}.png" download="LV-Bioplasma-${m.id}-QR.png" class="btn btn-outline btn-sm" style="justify-content:center;">PNG (600px)</a>
              <a href="${svgPath}" download="LV-Bioplasma-${m.id}-Vector-QR.svg" class="btn btn-outline btn-sm" style="grid-column:span 2;justify-content:center;">Download Vector SVG for Carton Artwork</a>
            </div>
          </article>
        `;
      }).join("");
    }

    modeBtns.forEach((btn) => {
      btn.onclick = () => {
        useDomain = btn.getAttribute("data-qr-hub-mode") === "domain";
        modeBtns.forEach((b) => b.classList.toggle("active", b === btn));
        renderMasterGrid();
      };
    });

    batchInput?.addEventListener("input", renderMasterGrid);
    if (printBtn) printBtn.onclick = () => window.print();

    // Live Camera QR Scanner
    const startCamBtn = document.getElementById("v6StartCameraScanBtn");
    const stopCamBtn = document.getElementById("v6StopCameraScanBtn");
    const camVideo = document.getElementById("v6ScannerVideo");
    const camStatus = document.getElementById("v6ScannerStatus");
    const quickJumpSelect = document.getElementById("v6QuickScanJumpSelect");

    if (quickJumpSelect) {
      quickJumpSelect.innerHTML = `<option value="">— Select any medicine to simulate instant scan —</option>` +
        DATA.medicines.map((m) => `<option value="${m.id}">${escapeHtml(m.name)} (${escapeHtml(m.dosageForm)})</option>`).join("");
      quickJumpSelect.onchange = () => {
        if (quickJumpSelect.value) {
          window.location.href = `p/?id=${encodeURIComponent(quickJumpSelect.value)}`;
        }
      };
    }

    function handleDecodedUrl(rawValue) {
      if (!rawValue) return false;
      const lower = String(rawValue).toLowerCase();
      const matched = DATA.medicines.find((m) => lower.includes(m.id));
      if (matched) {
        stopActiveCameraScanner();
        if (camStatus) camStatus.textContent = `✓ Detected ${matched.name}! Redirecting to product page...`;
        window.location.href = `p/?id=${encodeURIComponent(matched.id)}`;
        return true;
      }
      if (rawValue.startsWith("http://") || rawValue.startsWith("https://")) {
        stopActiveCameraScanner();
        window.location.href = rawValue;
        return true;
      }
      return false;
    }

    if (startCamBtn && camVideo) {
      startCamBtn.onclick = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          if (camStatus) camStatus.textContent = "Camera access requires HTTPS or supported mobile browser. Use the instant selector on the right!";
          return;
        }
        try {
          stopActiveCameraScanner();
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
          activeCameraStream = stream;
          camVideo.srcObject = stream;
          camVideo.style.display = "block";
          await camVideo.play();
          startCamBtn.style.display = "none";
          if (stopCamBtn) stopCamBtn.style.display = "inline-flex";
          if (camStatus) camStatus.textContent = "Camera active — point steady at any LV Bioplasma Carton QR Code...";

          if ("BarcodeDetector" in window) {
            const detector = new window.BarcodeDetector({ formats: ["qr_code"] });
            const scanLoop = async () => {
              if (!activeCameraStream) return;
              try {
                const codes = await detector.detect(camVideo);
                if (codes && codes.length > 0 && handleDecodedUrl(codes[0].rawValue)) {
                  return;
                }
              } catch (_) {}
              activeScanRaf = requestAnimationFrame(scanLoop);
            };
            activeScanRaf = requestAnimationFrame(scanLoop);
          } else if (camStatus) {
            camStatus.textContent = "Camera preview live! Tip: Your native iOS/Android Camera app or Google Lens also scans every Bioplasma QR directly.";
          }
        } catch (err) {
          if (camStatus) camStatus.textContent = "Camera permission declined or unavailable. Select a medicine from the dropdown to test!";
        }
      };
    }

    if (stopCamBtn && camVideo) {
      stopCamBtn.onclick = () => {
        stopActiveCameraScanner();
        camVideo.style.display = "none";
        stopCamBtn.style.display = "none";
        if (startCamBtn) startCamBtn.style.display = "inline-flex";
        if (camStatus) camStatus.textContent = "Scanner paused. Click Start Camera Scanner anytime.";
      };
    }

    renderMasterGrid();
  }

  /* ---------- Dedicated Doctors Portal (doctors.html) ---------- */
  function initDoctorsPortal() {
    const matrixMount = document.getElementById("v6DoctorMatrixMount");
    if (!matrixMount) return;

    const searchEl = document.getElementById("v6DocSearchInput");
    const specBtns = document.querySelectorAll("[data-doc-spec]");
    let spec = "all";
    let q = "";

    function renderDocMatrix() {
      const list = DATA.medicines.filter((m) => {
        if (spec !== "all" && m.category !== spec && !(m.secondaryCategories || []).includes(spec)) return false;
        if (q) {
          const hay = [m.name, m.genericSummary, m.technology, ...(m.indications || [])].join(" ").toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      });

      matrixMount.innerHTML = `
        <div class="clinical-table-wrap">
          <table class="clinical-table">
            <thead>
              <tr>
                <th>Formulation</th>
                <th>Active Pharmacopoeial / Nutritional Composition</th>
                <th>Delivery Platform</th>
                <th>Primary Indications & Schedule</th>
                <th>Clinical Actions</th>
              </tr>
            </thead>
            <tbody>
              ${list.map((m) => `
                <tr>
                  <td>
                    <div style="display:flex;align-items:center;gap:12px;">
                      <img src="${m.image}" alt="${escapeHtml(m.name)}" style="width:50px;height:50px;object-fit:contain;" loading="lazy" />
                      <div>
                        <strong style="font-size:0.98rem;display:block;">${escapeHtml(m.name)}</strong>
                        <span style="font-size:0.75rem;color:var(--ink-muted);">${escapeHtml(m.dosageForm)} • ${escapeHtml(m.packSize)}</span>
                      </div>
                    </div>
                  </td>
                  <td style="max-width:290px;font-size:0.85rem;color:var(--ink-body);">${escapeHtml(m.genericSummary)}</td>
                  <td><span class="med-tech-chip">${escapeHtml(m.techBadge)}</span></td>
                  <td style="max-width:250px;font-size:0.82rem;color:var(--ink-body);">
                    ${escapeHtml(m.indications.slice(0, 3).join(", "))}
                    <div style="margin-top:4px;"><span class="med-sched-chip ${m.rxRequired ? "rx" : ""}">${m.rxRequired ? "Rx Prescription" : "Supplement / Sugar-Free"}</span></div>
                  </td>
                  <td>
                    <div style="display:flex;gap:8px;flex-wrap:wrap;">
                      <button type="button" class="btn btn-cobalt btn-sm" data-open-med="${m.id}">Monograph</button>
                      <button type="button" class="btn-qr-trigger" data-open-qr="${m.id}">QR</button>
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    }

    specBtns.forEach((btn) => {
      btn.onclick = () => {
        spec = btn.getAttribute("data-doc-spec");
        specBtns.forEach((b) => b.classList.toggle("active", b === btn));
        renderDocMatrix();
      };
    });
    searchEl?.addEventListener("input", () => {
      q = searchEl.value.trim().toLowerCase();
      renderDocMatrix();
    });

    renderDocMatrix();
  }

  /* ---------- Dedicated Stockists Portal Pack-Matrix (stockists.html) ---------- */
  function initStockistsPortal() {
    const packMount = document.getElementById("v6StockistPackMount");
    if (!packMount) return;

    packMount.innerHTML = `
      <div class="clinical-table-wrap">
        <table class="clinical-table">
          <thead>
            <tr>
              <th>Brand Name</th>
              <th>Specialty Division</th>
              <th>Dosage Vehicle</th>
              <th>Commercial Pack Size</th>
              <th>Smart Carton QR & Specs</th>
            </tr>
          </thead>
          <tbody>
            ${DATA.medicines.map((m) => `
              <tr>
                <td>
                  <div style="display:flex;align-items:center;gap:12px;">
                    <img src="${m.image}" alt="${escapeHtml(m.name)}" style="width:46px;height:46px;object-fit:contain;" loading="lazy" />
                    <div>
                      <strong>${escapeHtml(m.name)}</strong>
                      <div style="font-size:0.74rem;color:var(--ink-muted);">${m.rxRequired ? "Schedule Rx" : "Health Supplement / OTC"}</div>
                    </div>
                  </div>
                </td>
                <td style="text-transform:capitalize;font-weight:700;color:var(--bio-cobalt);">${escapeHtml(m.category)}</td>
                <td>${escapeHtml(m.dosageForm)}</td>
                <td><strong>${escapeHtml(m.packSize)}</strong></td>
                <td>
                  <div style="display:flex;gap:8px;">
                    <button type="button" class="btn btn-outline btn-sm" data-open-med="${m.id}">Product Sheet</button>
                    <button type="button" class="btn-qr-trigger" data-open-qr="${m.id}">Carton QR</button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  /* ---------- MR & Employee Clinic Digital Detailing Kit (careers.html) ---------- */
  function initCareersDetailingDeck() {
    const deckMount = document.getElementById("v6MrDetailingMount");
    if (!deckMount) return;

    let activeMedId = "aadirise-d3";
    function renderDeck() {
      const m = getMedById(activeMedId);
      deckMount.innerHTML = `
        <div class="v6-widget-pills" style="margin-bottom:20px;">
          ${DATA.medicines.map((med) => `
            <button type="button" class="v6-widget-pill ${med.id === activeMedId ? "active" : ""}" data-mr-med="${med.id}">
              ${escapeHtml(med.name)}
            </button>
          `).join("")}
        </div>
        <div class="v6-stage-grid">
          <div style="display:flex;flex-direction:column;gap:12px;">
            <span class="v6-stage-kicker">💼 MR 30-SECOND CLINIC VISUAL CALL CARD</span>
            <h3 style="font-size:1.75rem;font-weight:800;">${escapeHtml(m.name)}</h3>
            <p style="font-size:0.95rem;color:#7DD3FC;font-weight:700;">${escapeHtml(m.shortTitle)}</p>
            <div style="display:flex;flex-direction:column;gap:8px;margin:6px 0;">
              ${m.highlights.slice(0, 4).map((hl) => `
                <div style="display:flex;gap:9px;font-size:0.86rem;color:rgba(255,255,255,0.9);background:rgba(255,255,255,0.07);padding:9px 12px;border-radius:12px;">
                  <b style="color:#34D399;">✓</b><span>${escapeHtml(hl)}</span>
                </div>
              `).join("")}
            </div>
            <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:6px;">
              <button type="button" class="btn btn-crimson btn-sm" data-open-med="${m.id}">Open Full Visual Monograph</button>
              <a href="p/?id=${encodeURIComponent(m.id)}" class="btn btn-ghost-light btn-sm">Open Mobile Scan View ↗</a>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr auto;gap:18px;align-items:center;background:rgba(255,255,255,0.08);padding:22px;border-radius:24px;border:1px solid rgba(255,255,255,0.16);">
            <div style="text-align:center;">
              <img src="${m.image}" alt="${escapeHtml(m.name)}" style="max-height:190px;margin:0 auto 10px;filter:drop-shadow(0 16px 26px rgba(0,0,0,0.45));" />
              <span style="font-size:0.78rem;color:rgba(255,255,255,0.78);">${escapeHtml(m.dosageForm)} • ${escapeHtml(m.packSize)}</span>
            </div>
            <div style="text-align:center;">
              <div class="v6-scannable-box" style="width:142px;height:142px;">
                <img src="assets/qr/${m.id}.svg" alt="${escapeHtml(m.name)} QR" />
                <span class="v6-laser-beam"></span>
              </div>
              <span style="display:block;margin-top:8px;font-size:0.72rem;font-weight:800;color:#A7F3D0;">Doctor Scan QR</span>
            </div>
          </div>
        </div>
      `;

      deckMount.querySelectorAll("[data-mr-med]").forEach((btn) => {
        btn.onclick = () => {
          activeMedId = btn.getAttribute("data-mr-med");
          renderDeck();
        };
      });
    }
    renderDeck();
  }

  /* ---------- Re-Initialize Interactive Components on Page Swap ---------- */
  function reinitPageComponents() {
    stopActiveCameraScanner();
    applyUrlParams();
    initSubpageVideo();
    initHeroVideoCinema();
    initMolecularCanvas();
    initEcosystemHub();
    initSmartQrShowcase();
    initQrHubPage();
    initDoctorsPortal();
    initStockistsPortal();
    initCareersDetailingDeck();
    renderQuickNeeds();
    renderDivisionsShowcase();
    renderScienceLab();
    initExplorerControls();
    renderPillars();
    initEnquiryForm();
    initFaqAccordion();
    initCareersPage();
    initScrollReveals();
    syncLanguageUI();
  }

  /* ---------- Seamless Instant Page Transition Engine (Zero Shiver / Zero Shake) ---------- */
  const PAGE_CACHE = new Map();

  async function fetchPage(url) {
    const cleanUrl = url.split('#')[0];
    if (PAGE_CACHE.has(cleanUrl)) {
      return PAGE_CACHE.get(cleanUrl);
    }
    try {
      const res = await fetch(cleanUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      PAGE_CACHE.set(cleanUrl, text);
      return text;
    } catch (err) {
      console.warn("Fetch page failed for", cleanUrl, err);
      return null;
    }
  }

  function preloadSitePages() {
    const pages = ['index.html', 'products.html', 'doctors.html', 'stockists.html', 'qr.html', 'science.html', 'careers.html', 'about.html', 'contact.html'];
    pages.forEach(p => fetchPage(p));
  }

  function updateActiveNav(targetFilename) {
    const fn = targetFilename === '' ? 'index.html' : targetFilename;
    document.querySelectorAll('.primary-nav .nav-link').forEach(link => {
      const href = link.getAttribute('href')?.split('?')[0].split('#')[0] || '';
      link.classList.toggle('active', href === fn);
    });
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
      const href = link.getAttribute('href')?.split('?')[0].split('#')[0] || '';
      link.classList.toggle('active', href === fn);
    });
    if (syncCommandMenuActiveFn) syncCommandMenuActiveFn(fn);
    if (closeCommandMenuFn) closeCommandMenuFn();
  }

  let isNavigating = false;
  async function navigateSeamlessly(targetUrl, pushHistory = true) {
    if (isNavigating) return;

    const hashPart = targetUrl.includes('#') ? targetUrl.split('#')[1] : '';
    const cleanTarget = targetUrl.split('#')[0];
    const targetFilename = cleanTarget.split('/').pop().split('?')[0] || 'index.html';
    const currentFilename = window.location.pathname.split('/').pop().split('?')[0] || 'index.html';

    // If same page without query, smooth scroll to hash or top
    if (targetFilename === currentFilename && !targetUrl.includes('?')) {
      if (closeCommandMenuFn) closeCommandMenuFn();
      if (hashPart) {
        const hashEl = document.getElementById(hashPart);
        if (hashEl) {
          hashEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    isNavigating = true;

    // Instantly update active capsule in frozen header with zero flicker
    updateActiveNav(targetFilename);

    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.classList.add('page-transitioning');
    }

    const htmlText = await fetchPage(targetUrl);
    if (!htmlText) {
      window.location.href = targetUrl;
      return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    // Micro-delay for elegant crossfade
    await new Promise(r => setTimeout(r, 100));

    if (doc.title) {
      document.title = doc.title;
    }

    const newMain = doc.querySelector('main');
    if (newMain && mainEl) {
      mainEl.innerHTML = newMain.innerHTML;
    }

    const newFooter = doc.querySelector('footer.site-footer');
    const curFooter = document.querySelector('footer.site-footer');
    if (newFooter && curFooter) {
      curFooter.innerHTML = newFooter.innerHTML;
    }

    if (hashPart) {
      const hashEl = document.getElementById(hashPart);
      if (hashEl) {
        hashEl.scrollIntoView({ behavior: 'auto', block: 'start' });
      } else {
        window.scrollTo(0, 0);
      }
    } else {
      window.scrollTo(0, 0);
    }

    if (pushHistory) {
      window.history.pushState({ path: targetUrl }, '', targetUrl);
    }

    // Re-initialize interactive components
    reinitPageComponents();
    if (updateScrollBarAndHeaderFn) updateScrollBarAndHeaderFn();

    if (mainEl) {
      mainEl.classList.remove('page-transitioning');
    }

    isNavigating = false;
  }

  function initSeamlessTransitions() {
    preloadSitePages();

    document.addEventListener('click', (e) => {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      const anchor = e.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        href.startsWith('#')
      ) {
        return;
      }

      const validPages = ['index.html', 'products.html', 'doctors.html', 'stockists.html', 'qr.html', 'science.html', 'careers.html', 'about.html', 'contact.html'];
      const baseTarget = href.split('?')[0].split('#')[0];
      if (validPages.includes(baseTarget) || baseTarget === '' || baseTarget === './') {
        e.preventDefault();
        navigateSeamlessly(href, true);
      }
    });

    window.addEventListener('popstate', () => {
      navigateSeamlessly(window.location.href, false);
    });
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    applyUrlParams();
    initHeaderAndNav();
    initHeroVideoCinema();
    initSubpageVideo();
    initMolecularCanvas();
    initTiltAndSpotlight();
    initEcosystemHub();
    initSmartQrShowcase();
    initQrHubPage();
    initDoctorsPortal();
    initStockistsPortal();
    initCareersDetailingDeck();
    initScrollReveals();
    initFloatingContactWidget();
    renderQuickNeeds();
    renderDivisionsShowcase();
    renderScienceLab();
    initExplorerControls();
    renderPillars();
    initEnquiryForm();
    initFaqAccordion();
    initCareersPage();
    syncLanguageUI();
    initSeamlessTransitions();
    /* Strict Content Protection: Prevent selection, copying, and cut across all products & monographs */
    ["selectstart", "copy", "cut"].forEach(evt => {
      document.addEventListener(evt, e => {
        if (e.target && e.target.closest && e.target.closest("#explorerMount, .med-card, #monographModalBackdrop, .modal-window, #monographModalBody, .clinical-table-wrap, .needs-bento-grid")) {
          e.preventDefault();
          return false;
        }
      }, true);
    });
    document.addEventListener("contextmenu", e => {
      if (e.target && e.target.closest && e.target.closest("#explorerMount, .med-card, #monographModalBackdrop, .modal-window, #monographModalBody, .clinical-table-wrap")) {
        if (!e.target.closest("button, a, input, select")) {
          e.preventDefault();
        }
      }
    }, true);

  });
})();
