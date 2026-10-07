import React, { useState } from 'react';
import { Logo } from './Logo';
import { useFarm } from '../context/FarmContext';
import { ShieldCheck, Menu, X, Wallet, Egg, LogOut, ChevronDown } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAuthModal: (mode: 'login' | 'register') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openAuthModal }) => {
  const { currentUser, isOwnerOrAdmin, logout, settings, quickLoginAsOwner } = useFarm();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'plans', label: 'Plans' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'farm-life', label: 'Farm Life' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-stone-900/90 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single element brand wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
          aria-label="EGGS NAVA DIGITAL FARM Home"
        >
          <Logo size="md" />
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-300">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap pb-1 relative focus:outline-none ${
                  isActive
                    ? 'text-amber-400 font-semibold'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}

          {isOwnerOrAdmin && (
            <button
              onClick={() => handleNavClick('admin')}
              className={`transition-colors whitespace-nowrap pb-1 relative focus:outline-none flex items-center gap-1.5 ${
                activeTab === 'admin'
                  ? 'text-amber-300 font-semibold'
                  : 'text-amber-400/90 hover:text-amber-300'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Admin Panel</span>
              {activeTab === 'admin' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
              )}
            </button>
          )}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-stone-800/90 hover:bg-stone-800 border border-stone-700/80 text-left transition-colors focus:outline-none"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-xs font-bold text-stone-950">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <div className="flex items-center gap-1 text-xs font-medium text-stone-200">
                    <span className="truncate max-w-[110px]">{currentUser.name.split(' ')[0]}</span>
                    {currentUser.role === 'superadmin' && (
                      <span className="text-[10px] px-1 py-0.2 bg-amber-500/20 text-amber-400 rounded font-bold">
                        OWNER
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 tabular-nums">
                    {settings.currencySymbol}{currentUser.balance.toLocaleString()}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-stone-800 border border-stone-700 shadow-2xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-stone-700/80">
                    <p className="text-xs text-stone-400">Signed in as</p>
                    <p className="text-xs font-medium text-stone-100 truncate">{currentUser.email}</p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-700/50 text-xs">
                      <span className="text-stone-400 flex items-center gap-1">
                        <Wallet className="w-3.5 h-3.5 text-emerald-400" /> Balance:
                      </span>
                      <span className="font-semibold text-emerald-400 tabular-nums">
                        {settings.currencySymbol}{currentUser.balance.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1 text-xs">
                      <span className="text-stone-400 flex items-center gap-1">
                        <Egg className="w-3.5 h-3.5 text-amber-400" /> Eggs:
                      </span>
                      <span className="font-semibold text-amber-400 tabular-nums">
                        {currentUser.eggBalance.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => handleNavClick('dashboard')}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-stone-200 hover:bg-stone-700/60 flex items-center gap-2"
                    >
                      <Wallet className="w-3.5 h-3.5 text-stone-400" />
                      Investor Dashboard
                    </button>
                    {isOwnerOrAdmin && (
                      <button
                        onClick={() => handleNavClick('admin')}
                        className="w-full px-4 py-2 text-left text-xs font-medium text-amber-400 hover:bg-stone-700/60 flex items-center gap-2"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        Admin Control Center
                      </button>
                    )}
                  </div>

                  <div className="border-t border-stone-700/80 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-red-400 hover:bg-stone-700/60 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('login')}
                className="px-3.5 py-2 text-xs font-semibold text-stone-200 hover:text-white rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap"
              >
                Log In
              </button>
              <button
                onClick={() => openAuthModal('register')}
                className="px-4 py-2 text-xs font-bold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-sm shadow-amber-500/20 transition-all whitespace-nowrap"
              >
                Register
              </button>
            </div>
          )}

          {/* Quick Super Admin Switch for inam909800@gmail.com */}
          {!isOwnerOrAdmin && (
            <button
              onClick={quickLoginAsOwner}
              title="One-click switch to Owner & Super Admin"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-amber-300 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-600/40 rounded-lg transition-colors whitespace-nowrap"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Owner Login
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 border-b border-stone-800 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === link.id
                  ? 'bg-amber-500/10 text-amber-400 font-semibold'
                  : 'text-stone-300 hover:bg-stone-800'
              }`}
            >
              {link.label}
            </button>
          ))}

          {isOwnerOrAdmin && (
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium bg-amber-500/10 text-amber-400 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Super Admin Dashboard
            </button>
          )}

          {!currentUser && (
            <div className="pt-4 border-t border-stone-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="w-full py-2.5 text-center text-sm font-semibold text-stone-200 bg-stone-800 rounded-lg"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('register');
                }}
                className="w-full py-2.5 text-center text-sm font-bold text-stone-950 bg-amber-400 rounded-lg"
              >
                Register
              </button>
              <button
                onClick={() => {
                  quickLoginAsOwner();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-center text-xs font-semibold text-amber-400 border border-amber-500/30 rounded-lg"
              >
                👑 Login as Owner (inam909800@gmail.com)
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
