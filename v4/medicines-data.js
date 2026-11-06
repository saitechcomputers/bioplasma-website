/**
 * LV Bioplasma Biologicals Private Limited — Verified Product & Corporate Dataset
 * Source: Official Clinical Formulations & Carton Specifications (Specialized Formulations)
 */
window.BIOPLASMA_DATA = {
  company: {
    name: "LV Bioplasma Biologicals Private Limited",
    brandName: "LV Bioplasma",
    taglineEn: "Working with Nature Through Bio-Technology for a Healthy Life",
    taglineHi: "स्वस्थ जीवन के लिए जैव-प्रौद्योगिकी के माध्यम से प्रकृति के साथ कार्य",
    address: "Plot No.11, Block B, Sector-34, Gurugram, NCR - 122004, India",
    email: "admin@bioplasmabio.com",
    phone: "+91 93194 91093",
    phoneTel: "+919319491093",
    whatsapp: "+91 93194 91093",
    whatsappUrl: "https://wa.me/919319491093?text=Hello%20LV%20Bioplasma,%20I%20would%20like%20to%20enquire%20about%20your%20products.",
    website: "www.bioplasmabio.com",
    websiteUrl: "https://www.bioplasmabio.com",
    pillars: [
      {
        icon: "smile",
        color: "#f59e0b",
        titleEn: "Patient Well-Being",
        titleHi: "रोगी का आराम और मुस्कान",
        descEn: "Palatable flavours, sugar-free liquids, and small easy-to-digest tablets designed for high patient compliance.",
        descHi: "आसानी से पचने वाली छोटी गोलियाँ और शुगर-फ्री स्वादिष्ट फ़ॉर्मूले ताकि हर उम्र के मरीज़ आसानी से ले सकें।"
      },
      {
        icon: "drop",
        color: "#104581",
        titleEn: "Clinical Bioavailability",
        titleHi: "तेज़ और प्रभावी असर",
        descEn: "Nano-droplet Vitamin D3, Liposomal Iron, Micronized Hormones, and EC+IR+SR release technologies.",
        descHi: "नैनो टेक्नोलॉजी, लिपोसोमल आयरन और सस्टेंड-रिलीज़ कैप्सूल जो शरीर में बेहतर अवशोषण और असर देते हैं।"
      },
      {
        icon: "leaf",
        color: "#16a34a",
        titleEn: "Bio-Pure Ingredients",
        titleHi: "शुद्ध और सुरक्षित तत्व",
        descEn: "Sourced from clinically trusted actives including Marine Aquamin™, Quatrefolic®, and IP-grade molecules.",
        descHi: "समुद्री शैवाल से प्राप्त Aquamin™, सक्रिय फोलेट Quatrefolic® और उच्च IP-ग्रेड मानकों से निर्मित।"
      }
    ]
  },

  categories: [
    { id: "all", labelEn: "All Medicines", labelHi: "सभी दवाइयाँ", icon: "grid" },
    { id: "gastro", labelEn: "Gastro & Acid Care", labelHi: "गैस, एसिडिटी और पेट", icon: "stomach" },
    { id: "bone", labelEn: "Bone, Calcium & Vit D3", labelHi: "हड्डियाँ, कैल्शियम और विटामिन D3", icon: "bone" },
    { id: "womens", labelEn: "Women's & Maternal Care", labelHi: "महिला एवं गर्भावस्था देखभाल", icon: "heart" },
    { id: "hematinic", labelEn: "Iron & Blood Health", labelHi: "आयरन और खून की कमी", icon: "drop" },
    { id: "probiotic", labelEn: "Gut Flora & Immunity", labelHi: "पाचन और रोग-प्रतिरोधक क्षमता", icon: "shield" }
  ],

  quickNeeds: [
    {
      id: "acidity-reflux",
      titleEn: "Acidity, Heartburn & Gas",
      titleHi: "तेज़ एसिडिटी, सीने में जलन और गैस",
      subEn: "24-hr DSR capsules & instant cooling gel",
      subHi: "कैप्सूल और तुरंत आराम देने वाला जेल",
      color: "#0284c7",
      medicineIds: ["novacaine", "pantheta-dsr", "rabtheta-dsr"]
    },
    {
      id: "bones-vitd",
      titleEn: "Weak Bones, Back Pain & Vit D",
      titleHi: "कमज़ोर हड्डियाँ, कमर दर्द और विटामिन D",
      subEn: "Nano D3 shots & marine calcium matrix",
      subHi: "नैनो D3 शॉट और समुद्री कैल्शियम गोलियाँ",
      color: "#d97706",
      medicineIds: ["aadirise-d3", "adenocal-k2"]
    },
    {
      id: "pregnancy-support",
      titleEn: "Maternal & Pregnancy Support",
      titleHi: "गर्भावस्था पोषण और सुरक्षा",
      subEn: "Iron-folate, L-Arginine, Calcium & Progesterone",
      subHi: "आयरन, एल-आर्जिनिन, कैल्शियम और प्रोजेस्टेरोन",
      color: "#db2777",
      medicineIds: ["argiluck", "bioipc", "dydrofy", "adenocal-k2"]
    },
    {
      id: "low-iron",
      titleEn: "Low Hemoglobin & Fatigue",
      titleHi: "खून की कमी (एनीमिया) और थकान",
      subEn: "Gentle Liposomal Iron + Quatrefolic®",
      subHi: "बिना पेट खराब किए आयरन और फोलेट",
      color: "#dc2626",
      medicineIds: ["bioipc"]
    },
    {
      id: "gut-diarrhoea",
      titleEn: "Loose Motion & Gut Recovery",
      titleHi: "दस्त (लूज़ मोशन) और आंतों की सुरक्षा",
      subEn: "2 Billion Bacillus clausii probiotic vial",
      subHi: "एंटीबायोटिक के साथ आंतों का संतुलन",
      color: "#7c3aed",
      medicineIds: ["preimmune-aqua"]
    },
    {
      id: "sugar-free",
      titleEn: "Sugar-Free Formulations",
      titleHi: "शुगर-फ्री दवाइयाँ (डायबिटिक उपयुक्त)",
      subEn: "Safe for sugar-conscious & diabetic care",
      subHi: "बिना चीनी के सुरक्षित तरल और सैशे",
      color: "#059669",
      medicineIds: ["aadirise-d3", "argiluck", "novacaine", "bioipc", "preimmune-aqua"]
    }
  ],

  technologies: [
    {
      badge: "NANO-DROPLET DELIVERY",
      titleEn: "Nano Technology Oral D3",
      titleHi: "नैनो टेक्नोलॉजी विटामिन D3",
      medicine: "AADIRISE D3",
      medicineId: "aadirise-d3",
      accent: "#ea580c",
      descEn: "Ultra-fine nano-emulsified Cholecalciferol (60,000 IU) bypasses complex bile dispersion for faster, uniform intestinal absorption in a pleasant sugar-free butterscotch 5 ml shot.",
      descHi: "अति-सूक्ष्म नैनो कण शरीर में विटामिन D3 का तेज़ और बेहतर अवशोषण सुनिश्चित करते हैं।"
    },
    {
      badge: "PHOSPHOLIPID SHIELD",
      titleEn: "Liposomal Iron + Quatrefolic®",
      titleHi: "लिपोसोमल आयरन + सक्रिय फोलेट",
      medicine: "BIOIPC",
      medicineId: "bioipc",
      accent: "#b91c1c",
      descEn: "Encapsulates Ferric Pyrophosphate inside a protective phospholipid bilayer so iron passes intact through gastric acid — eliminating metallic taste, nausea, and constipation.",
      descHi: "लिपोसोमल परत आयरन को पेट के एसिड से बचाती है, जिससे मतली, कब्ज़ या धातु जैसा स्वाद नहीं आता।"
    },
    {
      badge: "BIO-MARINE HONEYCOMB",
      titleEn: "Aquamin™ 74-Mineral Bone Matrix",
      titleHi: "Aquamin™ समुद्री कैल्शियम और 72 मिनरल्स",
      medicine: "ADENOCAL-K2",
      medicineId: "adenocal-k2",
      accent: "#0284c7",
      descEn: "Harvested from red marine algae (Lithothamnion spp.) with a porous honeycomb structure (~86.5% bioavailability), paired with Vitamin D3 and K2-7 for targeted bone deposition.",
      descHi: "लाल समुद्री शैवाल से प्राप्त प्राकृतिक छिद्रयुक्त कैल्शियम जो पेट पर हल्का है और सीधे हड्डियों में जमता है।"
    },
    {
      badge: "DUAL-PHASE CAPSULE",
      titleEn: "Tablet-in-Capsule (EC + IR + SR)",
      titleHi: "टैबलेट-इन-कैप्सूल (तुरंत + 24 घंटे असर)",
      medicine: "PANTHETA DSR & RABTHETA DSR",
      medicineId: "pantheta-dsr",
      accent: "#0f766e",
      descEn: "Combines an Enteric-Coated PPI core with dual Immediate-Release (10 mg) and Sustained-Release (20 mg) Domperidone fractions for rapid nausea relief and full-day acid control.",
      descHi: "एक ही कैप्सूल में तुरंत आराम (IR) और पूरे दिन एसिडिटी व उल्टी से सुरक्षा (EC + SR)।"
    }
  ],

  medicines: [
    {
      id: "aadirise-d3",
      name: "AADIRISE D3",
      shortTitle: "Vitamin D3 (Cholecalciferol) Oral Solution 60,000 I.U. Nano Shot",
      genericSummary: "Cholecalciferol 60,000 I.U. Oral Nano Solution",
      category: "bone",
      secondaryCategories: ["womens"],
      classification: "Nutraceutical / Vitamin Supplement",
      rxRequired: false,
      sugarFree: true,
      flavour: "Butterscotch Flavour",
      dosageForm: "Oral Nano Shot",
      packSize: "4 × 5 ml Ready-to-Drink Bottles",
      technology: "Nano Technology",
      techBadge: "NANO DROPLET D3",
      accent: "#d97706",
      accentSoft: "#fef3c7",
      image: "assets/products/aadirise-d3.png",
      taglineEn: "The SUN VITAMIN — Fulfill the body's need for Vitamin D3.",
      taglineHi: "द सन विटामिन — शरीर में विटामिन D3 की आवश्यकता को पूरा करे।",
      easyGuide: {
        whatIsItEn: "It is used to treat and prevent Vitamin D deficiency and related conditions like Osteoporosis, Rickets, and Hypoparathyroidism.",
        whatIsItHi: "यह विटामिन D की कमी और उससे संबंधित स्थितियों जैसे ऑस्टियोपोरोसिस, रिकेट्स और हाइपोपैराथायरायडिज्म के इलाज और रोकथाम के लिए उपयोग किया जाता है।",
        whoIsItForEn: "Osteoporosis, Rickets, Hypoparathyroidism, Improving Calcium Absorption, Growth Retardation, Correcting Metabolic Problems, and Preventing Pre-eclampsia.",
        whoIsItForHi: "ऑस्टियोपोरोसिस, रिकेट्स, हाइपोपैराथायरायडिज्म, कैल्शियम अवशोषण में सुधार, कमजोर विकास, मेटाबॉलिक समस्याओं और गर्भावस्था में प्री-एक्लेम्पसिया की रोकथाम के लिए।",
        keyPerksEn: [
          "Nano Technology & Sugar Free formulation",
          "Butterscotch Flavour",
          "High Vitamin D level helps reduce BP & risk of hypertension",
          "Maintains normal blood levels of Calcium & Phosphorus",
          "95% reduction of low back pain just within 3 months weekly supplement",
          "6 months of treatment protects against bone loss",
          "Improves immunity and corrects metabolic disorders",
          "Helps in preventing Pre-eclampsia during pregnancy"
        ],
        keyPerksHi: [
          "नैनो टेक्नोलॉजी और शुगर-फ्री फ़ॉर्मूला",
          "स्वादिष्ट बटरस्कॉच फ्लेवर",
          "उच्च विटामिन D स्तर ब्लड प्रेशर और हाइपरटेंशन का जोखिम कम करने में सहायक",
          "रक्त में कैल्शियम और फास्फोरस का सामान्य स्तर बनाए रखे",
          "3 महीने के साप्ताहिक सेवन से कमर दर्द में 95% तक की राहत",
          "6 महीने का उपचार हड्डियों के नुकसान (बोन लॉस) से बचाए",
          "इम्युनिटी सुधारे और मेटाबॉलिक विकारों को ठीक करे",
          "गर्भावस्था के दौरान प्री-एक्लेम्पसिया की रोकथाम में सहायक"
        ]
      },
      composition: [
        { ingredient: "Vitamin D3 (Cholecalciferol)", detail: "Oral Solution Nano Shot", strength: "60,000 I.U.", rda: "Weekly / Periodic Therapeutic Dose" },
        { ingredient: "Base & Flavour", detail: "Sugar-Free Butterscotch Flavoured Vehicle", strength: "5 ml Shot", rda: "Sugar-Free" }
      ],
      mechanism: [
        { step: "01", title: "Nano Technology Absorption", desc: "Nano-sized droplet technology ensures rapid dispersion and optimal absorption." },
        { step: "02", title: "Calcium & Phosphorus Balance", desc: "Maintains normal blood levels of Calcium & Phosphorus and improves overall intestinal calcium absorption." },
        { step: "03", title: "Skeletal & Metabolic Support", desc: "Protects against bone loss, relieves low back pain, improves immunity, and corrects metabolic disorders." }
      ],
      highlights: [
        "It is used to treat and prevent Vitamin D deficiency and related conditions like Osteoporosis, Rickets, and Hypoparathyroidism",
        "Nano Technology — Sugar Free — Butterscotch Flavour",
        "High Vitamin D level helps reduce BP & risk of hypertension",
        "Maintains normal blood levels of Calcium & Phosphorus",
        "95% reduction of low back pain just within 3 months weekly supplement",
        "6 months of treatment protects against bone loss",
        "Improves immunity and corrects metabolic disorders",
        "Helps in preventing Pre-eclampsia during pregnancy"
      ],
      indications: [
        "Osteoporosis",
        "Rickets",
        "Hypoparathyroidism",
        "Improving Calcium Absorption",
        "Growth Retardation",
        "Correcting Metabolic Problems",
        "Preventing Pre-eclampsia"
      ],
      dosage: "Typically 1 bottle (5 ml) weekly or as directed by the Physician. Shake well before drinking.",
      keywords: ["vitamin d", "d3", "cholecalciferol", "60000", "60k", "nano shot", "bone", "back pain", "osteoporosis", "rickets", "butterscotch", "sugar free", "sun vitamin"]
    },

    {
      id: "adenocal-k2",
      name: "ADENOCAL-K2",
      shortTitle: "Aquamin Calcium + Vitamin D3 + Vitamin K2-7 Tablets",
      genericSummary: "Aquamin™ 1000 mg (Elemental Ca 330 mg + Mg 25 mg + 72 Minerals) + Vit K2-7 45 mcg + Vit D3 400 IU",
      category: "bone",
      secondaryCategories: ["womens"],
      classification: "Health Supplement",
      rxRequired: false,
      sugarFree: true,
      flavour: "Small Tablet, Easy to Digest",
      dosageForm: "Film-Coated Tablet",
      packSize: "1 × 10 Tablets (AMBIO-09)",
      technology: "Aquamin™ Bio-Marine Honeycomb Matrix",
      techBadge: "MARINE AQUAMIN MATRIX",
      accent: "#0284c7",
      accentSoft: "#e0f2fe",
      image: "assets/products/adenocal-k2.png",
      taglineEn: "Advanced Bone Nutrition Formula — Not just Calcium Replacement, Physiological Bone Nutrition.",
      taglineHi: "एडवांस्ड बोन न्यूट्रिशन फ़ॉर्मूला — सिर्फ़ कैल्शियम की पूर्ति नहीं, हड्डियों का संपूर्ण प्राकृतिक पोषण।",
      easyGuide: {
        whatIsItEn: "Marine plant-derived calcium from red algae (Lithothamnion species) with a highly porous, honeycomb structure for superior absorption. Provides calcium, magnesium, and 72 trace minerals with demonstrated high bioavailability (~86.5%), helping reduce serum PTH indicating better calcium utilisation.",
        whatIsItHi: "लाल समुद्री शैवाल (Lithothamnion species) से प्राप्त प्राकृतिक कैल्शियम, जिसकी छिद्रयुक्त हनीकॉम्ब संरचना उच्च अवशोषण (~86.5% बायोअवेलेबिलिटी) देती है और शरीर को कैल्शियम, मैग्नीशियम व 72 प्राकृतिक ट्रेस मिनरल्स प्रदान करती है।",
        whoIsItForEn: "Pregnant Women, Post-menopausal women, Osteopenia and osteoporosis, Elderly patients, Steroid-induced bone loss, and Patients intolerant to conventional calcium.",
        whoIsItForHi: "गर्भवती महिलाएँ, मेनोपॉज़ के बाद की महिलाएँ, ऑस्टियोपेनिया व ऑस्टियोपोरोसिस, बुज़ुर्ग मरीज़, स्टेरॉयड के कारण हड्डियों की कमज़ोरी और जिन्हें साधारण कैल्शियम नहीं पचता।",
        keyPerksEn: [
          "Demonstrated high bioavailability (~86.5%)",
          "Gentle on Stomach, Better Absorption",
          "Provides calcium, magnesium, and 72 trace minerals",
          "Directs Calcium to Bone, Prevents Vascular Calcification",
          "Helps reduce serum PTH indicating better calcium utilisation",
          "Small Tablet, Easy to Digest"
        ],
        keyPerksHi: [
          "~86.5% उच्च बायोअवेलेबिलिटी प्रमाणित",
          "पेट पर बिल्कुल हल्का — बेहतर अवशोषण",
          "कैल्शियम, मैग्नीशियम और 72 प्राकृतिक ट्रेस मिनरल्स से भरपूर",
          "कैल्शियम को हड्डियों में पहुँचाता है और नसों में जमने से रोकता है",
          "बेहतर कैल्शियम उपयोग के लिए सीरम PTH कम करने में सहायक",
          "छोटा टैबलेट — पचने में अत्यंत आसान"
        ]
      },
      composition: [
        { ingredient: "Aquamin™ (Red Marine Algae — Lithothamnion species)", detail: "Natural porous honeycomb multi-mineral complex", strength: "1000 mg", rda: "Bio-Marine Matrix" },
        { ingredient: "↳ Elemental Calcium (from Aquamin™)", detail: "Natural marine algae calcium with ~86.5% bioavailability", strength: "330 mg", rda: "33.00% RDA", rdaPct: 33 },
        { ingredient: "↳ Elemental Magnesium (from Aquamin™)", detail: "Natural marine magnesium co-factor", strength: "25 mg", rda: "5.68% RDA", rdaPct: 6 },
        { ingredient: "↳ 72 Natural Trace Minerals", detail: "Natural marine trace mineral co-factors", strength: "35.7 mg", rda: "Natural Co-factors" },
        { ingredient: "Vitamin K2-7 (Menaquinone-7)", detail: "Directs calcium to bone & prevents vascular calcification", strength: "45 mcg", rda: "81.81% RDA", rdaPct: 82 },
        { ingredient: "Vitamin D3 (Cholecalciferol)", detail: "Improves gut absorption & maintains serum calcium", strength: "400 I.U.", rda: "66.66% RDA", rdaPct: 67 }
      ],
      mechanism: [
        { step: "1. ABSORB", title: "Aquamin Calcium", desc: "Gentle on Stomach, Better Absorption with highly porous honeycomb marine red algae structure." },
        { step: "2. UTILISE", title: "Vitamin D3", desc: "Improves Gut Absorption, Maintains Serum Calcium for efficient mineral uptake." },
        { step: "3. DEPOSIT", title: "Vitamin K2-7", desc: "Directs Calcium to Bone, Prevents Vascular Calcification so calcium deposits safely in skeletal matrix." }
      ],
      highlights: [
        "Marine plant-derived calcium from red algae (Lithothamnion species)",
        "Highly porous, honeycomb structure for superior absorption",
        "Provides calcium, magnesium, and 72 trace minerals",
        "Demonstrated high bioavailability (~86.5%)",
        "Helps reduce serum PTH indicating better calcium utilisation",
        "Not just Calcium Replacement — Physiological Bone Nutrition"
      ],
      indications: [
        "Pregnant Women",
        "Post-menopausal women",
        "Osteopenia and osteoporosis",
        "Elderly patients",
        "Steroid-induced bone loss",
        "Patients intolerant to conventional calcium"
      ],
      dosage: "1 Tablet once or twice daily after meals, or as directed by the Physician.",
      keywords: ["calcium", "aquamin", "k2", "k2-7", "magnesium", "minerals", "bone", "pregnancy", "menopause", "osteopenia", "osteoporosis", "adenocal"]
    },

    {
      id: "argiluck",
      name: "ARGILUCK",
      shortTitle: "Supporting Endothelial Function & Microcirculation in Women — L-Arginine + Proanthocyanidin Sachet",
      genericSummary: "L-Arginine IP 3 g + Proanthocyanidin 75 mg Sugar-Free Granules",
      category: "womens",
      secondaryCategories: [],
      classification: "Gynecological Nutritional Therapy",
      rxRequired: false,
      sugarFree: true,
      flavour: "Sugar-Free Cranberry Granules",
      dosageForm: "Oral Granules Sachet",
      packSize: "10 Sachets × 5.5 g",
      technology: "Nitric Oxide + Endothelial Antioxidant Synergy",
      techBadge: "NITRIC OXIDE SYNERGY",
      accent: "#e11d48",
      accentSoft: "#ffe4e6",
      image: "assets/products/argiluck.png",
      taglineEn: "Supporting Endothelial Function & Microcirculation in Women — Provides 3 g L-Arginine with antioxidant support.",
      taglineHi: "महिलाओं में एंडोथीलियल कार्य और माइक्रो-सर्कुलेशन को समर्थन — 3 ग्राम एल-आर्जिनिन और एंटीऑक्सीडेंट सुरक्षा।",
      easyGuide: {
        whatIsItEn: "ARGILUCK is designed as an adjunct nutritional therapy to support uteroplacental blood flow, endothelial health, and antioxidant balance in gynecological practice.",
        whatIsItHi: "ARGILUCK स्त्री रोग और प्रसूति अभ्यास में गर्भनाल तक रक्त प्रवाह, एंडोथीलियल स्वास्थ्य और एंटीऑक्सीडेंट संतुलन को समर्थन देने के लिए डिज़ाइन की गई न्यूट्रिशनल थेरेपी है।",
        whoIsItForEn: "Impaired uteroplacental circulation, High-risk pregnancy with endothelial dysfunction, Recurrent pregnancy loss (vascular factors), and Intrauterine growth restriction (IUGR) – Adjunctive Support.",
        whoIsItForHi: "कमजोर यूटरोप्लेसेंटल रक्त प्रवाह, हाई-रिस्क प्रेग्नेंसी, बार-बार गर्भपात (संवहनी कारण) और गर्भ में शिशु का कम विकास (IUGR) की स्थिति में।",
        keyPerksEn: [
          "L-Arginine: Precursor of Nitric Oxide – Improves vasodilation and blood flow",
          "Proanthocyanidin: Potent antioxidant – Protects endothelium and stabilizes Nitric Oxide",
          "Net Effect: Improved endothelial function and microcirculation",
          "Provides 3 g L-Arginine with antioxidant support to help optimize nitric oxide availability and uteroplacental perfusion",
          "Dosage: As directed by the Physician"
        ],
        keyPerksHi: [
          "एल-आर्जिनिन: नाइट्रिक ऑक्साइड का स्रोत — रक्त नलिकाओं को चौड़ा कर रक्त प्रवाह सुधारे",
          "प्रोएंथोसायनिडिन: शक्तिशाली एंटीऑक्सीडेंट — एंडोथीलियम की रक्षा करे और नाइट्रिक ऑक्साइड को स्थिर रखे",
          "कुल प्रभाव: एंडोथीलियल कार्य और माइक्रो-सर्कुलेशन में सुधार",
          "यूटरोप्लेसेंटल परफ्यूज़न को अनुकूलित करने के लिए 3 ग्राम एल-आर्जिनिन युक्त",
          "खुराक: चिकित्सक के निर्देशानुसार"
        ]
      },
      composition: [
        { ingredient: "L-Arginine IP", detail: "Precursor of Nitric Oxide — Improves vasodilation and blood flow", strength: "3 g (3000 mg)", rda: "Per Sachet" },
        { ingredient: "Proanthocyanidin", detail: "Potent antioxidant — Protects endothelium and stabilizes Nitric Oxide", strength: "75 mg", rda: "Per Sachet" },
        { ingredient: "Sugar-Free Base", detail: "Excipients & Colour", strength: "q.s. to 5.5 g", rda: "Sugar-Free" }
      ],
      mechanism: [
        { step: "01", title: "L-Arginine Vasodilation", desc: "Precursor of Nitric Oxide – Improves vasodilation and blood flow." },
        { step: "02", title: "Proanthocyanidin Protection", desc: "Potent antioxidant – Protects endothelium and stabilizes Nitric Oxide." },
        { step: "03", title: "Net Clinical Effect", desc: "Improved endothelial function and microcirculation to help optimize uteroplacental perfusion." }
      ],
      highlights: [
        "Supporting Endothelial Function & Microcirculation in Women",
        "Designed as an adjunct nutritional therapy to support uteroplacental blood flow, endothelial health, and antioxidant balance",
        "L-Arginine: Precursor of Nitric Oxide – Improves vasodilation and blood flow",
        "Proanthocyanidin: Potent antioxidant – Protects endothelium and stabilizes Nitric Oxide",
        "Net Effect: Improved endothelial function and microcirculation",
        "Provides 3 g L-Arginine with antioxidant support to help optimize nitric oxide availability and uteroplacental perfusion"
      ],
      indications: [
        "Impaired uteroplacental circulation",
        "High-risk pregnancy with endothelial dysfunction",
        "Recurrent pregnancy loss (vascular factors)",
        "Intrauterine growth restriction (IUGR) – Adjunctive Support"
      ],
      dosage: "As directed by the Physician. Dissolve the contents of one sachet in water and consume.",
      keywords: ["l-arginine", "proanthocyanidin", "pregnancy", "uteroplacental", "blood flow", "iugr", "endothelial", "nitric oxide", "argiluck"]
    },

    {
      id: "bioipc",
      name: "BIOIPC",
      shortTitle: "Liposomal Iron with Active Hematinics (AMBIO-15)",
      genericSummary: "Elemental Iron (Liposomal) 27 mg + Quatrefolic® Active Folate + P5P + Vit B12 + Glycine",
      category: "hematinic",
      secondaryCategories: ["womens"],
      classification: "Hematinic Supplement",
      rxRequired: false,
      sugarFree: true,
      flavour: "Small Tablet, Easy to Digest",
      dosageForm: "Film-Coated Tablet",
      packSize: "1 × 10 Tablets (AMBIO-15)",
      technology: "Liposomal Iron Technology",
      techBadge: "LIPOSOMAL IRON TECH",
      accent: "#b91c1c",
      accentSoft: "#fee2e2",
      image: "assets/products/bioipc.png",
      taglineEn: "Effective Iron Correction without the GI Burden — High Absorption, Gentle on Stomach, Better Compliance.",
      taglineHi: "बिना पेट की तकलीफ़ के प्रभावी आयरन पूर्ति — उच्च अवशोषण, पेट पर हल्का, बेहतर अनुपालन।",
      easyGuide: {
        whatIsItEn: "Iron is encapsulated in a phospholipid liposome that protects it from gastric acid. The iron reaches the small intestine intact and is released at the main absorption site, resulting in higher bioavailability and reduced gastrointestinal irritation.",
        whatIsItHi: "आयरन को फॉस्फोलिपिड लिपोसोम में सुरक्षित किया गया है जो इसे पेट के एसिड से बचाता है। आयरन छोटी आंत में सुरक्षित पहुँचकर मुख्य अवशोषण स्थल पर रिलीज़ होता है, जिससे उच्च अवशोषण मिलता है और पेट में जलन नहीं होती।",
        whoIsItForEn: "Complete Hematinic Support for individuals with Iron Deficiency, Pregnancy & Lactation demands, and Patients intolerant to conventional oral iron.",
        whoIsItForHi: "गर्भावस्था, स्तनपान और खून की कमी (एनीमिया) के मरीज़ जिन्हें साधारण आयरन से उल्टी, मतली, कब्ज़ या पेट दर्द की समस्या होती है।",
        keyPerksEn: [
          "Minimal nausea, constipation, and epigastric discomfort",
          "No metallic taste or odor",
          "No interaction with food or calcium",
          "Reduced oxidative stress — Better patient compliance",
          "Clinical studies demonstrate significant ferritin improvement and hemoglobin rise comparable to IV iron",
          "Small Tablet, Easy to Digest"
        ],
        keyPerksHi: [
          "मतली, कब्ज़ और पेट दर्द की न्यूनतम संभावना",
          "मुंह में कोई कड़वा या धातु जैसा स्वाद नहीं",
          "भोजन या कैल्शियम के साथ कोई प्रतिकूल प्रभाव नहीं",
          "कम ऑक्सीडेटिव तनाव — बेहतर रोगी अनुपालन",
          "क्लीनिकल अध्ययनों में फेरिटिन और हीमोग्लोबिन में IV आयरन जैसी उत्कृष्ट वृद्धि प्रमाणित",
          "छोटा टैबलेट — पचने में अत्यंत आसान"
        ]
      },
      composition: [
        { ingredient: "Elemental Iron (Liposomal)", detail: "Hemoglobin Synthesis — Encapsulated in Phospholipid Liposome", strength: "27 mg", rda: "100% RDA (Pregnancy)" },
        { ingredient: "Quatrefolic® (Active Folate)", detail: "DNA Synthesis and Erythropoiesis", strength: "655 mcg", rda: "100% RDA" },
        { ingredient: "P5P (Active Vitamin B6)", detail: "Heme Synthesis (Pyridoxal-5-Phosphate)", strength: "2.3 mg", rda: "100% RDA" },
        { ingredient: "Vitamin B12", detail: "RBC Maturation", strength: "2.45 mcg", rda: "100% RDA" },
        { ingredient: "Glycine", detail: "Structural Support for Heme", strength: "10 mg", rda: "Heme Substrate" }
      ],
      mechanism: [
        { step: "01", title: "Liposomal Protection", desc: "Phospholipid liposome protects iron from gastric acid, preventing epigastric irritation." },
        { step: "02", title: "Intact Intestinal Delivery", desc: "Reaches the small intestine intact and releases at the main absorption site for higher bioavailability." },
        { step: "03", title: "Complete Hematinic Synthesis", desc: "Active Folate (Quatrefolic®), P5P, B12, and Glycine synergize for rapid hemoglobin synthesis and RBC maturation." }
      ],
      highlights: [
        "High Absorption, Gentle on Stomach, Better Compliance",
        "Iron is encapsulated in a phospholipid liposome that protects it from gastric acid",
        "The iron reaches the small intestine intact and is released at the main absorption site",
        "Minimal nausea, constipation, and epigastric discomfort; No metallic taste or odor; No interaction with food or calcium",
        "Complete Hematinic Support: Elemental Iron (27 mg), Quatrefolic® (Active Folate), P5P, Vitamin B12, and Glycine",
        "Clinical studies on liposomal iron demonstrate significant ferritin improvement, hemoglobin rise comparable to IV iron and excellent tolerability even with long-term use",
        "Effective Iron Correction without the GI Burden — Small Tablet, Easy to Digest"
      ],
      indications: [
        "Iron Deficiency Anemia",
        "Pregnancy & Lactation Iron Demands",
        "Nutritional Hematinic Deficiency",
        "Patients Intolerant to Conventional Oral Iron Salts",
        "Post-Operative or Chronic Blood Loss Recovery"
      ],
      dosage: "1 Tablet daily after meals, or as directed by the Physician.",
      keywords: ["iron", "liposomal iron", "bioipc", "quatrefolic", "folate", "p5p", "b12", "glycine", "anemia", "hemoglobin", "pregnancy iron"]
    },

    {
      id: "dydrofy",
      name: "DYDROFY",
      shortTitle: "Dydrogesterone Tablets IP 10 mg",
      genericSummary: "Dydrogesterone IP 10 mg Film-Coated Oral Tablets",
      category: "womens",
      secondaryCategories: [],
      classification: "Prescription / Hormonal Therapy",
      rxRequired: true,
      sugarFree: true,
      flavour: "Unflavoured Oral Tablet",
      dosageForm: "Film-coated oral tablet",
      packSize: "1 × 10 Tablets",
      technology: "IP-Grade Micronized Retroprogesterone",
      techBadge: "IP-GRADE RETROPROGESTERONE",
      accent: "#9333ea",
      accentSoft: "#f3e8ff",
      image: "assets/products/dydrofy.png",
      taglineEn: "Protect Precious Moment with Dydrogesterone Tablets 10mg.",
      taglineHi: "प्रोटेक्ट प्रेशियस मोमेंट — डायड्रोजेस्टेरोन टैबलेट 10mg के साथ मातृत्व की सुरक्षा।",
      easyGuide: {
        whatIsItEn: "Dydrogesterone works by binding to progesterone receptors in the uterus, causing changes in the lining (endometrium) to support pregnancy or ensure a normal menstrual cycle. Unlike some other progestins, it generally does not inhibit ovulation at therapeutic doses.",
        whatIsItHi: "डायड्रोजेस्टेरोन गर्भाशय में प्रोजेस्टेरोन रिसेप्टर्स से जुड़कर एंडोमेट्रियम में सुरक्षात्मक बदलाव लाता है ताकि गर्भावस्था को सहारा मिले या सामान्य मासिक चक्र सुनिश्चित हो सके। यह ओव्यूलेशन को बाधित नहीं करता।",
        whoIsItForEn: "DESIGNED FOR PHYSICIAN-DIRECTED PROGESTERONE THERAPY — Threatened miscarriage, habitual abortion, and progesterone deficiency conditions.",
        whoIsItForHi: "गर्भपात के खतरे (थ्रेटेंड अबॉर्शन), बार-बार होने वाले गर्भपात, ल्यूटियल फेज सपोर्ट और प्रोजेस्टेरोन की कमी से जुड़े विकारों में डॉक्टर के परामर्श पर।",
        keyPerksEn: [
          "IP-GRADE DYDROGESTERONE",
          "STANDARD 10 MG FORMULATION",
          "DESIGNED FOR PHYSICIAN-DIRECTED PROGESTERONE THERAPY",
          "Does not inhibit ovulation at therapeutic doses",
          "High selective progestogenic activity with minimal androgenic side effects"
        ],
        keyPerksHi: [
          "IP-ग्रेड डायड्रोजेस्टेरोन की शुद्धता",
          "मानक 10 mg चिकित्सीय फ़ॉर्मूलेशन",
          "विशेषज्ञ डॉक्टरों द्वारा निर्देशित प्रोजेस्टेरोन थेरेपी",
          "थेराप्यूटिक डोज़ पर ओव्यूलेशन बाधित नहीं करता",
          "उच्च चयनात्मक प्रोजेस्टेशनल प्रभाव"
        ]
      },
      composition: [
        { ingredient: "Dydrogesterone IP", detail: "Selective Retroprogesterone Receptor Agonist", strength: "10 mg", rda: "IP Grade" },
        { ingredient: "Excipients", detail: "Colour: Titanium Dioxide IP", strength: "q.s.", rda: "Film-Coated Tablet" }
      ],
      mechanism: [
        { step: "01", title: "Selective Receptor Binding", desc: "Binds selectively to uterine progesterone receptors without androgenic side effects." },
        { step: "02", title: "Endometrial Transformation", desc: "Transforms proliferative endometrium into a fully receptive secretory lining supporting pregnancy or normal menstrual cycle." },
        { step: "03", title: "Luteal & Gestational Support", desc: "Supports pregnancy without inhibiting ovulation at therapeutic doses." }
      ],
      highlights: [
        "Protect Precious Moment with Dydrogesterone Tablets 10mg",
        "IP-GRADE DYDROGESTERONE standard 10 mg formulation",
        "DESIGNED FOR PHYSICIAN-DIRECTED PROGESTERONE THERAPY",
        "Dydrogesterone works by binding to progesterone receptors in the uterus",
        "Causes changes in the lining (endometrium) to support pregnancy or ensure a normal menstrual cycle",
        "Unlike some other progestins, it generally does not inhibit ovulation at therapeutic doses"
      ],
      indications: [
        "Threatened Miscarriage",
        "Habitual / Recurrent Pregnancy Loss",
        "Luteal Phase Support in Assisted Reproduction",
        "Dysfunctional Uterine Bleeding",
        "Dysmenorrhea & Endometriosis Management",
        "Secondary Amenorrhea"
      ],
      dosage: "As directed by the Gynecologist / Physician. Swallow whole with water.",
      keywords: ["dydrogesterone", "dydrofy", "progesterone", "pregnancy", "miscarriage", "habitual abortion", "luteal phase", "hormone", "10mg"]
    },

    {
      id: "novacaine",
      name: "NOVACAINE",
      shortTitle: "Anesthetic-Antacid Gel (Sugar Free Oral Gel - Contains Sorbitol) 200ml",
      genericSummary: "Oxetacaine IP 10 mg + Aluminium Hydroxide IP 291 mg + Magnesium Hydroxide IP 98 mg per 5 ml",
      category: "gastro",
      secondaryCategories: [],
      classification: "Anesthetic-Antacid Oral Gel",
      rxRequired: false,
      sugarFree: true,
      flavour: "Sugar Free Mint Flavour (Contains Sorbitol)",
      dosageForm: "Oral Suspension / Gel",
      packSize: "200 ml Bottle",
      technology: "Dual Acid Neutralization + Mucosal Anesthetic Coating",
      techBadge: "ANESTHETIC-ANTACID GEL",
      accent: "#0891b2",
      accentSoft: "#cffafe",
      image: "assets/products/novacaine.png",
      taglineEn: "Immediate symptomatic relief with sustained control of Gastric Acidity, Especially useful in Painful Acidity and Gastritis.",
      taglineHi: "तेज़ दर्द और एसिडिटी में तुरंत आराम के साथ लंबे समय तक एसिड नियंत्रण — विशेष रूप से दर्दनाक एसिडिटी और गैस्ट्राइटिस में उपयोगी।",
      easyGuide: {
        whatIsItEn: "An anesthetic–Antacid gel offering immediate symptomatic relief with sustained control of Gastric Acidity, Especially useful in Painful Acidity and Gastritis.",
        whatIsItHi: "यह एनेस्थेटिक-एंटासिड जेल है जो दर्दनाक एसिडिटी और गैस्ट्राइटिस में तुरंत दर्द व जलन शांत करता है और लंबे समय तक एसिड को नियंत्रित रखता है।",
        whoIsItForEn: "Acid Peptic Disease & Gastritis, GERD / Reflux Esophagitis, Peptic Ulcer Disease, Painful Hyperacidity & Heartburn, and Drug-Induced Gastric Irritation (NSAIDs, Steroids).",
        whoIsItForHi: "एसिड पेप्टिक रोग और गैस्ट्राइटिस, जीईआरडी/रिफ्लक्स, पेप्टिक अल्सर, सीने में दर्दनाक जलन और दवाओं से होने वाली पेट की जलन में।",
        keyPerksEn: [
          "Rapid relief from Burning and Pain",
          "Sustained Antacid Action",
          "Gel formulation for better Mucosal Coating",
          "Sugar-Free – Suitable for Diabetic Patients",
          "Good GI Tolerability"
        ],
        keyPerksHi: [
          "जलन और पेट दर्द से त्वरित राहत",
          "लंबे समय तक रहने वाली एंटासिड क्रिया",
          "पेट की भीतरी दीवार पर बेहतर सुरक्षात्मक परत (म्यूकोसल कोटिंग)",
          "शुगर-फ्री — डायबिटीज़ के मरीज़ों के लिए पूरी तरह उपयुक्त",
          "उत्कृष्ट पाचन सहनशीलता"
        ]
      },
      composition: [
        { ingredient: "Oxetacaine IP", detail: "Local anesthetic providing rapid relief from epigastric pain and burning; remains effective even in highly acidic pH", strength: "10 mg", rda: "Per 5 ml" },
        { ingredient: "Aluminium Hydroxide IP", detail: "Slow-acting antacid for sustained acid neutralization (as Paste eq. to dried gel)", strength: "291 mg", rda: "Per 5 ml" },
        { ingredient: "Magnesium Hydroxide IP", detail: "Fast-acting antacid; balances aluminium-induced constipation (as Paste)", strength: "98 mg", rda: "Per 5 ml" },
        { ingredient: "Sugar Free Gel Base", detail: "Contains Sorbitol — Suitable for Diabetic Patients", strength: "q.s. to 5 ml", rda: "200 ml Bottle" }
      ],
      mechanism: [
        { step: "01", title: "Oxetacaine Local Anesthesia", desc: "Local anesthetic providing rapid relief from epigastric pain and burning; remains effective even in highly acidic pH." },
        { step: "02", title: "Aluminium Hydroxide", desc: "Slow-acting antacid for sustained acid neutralization." },
        { step: "03", title: "Magnesium Hydroxide", desc: "Fast-acting antacid; balances aluminium-induced constipation." },
        { step: "04", title: "Overall Effect", desc: "Immediate pain relief with prolonged acid control." }
      ],
      highlights: [
        "An anesthetic–Antacid gel offering immediate symptomatic relief with sustained control of Gastric Acidity",
        "Especially useful in Painful Acidity and Gastritis",
        "Rapid relief from Burning and Pain",
        "Sustained Antacid Action with gel formulation for better Mucosal Coating",
        "Sugar-Free – Suitable for Diabetic Patients",
        "Good GI Tolerability"
      ],
      indications: [
        "Acid Peptic Disease & Gastritis",
        "GERD / Reflux Esophagitis",
        "Peptic Ulcer Disease",
        "Painful Hyperacidity & Heartburn",
        "Drug-Induced Gastric Irritation (NSAIDs, Steroids)"
      ],
      dosage: "5-10 ml, 3-4 times daily, Preferably 15 minutes before meals & at bedtime. To be taken undiluted or as directed by the physician.",
      keywords: ["novacaine", "oxetacaine", "aluminium hydroxide", "magnesium hydroxide", "antacid", "gastritis", "heartburn", "acidity", "ulcer", "sugar free gel"]
    },

    {
      id: "pantheta-dsr",
      name: "PANTHETA DSR",
      shortTitle: "Pantoprazole 40mg (EC) + Domperidone 10mg (IR) + Domperidone 20mg (SR) Capsules",
      genericSummary: "Pantoprazole Sodium 40 mg (EC) + Domperidone 30 mg (10 mg IR + 20 mg SR)",
      category: "gastro",
      secondaryCategories: [],
      classification: "Proton Pump Inhibitor & Prokinetic",
      rxRequired: true,
      sugarFree: true,
      flavour: "Oral Capsule",
      dosageForm: "Tablet in Capsule",
      packSize: "10 × 10 Capsules",
      technology: "Tablet in Capsule Technology (EC + IR + SR)",
      techBadge: "TABLET IN CAPSULE",
      accent: "#0d9488",
      accentSoft: "#ccfbf1",
      image: "assets/products/pantheta-dsr.png",
      taglineEn: "The Perfect 'Gastric Motility' Control Combination — Tablet in Capsule Technology.",
      taglineHi: "द परफेक्ट 'गैस्ट्रिक मोटिलिटी' कंट्रोल कॉम्बिनेशन — टैबलेट इन कैप्सूल टेक्नोलॉजी।",
      easyGuide: {
        whatIsItEn: "This combination is used to treat conditions related to stomach acid and motility issues.",
        whatIsItHi: "यह संयोजन पेट के एसिड और गतिशीलता (मोटिलिटी) से संबंधित विकारों के उपचार के लिए उपयोग किया जाता है।",
        whoIsItForEn: "GERD, DYSPEPSIA, VOMITING, G.I. ULCER, HEART BURN.",
        whoIsItForHi: "जीईआरडी (एसिड रिफ्लक्स), बदहजमी (डिस्पेप्सिया), उल्टी/जी मिचलाना, पेट के अल्सर और सीने में जलन में।",
        keyPerksEn: [
          "Tablet in Capsule Technology",
          "Pantoprazole 40mg (EC): Designed to dissolve in small intestine; treats GERD, peptic ulcers & other acid-related problems",
          "Domperidone 10mg (IR): Released quickly to relieve nausea and vomiting by improving movement of stomach and intestines",
          "Domperidone 20mg (SR): Released slowly over time to provide longer-lasting relief from nausea and vomiting",
          "This combination is used to treat conditions related to stomach acid and motility issues"
        ],
        keyPerksHi: [
          "टैबलेट इन कैप्सूल आधुनिक तकनीक",
          "पैंटोप्राजोल 40mg (EC): आंत में घुलकर एसिडिटी और अल्सर का इलाज करता है",
          "डोमपेरिडोन 10mg (IR): तुरंत घुलकर मतली और उल्टी को शांत करता है",
          "डोमपेरिडोन 20mg (SR): धीरे-धीरे घुलकर पूरे दिन उल्टी और भारीपन से बचाता है",
          "एसिड नियंत्रण और पेट की गतिशीलता दोनों पर एक साथ काम करता है"
        ]
      },
      composition: [
        { ingredient: "Pantoprazole 40mg (EC)", detail: "Enteric Coated — Dissolves in small intestine; treats GERD & peptic ulcers", strength: "40 mg", rda: "EC Fraction" },
        { ingredient: "Domperidone 10mg (IR)", detail: "Immediate Release — Relieves nausea and vomiting quickly", strength: "10 mg", rda: "IR Fraction" },
        { ingredient: "Domperidone 20mg (SR)", detail: "Sustained Release — Provides longer-lasting relief from nausea and vomiting", strength: "20 mg", rda: "SR Fraction" }
      ],
      mechanism: [
        { step: "01", title: "Pantoprazole 40mg (EC)", desc: "EC Stands for enteric coating, meaning the medication is designed to dissolve in the small intestine rather than the stomach. It is used to treat conditions like GERD, peptic ulcers & other acid-related problems." },
        { step: "02", title: "Domperidone 10mg (IR)", desc: "IR Stands for immediate release, meaning the medication is released quickly into the body. It helps to relieve nausea and vomiting by improving the movement of the stomach and intestines." },
        { step: "03", title: "Domperidone 20mg (SR)", desc: "SR Stands for sustained release, meaning the medication is released slowly over time. This extended release can provide longer-lasting relief from nausea and vomiting." }
      ],
      highlights: [
        "The Perfect 'Gastric Motility' Control Combination",
        "Tablet in Capsule Technology",
        "Pantoprazole 40mg (EC) + Domperidone 10mg (IR) + Domperidone 20mg (SR) Capsules",
        "This combination is used to treat conditions related to stomach acid and motility issues",
        "EC designed to dissolve in small intestine; IR released quickly; SR released slowly over time"
      ],
      indications: [
        "GERD",
        "DYSPEPSIA",
        "VOMITING",
        "G.I. ULCER",
        "HEART BURN"
      ],
      dosage: "1 Capsule daily, preferably in the morning before breakfast, or as directed by the Physician.",
      keywords: ["pantheta dsr", "pantoprazole", "domperidone", "gerd", "dyspepsia", "vomiting", "gi ulcer", "heart burn", "tablet in capsule", "acid reflux"]
    },

    {
      id: "rabtheta-dsr",
      name: "RABTHETA DSR",
      shortTitle: "Rabeprazole Sodium 20mg (EC) + Domperidone 10mg (IR) + Domperidone 20mg (SR) Capsules",
      genericSummary: "Rabeprazole Sodium 20 mg (EC) + Domperidone 30 mg (10 mg IR + 20 mg SR)",
      category: "gastro",
      secondaryCategories: [],
      classification: "Proton Pump Inhibitor & Prokinetic",
      rxRequired: true,
      sugarFree: true,
      flavour: "Oral Capsule",
      dosageForm: "Tablet in Capsule",
      packSize: "10 × 10 Capsules",
      technology: "Tablet in Capsule Technology (EC + IR + SR)",
      techBadge: "TABLET IN CAPSULE",
      accent: "#2563eb",
      accentSoft: "#dbeafe",
      image: "assets/products/rabtheta-dsr.png",
      taglineEn: "Get assured relief from GERD, Chronic Gastritis & Dyspepsia — Tablet in Capsule Technology.",
      taglineHi: "जीईआरडी, क्रोनिक गैस्ट्राइटिस और डिस्पेप्सिया से निश्चित राहत — टैबलेट इन कैप्सूल टेक्नोलॉजी।",
      easyGuide: {
        whatIsItEn: "The combination is prescribed for more effective management of GERD and other conditions where acid reflux, nausea and vomiting are significant symptoms.",
        whatIsItHi: "यह संयोजन जीईआरडी और उन स्थितियों के अधिक प्रभावी प्रबंधन के लिए निर्धारित किया जाता है जहाँ एसिड रिफ्लक्स, जी मिचलाना और उल्टी प्रमुख लक्षण होते हैं।",
        whoIsItForEn: "GERD, Acid Reflux, Peptic Ulcers, Dyspepsia, Nausea & Vomiting, Zollinger-Ellison Syndrome.",
        whoIsItForHi: "जीईआरडी, एसिड रिफ्लक्स, पेप्टिक अल्सर, बदहजमी (डिस्पेप्सिया), मतली और उल्टी, तथा ज़ोलिंगर-एलिसन सिंड्रोम में।",
        keyPerksEn: [
          "Tablet in Capsule Technology",
          "Rabeprazole Sodium 20mg (EC): Designed to dissolve in small intestine; treats GERD, peptic ulcers & erosive esophagitis",
          "Domperidone 10mg (IR): Released quickly into the body to relieve nausea and vomiting",
          "Domperidone 20mg (SR): Released slowly over time to provide longer-lasting relief from nausea and vomiting",
          "Get assured relief from GERD, Chronic Gastritis & Dyspepsia"
        ],
        keyPerksHi: [
          "टैबलेट इन कैप्सूल अत्याधुनिक तकनीक",
          "रेबेप्राजोल सोडियम 20mg (EC): आंत में घुलकर अल्सर और इसोफैगिटिस को ठीक करता है",
          "डोमपेरिडोन 10mg (IR): तुरंत घुलकर मतली और उल्टी पर तुरंत नियंत्रण देता है",
          "डोमपेरिडोन 20mg (SR): दिनभर रिफ्लक्स और उल्टी से सुरक्षा प्रदान करता है",
          "जीईआरडी, क्रोनिक गैस्ट्राइटिस और डिस्पेप्सिया से निश्चित राहत"
        ]
      },
      composition: [
        { ingredient: "Rabeprazole Sodium 20mg (EC)", detail: "Enteric Coated — Treats GERD, peptic ulcers & erosive esophagitis", strength: "20 mg", rda: "EC Fraction" },
        { ingredient: "Domperidone 10mg (IR)", detail: "Immediate Release — Relieves nausea and vomiting quickly", strength: "10 mg", rda: "IR Fraction" },
        { ingredient: "Domperidone 20mg (SR)", detail: "Sustained Release — Provides longer-lasting relief from nausea and vomiting", strength: "20 mg", rda: "SR Fraction" }
      ],
      mechanism: [
        { step: "01", title: "Rabeprazole Sodium 20mg (EC)", desc: "EC Stands for enteric coating, meaning the medication is designed to dissolve in the small intestine rather than the stomach. It is used to treat conditions like GERD, peptic ulcers (gastric and duodenal) and erosive esophagitis caused by acid reflux." },
        { step: "02", title: "Domperidone 10mg (IR)", desc: "IR Stands for immediate release, meaning the medication is released quickly into the body. It helps to relieve nausea and vomiting by improving the movement of the stomach and intestines." },
        { step: "03", title: "Domperidone 20mg (SR)", desc: "SR Stands for sustained release, meaning the medication is released slowly over time. This extended release can provide longer-lasting relief from nausea and vomiting." }
      ],
      highlights: [
        "Rabeprazole Sodium 20mg (EC) + Domperidone 10mg (IR) + Domperidone 20mg (SR) Capsules",
        "Tablet in Capsule Technology",
        "Get assured relief from GERD, Chronic Gastritis & Dyspepsia",
        "The combination is prescribed for more effective management of GERD and other conditions where acid reflux, nausea and vomiting are significant symptoms",
        "EC designed to dissolve in small intestine; IR released quickly; SR released slowly over time"
      ],
      indications: [
        "GERD",
        "Acid Reflux",
        "Peptic Ulcers",
        "Dyspepsia",
        "Nausea & Vomiting",
        "Zollinger-Ellison Syndrome"
      ],
      dosage: "1 Capsule daily, preferably in the morning before breakfast, or as directed by the Physician.",
      keywords: ["rabtheta dsr", "rabeprazole", "domperidone", "gerd", "acid reflux", "peptic ulcers", "dyspepsia", "nausea", "vomiting", "zollinger-ellison", "tablet in capsule"]
    },

    {
      id: "preimmune-aqua",
      name: "PRE IMMUNE AQUA",
      shortTitle: "Bacillus Clausii Spores Suspension (Each 5ml oral suspension contains 2 billion spores)",
      genericSummary: "Bacillus Clausii Spores 2 Billion / 5 ml Oral Suspension",
      category: "probiotic",
      secondaryCategories: ["gastro"],
      classification: "Oral Probiotic Spore Suspension",
      rxRequired: false,
      sugarFree: true,
      flavour: "Tasteless Aqueous Suspension (Oral use only — DO NOT INJECT)",
      dosageForm: "Oral Suspension Mini Bottle",
      packSize: "10 × 5 ml Mini Bottles",
      technology: "Gastric-Acid Resistant Spore Technology",
      techBadge: "2 BILLION SPORES",
      accent: "#16a34a",
      accentSoft: "#dcfce7",
      image: "assets/products/preimmune-aqua.png",
      taglineEn: "The Best and Most Advanced PROBIOTIC — Preimmune Aqua is used to treat diarrhea caused due to infections, medicines, consumption of poisonous substances etc.",
      taglineHi: "द बेस्ट एंड मोस्ट एडवांस्ड प्रोबायोटिक — संक्रमण, दवाओं या दूषित पदार्थों से होने वाले दस्त के उपचार के लिए।",
      easyGuide: {
        whatIsItEn: "Preimmune Aqua is used to treat diarrhea caused due to infections, medicines, consumption of poisonous substances etc.",
        whatIsItHi: "प्रीइम्यून एक्वा संक्रमण, एंटीबायोटिक दवाओं या विषाक्त पदार्थों के सेवन से होने वाले दस्त (डायरिया) के इलाज के लिए उपयोग किया जाता है।",
        whoIsItForEn: "Antibiotic Induced Diarrhea, Acute Gastroenteritis, Rotaviral Diarrhoea, Acute Diarrhoea, and IBS / IBD.",
        whoIsItForHi: "एंटीबायोटिक से होने वाले दस्त, एक्यूट गैस्ट्रोएंटेराइटिस, रोटावायरल डायरिया, तीव्र दस्त और आईबीएस / आईबीडी (IBS / IBD) में।",
        keyPerksEn: [
          "Suppresses pro-inflammatory Cytokines",
          "Selectively stimulates the growth and activities of intestinal micro flora",
          "Stimulates protective Cytokines like interleutin-10",
          "Stimulates digestion of lactose in food",
          "Strengthens the intestinal barrier function by maintaining natural balance of intestinal micro flora",
          "Enhances digestion and intrinsic strength of immune system"
        ],
        keyPerksHi: [
          "प्रो-इंफ्लेमेटरी साइटोकाइन्स को दबाकर आंतों की सूजन कम करता है",
          "आंतों के लाभकारी मित्र बैक्टीरिया की वृद्धि और गतिविधियों को उत्तेजित करता है",
          "सुरक्षात्मक साइटोकाइन्स (जैसे इंटरल्यूकिन-10) को सक्रिय करता है",
          "भोजन में लैक्टोज के पाचन को आसान बनाता है",
          "आंतों के प्राकृतिक संतुलन को बनाए रखकर आंतों की सुरक्षात्मक परत को मजबूत करता है",
          "पाचन क्रिया और शरीर की प्रतिरक्षा प्रणाली (इम्युनिटी) की आंतरिक शक्ति को बढ़ाता है"
        ]
      },
      composition: [
        { ingredient: "Bacillus clausii Spores", detail: "Gastric acid & antibiotic resistant probiotic spores", strength: "2 Billion Spores", rda: "Per 5 ml Mini Bottle" },
        { ingredient: "Purified Aqueous Vehicle", detail: "Tasteless, sugar-free oral suspension medium (Oral use only — DO NOT INJECT)", strength: "q.s. to 5 ml", rda: "Oral Suspension" }
      ],
      mechanism: [
        { step: "01", title: "Survival Through Gastric Barrier", desc: "Spore format protects Bacillus clausii against stomach acid and antibiotics, reaching the intestine intact." },
        { step: "02", title: "Microflora Restoration", desc: "Selectively stimulates the growth and activities of intestinal micro flora and strengthens the intestinal barrier function." },
        { step: "03", title: "Cytokine & Immune Modulation", desc: "Suppresses pro-inflammatory Cytokines, stimulates protective Cytokines like interleutin-10, and enhances digestion." }
      ],
      highlights: [
        "The Best and Most Advanced PROBIOTIC",
        "Preimmune Aqua is used to treat diarrhea caused due to infections, medicines, consumption of poisonous substances etc.",
        "Globally Recommended In: Antibiotic Induced Diarrhea, Acute Gastroenteritis, Rotaviral Diarrhoea, Acute Diarrhoea, IBS / IBD",
        "Suppresses pro-inflammatory Cytokines",
        "Selectively stimulates the growth and activities of intestinal micro flora",
        "Stimulates protective Cytokines like interleutin-10",
        "Stimulates digestion of lactose in food",
        "Strengthens the intestinal barrier function by maintaining natural balance of intestinal micro flora",
        "Enhances digestion and intrinsic strength of immune system"
      ],
      indications: [
        "Antibiotic Induced Diarrhea",
        "Acute Gastroenteritis",
        "Rotaviral Diarrhoea",
        "Acute Diarrhoea",
        "IBS / IBD"
      ],
      dosage: "1 to 2 mini bottles daily or as directed by the Physician. Take orally. DO NOT INJECT. Shake well before drinking.",
      keywords: ["preimmune aqua", "bacillus clausii", "probiotic", "diarrhea", "loose motion", "antibiotic diarrhea", "rotavirus", "gastroenteritis", "ibs", "ibd", "spores", "2 billion"]
    }
  ]
};
