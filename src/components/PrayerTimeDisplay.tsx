import { PRAYER_ICONS } from '@/utils/constants';
import { IconType } from 'react-icons';
import React from 'react';

interface PrayerTimeDisplayProps {
  prayer: {
    name: string;
    time: string;
    isActive: boolean;
  };
}

export function PrayerTimeDisplay({ prayer }: PrayerTimeDisplayProps) {
  const Icon = PRAYER_ICONS[prayer.name as keyof typeof PRAYER_ICONS] as IconType;
  
  return (
    <div 
      className={`px-5 py-3 rounded-md flex flex-col items-center min-w-[100px] transition-all duration-300 ${
        prayer.isActive 
          ? 'bg-black/40 transform scale-110 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className={`mb-2 ${prayer.isActive ? 'text-3xl' : 'text-2xl'}`}>
        {Icon && (
          <div className={prayer.name === 'Asr' ? 'opacity-70' : ''}>
            <Icon />
          </div>
        )}
      </div>
      <div className={`font-light ${prayer.isActive ? 'text-xl' : 'text-lg'}`}>{prayer.time}</div>
      <div className={`text-sm font-medium opacity-90 ${prayer.isActive ? 'font-semibold' : ''}`}>{prayer.name}</div>
    </div>
  );
} 