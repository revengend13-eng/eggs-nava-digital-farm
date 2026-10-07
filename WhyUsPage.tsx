import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Award,
  ArrowRight,
  TrendingUp,
  X
} from 'lucide-react';

interface WhyUsPageProps {
  onNavigate: (tab: string) => void;
}

export const WhyUsPage: React.FC<WhyUsPageProps> = ({ onNavigate }) => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Tier-4 Bio-Security Certification',
      desc: 'Our poultry complexes implement hospital-grade air filtration, positive pressure locks, automated sanitization misting, and strict quarantine protocols to eliminate avian flu and bacterial contamination.'
    },
    {
      icon: Cpu,
      title: 'Automated IoT Sensor Telemetry',
      desc: 'Every poultry flock coop is monitored in real-time by over 120 IoT probes tracking micro-climate parameters, carbon dioxide levels, water intake, and automated robotic feed distribution lines.'
    },
    {
      icon: Layers,
      title: 'High-Volume Commercial Contracts',
      desc: 'Our harvested eggs are pre-sold under recurring wholesale agreements to major regional supermarket chains, bakery conglomerates, and institutional food distributors, guaranteeing steady revenue.'
    },
    {
      icon: TrendingUp,
      title: 'Automated 24/7 Daily Settlements',
      desc: 'No waiting for month-end reconciliation. Your digital flock egg production is credited every 24 hours directly into your investor wallet, ready for immediate withdrawal or reinvestment.'
    },
    {
      icon: Award,
      title: 'Agro-Contingency Insurance Reserve',
      desc: 'A dedicated Rs. 50,000,000 contingency fund is held in reserve to guarantee your principal and protect against unexpected flock anomalies, feed volatility, or climate interruptions.'
    },
    {
      icon: ShieldCheck,
      title: 'Transparent Smart Contracts & Ledger',
      desc: 'All flock allocations, daily egg harvests, and payout cycles are recorded on a verifiable audit ledger. What you see on your dashboard mirrors physical coop production.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
          The Eggs Nava Advantage
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
          Pioneering Sustainable Digital Poultry Agro-Fintech
        </h1>
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
          We have reimagined commercial egg production by merging precision agricultural engineering with transparent digital asset management.
        </p>
      </div>

      {/* Hero Visual Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-10">
        <div className="space-y-4">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Real Assets · Real Flocks
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Why Digital Poultry Yields Outperform Traditional Commodities
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
            Eggs represent one of humanity's most resilient, non-discretionary food staples. Demand remains exceptionally inelastic even during economic turbulence. By combining genetic vitality (ISA Brown and Lohmann breeds) with automated feeding lines, we achieve an industry-leading 98.6% daily laying efficiency.
          </p>
          <div className="pt-2 space-y-2 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Zero manual labor required by investors</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Full capital preservation with scheduled principal return</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Transparent 3-tier referral incentives (7% / 3% / 1%)</span>
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-stone-800">
          <img
            src="/src/assets/images/farm_tech_inspection_1791212877213.jpg"
            alt="Veterinary technician inspecting poultry facilities"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 p-3 bg-stone-900/90 backdrop-blur rounded-xl text-xs text-stone-200 flex justify-between items-center border border-stone-800">
            <span>Bio-Audit Protocol #NV-2026</span>
            <span className="text-emerald-400 font-semibold font-mono">100% Passed</span>
          </div>
        </div>
      </div>

      {/* 6 Core Pillars Grid */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Core Technological Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-stone-950/80 border border-stone-800 rounded-2xl space-y-3 hover:border-amber-500/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-display">
                  {pillar.title}
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Direct Comparison
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
            How We Compare
          </h2>
          <p className="text-stone-400 text-xs mt-1">
            A clear look at how Eggs Nava Digital Farm stands apart from conventional farming and speculative schemes.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-800 text-stone-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Feature & Metrics</th>
                <th className="py-3 px-4 text-amber-400 bg-amber-500/5">EGGS NAVA DIGITAL FARM</th>
                <th className="py-3 px-4">Traditional Poultry Farm</th>
                <th className="py-3 px-4">Speculative Crypto Schemes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80 text-stone-300">
              <tr>
                <td className="py-3 px-4 font-medium text-white">Daily Profit Distribution</td>
                <td className="py-3 px-4 font-semibold text-emerald-400 bg-amber-500/5 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Automated Daily (7.0% - 10.0%) via JazzCash
                </td>
                <td className="py-3 px-4 text-stone-400">Quarterly / Erratic</td>
                <td className="py-3 px-4 text-red-400 flex items-center gap-1">
                  <X className="w-4 h-4" /> Unreliable / Fabricated
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Physical Commodity Backing</td>
                <td className="py-3 px-4 font-semibold text-emerald-400 bg-amber-500/5 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Physical Bio-Secure Coops (Lahore)
                </td>
                <td className="py-3 px-4">Yes (High Overhead)</td>
                <td className="py-3 px-4 text-red-400 flex items-center gap-1">
                  <X className="w-4 h-4" /> None (Virtual tokens)
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Minimum Capital Required</td>
                <td className="py-3 px-4 font-semibold text-amber-300 bg-amber-500/5">
                  Just Rs. 500 to begin via JazzCash
                </td>
                <td className="py-3 px-4 text-stone-400">Rs. 5,000,000+ Land & Sheds</td>
                <td className="py-3 px-4 text-stone-400">Varies</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Operational Maintenance</td>
                <td className="py-3 px-4 font-semibold text-emerald-400 bg-amber-500/5 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Automated by Farm
                </td>
                <td className="py-3 px-4 text-stone-400">70+ hrs/week labor</td>
                <td className="py-3 px-4 text-stone-400">N/A</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Principal Capital Return</td>
                <td className="py-3 px-4 font-semibold text-emerald-400 bg-amber-500/5 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Returned at End
                </td>
                <td className="py-3 px-4 text-stone-400">Slow Asset Depletion</td>
                <td className="py-3 px-4 text-red-400 flex items-center gap-1">
                  <X className="w-4 h-4" /> Often locked/lost
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Withdrawal Freedom</td>
                <td className="py-3 px-4 font-semibold text-emerald-400 bg-amber-500/5 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Anytime (Min Rs. 200, 0% Fee via JazzCash)
                </td>
                <td className="py-3 px-4 text-stone-400">Seasonal</td>
                <td className="py-3 px-4 text-stone-400">High slippage & fees</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('plans')}
          className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm rounded-xl shadow-xl shadow-amber-500/20 transition-all inline-flex items-center gap-2"
        >
          <span>Choose Your Digital Flock Plan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
