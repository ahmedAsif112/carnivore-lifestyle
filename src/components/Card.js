'use client';
import { useState } from 'react';
import { Card } from 'antd';
import { WiDaySunny, WiRain, WiThunderstorm } from 'react-icons/wi';

const WeatherCard = () => {
  // Dummy weather data
  const [weather, setWeather] = useState({
    temperature: 24, // Temperature in °C
    humidity: 60, // Humidity in %
    isRaining: true, // Rain status
    isStorm: true, // Storm status
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card
        title="Current Weather"
        className=" shadow-lg rounded-lg text-center p-4"
        bordered={false}
      >
        {/* Weather Icon */}
        <div className="text-6xl mb-4 flex justify-center">
          {weather.isStorm ? (
            <WiThunderstorm className="text-red-500" />
          ) : weather.isRaining ? (
            <WiRain className="text-blue-500" />
          ) : (
            <WiDaySunny className="text-yellow-500" />
          )}
        </div>

        {/* Temperature */}
        <p className="text-lg font-medium">
          🌡 Temperature: <span className="font-semibold">{weather.temperature}°C</span>
        </p>

        {/* Humidity */}
        <p className="text-lg font-medium">
          💧 Humidity: <span className="font-semibold">{weather.humidity}%</span>
        </p>

        {/* Rain Status */}
        <p className="text-lg font-medium">
          ☔ Rain Status:{" "}
          <span className={`font-semibold ${weather.isRaining ? "text-blue-600" : "text-green-600"}`}>
            {weather.isRaining ? "Yes, it's raining" : "No, it's clear"}
          </span>
        </p>

        {/* Storm Status */}
        <p className="text-lg font-medium">
          ⚡ Storm Status:{" "}
          <span className={`font-semibold ${weather.isStorm ? "text-red-600" : "text-green-600"}`}>
            {weather.isStorm ? "Yes, stormy weather" : "No storm"}
          </span>
        </p>
      </Card>
    </div>
  );
};

export default WeatherCard;
