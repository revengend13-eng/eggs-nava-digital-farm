import React, { useState } from 'react';
import { Plan } from '../types';
import { useFarm } from '../context/FarmContext';
import { X, Check, Copy, AlertCircle, CheckCircle2, ArrowRight, ShieldCheck, Egg, Wallet, Smartphone } from 'lucide-react';

interface InvestModalProps {
  plan: Plan | null;
  onClose: () => void;
  onOpenDeposit: () => void;
  onSuccess: () => void;
}

export const InvestModal: React.FC<InvestModalProps> = ({
  plan,
  onClose,
  onOpenDeposit: _onOpenDeposit,
  onSuccess
}) => {
  const { currentUser, submitJazzCashPlanDeposit, investInPlan, settings } = useFarm();
  const [method, setMethod] = useState<'jazzcash' | 'easypaisa' | 'balance'>('jazzcash');
  const [tid, setTid] = useState('');
  const [senderNumber, setSenderNumber] = useState(currentUser?.jazzcashNumber || currentUser?.phone || '');
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; error: boolean } | null>(null);

  if (!plan) return null;

  const totalCycleProfit = plan.dailyReturnPkr * plan.durationDays;
  const netReturnPkr = totalCycleProfit + (plan.capitalReturn ? plan.pricePkr : 0);

  const officialAccountName =
    method === 'easypaisa'
      ? settings.paymentMethods.easypaisa.accountName
      : settings.paymentMethods.jazzcash.accountName;

  const officialAccountNumber =
    method === 'easypaisa'
      ? settings.paymentMethods.easypaisa.accountNumber
      : settings.paymentMethods.jazzcash.accountNumber;

  const instructions =
    method === 'easypaisa'
      ? settings.paymentMethods.easypaisa.instructions
      : settings.paymentMethods.jazzcash.instructions;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(officialAccountNumber);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(plan.pricePkr.toString());
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    if (!currentUser) {
      setStatusMsg({ text: 'Please sign in or create an account first.', error: true });
      return;
    }

    setLoading(true);

    if (method === 'balance') {
      const res = investInPlan(plan.id, plan.pricePkr);
      setLoading(false);
      if (res.success) {
        setStatusMsg({ text: res.message, error: false });
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1800);
      } else {
        setStatusMsg({ text: res.message, error: true });
      }
      return;
    }

    // JazzCash or Easypaisa deposit flow
    const methodName = method === 'easypaisa' ? 'Easypaisa' : 'JazzCash';
    const res = submitJazzCashPlanDeposit(plan.id, tid, senderNumber, methodName);
    setLoading(false);

    if (res.success) {
      setStatusMsg({
        text: `Deposit for ${plan.name} submitted with TID ${tid}! Status: PENDING ADMIN REVIEW. Once approved, this plan will be ACTIVE in your dashboard.`,
        error: false
      });
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2500);
    } else {
      setStatusMsg({ text: res.message, error: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-xl p-6 sm:p-7 relative shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-extrabold uppercase tracking-wider">
                {plan.badge || 'Verified Flock'}
              </span>
              <span className="text-xs text-stone-400 font-mono">{plan.henCount} Laying {plan.henCount === 1 ? 'Hen' : 'Hens'}</span>
            </div>
            <h3 className="text-xl font-bold text-white font-display mt-1">
              Activate {plan.name}
            </h3>
            <p className="text-xs text-stone-400">{plan.flockType}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Plan Yield Summary Card */}
        <div className="my-4 p-4 bg-stone-950/80 border border-stone-800 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Fixed Price</span>
            <span className="text-base font-extrabold text-amber-400 font-mono">
              {settings.currencySymbol}{plan.pricePkr.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Daily Profit</span>
            <span className="text-base font-extrabold text-emerald-400 font-mono">
              +{settings.currencySymbol}{plan.dailyReturnPkr}
            </span>
            <span className="text-[10px] text-stone-400 block font-mono">({plan.dailyReturnPercent}%)</span>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Daily Eggs</span>
            <span className="text-base font-extrabold text-amber-300 font-mono flex items-center gap-1">
              <Egg className="w-3.5 h-3.5 text-amber-400" /> ~{plan.dailyEggYieldEstimate}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 uppercase font-semibold block">Cycle Duration</span>
            <span className="text-base font-extrabold text-white font-mono">
              {plan.durationDays} Days
            </span>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="space-y-2 mb-4">
          <label className="block text-xs font-semibold text-stone-300">
            Select Activation Method:
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setMethod('jazzcash')}
              className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                method === 'jazzcash'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md ring-1 ring-amber-500/40'
                  : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Smartphone className="w-4 h-4 text-amber-400" />
              <span>JazzCash</span>
              <span className="text-[9px] text-emerald-400 uppercase font-mono">Instant TID</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod('easypaisa')}
              className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                method === 'easypaisa'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md ring-1 ring-emerald-500/40'
                  : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>Easypaisa</span>
              <span className="text-[9px] text-emerald-400 uppercase font-mono">Instant TID</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod('balance')}
              className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                method === 'balance'
                  ? 'bg-sky-500/20 border-sky-500 text-sky-300 shadow-md ring-1 ring-sky-500/40'
                  : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Wallet className="w-4 h-4 text-sky-400" />
              <span>Wallet Balance</span>
              <span className="text-[9px] text-stone-400 font-mono">
                {settings.currencySymbol}{currentUser?.balance.toLocaleString() || '0'}
              </span>
            </button>
          </div>
        </div>

        {/* Content based on method */}
        {method === 'balance' ? (
          <div className="space-y-4 py-2">
            <div className="p-4 bg-stone-950 border border-stone-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400">Available Wallet Balance:</span>
                <span className="font-bold text-emerald-400 font-mono text-sm">
                  {settings.currencySymbol}{currentUser?.balance.toLocaleString() || 0}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400">Plan Cost:</span>
                <span className="font-bold text-amber-400 font-mono text-sm">
                  {settings.currencySymbol}{plan.pricePkr.toLocaleString()}
                </span>
              </div>
              <div className="border-t border-stone-800/80 pt-2 flex items-center justify-between text-xs">
                <span className="text-stone-400">Balance After Activation:</span>
                <span className="font-bold text-white font-mono text-sm">
                  {settings.currencySymbol}
                  {((currentUser?.balance || 0) - plan.pricePkr).toLocaleString()}
                </span>
              </div>
            </div>

            {(currentUser?.balance || 0) < plan.pricePkr ? (
              <div className="p-3 bg-red-950/50 border border-red-800/60 rounded-xl text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>
                  Insufficient balance ({settings.currencySymbol}{currentUser?.balance || 0}). Switch to JazzCash or Easypaisa to send deposit directly.
                </span>
              </div>
            ) : (
              <p className="text-xs text-stone-400">
                Clicking the button below will instantly deduct {settings.currencySymbol}{plan.pricePkr.toLocaleString()} and activate this flock in your Dashboard immediately.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Official Receiver Card */}
            <div className="p-4 bg-gradient-to-br from-stone-950 via-stone-950 to-stone-900 border border-amber-500/30 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Official {method === 'easypaisa' ? 'Easypaisa' : 'JazzCash'} Deposit Account
                </span>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[10px] font-bold">
                  Verified Receiver
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 bg-stone-900/80 rounded-xl border border-stone-800">
                  <span className="text-[10px] text-stone-400 block">Account Title / Name:</span>
                  <span className="font-bold text-white text-sm">{officialAccountName}</span>
                </div>

                <div className="p-2.5 bg-stone-900/80 rounded-xl border border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 block">Account Number:</span>
                    <span className="font-bold text-amber-400 font-mono text-sm tracking-wider">
                      {officialAccountNumber}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAccount}
                    className="p-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded-lg transition-colors flex items-center gap-1 text-[11px] font-bold"
                  >
                    {copiedAccount ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAccount ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="p-2.5 bg-stone-900/80 rounded-xl border border-stone-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-stone-400 block">Exact Amount to Send:</span>
                  <span className="font-bold text-emerald-400 font-mono text-base">
                    {settings.currencySymbol}{plan.pricePkr.toLocaleString()}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyAmount}
                  className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg transition-colors flex items-center gap-1 text-[11px] font-bold"
                >
                  {copiedAmount ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAmount ? 'Copied' : 'Copy Amount'}</span>
                </button>
              </div>

              <p className="text-[11px] text-stone-400 leading-relaxed font-light">
                {instructions}
              </p>
            </div>

            {/* Deposit Submission Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Your Sender {method === 'easypaisa' ? 'Easypaisa' : 'JazzCash'} Mobile Number:
                </label>
                <input
                  type="text"
                  placeholder="e.g. 03001234567"
                  value={senderNumber}
                  onChange={(e) => setSenderNumber(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-stone-300 mb-1">
                  <label htmlFor="tidInput" className="font-semibold">
                    Transaction ID (TID / TRX ID from SMS 8558/3737):
                  </label>
                  <span className="text-[10px] text-amber-400 font-mono">11 or 12 digits</span>
                </div>
                <input
                  id="tidInput"
                  type="text"
                  placeholder="e.g. 85589021482"
                  value={tid}
                  onChange={(e) => setTid(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-sm text-amber-400 font-mono tracking-wider focus:outline-none focus:border-amber-500 font-bold"
                  required
                />
              </div>

              {/* Status Message */}
              {statusMsg && (
                <div
                  className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 leading-relaxed ${
                    statusMsg.error
                      ? 'bg-red-950/60 border border-red-800 text-red-200'
                      : 'bg-emerald-950/60 border border-emerald-800 text-emerald-200'
                  }`}
                >
                  {statusMsg.error ? (
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  <span>{statusMsg.text}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-sm rounded-xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>
                  {loading
                    ? 'Submitting...'
                    : `Submit ${method === 'easypaisa' ? 'Easypaisa' : 'JazzCash'} Deposit & Activate Plan`}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        )}

        {method === 'balance' && (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            {statusMsg && (
              <div
                className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 leading-relaxed ${
                  statusMsg.error
                    ? 'bg-red-950/60 border border-red-800 text-red-200'
                    : 'bg-emerald-950/60 border border-emerald-800 text-emerald-200'
                }`}
              >
                {statusMsg.error ? (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                )}
                <span>{statusMsg.text}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || (currentUser?.balance || 0) < plan.pricePkr}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 disabled:opacity-50 text-stone-950 font-extrabold text-sm rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? 'Activating...' : `Activate Instantly using ${settings.currencySymbol}${plan.pricePkr.toLocaleString()} Balance`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Security Footer */}
        <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-center gap-2 text-[11px] text-stone-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Automated 24h Payouts · Bio-Secure Tier-4 Insured Poultry Flocks</span>
        </div>
      </div>
    </div>
  );
};
