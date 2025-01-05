export function getTimeUntil(targetTime: Date, timezone?: string): string {
    // Create current time in the target timezone
    const now = timezone 
        ? new Date(new Date().toLocaleString('en-US', { timeZone: timezone }))
        : new Date();
    
    let diff = targetTime.getTime() - now.getTime();
    
    // If diff is negative, it means we need to get time until next occurrence
    // But only add a day if the target time is actually from a previous day
    if (diff < 0) {
        const targetDay = targetTime.getDate();
        const currentDay = now.getDate();
        
        // Only adjust to next day if we're actually on different days
        if (targetDay !== currentDay || 
            targetTime.getMonth() !== now.getMonth() || 
            targetTime.getFullYear() !== now.getFullYear()) {
            targetTime.setDate(targetTime.getDate() + 1);
            diff = targetTime.getTime() - now.getTime();
        }
    }
    
    // Calculate hours and minutes
    const totalMinutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    // Format the output
    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
}

function isTimeBetween(current: Date, start: Date, end: Date): boolean {
  const currentTime = current.getTime();
  const startTime = start.getTime();
  const endTime = end.getTime();
  return currentTime >= startTime && currentTime <= endTime;
}

export function getCurrentPrayerPeriod(prayerTimes: {
  Fajr: Date;
  Sunrise: Date;
  Dhuhr: Date;
  Asr: Date;
  Maghrib: Date;
  Isha: Date;
}): string {
  const now = new Date();
  const times = [
    { name: 'Fajr', time: prayerTimes.Fajr },
    { name: 'Sunrise', time: prayerTimes.Sunrise },
    { name: 'Dhuhr', time: prayerTimes.Dhuhr },
    { name: 'Asr', time: prayerTimes.Asr },
    { name: 'Maghrib', time: prayerTimes.Maghrib },
    { name: 'Isha', time: prayerTimes.Isha },
  ];

  for (let i = 0; i < times.length; i++) {
    const currentTime = times[i];
    const nextTime = times[i + 1];
    
    if (nextTime) {
      if (isTimeBetween(now, currentTime.time, nextTime.time)) {
        return currentTime.name;
      }
    } else {
      // After Isha until midnight, return "Night"
      if (isTimeBetween(now, currentTime.time, new Date(now.setHours(23, 59, 59)))) {
        return "Night";
      }
    }
  }
  
  // Between midnight and Fajr
  return "Night";
}