import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Plant } from '../types';
import { 
  ArrowLeftRight, 
  Scale, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Globe, 
  FileText, 
  Volume2, 
  AlertCircle 
} from 'lucide-react';

export const CrossBorderComparison: React.FC = () => {
  const { 
    plants, 
    comparisonSelectedPlantId, 
    setComparisonSelectedPlantId, 
    t, 
    language,
    speakText 
  } = useApp();

  const sharedPlants = useMemo(() => {
    return plants.filter(p => p.comparativeData !== undefined);
  }, [plants]);

  const activePlant = useMemo(() => {
    return sharedPlants.find(p => p.id === comparisonSelectedPlantId) || sharedPlants[0];
  }, [sharedPlants, comparisonSelectedPlantId]);

  if (!activePlant || !activePlant.comparativeData) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center border border-stone-200">
        <p className="text-stone-600">No comparative species data currently selected.</p>
      </div>
    );
  }

  const comp = activePlant.comparativeData;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-800/40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold mb-3">
            <Scale className="w-3.5 h-3.5 text-emerald-400" />
            <span>FR-4.3 Bi-Directional Knowledge Exchange</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.comparisonHeader}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
            {t.comparisonSub}
          </p>
        </div>

        {/* Shared Plant Selector Pills */}
        <div className="mt-6 pt-6 border-t border-stone-800">
          <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-2">
            {t.selectPlantToCompare}
          </label>
          <div className="flex flex-wrap gap-2">
            {sharedPlants.map(p => {
              const isSelected = p.id === activePlant.id;
              return (
                <button
                  key={p.id}
                  id={`compare-pill-${p.id}`}
                  onClick={() => setComparisonSelectedPlantId(p.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 min-h-[44px] ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/50'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white'
                  }`}
                >
                  <span>🌿</span>
                  <span>{p.scientificName}</span>
                  <span className="text-[11px] opacity-80">
                    ({p.localNames.yoruba} / {p.localNames.amharic})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Overview & Concordance Score Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-700 font-bold uppercase">
              {activePlant.family}
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-xs text-stone-500 font-medium">
              Common: {activePlant.commonEnglishName}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold italic text-stone-900">
            {activePlant.scientificName}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-1">
            {comp.concordanceSummary}
          </p>
        </div>

        {/* Concordance Metric Dial */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center shrink-0 w-full sm:w-auto min-w-[200px]">
          <div className="text-[11px] font-bold text-emerald-900 uppercase tracking-wide">
            {t.clinicalConcordance}
          </div>
          <div className="text-3xl sm:text-4xl font-black text-emerald-800 my-1">
            {comp.concordanceScore}%
          </div>
          <div className="text-[11px] text-emerald-700 font-medium">
            High Ethnobotanical Overlap
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Columns (Nigeria vs Ethiopia) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* NIGERIA COLUMN (UniLag) */}
        <div className="bg-white rounded-3xl border-2 border-teal-600/30 shadow-xs overflow-hidden flex flex-col justify-between">
          <div className="bg-teal-900 text-white p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇳🇬</span>
              <div>
                <span className="text-[10px] uppercase font-bold text-teal-300 tracking-wider block">
                  Federal Republic of Nigeria
                </span>
                <h4 className="font-extrabold text-base sm:text-lg">
                  {t.nigeriaUniLagColumn}
                </h4>
              </div>
            </div>
            <button
              onClick={() => speakText(`Nigeria usage for ${comp.nigeria.localName}. ${comp.nigeria.preparation}`)}
              className="w-10 h-10 rounded-full bg-teal-800 hover:bg-teal-700 text-white flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
              title="Read Nigeria Traditional Profile"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 sm:p-6 space-y-5 flex-1 text-xs sm:text-sm">
            {/* Local Name */}
            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
              <span className="text-[11px] text-stone-500 font-semibold block uppercase">
                Indigenous Name & Linguistic Context
              </span>
              <span className="text-base font-bold text-teal-950">
                {comp.nigeria.localName}
              </span>
            </div>

            {/* Traditional Indications */}
            <div>
              <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-2">
                Primary Indications in Nigeria
              </span>
              <div className="space-y-1.5">
                {comp.nigeria.uses.map((use, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-teal-50/70 p-2.5 rounded-xl border border-teal-100 text-teal-950">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span className="font-medium text-xs sm:text-sm">{use}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation Method */}
            <div>
              <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-1">
                Preparation & Processing Practice
              </span>
              <p className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/90 text-stone-800 leading-relaxed text-xs sm:text-sm">
                {comp.nigeria.preparation}
              </p>
            </div>

            {/* Dosage & Administration */}
            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
              <span className="text-[11px] font-bold text-stone-700 uppercase block mb-1">
                Standard Traditional Dosage:
              </span>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                {comp.nigeria.dosage}
              </p>
            </div>

            {/* Practitioner Field Notes */}
            <div className="bg-teal-50/50 border border-teal-200/80 p-3.5 rounded-xl text-teal-950 text-xs leading-relaxed">
              <span className="font-bold block mb-1 text-teal-900">
                UniLag Ethnobotanist Field Notes:
              </span>
              "{comp.nigeria.practitionerNotes}"
            </div>
          </div>

          <div className="bg-stone-100 px-5 py-3 border-t border-stone-200 text-stone-600 text-xs flex items-center justify-between font-medium">
            <span>Research Partner: University of Lagos</span>
            <span className="text-teal-700 font-bold">UniLag Bio-Repo</span>
          </div>
        </div>

        {/* ETHIOPIA COLUMN (AASTU) */}
        <div className="bg-white rounded-3xl border-2 border-amber-600/30 shadow-xs overflow-hidden flex flex-col justify-between">
          <div className="bg-amber-900 text-white p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇪🇹</span>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider block">
                  Federal Democratic Republic of Ethiopia
                </span>
                <h4 className="font-extrabold text-base sm:text-lg">
                  {t.ethiopiaAastuColumn}
                </h4>
              </div>
            </div>
            <button
              onClick={() => speakText(`Ethiopia usage for ${comp.ethiopia.localName}. ${comp.ethiopia.preparation}`)}
              className="w-10 h-10 rounded-full bg-amber-800 hover:bg-amber-700 text-white flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
              title="Read Ethiopia Traditional Profile"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 sm:p-6 space-y-5 flex-1 text-xs sm:text-sm">
            {/* Local Name */}
            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
              <span className="text-[11px] text-stone-500 font-semibold block uppercase">
                Indigenous Name & Linguistic Context
              </span>
              <span className="text-base font-bold text-amber-950 font-ethiopic">
                {comp.ethiopia.localName}
              </span>
            </div>

            {/* Traditional Indications */}
            <div>
              <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-2">
                Primary Indications in Ethiopia
              </span>
              <div className="space-y-1.5">
                {comp.ethiopia.uses.map((use, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-amber-50/70 p-2.5 rounded-xl border border-amber-100 text-amber-950">
                    <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span className="font-medium text-xs sm:text-sm">{use}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation Method */}
            <div>
              <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-1">
                Preparation & Processing Practice
              </span>
              <p className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/90 text-stone-800 leading-relaxed text-xs sm:text-sm">
                {comp.ethiopia.preparation}
              </p>
            </div>

            {/* Dosage & Administration */}
            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
              <span className="text-[11px] font-bold text-stone-700 uppercase block mb-1">
                Standard Traditional Dosage:
              </span>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                {comp.ethiopia.dosage}
              </p>
            </div>

            {/* Practitioner Field Notes */}
            <div className="bg-amber-50/50 border border-amber-200/80 p-3.5 rounded-xl text-amber-950 text-xs leading-relaxed">
              <span className="font-bold block mb-1 text-amber-900">
                AASTU Ethnomedicine Center Field Notes:
              </span>
              "{comp.ethiopia.practitionerNotes}"
            </div>
          </div>

          <div className="bg-stone-100 px-5 py-3 border-t border-stone-200 text-stone-600 text-xs flex items-center justify-between font-medium">
            <span>Research Partner: Addis Ababa Science & Tech</span>
            <span className="text-amber-800 font-bold">AASTU Bio-Repo</span>
          </div>
        </div>
      </div>

      {/* Joint Scientific Validation & Pharmacopeia Notes */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <h4 className="font-bold text-stone-900 text-sm sm:text-base">
            Joint Consortium Harmonization & Pharmacological Evidence
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          {comp.scientificValidationNotes}
        </p>
        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Joint research publication pending with the <strong>Afretec Research Consortium</strong> Traditional Medicine Standard Protocol.
          </span>
        </div>
      </div>
    </div>
  );
};
