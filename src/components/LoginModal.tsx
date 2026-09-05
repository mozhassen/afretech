import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Lock, 
  UserCheck, 
  X, 
  KeyRound, 
  Check, 
  AlertCircle
} from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { 
    isLoginModalOpen, 
    setIsLoginModalOpen, 
    isAuthenticated, 
    login, 
    logout, 
    currentUser,
    setActiveTab 
  } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isLoginModalOpen) return null;

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    const result = login(username, password);
    if (result.success) {
      setSuccessMessage("Authentication verified! Welcome to the Afretec Contributor Portal.");
      setTimeout(() => {
        setSuccessMessage(null);
        setIsLoginModalOpen(false);
        setActiveTab('contribute');
      }, 1000);
    } else {
      setErrorMessage(result.message || 'Invalid username or password.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-stone-200 shadow-2xl relative space-y-5">
        {/* Close button */}
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center text-sm transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl shrink-0">
            <Lock className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-stone-900 tracking-tight">
              Contributor Access Control
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              UniLag & AASTU Ethnobotanical Data Governance
            </p>
          </div>
        </div>

        {/* Notice */}
        <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-xs text-stone-600 leading-relaxed">
          <p>
            <strong>Public Read-Only Access:</strong> All visitors can browse plant profiles, compare Nigeria vs. Ethiopia preparations, and listen to voice guides.
          </p>
          <p className="mt-1 text-emerald-900 font-medium">
            <strong>Adding Data:</strong> Submitting new botanical formulations requires authorized practitioner or researcher credentials.
          </p>
        </div>

        {/* Already Authenticated state */}
        {isAuthenticated ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-200/80 px-3 py-1 rounded-full">
              <Check className="w-3.5 h-3.5" />
              <span>Currently Authenticated</span>
            </div>
            <p className="text-sm font-bold text-stone-900">
              {currentUser.name} ({currentUser.role.toUpperCase()})
            </p>
            <p className="text-xs text-stone-600">
              You are authorized to contribute new herbal knowledge and photos.
            </p>
            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  setIsLoginModalOpen(false);
                  setActiveTab('contribute');
                }}
                className="flex-1 py-2.5 bg-emerald-700 text-white font-bold rounded-xl text-xs hover:bg-emerald-600 transition-colors"
              >
                Go to Contribution Form
              </button>
              <button
                onClick={() => {
                  logout();
                  setUsername('');
                  setPassword('');
                }}
                className="px-4 py-2.5 bg-stone-200 text-stone-700 font-bold rounded-xl text-xs hover:bg-stone-300 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          /* Login Form */
          <form onSubmit={handleLogin} className="space-y-4">
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Username or Healer ID
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. unilag_healer, aastu_researcher, admin"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 min-h-[44px]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Password / Rural PIN
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password or 4-digit PIN"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 min-h-[44px]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-stone-900 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm min-h-[48px]"
            >
              <KeyRound className="w-4 h-4 text-emerald-400" />
              <span>Authorize & Sign In</span>
            </button>

            <div className="pt-3 border-t border-stone-100 text-center">
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Contributor credentials are issued directly to verified traditional healers and consortium researchers by UniLag & AASTU administrators.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
