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
      shortTitle: "Vitamin D3 Oral Solution 60,000 I.U. (Nano Shot)",
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
      taglineEn: "High-absorption 60,000 IU Vitamin D3 Nano Shot for stronger bones, back-pain relief & immunity.",
      taglineHi: "मज़बूत हड्डियों, कमर दर्द से राहत और बेहतर इम्युनिटी के लिए शुगर-फ्री बटरस्कॉच विटामिन D3 नैनो शॉट।",
      easyGuide: {
        whatIsItEn: "A ready-to-drink 5 ml weekly/periodic Vitamin D3 booster shot using Nano Technology so your body absorbs Vitamin D easily even without heavy fatty meals.",
        whatIsItHi: "यह 5 ml की रेडी-टू-ड्रिंक विटामिन D3 बोतल है। नैनो टेक्नोलॉजी की वजह से शरीर इसे बहुत आसानी और तेज़ी से सोख लेता है।",
        whoIsItForEn: "Adults, elderly individuals, women, or growing patients with Vitamin D deficiency, weak bones, chronic low back pain, or low immunity.",
        whoIsItForHi: "जिन लोगों में विटामिन D की कमी, हड्डियों में कमज़ोरी, कमर दर्द, थकान या कम इम्युनिटी हो।",
        keyPerksEn: ["Delicious Butterscotch flavour", "100% Sugar-Free (safe for diabetics)", "No water required — ready-to-drink 5 ml bottle", "Nano-sized droplets for superior absorption"],
        keyPerksHi: ["स्वादिष्ट बटरस्कॉच फ्लेवर", "100% शुगर-फ्री (डायबिटीज़ मरीज़ों के लिए उपयुक्त)", "बिना पानी के सीधे पीने योग्य 5 ml शॉट", "नैनो टेक्नोलॉजी से तेज़ अवशोषण"]
      },
      composition: [
        { ingredient: "Vitamin D3 (Cholecalciferol)", detail: "Nano-emulsified Oral Solution", strength: "60,000 I.U.", rda: "Therapeutic Weekly/Periodic Dose" },
        { ingredient: "Base & Flavour", detail: "Sugar-Free Palatable Vehicle", strength: "5 ml Shot", rda: "Butterscotch Flavour" }
      ],
      mechanism: [
        { step: "01", title: "Nano-Micellar Dispersion", desc: "Nano-droplet Cholecalciferol disperses uniformly in aqueous gut fluids for rapid enterocyte uptake." },
        { step: "02", title: "Calcium & Phosphorus Balance", desc: "Activates intestinal calcium transport proteins to maintain normal blood Calcium and Phosphorus levels." },
        { step: "03", title: "Skeletal & Systemic Protection", desc: "Promotes bone mineralization, supports neuromuscular strength, modulates immunity, and reduces vascular/metabolic risk." }
      ],
      highlights: [
        "Reduces the risk of developing hypertension & lowers blood pressure supportively",
        "Maintains normal blood levels of Calcium and Phosphorus",
        "Clinical highlight: Weekly supplementation for 3 months supports up to 95% reduction in low back pain",
        "6 months of supplementation helps protect against progressive bone loss",
        "Improves immune resilience, corrects metabolic problems & helps prevent Pre-eclampsia"
      ],
      indications: [
        "Osteoporosis & Age-Related Bone Loss",
        "Rickets & Osteomalacia",
        "Hypoparathyroidism",
        "Improving Intestinal Calcium Absorption",
        "Growth Retardation",
        "Correcting Vitamin D Metabolic Deficiency",
        "Adjunctive Prevention of Pre-eclampsia in Pregnancy"
      ],
      dosage: "Typically 1 bottle (5 ml) once weekly or as directed by the Physician. Shake well before drinking.",
      keywords: ["vitamin d", "d3", "cholecalciferol", "60000", "60k", "nano shot", "bone", "back pain", "osteoporosis", "rickets", "immunity", "butterscotch", "sugar free"]
    },

    {
      id: "adenocal-k2",
      name: "ADENOCAL-K2",
      shortTitle: "Aquamin™ Marine Calcium, Magnesium, 72 Trace Minerals, Vit K2-7 & D3 Tablets",
      genericSummary: "Aquamin™ 1000 mg (Elemental Ca 330 mg + Mg 25 mg + 72 Minerals) + Vit K2-7 45 mcg + Vit D3 400 IU",
      category: "bone",
      secondaryCategories: ["womens"],
      classification: "Health Supplement",
      rxRequired: false,
      sugarFree: true,
      flavour: "Unflavoured Small Easy-to-Digest Tablet",
      dosageForm: "Film-Coated Tablet",
      packSize: "1 × 10 Tablets (AMBIO-09)",
      technology: "Aquamin™ Bio-Marine Honeycomb Matrix",
      techBadge: "MARINE AQUAMIN MATRIX",
      accent: "#0284c7",
      accentSoft: "#e0f2fe",
      image: "assets/products/adenocal-k2.png",
      taglineEn: "Plant-based marine algae Calcium with ~86.5% bioavailability + Vitamin D3 & K2-7 so calcium reaches bones, not arteries.",
      taglineHi: "समुद्री शैवाल से बना प्राकृतिक कैल्शियम (Aquamin™), विटामिन D3 और K2-7 के साथ — पेट पर हल्का और हड्डियों के लिए संपूर्ण पोषण।",
      easyGuide: {
        whatIsItEn: "Unlike chalky rock-based calcium (calcium carbonate) that often causes gas, bloating, or constipation, ADENOCAL-K2 uses natural red marine algae calcium (Aquamin™) in small, easy-to-digest tablets.",
        whatIsItHi: "साधारण पत्थर वाले कैल्शियम से अक्सर गैस या कब्ज़ होती है। ADENOCAL-K2 प्राकृतिक समुद्री शैवाल (Aquamin™) से बना छोटा टैबलेट है जो आसानी से पचता है।",
        whoIsItForEn: "Pregnant & lactating mothers, post-menopausal women, elderly people, osteopenia/osteoporosis patients, and anyone intolerant to regular calcium tablets.",
        whoIsItForHi: "गर्भवती महिलाएँ, रजोनिवृत्ति (मेनोपॉज़) के बाद की महिलाएँ, बुज़ुर्ग, कमज़ोर हड्डियों वाले मरीज़ और जिन्हें साधारण कैल्शियम पचता न हो।",
        keyPerksEn: ["~86.5% high bioavailability", "Gentle on stomach — minimal bloating or constipation", "72 natural trace minerals + Magnesium", "Vitamin K2-7 directs calcium into bones & protects arteries"],
        keyPerksHi: ["~86.5% उच्च अवशोषण क्षमता", "पेट में गैस या कब्ज़ नहीं करता", "मैग्नीशियम और 72 प्राकृतिक सूक्ष्म खनिज शामिल", "विटामिन K2-7 कैल्शियम को धमनियों की जगह सीधे हड्डियों में पहुँचाता है"]
      },
      composition: [
        { ingredient: "Aquamin™ (Red Marine Algae — Lithothamnion spp.)", detail: "Natural porous honeycomb multi-mineral complex (0.12 Kcal/tab)", strength: "1000 mg", rda: "Bio-Marine Matrix" },
        { ingredient: "↳ Elemental Calcium (from Aquamin™)", detail: "Polymorphic: Calcite 214.9 mg + Aragonite 76.0 mg + Vaterite 39.7 mg", strength: "330 mg", rda: "33.00% RDA", rdaPct: 33 },
        { ingredient: "↳ Elemental Magnesium (from Aquamin™)", detail: "Natural marine magnesium co-factor", strength: "25 mg", rda: "5.68% RDA", rdaPct: 6 },
        { ingredient: "↳ 72 Natural Trace Minerals", detail: "K, P, Cu, Boron, Mn, Na, Cl, Se, Sulphur & marine trace elements", strength: "35.7 mg", rda: "Natural Co-factors" },
        { ingredient: "Vitamin K2-7 (Menaquinone-7)", detail: "Activates osteocalcin & matrix Gla-protein", strength: "45 mcg", rda: "81.81% RDA", rdaPct: 82 },
        { ingredient: "Vitamin D3 (Cholecalciferol)", detail: "Enhances intestinal calcium uptake", strength: "400 I.U.", rda: "66.66% RDA", rdaPct: 67 }
      ],
      mechanism: [
        { step: "1. ABSORB", title: "Aquamin™ Honeycomb Dissolution", desc: "High surface-area porous marine matrix dissolves smoothly in the stomach with ~86.5% bioavailability and superior GI tolerance." },
        { step: "2. UTILISE", title: "Vitamin D3 Active Transport", desc: "400 IU Vitamin D3 upregulates intestinal calcium binding so absorbed minerals enter systemic circulation efficiently." },
        { step: "3. DEPOSIT", title: "Vitamin K2-7 Bone Targeting", desc: "45 mcg K2-7 carboxylates Osteocalcin to lock calcium into bone matrix while inhibiting vascular arterial calcification." }
      ],
      highlights: [
        "Trademarked Aquamin™ (Marigot Ltd., Ireland) derived from sustainable red marine algae",
        "Small, easy-to-swallow & easy-to-digest tablet format for daily long-term adherence",
        "Supplies 3 synergistic calcium polymorphs (Calcite, Aragonite, Vaterite) + 72 trace minerals",
        "Prevents calcium paradox by pairing Vitamin D3 with arterial-protective Vitamin K2-7"
      ],
      indications: [
        "Pregnancy & Lactation Calcium Demand",
        "Post-Menopausal Bone Density Support",
        "Osteopenia & Osteoporosis Management",
        "Elderly Skeletal & Joint Integrity",
        "Steroid-Induced Bone Loss",
        "Patients Intolerant to Conventional Rock Calcium"
      ],
      dosage: "1 Tablet once or twice daily after meals, or as advised by the Healthcare Professional.",
      keywords: ["calcium", "aquamin", "k2", "k2-7", "magnesium", "minerals", "bone", "pregnancy", "menopause", "osteopenia", "osteoporosis", "joint", "adenocal"]
    },

    {
      id: "argiluck",
      name: "ARGILUCK",
      shortTitle: "L-Arginine IP 3 g & Proanthocyanidin 75 mg Oral Granules Sachet",
      genericSummary: "L-Arginine IP 3 g + Proanthocyanidin 75 mg Sugar-Free Granules",
      category: "womens",
      secondaryCategories: [],
      classification: "Prescription / Maternal Vascular Support",
      rxRequired: false,
      sugarFree: true,
      flavour: "Cranberry Flavour",
      dosageForm: "Oral Granules Sachet",
      packSize: "10 Sachets × 5.5 g",
      technology: "Nitric Oxide + Endothelial Antioxidant Synergy",
      techBadge: "NITRIC OXIDE SYNERGY",
      accent: "#e11d48",
      accentSoft: "#ffe4e6",
      image: "assets/products/argiluck.png",
      taglineEn: "Dual-action Nitric Oxide precursor + antioxidant sachet supporting healthy uteroplacental blood flow in pregnancy.",
      taglineHi: "गर्भावस्था में बेहतर रक्त संचार (ब्लड फ्लो) और शिशु के पोषण के लिए शुगर-फ्री क्रैनबेरी फ्लेवर सैशे।",
      easyGuide: {
        whatIsItEn: "A refreshing cranberry-flavoured, sugar-free drink mix sachet containing L-Arginine (3 g) and Proanthocyanidin (75 mg) that relaxes blood vessels and supports healthy blood & nutrient flow.",
        whatIsItHi: "यह क्रैनबेरी स्वाद वाला शुगर-फ्री पाउडर सैशे है जिसे पानी में घोलकर पिया जाता है। यह रक्त नलिकाओं को आराम देकर गर्भनाल (प्लेसेंटा) तक रक्त प्रवाह बेहतर बनाता है।",
        whoIsItForEn: "Commonly prescribed by obstetricians/gynecologists for expectant mothers needing uteroplacental blood flow support, fetal growth (IUGR) care, or vascular endothelial support.",
        whoIsItForHi: "गर्भवती महिलाओं में रक्त प्रवाह सुधारने, हाई-रिस्क प्रेग्नेंसी और शिशु के समुचित विकास (IUGR सपोर्ट) के लिए डॉक्टर द्वारा दिया जाता है।",
        keyPerksEn: ["Refreshing Cranberry flavour reduces pregnancy taste aversion", "Sugar-Free granules (safe in gestational sugar monitoring)", "Full 3 g clinical strength of IP-grade L-Arginine", "75 mg Proanthocyanidin protects blood vessels from oxidative stress"],
        keyPerksHi: ["स्वादिष्ट क्रैनबेरी फ्लेवर (जी मिचलाने में भी लेना आसान)", "शुगर-फ्री फ़ॉर्मूला", "3 ग्राम शुद्ध L-Arginine IP", "एंटीऑक्सीडेंट सुरक्षा के साथ बेहतर रक्त संचार"]
      },
      composition: [
        { ingredient: "L-Arginine IP", detail: "Physiological precursor of Nitric Oxide (NO)", strength: "3 g (3000 mg)", rda: "Per 5.5 g Sachet" },
        { ingredient: "Proanthocyanidin", detail: "Potent polyphenolic vascular antioxidant", strength: "75 mg", rda: "Per 5.5 g Sachet" },
        { ingredient: "Excipients & Colour", detail: "Sugar-Free Cranberry Granules (Colour: Ponceau 4R)", strength: "q.s.", rda: "Oral Reconstitution" }
      ],
      mechanism: [
        { step: "01", title: "Nitric Oxide Biosynthesis", desc: "L-Arginine serves as the direct substrate for endothelial Nitric Oxide Synthase (eNOS), generating Nitric Oxide (NO)." },
        { step: "02", title: "Smooth Vasodilation", desc: "Nitric Oxide relaxes vascular smooth muscle, lowering uterine artery resistance and improving uteroplacental perfusion." },
        { step: "03", title: "Endothelial Protection", desc: "Proanthocyanidin scavenges reactive oxygen species (ROS), preventing premature NO breakdown and protecting maternal endothelium." }
      ],
      highlights: [
        "Synergistic combination of 3 g L-Arginine IP + 75 mg Proanthocyanidin per 5.5 g sachet",
        "Palatable Sugar-Free Cranberry flavour improves daily compliance in expectant mothers",
        "Supports healthy amniotic fluid index & fetal nutrient-oxygen delivery under medical care",
        "Protects vascular endothelium against oxidative stress"
      ],
      indications: [
        "Impaired Uteroplacental Circulation",
        "High-Risk Pregnancy with Endothelial Dysfunction",
        "Recurrent Pregnancy Loss (Vascular Factors)",
        "Intrauterine Growth Restriction (IUGR) Adjunctive Support"
      ],
      dosage: "Dissolve contents of 1 sachet (5.5 g) in half a glass of water (~100–150 ml) and consume as directed by the Physician.",
      keywords: ["arginine", "l-arginine", "proanthocyanidin", "sachet", "pregnancy", "iugr", "placenta", "blood flow", "cranberry", "sugar free", "argiluck"]
    },

    {
      id: "bioipc",
      name: "BIOIPC",
      shortTitle: "Liposomal Iron, Quatrefolic®, Active Vit B6 (P5P), Vit B12 & Glycine Tablets",
      genericSummary: "Elemental Iron 27 mg (Liposomal) + Quatrefolic® 655 mcg + P5P 2.3 mg + Vit B12 2.45 mcg + Glycine 10 mg",
      category: "hematinic",
      secondaryCategories: ["womens"],
      classification: "Health Supplement (Advanced Hematinic)",
      rxRequired: false,
      sugarFree: true,
      flavour: "No Metallic Taste or Odor (Small Tablet)",
      dosageForm: "Small Easy-to-Digest Tablet",
      packSize: "10 Tablets (AMBIO-15)",
      technology: "Liposomal Iron + Quatrefolic® 4th-Gen Folate",
      techBadge: "LIPOSOMAL IRON + FOLATE",
      accent: "#b91c1c",
      accentSoft: "#fee2e2",
      image: "assets/products/bioipc.png",
      taglineEn: "Next-gen Liposomal Iron + Quatrefolic® delivering 100% maternal RDA without nausea, constipation, or metallic aftertaste.",
      taglineHi: "बिना कब्ज़, बिना मतली और बिना धातु जैसे स्वाद के हीमोग्लोबिन बढ़ाने वाला आधुनिक लिपोसोमल आयरन और Quatrefolic® टैबलेट।",
      easyGuide: {
        whatIsItEn: "Regular iron tablets irritate the stomach lining and cause nausea, dark stools, or constipation. BIOIPC wraps iron inside tiny protective liposomes and pairs it with active folate (Quatrefolic®), active B6, B12, and Glycine.",
        whatIsItHi: "साधारण आयरन की गोलियों से अक्सर पेट दर्द, मतली या कब्ज़ होती है। BIOIPC में आयरन एक सुरक्षित लिपोसोमल परत के अंदर होता है जो पेट को परेशान किए बिना तेज़ी से खून (हीमोग्लोबिन) बढ़ाता है।",
        whoIsItForEn: "Pregnant & breastfeeding women, women with heavy periods, teens/adults with iron-deficiency anemia, fatigue, or intolerance to standard ferrous sulfate/fumarate.",
        whoIsItForHi: "गर्भवती एवं स्तनपान कराने वाली महिलाएँ, एनीमिया (खून की कमी), कमज़ोरी/थकान वाले मरीज़, और जिन्हें साधारण आयरन सूट नहीं करता।",
        keyPerksEn: ["Zero metallic taste or unpleasant smell", "Minimal nausea, gastritis, or constipation", "No interaction with food or calcium — flexible dosing", "100% Maternal RDA of Iron, Active Folate, B6 & B12"],
        keyPerksHi: ["धातु जैसा कड़वा स्वाद या गंध बिल्कुल नहीं", "मतली, एसिडिटी या कब्ज़ की शिकायत नहीं", "भोजन के साथ भी असर कम नहीं होता", "आयरन, सक्रिय फोलेट, B6 और B12 का 100% RDA"]
      },
      composition: [
        { ingredient: "Elemental Iron (Liposomal)", detail: "As Ferric Pyrophosphate / Diphosphate Liposomal Complex 337.5 mg", strength: "27 mg", rda: "100% RDA (Pregnancy)", rdaPct: 100 },
        { ingredient: "Quatrefolic® (Active 5-MTHF)", detail: "(6S)-5-Methyltetrahydrofolic acid, glucosamine salt (eq. to 570 mcg Folate)", strength: "655 mcg", rda: "100% RDA", rdaPct: 100 },
        { ingredient: "Vitamin B6 (Pyridoxal-5-Phosphate / P5P)", detail: "Bioactive co-enzyme B6 form", strength: "2.3 mg", rda: "100% RDA", rdaPct: 100 },
        { ingredient: "Vitamin B12 (Cyanocobalamin)", detail: "Supports RBC maturation & neurological health", strength: "2.45 mcg", rda: "100% RDA", rdaPct: 100 },
        { ingredient: "Glycine", detail: "Essential amino acid substrate for heme porphyrin synthesis (0.263 Kcal, Sugar 0.00 g)", strength: "10 mg", rda: "Heme Co-factor" }
      ],
      mechanism: [
        { step: "01", title: "Gastric Acid Bypass", desc: "Phospholipid bilayer liposome shields Ferric Pyrophosphate from stomach acid, preventing free-iron mucosal irritation." },
        { step: "02", title: "Intact M-Cell / Enterocyte Absorption", desc: "Liposomes are absorbed intact across the small intestine without food/phytate/calcium chelation blockade." },
        { step: "03", title: "Complete Heme & RBC Synthesis", desc: "Quatrefolic® (bypassing MTHFR polymorphism) + P5P + B12 + Glycine drive rapid hemoglobin and serum ferritin restoration." }
      ],
      highlights: [
        "Clinically robust Hemoglobin & Serum Ferritin rise comparable to parenteral therapy in mild-moderate deficiency",
        "Contains genuine Quatrefolic® — immediately bioavailable active folate without DHFR/MTHFR conversion bottlenecks",
        "Includes Glycine (10 mg) + Active P5P (2.3 mg), the exact biochemical substrates for δ-ALA synthase heme formation",
        "0.00 g Sugar, ultra-low 0.263 Kcal per small easy-to-digest tablet"
      ],
      indications: [
        "Iron Deficiency Anemia (IDA)",
        "Pregnancy & Lactation Nutritional Anemia Prophylaxis",
        "Pre-conception Neural & Folate Optimization",
        "Menorrhagia & Nutritional Fatigue",
        "Post-Surgical / Convalescent Hemoglobin Recovery",
        "Patients Intolerant to Conventional Oral Iron Salts"
      ],
      dosage: "1 Tablet daily with water (with or without meals), or as directed by the Healthcare Professional.",
      keywords: ["iron", "hemoglobin", "hb", "anemia", "folic acid", "folate", "quatrefolic", "liposomal", "b12", "b6", "pregnancy", "fatigue", "bioipc"]
    },

    {
      id: "dydrofy",
      name: "DYDROFY",
      shortTitle: "Dydrogesterone IP (Micronized) 10 mg Film-Coated Oral Tablets",
      genericSummary: "Micronized Dydrogesterone IP 10 mg Oral Tablet",
      category: "womens",
      secondaryCategories: [],
      classification: "Prescription Medicine (Rx)",
      rxRequired: true,
      sugarFree: true,
      flavour: "Film-Coated Unflavoured Tablet",
      dosageForm: "Film-Coated Tablet",
      packSize: "1 × 10 Tablets",
      technology: "Micronized Selective Retroprogesterone",
      techBadge: "MICRONIZED PROGESTOGEN",
      accent: "#be185d",
      accentSoft: "#fce7f3",
      image: "assets/products/dydrofy.png",
      taglineEn: "Precision IP-grade Micronized Dydrogesterone 10 mg for luteal support, menstrual regulation & pregnancy maintenance.",
      taglineHi: "मासिक धर्म चक्र के संतुलन और शुरुआती गर्भावस्था की सुरक्षा के लिए डॉक्टर की सलाह से दी जाने वाली माइक्रोनाइज़्ड डाइड्रोजेस्टेरोन 10 mg टैबलेट।",
      easyGuide: {
        whatIsItEn: "DYDROFY contains 10 mg of Micronized Dydrogesterone, an oral hormone structurally close to natural progesterone that prepares and supports a healthy uterine lining.",
        whatIsItHi: "DYDROFY में 10 mg माइक्रोनाइज़्ड डाइड्रोजेस्टेरोन होता है, जो शरीर के प्राकृतिक प्रोजेस्टेरोन हार्मोन की तरह गर्भाशय की परत को मज़बूती देता है।",
        whoIsItForEn: "Strictly prescribed by Gynecologists for threatened/recurrent miscarriage support, IVF/luteal support, irregular cycles, endometriosis, or progesterone deficiency.",
        whoIsItForHi: "स्त्री-रोग विशेषज्ञ (गायनेकोलॉजिस्ट) द्वारा गर्भपात के खतरे को कम करने, अनियमित पीरियड्स, या प्रोजेस्टेरोन की कमी के इलाज में दी जाती है।",
        keyPerksEn: ["Micronized particle size for reliable oral absorption", "Selective progesterone receptor action without androgenic effects", "Generally does not inhibit normal ovulation at therapeutic doses", "Standard 10 mg IP-grade precision film-coated tablet"],
        keyPerksHi: ["बेहतर अवशोषण के लिए माइक्रोनाइज़्ड तकनीक", "केवल प्रोजेस्टेरोन रिसेप्टर्स पर सटीक कार्य", "सामान्य ओव्यूलेशन प्रक्रिया में बाधा नहीं डालती", "केवल पंजीकृत डॉक्टर के पर्चे (Rx) पर लें"]
      },
      composition: [
        { ingredient: "Dydrogesterone IP (Micronized)", detail: "Orally active selective retroprogesterone", strength: "10 mg", rda: "Rx Therapeutic Strength" },
        { ingredient: "Excipients & Film Coating", detail: "Colour: Titanium Dioxide IP", strength: "q.s.", rda: "Per Film-Coated Tablet" }
      ],
      mechanism: [
        { step: "01", title: "Micronized Oral Bioavailability", desc: "Reduced particle size maximizes dissolution rate and predictable oral systemic absorption." },
        { step: "02", title: "Selective Progesterone Receptor Binding", desc: "Binds specifically to uterine progesterone receptors without estrogenic, androgenic, or glucocorticoid cross-activity." },
        { step: "03", title: "Secretory Endometrial Stabilization", desc: "Transitions proliferative endometrium into a receptive secretory state, supporting implantation and regular menstrual shedding." }
      ],
      highlights: [
        "IP-Grade Micronized Dydrogesterone 10 mg formulation",
        "Orally convenient alternative to painful intramuscular or messy vaginal progesterone regimens",
        "Generally does not suppress ovulation or alter basal body temperature at standard therapeutic doses",
        "Manufactured for strict physician-directed gynecological & obstetric protocols"
      ],
      indications: [
        "Threatened Miscarriage & Recurrent Pregnancy Loss (Luteal Deficiency)",
        "Luteal Phase Support in Infertility / ART Cycles",
        "Dysfunctional Uterine Bleeding & Irregular Menstrual Cycles",
        "Secondary Amenorrhoea & Dysmenorrhoea",
        "Endometriosis & Premenstrual Syndrome (Physician-Directed)"
      ],
      dosage: "Strictly as directed by the Gynecologist / Registered Medical Practitioner (schedule varies by clinical indication).",
      keywords: ["dydrogesterone", "progesterone", "dydrofy", "10mg", "pregnancy", "miscarriage", "luteal", "periods", "menstrual", "endometriosis", "gynae", "rx"]
    },

    {
      id: "novacaine",
      name: "NOVACAINE",
      shortTitle: "Oxetacaine IP, Aluminium Hydroxide & Magnesium Hydroxide Anesthetic-Antacid Oral Gel",
      genericSummary: "Per 5 ml: Oxetacaine IP 10 mg + Aluminium Hydroxide IP 291 mg + Magnesium Hydroxide IP 98 mg",
      category: "gastro",
      secondaryCategories: [],
      classification: "Anesthetic-Antacid Oral Gel",
      rxRequired: false,
      sugarFree: true,
      flavour: "Cooling Mint Flavour",
      dosageForm: "Oral Gel (Suspension)",
      packSize: "200 ml Amber/Protected Bottle",
      technology: "Triple-Action Mucosal Soothing & Acid Neutralization",
      techBadge: "TRIPLE-ACTION GEL",
      accent: "#0d9488",
      accentSoft: "#ccfbf1",
      image: "assets/products/novacaine.png",
      taglineEn: "Fast-acting Mint Sugar-Free Anesthetic-Antacid Gel that numbs burning stomach pain & neutralizes excess acid.",
      taglineHi: "तेज़ एसिडिटी, पेट व सीने की जलन और अल्सर के दर्द में तुरंत ठंडक और आराम देने वाला शुगर-फ्री मिंट जेल।",
      easyGuide: {
        whatIsItEn: "When acidity causes sharp burning pain in the chest or upper stomach, plain antacids may not stop the pain fast enough. NOVACAINE combines two balanced antacids with Oxetacaine to soothe burning pain rapidly.",
        whatIsItHi: "जब एसिडिटी के कारण सीने या पेट में तेज़ जलन और दर्द हो, तब NOVACAINE जेल न सिर्फ़ एसिड को शांत करता है बल्कि दर्द और जलन को भी तुरंत सुन्न कर आराम देता है।",
        whoIsItForEn: "Adults suffering from painful hyperacidity, severe heartburn, gastritis, acid reflux, peptic ulcer discomfort, or painkiller-induced stomach irritation — including diabetic patients.",
        whoIsItForHi: "तेज़ एसिडिटी, खट्टी डकार, सीने की जलन, गैस्ट्राइटिस, पेट के छाले (अल्सर) या पेनकिलर दवाओं से होने वाली पेट की जलन — शुगर मरीज़ों के लिए भी सुरक्षित।",
        keyPerksEn: ["Rapid numbing relief from acute burning pain", "Balanced Aluminium + Magnesium prevents constipation/diarrhoea", "Refreshing cooling Mint flavour", "Sugar-Free sorbitol base — suitable for diabetics"],
        keyPerksHi: ["जलन और पेट दर्द में तेज़ आराम", "कब्ज़ या दस्त न होने देने वाला संतुलित फ़ॉर्मूला", "ठंडा ताज़ा मिंट (पुदीना) फ्लेवर", "शुगर-फ्री (डायबिटिक मरीज़ों के लिए सुरक्षित)"]
      },
      composition: [
        { ingredient: "Oxetacaine IP", detail: "Topical mucosal local anesthetic active even at pH 1–2", strength: "10 mg", rda: "Per 5 ml" },
        { ingredient: "Aluminium Hydroxide IP", detail: "Added as Aluminium Hydroxide Paste eq. to dried gel (sustained neutralization)", strength: "291 mg", rda: "Per 5 ml" },
        { ingredient: "Magnesium Hydroxide IP", detail: "Added as Magnesium Hydroxide Paste (fast-acting acid neutralization)", strength: "98 mg", rda: "Per 5 ml" },
        { ingredient: "Sugar-Free Mint Gel Base", detail: "Contains Sorbitol — suitable for diabetic patients", strength: "q.s. to 5 ml", rda: "200 ml Bottle" }
      ],
      mechanism: [
        { step: "01", title: "Immediate Acid Neutralization", desc: "Magnesium Hydroxide rapidly raises gastric pH on contact while balancing bowel motility." },
        { step: "02", title: "Sustained Mucosal Coating", desc: "Aluminium Hydroxide provides prolonged acid buffering and forms a soothing protective coat over inflamed mucosa." },
        { step: "03", title: "Acid-Stable Topical Analgesia", desc: "Oxetacaine remains unionized even in strongly acidic gastric fluid, calming irritated esophageal and gastric nerve endings." }
      ],
      highlights: [
        "Triple-mechanism relief: Fast Antacid + Sustained Antacid + Mucosal Local Anesthetic",
        "Balanced Mg(OH)2 + Al(OH)3 ratio minimizes aluminium-induced constipation",
        "Sugar-Free (Sorbitol-sweetened) cooling Mint suspension ideal for diabetic & calorie-conscious adults",
        "Best taken undiluted so the soothing gel coats the esophagus and stomach lining"
      ],
      indications: [
        "Acid Peptic Disease & Acute/Chronic Gastritis",
        "GERD / Reflux Esophagitis",
        "Peptic Ulcer Disease (Gastric & Duodenal)",
        "Painful Hyperacidity & Severe Heartburn",
        "Drug-Induced Gastric Irritation (NSAIDs, Steroids, Antibiotics)"
      ],
      dosage: "5–10 ml (1–2 teaspoons) 3–4 times daily, preferably 15 minutes before meals and at bedtime, taken undiluted (avoid drinking water immediately after), or as directed by the Physician.",
      keywords: ["antacid", "gel", "syrup", "acidity", "heartburn", "burning", "ulcer", "gastritis", "gerd", "oxetacaine", "mint", "sugar free", "novacaine"]
    },

    {
      id: "pantheta-dsr",
      name: "PANTHETA DSR",
      shortTitle: "Pantoprazole 40 mg (EC) + Domperidone 10 mg (IR) + Domperidone 20 mg (SR) Capsules",
      genericSummary: "Pantoprazole 40 mg EC + Domperidone 30 mg (10 mg IR + 20 mg SR) Tablet-in-Capsule",
      category: "gastro",
      secondaryCategories: [],
      classification: "Prescription Medicine (Rx)",
      rxRequired: true,
      sugarFree: true,
      flavour: "Hard Gelatin Capsule (Tablet-in-Capsule)",
      dosageForm: "Capsule (EC + IR + SR)",
      packSize: "10 × 10 Capsules",
      technology: "Tablet-in-Capsule (EC + Dual IR/SR Release)",
      techBadge: "EC + IR/SR CAPSULE",
      accent: "#0369a1",
      accentSoft: "#e0f2fe",
      image: "assets/products/pantheta-dsr.png",
      taglineEn: "Precision Tablet-in-Capsule technology splitting Domperidone into 10 mg IR + 20 mg SR alongside 40 mg EC Pantoprazole.",
      taglineHi: "एसिडिटी, खट्टी डकार, उल्टी और पेट फूलने से तुरंत व पूरे दिन राहत के लिए आधुनिक टैबलेट-इन-कैप्सूल (Pantoprazole DSR)।",
      easyGuide: {
        whatIsItEn: "Unlike ordinary DSR capsules that release Domperidone only slowly, PANTHETA DSR uses advanced Tablet-in-Capsule technology: 10 mg Immediate Release for quick nausea/bloating relief + 20 mg Sustained Release + 40 mg Enteric-Coated Pantoprazole for all-day acid control.",
        whatIsItHi: "साधारण DSR कैप्सूल की तुलना में PANTHETA DSR में आधुनिक 'टैबलेट-इन-कैप्सूल' तकनीक है — 10 mg तुरंत असर करता है और 20 mg धीरे-धीरे पूरे दिन उल्टी, गैस और एसिडिटी से बचाता है।",
        whoIsItForEn: "Prescribed for patients with GERD (acid reflux), sour belching, morning nausea/vomiting, bloated heaviness after meals, and gastric ulcers.",
        whoIsItForHi: "जिन मरीज़ों को बार-बार एसिड रिफ्लक्स (GERD), खट्टी डकारें, जी मिचलाना/उल्टी, पेट में भारीपन या अल्सर की समस्या हो।",
        keyPerksEn: ["3-component precision Tablet-in-Capsule engineering", "Fast onset against nausea via 10 mg IR Domperidone", "All-day reflux shield via 20 mg SR Domperidone + 40 mg EC Pantoprazole", "Convenient once-daily morning empty-stomach dosing"],
        keyPerksHi: ["उन्नत टैबलेट-इन-कैप्सूल तकनीक", "जी मिचलाने और भारीपन में तेज़ आराम (10 mg IR)", "पूरे दिन एसिड नियंत्रण (40 mg EC + 20 mg SR)", "सुबह खाली पेट दिन में सिर्फ़ 1 कैप्सूल (डॉक्टर के अनुसार)"]
      },
      composition: [
        { ingredient: "Pantoprazole Sodium (Enteric Coated — EC)", detail: "Selective Proton Pump Inhibitor; low CYP450 drug-interaction profile", strength: "40 mg", rda: "EC Core" },
        { ingredient: "Domperidone (Immediate Release — IR)", detail: "Rapid prokinetic & antiemetic onset", strength: "10 mg", rda: "IR Fraction" },
        { ingredient: "Domperidone (Sustained Release — SR)", detail: "Prolonged LES tone & gastric emptying control", strength: "20 mg", rda: "SR Fraction" }
      ],
      mechanism: [
        { step: "PHASE 1 (IR)", title: "Immediate Prokinetic Relief (10 mg IR)", desc: "Releases promptly to tighten the lower esophageal sphincter (LES), relieve nausea, and initiate gastric emptying." },
        { step: "PHASE 2 (EC)", title: "Acid-Protected PPI Activation (40 mg EC)", desc: "Enteric-coated Pantoprazole bypasses gastric degradation and irreversibly inhibits H+/K+-ATPase proton pumps." },
        { step: "PHASE 3 (SR)", title: "Sustained Anti-Reflux Protection (20 mg SR)", desc: "Maintains steady prokinetic plasma levels across post-meal windows to prevent daytime & nocturnal regurgitation." }
      ],
      highlights: [
        "Advanced Tablet-in-Capsule architecture prevents cross-interaction between PPI & prokinetic units",
        "Splits 30 mg Domperidone intelligently into 10 mg IR (fast relief) + 20 mg SR (sustained coverage)",
        "Pantoprazole 40 mg offers predictable bioavailability and minimal hepatic drug-drug interactions",
        "High-barrier 10 × 10 Alu-strip/blister packaging preserves moisture sensitivity"
      ],
      indications: [
        "Gastroesophageal Reflux Disease (GERD)",
        "Functional & Non-Ulcer Dyspepsia",
        "Nausea & Vomiting Associated with Acid Peptic Disorders",
        "Gastric & Duodenal G.I. Ulcers",
        "Chronic Heartburn & Post-Prandial Bloating"
      ],
      dosage: "1 Capsule once daily, 30–60 minutes before breakfast (swallow whole with water; do not crush or chew), strictly as prescribed by the Physician.",
      keywords: ["pantoprazole", "domperidone", "dsr", "pantheta", "gerd", "acidity", "gas", "reflux", "vomiting", "nausea", "ulcer", "heartburn", "capsule", "rx"]
    },

    {
      id: "rabtheta-dsr",
      name: "RABTHETA DSR",
      shortTitle: "Rabeprazole Sodium 20 mg (EC) + Domperidone 10 mg (IR) + Domperidone 20 mg (SR) Capsules",
      genericSummary: "Rabeprazole Sodium 20 mg EC + Domperidone 30 mg (10 mg IR + 20 mg SR) Tablet-in-Capsule",
      category: "gastro",
      secondaryCategories: [],
      classification: "Prescription Medicine (Rx)",
      rxRequired: true,
      sugarFree: true,
      flavour: "Hard Gelatin Capsule (Tablet-in-Capsule)",
      dosageForm: "Capsule (EC + IR + SR)",
      packSize: "10 × 10 Capsules",
      technology: "High-pKa Fast PPI + Dual IR/SR Tablet-in-Capsule",
      techBadge: "FAST PPI + IR/SR CAPSULE",
      accent: "#4f46e5",
      accentSoft: "#e0e7ff",
      image: "assets/products/rabtheta-dsr.png",
      taglineEn: "Fast-activating Rabeprazole 20 mg (EC) + dual-phase Domperidone (10 mg IR + 20 mg SR) for erosive reflux & severe hyperacidity.",
      taglineHi: "तीव्र एसिड रिफ्लक्स, इसोफेजाइटिस, अल्सर और उल्टी पर दिन-पहले (Day-1) से तेज़ नियंत्रण के लिए Rabeprazole DSR टैबलेट-इन-कैप्सूल।",
      easyGuide: {
        whatIsItEn: "RABTHETA DSR pairs fast-activating Rabeprazole (20 mg EC) with split-release Domperidone (10 mg Immediate Release + 20 mg Sustained Release) inside a precision Tablet-in-Capsule for potent Day-1 acid & reflux control.",
        whatIsItHi: "RABTHETA DSR में तेज़ी से काम करने वाला रेबेप्राज़ोल (20 mg EC) और दोहरे रिलीज़ वाला डोम्पेरिडोन (10 mg IR + 20 mg SR) है, जो पहले ही दिन से तेज़ एसिडिटी और उल्टी पर नियंत्रण देता है।",
        whoIsItForEn: "Prescribed for patients with severe GERD, erosive esophagitis, night-time acid reflux, peptic ulcers, chronic gastritis, or Zollinger-Ellison hypersecretory states.",
        whoIsItForHi: "गंभीर एसिड रिफ्लक्स, खाने की नली में सूजन/छाले (इसोफेजाइटिस), पेप्टिक अल्सर, रात में खट्टा पानी ऊपर आने और उल्टी की शिकायत वाले मरीज़ों के लिए।",
        keyPerksEn: ["High-pKa Rabeprazole for rapid Day-1 proton pump blockade", "10 mg IR Domperidone stops nausea & fullness quickly", "20 mg SR Domperidone prevents reflux throughout the day", "Non-enzymatic metabolism minimizes CYP2C19 variability"],
        keyPerksHi: ["रेबेप्राज़ोल द्वारा पहले दिन से तेज़ एसिड दमन", "10 mg IR से उल्टी व भारीपन में तुरंत राहत", "20 mg SR से दिन-रात रिफ्लक्स से सुरक्षा", "केवल पंजीकृत डॉक्टर की सलाह (Rx) से लें"]
      },
      composition: [
        { ingredient: "Rabeprazole Sodium (Enteric Coated — EC)", detail: "High-pKa (~5.0) fast-activating Proton Pump Inhibitor", strength: "20 mg", rda: "EC Core" },
        { ingredient: "Domperidone (Immediate Release — IR)", detail: "Fast onset gastroprokinetic & antiemetic unit", strength: "10 mg", rda: "IR Fraction" },
        { ingredient: "Domperidone (Sustained Release — SR)", detail: "Extended gastro-esophageal motility control", strength: "20 mg", rda: "SR Fraction" }
      ],
      mechanism: [
        { step: "PHASE 1 (IR)", title: "Rapid Prokinetic Kickstart (10 mg IR)", desc: "Enhances antroduodenal contractions and LES pressure quickly to halt regurgitation and nausea." },
        { step: "PHASE 2 (EC)", title: "Rapid High-pKa Acid Suppression (20 mg EC)", desc: "Rabeprazole converts rapidly into its active sulfenamide form across a wider pH range for potent Day-1 acid control." },
        { step: "PHASE 3 (SR)", title: "Round-the-Clock Reflux Barrier (20 mg SR)", desc: "Sustained Domperidone release prevents delayed gastric stasis and nocturnal acid breakthrough." }
      ],
      highlights: [
        "Precision Tablet-in-Capsule engineering combining 20 mg EC + 10 mg IR + 20 mg SR",
        "Predominantly non-enzymatic metabolism ensures consistent acid control across patient genotypes",
        "Ideal for erosive esophagitis, refractory GERD, and hypersecretory acid conditions",
        "10 × 10 institutional & retail blister presentation"
      ],
      indications: [
        "GERD & Nocturnal Acid Reflux",
        "Peptic Ulcers (Gastric & Duodenal) & Erosive Esophagitis",
        "Chronic Gastritis & Dyspepsia",
        "Nausea & Vomiting Associated with Acid Reflux",
        "Zollinger-Ellison Syndrome"
      ],
      dosage: "1 Capsule once daily before morning meal (swallow whole; do not open, chew, or crush), strictly under Medical Supervision.",
      keywords: ["rabeprazole", "domperidone", "dsr", "rabtheta", "gerd", "reflux", "esophagitis", "ulcer", "gastritis", "zollinger", "vomiting", "acidity", "rx"]
    },

    {
      id: "preimmune-aqua",
      name: "PRE IMMUNE AQUA",
      shortTitle: "Bacillus Clausii Spores Oral Suspension (2 Billion Spores / 5 ml)",
      genericSummary: "Bacillus clausii Spores 2 Billion per 5 ml Ready-to-Drink Oral Suspension",
      category: "probiotic",
      secondaryCategories: ["gastro"],
      classification: "Probiotic Oral Suspension",
      rxRequired: false,
      sugarFree: true,
      flavour: "Tasteless & Odorless Pure Aqua Suspension",
      dosageForm: "Ready-to-Drink 5 ml Mini Suspension",
      packSize: "5 ml Oral Mini-Suspension Vial",
      technology: "Heat & Acid-Resistant Spore Probiotic",
      techBadge: "2B SPORE PROBIOTIC",
      accent: "#7c3aed",
      accentSoft: "#f3e8ff",
      image: "assets/products/preimmune-aqua.png",
      taglineEn: "2 Billion acid-resistant Bacillus clausii spores in a tasteless ready-to-drink 5 ml vial for gut flora & immune defense.",
      taglineHi: "दस्त, एंटीबायोटिक के साइड-इफेक्ट और पाचन सुधारने के लिए बिना स्वाद वाला 5 ml रेडी-टू-ड्रिंक प्रोबायोटिक सस्पेंशन (बच्चों और बड़ों दोनों के लिए आसान)।",
      easyGuide: {
        whatIsItEn: "Antibiotics and stomach infections wipe out good gut bacteria, causing loose motions and weakness. PRE IMMUNE AQUA delivers 2 Billion resilient good probiotic spores in a water-like, tasteless 5 ml mini bottle that even fussy kids take effortlessly.",
        whatIsItHi: "एंटीबायोटिक दवाओं या पेट के इन्फेक्शन से आंतों के अच्छे बैक्टीरिया खत्म हो जाते हैं जिससे दस्त लगते हैं। PRE IMMUNE AQUA में पानी जैसा बेस्वाद 5 ml लिक्विड होता है जिसे बच्चे और बड़े बिना किसी परेशानी के पी सकते हैं।",
        whoIsItForEn: "Infants, children, adults, and elderly individuals experiencing loose motions (diarrhoea), taking antibiotics, recovering from stomach flu (gastroenteritis), or managing IBS/IBD.",
        whoIsItForHi: "शिशुओं, बच्चों और बड़ों में दस्त (डायरिया), एंटीबायोटिक से होने वाले लूज़ मोशन, रोटावायरस इन्फेक्शन और कमज़ोर पाचन के लिए।",
        keyPerksEn: ["Tasteless & odorless like plain water — zero fuss for children", "2 Billion heat- & acid-resistant Bacillus clausii spores", "Survives stomach acid to reach intestines alive", "Boosts protective IL-10 gut immunity & lactose digestion"],
        keyPerksHi: ["बिल्कुल पानी जैसा बेस्वाद — बच्चों को पिलाना बेहद आसान", "2 बिलियन मज़बूत Bacillus clausii स्पोर्स", "पेट के एसिड में नष्ट हुए बिना सीधे आंतों तक पहुँचता है", "पाचन और आंतों की रोग-प्रतिरोधक क्षमता बढ़ाता है"]
      },
      composition: [
        { ingredient: "Bacillus clausii Spores", detail: "Poly-antibiotic & gastric-acid resistant probiotic spores", strength: "2 Billion Spores", rda: "Per 5 ml Mini Vial" },
        { ingredient: "Aqueous Vehicle", detail: "Purified tasteless, sugar-free oral suspension medium (Oral use only — DO NOT INJECT)", strength: "q.s. to 5 ml", rda: "Ready-to-Drink" }
      ],
      mechanism: [
        { step: "01", title: "Gastric Barrier Survival", desc: "Endospore shell protects Bacillus clausii through harsh gastric pH and bile salts without refrigeration dependency." },
        { step: "02", title: "Microflora Restoration & Enzyme Support", desc: "Germinates in the intestine to restore commensal flora, produce B-vitamins, and aid digestion (including lactose breakdown)." },
        { step: "03", title: "Mucosal Barrier & Cytokine Modulation", desc: "Strengthens tight-junction gut barrier, stimulates protective Interleukin-10 (IL-10), and downregulates pro-inflammatory cytokines." }
      ],
      highlights: [
        "Selectively stimulates healthy intestinal microflora even alongside oral antibiotic courses",
        "Enhances enzymatic digestion (especially in lactose-sensitive individuals) & intrinsic mucosal immunity",
        "Stimulates anti-inflammatory Interleukin-10 while suppressing pro-inflammatory gut cytokines",
        "Convenient shake-twist-drink 5 ml oral mini vial (For Oral Administration Only)"
      ],
      indications: [
        "Antibiotic-Induced Diarrhea (AAD)",
        "Acute Gastroenteritis",
        "Rotaviral Diarrhoea in Pediatrics",
        "Acute & Persistent Diarrhoea",
        "Adjunctive Gut Flora Support in IBS / IBD"
      ],
      dosage: "Shake mini vial well, twist off cap, and drink directly (or mix with milk/water/juice at room temperature) as directed by the Pediatrician / Physician. For Oral Use Only.",
      keywords: ["probiotic", "bacillus clausii", "spores", "diarrhea", "diarrhoea", "loose motion", "antibiotic", "gut", "kids", "pediatric", "ibs", "ibd", "preimmune", "aqua"]
    }
  ]
};
