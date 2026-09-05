import { Language } from '../types';

export interface TranslationSchema {
  // App branding
  appTitle: string;
  appSubtitle: string;
  consortiumName: string;
  partnershipTag: string;

  // Navigation
  navCatalog: string;
  navComparison: string;
  navContribute: string;
  navSync: string;
  navResearcher: string;

  // Status & Connectivity
  onlineStatus: string;
  offlineStatus: string;
  offlineModeNotice: string;
  simulatedOffline: string;
  simulatedOnline: string;
  lastSynced: string;
  pendingSync: string;

  // Roles
  rolePractitioner: string;
  roleIntermediary: string;
  roleResearcher: string;
  switchRole: string;

  // Catalog & Search
  searchPlaceholder: string;
  filterAll: string;
  filterShared: string;
  filterNigeria: string;
  filterEthiopia: string;
  partsUsedTitle: string;
  ailmentsTitle: string;
  playAudioDesc: string;
  pauseAudioDesc: string;
  viewDetails: string;
  compareButton: string;

  // Plant Details
  botanicalName: string;
  commonName: string;
  localNamesTitle: string;
  preparationTitle: string;
  dosageTitle: string;
  contraindicationsTitle: string;
  dosageAdministration: string;
  conservationStatusTitle: string;
  audioGuideTitle: string;
  verifiedByResearcher: string;

  // Comparison View
  comparisonHeader: string;
  comparisonSub: string;
  selectPlantToCompare: string;
  nigeriaUniLagColumn: string;
  ethiopiaAastuColumn: string;
  clinicalConcordance: string;
  sharedSpeciesBadge: string;
  regionalDifferences: string;
  preparationContrast: string;

  // Contribution Form
  contributeHeader: string;
  contributeSub: string;
  step1Title: string;
  step2Title: string;
  step3Title: string;
  step4Title: string;
  step5Title: string;
  plantPhotoPrompt: string;
  takePhoto: string;
  uploadPhoto: string;
  plantNameField: string;
  localNameField: string;
  selectPartsUsed: string;
  preparationStepsField: string;
  dosageField: string;
  ailmentsField: string;
  recordVoiceNotePrompt: string;
  startRecording: string;
  stopRecording: string;
  playingVoiceNote: string;
  gpsTaggingPrompt: string;
  fetchGps: string;
  gpsCaptured: string;
  consentTitle: string;
  consentStatement: string;
  submitButton: string;
  savedToOfflineQueue: string;

  // Sync Engine
  syncEngineHeader: string;
  syncEngineSub: string;
  syncNowButton: string;
  syncInProgress: string;
  deltaSyncExplanation: string;
  queuedItemsCount: string;
  dataCompressedNotice: string;
  syncLogTitle: string;

  // Researcher Admin
  researcherHeader: string;
  reviewSubmissions: string;
  approveButton: string;
  flagButton: string;
  exportCsv: string;
  exportJson: string;
  analyticsHeader: string;
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    appTitle: "Afretec Traditional Medicine",
    appSubtitle: "Indigenous Herbal Knowledge Repository & Cross-Border Exchange",
    consortiumName: "Afretec Research Consortium",
    partnershipTag: "University of Lagos (Nigeria) & Addis Ababa Science and Technology University (Ethiopia)",

    navCatalog: "Herb Catalog",
    navComparison: "Cross-Border Comparison",
    navContribute: "Contribute Herb",
    navSync: "Offline Sync",
    navResearcher: "Research Portal",

    onlineStatus: "Connected (Online)",
    offlineStatus: "Offline Mode (Local Cache)",
    offlineModeNotice: "Operating offline: Browsing cached herbal knowledge. Submissions will be stored in your local queue and synchronized automatically when connection resumes.",
    simulatedOffline: "Switch to Offline Simulation",
    simulatedOnline: "Switch to Online Mode",
    lastSynced: "Last synced",
    pendingSync: "Pending Sync",

    rolePractitioner: "Traditional Practitioner",
    roleIntermediary: "Youth Intermediary",
    roleResearcher: "Academic Researcher (UniLag / AASTU)",
    switchRole: "Switch User Role",

    searchPlaceholder: "Search local name (Ewuro, Grawa), botanical name, or ailment...",
    filterAll: "All Species",
    filterShared: "Shared (Pan-African)",
    filterNigeria: "Nigeria (UniLag)",
    filterEthiopia: "Ethiopia (AASTU)",
    partsUsedTitle: "Parts Used",
    ailmentsTitle: "Treated Ailments & Symptoms",
    playAudioDesc: "Listen in Voice",
    pauseAudioDesc: "Pause Audio",
    viewDetails: "View Details",
    compareButton: "Compare Nigeria vs Ethiopia",

    botanicalName: "Scientific Botanical Name",
    commonName: "Common Name",
    localNamesTitle: "Indigenous Local Names",
    preparationTitle: "Traditional Preparation Method",
    dosageTitle: "Recommended Dosage & Administration",
    contraindicationsTitle: "Safety Warnings & Contraindications",
    dosageAdministration: "Administration",
    conservationStatusTitle: "Ecological Status",
    audioGuideTitle: "Elder Voice Recording & Audio Guide",
    verifiedByResearcher: "Verified by Consortium Taxonomists",

    comparisonHeader: "Cross-Border Botanical Comparison",
    comparisonSub: "Comparative analysis of medicinal preparation and utilization between Nigerian and Ethiopian indigenous practices.",
    selectPlantToCompare: "Select a shared medicinal plant to compare:",
    nigeriaUniLagColumn: "Nigeria — University of Lagos (UniLag)",
    ethiopiaAastuColumn: "Ethiopia — Addis Ababa Science and Technology (AASTU)",
    clinicalConcordance: "Clinical & Traditional Concordance Score",
    sharedSpeciesBadge: "Shared Cross-Border Species",
    regionalDifferences: "Regional Traditional Divergences",
    preparationContrast: "Preparation & Dosage Contrast",

    contributeHeader: "Practitioner Knowledge Submission",
    contributeSub: "Guided submission module for indigenous healers and youth assistants.",
    step1Title: "1. Plant Identity & Photo",
    step2Title: "2. Parts & Preparation",
    step3Title: "3. Voice Note Recording",
    step4Title: "4. Geotagging & Habitat",
    step5Title: "5. Ethical Informed Consent",
    plantPhotoPrompt: "Take specimen photo or select from library",
    takePhoto: "Capture Camera / Upload",
    uploadPhoto: "Select Photo",
    plantNameField: "Plant Name / Local Identifier",
    localNameField: "Local Indigenous Name",
    selectPartsUsed: "Select plant parts harvested:",
    preparationStepsField: "Step-by-step preparation (decoction, infusion, powder):",
    dosageField: "Dosage instructions & precautions:",
    ailmentsField: "Ailments or symptoms addressed:",
    recordVoiceNotePrompt: "Record voice description in your mother tongue for elderly listeners:",
    startRecording: "Record Voice Note",
    stopRecording: "Stop & Save Recording",
    playingVoiceNote: "Playing recorded voice note",
    gpsTaggingPrompt: "Tag specimen geographical coordinates (habitat location):",
    fetchGps: "Capture Current GPS Coordinates",
    gpsCaptured: "Coordinates Tagged Successfully",
    consentTitle: "Indigenous Knowledge Protection & Consent",
    consentStatement: "I confirm that this traditional knowledge is contributed with informed consent under the Afretec Research Consortium Ethical Framework, respecting intellectual heritage and collaborative benefit sharing.",
    submitButton: "Submit Knowledge Entry",
    savedToOfflineQueue: "Stored safely in local offline cache. Will auto-sync when cellular or Wi-Fi reconnects.",

    syncEngineHeader: "Offline Data Cache & Delta Sync Engine",
    syncEngineSub: "Reliable background synchronization engineered for rural, low-bandwidth African healthcare settings.",
    syncNowButton: "Run Delta Sync Now",
    syncInProgress: "Synchronizing delta records with consortium servers...",
    deltaSyncExplanation: "Delta Sync transmits only modified or newly created records, compressing photos (<300KB) and voice notes (Opus/AAC) to conserve precious rural cellular data.",
    queuedItemsCount: "Entries currently waiting in local offline storage",
    dataCompressedNotice: "Bandwidth saved via client-side compression",
    syncLogTitle: "Synchronization Activity History",

    researcherHeader: "UniLag & AASTU Research Consortium Portal",
    reviewSubmissions: "Field Submissions Awaiting Botanical Review",
    approveButton: "Verify & Approve",
    flagButton: "Request Clarification",
    exportCsv: "Export Dataset (CSV)",
    exportJson: "Export Full Taxonomy (JSON)",
    analyticsHeader: "Consortium Telecommunication & Catalog Analytics"
  },

  am: {
    appTitle: "የአፍሪቴክ ባህላዊ መድኃኒት",
    appSubtitle: "የሀገር በቀል ዕፅዋት ዕውቀት ማከማቻ እና የድንበር አቋራጭ ልውውጥ",
    consortiumName: "የአፍሪቴክ የምርምር ጥምረት",
    partnershipTag: "የላጎስ ዩኒቨርሲቲ (ናይጄሪያ) እና የአዲስ አበባ ሳይንስና ቴክኖሎጂ ዩኒቨርሲቲ (ኢትዮጵያ)",

    navCatalog: "የዕፅዋት ካታሎግ",
    navComparison: "የድንበር አቋራጭ ንጽጽር",
    navContribute: "ዕውቀት ያጋሩ",
    navSync: "ከመስመር ውጭ ማመሳሰል",
    navResearcher: "የምርምር ፖርታል",

    onlineStatus: "የተገናኘ (ኦንላይን)",
    offlineStatus: "ከመስመር ውጭ (የተቀመጠ መረጃ)",
    offlineModeNotice: "ከመስመር ውጭ እየሰሩ ነው፡ የተቀመጡትን የዕፅዋት መረጃዎች ማየት ይችላሉ። የሚመዘግቡት መረጃ ኢንተርኔት ሲገኝ በራሱ ይላካል።",
    simulatedOffline: "ወደ ከመስመር ውጭ ቀይር",
    simulatedOnline: "ወደ መስመር ላይ ቀይር",
    lastSynced: "የመጨረሻ ማመሳሰል",
    pendingSync: "ያልተላኩ መረጃዎች",

    rolePractitioner: "ባህላዊ ፈዋሽ / አዋቂ",
    roleIntermediary: "የማህበረሰብ ረዳት ወጣት",
    roleResearcher: "ተመራማሪ (አ.አ.ሳ.ቴ.ዩ / ዩኒላግ)",
    switchRole: "የተጠቃሚ ሚና ቀይር",

    searchPlaceholder: "በዕፅዋቱ ስም (ግራዋ፣ ኮሶ፣ ድንግተኛ)፣ በህመም ወይም በእንግሊዝኛ ይፈልጉ...",
    filterAll: "ሁሉም ዕፅዋት",
    filterShared: "በሁለቱም ሀገራት የሚገኙ",
    filterNigeria: "ናይጄሪያ (ዩኒላግ)",
    filterEthiopia: "ኢትዮጵያ (አ.አ.ሳ.ቴ.ዩ)",
    partsUsedTitle: "ጥቅም ላይ የሚውሉ ክፍሎች",
    ailmentsTitle: "የሚታከሙ ህመሞች",
    playAudioDesc: "በድምፅ ያዳምጡ",
    pauseAudioDesc: "ድምፅ አቁም",
    viewDetails: "ሙሉ ዝርዝር እይ",
    compareButton: "የኢትዮጵያ እና ናይጄሪያ ንጽጽር",

    botanicalName: "ሳይንሳዊ (ቦታኒካል) ስም",
    commonName: "የተለመደ ስም",
    localNamesTitle: "የአገር ውስጥ ስሞች (አማርኛ፣ ኦሮምኛ፣ ዮሩባ)",
    preparationTitle: "የአዘገጃጀት ቅደም ተከተል",
    dosageTitle: "የመጠን እና የአወሳሰድ መመሪያ",
    contraindicationsTitle: "ጥንቃቄ እና ማስጠንቀቂያ",
    dosageAdministration: "አወሳሰድ",
    conservationStatusTitle: "የዕፅዋቱ ክምችት ሁኔታ",
    audioGuideTitle: "የአዋቂዎች የድምፅ መመሪያ",
    verifiedByResearcher: "በተመራማሪዎች የተረጋገጠ",

    comparisonHeader: "የድንበር አቋራጭ የዕፅዋት ንጽጽር",
    comparisonSub: "ተመሳሳይ ዕፅዋት በኢትዮጵያ እና በናይጄሪያ እንዴት እንደሚዘጋጁ እና እንደሚወሰዱ የሚያሳይ ጥናት።",
    selectPlantToCompare: "የሚነፃፀረውን የጋራ ዕፅዋት ይምረጡ:",
    nigeriaUniLagColumn: "ናይጄሪያ — የላጎስ ዩኒቨርሲቲ (UniLag)",
    ethiopiaAastuColumn: "ኢትዮጵያ — አዲስ አበባ ሳይንስና ቴክኖሎጂ (AASTU)",
    clinicalConcordance: "የልምድ እና የአጠቃቀም ስምምነት ደረጃ",
    sharedSpeciesBadge: "የጋራ የአፍሪካ ዕፅዋት",
    regionalDifferences: "የአጠቃቀም ልዩነቶች",
    preparationContrast: "የአዘገጃጀት እና የመጠን ንጽጽር",

    contributeHeader: "የባህላዊ ዕውቀት ማበርከቻ",
    contributeSub: "ለባህላዊ ፈዋሾች እና ወጣት ረዳቶች የተዘጋጀ ቀላል መመሪያ።",
    step1Title: "1. የዕፅዋቱ መረጃ እና ፎቶ",
    step2Title: "2. ክፍሎች እና አዘገጃጀት",
    step3Title: "3. በድምፅ መቅዳት",
    step4Title: "4. የሚገኝበት ቦታ (GPS)",
    step5Title: "5. የስምምነት ማረጋገጫ",
    plantPhotoPrompt: "የዕፅዋቱን ፎቶ ያንሱ ወይም ከመሳሪያዎ ይምረጡ",
    takePhoto: "ፎቶ አንሳ",
    uploadPhoto: "ፎቶ ምረጥ",
    plantNameField: "የዕፅዋቱ ስም",
    localNameField: "የአገር ውስጥ ስም (አማርኛ / ኦሮምኛ)",
    selectPartsUsed: "ጥቅም ላይ የሚውለውን ክፍል ይምረጡ:",
    preparationStepsField: "የአዘገጃጀት ቅደም ተከተል (ማፍላት፣ መደቆስ፣ ዱቄት):",
    dosageField: "የመጠን መመሪያ እና ጥንቃቄ:",
    ailmentsField: "የሚታከሙ ህመሞች ወይም ምልክቶች:",
    recordVoiceNotePrompt: "ለአረጋውያን እንዲረዳ በድምፅዎ መመሪያ ይቅረጹ:",
    startRecording: "ድምፅ መቅዳት ጀምር",
    stopRecording: "መቅዳት አቁም እና አስቀምጥ",
    playingVoiceNote: "የተቀዳው ድምፅ እየተደመጠ ነው",
    gpsTaggingPrompt: "ዕፅዋቱ የሚገኝበትን መልክዓ ምድራዊ ቦታ መዝግብ:",
    fetchGps: "የአሁኑን የቦታ መጋጠሚያ ውሰድ",
    gpsCaptured: "ቦታው በተሳካ ሁኔታ ተመዝግቧል",
    consentTitle: "የባህላዊ ዕውቀት ጥበቃ እና ስምምነት",
    consentStatement: "ይህንን ባህላዊ ዕውቀት በአፍሪቴክ የምርምር መመሪያ መሰረት የሀገር በቀል ባለቤትነትን እና የጋራ ጥቅምን በማክበር ፈቅጄ ያጋራሁ መሆኔን አረጋግጣለሁ።",
    submitButton: "መረጃውን መዝግብ",
    savedToOfflineQueue: "መረጃው በስልክዎ ላይ ተቀምጧል። ኢንተርኔት ሲያገኙ በራሱ ወደ ማዕከል ይላካል።",

    syncEngineHeader: "ከመስመር ውጭ ማከማቻ እና ማመሳሰያ (Delta Sync)",
    syncEngineSub: "በገጠር አካባቢ ዝቅተኛ የኢንተርኔት ፍጥነት ላላቸው ቦታዎች የተዘጋጀ።",
    syncNowButton: "አሁን አመሳስል",
    syncInProgress: "መረጃዎች ወደ ማዕከላዊ አገልጋይ እየተላኩ ነው...",
    deltaSyncExplanation: "ይህ አሰራር አዳዲስ የተቀየሩ መረጃዎችን ብቻ በመላክ እና ፎቶዎችን አሳንሶ በመላክ የሞባይል ዳታ ይቆጥባል።",
    queuedItemsCount: "በስልኩ ላይ ተቀምጠው መላክ የሚጠብቁ",
    dataCompressedNotice: "በመረጃ ማሳነስ የዳነ የኢንተርኔት መጠን",
    syncLogTitle: "የቅርብ ጊዜ የማመሳሰል ታሪክ",

    researcherHeader: "የአ.አ.ሳ.ቴ.ዩ እና ዩኒላግ የምርምር ጥምረት ፖርታል",
    reviewSubmissions: "ከተጠቃሚዎች የተላኩ ማረጋገጫ የሚጠብቁ መረጃዎች",
    approveButton: "አረጋግጥ እና ፍቀድ",
    flagButton: "ማብራሪያ ጠይቅ",
    exportCsv: "መረጃ በCSV አውርድ",
    exportJson: "ሙሉ መረጃ በJSON አውርድ",
    analyticsHeader: "የጥምረቱ የቴሌኮሙኒኬሽን እና የመረጃ ትንተና"
  },

  yo: {
    appTitle: "Afretec Ìṣègùn Ìbílẹ̀",
    appSubtitle: "Ibùdó Ìmọ̀ Ewé Ìbílẹ̀ àti Ìfọ̀rọ̀wérọ̀ Lára Ìlú sí Ìlú",
    consortiumName: "Àjọ Ìwádìí Afretec",
    partnershipTag: "Yunifásítì Èkó (UniLag, Nàìjíríà) àti Yunifásítì Sayensi àti Ẹ̀rọ Addis Ababa (AASTU, Ethiopia)",

    navCatalog: "Àkójọ Ewé",
    navComparison: "Ìfiwéra Láàrín Ìlú",
    navContribute: "Ṣe Àkọsílẹ̀ Ewé",
    navSync: "Ìṣiṣẹ́pọ̀ Láìsí Íńtánẹ́ẹ̀tì",
    navResearcher: "Gbọ̀ngàn Ìwádìí",

    onlineStatus: "Íńtánẹ́ẹ̀tì Wà (Orí Íńtánẹ́ẹ̀tì)",
    offlineStatus: "Láìsí Íńtánẹ́ẹ̀tì (Àpamọ́ Lóko)",
    offlineModeNotice: "Ẹ ń lo ètò yí láìsí íńtánẹ́ẹ̀tì: Ẹ lè wo àwọn ewé tí a ti fi pamọ́. Gbogbo nǹkan tí ẹ bá kọ yóò wọ orí íńtánẹ́ẹ̀tì nígbà tí ìsopọ̀ bá padà dé.",
    simulatedOffline: "Yípadà sí Lílò Láìsí Íńtánẹ́ẹ̀tì",
    simulatedOnline: "Yípadà sí Lílò Pẹ̀lú Íńtánẹ́ẹ̀tì",
    lastSynced: "Ìmúdọ́gba Tó Gbẹ̀yìn",
    pendingSync: "Àwọn Tó Ń Dúró Láti Lọ",

    rolePractitioner: "Oníṣègùn Ìbílẹ̀ / Babaláwo",
    roleIntermediary: "Ọ̀dọ́ Olùrànlọ́wọ́ Àwùjọ",
    roleResearcher: "Olùwádìí Ilé-Ẹ̀kọ́ Gíga (UniLag / AASTU)",
    switchRole: "Yí Ipa Olùlò Padà",

    searchPlaceholder: "Wá orúkọ ewé (Ewúro, Ẹfinrin), àìsàn tàbí orúkọ sayensi...",
    filterAll: "Gbogbo Ewé",
    filterShared: "Àwọn Tó Wà Ní Ìlú Méjèèjì",
    filterNigeria: "Nàìjíríà (UniLag)",
    filterEthiopia: "Ethiopia (AASTU)",
    partsUsedTitle: "Àwọn Ẹ̀yà Tó Wúlò",
    ailmentsTitle: "Àwọn Àìsàn Tí Ó Ń Wò",
    playAudioDesc: "Gbọ́ ní Ohùn",
    pauseAudioDesc: "Dá Ohùn Dúró",
    viewDetails: "Wo Kíkún",
    compareButton: "Fiwéra Nàìjíríà àti Ethiopia",

    botanicalName: "Orúkọ Sayensi (Botanical)",
    commonName: "Orúkọ Gbogbogbò",
    localNamesTitle: "Àwọn Orúkọ Ìbílẹ̀ (Yorùbá, Amharic, Oromo, Hausa)",
    preparationTitle: "Bí A Ṣe Ń Pèsè Rẹ̀",
    dosageTitle: "Bí A Ṣe Ń Lò Ó àti Ìwọ̀n Rẹ̀",
    contraindicationsTitle: "Ìkìlọ̀ àti Àwọn Tí Kò Gbọdọ̀ Lò Ó",
    dosageAdministration: "Ìlò Rẹ̀",
    conservationStatusTitle: "Iye Rẹ̀ Ní Ìgbẹ́",
    audioGuideTitle: "Gbígbọ́ Ohùn Àwọn Àgbàlágbà",
    verifiedByResearcher: "Àwọn Olùwádìí Ilé-Ẹ̀kọ́ Ti Fọwọ́ Sí I",

    comparisonHeader: "Ìfiwéra Ewé Láàrín Nàìjíríà àti Ethiopia",
    comparisonSub: "Àyẹ̀wò bí a ṣe ń lo ewé kan náà fún ìwòsàn ní ilẹ̀ Yorùbá àti ní ilẹ̀ Ethiopia.",
    selectPlantToCompare: "Yan ewé tí ó wà ní ilẹ̀ méjèèjì láti fiwéra:",
    nigeriaUniLagColumn: "Nàìjíríà — Yunifásítì Èkó (UniLag)",
    ethiopiaAastuColumn: "Ethiopia — Addis Ababa Science & Tech (AASTU)",
    clinicalConcordance: "Ìbáramu Lílò Ìbílẹ̀ àti Sayensi",
    sharedSpeciesBadge: "Ewé Tó Wà Ní Ìlú Méjèèjì",
    regionalDifferences: "Ìyàtọ̀ Ìbílẹ̀ Láàrín Wọn",
    preparationContrast: "Ìyàtọ̀ Ìpèsè àti Ìwọ̀n Lílò",

    contributeHeader: "Ìkójọpọ̀ Ìmọ̀ Oníṣègùn",
    contributeSub: "Ọ̀nà ìrọ̀rùn fún àwọn oníṣègùn àti àwọn ọ̀dọ́ olùrànlọ́wọ́.",
    step1Title: "1. Àkọsílẹ̀ Ewé àti Àwòrán",
    step2Title: "2. Àwọn Ẹ̀yà àti Ìpèsè",
    step3Title: "3. Gbígba Ohùn Sínú Ẹ̀rọ",
    step4Title: "4. Ibùdó Ìbì Tí A Ti Rí I (GPS)",
    step5Title: "5. Ìfọwọ́sí Àdéhùn Àṣà",
    plantPhotoPrompt: "Ya àwòrán ewé tàbí yan láti inú ẹ̀rọ",
    takePhoto: "Ya Àwòrán",
    uploadPhoto: "Yan Àwòrán",
    plantNameField: "Orúkọ Ewé",
    localNameField: "Orúkọ Ìbílẹ̀ (Yorùbá)",
    selectPartsUsed: "Yan àwọn ẹ̀yà ewé tí a já:",
    preparationStepsField: "Bí a ṣe ń pèsè rẹ̀ (àgbọ, ìrẹ́, ẹ̀tù):",
    dosageField: "Ìwọ̀n lílò àti àwọn ìkìlọ̀:",
    ailmentsField: "Àwọn àìsàn tí a fi ń wò:",
    recordVoiceNotePrompt: "Gba ohùn rẹ sílẹ̀ ní èdè Yorùbá fún àwọn àgbàlágbà:",
    startRecording: "Bẹ̀rẹ̀ Gbígba Ohùn",
    stopRecording: "Dá Ohùn Dúró & Fi Pamọ́",
    playingVoiceNote: "Ohùn tí a gba ń dún lọ́wọ́",
    gpsTaggingPrompt: "Kọ ibi tí ewé náà hù sí (GPS):",
    fetchGps: "Gba Ibùdó GPS Lọ́wọ́lọ́wọ́",
    gpsCaptured: "A Ti Ṣe Àkọsílẹ̀ Ibùdó Pẹ̀lú Àṣeyọrí",
    consentTitle: "Ààbò Ìmọ̀ Ìbílẹ̀ àti Ìfọwọ́sí",
    consentStatement: "Mo jẹ́rìí sí i pé pẹ̀lú ọkàn kan àti ìmọ̀ ni mo fi ń fi ìmọ̀ ìbílẹ̀ yìí sílẹ̀ lábẹ́ àdéhùn Afretec, pẹ̀lú ọ̀wọ̀ fún ogún àwọn baba wa.",
    submitButton: "Fi Àkọsílẹ̀ Ranṣẹ́",
    savedToOfflineQueue: "A ti fi pamọ́ sínú ẹ̀rọ rẹ dáradára. Yóò lọ sí orí íńtánẹ́ẹ̀tì fúnra rẹ̀ nígbà tí ìsopọ̀ bá wà.",

    syncEngineHeader: "Àpamọ́ Lóko àti Ìṣiṣẹ́pọ̀ (Delta Sync)",
    syncEngineSub: "Àgbékalẹ̀ pàtàkì fún àwọn abúlé tí íńtánẹ́ẹ̀tì wọn kò lágbára.",
    syncNowButton: "Ṣe Ìṣiṣẹ́pọ̀ Nísinsìnyí",
    syncInProgress: "Àwọn àkọsílẹ̀ ń lọ sí ibùdó àpapọ̀...",
    deltaSyncExplanation: "Ètò Delta Sync ń fi kìkì àwọn àkọsílẹ̀ tuntun ranṣẹ́ pẹ̀lú rírún àwọn fọ́tò (<300KB) àti ohùn kéré kí ó má baà lo owó púpọ̀ lórí dátà.",
    queuedItemsCount: "Àwọn àkọsílẹ̀ tó ń dúró nínú ẹ̀rọ",
    dataCompressedNotice: "Dátà tí a gbà là nípa rírún àwọn fọ́tò",
    syncLogTitle: "Ìtàn Àwọn Ìṣiṣẹ́pọ̀ Tó Kọjá",

    researcherHeader: "Gbọ̀ngàn Àjọ Ìwádìí UniLag àti AASTU",
    reviewSubmissions: "Àwọn Àkọsílẹ̀ Látọ̀dọ̀ Àwọn Oníṣègùn Tó Ń Dúró",
    approveButton: "Jẹ́rìí & Gbà Wọlé",
    flagButton: "Béèrè Àlàyé Síi",
    exportCsv: "Gba Kíkún Sílẹ̀ (CSV)",
    exportJson: "Gba Kíkún Sílẹ̀ (JSON)",
    analyticsHeader: "Àkópọ̀ Ìwádìí àti Ìṣirò Ìgbékalẹ̀"
  }
};
