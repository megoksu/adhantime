export interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  [key: string]: string;
}

export interface City {
  name: string;
  country: string;
  lat: number;
  lng: number;
}

export interface PrayerTime {
  name: string;
  time: string;
  isActive: boolean;
  nextPrayerIn: string;
} 