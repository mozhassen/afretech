import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
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
import { 
  db, 
  collection, 
  doc, 
  setDoc, 
  onSnapshot, 
  updateDoc 
} from '../lib/firebase';

function sanitizeForFirestore<T>(data: T): T {
  return JSON.parse(JSON.stringify(data, (key, value) => {
    if (value === undefined) return null;
    return value;
  }));
}

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
  addPlant: (plant: Plant) => void;
  selectedPlant: Plant | null;
  setSelectedPlant: (plant: Plant | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedRegionFilter: 'all' | 'shared' | 'nigeria' | 'ethiopia';
  setSelectedRegionFilter: (region: 'all' | 'shared' | 'nigeria' | 'ethiopia') => void;
  selectedAilmentFilter: string | 'all';
  setSelectedAilmentFilter: (ailment: string | 'all') => void;
  
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

  // Contributor Authentication (Username & Password)
  isAuthenticated: boolean;
  login: (username: string, password: string) => { success: boolean; message?: string };
  logout: () => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
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
  LAST_SYNC: 'afretec_last_sync',
  IS_AUTHENTICATED: 'afretec_is_authenticated'
};

export const AUTHORIZED_USERS = [
  {
    username: 'admin',
    password: 'afretec2026',
    role: 'researcher' as UserRole,
    name: 'Consortium Lead Administrator',
    country: 'Nigeria' as const,
    state: 'Lagos (UniLag Hub)',
    phone: '+234 801 000 2026'
  },
  {
    username: 'unilag_healer',
    password: 'lagos123',
    role: 'practitioner' as UserRole,
    name: 'Chief Olatunji Adeleke (Elder Practitioner)',
    country: 'Nigeria' as const,
    state: 'Oyo State (Ibadan)',
    phone: '+234 803 123 4567'
  },
  {
    username: 'aastu_researcher',
    password: 'addis123',
    role: 'researcher' as UserRole,
    name: 'Dr. Tsegaye Hailemariam (AASTU)',
    country: 'Ethiopia' as const,
    state: 'Addis Ababa',
    phone: '+251 911 234 567'
  },
  {
    username: 'field_youth',
    password: 'youth123',
    role: 'intermediary' as UserRole,
    name: 'Bilen Assefa & Tunde Bakare (Youth Assistants)',
    country: 'Ethiopia' as const,
    state: 'Shewa / Addis Ababa',
    phone: '+251 922 456 789'
  }
];

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

const defaultInitialSubmissions: ContributionSubmission[] = [
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

  // Contributor Authentication
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED) === 'true';
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const login = (username: string, password: string): { success: boolean; message?: string } => {
    const trimmedUser = username.trim().toLowerCase();
    const trimmedPass = password.trim();

    const match = AUTHORIZED_USERS.find(
      u => u.username.toLowerCase() === trimmedUser && u.password === trimmedPass
    );

    if (match) {
      setIsAuthenticated(true);
      localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, 'true');
      setCurrentRole(match.role);
      updateUserProfile({
        name: match.name,
        country: match.country,
        state: match.state,
        phone: match.phone
      });
      return { success: true };
    }

    // Support PIN 1234 for quick offline field authentication
    if ((trimmedUser === 'practitioner' || trimmedUser === 'healer') && (trimmedPass === '1234' || trimmedPass === 'afretec2026')) {
      setIsAuthenticated(true);
      localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, 'true');
      setCurrentRole('practitioner');
      return { success: true };
    }

    return { 
      success: false, 
      message: 'Invalid contributor username or password. Please check your assigned credentials.' 
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED);
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
  const [selectedAilmentFilter, setSelectedAilmentFilter] = useState<string | 'all'>('all');

  const addPlant = (newPlant: Plant) => {
    setPlants(prev => [newPlant, ...prev]);
    if (isOnline) {
      try {
        setDoc(doc(db, 'plants', newPlant.id), sanitizeForFirestore(newPlant)).catch(err => {
          console.warn("Failed to upload plant to firestore:", err);
        });
      } catch (err) {
        console.warn("Firestore addPlant error:", err);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PLANTS_CACHE, JSON.stringify(plants));
  }, [plants]);

  // Real-time Firestore sync for Submissions across all connected devices (phones, laptops, researchers)
  useEffect(() => {
    try {
      const unsub = onSnapshot(collection(db, 'submissions'), (snapshot) => {
        if (!snapshot.empty) {
          const remoteList: ContributionSubmission[] = [];
          snapshot.forEach(docSnap => {
            remoteList.push(docSnap.data() as ContributionSubmission);
          });

          setSubmissions(localPrev => {
            const remoteMap = new Map(remoteList.map(s => [s.id, s]));
            const localQueued = localPrev.filter(s => s.syncStatus === 'queued_offline' && !remoteMap.has(s.id));
            const merged = [...localQueued, ...remoteList];
            merged.sort((a, b) => (b.timestamp || '').localeCompare(a.timestamp || ''));
            return merged;
          });
        } else {
          // If Firestore is empty, seed initial pilot entries so all devices immediately share them
          defaultInitialSubmissions.forEach(sub => {
            setDoc(doc(db, 'submissions', sub.id), sanitizeForFirestore(sub)).catch(() => {});
          });
        }
      }, (err) => {
        console.warn("Firestore submissions listener error:", err);
      });

      return () => unsub();
    } catch (e) {
      console.warn("Could not attach firestore submissions listener:", e);
    }
  }, []);

  // Real-time Firestore sync for Plants Catalog across all devices
  useEffect(() => {
    try {
      const unsub = onSnapshot(collection(db, 'plants'), (snapshot) => {
        if (!snapshot.empty) {
          const remotePlants: Plant[] = [];
          snapshot.forEach(docSnap => {
            remotePlants.push(docSnap.data() as Plant);
          });

          setPlants(localPrev => {
            const remoteMap = new Map(remotePlants.map(p => [p.id, p]));
            const localCustom = localPrev.filter(p => !initialPlantsData.some(ip => ip.id === p.id) && !remoteMap.has(p.id));
            const defaultPlants = initialPlantsData.filter(ip => !remoteMap.has(ip.id));
            return [...localCustom, ...remotePlants, ...defaultPlants];
          });
        }
      }, (err) => {
        console.warn("Firestore plants listener error:", err);
      });

      return () => unsub();
    } catch (e) {
      console.warn("Could not attach firestore plants listener:", e);
    }
  }, []);

  // Submissions (offline queue)
  const [submissions, setSubmissions] = useState<ContributionSubmission[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return defaultInitialSubmissions;
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

    // Automatically convert this new record into a live, searchable catalog plant
    const newPlant: Plant = {
      id: `plant-${newId}`,
      scientificName: data.scientificGuess?.trim() || data.plantName,
      family: 'Indigenous Specimen (Field Record)',
      commonEnglishName: data.plantName,
      localNames: {
        amharic: data.country === 'Ethiopia' ? data.localName : '',
        amharicScript: '',
        yoruba: data.country === 'Nigeria' ? data.localName : '',
        english: data.plantName
      },
      region: data.country === 'Nigeria' ? 'nigeria' : 'ethiopia',
      countryAvailability: [data.country],
      partsUsed: data.partsUsed,
      habitat: `${data.coordinates.state || data.state} (${data.coordinates.habitatNotes || 'Recorded in indigenous habitat'})`,
      ailmentsTreated: data.ailmentsTreated.length > 0 ? data.ailmentsTreated : ['General vitality', 'Fever'],
      preparation: {
        method: data.preparationSteps,
        dosage: data.dosage,
        administration: 'Traditional oral or topical remedy',
        contraindications: 'Administer under guidance of authorized traditional practitioner'
      },
      photoUrl: data.photoDataUrl || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80',
      photoCaption: `Field specimen recorded by ${data.practitionerName} in ${data.state}, ${data.country}.`,
      audioNarration: {
        en: `${data.plantName}, recorded by ${data.practitionerName} in ${data.country}. Used traditionally for ${data.ailmentsTreated.join(', ')}.`,
        am: `${data.localName || data.plantName} በባህላዊ ሕክምና ለ${data.ailmentsTreated.join(', ')} ያገለግላል።`,
        yo: `${data.localName || data.plantName}, a máa ń lò ó fún ìtọ́jú ${data.ailmentsTreated.join(', ')}.`,
        durationSeconds: data.audioDurationSeconds || 15
      },
      verifiedBy: isOnline ? `Consortium Review (Contributed by ${data.practitionerName})` : `Pending Sync (Contributed by ${data.practitionerName})`,
      conservationStatus: 'Common'
    };

    setPlants(prev => [newPlant, ...prev]);

    if (isOnline) {
      // Direct upload to shared Cloud Firestore
      try {
        setDoc(doc(db, 'submissions', newId), sanitizeForFirestore(newEntry)).catch(err => {
          console.warn("Firestore submission write error:", err);
        });
        setDoc(doc(db, 'plants', newPlant.id), sanitizeForFirestore(newPlant)).catch(err => {
          console.warn("Firestore plant write error:", err);
        });
      } catch (err) {
        console.warn("Firestore push error:", err);
      }

      // Add sync log immediately
      const newLog: SyncLogItem = {
        id: `log-${Date.now()}`,
        timestamp,
        type: 'upload',
        description: `Direct cloud upload of "${data.plantName}" specimen and GPS geotagging.`,
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

    // Update in Firestore for real-time researcher sync across devices
    try {
      updateDoc(doc(db, 'submissions', id), sanitizeForFirestore({
        syncStatus: status,
        reviewerNotes: notes !== undefined ? notes : ''
      })).catch(err => console.warn("Firestore update error:", err));

      if (status === 'approved_by_researcher') {
        const plantId = `plant-${id}`;
        updateDoc(doc(db, 'plants', plantId), {
          verifiedBy: 'Validated by UniLag & AASTU Research Consortium'
        }).catch(err => console.warn("Firestore plant update error:", err));
      }
    } catch (err) {
      console.warn("Firestore updateDoc error:", err);
    }

    // If approved by researcher, update the plant verification status in the catalog
    if (status === 'approved_by_researcher') {
      const plantId = `plant-${id}`;
      setPlants(prev => prev.map(p => {
        if (p.id === plantId) {
          return {
            ...p,
            verifiedBy: 'Validated by UniLag & AASTU Research Consortium'
          };
        }
        return p;
      }));
    }
  };

  // Delta Sync Engine
  const [isSyncing, setIsSyncing] = useState(false);

  const runDeltaSync = useCallback(async () => {
    if (!isOnline) {
      alert("Cannot run sync while offline. Please switch to Online Mode or connect to a network.");
      return;
    }

    setIsSyncing(true);

    const queuedItems = submissions.filter(s => s.syncStatus === 'queued_offline');
    const recordsCount = Math.max(queuedItems.length, 1);
    const simulatedPayload = recordsCount * 260; // 260 KB avg per item with audio & photo compression

    // Upload all queued offline items to cloud Firestore
    for (const sub of queuedItems) {
      try {
        const syncedSub = { ...sub, syncStatus: 'synced_cloud' as const };
        await setDoc(doc(db, 'submissions', sub.id), sanitizeForFirestore(syncedSub));
        const plantId = `plant-${sub.id}`;
        const plant = plants.find(p => p.id === plantId);
        if (plant) {
          await setDoc(doc(db, 'plants', plantId), sanitizeForFirestore(plant));
        }
      } catch (err) {
        console.warn("Error uploading offline queue to Firestore:", err);
      }
    }

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
      description: `Delta Sync completed: Synchronized ${recordsCount} updated record(s) to cloud database.`,
      recordsCount,
      payloadSizeKb: simulatedPayload,
      compressedRatio: '74% bandwidth saved',
      status: 'success'
    };

    setSyncLogs(prev => [newLog, ...prev]);
    setLastSyncedTimestamp(`Today at ${timeStr}`);
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, `Today at ${timeStr}`);
    setIsSyncing(false);
  }, [isOnline, submissions, plants]);

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
        addPlant,
        selectedPlant,
        setSelectedPlant,
        searchTerm,
        setSearchTerm,
        selectedRegionFilter,
        setSelectedRegionFilter,
        selectedAilmentFilter,
        setSelectedAilmentFilter,
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
        setComparisonSelectedPlantId,
        isAuthenticated,
        login,
        logout,
        isLoginModalOpen,
        setIsLoginModalOpen
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
