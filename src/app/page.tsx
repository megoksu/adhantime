'use client';

import React, { useEffect, useState } from 'react';
import { fetchPrayerTimes } from '@/utils/prayerTimes';
import { type City } from '@/utils/types';
import CitySearch from '@/components/CitySearch';
import { TIME_COLORS } from '@/utils/constants';
import { PrayerTimeDisplay } from '@/components/PrayerTimeDisplay';
import * as flags from 'country-flag-icons/react/3x2';
import { countryMapping } from '@/utils/countryMapping';
import Image from 'next/image';

interface PrayerTime {
  name: string;
  time: string;
  isActive: boolean;
  nextPrayerIn: string;
}

export default function Home() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timezone, setTimezone] = useState('Europe/Istanbul');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City>({
    name: 'Istanbul',
    country: 'Turkey',
    lat: 41.0082,
    lng: 28.9784
  });

  const getTimeBasedColors = () => {
    if (prayerTimes.length === 0) return TIME_COLORS.default;
    
    const activeTime = prayerTimes.find(prayer => prayer.isActive);
    return activeTime ? TIME_COLORS[activeTime.name as keyof typeof TIME_COLORS] : TIME_COLORS.default;
  };

  const getFlagComponent = () => {
    const countryCode = countryMapping[selectedCity.country] || 'TR';
    const FlagComponent = flags[countryCode as keyof typeof flags];
    return FlagComponent ? <FlagComponent className="w-6 h-6 rounded" /> : null;
  };

  useEffect(() => {
    const getPrayerTimes = async () => {
      const times = await fetchPrayerTimes(selectedCity);
      if (times.timezone) {
        setTimezone(times.timezone);
      }
      setPrayerTimes(times.prayers);
      setLoading(false);
    };

    getPrayerTimes();
    
    const prayerInterval = setInterval(getPrayerTimes, 60000);
    return () => {
      clearInterval(prayerInterval);
    };
  }, [selectedCity]);

  useEffect(() => {
    const updateLocalTime = () => {
      const date = new Date();
      const localTime = new Date(date.toLocaleString('en-US', {
        timeZone: timezone
      }));
      setCurrentTime(localTime);
    };

    updateLocalTime();
    const interval = setInterval(updateLocalTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading prayer times...</div>
      </div>
    );
  }

  return (
    <main className={`fixed inset-0 w-full h-full ${getTimeBasedColors()}`}>
      <div className="z-10 w-full h-full flex items-start justify-center p-4 md:p-8">
        <div className="max-w-3xl w-full text-white mt-4 md:mt-8">
          <div className="text-center flex flex-col items-center">
            <div className="flex flex-col items-center gap-2 mb-6">
              <Image src="/kaaba.svg" alt="Kaaba" width={40} height={40} />
              <h1 className="text-xl font-light">adhan time</h1>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center mb-12">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-xl font-light px-6 py-2 border border-white/30 rounded-lg 
                hover:bg-white/10 transition-all flex items-center gap-3 mx-auto"
            >
              {selectedCity && getFlagComponent()}
              {selectedCity ? `${selectedCity.name}, ${selectedCity.country}` : 'Select City'}
            </button>
          </div>

          <div className="text-center mt-auto">
            <div className="text-8xl font-light mb-2">
              {currentTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              })}
            </div>
            <div className="text-xl font-light opacity-75">
              {(() => {
                const activePrayer = prayerTimes.find(p => p.isActive);
                const prayerWithNextTime = activePrayer || prayerTimes[prayerTimes.length - 1];
                const nextPrayerIndex = (prayerTimes.findIndex(p => p === prayerWithNextTime) + 1) % prayerTimes.length;
                const nextPrayer = prayerTimes[nextPrayerIndex];
                
                if (prayerWithNextTime.nextPrayerIn) {
                  return `${prayerWithNextTime.nextPrayerIn} until ${nextPrayer.name}`;
                }
                return '';
              })()}
            </div>
          </div>

          <CitySearch
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            currentColor={getTimeBasedColors()}
          />

          {selectedCity && (
            <div className="mt-12">
              <div className="grid md:flex md:justify-center grid-cols-3 md:grid-cols-none grid-rows-2 md:grid-rows-none gap-3 rounded-lg bg-white/25 backdrop-blur-sm px-6 py-4 max-w-2xl mx-auto">
                {prayerTimes.map((prayer) => (
                  <PrayerTimeDisplay key={prayer.name} prayer={prayer} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}


