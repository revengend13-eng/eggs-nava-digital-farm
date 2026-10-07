import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import {
  Wallet,
  Egg,
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  Check,
  TrendingUp,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Smartphone,
  AlertCircle
} from 'lucide-react';

interface DashboardPageProps {
  onOpenDeposit: () => void;
  onOpenWithdraw: () => void;
  onNavigate: (tab: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onOpenDeposit,
  onOpenWithdraw,
  onNavigate
}) => {
  const {
    currentUser,
    investments,
    transactions,
    settings,
    collectDailyEggs,
    isOwnerOrAdmin
  } = useFarm();

  const [copiedRef, setCopiedRef] = useState(false);
  const [harvestAnimation, setHarvestAnimation] = useState(false);
  const [harvestToast, setHarvestToast] = useState<string | null>(null);
  const [txFilter, setTxFilter] = useState<'all' | 'deposit' | 'withdrawal' | 'investment' | 'egg_harvest'>('all');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-stone-950 border border-stone-800 rounded-3xl text-center space-y-4">
        <Wallet className="w-12 h-12 text-amber-400 mx-auto" />
        <h2 className="text-xl font-bold text-white font-display">Investor Portal Locked</h2>
        <p className="text-xs text-stone-400">
          Please log in or create an account to view your digital coops, egg harvest counter, and wallet balances.
        </p>
        <button
          onClick={() => onNavigate('home')}
          className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
        >
          Return to Home & Sign In
        </button>
      </div>
    );
  }

  const userInvestments = investments.filter(inv => inv.userId === currentUser.id);
  const activeInvestments = userInvestments.filter(inv => inv.status === 'active');
  const pendingInvestments = userInvestments.filter(inv => inv.status === 'pending');
  const userTransactions = transactions.filter(tx => tx.userId === currentUser.id);

  const eggUnitPrice = settings.eggUnitPricePkr || settings.eggUnitPrice || 35;

  const filteredTransactions = userTransactions.filter(tx => {
    if (txFilter === 'all') return true;
    return tx.type === txFilter;
  });

  const referralUrl = `${window.location.origin}/?ref=${currentUser.referralCode}`;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleHarvestClick = () => {
    setHarvestAnimation(true);
    const result = collectDailyEggs();
    if (result.success) {
      setHarvestToast(result.message);
      setTimeout(() => setHarvestToast(null), 4000);
    }
    setTimeout(() => setHarvestAnimation(false), 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Welcome & Profile Header */}
      <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-stone-950 font-extrabold text-2xl shadow-lg shadow-amber-500/20 font-display">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white font-display">
                {currentUser.name}
              </h1>
              {currentUser.role === 'superadmin' && (
                <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-400" />
                  Owner & Super Admin
                </span>
              )}
            </div>
            <p className="text-xs text-stone-400 font-mono mt-0.5">{currentUser.email}</p>
            <div className="flex items-center gap-2 text-xs text-stone-400 mt-2">
              <span>Member Since: {new Date(currentUser.createdAt).toLocaleDateString()}</span>
              <span>·</span>
              <span className="text-emerald-400 font-semibold uppercase">{currentUser.status}</span>
              {currentUser.jazzcashNumber && (
                <>
                  <span>·</span>
                  <span className="text-amber-400 font-mono flex items-center gap-1">
                    <Smartphone className="w-3 h-3" /> JazzCash: {currentUser.jazzcashNumber}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            onClick={onOpenDeposit}
            className="flex-1 sm:flex-none px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-xs rounded-xl shadow-md shadow-amber-500/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ArrowDownLeft className="w-4 h-4" />
            <span>Deposit Funds</span>
          </button>

          <button
            onClick={onOpenWithdraw}
            className="flex-1 sm:flex-none px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs rounded-xl border border-stone-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Withdraw PKR</span>
          </button>

          {isOwnerOrAdmin && (
            <button
              onClick={() => onNavigate('admin')}
              className="px-5 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold text-xs rounded-xl border border-amber-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Admin Panel</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Balance */}
        <div className="p-6 bg-stone-950 border border-stone-800 rounded-3xl space-y-2 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400 font-medium">Available Balance</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white font-mono tabular-nums">
            {settings.currencySymbol}{currentUser.balance.toLocaleString()}
          </p>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-stone-800 text-stone-400">
            <span>Ready for withdrawal via JazzCash</span>
          </div>
        </div>

        {/* Card 2: Egg Harvest Counter */}
        <div className="p-6 bg-stone-950 border border-stone-800 rounded-3xl space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400 font-medium">Collected Digital Eggs</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Egg className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
              {currentUser.eggBalance.toLocaleString()}
            </p>
            <span className="text-xs text-stone-400 font-mono">
              (~{settings.currencySymbol}{(currentUser.eggBalance * eggUnitPrice).toLocaleString()})
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-stone-800 text-stone-400">
            <span>Rate: {settings.currencySymbol}{eggUnitPrice} / fresh egg</span>
          </div>
        </div>

        {/* Card 3: Total Invested */}
        <div className="p-6 bg-stone-950 border border-stone-800 rounded-3xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400 font-medium">Active Flock Allocation</span>
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white font-mono tabular-nums">
            {settings.currencySymbol}{currentUser.totalInvested.toLocaleString()}
          </p>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-stone-800 text-stone-400">
            <span>{activeInvestments.length} Active Verified Coops</span>
          </div>
        </div>

        {/* Card 4: Total Withdrawn */}
        <div className="p-6 bg-stone-950 border border-stone-800 rounded-3xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400 font-medium">Total Withdrawn</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white font-mono tabular-nums">
            {settings.currencySymbol}{currentUser.totalWithdrawn.toLocaleString()}
          </p>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-stone-800 text-stone-400">
            <span>Direct to JazzCash / Easypaisa</span>
          </div>
        </div>
      </div>

      {/* Daily Egg Harvest Action Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 bg-gradient-to-r from-amber-600 via-amber-700 to-stone-900 border border-amber-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-stone-950/40 text-amber-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Automated 24-Hour Coop Laying Cycle</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Harvest Today's Digital Eggs
          </h2>
          <p className="text-xs sm:text-sm text-stone-200 max-w-lg font-light">
            Collect daily Grade-A eggs produced across your active flock coops and credit the PKR profit value instantly to your JazzCash wallet.
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 shrink-0">
          <button
            onClick={handleHarvestClick}
            disabled={harvestAnimation}
            className={`px-8 py-4 bg-stone-950 hover:bg-stone-900 text-amber-300 font-extrabold text-sm rounded-2xl shadow-2xl border border-amber-500/50 transition-all flex items-center gap-2 transform active:scale-95 cursor-pointer ${
              harvestAnimation ? 'scale-105 ring-4 ring-amber-400' : ''
            }`}
          >
            <Egg className={`w-5 h-5 text-amber-400 ${harvestAnimation ? 'animate-bounce' : ''}`} />
            <span>{harvestAnimation ? 'Collecting Eggs...' : "Collect Today's Eggs"}</span>
          </button>
          <span className="text-[11px] text-amber-200/80">Refreshes every 24 hours</span>
        </div>
      </div>

      {harvestToast && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-800 rounded-2xl text-xs text-emerald-200 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{harvestToast}</span>
          </div>
          <span className="font-mono text-emerald-400 font-bold">Balance Credited</span>
        </div>
      )}

      {/* PENDING FLOCK DEPOSITS SECTION (USER FLOW: SUBMIT -> PENDING -> ADMIN APPROVES -> ACTIVE) */}
      {pendingInvestments.length > 0 && (
        <div className="bg-amber-950/20 border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
                <Clock className="w-5 h-5 animate-spin" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Pending Flock Activations ({pendingInvestments.length})
                </h3>
                <p className="text-xs text-stone-300">
                  Your JazzCash deposit has been submitted and is currently being verified by the admin desk.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-bold uppercase">
              Awaiting Approval
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {pendingInvestments.map((inv) => (
              <div
                key={inv.id}
                className="p-5 bg-stone-900/80 border border-amber-500/30 rounded-2xl space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{inv.planName}</h4>
                    <span className="text-xs text-amber-400 font-mono">
                      {settings.currencySymbol}{inv.amount.toLocaleString()} via JazzCash / Easypaisa
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    PENDING REVIEW
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-stone-800 text-stone-300">
                  <div>
                    <span className="text-[10px] text-stone-400 block">Transaction ID (TID):</span>
                    <span className="font-mono font-bold text-amber-300">{inv.tid || 'Pending'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block">Sender Number:</span>
                    <span className="font-mono text-white">{inv.senderNumber || 'Verified Mobile'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-stone-400">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Once approved by Super Admin, this plan will activate here immediately.</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Flock Contracts */}
      <div className="bg-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white font-display">
              Your Active Flock Investments
            </h2>
            <p className="text-xs text-stone-400">
              Live automated laying cycles and daily egg production stats for your coops.
            </p>
          </div>
          <button
            onClick={() => onNavigate('plans')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Add New Flock Plan</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {activeInvestments.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-stone-800 rounded-2xl space-y-3">
            <Egg className="w-10 h-10 text-stone-600 mx-auto" />
            <p className="text-sm font-semibold text-stone-300">No Active Flock Investments</p>
            <p className="text-xs text-stone-500 max-w-sm mx-auto font-light">
              You haven't activated any digital poultry coops yet. Select a plan, submit your JazzCash TID, and start earning daily egg profits.
            </p>
            <button
              onClick={() => onNavigate('plans')}
              className="mt-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Browse Flock Plans
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeInvestments.map((inv) => {
              const progressPct = Math.min(100, Math.round((inv.daysCompleted / inv.durationDays) * 100));
              return (
                <div
                  key={inv.id}
                  className="p-5 bg-stone-900/60 border border-stone-800 rounded-2xl space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{inv.planName}</h4>
                      <span className="text-[11px] text-amber-400 font-mono">
                        +{settings.currencySymbol}{inv.dailyReturn.toLocaleString()}/day · ~{inv.dailyEggYield} eggs/day
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      ACTIVE FLOCK
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs py-2 border-y border-stone-800/80">
                    <div>
                      <span className="text-[10px] text-stone-400 block">Allocated</span>
                      <span className="font-bold text-white font-mono">{settings.currencySymbol}{inv.amount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block">Total Harvested</span>
                      <span className="font-bold text-emerald-400 font-mono">+{settings.currencySymbol}{inv.totalEarned.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block">Eggs Collected</span>
                      <span className="font-bold text-amber-400 font-mono">{inv.eggsHarvested.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-[11px] text-stone-400">
                      <span>Cycle Progress</span>
                      <span>{inv.daysCompleted} / {inv.durationDays} Days ({progressPct}%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Referral Program Section */}
      <div className="bg-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Flock Growth Network
            </span>
            <h2 className="text-xl font-bold text-white font-display mt-0.5">
              Your Referral Link & Team Rewards
            </h2>
            <p className="text-xs text-stone-400">
              Earn 7% (Tier 1), 3% (Tier 2), and 1% (Tier 3) instantly on all flock investments funded by your network via JazzCash.
            </p>
          </div>

          <div className="p-3.5 bg-stone-900 border border-stone-800 rounded-2xl text-right">
            <span className="text-[10px] text-stone-400 block">Referral Earnings</span>
            <span className="text-xl font-extrabold text-emerald-400 font-mono">
              {settings.currencySymbol}{currentUser.referralEarnings.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Link Box */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="w-full p-3.5 bg-stone-900 border border-stone-800 rounded-xl font-mono text-xs text-stone-300 break-all select-all flex items-center justify-between">
            <span>{referralUrl}</span>
          </div>
          <button
            onClick={handleCopyReferral}
            className="w-full sm:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
          >
            {copiedRef ? <Check className="w-4 h-4 text-stone-950" /> : <Copy className="w-4 h-4" />}
            <span>{copiedRef ? 'Copied Link!' : 'Copy Invite Link'}</span>
          </button>
        </div>

        {/* 3-Tier Commission Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-stone-900/60 border border-stone-800 rounded-2xl space-y-1">
            <span className="text-amber-400 font-bold text-sm block">Tier 1: 7% Commission</span>
            <p className="text-stone-400 text-[11px]">Direct flock investors referred by your link.</p>
            <span className="text-stone-300 font-medium block pt-1">Active Referrals: {currentUser.referralCount}</span>
          </div>

          <div className="p-4 bg-stone-900/60 border border-stone-800 rounded-2xl space-y-1">
            <span className="text-amber-400 font-bold text-sm block">Tier 2: 3% Commission</span>
            <p className="text-stone-400 text-[11px]">Sub-level referrals invited by your downline.</p>
            <span className="text-stone-300 font-medium block pt-1">Automatic multi-level tracking</span>
          </div>

          <div className="p-4 bg-stone-900/60 border border-stone-800 rounded-2xl space-y-1">
            <span className="text-amber-400 font-bold text-sm block">Tier 3: 1% Commission</span>
            <p className="text-stone-400 text-[11px]">Tier-3 community flock expansion rewards.</p>
            <span className="text-stone-300 font-medium block pt-1">Lifetime recurring credit</span>
          </div>
        </div>
      </div>

      {/* Transaction History Section */}
      <div className="bg-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white font-display">
              Transaction Ledger
            </h2>
            <p className="text-xs text-stone-400">
              Audit record of all deposits, withdrawals, daily egg collections, and flock activations.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="p-1 bg-stone-900 border border-stone-800 rounded-xl flex items-center gap-1 overflow-x-auto">
            {(
              [
                { key: 'all', label: 'All' },
                { key: 'deposit', label: 'Deposits' },
                { key: 'withdrawal', label: 'Withdrawals' },
                { key: 'egg_harvest', label: 'Harvests' },
                { key: 'investment', label: 'Plans' }
              ] as const
            ).map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setTxFilter(f.key)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  txFilter === f.key
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="text-center py-10 text-stone-500 text-xs">
            No transactions found for the selected filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-800 text-stone-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Method / TID</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60 text-stone-300">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-stone-900/40">
                    <td className="py-3 px-3">
                      <span className="font-semibold text-white uppercase text-[11px]">
                        {tx.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold">
                      {tx.type === 'withdrawal' ? (
                        <span className="text-red-400">-{settings.currencySymbol}{tx.amount.toLocaleString()}</span>
                      ) : (
                        <span className="text-emerald-400">+{settings.currencySymbol}{tx.amount.toLocaleString()}</span>
                      )}
                      {tx.eggCount && (
                        <span className="text-amber-400 text-[11px] block font-normal">
                          ({tx.eggCount} eggs)
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-stone-300 font-mono text-[11px] truncate max-w-xs">
                      {tx.tid ? (
                        <span>TID: {tx.tid} ({tx.method})</span>
                      ) : (
                        <span>{tx.method || tx.walletAddress || tx.txHash || 'System Transaction'}</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          tx.status === 'completed' || tx.status === 'approved'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : tx.status === 'pending'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-stone-400 font-mono text-[11px]">
                      {new Date(tx.createdAt).toLocaleDateString()} {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
