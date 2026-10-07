import React, { useState, useEffect } from 'react';
import { FarmProvider, useFarm } from './context/FarmContext';
import { Navbar } from './components/Navbar';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { WhyUsPage } from './pages/WhyUsPage';
import { PlansPage } from './pages/PlansPage';
import { FarmLifePage } from './pages/FarmLifePage';
import { ContactPage } from './pages/ContactPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { InvestModal } from './components/InvestModal';
import { DepositModal } from './components/DepositModal';
import { WithdrawModal } from './components/WithdrawModal';
import { AuthModal } from './components/AuthModal';
import { Plan } from './types';

function MainAppContent() {
  const { isOwnerOrAdmin } = useFarm();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [investPlan, setInvestPlan] = useState<Plan | null>(null);

  // Check URL parameters for referral code or initial tab
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref');
      if (ref) {
        setAuthModalMode('register');
        setAuthModalOpen(true);
      }
    } catch {
      // safe fallback
    }
  }, []);

  const openAuth = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleSelectPlan = (plan: Plan) => {
    setInvestPlan(plan);
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Top Announcement Ticker */}
      <AnnouncementBar onLearnMore={() => setActiveTab('plans')} />

      {/* Main Top Navigation conforming to Top Bar Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAuthModal={openAuth}
      />

      {/* Page Routing Container */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage onSelectPlan={handleSelectPlan} onNavigate={setActiveTab} />
        )}
        {activeTab === 'why-us' && (
          <WhyUsPage onNavigate={setActiveTab} />
        )}
        {activeTab === 'plans' && (
          <PlansPage onSelectPlan={handleSelectPlan} onNavigate={setActiveTab} />
        )}
        {activeTab === 'farm-life' && (
          <FarmLifePage onNavigate={setActiveTab} />
        )}
        {activeTab === 'contact' && (
          <ContactPage />
        )}
        {activeTab === 'dashboard' && (
          <DashboardPage
            onOpenDeposit={() => setDepositModalOpen(true)}
            onOpenWithdraw={() => setWithdrawModalOpen(true)}
            onNavigate={setActiveTab}
          />
        )}
        {activeTab === 'admin' && (
          isOwnerOrAdmin ? (
            <AdminDashboardPage />
          ) : (
            <div className="max-w-md mx-auto my-20 p-8 bg-stone-950 border border-stone-800 rounded-3xl text-center space-y-4">
              <h2 className="text-xl font-bold text-red-400">Access Restricted</h2>
              <p className="text-xs text-stone-400">
                You must be logged in as Owner & Super Admin (inam909800@gmail.com) to view this console.
              </p>
              <button
                onClick={() => openAuth('login')}
                className="w-full py-2.5 bg-amber-500 text-stone-950 font-bold text-xs rounded-xl cursor-pointer"
              >
                Log In as Owner
              </button>
            </div>
          )
        )}
        {activeTab === 'login' && (
          <LoginPage
            onNavigate={setActiveTab}
            onLoginSuccess={() => setActiveTab('dashboard')}
          />
        )}
        {activeTab === 'register' && (
          <RegisterPage
            onNavigate={setActiveTab}
            onRegisterSuccess={() => setActiveTab('login')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} openAuthModal={openAuth} />

      {/* Interactive Modals */}
      {investPlan && (
        <InvestModal
          plan={investPlan}
          onClose={() => setInvestPlan(null)}
          onOpenDeposit={() => setDepositModalOpen(true)}
          onSuccess={() => setActiveTab('dashboard')}
        />
      )}

      {depositModalOpen && (
        <DepositModal
          onClose={() => setDepositModalOpen(false)}
          onSuccess={() => setActiveTab('dashboard')}
        />
      )}

      {withdrawModalOpen && (
        <WithdrawModal
          onClose={() => setWithdrawModalOpen(false)}
          onSuccess={() => setActiveTab('dashboard')}
        />
      )}

      {authModalOpen && (
        <AuthModal
          initialMode={authModalMode}
          onClose={() => setAuthModalOpen(false)}
          onSuccess={() => {}}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <FarmProvider>
      <MainAppContent />
    </FarmProvider>
  );
}
