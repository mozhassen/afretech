import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PlantPart, Coordinates } from '../types';
import { 
  Camera, 
  Upload, 
  Mic, 
  Square, 
  Play, 
  Pause, 
  MapPin, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Leaf, 
  FileText, 
  WifiOff, 
  AlertCircle,
  HelpCircle,
  Volume2
} from 'lucide-react';

export const ContributeModule: React.FC = () => {
  const { 
    t, 
    currentUser, 
    isOnline, 
    addSubmission, 
    setActiveTab, 
    speakText,
    language 
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccessId, setSubmissionSuccessId] = useState<string | null>(null);

  // Form State
  const [plantName, setPlantName] = useState('');
  const [localName, setLocalName] = useState('');
  const [scientificGuess, setScientificGuess] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [photoFileSizeKb, setPhotoFileSizeKb] = useState<number>(240); // simulated compressed size

  const [selectedParts, setSelectedParts] = useState<PlantPart[]>(['leaves']);
  const [preparationSteps, setPreparationSteps] = useState('');
  const [dosage, setDosage] = useState('');
  const [ailmentsInput, setAilmentsInput] = useState('');

  // Voice recording state (Web Audio / MediaRecorder)
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [isPlayingRecordedAudio, setIsPlayingRecordedAudio] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Geotagging & Habitat
  const [isFetchingGps, setIsFetchingGps] = useState(false);
  const [gpsCoordinates, setGpsCoordinates] = useState<Coordinates>({
    lat: currentUser.country === 'Nigeria' ? 7.3775 : 9.0320,
    lng: currentUser.country === 'Nigeria' ? 3.9470 : 38.7482,
    accuracyMeters: 4.5,
    state: currentUser.state || (currentUser.country === 'Nigeria' ? 'Oyo State' : 'Addis Ababa'),
    country: currentUser.country || 'Nigeria',
    habitatNotes: 'Semi-shaded forest boundary near traditional cultivation plot'
  });
  const [gpsTagged, setGpsTagged] = useState(false);

  // Informed consent
  const [consentAgreed, setConsentAgreed] = useState(false);
  const [isIntermediaryAssisted, setIsIntermediaryAssisted] = useState(
    currentUser.role === 'intermediary'
  );
  const [practitionerPhone, setPractitionerPhone] = useState(currentUser.phone || '+234 803 123 4567');
  const [practitionerName, setPractitionerName] = useState(currentUser.name || 'Traditional Healer');

  // Morphological parts options
  const partsList: { part: PlantPart; label: string; icon: string }[] = [
    { part: 'leaves', label: 'Leaves (Ewé / ቅጠል)', icon: '🍃' },
    { part: 'roots', label: 'Roots (Gbòǹgbò / ሥር)', icon: '🥕' },
    { part: 'bark', label: 'Bark (Èèpo igi / ቅርፊት)', icon: '🪵' },
    { part: 'seeds', label: 'Seeds (Èso / ዘር)', icon: '🌰' },
    { part: 'sap', label: 'Sap / Latex (Oje / ጭማቂ)', icon: '💧' },
    { part: 'flowers', label: 'Flowers (Itànná / አበባ)', icon: '🌸' },
    { part: 'stem', label: 'Stem (Igi / ግንድ)', icon: '🌿' },
    { part: 'whole', label: 'Whole Plant (Ewéko / ሙሉ ዕፅ)', icon: '🌱' }
  ];

  const togglePart = (part: PlantPart) => {
    setSelectedParts(prev => 
      prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]
    );
  };

  // Image Upload handler (with simulated <300KB compression per NFR-4)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      setPhotoPreview(result);
      // Simulate image compression below 300 KB
      setPhotoFileSizeKb(Math.min(Math.round(file.size / 1024 * 0.4), 280));
    };
    reader.readAsDataURL(file);
  };

  // Fallback preset photos if camera not available
  const selectPresetPhoto = (url: string) => {
    setPhotoPreview(url);
    setPhotoFileSizeKb(210);
  };

  // Voice recording logic
  const startVoiceRecording = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm;codecs=opus' });
          const url = URL.createObjectURL(audioBlob);
          setAudioBlobUrl(url);
          // Stop stream tracks
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
        setRecordingDuration(0);

        timerIntervalRef.current = window.setInterval(() => {
          setRecordingDuration(prev => prev + 1);
        }, 1000);
      } else {
        // Fallback simulation
        setIsRecording(true);
        setRecordingDuration(0);
        timerIntervalRef.current = window.setInterval(() => {
          setRecordingDuration(prev => prev + 1);
        }, 1000);
      }
    } catch (err) {
      console.warn("Microphone access simulated:", err);
      // Fallback timer simulation for environments without audio hardware
      setIsRecording(true);
      setRecordingDuration(0);
      timerIntervalRef.current = window.setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    } else {
      // Simulate audio URL if real stream wasn't available
      setAudioBlobUrl('simulated-voice-opus.opus');
    }

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setIsRecording(false);
  };

  const playRecordedAudio = () => {
    if (audioBlobUrl && audioBlobUrl.startsWith('blob:')) {
      if (!audioPlayerRef.current) {
        audioPlayerRef.current = new Audio(audioBlobUrl);
        audioPlayerRef.current.onended = () => setIsPlayingRecordedAudio(false);
      }
      if (isPlayingRecordedAudio) {
        audioPlayerRef.current.pause();
        setIsPlayingRecordedAudio(false);
      } else {
        audioPlayerRef.current.play();
        setIsPlayingRecordedAudio(true);
      }
    } else {
      // Synthetic speech preview for simulation
      speakText(`Simulated playback of traditional voice note: ${preparationSteps || plantName}`);
      setIsPlayingRecordedAudio(true);
      setTimeout(() => setIsPlayingRecordedAudio(false), 3000);
    }
  };

  // GPS Geotagging fetch (FR-3.2)
  const fetchCurrentLocation = () => {
    setIsFetchingGps(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsCoordinates(prev => ({
            ...prev,
            lat: Number(pos.coords.latitude.toFixed(5)),
            lng: Number(pos.coords.longitude.toFixed(5)),
            accuracyMeters: Number(pos.coords.accuracy.toFixed(1))
          }));
          setIsFetchingGps(false);
          setGpsTagged(true);
        },
        (error) => {
          console.warn("Geolocation fallback applied:", error);
          // Preset realistic coordinates for UniLag or AASTU region
          setTimeout(() => {
            setIsFetchingGps(false);
            setGpsTagged(true);
          }, 800);
        },
        { timeout: 8000, enableHighAccuracy: true }
      );
    } else {
      setTimeout(() => {
        setIsFetchingGps(false);
        setGpsTagged(true);
      }, 600);
    }
  };

  // Submission handler
  const handleFinalSubmit = async () => {
    if (!consentAgreed) {
      alert("Please confirm the Informed Consent agreement before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionId = await addSubmission({
        practitionerName: practitionerName || 'Elder Healer',
        practitionerPhone: practitionerPhone || '+234 800 000 0000',
        intermediaryAssisted: isIntermediaryAssisted,
        intermediaryName: isIntermediaryAssisted ? currentUser.name : undefined,
        country: gpsCoordinates.country,
        state: gpsCoordinates.state,
        plantName: plantName || 'Unnamed Herbal Specimen',
        localName: localName || plantName,
        scientificGuess: scientificGuess || 'Taxonomy pending review',
        partsUsed: selectedParts.length ? selectedParts : ['leaves'],
        preparationSteps: preparationSteps || 'Traditional decoction in water',
        dosage: dosage || '1 small cup twice daily',
        ailmentsTreated: ailmentsInput ? ailmentsInput.split(',').map(s => s.trim()) : ['General vitality', 'Fever'],
        photoDataUrl: photoPreview || undefined,
        audioRecordingUrl: audioBlobUrl || undefined,
        audioDurationSeconds: recordingDuration || 18,
        coordinates: gpsCoordinates,
        consentAgreed: true
      });

      setIsSubmitting(false);
      setSubmissionSuccessId(submissionId);
    } catch (e) {
      setIsSubmitting(false);
      alert("Submission error occurred. Stored in memory.");
    }
  };

  // Reset form
  const resetForm = () => {
    setCurrentStep(1);
    setPlantName('');
    setLocalName('');
    setScientificGuess('');
    setPhotoPreview('');
    setSelectedParts(['leaves']);
    setPreparationSteps('');
    setDosage('');
    setAilmentsInput('');
    setAudioBlobUrl(null);
    setRecordingDuration(0);
    setGpsTagged(false);
    setConsentAgreed(false);
    setSubmissionSuccessId(null);
  };

  // Success screen
  if (submissionSuccessId) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl mx-auto shadow-inner">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
          Knowledge Recorded Successfully!
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
          {isOnline 
            ? "Your traditional formulation has been transmitted to the Afretec Research Consortium database for UniLag & AASTU academic review."
            : t.savedToOfflineQueue}
        </p>

        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-left text-xs space-y-2">
          <div className="flex justify-between text-stone-500">
            <span>Reference ID:</span>
            <span className="font-mono font-bold text-stone-900">{submissionSuccessId}</span>
          </div>
          <div className="flex justify-between text-stone-500">
            <span>Sync Status:</span>
            <span className={`font-bold ${isOnline ? 'text-emerald-700' : 'text-amber-700'}`}>
              {isOnline ? 'Synced to Consortium Cloud' : 'Stored in Local Offline Queue'}
            </span>
          </div>
          <div className="flex justify-between text-stone-500">
            <span>Voice Note:</span>
            <span className="font-medium text-stone-900">
              {audioBlobUrl ? `Compressed Opus (${recordingDuration}s)` : 'None'}
            </span>
          </div>
          <div className="flex justify-between text-stone-500">
            <span>GPS Habitat:</span>
            <span className="font-medium text-stone-900">
              {gpsCoordinates.lat}, {gpsCoordinates.lng} ({gpsCoordinates.state})
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={resetForm}
            className="flex-1 bg-stone-900 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-colors min-h-[48px]"
          >
            Record Another Plant
          </button>
          <button
            onClick={() => setActiveTab('sync')}
            className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-colors min-h-[48px]"
          >
            View Offline Sync Queue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Wizard Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-xs">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold mb-1">
              <span>FR-3 Knowledge Contribution Module</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              {t.contributeHeader}
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Guided by UniLag & AASTU Traditional Medicine Ethnobotany Protocols
            </p>
          </div>

          {/* Assistant / Intermediary Badge */}
          <div className="bg-stone-100 p-2 rounded-xl text-center shrink-0 border border-stone-200">
            <span className="text-xs block font-bold text-stone-700">Step</span>
            <span className="text-lg font-black text-emerald-800">{currentStep} / 5</span>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="mt-5 grid grid-cols-5 gap-1.5">
          {[1, 2, 3, 4, 5].map(step => (
            <div
              key={step}
              className={`h-2 rounded-full transition-colors ${
                step <= currentStep ? 'bg-emerald-600' : 'bg-stone-200'
              }`}
            />
          ))}
        </div>

        {/* Step Label with audio read button */}
        <div className="mt-3 flex items-center justify-between text-xs text-stone-600">
          <span className="font-semibold text-stone-900">
            {currentStep === 1 && t.step1Title}
            {currentStep === 2 && t.step2Title}
            {currentStep === 3 && t.step3Title}
            {currentStep === 4 && t.step4Title}
            {currentStep === 5 && t.step5Title}
          </span>
          <button
            onClick={() => {
              if (currentStep === 1) speakText(t.step1Title);
              if (currentStep === 2) speakText(t.step2Title);
              if (currentStep === 3) speakText(t.step3Title);
              if (currentStep === 4) speakText(t.step4Title);
              if (currentStep === 5) speakText(t.step5Title);
            }}
            className="text-stone-500 hover:text-emerald-700 flex items-center gap-1 font-medium"
            title="Listen to instructions in your language"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Audio Aid</span>
          </button>
        </div>
      </div>

      {/* Step Form Container */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-stone-200 shadow-xs space-y-6">
        {/* STEP 1: Plant Identity & Photo */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-2">
                {t.plantPhotoPrompt} (NFR-4: Compressed &lt; 300KB)
              </label>

              {photoPreview ? (
                <div className="relative aspect-16/10 rounded-2xl overflow-hidden border-2 border-emerald-500 bg-stone-900">
                  <img src={photoPreview} alt="Specimen" className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 left-3 bg-stone-950/80 backdrop-blur-xs text-white px-3 py-1 rounded-lg text-xs font-medium">
                    ✓ Compressed size: {photoFileSizeKb} KB
                  </div>
                  <button
                    onClick={() => setPhotoPreview('')}
                    className="absolute top-3 right-3 bg-stone-900/80 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm hover:bg-stone-800"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-stone-300 rounded-2xl p-6 text-center hover:border-emerald-500 transition-colors bg-stone-50">
                  <Camera className="w-10 h-10 text-stone-400 mx-auto mb-2" />
                  <p className="text-xs sm:text-sm font-semibold text-stone-800">
                    Capture herb specimen photo
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Supports high-resolution camera capture with client-side compression
                  </p>

                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <label className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-xs inline-flex items-center gap-1.5 min-h-[44px]">
                      <Camera className="w-4 h-4" />
                      <span>{t.takePhoto}</span>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>

                    {/* Quick Preset Samples for Field Testing */}
                    <button
                      type="button"
                      onClick={() => selectPresetPhoto('https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80')}
                      className="bg-stone-200 hover:bg-stone-300 text-stone-700 px-3 py-2 rounded-xl text-xs font-medium transition-colors"
                    >
                      Sample Leaf Specimen
                    </button>
                    <button
                      type="button"
                      onClick={() => selectPresetPhoto('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80')}
                      className="bg-stone-200 hover:bg-stone-300 text-stone-700 px-3 py-2 rounded-xl text-xs font-medium transition-colors"
                    >
                      Sample Flower Specimen
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.plantNameField} *
                </label>
                <input
                  type="text"
                  value={plantName}
                  onChange={(e) => setPlantName(e.target.value)}
                  placeholder="e.g. Scent Leaf, Wild Basil, Bitter Herb..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.localNameField} (Indigenous Name) *
                  </label>
                  <input
                    type="text"
                    value={localName}
                    onChange={(e) => setLocalName(e.target.value)}
                    placeholder="e.g. Ewúro, Grawa (ግራዋ), Daidoya..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Botanical Guess / Family (Optional)
                  </label>
                  <input
                    type="text"
                    value={scientificGuess}
                    onChange={(e) => setScientificGuess(e.target.value)}
                    placeholder="e.g. Ocimum or Lamiaceae..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 min-h-[44px]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Parts Used & Preparation */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-2">
                {t.selectPartsUsed} (NFR-1 Large 48dp Touch Targets)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {partsList.map(item => {
                  const isChecked = selectedParts.includes(item.part);
                  return (
                    <button
                      key={item.part}
                      type="button"
                      onClick={() => togglePart(item.part)}
                      className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[58px] ${
                        isChecked
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      <span className="text-xl mb-1">{item.icon.split(' ')[0]}</span>
                      <span className="text-xs font-bold leading-tight">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.preparationStepsField} *
                </label>
                <textarea
                  rows={3}
                  value={preparationSteps}
                  onChange={(e) => setPreparationSteps(e.target.value)}
                  placeholder="Describe step-by-step preparation (e.g. Boil fresh leaves with ginger in clay pot for 20 minutes; strain while warm...)"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.dosageField}
                  </label>
                  <input
                    type="text"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    placeholder="e.g. Half cup twice daily after meal"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.ailmentsField}
                  </label>
                  <input
                    type="text"
                    value={ailmentsInput}
                    onChange={(e) => setAilmentsInput(e.target.value)}
                    placeholder="e.g. Fever, Stomach cramps, Headache..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 min-h-[44px]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Voice Note Recording */}
        {currentStep === 3 && (
          <div className="space-y-5 text-center">
            <div className="max-w-md mx-auto">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                {t.recordVoiceNotePrompt}
              </label>
              <p className="text-xs text-stone-500">
                Aids elderly and low-literate practitioners by preserving spoken guidance in mother tongue (Amharic, Yoruba, Oromo, Hausa).
              </p>
            </div>

            {/* Voice Recorder Canvas / Control */}
            <div className="p-6 bg-stone-50 rounded-3xl border border-stone-200 flex flex-col items-center justify-center space-y-4">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                isRecording
                  ? 'bg-rose-600 text-white ring-8 ring-rose-200 animate-pulse'
                  : audioBlobUrl
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-200 text-stone-700'
              }`}>
                {isRecording ? (
                  <Mic className="w-10 h-10 animate-bounce" />
                ) : (
                  <Mic className="w-10 h-10" />
                )}
              </div>

              {/* Timer */}
              <div className="text-2xl font-mono font-black text-stone-900">
                00:{recordingDuration.toString().padStart(2, '0')}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {!isRecording ? (
                  <button
                    type="button"
                    onClick={startVoiceRecording}
                    className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-5 py-3 rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 min-h-[48px]"
                  >
                    <Mic className="w-4 h-4" />
                    <span>{audioBlobUrl ? 'Re-record Voice' : t.startRecording}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopVoiceRecording}
                    className="bg-stone-900 hover:bg-stone-800 text-white font-bold px-5 py-3 rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 min-h-[48px]"
                  >
                    <Square className="w-4 h-4" />
                    <span>{t.stopRecording}</span>
                  </button>
                )}

                {audioBlobUrl && !isRecording && (
                  <button
                    type="button"
                    onClick={playRecordedAudio}
                    className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-5 py-3 rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 min-h-[48px]"
                  >
                    {isPlayingRecordedAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isPlayingRecordedAudio ? 'Pause' : 'Listen Back'}</span>
                  </button>
                )}
              </div>

              {audioBlobUrl && (
                <p className="text-xs text-emerald-800 font-semibold flex items-center gap-1.5 pt-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Audio note ready for Opus compression (~45 KB).</span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: Geotagging & Habitat */}
        {currentStep === 4 && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                {t.gpsTaggingPrompt} (FR-3.2 PostGIS Compatible)
              </label>
              <p className="text-xs text-stone-500">
                Identifies indigenous ecological habitat zones across Nigerian savannahs and Ethiopian highlands.
              </p>
            </div>

            {/* GPS Trigger Card */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">
                    {gpsTagged ? t.gpsCaptured : "No GPS coordinate tagged yet"}
                  </h4>
                  <p className="text-xs text-stone-500">
                    Lat: {gpsCoordinates.lat} • Lng: {gpsCoordinates.lng} (±{gpsCoordinates.accuracyMeters}m)
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={fetchCurrentLocation}
                disabled={isFetchingGps}
                className="bg-stone-900 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-2 shrink-0 min-h-[44px]"
              >
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{isFetchingGps ? "Fetching GPS..." : t.fetchGps}</span>
              </button>
            </div>

            {/* Country & Habitat fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Country Region
                </label>
                <select
                  value={gpsCoordinates.country}
                  onChange={(e) => setGpsCoordinates(prev => ({ 
                    ...prev, 
                    country: e.target.value as 'Nigeria' | 'Ethiopia',
                    state: e.target.value === 'Nigeria' ? 'Oyo State' : 'Addis Ababa'
                  }))}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 min-h-[44px]"
                >
                  <option value="Nigeria">Nigeria (UniLag Consortium Region)</option>
                  <option value="Ethiopia">Ethiopia (AASTU Consortium Region)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  State / Administrative Zone
                </label>
                <input
                  type="text"
                  value={gpsCoordinates.state}
                  onChange={(e) => setGpsCoordinates(prev => ({ ...prev, state: e.target.value }))}
                  placeholder="e.g. Lagos, Oyo, Shewa, Oromia..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Habitat & Soil Description
              </label>
              <input
                type="text"
                value={gpsCoordinates.habitatNotes}
                onChange={(e) => setGpsCoordinates(prev => ({ ...prev, habitatNotes: e.target.value }))}
                placeholder="e.g. Moist riverbank shade, high rocky limestone plateau, compound garden..."
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 min-h-[44px]"
              />
            </div>
          </div>
        )}

        {/* STEP 5: Ethical Informed Consent & Review */}
        {currentStep === 5 && (
          <div className="space-y-5">
            <div className="bg-emerald-950 text-emerald-100 p-5 rounded-2xl border border-emerald-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>{t.consentTitle}</span>
              </div>
              <p className="text-xs leading-relaxed opacity-90">
                {t.consentStatement}
              </p>
            </div>

            {/* Practitioner & Intermediary Credentials */}
            <div className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="font-bold text-stone-800">Assistance Mode:</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isIntermediaryAssisted}
                    onChange={(e) => setIsIntermediaryAssisted(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded border-stone-300"
                  />
                  <span className="text-stone-700">Youth Intermediary Assisted</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    Practitioner Full Name
                  </label>
                  <input
                    type="text"
                    value={practitionerName}
                    onChange={(e) => setPractitionerName(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    Phone Contact (OTP/SMS Verified)
                  </label>
                  <input
                    type="text"
                    value={practitionerPhone}
                    onChange={(e) => setPractitionerPhone(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Informed Consent Checkbox */}
            <label className="flex items-start gap-3 p-4 rounded-2xl border border-emerald-300 bg-emerald-50 cursor-pointer">
              <input
                type="checkbox"
                checked={consentAgreed}
                onChange={(e) => setConsentAgreed(e.target.checked)}
                className="w-5 h-5 text-emerald-600 rounded border-stone-300 mt-0.5 shrink-0"
              />
              <span className="text-xs text-emerald-950 font-medium leading-relaxed">
                I hereby grant consent for this traditional herbal knowledge to be cataloged within the Afretec Research Consortium database for UniLag and AASTU scientific review and validation.
              </span>
            </label>

            {/* Offline notice */}
            {!isOnline && (
              <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 flex items-center gap-2">
                <WifiOff className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>Offline Mode:</strong> This entry will be saved to your local offline queue and auto-submitted when you connect to Wi-Fi/cellular.
                </span>
              </div>
            )}
          </div>
        )}

        {/* Wizard Controls */}
        <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors min-h-[48px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={() => {
                if (currentStep === 1 && !plantName && !localName) {
                  alert("Please enter the plant or local name first.");
                  return;
                }
                setCurrentStep(prev => prev + 1);
              }}
              className="px-6 py-3 bg-stone-900 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors min-h-[48px]"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalSubmit}
              disabled={isSubmitting || !consentAgreed}
              className="px-6 py-3 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all min-h-[48px]"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? "Submitting..." : t.submitButton}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
