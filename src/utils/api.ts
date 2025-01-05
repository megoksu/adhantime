import { City } from './types';

// Cache for storing previous search results
const searchCache = new Map<string, { data: City[], timestamp: number }>();
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

// Common cities to show when search is empty
const commonCities: City[] = [
  { name: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784 },
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278 },
  { name: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060 },
  { name: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708 },
  { name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503 },
  { name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522 },
  { name: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050 },
  { name: 'Moscow', country: 'Russia', lat: 55.7558, lng: 37.6173 },
];

export async function searchCities(query: string): Promise<City[]> {
  if (!query || query.length < 2) {
    return commonCities;
  }

  // Check cache first
  const cacheKey = query.toLowerCase();
  const cached = searchCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${encodeURIComponent(query)}&limit=10&sort=-population`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      }
    );

    if (response.status === 429) {
      // If rate limited, return filtered common cities
      return filterCommonCities(query);
    }

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data || !data.data || !Array.isArray(data.data)) {
      return [];
    }

    const cities = data.data.map((city: { city: string; country: string; latitude: number; longitude: number }) => ({
      name: city.city,
      country: city.country,
      lat: city.latitude,
      lng: city.longitude
    }));

    // Cache the results
    searchCache.set(cacheKey, { data: cities, timestamp: Date.now() });

    return cities;
  } catch (error) {
    console.error('Error searching cities:', error);
    // Return filtered common cities on error
    return filterCommonCities(query);
  }
}

function filterCommonCities(query: string): City[] {
  const lowercaseQuery = query.toLowerCase();
  return commonCities.filter(city => 
    city.name.toLowerCase().includes(lowercaseQuery) ||
    city.country.toLowerCase().includes(lowercaseQuery)
  );
} 