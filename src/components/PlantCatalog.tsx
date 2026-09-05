import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Plant, PlantPart } from '../types';
import { 
  Search, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  ArrowLeftRight, 
  Sparkles, 
  Filter, 
  CheckCircle2, 
  Globe, 
  Leaf, 
  ShieldAlert,
  Info
} from 'lucide-react';

export const PlantCatalog: React.FC = () => {
  const { 
    plants, 
    setSelectedPlant, 
    searchTerm, 
    setSearchTerm, 
    selectedRegionFilter, 
    setSelectedRegionFilter,
    t, 
    language,
    isPlayingAudio, 
    activeAudioPlantId, 
    playPlantAudio, 
    stopPlantAudio,
    openCompareForPlant 
  } = useApp();

  const [selectedPartFilter, setSelectedPartFilter] = useState<PlantPart | 'all'>('all');

  const filteredPlants = useMemo(() => {
    return plants.filter(plant => {
      // Region filter
      if (selectedRegionFilter !== 'all' && plant.region !== selectedRegionFilter) {
        return false;
      }

      // Part filter
      if (selectedPartFilter !== 'all' && !plant.partsUsed.includes(selectedPartFilter)) {
        return false;
      }

      // Search term
      if (!searchTerm.trim()) return true;
      const query = searchTerm.toLowerCase();

      const matchScientific = plant.scientificName.toLowerCase().includes(query);
      const matchCommon = plant.commonEnglishName.toLowerCase().includes(query);
      const matchFamily = plant.family.toLowerCase().includes(query);
      const matchAmharic = (plant.localNames.amharic || '').toLowerCase().includes(query) || (plant.localNames.amharicScript || '').includes(query);
      const matchYoruba = (plant.localNames.yoruba || '').toLowerCase().includes(query);
      const matchOromo = (plant.localNames.oromo || '').toLowerCase().includes(query);
      const matchHausa = (plant.localNames.hausa || '').toLowerCase().includes(query);
      const matchAilments = plant.ailmentsTreated.some(a => a.toLowerCase().includes(query));
      const matchPrep = plant.preparation.method.toLowerCase().includes(query);

      return matchScientific || matchCommon || matchFamily || matchAmharic || matchYoruba || matchOromo || matchHausa || matchAilments || matchPrep;
    });
  }, [plants, selectedRegionFilter, selectedPartFilter, searchTerm]);

  const partIcons: Record<PlantPart, string> = {
    leaves: '🍃 Leaves',
    roots: '🥕 Roots',
    bark: '🪵 Bark',
    seeds: '🌰 Seeds',
    sap: '💧 Sap / Latex',
    flowers: '🌸 Flowers',
    stem: '🌿 Stem',
    whole: '🌱 Whole Herb'
  };

  return (
    <div className="space-y-6">
      {/* Header Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-stone-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              {t.navCatalog}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              Standardized botanical profiles curated by UniLag (Nigeria) & AASTU (Ethiopia)
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-stone-100 p-1.5 rounded-xl border border-stone-200/80">
            <button
              onClick={() => setSelectedRegionFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all min-h-[38px] ${
                selectedRegionFilter === 'all'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t.filterAll}
            </button>
            <button
              onClick={() => setSelectedRegionFilter('shared')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 min-h-[38px] ${
                selectedRegionFilter === 'shared'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🌍</span>
              <span>{t.filterShared}</span>
            </button>
            <button
              onClick={() => setSelectedRegionFilter('nigeria')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 min-h-[38px] ${
                selectedRegionFilter === 'nigeria'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🇳🇬</span>
              <span>{t.filterNigeria}</span>
            </button>
            <button
              onClick={() => setSelectedRegionFilter('ethiopia')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 min-h-[38px] ${
                selectedRegionFilter === 'ethiopia'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🇪🇹</span>
              <span>{t.filterEthiopia}</span>
            </button>
          </div>
        </div>

        {/* Search input with audio read-aloud prompt */}
        <div className="mt-4 relative">
          <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            id="herb-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-11 pr-10 py-3 text-sm sm:text-base text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all shadow-inner"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-sm w-6 h-6 rounded-full flex items-center justify-center bg-stone-200"
            >
              ✕
            </button>
          )}
        </div>

        {/* Morphological Parts Filter Chips */}
        <div className="mt-3.5 flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          <span className="text-xs font-semibold text-stone-500 shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            {t.partsUsedTitle}:
          </span>
          <button
            onClick={() => setSelectedPartFilter('all')}
            className={`px-2.5 py-1 text-xs rounded-full whitespace-nowrap transition-colors min-h-[36px] ${
              selectedPartFilter === 'all'
                ? 'bg-stone-800 text-white font-medium'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            All Parts
          </button>
          {(['leaves', 'roots', 'bark', 'seeds', 'flowers', 'sap'] as PlantPart[]).map(part => (
            <button
              key={part}
              onClick={() => setSelectedPartFilter(part)}
              className={`px-2.5 py-1 text-xs rounded-full whitespace-nowrap transition-colors capitalize min-h-[36px] ${
                selectedPartFilter === part
                  ? 'bg-emerald-700 text-white font-medium shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {partIcons[part]}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPlants.map((plant) => {
          const isPlayingThis = activeAudioPlantId === plant.id && isPlayingAudio;

          return (
            <div
              key={plant.id}
              id={`plant-card-${plant.id}`}
              className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              {/* Plant Image & Region Badges */}
              <div className="relative aspect-16/10 overflow-hidden bg-stone-200">
                <img
                  src={plant.photoUrl}
                  alt={plant.scientificName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent pointer-events-none" />

                {/* Region Tag */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {plant.region === 'shared' ? (
                    <span className="bg-emerald-800/90 backdrop-blur-xs text-emerald-100 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 border border-emerald-500/40">
                      <span>🌍</span>
                      <span>Shared: NG & ET</span>
                    </span>
                  ) : plant.region === 'nigeria' ? (
                    <span className="bg-teal-900/90 backdrop-blur-xs text-teal-100 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 border border-teal-500/40">
                      <span>🇳🇬</span>
                      <span>Nigeria (UniLag)</span>
                    </span>
                  ) : (
                    <span className="bg-amber-900/90 backdrop-blur-xs text-amber-100 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 border border-amber-500/40">
                      <span>🇪🇹</span>
                      <span>Ethiopia (AASTU)</span>
                    </span>
                  )}
                </div>

                {/* Audio Narrator Quick Play Button for Low-Literacy / Elderly Healers */}
                <button
                  id={`audio-btn-${plant.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isPlayingThis) {
                      stopPlantAudio();
                    } else {
                      playPlantAudio(plant);
                    }
                  }}
                  aria-label={isPlayingThis ? t.pauseAudioDesc : t.playAudioDesc}
                  className={`absolute top-3 right-3 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all min-h-[44px] min-w-[44px] ${
                    isPlayingThis 
                      ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-300/40 animate-pulse' 
                      : 'bg-stone-900/80 backdrop-blur-md text-white hover:bg-emerald-600'
                  }`}
                  title={t.playAudioDesc}
                >
                  {isPlayingThis ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>

                {/* Botanical & Common Name overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-mono tracking-wider text-emerald-300 block uppercase">
                    {plant.family}
                  </span>
                  <h3 className="text-lg font-bold italic tracking-tight drop-shadow-xs">
                    {plant.scientificName}
                  </h3>
                  <p className="text-xs text-stone-200 font-medium drop-shadow-xs">
                    {plant.commonEnglishName}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                {/* Local Multilingual Names Box */}
                <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/80 space-y-1.5 text-xs">
                  <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide flex items-center gap-1">
                    <Globe className="w-3 h-3 text-emerald-600" />
                    {t.localNamesTitle}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-stone-800">
                    <div>
                      <span className="text-stone-500 block text-[10px]">Yorùbá (NG):</span>
                      <span className="font-bold text-emerald-950">
                        {plant.localNames.yoruba}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-500 block text-[10px]">Amharic (ET):</span>
                      <span className="font-bold text-emerald-950 font-ethiopic">
                        {plant.localNames.amharic} ({plant.localNames.amharicScript})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Morphological Parts Used */}
                <div>
                  <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                    <Leaf className="w-3 h-3 text-stone-400" />
                    {t.partsUsedTitle}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {plant.partsUsed.map(part => (
                      <span
                        key={part}
                        className="bg-emerald-50 text-emerald-900 border border-emerald-200/80 text-[11px] font-medium px-2 py-0.5 rounded-md capitalize"
                      >
                        {part}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Ailments / Symptoms */}
                <div>
                  <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5">
                    {t.ailmentsTitle}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {plant.ailmentsTreated.slice(0, 3).map((ailment, idx) => (
                      <span
                        key={idx}
                        className="bg-stone-100 text-stone-700 text-[11px] px-2 py-0.5 rounded-full"
                      >
                        {ailment}
                      </span>
                    ))}
                    {plant.ailmentsTreated.length > 3 && (
                      <span className="text-[11px] text-stone-500 font-medium px-1">
                        +{plant.ailmentsTreated.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Active Audio Waveform Banner if Playing */}
                {isPlayingThis && (
                  <div className="bg-amber-50 border border-amber-300 rounded-xl p-2.5 flex items-center justify-between text-xs text-amber-900 animate-pulse">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-amber-700" />
                      <span className="font-bold">Narrating in {language.toUpperCase()}...</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1 h-3 bg-amber-600 rounded-full animate-bounce"></span>
                      <span className="w-1 h-5 bg-amber-600 rounded-full animate-bounce delay-75"></span>
                      <span className="w-1 h-2 bg-amber-600 rounded-full animate-bounce delay-150"></span>
                    </div>
                  </div>
                )}

                {/* Card Action Buttons (Min 48px touch targets) */}
                <div className="pt-2 border-t border-stone-100 flex items-center gap-2">
                  <button
                    id={`view-details-btn-${plant.id}`}
                    onClick={() => setSelectedPlant(plant)}
                    className="flex-1 bg-stone-900 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm py-3 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 min-h-[48px]"
                  >
                    <span>{t.viewDetails}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {plant.comparativeData && (
                    <button
                      id={`compare-btn-${plant.id}`}
                      onClick={() => openCompareForPlant(plant.id)}
                      title="Compare Nigeria vs Ethiopia side-by-side"
                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs py-3 px-3 rounded-xl transition-colors flex items-center justify-center gap-1 min-h-[48px]"
                    >
                      <ArrowLeftRight className="w-4 h-4 text-emerald-700" />
                      <span className="hidden sm:inline">Compare NG/ET</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPlants.length === 0 && (
        <div className="bg-white rounded-2xl p-10 text-center border border-stone-200 text-stone-500 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-xl mx-auto mb-3">
            🔍
          </div>
          <h3 className="font-bold text-base text-stone-800">No medicinal plants found</h3>
          <p className="text-xs text-stone-500 mt-1">
            Try adjusting your search keywords, parts filter, or regional filter.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedRegionFilter('all');
              setSelectedPartFilter('all');
            }}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-500"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
