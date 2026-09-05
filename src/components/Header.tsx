import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Wifi, 
  WifiOff, 
  Globe, 
  UserCheck, 
  ShieldCheck, 
  ChevronDown, 
  Lock, 
  MapPin, 
  Phone, 
  Sparkles,
  Volume2
} from 'lucide-react';
import { Language, UserRole } from '../types';

export const Header: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    t, 
    currentUser, 
    setCurrentRole, 
    updateUserProfile,
    isOnline, 
    toggleNetworkStatus, 
    lastSyncedTimestamp, 
    pendingQueueCount,
    speakText,
    isAuthenticated,
    logout,
    setIsLoginModalOpen
  } = useApp();

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinSuccess, setPinSuccess] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    if (lang === 'en') speakText('Switched to English');
    if (lang === 'am') speakText('ወደ አማርኛ ተቀይሯል');
    if (lang === 'yo') speakText('A ti yípadà sí èdè Yorùbá');
  };

  const roles: { role: UserRole; title: string; desc: string; icon: string }[] = [
    {
      role: 'practitioner',
      title: t.rolePractitioner,
      desc: 'Elder traditional healer. High domain expertise, audio-assisted interface, large touch targets.',
      icon: '🌿'
    },
    {
      role: 'intermediary',
      title: t.roleIntermediary,
      desc: 'Tech-literate community youth assisting elders with camera, GPS, and audio recording.',
      icon: '📱'
    },
    {
      role: 'researcher',
      title: t.roleResearcher,
      desc: 'UniLag & AASTU faculty reviewing submissions, validating taxonomies, and exporting datasets.',
      icon: '🎓'
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 shadow-md border-b border-stone-800">
      {/* Top Banner: Consortium & Offline warning */}
      <div className="bg-stone-950 px-4 py-1.5 text-xs text-stone-300 border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[11px]">
              Afretec Research Consortium
            </span>
            <span className="hidden sm:inline text-stone-500">•</span>
            <span className="hidden sm:inline text-stone-300">
              UniLag (Nigeria) & AASTU (Ethiopia)
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            {/* Network status pill */}
            <button
              onClick={toggleNetworkStatus}
              title={isOnline ? "Click to simulate offline rural conditions" : "Click to simulate online Wi-Fi/cellular connection"}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors border ${
                isOnline 
                  ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60' 
                  : 'bg-amber-950/90 border-amber-500/50 text-amber-200 hover:bg-amber-900/70'
              }`}
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden xs:inline">Online</span>
                  <span className="text-[10px] text-emerald-400/80 hidden md:inline">• Delta Sync Active</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-bold">Offline Cache</span>
                  {pendingQueueCount > 0 && (
                    <span className="bg-amber-500 text-stone-950 px-1 rounded-full text-[10px] font-bold">
                      {pendingQueueCount} queued
                    </span>
                  )}
                </>
              )}
            </button>

            {/* Offline simulation hint button */}
            <button
              onClick={toggleNetworkStatus}
              className="text-stone-400 hover:text-stone-200 underline decoration-dotted text-[11px] hidden lg:inline"
            >
              {isOnline ? "Test Rural Offline" : "Restore Online"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Logo & App Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-xl shadow-inner border border-emerald-400/30">
            🌿
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                {t.appTitle}
              </h1>
              <span className="bg-emerald-900/70 text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-700/50">
                SRS v1.0
              </span>
            </div>
            <p className="text-xs text-stone-400 line-clamp-1 hidden sm:block">
              {t.partnershipTag}
            </p>
          </div>
        </div>

        {/* Right Controls: Language Switcher & Role Selector */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-stone-800 rounded-lg p-1 border border-stone-700">
            <button
              id="lang-btn-en"
              onClick={() => handleLanguageChange('en')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                language === 'en'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              id="lang-btn-am"
              onClick={() => handleLanguageChange('am')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                language === 'am'
                  ? 'bg-emerald-600 text-white shadow-sm font-ethiopic'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="አማርኛ (Amharic)"
            >
              አማርኛ
            </button>
            <button
              id="lang-btn-yo"
              onClick={() => handleLanguageChange('yo')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                language === 'yo'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Èdè Yorùbá"
            >
              Yorùbá
            </button>
          </div>

          {/* User Role Switcher Button */}
          <button
            id="role-switcher-btn"
            onClick={() => setIsRoleModalOpen(true)}
            className="flex items-center gap-2 bg-stone-800 hover:bg-stone-700/90 text-stone-200 px-3 py-1.5 rounded-lg border border-stone-700 transition-colors text-xs font-medium min-h-[44px]"
            title={t.switchRole}
          >
            <div className="w-6 h-6 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-600/40">
              {currentUser.role === 'practitioner' ? '🌿' : currentUser.role === 'intermediary' ? '📱' : '🎓'}
            </div>
            <div className="text-left hidden md:block">
              <span className="block text-[10px] text-stone-400 uppercase tracking-wide">
                Role
              </span>
              <span className="font-semibold text-stone-200 text-xs line-clamp-1 max-w-[130px]">
                {currentUser.role === 'practitioner' ? 'Practitioner' : currentUser.role === 'intermediary' ? 'Youth Assistant' : 'Researcher'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
          </button>

          {/* Contributor Sign In / Status Pill */}
          {isAuthenticated ? (
            <button
              onClick={logout}
              title="Click to sign out of contributor mode"
              className="hidden sm:flex items-center gap-1.5 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors min-h-[44px]"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              title="Sign in with username/password to add plant data"
              className="flex items-center gap-1.5 bg-stone-800 hover:bg-emerald-700 hover:text-white border border-stone-700 text-stone-300 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors min-h-[44px]"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Sign In to Add Data</span>
              <span className="sm:hidden">Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* Offline banner notification if currently in offline mode */}
      {!isOnline && (
        <div className="bg-amber-600/90 text-stone-950 px-4 py-1.5 text-xs font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-stone-950 shrink-0" />
            <span>
              <strong>{t.offlineStatus}:</strong> {t.offlineModeNotice}
            </span>
          </div>
          <button 
            onClick={toggleNetworkStatus}
            className="underline font-bold text-stone-950 hover:text-white shrink-0 ml-3"
          >
            Go Online
          </button>
        </div>
      )}

      {/* Role Switcher & Offline PIN Auth Modal */}
      {isRoleModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl p-6 max-w-md w-full shadow-2xl text-stone-100">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center text-lg">
                  🛡️
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">{t.switchRole}</h3>
                  <p className="text-xs text-stone-400">FR-1.1 & FR-1.2 Multi-Persona Access</p>
                </div>
              </div>
              <button
                onClick={() => setIsRoleModalOpen(false)}
                className="text-stone-400 hover:text-white text-lg w-8 h-8 rounded-full flex items-center justify-center hover:bg-stone-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 mt-4">
              {roles.map(r => (
                <button
                  key={r.role}
                  onClick={() => {
                    setCurrentRole(r.role);
                    setIsRoleModalOpen(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 min-h-[48px] ${
                    currentUser.role === r.role
                      ? 'bg-emerald-950/70 border-emerald-500 text-white shadow-md'
                      : 'bg-stone-800/60 border-stone-700 hover:bg-stone-800 text-stone-300'
                  }`}
                >
                  <span className="text-2xl p-1 bg-stone-900 rounded-lg">{r.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-emerald-300">{r.title}</span>
                      {currentUser.role === r.role && (
                        <span className="bg-emerald-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-400 mt-1 leading-relaxed">{r.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Offline PIN Login & Profile info */}
            <div className="mt-5 p-3.5 bg-stone-950/70 rounded-xl border border-stone-800 text-xs space-y-2">
              <div className="flex items-center justify-between text-stone-400">
                <span className="flex items-center gap-1.5 font-medium text-stone-300">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  Rural Offline PIN Authentication
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">PIN: 1234</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Rural practitioners can unlock encrypted local records using their 4-digit PIN even without cellular signal.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="password"
                  maxLength={4}
                  placeholder="Enter 4-digit PIN"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (e.target.value === '1234') {
                      setPinSuccess(true);
                      setTimeout(() => setPinSuccess(false), 2500);
                    }
                  }}
                  className="bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 w-36 font-mono"
                />
                {pinSuccess && (
                  <span className="text-emerald-400 font-semibold text-xs flex items-center gap-1">
                    ✓ Verified Offline
                  </span>
                )}
              </div>
            </div>

            <div className="mt-5 text-center">
              <button
                onClick={() => setIsRoleModalOpen(false)}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
