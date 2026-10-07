import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { User, Plan, Announcement, SupportInquiry } from '../types';
import {
  ShieldCheck,
  Users,
  Layers,
  Settings,
  Megaphone,
  CreditCard,
  TrendingUp,
  Edit,
  Trash2,
  Plus,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Save,
  MessageSquare,
  Search,
  Eye,
  RefreshCw,
  Wallet,
  Egg
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const {
    currentUser,
    users,
    plans,
    transactions,
    settings,
    announcements,
    inquiries,
    updateSettings,
    updateUser,
    addUser,
    deleteUser,
    updatePlan,
    addPlan,
    deletePlan,
    approveDepositAndActivatePlan,
    approveDeposit,
    rejectDeposit,
    approveWithdrawal,
    rejectWithdrawal,
    addAnnouncement,
    deleteAnnouncement,
    toggleAnnouncement,
    updateInquiryStatus,
    resetAllData
  } = useFarm();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'users' | 'plans' | 'payments' | 'payment_settings' | 'branding' | 'settings' | 'announcements' | 'inquiries'
  >('overview');

  const [statusNotification, setStatusNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setStatusNotification(msg);
    setTimeout(() => setStatusNotification(null), 3000);
  };

  // User Management State
  const [userSearch, setUserSearch] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUserModal, setNewUserModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: 'user' as const,
    balance: 500,
    eggBalance: 200,
    eggRatePerUnit: settings.eggUnitPricePkr || settings.eggUnitPrice || 35,
    eggRatePerUsd: settings.eggUnitPricePkr || settings.eggUnitPrice || 35,
    totalInvested: 0,
    totalWithdrawn: 0,
    referralCode: `NAVA-${Math.floor(1000 + Math.random() * 9000)}`,
    referralEarnings: 0,
    referralCount: 0,
    status: 'active' as const
  });

  // Plan Management State
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [newPlanModal, setNewPlanModal] = useState(false);
  const [newPlanData, setNewPlanData] = useState<Omit<Plan, 'id'>>({
    name: '',
    flockType: 'ISA Brown High-Yield Trio',
    henCount: 1,
    pricePkr: 500,
    dailyReturnPkr: 35,
    minDeposit: 500,
    maxDeposit: 5000,
    dailyReturnPercent: 7.0,
    durationDays: 30,
    dailyEggYieldEstimate: 1,
    payoutFrequency: 'Daily',
    capitalReturn: true,
    active: true,
    popular: false,
    description: 'Verified ISA Brown layers with automated egg collection and daily JazzCash profit payouts.',
    features: ['Daily automated egg yield', '100% capital returned', '24/7 IoT sensors', 'Daily JazzCash payout']
  });

  // Branding Form State
  const [brandingForm, setBrandingForm] = useState({
    websiteName: settings.websiteName,
    tagline: settings.tagline,
    logoText: settings.logoText,
    logoSubtitle: settings.logoSubtitle,
    heroHeadline: settings.heroHeadline,
    heroSubheadline: settings.heroSubheadline,
    marqueeNotice: settings.marqueeNotice,
    enableMarquee: settings.enableMarquee
  });

  // System Settings Form State
  const [systemForm, setSystemForm] = useState({
    currencySymbol: settings.currencySymbol,
    eggUnitPrice: settings.eggUnitPricePkr || settings.eggUnitPrice || 35,
    minDeposit: settings.minDepositPkr || settings.minDeposit || 500,
    minWithdrawal: settings.minWithdrawalPkr || settings.minWithdrawal || 200,
    referralTier1Percent: settings.referralTier1Percent,
    referralTier2Percent: settings.referralTier2Percent,
    referralTier3Percent: settings.referralTier3Percent,
    contactEmail: settings.contactEmail,
    supportPhone: settings.supportPhone,
    farmAddress: settings.farmAddress,
    telegramChannel: settings.telegramChannel,
    whatsappSupport: settings.whatsappSupport,
    maintenanceMode: settings.maintenanceMode,
    // Mobile Wallets (Easypaisa & JazzCash)
    easypaisaAccountName: settings.paymentMethods.easypaisa?.accountName || 'Inam Ullah',
    easypaisaAccountNumber: settings.paymentMethods.easypaisa?.accountNumber || '03001234567',
    easypaisaEnabled: settings.paymentMethods.easypaisa?.enabled ?? true,
    jazzcashAccountName: settings.paymentMethods.jazzcash?.accountName || 'Inam Ullah',
    jazzcashAccountNumber: settings.paymentMethods.jazzcash?.accountNumber || '03007654321',
    jazzcashEnabled: settings.paymentMethods.jazzcash?.enabled ?? true,
    // Crypto & Bank Payments
    usdtTrc20Address: settings.paymentMethods.usdtTrc20.address,
    usdtBep20Address: settings.paymentMethods.usdtBep20.address,
    btcAddress: settings.paymentMethods.btc.address,
    bankName: settings.paymentMethods.bankTransfer.bankName,
    bankAccount: settings.paymentMethods.bankTransfer.accountNumber,
    bankSwift: settings.paymentMethods.bankTransfer.swift
  });

  // Announcements State
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnContent, setNewAnnContent] = useState('');
  const [newAnnType, setNewAnnType] = useState<'info' | 'alert' | 'promo' | 'update'>('update');

  // Stats Calculations
  const totalVolume = users.reduce((acc, u) => acc + u.totalInvested, 0);
  const totalWithdrawn = users.reduce((acc, u) => acc + u.totalWithdrawn, 0);
  const totalEggs = users.reduce((acc, u) => acc + u.eggBalance, 0);
  const pendingDeposits = transactions.filter(t => t.type === 'deposit' && t.status === 'pending');
  const pendingWithdrawals = transactions.filter(t => t.type === 'withdrawal' && t.status === 'pending');

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.referralCode.toLowerCase().includes(userSearch.toLowerCase())
  );

  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(brandingForm);
    showNotification('Website branding and content updated successfully! Live across all pages.');
  };

  const handleSavePaymentSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      paymentMethods: {
        ...settings.paymentMethods,
        easypaisa: {
          ...settings.paymentMethods.easypaisa,
          enabled: systemForm.easypaisaEnabled,
          accountName: systemForm.easypaisaAccountName,
          accountNumber: systemForm.easypaisaAccountNumber
        },
        jazzcash: {
          ...settings.paymentMethods.jazzcash,
          enabled: systemForm.jazzcashEnabled,
          accountName: systemForm.jazzcashAccountName,
          accountNumber: systemForm.jazzcashAccountNumber
        },
        usdtTrc20: { ...settings.paymentMethods.usdtTrc20, address: systemForm.usdtTrc20Address },
        usdtBep20: { ...settings.paymentMethods.usdtBep20, address: systemForm.usdtBep20Address },
        btc: { ...settings.paymentMethods.btc, address: systemForm.btcAddress },
        bankTransfer: {
          ...settings.paymentMethods.bankTransfer,
          bankName: systemForm.bankName,
          accountNumber: systemForm.bankAccount,
          swift: systemForm.bankSwift
        }
      }
    });
    showNotification('Payment settings saved! Easypaisa & JazzCash account details updated live for all users.');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      currencySymbol: systemForm.currencySymbol,
      eggUnitPricePkr: Number(systemForm.eggUnitPrice),
      eggUnitPrice: Number(systemForm.eggUnitPrice),
      minDepositPkr: Number(systemForm.minDeposit),
      minDeposit: Number(systemForm.minDeposit),
      minWithdrawalPkr: Number(systemForm.minWithdrawal),
      minWithdrawal: Number(systemForm.minWithdrawal),
      referralTier1Percent: Number(systemForm.referralTier1Percent),
      referralTier2Percent: Number(systemForm.referralTier2Percent),
      referralTier3Percent: Number(systemForm.referralTier3Percent),
      contactEmail: systemForm.contactEmail,
      supportPhone: systemForm.supportPhone,
      farmAddress: systemForm.farmAddress,
      telegramChannel: systemForm.telegramChannel,
      whatsappSupport: systemForm.whatsappSupport,
      maintenanceMode: systemForm.maintenanceMode,
      paymentMethods: {
        ...settings.paymentMethods,
        easypaisa: {
          ...settings.paymentMethods.easypaisa,
          enabled: systemForm.easypaisaEnabled,
          accountName: systemForm.easypaisaAccountName,
          accountNumber: systemForm.easypaisaAccountNumber
        },
        jazzcash: {
          ...settings.paymentMethods.jazzcash,
          enabled: systemForm.jazzcashEnabled,
          accountName: systemForm.jazzcashAccountName,
          accountNumber: systemForm.jazzcashAccountNumber
        },
        usdtTrc20: { ...settings.paymentMethods.usdtTrc20, address: systemForm.usdtTrc20Address },
        usdtBep20: { ...settings.paymentMethods.usdtBep20, address: systemForm.usdtBep20Address },
        btc: { ...settings.paymentMethods.btc, address: systemForm.btcAddress },
        bankTransfer: {
          ...settings.paymentMethods.bankTransfer,
          bankName: systemForm.bankName,
          accountNumber: systemForm.bankAccount,
          swift: systemForm.bankSwift
        }
      }
    });
    showNotification('System parameters & payment gateways saved successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Super Admin Top Header */}
      <div className="bg-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white font-display">
                Owner & Super Admin Console
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 font-black text-[10px] uppercase">
                ROOT PRIVILEGES
              </span>
            </div>
            <p className="text-xs text-stone-400 font-mono mt-0.5">
              Logged in: <span className="text-amber-400">{currentUser?.email || 'inam909800@gmail.com'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (window.confirm('Reset all demo state to fresh default values?')) {
                resetAllData();
                showNotification('Platform restored to default factory state.');
              }
            }}
            className="px-3 py-2 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white text-xs font-semibold rounded-xl border border-stone-800 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Floating Status Notification */}
      {statusNotification && (
        <div className="p-4 bg-emerald-950 border border-emerald-700/80 rounded-2xl text-xs text-emerald-200 flex items-center gap-2 shadow-xl animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{statusNotification}</span>
        </div>
      )}

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 bg-stone-950 border border-stone-800 rounded-2xl overflow-x-auto">
        {[
          { key: 'overview', label: 'Platform Overview', icon: TrendingUp },
          { key: 'users', label: `Users (${users.length})`, icon: Users },
          { key: 'plans', label: `Flock Plans (${plans.length})`, icon: Layers },
          {
            key: 'payments',
            label: `Payment Center (${pendingDeposits.length + pendingWithdrawals.length} Pending)`,
            icon: CreditCard
          },
          {
            key: 'payment_settings',
            label: 'Payment Settings (Easypaisa / JazzCash)',
            icon: Wallet
          },
          { key: 'branding', label: 'Branding & Content', icon: Edit },
          { key: 'settings', label: 'Settings & Gateways', icon: Settings },
          { key: 'announcements', label: `Announcements (${announcements.length})`, icon: Megaphone },
          { key: 'inquiries', label: `Support Tickets (${inquiries.length})`, icon: MessageSquare }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap flex items-center gap-2 shrink-0 ${
                isActive
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/10'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 bg-stone-950 border border-stone-800 rounded-2xl space-y-1">
              <span className="text-xs text-stone-400">Total Capital Volume</span>
              <p className="text-2xl sm:text-3xl font-bold text-white font-mono">
                {settings.currencySymbol}{totalVolume.toLocaleString()}
              </p>
              <span className="text-[11px] text-emerald-400">Active investor holdings</span>
            </div>

            <div className="p-6 bg-stone-950 border border-stone-800 rounded-2xl space-y-1">
              <span className="text-xs text-stone-400">Pending Approvals</span>
              <p className="text-2xl sm:text-3xl font-bold text-amber-400 font-mono">
                {pendingDeposits.length + pendingWithdrawals.length}
              </p>
              <span className="text-[11px] text-amber-300">
                {pendingDeposits.length} deposits · {pendingWithdrawals.length} withdrawals
              </span>
            </div>

            <div className="p-6 bg-stone-950 border border-stone-800 rounded-2xl space-y-1">
              <span className="text-xs text-stone-400">Registered Users</span>
              <p className="text-2xl sm:text-3xl font-bold text-white font-mono">
                {users.length}
              </p>
              <span className="text-[11px] text-stone-400">Investor accounts</span>
            </div>

            <div className="p-6 bg-stone-950 border border-stone-800 rounded-2xl space-y-1">
              <span className="text-xs text-stone-400">Total Eggs in Wallets</span>
              <p className="text-2xl sm:text-3xl font-bold text-amber-400 font-mono">
                {totalEggs.toLocaleString()}
              </p>
              <span className="text-[11px] text-stone-400">
                Value: {settings.currencySymbol}{(totalEggs * (settings.eggUnitPricePkr || settings.eggUnitPrice || 35)).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-stone-950 border border-stone-800 rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Pending Deposits ({pendingDeposits.length})</h3>
              </div>
              <p className="text-xs text-stone-400">
                Investors awaiting deposit confirmation and balance crediting.
              </p>
              <button
                onClick={() => setActiveTab('payments')}
                className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-semibold rounded-lg border border-stone-800 transition-colors"
              >
                Review Deposit Requests
              </button>
            </div>

            <div className="p-6 bg-stone-950 border border-stone-800 rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Manage Accounts ({users.length})</h3>
              </div>
              <p className="text-xs text-stone-400">
                Credit balances, adjust egg counts, manage roles, or toggle user status.
              </p>
              <button
                onClick={() => setActiveTab('users')}
                className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-semibold rounded-lg border border-stone-800 transition-colors"
              >
                Open User Roster
              </button>
            </div>

            <div className="p-6 bg-stone-950 border border-stone-800 rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-sky-400" />
                <h3 className="text-sm font-bold text-white">Live Website Branding</h3>
              </div>
              <p className="text-xs text-stone-400">
                Update website name, logo text, hero headlines, or notification marquee.
              </p>
              <button
                onClick={() => setActiveTab('branding')}
                className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-semibold rounded-lg border border-stone-800 transition-colors"
              >
                Edit Content & Brand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USERS MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search user by name, email, or referral code..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              onClick={() => setNewUserModal(true)}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create New User</span>
            </button>
          </div>

          <div className="bg-stone-950 border border-stone-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-stone-800 text-stone-400 font-bold uppercase tracking-wider bg-stone-900/50">
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Wallet Balance</th>
                    <th className="py-3 px-4">Egg Balance</th>
                    <th className="py-3 px-4">Referrals</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60 text-stone-300">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-stone-900/30">
                      <td className="py-3 px-4">
                        <div className="font-bold text-white">{u.name}</div>
                        <div className="text-[11px] text-stone-400 font-mono">{u.email}</div>
                        <div className="text-[10px] text-amber-400 font-mono mt-0.5">Ref: {u.referralCode}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            u.role === 'superadmin'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : u.role === 'admin'
                              ? 'bg-sky-500/20 text-sky-300'
                              : 'bg-stone-800 text-stone-300'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                        {settings.currencySymbol}{u.balance.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-amber-400">
                        {u.eggBalance.toLocaleString()} eggs
                      </td>
                      <td className="py-3 px-4 font-mono text-stone-300">
                        {u.referralCount} ({settings.currencySymbol}{u.referralEarnings.toFixed(2)})
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            u.status === 'active'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-red-500/10 text-red-400'
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => setEditingUser(u)}
                          className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-[11px] font-semibold transition-colors"
                        >
                          Edit / Adjust
                        </button>
                        {u.role !== 'superadmin' && (
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete account for ${u.name}?`)) {
                                deleteUser(u.id);
                                showNotification(`User ${u.name} removed.`);
                              }
                            }}
                            className="p-1 text-red-400 hover:text-red-300 transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PLANS MANAGEMENT */}
      {activeTab === 'plans' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white font-display">Manage Flock Investment Plans</h2>
              <p className="text-xs text-stone-400">Create, adjust returns, or modify duration and deposit thresholds.</p>
            </div>
            <button
              onClick={() => setNewPlanModal(true)}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Plan</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="p-6 bg-stone-950 border border-stone-800 rounded-2xl space-y-4 relative"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">{plan.name}</h3>
                    <p className="text-xs text-amber-400">{plan.flockType}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      plan.active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-stone-800 text-stone-500'
                    }`}
                  >
                    {plan.active ? 'ACTIVE' : 'DISABLED'}
                  </span>
                </div>

                <div className="p-3 bg-stone-900/60 rounded-xl space-y-1 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-stone-400 font-sans">Daily Return:</span>
                    <span className="text-amber-400 font-bold">{plan.dailyReturnPercent}% / day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400 font-sans">Harvest Duration:</span>
                    <span className="text-white">{plan.durationDays} Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400 font-sans">Fixed Plan Price:</span>
                    <span className="text-emerald-400 font-bold">
                      {settings.currencySymbol}{plan.pricePkr.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400 font-sans">Daily Egg Quota:</span>
                    <span className="text-amber-300">~{plan.dailyEggYieldEstimate} eggs/day</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setEditingPlan(plan)}
                    className="flex-1 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Plan</span>
                  </button>
                  <button
                    onClick={() => {
                      updatePlan(plan.id, { active: !plan.active });
                      showNotification(`Plan status toggled.`);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      plan.active
                        ? 'bg-amber-500/15 text-amber-300 hover:bg-amber-500/25'
                        : 'bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25'
                    }`}
                  >
                    {plan.active ? 'Pause' : 'Activate'}
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete plan ${plan.name}?`)) {
                        deletePlan(plan.id);
                        showNotification(`Plan deleted.`);
                      }
                    }}
                    className="p-1.5 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PAYMENTS & APPROVALS */}
      {activeTab === 'payments' && (
        <div className="space-y-8">
          {/* Quick Switch to Payment Settings */}
          <div className="p-5 bg-gradient-to-r from-amber-950/40 via-stone-900 to-stone-950 border border-amber-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Active Payment Gateways (Easypaisa & JazzCash)</h4>
                <p className="text-xs text-stone-400">
                  Easypaisa: <span className="text-amber-300 font-mono font-semibold">{systemForm.easypaisaAccountName} ({systemForm.easypaisaAccountNumber})</span> · JazzCash: <span className="text-amber-300 font-mono font-semibold">{systemForm.jazzcashAccountName} ({systemForm.jazzcashAccountNumber})</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('payment_settings')}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl transition-colors whitespace-nowrap shadow-sm"
            >
              Configure Payment Accounts
            </button>
          </div>

          {/* Pending Deposits */}
          <div className="bg-stone-950 border border-stone-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  Pending Deposits Verification ({pendingDeposits.length})
                </h3>
                <p className="text-xs text-stone-400">
                  Review transaction hashes and click Approve to instantly credit the user's wallet.
                </p>
              </div>
            </div>

            {pendingDeposits.length === 0 ? (
              <p className="text-xs text-stone-500 py-4 text-center">No pending deposits awaiting review.</p>
            ) : (
              <div className="space-y-3">
                {pendingDeposits.map((dep) => (
                  <div
                    key={dep.id}
                    className="p-4 bg-stone-900/60 border border-stone-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{dep.userName}</span>
                        <span className="text-xs text-stone-400">({dep.userEmail})</span>
                        {dep.planName && (
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                            {dep.planName}
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-mono text-emerald-400 font-bold mt-1">
                        Amount: {settings.currencySymbol}{dep.amount.toLocaleString()} via {dep.method}
                      </div>
                      <div className="text-[11px] text-stone-300 font-mono mt-0.5">
                        TID / TRX: <span className="text-amber-300 font-bold">{dep.tid || dep.txHash || 'Unspecified'}</span>
                        {dep.senderNumber && <span> · Sender Mobile: <span className="text-white">{dep.senderNumber}</span></span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => {
                          const res = approveDepositAndActivatePlan(dep.id);
                          showNotification(res.message);
                        }}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve & Activate Plan</span>
                      </button>
                      <button
                        onClick={() => {
                          const reason = prompt('Reason for rejection:', 'Transaction hash unconfirmed');
                          if (reason !== null) {
                            rejectDeposit(dep.id, reason);
                            showNotification('Deposit rejected.');
                          }
                        }}
                        className="px-3 py-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-300 font-semibold text-xs rounded-lg border border-red-800 transition-colors flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pending Withdrawals */}
          <div className="bg-stone-950 border border-stone-800 rounded-2xl p-6 space-y-4">
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Pending Withdrawals Processing ({pendingWithdrawals.length})
              </h3>
              <p className="text-xs text-stone-400">
                Verify recipient wallet and confirm payout settlement.
              </p>
            </div>

            {pendingWithdrawals.length === 0 ? (
              <p className="text-xs text-stone-500 py-4 text-center">No pending withdrawals.</p>
            ) : (
              <div className="space-y-3">
                {pendingWithdrawals.map((wth) => (
                  <div
                    key={wth.id}
                    className="p-4 bg-stone-900/60 border border-stone-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{wth.userName}</span>
                        <span className="text-xs text-stone-400">({wth.userEmail})</span>
                      </div>
                      <div className="text-xs font-mono text-amber-400 font-bold mt-1">
                        Amount: {settings.currencySymbol}{wth.amount.toFixed(2)} via {wth.method}
                      </div>
                      <div className="text-[11px] text-stone-300 font-mono break-all mt-0.5">
                        Destination: {wth.walletAddress}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => {
                          approveWithdrawal(wth.id);
                          showNotification(`Withdrawal of ${settings.currencySymbol}${wth.amount} approved!`);
                        }}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve Payout</span>
                      </button>
                      <button
                        onClick={() => {
                          const reason = prompt('Reason for rejection (funds will be refunded):', 'Compliance verification required');
                          if (reason !== null) {
                            rejectWithdrawal(wth.id, reason);
                            showNotification('Withdrawal rejected and funds refunded to user.');
                          }
                        }}
                        className="px-3 py-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-300 font-semibold text-xs rounded-lg border border-red-800 transition-colors flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject & Refund</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB: PAYMENT SETTINGS (EASYPAISA, JAZZCASH & GATEWAYS) */}
      {activeTab === 'payment_settings' && (
        <form onSubmit={handleSavePaymentSettings} className="bg-stone-950 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-8">
          <div className="border-b border-stone-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white font-display">
                  Payment Settings & Deposit Gateways
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-extrabold uppercase">
                  SUPER ADMIN ONLY
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">
                Configure your official Easypaisa, JazzCash, Crypto, and Bank accounts. Changes saved here will update the live website database and display to users automatically in the Deposit and Withdrawal modals.
              </p>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap self-start sm:self-auto"
            >
              <Save className="w-4 h-4" />
              <span>Save Payment Settings</span>
            </button>
          </div>

          {/* Section: Mobile Wallets (Easypaisa & JazzCash) */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                Pakistan Mobile Wallets (Easypaisa & JazzCash)
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Card 1: Easypaisa Account Details */}
              <div className="p-5 bg-stone-900/70 border border-stone-800 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-extrabold text-xs">
                      EP
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Easypaisa Payment Gateway</h4>
                      <p className="text-[11px] text-stone-400">Direct mobile account deposit</p>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemForm.easypaisaEnabled}
                      onChange={(e) => setSystemForm({ ...systemForm, easypaisaEnabled: e.target.checked })}
                      className="rounded accent-emerald-500"
                    />
                    <span>{systemForm.easypaisaEnabled ? 'Enabled' : 'Disabled'}</span>
                  </label>
                </div>

                <div className="space-y-3">
                  <div>
                    <label htmlFor="adminEasypaisaNameInput" className="block text-xs font-semibold text-stone-300 mb-1">
                      Easypaisa Account Name / Title
                    </label>
                    <input
                      id="adminEasypaisaNameInput"
                      type="text"
                      placeholder="e.g. Inam Ullah"
                      value={systemForm.easypaisaAccountName}
                      onChange={(e) => setSystemForm({ ...systemForm, easypaisaAccountName: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-medium"
                      required
                    />
                    <p className="text-[10px] text-stone-500 mt-1">This exact title will be shown to users when sending funds via Easypaisa.</p>
                  </div>

                  <div>
                    <label htmlFor="adminEasypaisaNumberInput" className="block text-xs font-semibold text-stone-300 mb-1">
                      Easypaisa Account Number / Mobile Number
                    </label>
                    <input
                      id="adminEasypaisaNumberInput"
                      type="text"
                      placeholder="e.g. 03001234567"
                      value={systemForm.easypaisaAccountNumber}
                      onChange={(e) => setSystemForm({ ...systemForm, easypaisaAccountNumber: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-amber-300 focus:outline-none focus:border-amber-500 font-mono font-bold"
                      required
                    />
                    <p className="text-[10px] text-stone-500 mt-1">Users will copy this number directly to transfer money.</p>
                  </div>

                  {/* Live Preview Box */}
                  <div className="p-3 bg-stone-950/90 border border-stone-800 rounded-xl text-xs space-y-1">
                    <span className="text-[10px] text-stone-400 uppercase font-semibold block">Live User View (Preview):</span>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Account Title:</span>
                      <span className="font-bold text-white">{systemForm.easypaisaAccountName || 'Not Set'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Account Number:</span>
                      <span className="font-mono font-bold text-amber-400">{systemForm.easypaisaAccountNumber || 'Not Set'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: JazzCash Account Details */}
              <div className="p-5 bg-stone-900/70 border border-stone-800 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 font-extrabold text-xs">
                      JC
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">JazzCash Payment Gateway</h4>
                      <p className="text-[11px] text-stone-400">Direct mobile account deposit</p>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemForm.jazzcashEnabled}
                      onChange={(e) => setSystemForm({ ...systemForm, jazzcashEnabled: e.target.checked })}
                      className="rounded accent-red-500"
                    />
                    <span>{systemForm.jazzcashEnabled ? 'Enabled' : 'Disabled'}</span>
                  </label>
                </div>

                <div className="space-y-3">
                  <div>
                    <label htmlFor="adminJazzcashNameInput" className="block text-xs font-semibold text-stone-300 mb-1">
                      JazzCash Account Name / Title
                    </label>
                    <input
                      id="adminJazzcashNameInput"
                      type="text"
                      placeholder="e.g. Inam Ullah"
                      value={systemForm.jazzcashAccountName}
                      onChange={(e) => setSystemForm({ ...systemForm, jazzcashAccountName: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-medium"
                      required
                    />
                    <p className="text-[10px] text-stone-500 mt-1">This exact title will be shown to users when sending funds via JazzCash.</p>
                  </div>

                  <div>
                    <label htmlFor="adminJazzcashNumberInput" className="block text-xs font-semibold text-stone-300 mb-1">
                      JazzCash Account Number / Mobile Number
                    </label>
                    <input
                      id="adminJazzcashNumberInput"
                      type="text"
                      placeholder="e.g. 03007654321"
                      value={systemForm.jazzcashAccountNumber}
                      onChange={(e) => setSystemForm({ ...systemForm, jazzcashAccountNumber: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-amber-300 focus:outline-none focus:border-amber-500 font-mono font-bold"
                      required
                    />
                    <p className="text-[10px] text-stone-500 mt-1">Users will copy this number directly to transfer money.</p>
                  </div>

                  {/* Live Preview Box */}
                  <div className="p-3 bg-stone-950/90 border border-stone-800 rounded-xl text-xs space-y-1">
                    <span className="text-[10px] text-stone-400 uppercase font-semibold block">Live User View (Preview):</span>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Account Title:</span>
                      <span className="font-bold text-white">{systemForm.jazzcashAccountName || 'Not Set'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Account Number:</span>
                      <span className="font-mono font-bold text-amber-400">{systemForm.jazzcashAccountNumber || 'Not Set'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Crypto & Bank Gateways */}
          <div className="pt-4 border-t border-stone-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Cryptocurrency & International Bank Transfer Gateways
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="adminPayUsdtTrc20Input" className="block text-xs text-stone-400 mb-1">USDT (TRC-20) Deposit Address</label>
                <input
                  id="adminPayUsdtTrc20Input"
                  type="text"
                  value={systemForm.usdtTrc20Address}
                  onChange={(e) => setSystemForm({ ...systemForm, usdtTrc20Address: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label htmlFor="adminPayUsdtBep20Input" className="block text-xs text-stone-400 mb-1">USDT (BEP-20) Deposit Address</label>
                <input
                  id="adminPayUsdtBep20Input"
                  type="text"
                  value={systemForm.usdtBep20Address}
                  onChange={(e) => setSystemForm({ ...systemForm, usdtBep20Address: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label htmlFor="adminPayBtcAddressInput" className="block text-xs text-stone-400 mb-1">Bitcoin (BTC) Address</label>
                <input
                  id="adminPayBtcAddressInput"
                  type="text"
                  value={systemForm.btcAddress}
                  onChange={(e) => setSystemForm({ ...systemForm, btcAddress: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label htmlFor="adminPayBankNameInput" className="block text-xs text-stone-400 mb-1">Bank Name & Wire Instructions</label>
                <input
                  id="adminPayBankNameInput"
                  type="text"
                  value={systemForm.bankName}
                  onChange={(e) => setSystemForm({ ...systemForm, bankName: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label htmlFor="adminPayBankAccountInput" className="block text-xs text-stone-400 mb-1">Bank Account Number / IBAN</label>
                <input
                  id="adminPayBankAccountInput"
                  type="text"
                  value={systemForm.bankAccount}
                  onChange={(e) => setSystemForm({ ...systemForm, bankAccount: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label htmlFor="adminPayBankSwiftInput" className="block text-xs text-stone-400 mb-1">Bank SWIFT / BIC Code</label>
                <input
                  id="adminPayBankSwiftInput"
                  type="text"
                  value={systemForm.bankSwift}
                  onChange={(e) => setSystemForm({ ...systemForm, bankSwift: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-stone-400">
              Changes will update immediately across all user deposit dialogs and payment flows.
            </p>
            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <Save className="w-4 h-4" />
              <span>Save Payment Settings & Update Live Users</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 5: BRANDING & WEBSITE CONTENT */}
      {activeTab === 'branding' && (
        <form onSubmit={handleSaveBranding} className="bg-stone-950 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-stone-800 pb-4">
            <h2 className="text-lg font-bold text-white font-display">
              Website Branding, Name & Copy Editor
            </h2>
            <p className="text-xs text-stone-400">
              Changes applied here immediately update all navigation bars, hero text, and footers across the site.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="adminBrandWebsiteNameInput" className="block text-xs text-stone-400 mb-1">Website Brand Name</label>
              <input
                id="adminBrandWebsiteNameInput"
                type="text"
                value={brandingForm.websiteName}
                onChange={(e) => setBrandingForm({ ...brandingForm, websiteName: e.target.value })}
                className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label htmlFor="adminBrandLogoTextInput" className="block text-xs text-stone-400 mb-1">Logo Primary Text</label>
              <input
                id="adminBrandLogoTextInput"
                type="text"
                value={brandingForm.logoText}
                onChange={(e) => setBrandingForm({ ...brandingForm, logoText: e.target.value })}
                className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label htmlFor="adminBrandLogoSubtitleInput" className="block text-xs text-stone-400 mb-1">Logo Subtitle (Gold Badge)</label>
              <input
                id="adminBrandLogoSubtitleInput"
                type="text"
                value={brandingForm.logoSubtitle}
                onChange={(e) => setBrandingForm({ ...brandingForm, logoSubtitle: e.target.value })}
                className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label htmlFor="adminBrandTaglineInput" className="block text-xs text-stone-400 mb-1">Global Tagline</label>
              <input
                id="adminBrandTaglineInput"
                type="text"
                value={brandingForm.tagline}
                onChange={(e) => setBrandingForm({ ...brandingForm, tagline: e.target.value })}
                className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="adminBrandHeroHeadlineInput" className="block text-xs text-stone-400 mb-1">Hero Main Headline</label>
            <input
              id="adminBrandHeroHeadlineInput"
              type="text"
              value={brandingForm.heroHeadline}
              onChange={(e) => setBrandingForm({ ...brandingForm, heroHeadline: e.target.value })}
              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label htmlFor="adminBrandHeroSubheadlineInput" className="block text-xs text-stone-400 mb-1">Hero Subheadline</label>
            <textarea
              id="adminBrandHeroSubheadlineInput"
              rows={3}
              value={brandingForm.heroSubheadline}
              onChange={(e) => setBrandingForm({ ...brandingForm, heroSubheadline: e.target.value })}
              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="adminBrandMarqueeNoticeInput" className="text-xs text-stone-400">Marquee Banner Alert Text</label>
              <label className="flex items-center gap-2 text-xs text-amber-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={brandingForm.enableMarquee}
                  onChange={(e) => setBrandingForm({ ...brandingForm, enableMarquee: e.target.checked })}
                  className="rounded accent-amber-500"
                />
                <span>Enable Top Marquee Ticker</span>
              </label>
            </div>
            <input
              id="adminBrandMarqueeNoticeInput"
              type="text"
              value={brandingForm.marqueeNotice}
              onChange={(e) => setBrandingForm({ ...brandingForm, marqueeNotice: e.target.value })}
              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Publish Branding Changes</span>
          </button>
        </form>
      )}

      {/* TAB 6: SETTINGS & GATEWAYS */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="bg-stone-950 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-stone-800 pb-4">
            <h2 className="text-lg font-bold text-white font-display">
              System Settings & Deposit Gateways
            </h2>
            <p className="text-xs text-stone-400">
              Configure minimum deposits, egg valuation, referral tier percentages, and official wallet addresses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="adminSysCurrencySymbolInput" className="block text-xs text-stone-400 mb-1">Currency Symbol</label>
              <input
                id="adminSysCurrencySymbolInput"
                type="text"
                value={systemForm.currencySymbol}
                onChange={(e) => setSystemForm({ ...systemForm, currencySymbol: e.target.value })}
                className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="adminSysEggUnitPriceInput" className="block text-xs text-stone-400 mb-1">Digital Egg Unit Price (USD)</label>
              <input
                id="adminSysEggUnitPriceInput"
                type="number"
                step="0.01"
                value={systemForm.eggUnitPrice}
                onChange={(e) => setSystemForm({ ...systemForm, eggUnitPrice: Number(e.target.value) })}
                className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                required
              />
            </div>

            <div>
              <label htmlFor="adminSysMinDepositInput" className="block text-xs text-stone-400 mb-1">Min Deposit</label>
              <input
                id="adminSysMinDepositInput"
                type="number"
                value={systemForm.minDeposit}
                onChange={(e) => setSystemForm({ ...systemForm, minDeposit: Number(e.target.value) })}
                className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                required
              />
            </div>

            <div>
              <label htmlFor="adminSysMinWithdrawalInput" className="block text-xs text-stone-400 mb-1">Min Withdrawal</label>
              <input
                id="adminSysMinWithdrawalInput"
                type="number"
                value={systemForm.minWithdrawal}
                onChange={(e) => setSystemForm({ ...systemForm, minWithdrawal: Number(e.target.value) })}
                className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                required
              />
            </div>
          </div>

          {/* Referral Tiers */}
          <div className="pt-4 border-t border-stone-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
              Referral Commission Tiers
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="adminSysTier1Input" className="block text-xs text-stone-400 mb-1">Tier 1 Direct (%)</label>
                <input
                  id="adminSysTier1Input"
                  type="number"
                  value={systemForm.referralTier1Percent}
                  onChange={(e) => setSystemForm({ ...systemForm, referralTier1Percent: Number(e.target.value) })}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label htmlFor="adminSysTier2Input" className="block text-xs text-stone-400 mb-1">Tier 2 (%)</label>
                <input
                  id="adminSysTier2Input"
                  type="number"
                  value={systemForm.referralTier2Percent}
                  onChange={(e) => setSystemForm({ ...systemForm, referralTier2Percent: Number(e.target.value) })}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label htmlFor="adminSysTier3Input" className="block text-xs text-stone-400 mb-1">Tier 3 (%)</label>
                <input
                  id="adminSysTier3Input"
                  type="number"
                  value={systemForm.referralTier3Percent}
                  onChange={(e) => setSystemForm({ ...systemForm, referralTier3Percent: Number(e.target.value) })}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* Mobile Wallets Payment Settings */}
          <div className="pt-4 border-t border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Easypaisa & JazzCash Deposit Accounts
              </h4>
              <button
                type="button"
                onClick={() => setActiveTab('payment_settings')}
                className="text-xs text-amber-400 hover:underline"
              >
                Open Full Payment Settings Tab →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="adminSysEasypaisaName" className="block text-xs text-stone-400 mb-1">Easypaisa Account Name</label>
                <input
                  id="adminSysEasypaisaName"
                  type="text"
                  value={systemForm.easypaisaAccountName}
                  onChange={(e) => setSystemForm({ ...systemForm, easypaisaAccountName: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label htmlFor="adminSysEasypaisaNumber" className="block text-xs text-stone-400 mb-1">Easypaisa Account Number</label>
                <input
                  id="adminSysEasypaisaNumber"
                  type="text"
                  value={systemForm.easypaisaAccountNumber}
                  onChange={(e) => setSystemForm({ ...systemForm, easypaisaAccountNumber: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-amber-300 font-mono font-bold"
                />
              </div>

              <div>
                <label htmlFor="adminSysJazzcashName" className="block text-xs text-stone-400 mb-1">JazzCash Account Name</label>
                <input
                  id="adminSysJazzcashName"
                  type="text"
                  value={systemForm.jazzcashAccountName}
                  onChange={(e) => setSystemForm({ ...systemForm, jazzcashAccountName: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label htmlFor="adminSysJazzcashNumber" className="block text-xs text-stone-400 mb-1">JazzCash Account Number</label>
                <input
                  id="adminSysJazzcashNumber"
                  type="text"
                  value={systemForm.jazzcashAccountNumber}
                  onChange={(e) => setSystemForm({ ...systemForm, jazzcashAccountNumber: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-amber-300 font-mono font-bold"
                />
              </div>
            </div>
          </div>

          {/* Payment Addresses */}
          <div className="pt-4 border-t border-stone-800 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Official Deposit Wallets
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="adminSysUsdtTrc20Input" className="block text-xs text-stone-400 mb-1">USDT (TRC-20) Address</label>
                <input
                  id="adminSysUsdtTrc20Input"
                  type="text"
                  value={systemForm.usdtTrc20Address}
                  onChange={(e) => setSystemForm({ ...systemForm, usdtTrc20Address: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label htmlFor="adminSysUsdtBep20Input" className="block text-xs text-stone-400 mb-1">USDT (BEP-20) Address</label>
                <input
                  id="adminSysUsdtBep20Input"
                  type="text"
                  value={systemForm.usdtBep20Address}
                  onChange={(e) => setSystemForm({ ...systemForm, usdtBep20Address: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label htmlFor="adminSysBtcAddressInput" className="block text-xs text-stone-400 mb-1">Bitcoin (BTC) Address</label>
                <input
                  id="adminSysBtcAddressInput"
                  type="text"
                  value={systemForm.btcAddress}
                  onChange={(e) => setSystemForm({ ...systemForm, btcAddress: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label htmlFor="adminSysBankNameInput" className="block text-xs text-stone-400 mb-1">Bank Name & Wire Wire Info</label>
                <input
                  id="adminSysBankNameInput"
                  type="text"
                  value={systemForm.bankName}
                  onChange={(e) => setSystemForm({ ...systemForm, bankName: e.target.value })}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save System Settings</span>
          </button>
        </form>
      )}

      {/* TAB 7: ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <div className="space-y-6">
          {/* Post New Announcement */}
          <div className="p-6 bg-stone-950 border border-stone-800 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white font-display">Create Farm Announcement</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Announcement Title"
                value={newAnnTitle}
                onChange={(e) => setNewAnnTitle(e.target.value)}
                className="sm:col-span-2 bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
              <select
                value={newAnnType}
                onChange={(e) => setNewAnnType(e.target.value as any)}
                className="bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-200"
              >
                <option value="update">Update</option>
                <option value="promo">Promo</option>
                <option value="alert">Alert</option>
                <option value="info">Info</option>
              </select>
            </div>

            <textarea
              rows={3}
              placeholder="Announcement Content..."
              value={newAnnContent}
              onChange={(e) => setNewAnnContent(e.target.value)}
              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white resize-none"
            />

            <button
              onClick={() => {
                if (!newAnnTitle.trim() || !newAnnContent.trim()) return;
                addAnnouncement({
                  title: newAnnTitle,
                  content: newAnnContent,
                  type: newAnnType,
                  active: true
                });
                setNewAnnTitle('');
                setNewAnnContent('');
                showNotification('Announcement broadcast live!');
              }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Megaphone className="w-3.5 h-3.5" />
              <span>Broadcast Announcement</span>
            </button>
          </div>

          {/* List Announcements */}
          <div className="space-y-3">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-4 bg-stone-950 border border-stone-800 rounded-xl flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{ann.title}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">
                      {ann.type}
                    </span>
                  </div>
                  <p className="text-xs text-stone-300">{ann.content}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleAnnouncement(ann.id)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${
                      ann.active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {ann.active ? 'Active' : 'Hidden'}
                  </button>
                  <button
                    onClick={() => {
                      deleteAnnouncement(ann.id);
                      showNotification('Announcement deleted.');
                    }}
                    className="p-1 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: SUPPORT INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-white font-display">Investor Support Inquiries</h2>
            <p className="text-xs text-stone-400">Messages sent via the Contact page.</p>
          </div>

          <div className="space-y-3">
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                className="p-5 bg-stone-950 border border-stone-800 rounded-2xl space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-white">{inq.subject}</h4>
                    <p className="text-xs text-stone-400 mt-0.5">
                      From: <span className="text-amber-400">{inq.name}</span> ({inq.email}) · {new Date(inq.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      inq.status === 'resolved'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {inq.status}
                  </span>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed bg-stone-900/50 p-3 rounded-xl border border-stone-800">
                  {inq.message}
                </p>

                {inq.replyNote && (
                  <div className="text-xs text-emerald-300 bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-800/40">
                    <span className="font-bold">Staff Note:</span> {inq.replyNote}
                  </div>
                )}

                <div className="flex gap-2">
                  {inq.status !== 'resolved' && (
                    <button
                      onClick={() => {
                        const reply = prompt('Enter resolution note:', 'Contacted investor via WhatsApp and clarified protocol.');
                        if (reply) {
                          updateInquiryStatus(inq.id, 'resolved', reply);
                          showNotification('Inquiry marked as resolved.');
                        }
                      }}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors"
                    >
                      Mark Resolved
                    </button>
                  )}
                  <a
                    href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject)}`}
                    className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-lg transition-colors"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDIT USER MODAL */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Adjust User: {editingUser.name}</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-stone-400 block mb-1">Wallet Balance ({settings.currencySymbol})</label>
                <input
                  type="number"
                  step="10"
                  value={editingUser.balance}
                  onChange={(e) => setEditingUser({ ...editingUser, balance: Number(e.target.value) })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-stone-400 block mb-1">Egg Balance (Count)</label>
                <input
                  type="number"
                  value={editingUser.eggBalance}
                  onChange={(e) => setEditingUser({ ...editingUser, eggBalance: Number(e.target.value) })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-stone-400 block mb-1">User Role</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as any })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>

              <div>
                <label className="text-stone-400 block mb-1">Account Status</label>
                <select
                  value={editingUser.status}
                  onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value as any })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="flex-1 py-2 bg-stone-800 text-stone-300 text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  updateUser(editingUser.id, editingUser);
                  setEditingUser(null);
                  showNotification(`User account updated.`);
                }}
                className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl"
              >
                Save User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW USER MODAL */}
      {newUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Create New Investor Account</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-stone-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-stone-400 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-stone-400 block mb-1">Starting Wallet Balance ($)</label>
                <input
                  type="number"
                  value={newUserData.balance}
                  onChange={(e) => setNewUserData({ ...newUserData, balance: Number(e.target.value) })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-stone-400 block mb-1">Role</label>
                <select
                  value={newUserData.role}
                  onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value as any })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setNewUserModal(false)}
                className="flex-1 py-2 bg-stone-800 text-stone-300 text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!newUserData.name || !newUserData.email) return;
                  addUser(newUserData);
                  setNewUserModal(false);
                  showNotification(`User ${newUserData.name} created!`);
                }}
                className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT / CREATE PLAN MODAL */}
      {(editingPlan || newPlanModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white">
              {editingPlan ? `Edit Plan: ${editingPlan.name}` : 'Create New Poultry Flock Plan'}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-stone-400 block mb-1">Plan Name</label>
                <input
                  type="text"
                  value={editingPlan ? editingPlan.name : newPlanData.name}
                  onChange={(e) => {
                    if (editingPlan) setEditingPlan({ ...editingPlan, name: e.target.value });
                    else setNewPlanData({ ...newPlanData, name: e.target.value });
                  }}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-stone-400 block mb-1">Flock Breed / Type</label>
                <input
                  type="text"
                  value={editingPlan ? editingPlan.flockType : newPlanData.flockType}
                  onChange={(e) => {
                    if (editingPlan) setEditingPlan({ ...editingPlan, flockType: e.target.value });
                    else setNewPlanData({ ...newPlanData, flockType: e.target.value });
                  }}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-400 block mb-1">Daily Return (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingPlan ? editingPlan.dailyReturnPercent : newPlanData.dailyReturnPercent}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (editingPlan) setEditingPlan({ ...editingPlan, dailyReturnPercent: val });
                      else setNewPlanData({ ...newPlanData, dailyReturnPercent: val });
                    }}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-stone-400 block mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    value={editingPlan ? editingPlan.durationDays : newPlanData.durationDays}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (editingPlan) setEditingPlan({ ...editingPlan, durationDays: val });
                      else setNewPlanData({ ...newPlanData, durationDays: val });
                    }}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-400 block mb-1">Fixed Price ({settings.currencySymbol})</label>
                  <input
                    type="number"
                    value={editingPlan ? editingPlan.pricePkr : newPlanData.pricePkr}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (editingPlan) setEditingPlan({ ...editingPlan, pricePkr: val, minDeposit: val, maxDeposit: val * 10 });
                      else setNewPlanData({ ...newPlanData, pricePkr: val, minDeposit: val, maxDeposit: val * 10 });
                    }}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-stone-400 block mb-1">Assigned Layer Hens</label>
                  <input
                    type="number"
                    value={editingPlan ? editingPlan.henCount : newPlanData.henCount}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (editingPlan) setEditingPlan({ ...editingPlan, henCount: val });
                      else setNewPlanData({ ...newPlanData, henCount: val });
                    }}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-stone-400 block mb-1">Daily Egg Yield Estimate</label>
                <input
                  type="number"
                  value={editingPlan ? editingPlan.dailyEggYieldEstimate : newPlanData.dailyEggYieldEstimate}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (editingPlan) setEditingPlan({ ...editingPlan, dailyEggYieldEstimate: val });
                    else setNewPlanData({ ...newPlanData, dailyEggYieldEstimate: val });
                  }}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-stone-400 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingPlan ? editingPlan.description : newPlanData.description}
                  onChange={(e) => {
                    if (editingPlan) setEditingPlan({ ...editingPlan, description: e.target.value });
                    else setNewPlanData({ ...newPlanData, description: e.target.value });
                  }}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-white resize-none"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setEditingPlan(null);
                  setNewPlanModal(false);
                }}
                className="flex-1 py-2 bg-stone-800 text-stone-300 text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (editingPlan) {
                    updatePlan(editingPlan.id, editingPlan);
                    setEditingPlan(null);
                    showNotification('Plan updated successfully!');
                  } else {
                    if (!newPlanData.name) return;
                    addPlan(newPlanData);
                    setNewPlanModal(false);
                    showNotification('New plan created and active!');
                  }
                }}
                className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl"
              >
                {editingPlan ? 'Save Plan' : 'Create Plan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
