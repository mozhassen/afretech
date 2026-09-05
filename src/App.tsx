import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { PlantCatalog } from './components/PlantCatalog';
import { CrossBorderComparison } from './components/CrossBorderComparison';
import { ContributeModule } from './components/ContributeModule';
import { OfflineSyncEngine } from './components/OfflineSyncEngine';
import { ResearcherAdmin } from './components/ResearcherAdmin';
import { PlantDetailModal } from './components/PlantDetailModal';
import { AudioAssistantFloating } from './components/AudioAssistantFloating';

const MainAppContent: React.FC = () => {
  const { activeTab, t, isOnline, pendingQueueCount, runDeltaSync } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-stone-100 text-stone-900 font-sans selection:bg-emerald-600 selection:text-white">
      {/* Top Application Header */}
      <Header />

      {/* Main Navigation Bar (48dp Touch Targets for Elders) */}
      <Navigation />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8 space-y-6">
        {activeTab === 'catalog' && <PlantCatalog />}
        {activeTab === 'comparison' && <CrossBorderComparison />}
        {activeTab === 'contribute' && <ContributeModule />}
        {activeTab === 'sync' && <OfflineSyncEngine />}
        {activeTab === 'researcher' && <ResearcherAdmin />}
      </main>

      {/* Modal for Plant Details */}
      <PlantDetailModal />

      {/* Floating Low-Literacy Audio Assistant */}
      <AudioAssistantFloating />

      {/* Footer with Afretec Consortium Attribution */}
      <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 py-8 px-4 mt-12 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1.5">
            <div className="flex items-center justify-center md:justify-start gap-2 text-stone-200 font-bold text-sm">
              <span className="w-5 h-5 rounded-md bg-emerald-600 flex items-center justify-center text-xs">🌿</span>
              <span>Afretec Research Consortium — Traditional Medicine Mobile App</span>
            </div>
            <p className="text-stone-400 max-w-xl text-[11px] leading-relaxed">
              "Empowering Indigenous Healthcare Practitioners and Elevating the Practice Through Telecommunication Across Africa"
            </p>
            <p className="text-stone-500 text-[10px]">
              Institutional Partnership: University of Lagos (UniLag, Nigeria) & Addis Ababa Science and Technology University (AASTU, Ethiopia)
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-[11px] text-stone-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Offline-First SQLite Cache</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              <span>PostGIS Geospatial DB</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Opus/AAC Media Compression</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
