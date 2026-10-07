import React, { useState } from 'react';
import { Logo } from './Logo';
import { useFarm } from '../context/FarmContext';
import { Mail, Phone, MapPin, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openAuthModal: (mode: 'login' | 'register') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, openAuthModal }) => {
  const { settings, isOwnerOrAdmin, quickLoginAsOwner } = useFarm();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 4000);
    }
  };

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {settings.tagline}
            </p>
            <div className="pt-2 text-xs text-stone-500 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="truncate">{settings.farmAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{settings.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{settings.supportPhone}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Farm Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-amber-400 transition-colors">
                  Home & Overview
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('why-us')} className="hover:text-amber-400 transition-colors">
                  Why Us & Technology
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('plans')} className="hover:text-amber-400 transition-colors">
                  Flock Investment Plans
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('farm-life')} className="hover:text-amber-400 transition-colors">
                  Live Farm Telemetry & Coops
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-amber-400 transition-colors">
                  Contact Support & Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Investor & Portal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Investor Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('dashboard')} className="hover:text-amber-400 transition-colors">
                  Investor Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => openAuthModal('login')} className="hover:text-amber-400 transition-colors">
                  Sign In to Account
                </button>
              </li>
              <li>
                <button onClick={() => openAuthModal('register')} className="hover:text-amber-400 transition-colors">
                  Create Farmer Account
                </button>
              </li>
              {isOwnerOrAdmin ? (
                <li>
                  <button onClick={() => navigateTo('admin')} className="text-amber-400 font-semibold hover:underline flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Admin Control Center
                  </button>
                </li>
              ) : (
                <li>
                  <button
                    onClick={quickLoginAsOwner}
                    className="text-amber-400/80 hover:text-amber-300 transition-colors flex items-center gap-1"
                  >
                    👑 Super Admin Access
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Bio-Security & Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Flock Yield Dispatch
            </h4>
            <p className="text-xs text-stone-400">
              Receive weekly batch laying yields, feed audit reports, and new coop cohort alerts.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 w-full"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg transition-colors shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {newsletterSuccess && (
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Subscribed to flock dispatch!
                </p>
              )}
            </form>

            <div className="pt-2">
              <span className="text-[11px] text-stone-500 block leading-tight">
                Bio-Secure Tier-4 Agro Facility · ISO 22000 & HACCP Certified Egg Handling
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} {settings.websiteName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Bio-Security Protocol v4.2</span>
            <span>·</span>
            <span>Automated Daily Settlement</span>
            <span>·</span>
            <button
              onClick={quickLoginAsOwner}
              className="hover:text-amber-400 transition-colors"
            >
              Super Admin (inam909800@gmail.com)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
