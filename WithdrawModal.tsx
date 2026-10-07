import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { X, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface WithdrawModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({ onClose, onSuccess }) => {
  const { settings, currentUser, requestWithdrawal } = useFarm();
  const minWth = settings.minWithdrawalPkr || settings.minWithdrawal || 200;
  const [amount, setAmount] = useState<number>(minWth);
  const [method, setMethod] = useState<string>('JazzCash Mobile Account');
  const [destinationAddress, setDestinationAddress] = useState<string>(currentUser?.jazzcashNumber || '');
  const [accountTitle, setAccountTitle] = useState<string>(currentUser?.jazzcashTitle || currentUser?.name || '');
  const [statusMsg, setStatusMsg] = useState<{ text: string; error: boolean } | null>(null);

  const availableBalance = currentUser?.balance || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setStatusMsg({ text: 'Please sign in to withdraw.', error: true });
      return;
    }

    if (amount < minWth) {
      setStatusMsg({
        text: `Minimum withdrawal is ${settings.currencySymbol}${minWth.toLocaleString()}.`,
        error: true
      });
      return;
    }

    if (amount > availableBalance) {
      setStatusMsg({
        text: `Requested amount exceeds available balance (${settings.currencySymbol}${availableBalance.toLocaleString()}).`,
        error: true
      });
      return;
    }

    if (!destinationAddress.trim()) {
      setStatusMsg({ text: 'Please provide your JazzCash, Easypaisa, or Bank account number.', error: true });
      return;
    }

    const res = requestWithdrawal(amount, method, destinationAddress.trim(), accountTitle.trim());
    if (res.success) {
      setStatusMsg({ text: res.message, error: false });
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 2000);
    } else {
      setStatusMsg({ text: res.message, error: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-lg p-6 relative shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div>
            <h3 className="text-xl font-bold text-white font-display">Withdraw Profits</h3>
            <p className="text-xs text-stone-400">Cash out daily egg harvest returns directly to JazzCash or Easypaisa</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close withdrawal modal"
            className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Balance Card */}
        <div className="my-4 p-4 bg-stone-950/80 border border-stone-800 rounded-2xl flex items-center justify-between">
          <span className="text-xs text-stone-400">Available Wallet Balance:</span>
          <span className="text-lg font-bold text-emerald-400 font-mono tabular-nums">
            {settings.currencySymbol}{availableBalance.toLocaleString()}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="payoutMethodSelect" className="block text-xs font-semibold text-stone-300 mb-1">
              Select Payout Method:
            </label>
            <select
              id="payoutMethodSelect"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500 font-medium"
            >
              <option value="JazzCash Mobile Account">JazzCash Mobile Account (0% Fee · Direct 24/7)</option>
              <option value="Easypaisa Mobile Account">Easypaisa Mobile Account (Instant)</option>
              <option value="Pakistan Bank Wire">Pakistan Bank Transfer (IBAN / Account)</option>
              <option value="USDT (TRC-20)">USDT (Tron TRC-20) - International</option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
              <label htmlFor="withdrawalAmountInput" className="font-semibold text-stone-300">
                Withdrawal Amount ({settings.currencySymbol})
              </label>
              <span>Min: {settings.currencySymbol}{minWth.toLocaleString()}</span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 font-bold">
                {settings.currencySymbol}
              </span>
              <input
                id="withdrawalAmountInput"
                type="number"
                min={minWth}
                max={availableBalance}
                step="50"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-8 pr-16 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-amber-500 font-bold"
                required
              />
              <button
                type="button"
                onClick={() => setAmount(Math.floor(availableBalance))}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg"
              >
                MAX
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="accountTitleInput" className="block text-xs font-semibold text-stone-300 mb-1">
              Account Holder Title / Full Name:
            </label>
            <input
              id="accountTitleInput"
              type="text"
              placeholder="e.g. Tariq Mansoor"
              value={accountTitle}
              onChange={(e) => setAccountTitle(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label htmlFor="destinationAddressInput" className="block text-xs font-semibold text-stone-300 mb-1">
              Recipient Mobile Number / Account Number / IBAN:
            </label>
            <input
              id="destinationAddressInput"
              type="text"
              placeholder="e.g. 03001234567 or IBAN"
              value={destinationAddress}
              onChange={(e) => setDestinationAddress(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-amber-400 font-mono tracking-wider focus:outline-none focus:border-amber-500 font-bold"
              required
            />
          </div>

          {statusMsg && (
            <div
              className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                statusMsg.error ? 'bg-red-950/60 border border-red-800 text-red-200' : 'bg-emerald-950/60 border border-emerald-800 text-emerald-200'
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
            disabled={availableBalance < minWth}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-stone-950 font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Submit Withdrawal Request</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
};
