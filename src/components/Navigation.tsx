import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  ArrowLeftRight, 
  PlusCircle, 
  RefreshCw, 
  GraduationCap 
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, t, pendingQueueCount, currentUser } = useApp();

  const navItems = [
    {
      id: 'catalog' as const,
      label: t.navCatalog,
      icon: BookOpen,
      badge: null,
      accessibleHint: 'View medicinal plant database'
    },
    {
      id: 'comparison' as const,
      label: t.navComparison,
      icon: ArrowLeftRight,
      badge: 'UniLag/AASTU',
      accessibleHint: 'Compare Nigerian and Ethiopian traditional preparations'
    },
    {
      id: 'contribute' as const,
      label: t.navContribute,
      icon: PlusCircle,
      badge: null,
      accessibleHint: 'Submit new traditional herbal knowledge with voice and photo'
    },
    {
      id: 'sync' as const,
      label: t.navSync,
      icon: RefreshCw,
      badge: pendingQueueCount > 0 ? `${pendingQueueCount}` : null,
      accessibleHint: 'View offline cache status and delta sync engine'
    },
    {
      id: 'researcher' as const,
      label: t.navResearcher,
      icon: GraduationCap,
      badge: null,
      accessibleHint: 'Academic consortium validation and data export'
    }
  ];

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-[73px] z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* Responsive horizontal scrollable tabs with large 48px touch targets */}
        <div className="flex items-center justify-between sm:justify-start sm:gap-2 overflow-x-auto no-scrollbar py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                aria-label={item.accessibleHint}
                className={`relative flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap min-h-[48px] min-w-[48px] ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-300/80 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-emerald-700' : 'text-stone-500'}`} />
                <span className="hidden xs:inline">{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    item.id === 'sync'
                      ? 'bg-amber-500 text-stone-950 animate-bounce'
                      : 'bg-emerald-200 text-emerald-900'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
