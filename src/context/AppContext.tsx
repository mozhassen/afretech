import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  Language, 
  UserRole, 
  UserProfile, 
  Plant, 
  ContributionSubmission, 
  SyncLogItem 
} from '../types';
import { initialPlantsData } from '../data/plantsData';
import { translations, TranslationSchema } from '../data/translations';

interface AppContextType {
  // Localization
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSchema;

  // User Profile & Role
  currentUser: UserProfile;
  setCurrentRole: (role: UserRole) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // Network & Offline Status
  isOnline: boolean;
  toggleNetworkStatus: () => void;
  lastSyncedTimestamp: string;

  // Botanical Plants Catalog
  plants: Plant[];
  selectedPlant: Plant | null;
  setSelectedPlant: (plant: Plant | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedRegionFilter: 'all' | 'shared' | 'nigeria' | 'ethiopia';
  setSelectedRegionFilter: (region: 'all' | 'shared' | 'nigeria' | 'ethiopia') => void;
  
  // Practitioner Submissions & Offline Queue
  submissions: ContributionSubmission[];
  addSubmission: (submission: Omit<ContributionSubmission, 'id' | 'timestamp' | 'syncStatus'>) => Promise<string>;
  updateSubmissionStatus: (id: string, status: ContributionSubmission['syncStatus'], notes?: string) => void;
  
  // Delta Sync Engine
  isSyncing: boolean;
  runDeltaSync: () => Promise<void>;
  syncLogs: SyncLogItem[];
  pendingQueueCount: number;
  totalBytesSavedKb: number;

  // Voice Narration & Audio Playback
  isPlayingAudio: boolean;
  activeAudioPlantId: string | null;
  playPlantAudio: (plant: Plant) => void;
  stopPlantAudio: () => void;
  speakText: (text: string, lang?: Language) => void;

  // Active View Tab
  activeTab: 'catalog' | 'comparison' | 'contribute' | 'sync' | 'researcher';
  setActiveTab: (tab: 'catalog' | 'comparison' | 'contribute' | 'sync' | 'researcher') => void;
  openCompareForPlant: (plantId: string) => void;
  comparisonSelectedPlantId: string;
  setComparisonSelectedPlantId: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LANGUAGE: 'afretec_lang',
  ROLE: 'afretec_user_role',
  USER_PROFILE: 'afretec_user_profile',
  OFFLINE_MODE: 'afretec_is_offline',
  SUBMISSIONS: 'afretec_submissions',
  SYNC_LOGS: 'afretec_sync_logs',
  PLANTS_CACHE: 'afretec_plants_cache',
  LAST_SYNC: 'afretec_last_sync'
};

const DEFAULT_USER: UserProfile = {
  id: 'user-001',
  name: 'Chief Olatunji Adeleke & Ato Hailu Tesfaye',
  role: 'practitioner',
  phone: '+234 803 123 4567',
  pin: '1234',
  country: 'Nigeria',
  state: 'Oyo State (Ibadan)',
  language: 'en',
  specialization: 'Herbal Medicine & Phytotherapy'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    return (saved === 'am' || saved === 'yo' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  };

  const t = translations[language];

  // User Profile
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return DEFAULT_USER;
  });

  const setCurrentRole = (role: UserRole) => {
    let updatedName = currentUser.name;
    let updatedSpecialization = currentUser.specialization;
    if (role === 'practitioner') {
      updatedName = 'Alagba Olatunji Adeleke (Elder Healer)';
      updatedSpecialization = 'Traditional Phytotherapy & Bonesetting';
    } else if (role === 'intermediary') {
      updatedName = 'Bilen Assefa & Tunde Bakare (Youth Assistants)';
      updatedSpecialization = 'Digital Field Data Capture & Telecommunications';
    } else if (role === 'researcher') {
      updatedName = 'Dr. O. Adebayo (UniLag) & Dr. T. Hailemariam (AASTU)';
      updatedSpecialization = 'Pharmacognosy & Indigenous Knowledge Systems';
    }

    const updated = { ...currentUser, role, name: updatedName, specialization: updatedSpecialization };
    setCurrentUser(updated);
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updated));
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setCurrentUser(prev => {
      const updated = { ...prev, ...profile };
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updated));
      return updated;
    });
  };

  // Online / Offline state (supports simulating rural offline mode)
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.OFFLINE_MODE);
    return saved !== 'true';
  });

  const toggleNetworkStatus = () => {
    setIsOnline(prev => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEYS.OFFLINE_MODE, (!next).toString());
      return next;
    });
  };

  const [lastSyncedTimestamp, setLastSyncedTimestamp] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.LAST_SYNC) || 'Today, 10:45 AM';
  });

  // Plants Catalog
  const [plants, setPlants] = useState<Plant[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PLANTS_CACHE);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return initialPlantsData;
  });

  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<'all' | 'shared' | 'nigeria' | 'ethiopia'>('all');

  // Submissions (offline queue)
  const [submissions, setSubmissions] = useState<ContributionSubmission[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    // Pre-populate with realistic field submissions from UniLag and AASTU field pilots
    return [
      {
        id: 'sub-pilot-01',
        timestamp: '2026-09-04 14:20',
        practitionerName: 'Mama Folashade Ogundipe',
        practitionerPhone: '+234 802 884 1120',
        intermediaryAssisted: true,
        intermediaryName: 'Kehinde O. (UniLag Youth Intermediary)',
        country: 'Nigeria',
        state: 'Ogun State (Abeokuta North)',
        plantName: 'Tetrapleura tetraptera (Aidan)',
        localName: 'Èso Àìdán (Yorùbá)',
        scientificGuess: 'Tetrapleura tetraptera',
        partsUsed: ['seeds', 'bark'],
        preparationSteps: 'The dried fruit pod is chopped into segments and boiled with local spices for post-partum cleansing, uterine involution, and reducing infantile fever spasms.',
        dosage: 'Half a cup of decoction morning and evening for 5 days after delivery.',
        ailmentsTreated: ['Postpartum Recovery', 'Infantile Convulsions', 'Hypertension'],
        coordinates: {
          lat: 7.1557,
          lng: 3.3489,
          accuracyMeters: 4.2,
          state: 'Ogun State',
          country: 'Nigeria',
          habitatNotes: 'Moist lowland deciduous forest boundary near farm settlement.'
        },
        consentAgreed: true,
        syncStatus: 'approved_by_researcher',
        reviewerNotes: 'Validated by UniLag Pharmacognosy Lab. Rich in saponins and coumarins.'
      },
      {
        id: 'sub-pilot-02',
        timestamp: '2026-09-05 08:35',
        practitionerName: 'Ato Girma Wolde',
        practitionerPhone: '+251 911 445 229',
        intermediaryAssisted: true,
        intermediaryName: 'Meklit D. (AASTU Telecomm Assistant)',
        country: 'Ethiopia',
        state: 'Shewa (Debre Berhan)',
        plantName: 'Ruta chalepensis (Tena Adam)',
        localName: 'ጤና አዳም (Tena Adam)',
        scientificGuess: 'Ruta chalepensis',
        partsUsed: ['leaves', 'seeds'],
        preparationSteps: 'Fresh green twigs steeped in hot Ethiopian coffee or boiled with milk to relieve acute stomach colic and infant respiratory phlegm.',
        dosage: 'One small cup with coffee or 3 tablespoons boiled milk.',
        ailmentsTreated: ['Colic & Stomach Cramps', 'Common Cold', 'Respiratory Congestion'],
        coordinates: {
          lat: 9.6781,
          lng: 39.5328,
          accuracyMeters: 3.8,
          state: 'Amhara / North Shewa',
          country: 'Ethiopia',
          habitatNotes: 'Rocky mountain garden terrace at 2800m altitude.'
        },
        consentAgreed: true,
        syncStatus: 'synced_cloud',
        reviewerNotes: 'Pending secondary cross-referencing with UniLag team.'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
  }, [submissions]);

  // Sync Logs
  const [syncLogs, setSyncLogs] = useState<SyncLogItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SYNC_LOGS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [
      {
        id: 'log-01',
        timestamp: '2026-09-04 16:30',
        type: 'delta_sync',
        description: 'Synchronized 2 plant specimen photos (<300KB) and 1 Opus voice note with UniLag/AASTU server.',
        recordsCount: 3,
        payloadSizeKb: 480,
        compressedRatio: '72% bandwidth saved',
        status: 'success'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SYNC_LOGS, JSON.stringify(syncLogs));
  }, [syncLogs]);

  // Pending queue calculation
  const pendingQueueCount = submissions.filter(s => s.syncStatus === 'queued_offline').length;
  const totalBytesSavedKb = syncLogs.reduce((acc, log) => acc + log.payloadSizeKb * 2.5, 1420);

  // Add a new submission from the practitioner module
  const addSubmission = async (data: Omit<ContributionSubmission, 'id' | 'timestamp' | 'syncStatus'>): Promise<string> => {
    const newId = `sub-${Date.now()}`;
    const now = new Date();
    const timestamp = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0].substring(0, 5)}`;
    
    // Status depends on network connectivity
    const initialStatus = isOnline ? 'synced_cloud' : 'queued_offline';

    const newEntry: ContributionSubmission = {
      ...data,
      id: newId,
      timestamp,
      syncStatus: initialStatus
    };

    setSubmissions(prev => [newEntry, ...prev]);

    if (isOnline) {
      // Add sync log immediately
      const newLog: SyncLogItem = {
        id: `log-${Date.now()}`,
        timestamp,
        type: 'upload',
        description: `Direct upload of "${data.plantName}" specimen and GPS geotagging.`,
        recordsCount: 1,
        payloadSizeKb: 284,
        compressedRatio: '68% compression',
        status: 'success'
      };
      setSyncLogs(prev => [newLog, ...prev]);
    }

    return newId;
  };

  const updateSubmissionStatus = (id: string, status: ContributionSubmission['syncStatus'], notes?: string) => {
    setSubmissions(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          syncStatus: status,
          reviewerNotes: notes !== undefined ? notes : item.reviewerNotes
        };
      }
      return item;
    }));
  };

  // Delta Sync Engine
  const [isSyncing, setIsSyncing] = useState(false);

  const runDeltaSync = useCallback(async () => {
    if (!isOnline) {
      alert("Cannot run sync while offline. Please switch to Online Mode or connect to a network.");
      return;
    }

    setIsSyncing(true);

    // Simulate reliable delta sync transfer delay
    await new Promise(res => setTimeout(res, 1800));

    const queuedItems = submissions.filter(s => s.syncStatus === 'queued_offline');
    const recordsCount = Math.max(queuedItems.length, 1);
    const simulatedPayload = recordsCount * 260; // 260 KB avg per item with audio & photo compression

    setSubmissions(prev => prev.map(sub => {
      if (sub.syncStatus === 'queued_offline') {
        return { ...sub, syncStatus: 'synced_cloud' };
      }
      return sub;
    }));

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newLog: SyncLogItem = {
      id: `log-${Date.now()}`,
      timestamp: `Today at ${timeStr}`,
      type: 'delta_sync',
      description: `Delta Sync completed: Transmitted ${recordsCount} updated record(s), media compressed under 300KB threshold.`,
      recordsCount,
      payloadSizeKb: simulatedPayload,
      compressedRatio: '74% bandwidth saved',
      status: 'success'
    };

    setSyncLogs(prev => [newLog, ...prev]);
    setLastSyncedTimestamp(`Today at ${timeStr}`);
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, `Today at ${timeStr}`);
    setIsSyncing(false);
  }, [isOnline, submissions]);

  // Auto-sync when transitioning from offline to online
  useEffect(() => {
    if (isOnline && pendingQueueCount > 0) {
      runDeltaSync();
    }
  }, [isOnline, pendingQueueCount, runDeltaSync]);

  // Audio Playback & Web Speech synthesis for low-literate elders
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeAudioPlantId, setActiveAudioPlantId] = useState<string | null>(null);

  const stopPlantAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setActiveAudioPlantId(null);
  };

  const playPlantAudio = (plant: Plant) => {
    if (activeAudioPlantId === plant.id && isPlayingAudio) {
      stopPlantAudio();
      return;
    }

    stopPlantAudio();
    setActiveAudioPlantId(plant.id);
    setIsPlayingAudio(true);

    const narrationText = plant.audioNarration[language] || plant.audioNarration.en;

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(narrationText);
      utterance.rate = 0.9; // Slightly slower for elderly comprehension
      utterance.pitch = 1.0;

      // Select matching voice locale if available
      const voices = window.speechSynthesis.getVoices();
      if (language === 'en') {
        const enVoice = voices.find(v => v.lang.startsWith('en-NG') || v.lang.startsWith('en-GB') || v.lang.startsWith('en'));
        if (enVoice) utterance.voice = enVoice;
      }

      utterance.onend = () => {
        setIsPlayingAudio(false);
        setActiveAudioPlantId(null);
      };

      utterance.onerror = () => {
        setIsPlayingAudio(false);
        setActiveAudioPlantId(null);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback timer simulation
      setTimeout(() => {
        setIsPlayingAudio(false);
        setActiveAudioPlantId(null);
      }, (plant.audioNarration.durationSeconds || 10) * 1000);
    }
  };

  const speakText = (text: string, lang = language) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Active Tab navigation
  const [activeTab, setActiveTab] = useState<'catalog' | 'comparison' | 'contribute' | 'sync' | 'researcher'>('catalog');
  const [comparisonSelectedPlantId, setComparisonSelectedPlantId] = useState<string>('plant-vernonia-amygdalina');

  const openCompareForPlant = (plantId: string) => {
    setComparisonSelectedPlantId(plantId);
    setActiveTab('comparison');
    setSelectedPlant(null);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentUser,
        setCurrentRole,
        updateUserProfile,
        isOnline,
        toggleNetworkStatus,
        lastSyncedTimestamp,
        plants,
        selectedPlant,
        setSelectedPlant,
        searchTerm,
        setSearchTerm,
        selectedRegionFilter,
        setSelectedRegionFilter,
        submissions,
        addSubmission,
        updateSubmissionStatus,
        isSyncing,
        runDeltaSync,
        syncLogs,
        pendingQueueCount,
        totalBytesSavedKb,
        isPlayingAudio,
        activeAudioPlantId,
        playPlantAudio,
        stopPlantAudio,
        speakText,
        activeTab,
        setActiveTab,
        openCompareForPlant,
        comparisonSelectedPlantId,
        setComparisonSelectedPlantId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
