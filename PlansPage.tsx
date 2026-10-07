import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { Plan } from '../types';
import {
  CheckCircle2,
  Egg,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Sparkles
} from 'lucide-react';

interface PlansPageProps {
  onSelectPlan: (plan: Plan) => void;
  onNavigate: (tab: string) => void;
}

export const PlansPage: React.FC<PlansPageProps> = ({ onSelectPlan, onNavigate }) => {
  const { plans, settings, isOwnerOrAdmin } = useFarm();
  const [filter, setFilter] = useState<'all' | 'starter' | 'commercial' | 'industrial'>('all');

  const activePlans = plans.filter(p => p.active);

  const filteredPlans = activePlans.filter((plan) => {
    if (filter === 'starter') return plan.pricePkr <= 2000;
    if (filter === 'commercial') return plan.pricePkr > 2000 && plan.pricePkr <= 15000;
    if (filter === 'industrial') return plan.pricePkr > 15000;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Verified Laying Hen Cohorts · Daily JazzCash Payouts</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
          Smart Poultry Investment Plans
        </h1>
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
          Each contract assigns real laying birds in our state-of-the-art bio-secure facility in Lahore. Receive automated daily egg profit payouts credited directly to your JazzCash or Easypaisa account.
        </p>

        {isOwnerOrAdmin && (
          <div className="pt-2">
            <button
              onClick={() => onNavigate('admin')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold hover:bg-amber-500/20 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Owner Mode: Manage, create & edit plans in Admin Panel</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2">
        <div className="p-1 bg-stone-950 border border-stone-800 rounded-xl flex items-center gap-1 overflow-x-auto">
          {[
            { key: 'all', label: 'All Flock Tiers' },
            { key: 'starter', label: `Starter (≤ ${settings.currencySymbol}2,000)` },
            { key: 'commercial', label: `Commercial (${settings.currencySymbol}5,000 - ${settings.currencySymbol}15,000)` },
            { key: 'industrial', label: `Industrial & Mega (>${settings.currencySymbol}15,000)` }
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key as any)}
              className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filter === tab.key
                  ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPlans.map((plan) => {
          const totalProfitPkr = plan.dailyReturnPkr * plan.durationDays;
          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 sm:p-7 bg-stone-950 border flex flex-col justify-between relative transition-all duration-300 ${
                plan.popular
                  ? 'border-amber-500 shadow-2xl shadow-amber-500/10 ring-1 ring-amber-500/40'
                  : 'border-stone-800 hover:border-stone-700'
              }`}
            >
              {/* Ribbon Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-[10px] font-extrabold uppercase tracking-wider shadow">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display">{plan.name}</h3>
                    <p className="text-xs text-amber-400 font-medium mt-0.5">{plan.flockType}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-stone-900 border border-stone-800 rounded-lg text-xs font-bold text-white font-mono">
                    {plan.henCount} {plan.henCount === 1 ? 'Layer' : 'Layers'}
                  </span>
                </div>

                <p className="text-xs text-stone-400 leading-relaxed mt-3">
                  {plan.description}
                </p>

                {/* Rate Card */}
                <div className="my-5 p-4 bg-stone-900/90 border border-stone-800 rounded-2xl space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase font-semibold block">Fixed Plan Price</span>
                      <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                        {settings.currencySymbol}{plan.pricePkr.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-xs px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg font-bold">
                      +{plan.dailyReturnPercent}% / Day
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-stone-300 pt-3 border-t border-stone-800">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Daily Profit:</span>
                      <span className="font-bold text-emerald-400 font-mono">
                        +{settings.currencySymbol}{plan.dailyReturnPkr} / day
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Daily Egg Yield:</span>
                      <span className="font-semibold text-amber-300 flex items-center gap-1 font-mono">
                        <Egg className="w-3.5 h-3.5 text-amber-400" /> ~{plan.dailyEggYieldEstimate} eggs/day
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Cycle Duration:</span>
                      <span className="font-semibold text-white">{plan.durationDays} Days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Total Harvest Profit:</span>
                      <span className="font-bold text-amber-300 font-mono">
                        +{settings.currencySymbol}{totalProfitPkr.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Capital Return:</span>
                      <span className="font-semibold text-emerald-400">100% Principal Returned</span>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                    Flock Specifications:
                  </span>
                  <ul className="space-y-2 text-xs text-stone-300">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                <button
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                    plan.popular
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 hover:from-amber-400 hover:to-amber-500 shadow-amber-500/20'
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-100 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-amber-400" />
                  <span>Activate with JazzCash</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
