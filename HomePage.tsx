import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { Plan } from '../types';
import {
  TrendingUp,
  ShieldCheck,
  Cpu,
  Egg,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Layers,
  Sparkles,
  Radio,
  Clock,
  Award,
  Leaf,
  Sun,
  Smartphone,
  Check
} from 'lucide-react';

interface HomePageProps {
  onSelectPlan: (plan: Plan) => void;
  onNavigate: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectPlan, onNavigate }) => {
  const { settings, plans, currentUser } = useFarm();

  // Profit Simulator State
  const [calcAmount, setCalcAmount] = useState<number>(1000);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(plans[1]?.id || plans[0]?.id || '');
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  const activeCalcPlan = plans.find(p => p.id === selectedPlanId) || plans[0];
  const dailyProfit = activeCalcPlan ? (calcAmount * activeCalcPlan.dailyReturnPercent) / 100 : 0;
  const cycleProfit = activeCalcPlan ? dailyProfit * activeCalcPlan.durationDays : 0;
  const netTotalReturn = activeCalcPlan ? (activeCalcPlan.capitalReturn ? calcAmount + cycleProfit : cycleProfit) : 0;
  const eggPrice = settings.eggUnitPricePkr || settings.eggUnitPrice || 35;
  const eggsDailyEst = Math.round(dailyProfit / eggPrice);

  const faqs = [
    {
      q: 'How does digital egg farming work with Eggs Nava Digital Farm?',
      a: 'When you fund an investment plan via JazzCash, your capital funds verified laying flocks of ISA Brown and Lohmann layers in our automated climate-controlled coops. Eggs produced are sold directly into commercial food distribution networks in Pakistan, and your share of egg revenue is credited automatically to your PKR balance every 24 hours.'
    },
    {
      q: 'When and how can I withdraw my earnings?',
      a: 'Daily egg yield profits are credited continuously to your account balance. You can request a withdrawal anytime directly to your JazzCash or Easypaisa account (minimum Rs. 200) with zero deduction fees.'
    },
    {
      q: 'What is the minimum deposit and plan activation cost?',
      a: 'You can start with our Starter Layer Tier at just Rs. 500. We also offer Popular Commercial Flocks (Rs. 5,000 – Rs. 12,500) and Industrial VIP Mega Flocks (Rs. 30,000+) to suit every investor level.'
    },
    {
      q: 'How do I pay with JazzCash?',
      a: 'Choose your desired plan, copy our official JazzCash Till / Mobile Account number, send the exact PKR amount from your JazzCash app, copy the 12-digit Transaction ID (TID) from the SMS receipt, and submit it on the platform. Your plan becomes active as soon as our admin team reviews and confirms the deposit.'
    },
    {
      q: 'What is the referral program structure?',
      a: 'Eggs Nava Digital Farm offers a lucrative 3-tier commission system: Level 1 (7%), Level 2 (3%), and Level 3 (1%). Whenever your friends join and activate flock plans, commissions in PKR are credited instantly to your wallet.'
    },
    {
      q: 'Are the flocks insured against diseases and mortality?',
      a: 'Yes. All digital poultry units are covered under our Bio-Security Reserve and Avian Contingency Insurance, backed by 24/7 licensed veterinary supervision and IoT biometric monitoring.'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 1-4: HERO SECTION (Tagline, Main Heading, Supporting Description, CTA Buttons) */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Small highlighted tagline above main heading */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>#1 DIGITAL POULTRY FARMING PLATFORM IN PAKISTAN</span>
              </div>

              {/* 2. Large main hero heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-[1.1] text-balance">
                EGGS NAVA <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">DIGITAL FARM</span>
              </h1>

              {/* 3. Supporting description */}
              <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                {settings.heroSubheadline || 'Invest in verified high-yield laying hens, earn daily egg revenue in PKR, and withdraw instantly to JazzCash with automated IoT poultry tracking.'}
              </p>

              {/* 4. Register/Join button and Login button */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {!currentUser ? (
                  <>
                    <button
                      onClick={() => onNavigate('register')}
                      className="px-7 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-extrabold text-sm rounded-xl shadow-xl shadow-amber-500/25 transition-all flex items-center gap-2 cursor-pointer group"
                    >
                      <span>Join / Register (Rs. 100 Bonus)</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => onNavigate('login')}
                      className="px-6 py-3.5 bg-stone-800/90 hover:bg-stone-800 border border-stone-700 text-stone-200 font-semibold text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Investor Login</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => onNavigate('dashboard')}
                      className="px-7 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-extrabold text-sm rounded-xl shadow-xl shadow-amber-500/25 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Open User Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onNavigate('plans')}
                      className="px-6 py-3.5 bg-stone-800/90 hover:bg-stone-800 border border-stone-700 text-stone-200 font-semibold text-sm rounded-xl transition-all cursor-pointer"
                    >
                      <span>Select Flock Plan</span>
                    </button>
                  </>
                )}

                <button
                  onClick={() => onNavigate('plans')}
                  className="px-5 py-3.5 text-amber-400 hover:text-amber-300 font-semibold text-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 text-amber-400" />
                  <span>JazzCash Instant Activation</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-stone-800/80 flex flex-wrap items-center gap-6 text-xs text-stone-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Automated 24h Payouts</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Bio-Security Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>IoT Smart Conveyors</span>
                </div>
              </div>
            </div>

            {/* 6. Large poultry/egg farm visual section (Right Column) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-stone-700/80 shadow-2xl bg-stone-950 aspect-[16/11]">
                <img
                  src="/src/assets/images/hero_digital_farm_1791212836613.jpg"
                  alt="Eggs Nava Smart Digital Poultry Farm Facility"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                {/* Floating Telemetry Pill */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-stone-900/90 backdrop-blur-md border border-stone-800 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                      Active Facility Sector 03
                    </span>
                    <span className="font-bold text-white text-sm">
                      84,320 ISA Brown Layers
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-400 font-semibold block flex items-center justify-end gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                      Live Laying Rate
                    </span>
                    <span className="font-bold text-amber-400 text-sm font-mono tabular-nums">
                      98.6% Optimal
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Farmer/community statistic area */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-stone-950/80 border border-stone-800 rounded-2xl">
            <div className="space-y-1">
              <span className="text-xs text-stone-400 flex items-center gap-1.5">
                <Egg className="w-4 h-4 text-amber-400" /> Total Eggs Harvested
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                {settings.liveStats.totalEggsHarvested.toLocaleString()}+
              </p>
              <p className="text-[11px] text-emerald-400 font-medium">Daily egg collection updated</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-stone-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-400" /> Active Flock Birds
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                {settings.liveStats.activeFlockBirds.toLocaleString()}
              </p>
              <p className="text-[11px] text-stone-400">Bio-secure climate coops</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-stone-400 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-amber-400" /> Total Distributed
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
                {settings.currencySymbol}{(settings.liveStats.totalDistributedPkr || 8750000).toLocaleString()}+
              </p>
              <p className="text-[11px] text-stone-400">Processed to JazzCash accounts</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-stone-400 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-yellow-400" /> Flock Egg Yield Efficiency
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
                {settings.liveStats.hatchingRatePercent}%
              </p>
              <p className="text-[11px] text-stone-400">Veterinary audited Grade-A</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Small status/information cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-stone-950/70 border border-stone-800 rounded-xl flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Sun className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Climate Controlled</p>
              <p className="text-[11px] text-stone-400">22.4°C constant optimal coop index</p>
            </div>
          </div>

          <div className="p-4 bg-stone-950/70 border border-stone-800 rounded-xl flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Organic Rations</p>
              <p className="text-[11px] text-stone-400">Non-GMO grains & fortified calcium</p>
            </div>
          </div>

          <div className="p-4 bg-stone-950/70 border border-stone-800 rounded-xl flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
              <Cpu className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Automated Belts</p>
              <p className="text-[11px] text-stone-400">Continuous gentle egg conveyors</p>
            </div>
          </div>

          <div className="p-4 bg-stone-950/70 border border-stone-800 rounded-xl flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Bio-Security 24/7</p>
              <p className="text-[11px] text-stone-400">Zero pathogen isolation & insurance</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. THREE FEATURE / VALUE SECTIONS: Naturally Raised, Farm-Fresh Quality, Smarter Farming */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Core Farming Pillars
          </span>
          <h2 className="text-3xl font-extrabold text-white font-display mt-1">
            Why Eggs Nava Digital Farm Outperforms
          </h2>
          <p className="text-stone-400 text-sm mt-2">
            Combining regenerative poultry welfare with institutional-grade agro-fintech automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 1. Naturally Raised */}
          <div className="bg-stone-950 border border-stone-800 rounded-2xl p-7 flex flex-col justify-between hover:border-amber-500/40 transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">Naturally Raised</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Our ISA Brown and Lohmann layers live in spacious, humane, climate-stabilized coops with natural daylight rhythms and pasture access. Stress-free hens produce heavier, golden-yolk Grade-A eggs with consistent 98%+ laying frequency.
              </p>
            </div>
            <div className="pt-6 border-t border-stone-800/80 mt-6 flex items-center gap-2 text-xs font-semibold text-amber-400">
              <Check className="w-4 h-4" /> 100% Certified Avian Welfare
            </div>
          </div>

          {/* 2. Farm-Fresh Quality */}
          <div className="bg-stone-950 border border-stone-800 rounded-2xl p-7 flex flex-col justify-between hover:border-amber-500/40 transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Egg className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">Farm-Fresh Quality</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Automated high-speed optical laser grading scans every egg for shell thickness, yolk density, and weight. Sorted eggs are packed and dispatched daily to Pakistan's premier supermarkets and wholesale markets at premium wholesale rates.
              </p>
            </div>
            <div className="pt-6 border-t border-stone-800/80 mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <Check className="w-4 h-4" /> Daily Optical Grading & Packing
            </div>
          </div>

          {/* 3. Smarter Farming */}
          <div className="bg-stone-950 border border-stone-800 rounded-2xl p-7 flex flex-col justify-between hover:border-amber-500/40 transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">Smarter Farming</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                No physical farm maintenance or messy clean-up required. Fractional digital ownership distributes real farm profits automatically into your online wallet in PKR every 24 hours with fast withdrawals to your JazzCash mobile account.
              </p>
            </div>
            <div className="pt-6 border-t border-stone-800/80 mt-6 flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <Check className="w-4 h-4" /> Automated Daily JazzCash Credits
            </div>
          </div>
        </div>
      </section>

      {/* 9. SECOND FARM / EGG VISUAL SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 aspect-[4/3] relative group">
            <img
              src="/src/assets/images/modern_coop_exterior_1791212864792.jpg"
              alt="High-Tech Sustainable Solar Coops"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-stone-900/90 backdrop-blur-md border border-stone-800 rounded-xl">
              <h4 className="text-white font-bold text-sm">Automated Climate Housing</h4>
              <p className="text-xs text-stone-400 mt-0.5">Negative pressure ventilation keeps coops clean and disease-free.</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 aspect-[4/3] relative group">
            <img
              src="/src/assets/images/egg_sorting_line_1791212850415.jpg"
              alt="Continuous Egg Sorting and Packaging"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-stone-900/90 backdrop-blur-md border border-stone-800 rounded-xl">
              <h4 className="text-white font-bold text-sm">Industrial Conveyor Systems</h4>
              <p className="text-xs text-stone-400 mt-0.5">Over 140,000 Grade-A table eggs harvested and packed every morning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10-12: “A BETTER WAY TO GROW” SECTION (Large heading, Supporting paragraph, 3 benefit bullet points) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 border border-stone-800 rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <span>A BETTER WAY TO GROW</span>
            </div>

            {/* 11. Large heading and supporting paragraph */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
              Real Agricultural Assets. Daily Automated Revenue in PKR.
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              Traditional poultry farming requires acres of land, expensive sheds, and continuous manual labor. Eggs Nava Digital Farm tokenizes and democratizes egg production across Pakistan. Anyone can own certified layer hens, monitor live daily yield metrics, and receive daily cash earnings directly into their JazzCash wallet.
            </p>

            {/* 12. Three benefit bullet points */}
            <div className="space-y-4 pt-4 border-t border-stone-800">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5 text-amber-400 font-bold text-xs">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Guaranteed Daily Egg Revenue</h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Earnings are generated every 24 hours based on wholesale egg contracts. Returns range from 3.2% to 4.5% daily depending on your flock tier.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400 font-bold text-xs">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Transparent JazzCash & Easypaisa Integration</h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    No complex international crypto wallets required. Activate plans instantly using JazzCash or Easypaisa TID verification and withdraw directly in PKR.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400 font-bold text-xs">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Insured Biosecurity & Avian Health</h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Our capital contingency reserve covers flock mortality and disease. 24/7 veterinary doctors ensure high laying efficiency with zero stress.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('plans')}
                className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-extrabold text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Browse Flock Plans & Activate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('why-us')}
                className="px-5 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs rounded-xl border border-stone-700 transition-colors cursor-pointer"
              >
                Learn More About Our Farm
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED INVESTMENT PLANS & JAZZCASH ACTIVATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Flock Investment Tiers
            </span>
            <h2 className="text-3xl font-extrabold text-white font-display mt-1">
              Active Digital Flock Plans (PKR)
            </h2>
            <p className="text-stone-400 text-sm mt-1">
              Select your plan tier to initiate daily egg profit collection via JazzCash.
            </p>
          </div>
          <button
            onClick={() => onNavigate('plans')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Plans & Specifications</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.slice(0, 3).map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 bg-stone-950/90 border flex flex-col justify-between transition-all relative ${
                plan.popular
                  ? 'border-amber-500 shadow-xl shadow-amber-500/10'
                  : 'border-stone-800 hover:border-stone-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-extrabold uppercase tracking-wider shadow">
                  Most Popular Flock
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white font-display">{plan.name}</h3>
                  <p className="text-xs text-amber-400 font-medium mt-0.5">{plan.flockType}</p>
                </div>

                <div className="p-4 bg-stone-900/80 rounded-xl border border-stone-800/80 space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-amber-400 font-mono">
                      {plan.dailyReturnPercent}%
                    </span>
                    <span className="text-xs text-stone-400">/ Daily Profit</span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-300 pt-2 border-t border-stone-800">
                    <span>Duration:</span>
                    <span className="font-semibold text-white">{plan.durationDays} Days</span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-300">
                    <span>Fixed Activation Price:</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {settings.currencySymbol}{plan.pricePkr.toLocaleString()}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-stone-300">
                  {plan.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    plan.popular
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-100'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Activate with JazzCash</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE EGG YIELD & PROFIT CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Smart Profit Simulator
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
              Calculate Your Daily Egg Yields & ROI in PKR
            </h2>
            <p className="text-stone-400 text-sm mt-2">
              Select your desired flock tier to simulate real-time daily returns, egg harvesting quotas, and total maturity payouts in Pakistani Rupees.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Plan Tabs */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-2">
                  Select Poultry Flock Tier:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {plans.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setSelectedPlanId(p.id);
                        setCalcAmount(p.pricePkr);
                      }}
                      className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                        selectedPlanId === p.id
                          ? 'bg-amber-500/15 border-amber-500 text-white shadow-md shadow-amber-500/10 ring-1 ring-amber-500/30'
                          : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                      }`}
                    >
                      <div className="text-xs font-bold truncate">{p.name}</div>
                      <div className="text-amber-400 font-mono text-[11px] mt-0.5">
                        {settings.currencySymbol}{p.pricePkr.toLocaleString()} · {p.dailyReturnPercent}%/d
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-300 font-medium">Selected Flock Fixed Price:</span>
                  <span className="text-2xl font-extrabold text-amber-400 font-mono tabular-nums">
                    {settings.currencySymbol}{calcAmount.toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {plans.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setSelectedPlanId(p.id);
                        setCalcAmount(p.pricePkr);
                      }}
                      className={`py-2 px-1 text-[11px] font-mono font-bold rounded-xl border transition-all truncate text-center cursor-pointer ${
                        calcAmount === p.pricePkr
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                          : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      {settings.currencySymbol}{p.pricePkr.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Yield Output Card */}
            <div className="lg:col-span-5 bg-stone-950/90 border border-stone-800 p-6 rounded-2xl space-y-4">
              <div className="border-b border-stone-800/80 pb-4">
                <span className="text-[11px] text-stone-400 uppercase tracking-wider block">
                  Simulated Daily Yield
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
                    +{settings.currencySymbol}{dailyProfit.toFixed(2)}
                  </span>
                  <span className="text-xs text-stone-400">/ every 24 hrs</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-stone-300">
                  <span className="flex items-center gap-1.5 text-stone-400">
                    <Egg className="w-3.5 h-3.5 text-amber-400" /> Daily Eggs Collected:
                  </span>
                  <span className="font-semibold text-amber-300 font-mono tabular-nums">
                    ~{eggsDailyEst} eggs/day
                  </span>
                </div>

                <div className="flex justify-between text-stone-300">
                  <span className="text-stone-400">Cycle Duration:</span>
                  <span className="font-semibold text-white">{activeCalcPlan?.durationDays} Days</span>
                </div>

                <div className="flex justify-between text-stone-300">
                  <span className="text-stone-400">Total Profit Generated:</span>
                  <span className="font-semibold text-emerald-400 font-mono tabular-nums">
                    {settings.currencySymbol}{cycleProfit.toFixed(2)}
                  </span>
                </div>

                <div className="pt-3 border-t border-stone-800 flex justify-between items-baseline">
                  <span className="text-stone-200 font-bold">Total Return at Maturity:</span>
                  <span className="text-2xl font-black text-amber-400 font-mono tabular-nums">
                    {settings.currencySymbol}{netTotalReturn.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (activeCalcPlan) onSelectPlan(activeCalcPlan);
                }}
                className="w-full mt-2 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Activate {settings.currencySymbol}{calcAmount.toLocaleString()} Plan with JazzCash</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Clear Answers
          </span>
          <h2 className="text-3xl font-extrabold text-white font-display mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = faqOpenIndex === idx;
            return (
              <div
                key={idx}
                className="bg-stone-950 border border-stone-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setFaqOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-stone-100">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-stone-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 13. FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 bg-gradient-to-r from-amber-600 via-amber-700 to-stone-950 border border-amber-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Ready to Own Your First Digital Poultry Flock?
            </h3>
            <p className="text-amber-100/90 text-sm">
              Start with as little as Rs. 500 via JazzCash. Enjoy automated daily egg harvesting and direct PKR withdrawals anytime.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => onNavigate('plans')}
              className="px-6 py-3 bg-stone-950 hover:bg-stone-900 text-amber-400 font-bold text-xs rounded-xl shadow-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Choose a Flock Plan
            </button>
            <button
              onClick={() => onNavigate('register')}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-xl shadow-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Register & Get Rs. 100 Bonus
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
