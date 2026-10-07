import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { Logo } from '../components/Logo';
import { ShieldCheck, ArrowRight, AlertCircle, CheckCircle2, Lock, Mail, Smartphone } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (tab: string) => void;
  onLoginSuccess?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLoginSuccess }) => {
  const { login, quickLoginAsOwner, quickLoginAsUser } = useFarm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    const res = login(email, password);
    setIsLoading(false);

    if (res.success) {
      setSuccessMsg(res.message);
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          onNavigate('dashboard');
        }
      }, 700);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleOwnerQuickLogin = () => {
    quickLoginAsOwner();
    setSuccessMsg('Logged in as OWNER & SUPER ADMIN (inam909800@gmail.com)!');
    setTimeout(() => {
      onNavigate('admin');
    }, 600);
  };

  const handleInvestorQuickLogin = () => {
    quickLoginAsUser();
    setSuccessMsg('Logged in as Demo Investor (Tariq Al-Mansoor)!');
    setTimeout(() => {
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        onNavigate('dashboard');
      }
    }, 600);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-stone-950/90 border border-stone-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
        {/* Decorative ambient glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-20 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

        {/* Brand and Heading */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight mt-4">
            Investor Portal Login
          </h2>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            Sign in to manage your digital poultry coops, track daily egg yield dividends, and withdraw PKR to JazzCash.
          </p>
        </div>

        {/* Notifications */}
        {errorMsg && (
          <div className="p-3.5 bg-red-950/70 border border-red-800/80 rounded-xl text-red-300 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 bg-emerald-950/70 border border-emerald-800/80 rounded-xl text-emerald-300 text-xs flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-300">
              Email or Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="inam909800@gmail.com"
                className="w-full pl-10 pr-3.5 py-3 bg-stone-900 border border-stone-800 rounded-xl text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-stone-300">Password</label>
              <button
                type="button"
                onClick={() => alert('For password reset, please contact support at support@eggsnava.pk or use the one-click demo credentials below.')}
                className="text-[11px] text-amber-400 hover:text-amber-300 cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3.5 py-3 bg-stone-900 border border-stone-800 rounded-xl text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{isLoading ? 'Verifying...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Navigation to Register */}
        <div className="text-center pt-2 border-t border-stone-800/80">
          <p className="text-xs text-stone-400">
            Don't have a poultry portfolio yet?{' '}
            <button
              onClick={() => onNavigate('register')}
              className="font-bold text-amber-400 hover:text-amber-300 cursor-pointer ml-1 underline decoration-amber-500/40"
            >
              Register here (Get Rs. 100 Bonus)
            </button>
          </p>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="pt-4 border-t border-stone-800/80 space-y-2">
          <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider text-center">
            Instant One-Click Access
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleOwnerQuickLogin}
              className="py-2.5 px-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Owner / Admin</span>
            </button>
            <button
              type="button"
              onClick={handleInvestorQuickLogin}
              className="py-2.5 px-3 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-xl text-stone-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Demo Investor</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
