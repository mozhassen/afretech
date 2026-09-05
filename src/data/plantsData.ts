import { Plant } from '../types';

export const initialPlantsData: Plant[] = [
  {
    id: 'plant-vernonia-amygdalina',
    scientificName: 'Vernonia amygdalina',
    family: 'Asteraceae',
    commonEnglishName: 'Bitter Leaf',
    localNames: {
      amharic: 'Grawa',
      amharicScript: 'ግራዋ',
      yoruba: 'Ewúro',
      oromo: 'Ebicha',
      hausa: 'Shuwaka',
      english: 'Bitter Leaf'
    },
    region: 'shared',
    countryAvailability: ['Nigeria', 'Ethiopia'],
    partsUsed: ['leaves', 'roots', 'bark'],
    habitat: 'Tropical rainforest edges, secondary regrowth, cultivated compound gardens across West, Central, and East Africa.',
    ailmentsTreated: [
      'Malaria & Intermittent Fevers',
      'Gastrointestinal Parasites',
      'Diabetes & Hyperglycemia',
      'Amebic Dysentery',
      'Wound Antiseptic'
    ],
    preparation: {
      method: 'Fresh leaf decoction or cold water squeeze extraction. For chronic diabetes and liver detox, fresh leaves are crushed in warm water and strained without adding potash.',
      dosage: 'Adults: 1 small cup (100ml) twice daily for 3–5 days after food. In Ethiopia, boiled infusion is consumed in small morning portions.',
      administration: 'Oral decoction or topical crushed poultice for skin fungal infections.',
      contraindications: 'Strictly avoid in early pregnancy (mild oxytocic uterine stimulation noted in traditional records). Monitor blood glucose if taking synthetic anti-diabetic medication.',
      duration: 'Course of 5 days'
    },
    photoUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80',
    photoCaption: 'Mature Vernonia amygdalina foliage harvested at peak bitterness in wet season.',
    audioNarration: {
      en: "Vernonia amygdalina, widely known as Bitter Leaf in Nigeria and Grawa in Ethiopia, is one of Africa's most revered medicinal plants. The fresh leaves contain potent sesquiterpene lactones that combat fevers and intestinal worms. Practitioners recommend drinking a freshly squeezed leaf infusion twice daily.",
      am: "ግራዋ በኢትዮጵያ እና በናይጄሪያ በስፋት የሚታወቅ ፈዋሽ ዕፅዋት ነው። በተለይም ለሆድ ቁርጠት፣ ለወባ ትኩሳት እና ለትላትል መከላከያነት ቅጠሉ ተፈልቶ ወይም ተጨምቆ ይጠጣል።",
      yo: "Ewúro jẹ́ ewé tó gbajúmọ̀ fún ìwòsàn ibà, kòkòrò inú, àti àtọ̀gbẹ. A máa ń fọ ewé rẹ̀ láti mu omi rẹ̀ láàárọ̀ àti lálẹ́ lẹ́yìn oúnjẹ.",
      durationSeconds: 28
    },
    comparativeData: {
      concordanceScore: 92,
      concordanceSummary: "Exceptional clinical concordance between UniLag and AASTU ethnobotanical records. Both traditions identify Vernonia amygdalina as a premier hepatoprotective and antimalarial agent, with minor regional divergence in processing methods.",
      scientificValidationNotes: "UniLag College of Medicine and AASTU Department of Biotechnology have isolated vernodalin and vernolide compounds demonstrating strong antiplasmodial efficacy against Plasmodium falciparum.",
      nigeria: {
        localName: 'Ewúro (Yorùbá)',
        institution: 'University of Lagos (UniLag)',
        partsUsed: ['leaves', 'roots'],
        uses: ['Fever & acute malaria', 'Digestive cleanse & liver stimulant', 'Postpartum uterine tone restoration', 'Antidiabetic tonic'],
        preparation: 'Leaves are washed with cold water until foam reduces slightly, then steeped in pure palm water or light aqueous extract. Roots are occasionally soaked in local dry gin (ògógóró) for joint pains.',
        dosage: 'Half tumbler (120ml) twice daily for 3 days.',
        contraindications: 'Avoid during first trimester of pregnancy. Avoid excessive potassium depletion.',
        practitionerNotes: 'Elders in Oyo and Ogun states emphasize that the bitter juice must not be sweetened, as bitterness stimulates bile secretion.'
      },
      ethiopia: {
        localName: 'Grawa / ግራዋ (Amharic), Ebicha (Oromo)',
        institution: 'Addis Ababa Science and Technology University (AASTU)',
        partsUsed: ['leaves', 'bark'],
        uses: ['Gastrointestinal colic (Qurti)', 'Internal parasite eradication (Wosfat)', 'Livestock wound dressing', 'Malaria fever'],
        preparation: 'Fresh leaves crushed with rock salt and lukewarm water; or sun-dried leaves boiled as a bitter tea with wild rue (Tena Adam).',
        dosage: 'One small Ethiopian coffee cup (Finjan, 60ml) in the morning on an empty stomach for 2 consecutive days.',
        contraindications: 'Do not administer to children under 5 years without severe dilution with milk.',
        practitionerNotes: 'Practitioners in Shoa and Wollo highland fringes frequently combine Grawa with roasted barley water to soften gastric lining irritation.'
      }
    },
    verifiedBy: 'Prof. O. Adebayo (UniLag) & Dr. T. Hailemariam (AASTU)',
    conservationStatus: 'Common'
  },
  {
    id: 'plant-moringa-oleifera',
    scientificName: 'Moringa oleifera',
    family: 'Moringaceae',
    commonEnglishName: 'Moringa / Miracle Tree',
    localNames: {
      amharic: 'Shiferaw',
      amharicScript: 'ሺፈራው',
      yoruba: 'Ewé Igbálẹ̀',
      oromo: 'Moringaa',
      hausa: 'Zogale',
      english: 'Drumstick Tree'
    },
    region: 'shared',
    countryAvailability: ['Nigeria', 'Ethiopia'],
    partsUsed: ['leaves', 'seeds', 'bark', 'roots'],
    habitat: 'Arid and semi-arid savannahs, cultivated widely in home compounds throughout Sub-Saharan Africa.',
    ailmentsTreated: [
      'Hypertension & Vascular Tension',
      'Micronutrient Malnutrition',
      'Joint Inflammation & Arthritis',
      'Water Clarification & Purification',
      'Immune Tonic'
    ],
    preparation: {
      method: 'Dry shade-cured leaves pulverized into fine green powder. For high blood pressure, steeped as an herbal infusion. Seeds crushed for clarifying turbid well water and oil extraction.',
      dosage: 'Powder: 1 teaspoon (3g) in warm water or porridge daily. Leaf tea: 1 cup daily.',
      administration: 'Dietary oral supplementation or warm infusion.',
      contraindications: 'Excessive consumption of the root bark is prohibited due to spirochin alkaloid toxicity. Pregnant women should avoid root extracts.',
      duration: 'Ongoing restorative supplement'
    },
    photoUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80',
    photoCaption: 'Moringa oleifera leaves drying under ventilated shade netting.',
    audioNarration: {
      en: "Moringa oleifera, named Ewe Igbale in Yoruba and Shiferaw in Amharic, is known as the Tree of Life. Rich in bioflavonoids and calcium, the shade-dried leaves reduce blood pressure and strengthen bodily immunity.",
      am: "ሺፈራው ወይም ሞሪንጋ እጅግ በርካታ የተመጣጠኑ ንጥረ ነገሮችን የያዘ ተዓምረኛ ዕፅዋት ነው። የደም ግፊትን ለማስተካከል እና አጠቃላይ የሰውነት አቅምን ለመገንባት ቅጠሉ ደርቆ ይወሰዳል።",
      yo: "Ewé Igbálẹ̀ tàbí Zogale ní àwọn èròjà aṣaralóore tó pọ̀. Ó ń dín ìtújẹ̀ sísàn kù, ó sì ń fún àgọ́ ara lókun fún ìlera tó péye.",
      durationSeconds: 24
    },
    comparativeData: {
      concordanceScore: 88,
      concordanceSummary: "High traditional alignment across West and East Africa as a cardiovascular stabilizer and nutrition restorer. Nigerian practitioners emphasize leafy soups and tea for hypertension; Ethiopian southern cohorts prioritize food security and seed-based purification.",
      scientificValidationNotes: "Joint chromatographic profiling validates high quercetin and kaempferol levels in both Nigerian savannah and Ethiopian Rift Valley ecotypes.",
      nigeria: {
        localName: 'Ewé Igbálẹ̀ (Yorùbá), Zogale (Hausa)',
        institution: 'University of Lagos (UniLag)',
        partsUsed: ['leaves', 'seeds'],
        uses: ['High blood pressure management', 'General vitality in elderly', 'Blood sugar stabilization'],
        preparation: 'Leaves air-dried away from direct sunlight, ground into smooth powder and stirred into boiling water or light pap (ògì). Seeds chewed dry.',
        dosage: '1 heaped teaspoon in warm water twice daily after breakfast and dinner.',
        contraindications: 'Do not boil fresh leaves for extended periods to preserve heat-labile vitamins.',
        practitionerNotes: 'Northern and South-Western Nigerian practitioners observe rapid lowering of blood pressure when paired with garlic.'
      },
      ethiopia: {
        localName: 'Shiferaw / ሺፈራው (Amharic)',
        institution: 'Addis Ababa Science and Technology University (AASTU)',
        partsUsed: ['leaves', 'seeds', 'bark'],
        uses: ['Childhood malnutrition recovery', 'Joint stiffness and rheumatism', 'Well-water microbial settling'],
        preparation: 'Leaves mixed into traditional unleavened bread or roasted barley flour (Besso). Powdered seeds placed in earthenware water pots to clear river silt.',
        dosage: 'One small tablespoon blended with morning porridge.',
        contraindications: 'Do not harvest roots from older trees for medicinal tea.',
        practitionerNotes: 'Practitioners in Konso and Arba Minch utilize specialized terraced moringa groves with centuries of soil acclimation.'
      }
    },
    verifiedBy: 'Dr. K. Balogun (UniLag) & Prof. M. Bekele (AASTU)',
    conservationStatus: 'Cultivated'
  },
  {
    id: 'plant-hagenia-abyssinica',
    scientificName: 'Hagenia abyssinica',
    family: 'Rosaceae',
    commonEnglishName: 'Kosso / African Redwood',
    localNames: {
      amharic: 'Kosso',
      amharicScript: 'ኮሶ',
      yoruba: 'Kòsí (Àbájọ)',
      oromo: 'Heexoo',
      hausa: 'Koso',
      english: 'Kosso Tree'
    },
    region: 'ethiopia',
    countryAvailability: ['Ethiopia'],
    partsUsed: ['flowers', 'bark'],
    habitat: 'Afromontane cloud forests of Ethiopian highlands between 2000m and 3000m altitude.',
    ailmentsTreated: [
      'Tapeworm Infection (Taenia saginata)',
      'Intestinal Nematodes',
      'Amebiasis & Chronic Diarrhea',
      'Ulcerative Gastritis'
    ],
    preparation: {
      method: 'Female dried inflorescences (flowers) are crushed and macerated in cold water or fermented mead (Tej) overnight. The yellow-red infusion is carefully strained through fine linen.',
      dosage: 'Single dose of 8–15g dried flowers. Must not be exceeded. Taken at dawn on an empty stomach.',
      administration: 'Strictly oral single therapeutic purge.',
      contraindications: 'STRICTLY CONTRAINDICATED in pregnancy (strong abortifacient properties). Lethal to fetus. Toxic in excessive doses causing visual disturbance and severe vomiting.',
      duration: 'Single dose, repeated only after 3 months if parasite segments re-emerge.'
    },
    photoUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=900&q=80',
    photoCaption: 'Female flower panicles of Hagenia abyssinica in the Simien subalpine canopy.',
    audioNarration: {
      en: "Hagenia abyssinica, famously known as Kosso in Ethiopia, is Ethiopia's historical remedy for tapeworm. The female flower panicles contain kosotoxin. Due to its potent potency, it must only be administered under an experienced practitioner's strict dosage control.",
      am: "ኮሶ በኢትዮጵያ ለዘመናት የቴፕ ወርም ወይም የኮሶ ትልን ለማስወጣት የሚያገለግል አንቱ የተባለ የደጋ ዕፅዋት ነው። መጠኑ በባህላዊ አዋቂዎች በጥንቃቄ ተለክቶ በጠዋት ይወሰዳል። እርጉዝ ሴቶች ፈጽሞ መውሰድ የለባቸውም።",
      yo: "Ewé Kosso yìí jẹ́ ewé pàtàkì láti orílẹ̀-èdè Ethiopia fún pípajẹ kòkòrò inú tó le koko. Ó gbọdọ̀ jẹ́ lílò pẹ̀lú ìṣọ́ra gíga lábẹ́ àbójútó oníṣègùn tó mọ iṣẹ́ rẹ̀.",
      durationSeconds: 32
    },
    verifiedBy: 'Dr. T. Hailemariam (AASTU Ethnomedicine Center)',
    conservationStatus: 'Vulnerable'
  },
  {
    id: 'plant-azadirachta-indica',
    scientificName: 'Azadirachta indica',
    family: 'Meliaceae',
    commonEnglishName: 'Neem Tree',
    localNames: {
      amharic: 'Neem',
      amharicScript: 'ኒም',
      yoruba: 'Dongoyaro',
      oromo: 'Niimii',
      hausa: 'Dogon Yaro',
      english: 'Neem / Indian Lilac'
    },
    region: 'shared',
    countryAvailability: ['Nigeria', 'Ethiopia'],
    partsUsed: ['leaves', 'bark', 'seeds'],
    habitat: 'Tropical dry savannahs, roadsides, and urban homesteads across the Sahel and tropical belt.',
    ailmentsTreated: [
      'Malaria & High Intermittent Fevers',
      'Bacterial Dermatitis & Boils',
      'Dental Caries & Gingivitis',
      'Pest Control & Lice Infestation',
      'Fungal Infections'
    ],
    preparation: {
      method: 'Leaves boiled together with lemongrass and lime in a large clay pot to form an antimalarial steam bath and oral tonic. Bark decoctions used for stubborn skin rashes.',
      dosage: 'Adult steam inhalation: Inhale vapors under blanket for 15 minutes. Oral: 50ml twice daily for 3 days.',
      administration: 'Steam bath inhalation, topical wash, or oral decoction.',
      contraindications: 'Do not administer neem seed oil to infants or young children (causes encephalopathy and Reye-like symptoms). Avoid in pregnancy.',
      duration: '3 days'
    },
    photoUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=900&q=80',
    photoCaption: 'Azadirachta indica leaves displaying characteristic serrated leaflets.',
    audioNarration: {
      en: "Azadirachta indica, known as Dongoyaro across Nigeria and Neem in Ethiopia, is renowned for treating stubborn fevers. In West Africa, practitioners prepare an aromatic steam therapy that induces rapid sweating to break acute malaria fevers.",
      am: "ኒም በናይጄሪያ ዶንጎያሮ በመባል የሚታወቅ ሲሆን ለከፍተኛ ትኩሳት እና ለቆዳ በሽታዎች ፍቱን ነው። ቅጠሉን በማፍላት እንፋሎቱን መታጠን ትኩሳትን በፍጥነት ያወርዳል።",
      yo: "Dongoyaro jẹ́ ewé ìbílẹ̀ tó gbajúmọ̀ fún títọ́jú ibà aṣọ́kùnrin. A máa ń bọ́ ewé rẹ̀ pẹ̀lú ọsàn wẹ́wẹ́ láti fi tùràrí sí ara kí òógùn lè jáde.",
      durationSeconds: 27
    },
    comparativeData: {
      concordanceScore: 90,
      concordanceSummary: "Shared clinical reliance on Azadirachta indica for febrile conditions and insect deterrence. In Nigeria, it forms the cornerstone of the traditional 'Àgbọ' steam therapy, whereas Ethiopian practitioners emphasize topical skin and dental hygiene applications.",
      scientificValidationNotes: "Active limonoids including azadirachtin and nimbolide exhibit potent gametocytocidal and anti-inflammatory activity.",
      nigeria: {
        localName: 'Dongoyaro (Yorùbá / Hausa)',
        institution: 'University of Lagos (UniLag)',
        partsUsed: ['leaves', 'bark'],
        uses: ['Fever steam bath (Àgbọ)', 'Antimalarial oral broth', 'Teeth chewing stick for gum health'],
        preparation: 'Leaves and bark boiled in earthen pot alongside Cymbopogon citratus (lemongrass) and Citrus aurantifolia. Patient covers head with thick blanket to inhale vapor.',
        dosage: 'One steam session at dusk, followed by drinking 1/3 glass of the warm liquid.',
        contraindications: 'Excessive oral intake can irritate kidneys; do not exceed 3 consecutive days.',
        practitionerNotes: 'Practitioners note immediate relief from shivering and body aches within 30 minutes of steam therapy.'
      },
      ethiopia: {
        localName: 'Neem / ኒም (Amharic)',
        institution: 'Addis Ababa Science and Technology University (AASTU)',
        partsUsed: ['leaves', 'seeds'],
        uses: ['Skin scabies and eczema', 'Storage grain preservation', 'Fever relief in lowland areas'],
        preparation: 'Leaves crushed into fine paste applied topically to affected skin surfaces. Seed extract sprinkled over grain granaries to repel weevils.',
        dosage: 'Apply paste twice daily to skin; wash off with lukewarm water after 1 hour.',
        contraindications: 'Avoid applying directly into open bleeding wounds.',
        practitionerNotes: 'Particularly valued in Afar, Somali, and Gambella regions where access to synthetic acaricides is limited.'
      }
    },
    verifiedBy: 'Prof. F. Sofowora (UniLag) & Dr. E. Dagne (AASTU)',
    conservationStatus: 'Common'
  },
  {
    id: 'plant-ocimum-gratissimum',
    scientificName: 'Ocimum gratissimum',
    family: 'Lamiaceae',
    commonEnglishName: 'African Scent Leaf / Wild Basil',
    localNames: {
      amharic: 'Damakese',
      amharicScript: 'ዳማከሴ',
      yoruba: 'Ẹfinrin',
      oromo: 'Hadaawii',
      hausa: 'Daidoya',
      english: 'African Basil'
    },
    region: 'shared',
    countryAvailability: ['Nigeria', 'Ethiopia'],
    partsUsed: ['leaves', 'stem'],
    habitat: 'Widespread throughout sub-humid grasslands, forest clearings, and domestic vegetable plots.',
    ailmentsTreated: [
      'Gastrointestinal Cramps & Diarrhea',
      'Upper Respiratory Catarrh & Cough',
      'Headache & Sinusitis',
      'Infantile Colic',
      'Oral Malodor & Throat Irritation'
    ],
    preparation: {
      method: 'Leaves squeezed fresh between clean palms to extract aromatic juice, which is either dripped directly into the nostrils for severe migraines, or squeezed into warm water with a pinch of sea salt for diarrhea.',
      dosage: 'Oral: 2 tablespoons of squeezed raw juice or 1 cup of light tea. Nasal: 2 drops in each nostril for sinus block.',
      administration: 'Oral infusion, raw juice nasal drops, or chest rub.',
      contraindications: 'Excessive nasal instillation can cause transient nasal burning. Safe for children over 2 years in diluted form.',
      duration: '2 to 3 days'
    },
    photoUrl: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=900&q=80',
    photoCaption: 'Aromatic foliage of Ocimum gratissimum showing purple-tinted calyces.',
    audioNarration: {
      en: "Ocimum gratissimum, cherished as Efinrin in Nigeria and Damakese in Ethiopia, is an essential household herbal first-aid plant. Packed with eugenol and thymol essential oils, inhaling its crushed leaves relieves acute headaches and opens congested sinuses.",
      am: "ዳማከሴ በኢትዮጵያ በእያንዳንዱ ቤት የሚታወቅ እና በሰፊው የሚተከል ፍቱን ዕፅዋት ነው። በተለይ ለራስ ምታት፣ ለጉንፋን እና ለሆድ ቁርጠት ቅጠሉን በእጅ አሽቶ ማሽተት ወይም ጨምቆ መጠጣት ፈጣን እፎይታን ይሰጣል።",
      yo: "Ẹfinrin jẹ́ ewé olóòórùn dídùn tó ń dáná àìsàn orí fífọ́, ikọ́, àti inú rírun. A máa ń fọ́ ọ sínú omi tàbí kí a kùn sí imú fún ìṣí imú.",
      durationSeconds: 29
    },
    comparativeData: {
      concordanceScore: 95,
      concordanceSummary: "Highest recorded intercultural alignment in the consortium database. Healers in both Addis Ababa and Lagos independently utilize nasal instillation of leaf oil for acute cephalalgia and warm aqueous extractions for infantile colic.",
      scientificValidationNotes: "Gas chromatography mass spectrometry confirms identical rich eugenol chemotypes in UniLag botanical gardens and AASTU field samples.",
      nigeria: {
        localName: 'Ẹfinrin (Yorùbá), Daidoya (Hausa)',
        institution: 'University of Lagos (UniLag)',
        partsUsed: ['leaves'],
        uses: ['Stomach upset and gas', 'Spicing medicinal pepper soup for convalescents', 'Headache cure'],
        preparation: 'Fresh leaves washed and cooked in goat meat pepper soup, or raw leaves ground with alligator pepper (Atare) and rubbed on temple.',
        dosage: 'Bowl of aromatic broth or 1 tablespoon squeezed juice.',
        contraindications: 'None reported at traditional culinary/therapeutic levels.',
        practitionerNotes: 'Considered by Lagos herbalists to possess spiritual shielding properties alongside physical antimicrobials.'
      },
      ethiopia: {
        localName: 'Damakese / ዳማከሴ (Amharic)',
        institution: 'Addis Ababa Science and Technology University (AASTU)',
        partsUsed: ['leaves', 'stem'],
        uses: ['Acute migraine and flu', 'Eye infection wash (diluted)', 'Stomach ache'],
        preparation: 'Fresh leaves rolled between hands, inhaled deeply. For severe headache, juice drops instilled into nostrils while leaning back.',
        dosage: 'Inhalation as needed; 2 drops per nostril twice daily.',
        contraindications: 'Ensure strict cleanliness of hands when extracting juice for eye or nose use.',
        practitionerNotes: 'Cultivated in almost every traditional compound across Shewa, Wollo, and Gojjam.'
      }
    },
    verifiedBy: 'Dr. A. Olowokudejo (UniLag) & Dr. Z. Woldu (AASTU)',
    conservationStatus: 'Common'
  },
  {
    id: 'plant-taverniera-abyssinica',
    scientificName: 'Taverniera abyssinica',
    family: 'Fabaceae',
    commonEnglishName: 'Dingetegna',
    localNames: {
      amharic: 'Dingetegna',
      amharicScript: 'ድንግተኛ',
      yoruba: 'Ewé Ìbílẹ̀ Ethiopia (Dingetegna)',
      oromo: 'Dhingatanya',
      english: 'Sudden Illness Herb'
    },
    region: 'ethiopia',
    countryAvailability: ['Ethiopia'],
    partsUsed: ['roots', 'leaves'],
    habitat: 'Limestone soils and stony hillsides of Shewa, Tigray, and Hararghe plateaus at 1700m–2200m.',
    ailmentsTreated: [
      'Acute Colic & Sudden Abdominal Cramps',
      'Food Poisoning',
      'Sudden Febrile Spasms',
      'Nausea & Vomiting'
    ],
    preparation: {
      method: 'Roots are gently washed, peeled, and directly chewed raw with a small pinch of salt, swallowing the saliva. Alternatively, 10g dried root is pounded and boiled in 200ml water.',
      dosage: 'Chew a 2-inch root fragment or drink 50ml of decoction at onset of acute pain.',
      administration: 'Chewing raw root or oral decoction.',
      contraindications: 'Avoid long-term daily use. Intended for acute emergency symptomatic relief.',
      duration: '1 to 2 days only'
    },
    photoUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=900&q=80',
    photoCaption: 'Taverniera abyssinica root specimen harvested in central Ethiopian highlands.',
    audioNarration: {
      en: "Taverniera abyssinica, affectionately known as Dingetegna in Amharic meaning 'herb for sudden sickness', is an ancient Ethiopian emergency medicine. Chewing a small piece of its root calms agonizing stomach cramps and food poisoning spasms within minutes.",
      am: "ድንግተኛ በኢትዮጵያ ባህላዊ ሕክምና ውስጥ ለድንገተኛ የሆድ ህመም እና ቁርጠት በቅጽበት እፎይታን የሚሰጥ ክቡር ዕፅዋት ነው። ሥሩን በእሳት ለብለብ አድርጎ ወይም ጥሬውን በጨው አኝኮ መዋጥ ህመሙን በፍጥነት ያጠፋዋል።",
      yo: "Ewé Dingetegna jẹ́ oògùn pàjáwìrì láti ilẹ̀ Ethiopia fún ìrora inú tàbí májèlé oúnjẹ tó bẹ́ sílẹ̀ lójijì. Gbòǹgbò rẹ̀ ni wọ́n máa ń jẹ fún ìtura kíákíá.",
      durationSeconds: 30
    },
    verifiedBy: 'Dr. T. Hailemariam (AASTU)',
    conservationStatus: 'Endangered'
  },
  {
    id: 'plant-harungana-madagascariensis',
    scientificName: 'Harungana madagascariensis',
    family: 'Hypericaceae',
    commonEnglishName: 'Dragon\'s Blood Tree / Orange Milk Tree',
    localNames: {
      amharic: 'Harungana',
      amharicScript: 'ሀሩንጋና',
      yoruba: 'Òtù',
      hausa: 'Uru',
      english: 'Orange Resin Tree'
    },
    region: 'nigeria',
    countryAvailability: ['Nigeria'],
    partsUsed: ['bark', 'sap', 'leaves'],
    habitat: 'Secondary forest margins, riverbanks, and high rainfall zones of Southern Nigeria.',
    ailmentsTreated: [
      'Jaundice & Acute Liver Dysfunction',
      'Hepatitis B Symptom Support',
      'Infectious Dysentery',
      'Chronic Ulcers & Open Wounds'
    ],
    preparation: {
      method: 'Stem bark decocted in water with small quantities of sulfur-free local clay. The bright orange sap exuded from bark incisions is applied directly to stubborn skin ulcers.',
      dosage: 'Bark decoction: 100ml morning and evening for 7 days.',
      administration: 'Oral liquid for liver disorders; topical resin for wounds.',
      contraindications: 'Do not administer to patients with acute obstructive gallstones without specialist evaluation.',
      duration: '7 days'
    },
    photoUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80',
    photoCaption: 'Harungana madagascariensis exhibiting characteristic orange-red resin exudate.',
    audioNarration: {
      en: "Harungana madagascariensis, called Otu by Yoruba practitioners, yields a distinctive orange sap famous for treating jaundice and viral hepatitis. UniLag pharmacological studies confirm strong antioxidant hepatoprotective actions.",
      am: "ሀሩንጋና በምዕራብ አፍሪካ እና ናይጄሪያ ለጉበት በሽታዎች እና ለወፍ በሽታ (ጃንዲስ) በስፋት የሚያገለግል ሲሆን የዛፉ ቅርፊት እና ቀይ ጭማቂ ፈዋሽ ባህሪ አለው።",
      yo: "Òtù jẹ́ igi ìbílẹ̀ tó ní oje pupa bí ẹ̀jẹ̀. Ó jẹ́ oògùn pàtàkì fún àìsàn ẹ̀dọ̀, àmúkùrù (jaundice), àti àwọn egbò tó kọ̀ láti jiná.",
      durationSeconds: 26
    },
    verifiedBy: 'Prof. O. Adebayo (UniLag Pharmacognosy Dept)',
    conservationStatus: 'Common'
  },
  {
    id: 'plant-zingiber-officinale',
    scientificName: 'Zingiber officinale',
    family: 'Zingiberaceae',
    commonEnglishName: 'Ginger',
    localNames: {
      amharic: 'Zinjibil',
      amharicScript: 'ዝንጅብል',
      yoruba: 'Atalẹ̀',
      oromo: 'Zinjibila',
      hausa: 'Chitta',
      english: 'Ginger'
    },
    region: 'shared',
    countryAvailability: ['Nigeria', 'Ethiopia'],
    partsUsed: ['roots'],
    habitat: 'Widely cultivated in warm moist soils across Kaduna & Southern Nigeria and Southern Ethiopian highlands.',
    ailmentsTreated: [
      'Joint Rheumatism & Inflammatory Swellings',
      'Morning Sickness & Motion Nausea',
      'Bronchial Congestion & Phlegm',
      'Sluggish Digestion'
    ],
    preparation: {
      method: 'Fresh rhizome grated and boiled into tea with pure honey. In Nigeria, blended with alligator pepper for musculoskeletal rubs.',
      dosage: '1 cup of warm brew up to 3 times daily. Topical poultice applied to swollen joints.',
      administration: 'Oral infusion or topical warm poultice.',
      contraindications: 'High therapeutic doses should be monitored in patients taking prescription blood thinners (warfarin/aspirin).',
      duration: 'As needed'
    },
    photoUrl: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=900&q=80',
    photoCaption: 'Freshly harvested Zingiber officinale rhizomes with intact aromatic cortex.',
    audioNarration: {
      en: "Zingiber officinale, called Atale in Yoruba and Zinjibil in Amharic, warms the body, dissolves chest phlegm, and soothes painful arthritis. It is an indispensable catalyst herb across both Nigerian and Ethiopian pharmacopeias.",
      am: "ዝንጅብል በኢትዮጵያ እና በናይጄሪያ በምግብነትም ሆነ በመድኃኒትነት ትልቅ ቦታ ያለው ዕፅዋት ነው። ጉንፋንን ለማስታገስ፣ የሰውነት ቅዝቃዜን ለማስወገድ እና የሆድ ድርቀትን ለማከም ይረዳል።",
      yo: "Atalẹ̀ jẹ́ egbògi tó ń mú kí ara gba ooru, ó ń dẹ́kun ikọ́ fífọ́, ó sì ń tu làkúrègbé lára. A máa ń bọ́ ọ mọ oyin tàbí omi gbígbóná.",
      durationSeconds: 25
    },
    comparativeData: {
      concordanceScore: 96,
      concordanceSummary: "Virtually identical traditional indications across both research hubs. UniLag and AASTU teams document mutual synergy when combined with Allium sativum (Garlic).",
      scientificValidationNotes: "Gingerols and shogaols exhibit potent cyclooxygenase-2 (COX-2) inhibition validating traditional anti-arthritic claims.",
      nigeria: {
        localName: 'Atalẹ̀ (Yorùbá), Chitta (Hausa)',
        institution: 'University of Lagos (UniLag)',
        partsUsed: ['roots'],
        uses: ['Arthritis warm rub', 'Digestive fire stimulation', 'Postpartum healing soups'],
        preparation: 'Fresh roots crushed with local black soap or infused in palm oil for arthritis; boiled in water for respiratory catarrh.',
        dosage: '1 cup tea sweetened with wild honey twice daily.',
        contraindications: 'Avoid excessive intake with stomach ulcers.',
        practitionerNotes: 'Standard base in almost every Yorùbá multi-herb decoction.'
      },
      ethiopia: {
        localName: 'Zinjibil / ዝንጅብል (Amharic)',
        institution: 'Addis Ababa Science and Technology University (AASTU)',
        partsUsed: ['roots'],
        uses: ['Severe cough and cold', 'Digestive gas relief', 'Metabolic warmth in cold highland weather'],
        preparation: 'Boiled with cinnamon and black cumin (Tikur Azmud) into a potent tea.',
        dosage: 'One warm cup after morning meal.',
        contraindications: 'None at normal dietary dosage.',
        practitionerNotes: 'Crucial ingredient in traditional remedies during the chilly Ethiopian rainy season (Kiremt).'
      }
    },
    verifiedBy: 'Consortium Ethnobotany Working Group',
    conservationStatus: 'Cultivated'
  }
];
