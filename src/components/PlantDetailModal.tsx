import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Volume2, 
  VolumeX, 
  ArrowLeftRight, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Leaf, 
  Globe, 
  HeartHandshake,
  AlertTriangle
} from 'lucide-react';

export const PlantDetailModal: React.FC = () => {
  const { 
    selectedPlant, 
    setSelectedPlant, 
    t, 
    language,
    isPlayingAudio, 
    activeAudioPlantId, 
    playPlantAudio, 
    stopPlantAudio,
    openCompareForPlant 
  } = useApp();

  if (!selectedPlant) return null;

  const isPlayingThis = activeAudioPlantId === selectedPlant.id && isPlayingAudio;
  const currentNarration = selectedPlant.audioNarration[language] || selectedPlant.audioNarration.en;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 text-stone-900 my-auto">
        {/* Modal Header Image */}
        <div className="relative aspect-16/9 bg-stone-900 overflow-hidden">
          <img
            src={selectedPlant.photoUrl}
            alt={selectedPlant.scientificName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

          {/* Close button */}
          <button
            id="close-plant-modal-btn"
            onClick={() => {
              stopPlantAudio();
              setSelectedPlant(null);
            }}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-stone-900/80 text-white flex items-center justify-center hover:bg-stone-800 transition-colors z-10 min-h-[44px] min-w-[44px]"
            aria-label="Close plant detail"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Region Badge */}
          <div className="absolute top-4 left-4">
            {selectedPlant.region === 'shared' ? (
              <span className="bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md border border-emerald-400/40 flex items-center gap-1.5">
                <span>🌍</span>
                <span>Shared: Nigeria & Ethiopia</span>
              </span>
            ) : selectedPlant.region === 'nigeria' ? (
              <span className="bg-teal-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md border border-teal-400/40 flex items-center gap-1.5">
                <span>🇳🇬</span>
                <span>Nigeria Indigenous (UniLag)</span>
              </span>
            ) : (
              <span className="bg-amber-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md border border-amber-400/40 flex items-center gap-1.5">
                <span>🇪🇹</span>
                <span>Ethiopia Indigenous (AASTU)</span>
              </span>
            )}
          </div>

          {/* Bottom Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-xs font-mono text-emerald-300 uppercase tracking-widest">
              Family: {selectedPlant.family} • {selectedPlant.conservationStatus}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold italic tracking-tight drop-shadow-sm">
              {selectedPlant.scientificName}
            </h2>
            <p className="text-sm font-medium text-stone-200">
              {selectedPlant.commonEnglishName}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Multi-Modal Audio Player Banner (FR-2.4 & NFR-1) */}
          <div className="bg-gradient-to-r from-emerald-900 to-stone-900 text-white p-4 rounded-2xl shadow-sm border border-emerald-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <button
                id="modal-audio-narrate-btn"
                onClick={() => {
                  if (isPlayingThis) {
                    stopPlantAudio();
                  } else {
                    playPlantAudio(selectedPlant);
                  }
                }}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md transition-all min-h-[48px] min-w-[48px] ${
                  isPlayingThis 
                    ? 'bg-amber-400 text-stone-950 animate-pulse' 
                    : 'bg-emerald-500 text-white hover:bg-emerald-400'
                }`}
                title={isPlayingThis ? t.pauseAudioDesc : t.playAudioDesc}
              >
                {isPlayingThis ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
              <div>
                <h4 className="font-bold text-sm sm:text-base flex items-center gap-2">
                  <span>{t.audioGuideTitle}</span>
                  <span className="text-[10px] bg-emerald-700/80 px-2 py-0.5 rounded-full font-mono">
                    {language.toUpperCase()}
                  </span>
                </h4>
                <p className="text-xs text-stone-300 mt-0.5 line-clamp-2 leading-relaxed">
                  "{currentNarration}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              {isPlayingThis ? (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 border border-amber-400/40 rounded-xl text-xs font-semibold text-amber-300">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  Playing Audio
                </div>
              ) : (
                <button
                  onClick={() => playPlantAudio(selectedPlant)}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors shadow-xs min-h-[44px]"
                >
                  {t.playAudioDesc}
                </button>
              )}
            </div>
          </div>

          {/* Local Indigenous Names Table */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200">
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-700" />
              {t.localNamesTitle}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                <span className="text-stone-400 block text-[10px]">Yorùbá (Nigeria)</span>
                <span className="font-bold text-stone-900 text-sm">{selectedPlant.localNames.yoruba}</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                <span className="text-stone-400 block text-[10px]">Amharic (Ethiopia)</span>
                <span className="font-bold text-stone-900 text-sm font-ethiopic">
                  {selectedPlant.localNames.amharic} ({selectedPlant.localNames.amharicScript})
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                <span className="text-stone-400 block text-[10px]">Oromo (Ethiopia)</span>
                <span className="font-bold text-stone-900 text-sm">{selectedPlant.localNames.oromo || '—'}</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                <span className="text-stone-400 block text-[10px]">Hausa (Nigeria)</span>
                <span className="font-bold text-stone-900 text-sm">{selectedPlant.localNames.hausa || '—'}</span>
              </div>
            </div>
          </div>

          {/* Morphological Parts Used */}
          <div>
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-emerald-700" />
              {t.partsUsedTitle}
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedPlant.partsUsed.map(part => (
                <div
                  key={part}
                  className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold capitalize flex items-center gap-1.5"
                >
                  <span>✓</span>
                  <span>{part}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preparation Method & Dosage (FR-2.3) */}
          <div className="space-y-4 bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200">
            <div>
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                {t.preparationTitle}
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-white p-3.5 rounded-xl border border-stone-200/80">
                {selectedPlant.preparation.method}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-stone-200/80">
                <span className="font-bold text-stone-900 block mb-1 text-xs">
                  {t.dosageTitle}:
                </span>
                <p className="text-stone-700 leading-relaxed">
                  {selectedPlant.preparation.dosage}
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-stone-200/80">
                <span className="font-bold text-stone-900 block mb-1 text-xs">
                  {t.dosageAdministration}:
                </span>
                <p className="text-stone-700 leading-relaxed">
                  {selectedPlant.preparation.administration}
                </p>
              </div>
            </div>

            {/* Contraindications Warning (Critical safety alert) */}
            <div className="bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-950">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>{t.contraindicationsTitle}</span>
              </div>
              <p className="leading-relaxed text-amber-900">
                {selectedPlant.preparation.contraindications}
              </p>
            </div>
          </div>

          {/* Treated Ailments */}
          <div>
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
              {t.ailmentsTitle}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedPlant.ailmentsTreated.map((ailment, idx) => (
                <span
                  key={idx}
                  className="bg-stone-100 text-stone-800 border border-stone-200 text-xs px-3 py-1 rounded-full font-medium"
                >
                  {ailment}
                </span>
              ))}
            </div>
          </div>

          {/* Consortium Validation Footer */}
          <div className="bg-stone-100 p-3 rounded-xl flex items-center justify-between text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{t.verifiedByResearcher}: <strong>{selectedPlant.verifiedBy}</strong></span>
            </div>
          </div>

          {/* Action Footer: Cross-Border Compare Button & Close */}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-3">
            {selectedPlant.comparativeData ? (
              <button
                id="modal-compare-side-by-side-btn"
                onClick={() => openCompareForPlant(selectedPlant.id)}
                className="flex-1 bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-xs min-h-[48px]"
              >
                <ArrowLeftRight className="w-4 h-4" />
                <span>Compare Nigeria vs Ethiopia Side-by-Side</span>
              </button>
            ) : (
              <div className="text-xs text-stone-500 italic">
                Endemic species: Single-country field repository
              </div>
            )}

            <button
              onClick={() => {
                stopPlantAudio();
                setSelectedPlant(null);
              }}
              className="px-5 py-3 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold rounded-xl text-xs sm:text-sm transition-colors min-h-[48px]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
