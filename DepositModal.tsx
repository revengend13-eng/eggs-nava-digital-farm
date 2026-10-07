import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { X, Copy, Check, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2, Smartphone } from 'lucide-react';

interface DepositModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({ onClose, onSuccess }) => {
  const { settings, requestDeposit, currentUser } = useFarm();
  const [selectedMethod, setSelectedMethod] = useState<'jazzcash' | 'easypaisa' | 'bankTransfer' | 'usdtTrc20' | 'usdtBep20' | 'btc'>('jazzcash');
  const minDep = settings.minDepositPkr || settings.minDeposit || 500;
  const [amount, setAmount] = useState<number>(minDep);
  const [senderNumber, setSenderNumber] = useState<string>(currentUser?.jazzcashNumber || currentUser?.phone || '');
  const [txHash, setTxHash] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; error: boolean } | null>(null);

  const getMethodInfo = () => {
    switch (selectedMethod) {
      case 'jazzcash':
        return {
          title: 'JazzCash Mobile Account',
          address: settings.paymentMethods.jazzcash?.accountNumber || '03001234567',
          accountName: settings.paymentMethods.jazzcash?.accountName || 'Inam Ullah (Official Farm Receiver)',
          label: 'Official JazzCash Account Number:',
          instructions: settings.paymentMethods.jazzcash?.instructions || 'Send payment via JazzCash App or *786#. Enter TID from SMS 8558 below.'
        };
      case 'easypaisa':
        return {
          title: 'Easypaisa Mobile Account',
          address: settings.paymentMethods.easypaisa?.accountNumber || '03007654321',
          accountName: settings.paymentMethods.easypaisa?.accountName || 'Inam Ullah',
          label: 'Official Easypaisa Account Number:',
          instructions: settings.paymentMethods.easypaisa?.instructions || 'Send payment via Easypaisa App. Enter TRX ID below.'
        };
      case 'bankTransfer':
        return {
          title: 'Direct Bank Wire (Meezan Bank)',
          address: `${settings.paymentMethods.bankTransfer.bankName} | A/C: ${settings.paymentMethods.bankTransfer.accountNumber} | SWIFT: ${settings.paymentMethods.bankTransfer.swift}`,
          accountName: settings.paymentMethods.bankTransfer.accountName,
          label: 'Official Bank Details:',
          instructions: `Beneficiary Name: ${settings.paymentMethods.bankTransfer.accountName}. Submit bank reference number below.`
        };
      case 'usdtTrc20':
        return {
          title: 'USDT (TRC-20 Tron Network)',
          address: settings.paymentMethods.usdtTrc20.address,
          accountName: 'Crypto Settlement Address',
          label: 'Official USDT TRC-20 Address:',
          instructions: settings.paymentMethods.usdtTrc20.qrNote
        };
      case 'usdtBep20':
        return {
          title: 'USDT (BEP-20 BSC Network)',
          address: settings.paymentMethods.usdtBep20.address,
          accountName: 'BNB Smart Chain',
          label: 'Official USDT BEP-20 Address:',
          instructions: settings.paymentMethods.usdtBep20.qrNote
        };
      case 'btc':
        return {
          title: 'Bitcoin (BTC Native)',
          address: settings.paymentMethods.btc.address,
          accountName: 'Bitcoin Network',
          label: 'Official BTC Wallet Address:',
          instructions: settings.paymentMethods.btc.qrNote
        };
    }
  };

  const currentInfo = getMethodInfo();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentInfo.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setStatusMsg({ text: 'Please log in to submit a deposit request.', error: true });
      return;
    }

    if (amount < minDep) {
      setStatusMsg({ text: `Minimum deposit is ${settings.currencySymbol}${minDep.toLocaleString()}`, error: true });
      return;
    }

    if (!txHash.trim()) {
      setStatusMsg({ text: 'Please enter your Transaction ID (TID) or transaction hash.', error: true });
      return;
    }

    const res = requestDeposit(amount, currentInfo.title, txHash.trim(), senderNumber.trim());
    if (res.success) {
      setStatusMsg({ text: res.message, error: false });
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 2200);
    } else {
      setStatusMsg({ text: res.message, error: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-lg p-6 relative shadow-2xl max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div>
            <h3 className="text-xl font-bold text-white font-display">Deposit Funds</h3>
            <p className="text-xs text-stone-400">Add capital to activate smart poultry flocks via JazzCash / Easypaisa</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close deposit modal"
            className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Method Selector */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {(
            [
              { key: 'jazzcash', label: 'JazzCash', badge: 'INSTANT PK' },
              { key: 'easypaisa', label: 'Easypaisa', badge: 'INSTANT PK' },
              { key: 'bankTransfer', label: 'Bank Wire', badge: 'Meezan Bank' },
              { key: 'usdtTrc20', label: 'USDT (TRC20)', badge: 'Crypto' },
              { key: 'usdtBep20', label: 'USDT (BEP20)', badge: 'BSC' },
              { key: 'btc', label: 'Bitcoin', badge: 'Crypto' }
            ] as const
          ).map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => setSelectedMethod(m.key)}
              className={`py-2 px-2.5 text-xs font-semibold rounded-xl border text-center transition-colors truncate flex flex-col items-center justify-center gap-0.5 ${
                selectedMethod === m.key
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm ring-1 ring-amber-500/30'
                  : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
              }`}
            >
              <span>{m.label}</span>
              <span className="text-[9px] text-stone-400 uppercase font-mono">{m.badge}</span>
            </button>
          ))}
        </div>

        {/* Payment Details Container */}
        <div className="mt-4 p-4 bg-stone-950/80 border border-stone-800 rounded-2xl space-y-3">
          {currentInfo.accountName && (
            <div>
              <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Official Account Title:</span>
              <span className="text-sm font-bold text-white">{currentInfo.accountName}</span>
            </div>
          )}

          <div>
            <span className="text-[10px] text-stone-400 uppercase tracking-wider block">{currentInfo.label}</span>
            <div className="mt-1 flex items-center justify-between gap-2 p-2.5 bg-stone-900 rounded-xl border border-stone-800">
              <span className="font-mono text-xs sm:text-sm text-amber-400 break-all select-all font-bold">
                {currentInfo.address}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold text-xs rounded-lg transition-colors flex items-center gap-1 shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <p className="text-[11px] text-stone-400 leading-relaxed font-light">{currentInfo.instructions}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
              <label htmlFor="depositAmountInput">Deposit Amount ({settings.currencySymbol})</label>
              <span>Min: {settings.currencySymbol}{minDep.toLocaleString()}</span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 font-bold">
                {settings.currencySymbol}
              </span>
              <input
                id="depositAmountInput"
                type="number"
                min={minDep}
                step="100"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-8 pr-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-amber-500 font-bold"
                required
              />
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div className="flex gap-2">
            {[500, 1500, 5000, 12500, 30000].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setAmount(preset)}
                className={`flex-1 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                  amount === preset
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                {settings.currencySymbol}{preset.toLocaleString()}
              </button>
            ))}
          </div>

          <div>
            <label htmlFor="senderNumberInput" className="block text-xs text-stone-400 mb-1">
              Your Sender Mobile Number ({selectedMethod === 'easypaisa' ? 'Easypaisa' : 'JazzCash'}):
            </label>
            <input
              id="senderNumberInput"
              type="text"
              placeholder="e.g. 03001234567"
              value={senderNumber}
              onChange={(e) => setSenderNumber(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label htmlFor="txHashInput" className="block text-xs text-stone-400 mb-1">
              Transaction ID (TID / TRX ID from SMS 8558/3737):
            </label>
            <input
              id="txHashInput"
              type="text"
              placeholder="e.g. 85589021482"
              value={txHash}
              onChange={(e) => setTxHash(e.target.value)}
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
              {statusMsg.error ? <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
              <span>{statusMsg.text}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Submit Deposit for Admin Review</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-center gap-2 text-[11px] text-stone-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Manual verification ensures 100% bio-security audit compliance</span>
        </div>
      </div>
    </div>
  );
};
