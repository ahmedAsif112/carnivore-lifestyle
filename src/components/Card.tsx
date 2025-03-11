'use client';
import { Card, Empty, Row, Col } from 'antd';
import {
  WiDaySunny,
  WiRain,
  WiThunderstorm,
  WiCloudy,
  WiSnow,
  WiStrongWind,
  WiHumidity,
  WiThermometerExterior,
  WiThermometer,
} from 'react-icons/wi';
import moment from 'moment';

interface WeatherData {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
  };
  wind_speed: number;
  humidity: number;
  rain?: number;
  snow?: number;
  weather: {
    main: string;
    description: string;
  }[];
}

const WeatherForecast = ({ data }: { data: WeatherData[] }) => {
  // Filter only days with Rain or Storm
  const filteredData = data?.filter((day) =>
    day?.weather?.some(
      (w: { main: string }) => w?.main === 'Rain' || w?.main === 'Storm'
    )
  );

  // If no rain or storm, show Empty
  if (filteredData?.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <Empty description="No Rain or Storm Expected" />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-4 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-4">
        Upcoming Rain & Storm Forecast
      </h2>
      <Row gutter={[16, 16]}>
        {filteredData?.map((day, index) => {
          const date = moment?.unix(day?.dt).format('ddd, MMM D');
          const temperatureCelsius = (day?.temp?.day - 273.15)?.toFixed(1);
          const minTemp = (day?.temp?.min - 273.15)?.toFixed(1);
          const maxTemp = (day?.temp?.max - 273.15)?.toFixed(1);
          const windSpeed = day?.wind_speed;
          const humidity = day?.humidity;
          const rain = day?.rain || 0;
          const snow = day?.snow || 0;
          const weatherCondition = day?.weather?.[0]?.main || 'Clear';
          const weatherDescription =
            day?.weather?.[0]?.description || 'No description';

          // Determine weather icon
          let WeatherIcon = WiDaySunny;
          if (weatherCondition?.toLowerCase()?.includes('rain'))
            WeatherIcon = WiRain;
          else if (weatherCondition?.toLowerCase()?.includes('thunderstorm'))
            WeatherIcon = WiThunderstorm;
          else if (weatherCondition?.toLowerCase()?.includes('snow'))
            WeatherIcon = WiSnow;
          else if (weatherCondition?.toLowerCase()?.includes('cloud'))
            WeatherIcon = WiCloudy;

          return (
            <Col xs={24} sm={12} md={12} lg={8} xl={6} key={index}>
              <Card
                className="shadow-md rounded-lg text-center p-4"
                bordered={false}
              >
                {/* Date */}
                <p className="text-lg font-semibold">{date}</p>

                {/* Weather Icon & Description */}
                <div className="flex flex-col items-center my-2">
                  <WeatherIcon className="text-5xl text-blue-500" />
                  <p className="text-md font-medium">{weatherDescription}</p>
                </div>

                {/* Temperature Details */}
                <div className="text-left text-sm space-y-1">
                  <p className="flex items-center">
                    <WiThermometer className="mr-1 text-red-500" />
                    <strong>Temp:</strong> {temperatureCelsius}°C
                  </p>
                  <p className="flex items-center">
                    <WiThermometerExterior className="mr-1 text-blue-500" />
                    <strong>Min Temp:</strong> {minTemp}°C
                  </p>
                  <p className="flex items-center">
                    <WiThermometer className="mr-1 text-orange-500" />
                    <strong>Max Temp:</strong> {maxTemp}°C
                  </p>
                  <p className="flex items-center">
                    <WiStrongWind className="mr-1 text-gray-500" />
                    <strong>Wind:</strong> {windSpeed} m/s
                  </p>
                  <p className="flex items-center">
                    <WiHumidity className="mr-1 text-blue-400" />
                    <strong>Humidity:</strong> {humidity}%
                  </p>
                  {rain > 0 && (
                    <p className="flex items-center">
                      <WiRain className="mr-1 text-blue-700" />
                      <strong>Rain:</strong> {rain} mm
                    </p>
                  )}
                  {snow > 0 && (
                    <p className="flex items-center">
                      <WiSnow className="mr-1 text-gray-300" />
                      <strong>Snow:</strong> {snow} mm
                    </p>
                  )}
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default WeatherForecast;
