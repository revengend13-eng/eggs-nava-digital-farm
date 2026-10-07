import React from 'react';
import { useFarm } from '../context/FarmContext';
import { Megaphone, ArrowRight } from 'lucide-react';

interface AnnouncementBarProps {
  onLearnMore?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onLearnMore }) => {
  const { settings, announcements } = useFarm();

  if (!settings.enableMarquee && announcements.filter(a => a.active).length === 0) {
    return null;
  }

  const activeAnnouncement = announcements.find(a => a.active);
  const displayText = activeAnnouncement
    ? `${activeAnnouncement.title} — ${activeAnnouncement.content}`
    : settings.marqueeNotice;

  return (
    <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-stone-900 border-b border-amber-600/30 text-xs py-2 px-4 text-stone-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="shrink-0 flex items-center gap-1 font-bold text-amber-200 uppercase tracking-wider text-[11px] bg-stone-950/40 px-2 py-0.5 rounded">
            <Megaphone className="w-3.5 h-3.5 text-amber-400" />
            Farm Alert
          </span>
          <p className="truncate text-stone-100 font-medium">
            {displayText}
          </p>
        </div>

        {onLearnMore && (
          <button
            onClick={onLearnMore}
            className="shrink-0 hidden sm:flex items-center gap-1 text-[11px] font-semibold text-amber-200 hover:text-white transition-colors"
          >
            <span>View Plans</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
