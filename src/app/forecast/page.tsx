/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import WeatherCard from '@/components/Card';
import Navbar from '@/components/Navbar';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const countryCoordinates: Record<string, { lat: number; lon: number }> = {
  pl: { lat: 52.2298, lon: 21.0122 }, // Warsaw, Poland
  cz: { lat: 50.0755, lon: 14.4378 }, // Prague, Czechia
  at: { lat: 48.2082, lon: 16.3738 }, // Vienna, Austria
  be: { lat: 50.8503, lon: 4.3517 }, // Brussels, Belgium
  fr: { lat: 48.8566, lon: 2.3522 }, // Paris, France
  de: { lat: 52.52, lon: 13.405 }, // Berlin, Germany
  es: { lat: 40.4168, lon: -3.7038 }, // Madrid, Spain
  it: { lat: 41.9028, lon: 12.4964 }, // Rome, Italy
  mx: { lat: 19.4326, lon: -99.1332 }, // Mexico City, Mexico
  ru: { lat: 55.7558, lon: 37.6173 }, // Moscow, Russia
  au: { lat: -33.8688, lon: 151.2093 }, // Sydney, Australia
  br: { lat: -23.5505, lon: -46.6333 }, // São Paulo, Brazil
  jp: { lat: 35.6895, lon: 139.6917 }, // Tokyo, Japan
};

function Forecast() {
  const searchParams = useSearchParams();
  const country = searchParams.get('country');

  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    if (!country || !countryCoordinates[country]) {
      console.error('Invalid or missing country in URL.');
      return;
    }

    const { lat, lon } = countryCoordinates[country];

    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/weather/getWeatherForcast?lat=${lat}&lon=${lon}`
        );
        const data = await response.json();
        setWeatherData(data);
        console.log('Weather Data:', data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [country]);

  return (
    <div>
      <Navbar />
      <WeatherCard data={weatherData?.data?.daily} />
    </div>
  );
}

export default Forecast;
