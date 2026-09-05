import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Plant, PlantPart } from '../types';
import { 
  Search, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  ArrowLeftRight, 
  Filter, 
  CheckCircle2, 
  Globe, 
  Leaf, 
  Stethoscope,
  XCircle,
  PlusCircle,
  Tag
} from 'lucide-react';

export const COMMON_AILMENTS = [
  { id: 'all', label: 'All Ailments', icon: '🌿', query: '' },
  { id: 'malaria', label: 'Malaria & Fevers', localHint: 'Ibà / የወባ ትኩሳት', icon: '🦟', query: 'malaria' },
  { id: 'stomach', label: 'Stomach & Digestion', localHint: 'Inú rírun / የሆድ ቁርጠት', icon: '🫄', query: 'stomach' },
  { id: 'diabetes', label: 'Diabetes & Blood Sugar', localHint: 'Àtọ̀gbẹ / የስኳር በሽታ', icon: '🩺', query: 'diabetes' },
  { id: 'hypertension', label: 'Hypertension (High BP)', localHint: 'Ẹ̀jẹ̀ ríru / የደም ግፊት', icon: '🩸', query: 'hypertension' },
  { id: 'cough', label: 'Cough & Respiratory', localHint: 'Ikọ́ / ሳል እና ጉንፋን', icon: '🫁', query: 'cough' },
  { id: 'wounds', label: 'Wounds & Skin Infections', localHint: 'Egbò / የቁስል እና ቆዳ', icon: '🩹', query: 'wound' },
  { id: 'joints', label: 'Arthritis & Joint Pain', localHint: 'Oríkèé rírun / የመገጣጠሚያ', icon: '🦴', query: 'joint' },
  { id: 'parasites', label: 'Worms & Parasites', localHint: 'Kòkòrò inú / የሆድ ትላትል', icon: '🪱', query: 'parasite' },
  { id: 'postpartum', label: 'Postpartum & Women\'s Health', localHint: 'Ìbímọ / የወሊድ', icon: '🤱', query: 'postpartum' }
];

export const PlantCatalog: React.FC = () => {
  const { 
    plants, 
    setSelectedPlant, 
    searchTerm, 
    setSearchTerm, 
    selectedRegionFilter, 
    setSelectedRegionFilter,
    selectedAilmentFilter,
    setSelectedAilmentFilter,
    setActiveTab,
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

      // Disease / Ailment category filter
      if (selectedAilmentFilter !== 'all' && selectedAilmentFilter.trim()) {
        const ailmentQuery = selectedAilmentFilter.toLowerCase();
        const matchesAilmentList = plant.ailmentsTreated.some(a => 
          a.toLowerCase().includes(ailmentQuery)
        );
        const matchesPrepMethod = plant.preparation.method.toLowerCase().includes(ailmentQuery);
        const matchesScientificNotes = plant.comparativeData?.scientificValidationNotes?.toLowerCase().includes(ailmentQuery) || false;
        
        // Special synonyms mapping
        let synonymMatch = false;
        if (ailmentQuery === 'malaria') {
          synonymMatch = plant.ailmentsTreated.some(a => /fever|pyrexia|iba|plasmodium|woba/i.test(a));
        } else if (ailmentQuery === 'stomach') {
          synonymMatch = plant.ailmentsTreated.some(a => /colic|diarrhea|dysentery|gastric|digestive|qurti|inu/i.test(a));
        } else if (ailmentQuery === 'hypertension') {
          synonymMatch = plant.ailmentsTreated.some(a => /pressure|cardiovascular|heart|bp/i.test(a));
        } else if (ailmentQuery === 'cough') {
          synonymMatch = plant.ailmentsTreated.some(a => /respiratory|bronchitis|asthma|catarrh|throat|cold|flu/i.test(a));
        } else if (ailmentQuery === 'wound') {
          synonymMatch = plant.ailmentsTreated.some(a => /skin|antiseptic|fungal|eczema|cut|lesion|ulcer/i.test(a));
        } else if (ailmentQuery === 'joint') {
          synonymMatch = plant.ailmentsTreated.some(a => /arthrit|rheumat|bone|ache|pain|inflammation/i.test(a));
        } else if (ailmentQuery === 'parasite') {
          synonymMatch = plant.ailmentsTreated.some(a => /worm|cestode|tapeworm|helminth|wosfat/i.test(a));
        } else if (ailmentQuery === 'postpartum') {
          synonymMatch = plant.ailmentsTreated.some(a => /lochia|uterine|delivery|infant|lactation/i.test(a));
        }

        if (!matchesAilmentList && !matchesPrepMethod && !matchesScientificNotes && !synonymMatch) {
          return false;
        }
      }

      // Free-text Search term
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
      const matchVerified = plant.verifiedBy.toLowerCase().includes(query);

      return matchScientific || matchCommon || matchFamily || matchAmharic || matchYoruba || matchOromo || matchHausa || matchAilments || matchPrep || matchVerified;
    });
  }, [plants, selectedRegionFilter, selectedPartFilter, selectedAilmentFilter, searchTerm]);

  const activeAilmentObj = COMMON_AILMENTS.find(a => a.query === selectedAilmentFilter);

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
            placeholder="Search by disease, symptom (malaria, fever, diabetes, cough...), plant or local name..."
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

        {/* SEARCH BY DISEASE & SYMPTOM QUICK SELECTOR */}
        <div className="mt-4 pt-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wide flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-emerald-700" />
              <span>Search by Disease or Symptom:</span>
            </span>
            {selectedAilmentFilter !== 'all' && (
              <button
                onClick={() => setSelectedAilmentFilter('all')}
                className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
              >
                <span>Reset Disease Filter</span>
                <XCircle className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {COMMON_AILMENTS.map(item => {
              const isSelected = (item.id === 'all' && selectedAilmentFilter === 'all') || 
                                (item.query !== '' && selectedAilmentFilter === item.query);
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedAilmentFilter(item.id === 'all' ? 'all' : item.query)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 min-h-[38px] border ${
                    isSelected
                      ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs ring-2 ring-emerald-500/30'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.label}</span>
                  {item.localHint && (
                    <span className={`text-[10px] hidden sm:inline ${isSelected ? 'text-emerald-200' : 'text-stone-400'}`}>
                      ({item.localHint.split('/')[0].trim()})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Morphological Parts Filter Chips */}
        <div className="mt-3.5 flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 border-t border-stone-100">
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

        {/* Active Filter Notification Bar */}
        {(selectedAilmentFilter !== 'all' || searchTerm.trim() !== '') && (
          <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-900">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                Showing <strong>{filteredPlants.length}</strong> {filteredPlants.length === 1 ? 'herb' : 'herbs'} for:
                {selectedAilmentFilter !== 'all' && (
                  <span className="ml-1 px-2 py-0.5 bg-emerald-700 text-white font-bold rounded-md">
                    {activeAilmentObj ? activeAilmentObj.label : selectedAilmentFilter}
                  </span>
                )}
                {searchTerm.trim() !== '' && (
                  <span className="ml-1 px-2 py-0.5 bg-stone-800 text-white font-bold rounded-md">
                    "{searchTerm}"
                  </span>
                )}
              </span>
            </div>
            <button
              onClick={() => {
                setSelectedAilmentFilter('all');
                setSearchTerm('');
              }}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline flex items-center gap-1"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPlants.map((plant) => {
          const isPlayingThis = activeAudioPlantId === plant.id && isPlayingAudio;
          const isContributed = plant.verifiedBy.includes('Contributed');

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

                  {isContributed && (
                    <span className="bg-amber-500 text-stone-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                      🌱 Field Contributed
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
                        {plant.localNames.yoruba || '—'}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-500 block text-[10px]">Amharic (ET):</span>
                      <span className="font-bold text-emerald-950 font-ethiopic">
                        {plant.localNames.amharic || '—'} {plant.localNames.amharicScript ? `(${plant.localNames.amharicScript})` : ''}
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

                {/* Key Ailments / Diseases Treated with Click-to-Filter */}
                <div>
                  <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Stethoscope className="w-3 h-3 text-emerald-600" />
                      <span>{t.ailmentsTitle} (Click to Filter):</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {plant.ailmentsTreated.map((ailment, idx) => {
                      const isMatch = selectedAilmentFilter !== 'all' && 
                        ailment.toLowerCase().includes(selectedAilmentFilter.toLowerCase());
                      const isSearchMatch = searchTerm.trim() !== '' && 
                        ailment.toLowerCase().includes(searchTerm.toLowerCase());

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedAilmentFilter(ailment)}
                          title={`Filter catalog by ${ailment}`}
                          className={`text-[11px] px-2.5 py-1 rounded-lg transition-all text-left flex items-center gap-1 ${
                            isMatch || isSearchMatch
                              ? 'bg-emerald-700 text-white font-bold shadow-xs ring-2 ring-emerald-400'
                              : 'bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-900'
                          }`}
                        >
                          <Tag className="w-2.5 h-2.5" />
                          <span>{ailment}</span>
                          {(isMatch || isSearchMatch) && <span>✓</span>}
                        </button>
                      );
                    })}
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
        <div className="bg-white rounded-2xl p-10 text-center border border-stone-200 text-stone-500 max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl mx-auto mb-2">
            <Stethoscope className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-stone-800">No medicinal plants found</h3>
          <p className="text-xs text-stone-500">
            No herbs matched "{selectedAilmentFilter !== 'all' ? selectedAilmentFilter : searchTerm}". You can clear filters or record a new herb specimen.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedAilmentFilter('all');
                setSelectedRegionFilter('all');
                setSelectedPartFilter('all');
              }}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold"
            >
              Clear All Filters
            </button>
            <button
              onClick={() => setActiveTab('contribute')}
              className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold hover:bg-emerald-600 flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Record New Herb</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
