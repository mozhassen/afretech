export type UserRole = 'practitioner' | 'intermediary' | 'researcher';

export type Language = 'en' | 'am' | 'yo';

export type PlantRegion = 'nigeria' | 'ethiopia' | 'shared';

export type PlantPart = 
  | 'leaves' 
  | 'roots' 
  | 'bark' 
  | 'seeds' 
  | 'sap' 
  | 'flowers' 
  | 'stem' 
  | 'whole';

export interface PlantPreparation {
  method: string;
  dosage: string;
  administration: string;
  contraindications: string;
  duration?: string;
}

export interface RegionalUsageComparison {
  localName: string;
  localScript?: string;
  partsUsed: PlantPart[];
  uses: string[];
  preparation: string;
  dosage: string;
  contraindications: string;
  practitionerNotes: string;
  institution: 'University of Lagos (UniLag)' | 'Addis Ababa Science and Technology University (AASTU)';
}

export interface ComparativeData {
  concordanceScore: number; // e.g. 85% clinical overlap
  concordanceSummary: string;
  scientificValidationNotes: string;
  nigeria: RegionalUsageComparison;
  ethiopia: RegionalUsageComparison;
}

export interface Plant {
  id: string;
  scientificName: string;
  family: string;
  commonEnglishName: string;
  localNames: {
    amharic: string;
    amharicScript: string;
    yoruba: string;
    oromo?: string;
    hausa?: string;
    english: string;
  };
  region: PlantRegion;
  countryAvailability: ('Nigeria' | 'Ethiopia')[];
  partsUsed: PlantPart[];
  habitat: string;
  ailmentsTreated: string[];
  preparation: PlantPreparation;
  photoUrl: string;
  photoCaption?: string;
  audioNarration: {
    en: string;
    am: string;
    yo: string;
    durationSeconds: number;
  };
  comparativeData?: ComparativeData;
  verifiedBy: string;
  conservationStatus: 'Common' | 'Vulnerable' | 'Endangered' | 'Cultivated';
}

export interface Coordinates {
  lat: number;
  lng: number;
  accuracyMeters?: number;
  state: string;
  country: 'Nigeria' | 'Ethiopia';
  habitatNotes?: string;
}

export interface ContributionSubmission {
  id: string;
  timestamp: string;
  practitionerName: string;
  practitionerPhone: string;
  intermediaryAssisted: boolean;
  intermediaryName?: string;
  country: 'Nigeria' | 'Ethiopia';
  state: string;
  plantName: string;
  localName: string;
  scientificGuess?: string;
  partsUsed: PlantPart[];
  preparationSteps: string;
  dosage: string;
  ailmentsTreated: string[];
  photoDataUrl?: string;
  audioRecordingUrl?: string;
  audioDurationSeconds?: number;
  coordinates: Coordinates;
  consentAgreed: boolean;
  syncStatus: 'queued_offline' | 'syncing' | 'synced_cloud' | 'approved_by_researcher' | 'flagged';
  reviewerNotes?: string;
}

export interface SyncLogItem {
  id: string;
  timestamp: string;
  type: 'upload' | 'download' | 'delta_sync';
  description: string;
  recordsCount: number;
  payloadSizeKb: number;
  compressedRatio: string;
  status: 'success' | 'failed';
}

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  phone: string;
  pin: string;
  country: 'Nigeria' | 'Ethiopia';
  state: string;
  language: Language;
  specialization: string;
  avatarSeed?: string;
}
