import { type City } from './types';
import { getTimeUntil } from './timeUtils';

interface AladhanResponse {
  data: {
    meta: {
      timezone: string;
    };
    timings: {
      Fajr: string;
      Sunrise: string;
      Dhuhr: string;
      Asr: string;
      Maghrib: string;
      Isha: string;
    };
  };
}

export interface PrayerTime {
  name: string;
  time: string;
  isActive: boolean;
  nextPrayerIn: string;
}

function convertToDate(timeStr: string, timezone: string): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const now = new Date();
  const timeZoneDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
  
  // Always use current date, only set hours and minutes
  return new Date(
    timeZoneDate.getFullYear(),
    timeZoneDate.getMonth(),
    timeZoneDate.getDate(),
    hours,
    minutes,
    0,
    0
  );
}

function formatTime(timeStr: string): string {
  return timeStr.split(':').slice(0, 2).join(':');
}

function getNextPrayerTime(prayers: { name: string; time: string }[], currentPrayer: string, timezone: string): Date {
  const currentIndex = prayers.findIndex(p => p.name === currentPrayer);
  const nextPrayer = prayers[(currentIndex + 1) % prayers.length];
  return convertToDate(nextPrayer.time, timezone);
}

export async function fetchPrayerTimes(city: City | null): Promise<{ prayers: PrayerTime[]; timezone: string }> {
  const coordinates = city ?? {
    lat: 41.0082,
    lng: 28.9784
  };

  // Use Diyanet method (13) for Turkey, default to MWL (3) for other countries
  const method = city?.country === 'Turkey' ? 13 : 3;

  const response = await fetch(
    `https://api.aladhan.com/v1/timings/${Math.floor(Date.now() / 1000)}?` +
    `latitude=${coordinates.lat}&longitude=${coordinates.lng}&method=${method}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch prayer times');
  }

  const data: AladhanResponse = await response.json();
  const timezone = data.data.meta.timezone;
  const timings = data.data.timings;

  // Convert current time to the target timezone
  const currentTime = new Date();
  const timeOptions = { timeZone: timezone };
  const currentTimeInZone = new Date(currentTime.toLocaleString('en-US', timeOptions));
  currentTimeInZone.setSeconds(0);
  currentTimeInZone.setMilliseconds(0);

  const prayers = [
    { name: 'Fajr', time: timings.Fajr },
    { name: 'Sunrise', time: timings.Sunrise },
    { name: 'Dhuhr', time: timings.Dhuhr },
    { name: 'Asr', time: timings.Asr },
    { name: 'Maghrib', time: timings.Maghrib },
    { name: 'Isha', time: timings.Isha },
  ];

  // Find which prayer time we're currently in
  let activePrayerIndex = -1;
  for (let i = 0; i < prayers.length; i++) {
    const currentPrayerTime = convertToDate(prayers[i].time, timezone);
    const nextPrayerTime = getNextPrayerTime(prayers, prayers[i].name, timezone);
    
    if (currentTimeInZone >= currentPrayerTime && currentTimeInZone < nextPrayerTime) {
      activePrayerIndex = i;
      break;
    }
  }

  // Handle special case for Isha (active from Isha until Fajr next day)
  if (activePrayerIndex === -1) {
    const ishaTime = convertToDate(prayers[5].time, timezone);
    const fajrTime = convertToDate(prayers[0].time, timezone);
    const fajrNextDay = new Date(fajrTime);
    fajrNextDay.setDate(fajrNextDay.getDate() + 1);

    if (currentTimeInZone >= ishaTime || currentTimeInZone < fajrTime) {
      activePrayerIndex = 5; // Isha index
    }
  }

  const mappedPrayers = prayers.map((prayer, index) => {
    const nextPrayerTime = getNextPrayerTime(prayers, prayer.name, timezone);
    
    // Check if we're between midnight and Fajr
    const fajrTime = convertToDate(prayers[0].time, timezone);
    const isAfterMidnight = currentTimeInZone.getHours() >= 0 && currentTimeInZone < fajrTime;
    
    // Only mark as active if we're not in the midnight to Fajr period
    const isActive = !isAfterMidnight && index === activePrayerIndex;
    
    // Always calculate next prayer time
    let nextPrayerIn = '';
    if (index === activePrayerIndex || (isAfterMidnight && index === prayers.length - 1)) {
      nextPrayerIn = getTimeUntil(nextPrayerTime, timezone);
    }

    return {
      name: prayer.name,
      time: formatTime(prayer.time),
      isActive,
      nextPrayerIn
    };
  });

  return {
    prayers: mappedPrayers,
    timezone
  };
} 