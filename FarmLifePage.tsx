import React, { useState, useEffect } from 'react';
import {
  Radio,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Activity,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

interface FarmLifePageProps {
  onNavigate: (tab: string) => void;
}

export const FarmLifePage: React.FC<FarmLifePageProps> = ({ onNavigate }) => {
  const [currentTime, setCurrentTime] = useState(new Date().toUTCString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toUTCString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const sensors = [
    {
      icon: Thermometer,
      label: 'Coop Ambient Temp',
      value: '22.4°C',
      status: 'Optimal (21°C - 24°C)',
      statusColor: 'text-emerald-400'
    },
    {
      icon: Droplets,
      label: 'Relative Humidity',
      value: '58.2%',
      status: 'Ideal for laying layers',
      statusColor: 'text-emerald-400'
    },
    {
      icon: Wind,
      label: 'Negative Air Flow',
      value: '420 m³/h',
      status: 'Bio-filter active',
      statusColor: 'text-emerald-400'
    },
    {
      icon: Sun,
      label: 'Solar Array Output',
      value: '48.6 kW',
      status: '100% Net Zero Grid',
      statusColor: 'text-amber-400'
    },
    {
      icon: Layers,
      label: 'Robotic Feed Reserves',
      value: '94% Full',
      status: 'Organic fortified mash',
      statusColor: 'text-emerald-400'
    },
    {
      icon: Activity,
      label: 'Flock Biometrics',
      value: '99.2%',
      status: 'Zero anomalies reported',
      statusColor: 'text-emerald-400'
    }
  ];

  const galleryItems = [
    {
      title: 'Smart Poultry House Interior',
      subtitle: 'ISA Brown Flock Sector 02',
      image: '/src/assets/images/hero_digital_farm_1791212836613.jpg',
      badge: 'Live Monitored'
    },
    {
      title: 'Automated Conveyor & Laser Inspection',
      subtitle: 'Grading 600 eggs per minute',
      image: '/src/assets/images/egg_sorting_line_1791212850415.jpg',
      badge: 'Automated Line'
    },
    {
      title: 'Sustainable Pastoral Facilities',
      subtitle: 'Solar-Powered Free-Range Coops',
      image: '/src/assets/images/modern_coop_exterior_1791212864792.jpg',
      badge: 'Zero Carbon'
    },
    {
      title: 'Veterinary Biosecurity Audit',
      subtitle: 'Dr. Katherine Vance & Clinical Team',
      image: '/src/assets/images/farm_tech_inspection_1791212877213.jpg',
      badge: 'Certified Health'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
          Transparent Agrotechnology
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
          Inside Eggs Nava Digital Farm
        </h1>
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
          Real-time telemetry, simulated webcam feeds, and strict bio-security standards that power our daily egg harvest yields.
        </p>
      </div>

      {/* Simulated Live Camera Feed */}
      <div className="relative rounded-3xl overflow-hidden border border-stone-800 bg-stone-950 shadow-2xl">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] max-h-[500px] w-full overflow-hidden">
          <img
            src="/src/assets/images/hero_digital_farm_1791212836613.jpg"
            alt="Live Camera Feed of Smart Coop"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-black/60" />

          {/* Top Overlays */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-3">
            <span className="flex items-center gap-2 px-3 py-1 bg-red-600/90 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Live Cam Feed
            </span>
            <span className="px-3 py-1 bg-stone-900/80 backdrop-blur text-stone-200 border border-stone-700/80 rounded-full text-xs font-mono">
              CAM-04 · COOP ALPHA
            </span>
          </div>

          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 hidden sm:block">
            <span className="px-3 py-1 bg-stone-900/80 backdrop-blur text-stone-300 border border-stone-700/80 rounded-full text-xs font-mono">
              {currentTime}
            </span>
          </div>

          {/* Bottom Telemetry HUD */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 bg-stone-900/90 backdrop-blur-md border border-stone-800 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <div>
                <span className="text-[10px] text-stone-400 block uppercase">Active Flock Cohort</span>
                <span className="font-bold text-white text-sm">ISA Brown Hen Unit 03 (32,000 birds)</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <span className="text-[10px] text-stone-400 block uppercase">Egg Yield Today</span>
                <span className="font-bold text-amber-400 font-mono text-sm">31,480 Eggs</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block uppercase">Laying Rate</span>
                <span className="font-bold text-emerald-400 font-mono text-sm">98.4%</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block uppercase">Bio-Status</span>
                <span className="font-bold text-emerald-400 text-sm">Certified Sterile</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Sensors Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white font-display">
            Environmental IoT Telemetry Dashboard
          </h2>
          <span className="text-xs text-stone-400 flex items-center gap-1 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Live Stream
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {sensors.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-4 bg-stone-950 border border-stone-800 rounded-xl space-y-2"
              >
                <div className="flex items-center justify-between">
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span className="text-[10px] text-stone-500 font-mono">#0{idx + 1}</span>
                </div>
                <div>
                  <span className="text-[11px] text-stone-400 block truncate">{s.label}</span>
                  <span className="text-lg font-bold text-white font-mono">{s.value}</span>
                </div>
                <p className={`text-[10px] font-semibold ${s.statusColor} truncate`}>
                  {s.status}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Farm Life Photo Showcase */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            High-Tech Poultry Operations Gallery
          </h2>
          <p className="text-stone-400 text-xs mt-1">
            Visual inspection of our modern egg laying lines and facility hygiene.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-stone-800 bg-stone-950 overflow-hidden group hover:border-amber-500/50 transition-all"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                <span className="absolute top-3 right-3 px-2.5 py-0.5 bg-stone-900/80 backdrop-blur border border-stone-700 rounded-full text-[10px] font-semibold text-amber-300">
                  {item.badge}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-white font-display">{item.title}</h3>
                <p className="text-xs text-stone-400 mt-0.5">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Veterinary Audit Log */}
      <div className="bg-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Weekly Avian Veterinary Inspection Records
              </h3>
              <p className="text-xs text-stone-400">Chief Officer: Dr. Katherine Vance, DVM (Avian Specialist)</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-lg">
            Status: Certified
          </span>
        </div>

        <div className="space-y-3 text-xs text-stone-300">
          <div className="p-3 bg-stone-900/60 rounded-xl border border-stone-800 flex justify-between items-center">
            <div>
              <p className="font-semibold text-white">Pathogen Screening PCR Test</p>
              <p className="text-stone-400 text-[11px]">Avian Influenza, Salmonella Enteritidis & Mycoplasma Synoviae: All Negative</p>
            </div>
            <span className="text-emerald-400 font-bold">PASSED (0.00%)</span>
          </div>

          <div className="p-3 bg-stone-900/60 rounded-xl border border-stone-800 flex justify-between items-center">
            <div>
              <p className="font-semibold text-white">Water Alkalinity & Mineral Content</p>
              <p className="text-stone-400 text-[11px]">Electrolyte and automated vitamin D3 dosing active for optimal eggshell thickness</p>
            </div>
            <span className="text-emerald-400 font-bold">NORMAL (pH 6.8)</span>
          </div>

          <div className="p-3 bg-stone-900/60 rounded-xl border border-stone-800 flex justify-between items-center">
            <div>
              <p className="font-semibold text-white">Shell Caliber & Grade Calibration</p>
              <p className="text-stone-400 text-[11px]">Laser inspection thickness: 0.38mm average · Grade-A Extra Large (63g - 73g)</p>
            </div>
            <span className="text-amber-400 font-bold">GRADE-A PRIME</span>
          </div>
        </div>
      </div>

      {/* Direct CTA */}
      <div className="text-center pt-2">
        <button
          onClick={() => onNavigate('plans')}
          className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm rounded-xl shadow-xl shadow-amber-500/20 transition-all inline-flex items-center gap-2"
        >
          <span>Adopt a Smart Flock & Earn Daily Yields</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
