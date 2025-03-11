'use client';
import { useEffect, useState } from 'react';
import { Select, Button, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const SelectorWithApi = () => {
  const router = useRouter();

  const [plantOptions, setPlantOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedPlant, setSelectedPlant] = useState<string>();
  const [selectedCountry, setSelectedCountry] = useState<string>();

  // Static country list
  const countryOptions = [
    { value: 'pl', label: 'Warsaw, Poland' },
    { value: 'cz', label: 'Prague, Czechia' },
    { value: 'at', label: 'Vienna, Austria' },
    { value: 'be', label: 'Brussels, Belgium' },
    { value: 'fr', label: 'Paris, France' },
    { value: 'de', label: 'Berlin, Germany' },
    { value: 'es', label: 'Madrid, Spain' },
    { value: 'it', label: 'Rome, Italy' },
    { value: 'mx', label: 'Mexico City, Mexico' },
    { value: 'ru', label: 'Moscow, Russia' },
    { value: 'au', label: 'Sydney, Australia' },
    { value: 'br', label: 'São Paulo, Brazil' },
    { value: 'jp', label: 'Tokyo, Japan' },
  ];

  useEffect(() => {
    const fetchPlantOptions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plant/getAll`
        );
        const data = await response.json();
        const formattedOptions = data?.data.map(
          (item: { id: string; name: string }) => ({
            value: item.id,
            label: item.name,
          })
        );
        setPlantOptions(formattedOptions);
      } catch (error) {
        console.error('Error fetching plant options:', error);
      }
    };

    fetchPlantOptions();
  }, []);

  const handleSearchClick = () => {
    if (selectedPlant && selectedCountry) {
      router.push(`/calendar?id=${selectedPlant}&country=${selectedCountry}`);
    } else {
      message.error('Please select both a plant and a country.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mt-10 h-[300px]">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Select Your Plant & Country
        </h2>

        <div className="space-y-4">
          {/* Plant Select Dropdown */}
          <Select
            placeholder="Select a Plant"
            value={selectedPlant}
            onChange={(value) => setSelectedPlant(value)}
            className="w-full h-11 rounded-md shadow-md"
            showSearch
            allowClear
            options={plantOptions}
            filterOption={(input, option) =>
              option?.label.toLowerCase().includes(input.toLowerCase()) || false
            }
          />

          {/* Country Select Dropdown */}
          <Select
            placeholder="Select Country"
            value={selectedCountry}
            onChange={(value) => setSelectedCountry(value)}
            className="w-full h-11 rounded-md shadow-md"
            showSearch
            allowClear
            options={countryOptions}
            filterOption={(input, option) =>
              option?.label.toLowerCase().includes(input.toLowerCase()) || false
            }
          />

          {/* Search Button */}
          <Button
            type="primary"
            className="w-full bg-green-500 hover:bg-green-600 transition-all duration-300 text-white font-medium py-5 flex items-center justify-center rounded-md shadow-md"
            onClick={handleSearchClick}
          >
            <SearchOutlined className="mr-2" /> Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectorWithApi;
