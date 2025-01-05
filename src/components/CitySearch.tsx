import { Fragment, useState } from 'react'
import { Combobox, Transition, Dialog } from '@headlessui/react'
import { type City } from '@/utils/types'
import useSWR from 'swr'
import { searchCities } from '@/utils/api'
import * as Flags from 'country-flag-icons/react/3x2'
import { countryMapping } from '@/utils/countryMapping'
import { useDebounce } from '@/hooks/useDebounce'

type FlagComponents = {
  [key: string]: React.ComponentType;
};

interface CitySearchProps {
  selectedCity: City | null;
  onCityChange: (city: City) => void;
  isOpen: boolean;
  onClose: () => void;
  currentColor: string;
}

function generateUniqueId(city: City): string {
  return `${city.name}-${city.country}-${city.lat}-${city.lng}`;
}

export default function CitySearch({ 
  selectedCity, 
  onCityChange,
  isOpen,
  onClose,
  currentColor
}: CitySearchProps) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const { data: cities = [], error, isLoading } = useSWR(
    debouncedQuery.length >= 2 ? debouncedQuery : null,
    searchCities
  );

  const handleSelect = (city: City) => {
    if (city) {
      onCityChange(city);
      onClose();
      setQuery('');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md w-full rounded bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-medium mb-1 text-center">
            Search City
          </Dialog.Title>
          <div className="text-sm text-gray-500 mb-4 text-center">
            Type at least 2 characters to search
          </div>
          <Combobox value={selectedCity} onChange={handleSelect}>
            <div className="relative">
              <Combobox.Input
                className={`w-full px-4 py-3 text-xl text-center border-b-2 
                  focus:ring-0 focus:outline-none bg-transparent transition-colors
                  border-${currentColor.replace('bg-', '')}`}
                displayValue={(city: City) => city ? `${city.name}, ${city.country}` : ''}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Type to search city..."
                autoComplete="off"
                autoFocus
              />

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                show={true}
              >
                <Combobox.Options 
                  className="absolute mt-2 w-full max-h-60 overflow-auto bg-white 
                    border border-gray-100 shadow-lg rounded-md"
                  static
                >
                  {error ? (
                    <div className="p-4 text-center text-red-500">
                      {error}
                    </div>
                  ) : isLoading ? (
                    <div className="p-4 text-center text-gray-500">
                      Searching...
                    </div>
                  ) : debouncedQuery.length < 2 ? (
                    <div className="p-4 text-center text-gray-500">
                      Start typing to search...
                    </div>
                  ) : cities.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No cities found
                    </div>
                  ) : (
                    cities.map((city, index) => (
                      <Combobox.Option
                        key={`${generateUniqueId(city)}-${index}`}
                        className={({ active }) =>
                          `px-4 py-3 cursor-pointer transition-colors ${
                            active ? 'bg-gray-100' : ''
                          }`
                        }
                        value={city}
                      >
                        <div className="flex items-center justify-center gap-3 text-gray-700">
                          {(() => {
                            const code = countryMapping[city.country];
                            const FlagComponent = code ? (Flags as FlagComponents)[code] : null;
                            return FlagComponent ? (
                              <div className="w-6 h-4">
                                <FlagComponent />
                              </div>
                            ) : null;
                          })()}
                          {city.name}, {city.country}
                        </div>
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 