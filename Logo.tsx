import React from 'react';
import { useFarm } from '../context/FarmContext';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showSubtitle = true }) => {
  const { settings } = useFarm();

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Golden Egg Emblem with Circuit/Sprout */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center shrink-0`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-300 rounded-[48%_48%_44%_44%/60%_60%_40%_40%] shadow-lg shadow-amber-500/20 ring-1 ring-amber-400/40" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10 w-3/5 h-3/5 text-stone-950"
        >
          {/* Digital Bio-Circuit & Sprout Node */}
          <path d="M12 4v16" stroke="currentColor" strokeWidth="2.4" />
          <path d="M12 9c2.5-1.5 5 0 5 3s-2.5 4-5 3" fill="none" />
          <path d="M12 13c-2.5-1.5-5 0-5 3s2.5 4 5 3" fill="none" />
          <circle cx="12" cy="7" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="17" cy="12" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span className={`font-extrabold tracking-tight text-white font-display uppercase ${textSizes[size]}`}>
          {settings.logoText || 'EGGS NAVA'}
        </span>
        {showSubtitle && (
          <span className="text-[10px] font-semibold tracking-widest text-amber-400 uppercase mt-0.5">
            {settings.logoSubtitle || 'DIGITAL FARM'}
          </span>
        )}
      </div>
    </div>
  );
};
