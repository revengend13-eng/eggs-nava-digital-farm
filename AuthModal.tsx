import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { X, ShieldCheck, UserCheck, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

interface AuthModalProps {
  initialMode: 'login' | 'register';
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ initialMode, onClose, onSuccess }) => {
  const { login, register, quickLoginAsOwner, quickLoginAsUser } = useFarm();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [jazzcashNumber, setJazzcashNumber] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (mode === 'login') {
      const res = login(email, password);
      if (res.success) {
        setSuccessMsg(res.message);
        setTimeout(() => {
          if (onSuccess) onSuccess();
          onClose();
        }, 1000);
      } else {
        setErrorMsg(res.message);
      }
    } else {
      const res = register(name, email, password, referralCode, jazzcashNumber);
      if (res.success) {
        setSuccessMsg(res.message);
        setTimeout(() => {
          if (onSuccess) onSuccess();
          onClose();
        }, 1200);
      } else {
        setErrorMsg(res.message);
      }
    }
  };

  const handleQuickOwner = () => {
    quickLoginAsOwner();
    setSuccessMsg('Logged in as OWNER & SUPER ADMIN (inam909800@gmail.com)!');
    setTimeout(() => {
      if (onSuccess) onSuccess();
      onClose();
    }, 800);
  };

  const handleQuickInvestor = () => {
    quickLoginAsUser();
    setSuccessMsg('Logged in as Tariq Al-Mansoor (Demo Investor)!');
    setTimeout(() => {
      if (onSuccess) onSuccess();
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close authentication modal"
          className="absolute right-4 top-4 p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center pb-5 border-b border-stone-800">
          <div className="flex justify-center mb-3">
            <Logo size="md" />
          </div>
          <p className="text-xs text-stone-400">
            {mode === 'login' ? 'Access your digital poultry coop & egg yields' : 'Start your automated smart flock portfolio'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 bg-stone-950/70 rounded-xl my-4 border border-stone-800">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
              mode === 'login'
                ? 'bg-stone-800 text-amber-400 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
              mode === 'register'
                ? 'bg-stone-800 text-amber-400 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Quick Demo Logins Banner */}
        <div className="p-3 bg-stone-950/60 border border-stone-800/80 rounded-xl mb-4 space-y-2">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
            Instant 1-Click Access:
          </span>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={handleQuickOwner}
              className="flex-1 py-1.5 px-2 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Owner & Super Admin</span>
            </button>
            <button
              type="button"
              onClick={handleQuickInvestor}
              className="flex-1 py-1.5 px-2 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-stone-400" />
              <span>Demo Investor</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label htmlFor="authFullNameInput" className="block text-xs text-stone-400 mb-1">Full Legal Name</label>
              <input
                id="authFullNameInput"
                type="text"
                placeholder="e.g. Inamullah Khan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="authEmailInput" className="block text-xs text-stone-400 mb-1">Email Address</label>
            <input
              id="authEmailInput"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label htmlFor="authPasswordInput" className="block text-xs text-stone-400 mb-1">Password</label>
            <input
              id="authPasswordInput"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          {mode === 'register' && (
            <>
              <div>
                <label htmlFor="authJazzCashInput" className="block text-xs text-stone-400 mb-1">
                  JazzCash / Easypaisa Mobile Number (For Payouts)
                </label>
                <input
                  id="authJazzCashInput"
                  type="text"
                  placeholder="e.g. 03001234567"
                  value={jazzcashNumber}
                  onChange={(e) => setJazzcashNumber(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label htmlFor="authReferralCodeInput" className="block text-xs text-stone-400 mb-1">
                  Referral Code (Optional)
                </label>
                <input
                  id="authReferralCodeInput"
                  type="text"
                  placeholder="e.g. NAVA-OWNER"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-600 uppercase focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </>
          )}

          {errorMsg && (
            <div className="p-2.5 bg-red-950/50 border border-red-800/50 rounded-xl text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-2.5 bg-emerald-950/50 border border-emerald-800/50 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5 mt-2 cursor-pointer"
          >
            <span>{mode === 'login' ? 'Sign In to Portal' : 'Register & Claim Rs. 100 Bonus'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
