'use client';
import { useEffect, useState } from 'react';
import { Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CropCalendar from './cropCaledar';

const SelectorWithApi = () => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [selectedItem, setSelectedItem] = useState<string>();

  useEffect(() => {
    const fetchOptions = async () => {
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
        setOptions(formattedOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (value: string) => {
    setSelectedItem(value);
  };

  return (
    <div className="w-full py-4">
      <div className="flex justify-center h-full bg-white shadow-md rounded-lg px-4 py-2 space-x-3">
        {/* Icon */}
        <div>
          <span className="text-gray-600 text-2xl">🌱</span>
        </div>

        {/* Select Dropdown */}
        <div>
          <Select
            placeholder="Select Plants"
            value={selectedItem}
            onChange={handleChange}
            className="w-60 h-[30px]"
            showSearch
            allowClear
            options={options} // Directly passing options
            filterOption={(input, option) =>
              option
                ? option.label.toLowerCase().includes(input.toLowerCase())
                : false
            }
          />
        </div>

        {/* Search Button */}
        <div>
          <Button
            type="primary"
            className="bg-green-500 hover:bg-green-600 text-white flex items-center h-[30px]"
          >
            <SearchOutlined className="mr-1" /> Search
          </Button>
        </div>
      </div>
      <CropCalendar />
    </div>
  );
};

export default SelectorWithApi;
