import { useState, useEffect } from 'react';
import { getTimeUntil } from '../utils/timeUtils';

export const useRemainingTime = (prayerTimes: { prayer: string; time: string }[]) => {
  const [remainingTime, setRemainingTime] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateRemainingTime = () => {
      const remaining: Record<string, string> = {};
      prayerTimes.forEach(({ prayer, time }) => {
        const [hours, minutes] = time.split(':').map(Number);
        const targetTime = new Date();
        targetTime.setHours(hours, minutes, 0, 0);
        remaining[prayer] = getTimeUntil(targetTime);
      });
      setRemainingTime(remaining);
    };

    updateRemainingTime();
    const timer = setInterval(updateRemainingTime, 60000);

    return () => clearInterval(timer);
  }, [prayerTimes]);

  return remainingTime;
}; 