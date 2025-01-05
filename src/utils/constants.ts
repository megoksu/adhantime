import { BsSunrise, BsSun, BsSunset } from 'react-icons/bs';
import { MdDarkMode } from 'react-icons/md';
import { RiMoonClearLine } from 'react-icons/ri';
import { type City } from '@/utils/types';

export const PRAYER_ICONS = {
  Fajr: RiMoonClearLine,
  Sunrise: BsSunrise,
  Dhuhr: BsSun,
  Asr: BsSun,
  Maghrib: BsSunset,
  Isha: MdDarkMode,
};

export const TIME_COLORS = {
  Fajr: 'bg-fajr',
  Sunrise: 'bg-sunrise',
  Dhuhr: 'bg-dhuhr',
  Asr: 'bg-asr',
  Maghrib: 'bg-maghrib',
  Isha: 'bg-isha',
  default: 'bg-night',
};

export const DEFAULT_CITY: City = {
  name: 'Istanbul',
  country: 'Turkey',
  lat: 41.0082,
  lng: 28.9784,
};

export const PRAYER_NAMES = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;

export type PrayerName = typeof PRAYER_NAMES[number]; 