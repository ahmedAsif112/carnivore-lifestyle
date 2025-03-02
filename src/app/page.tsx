'use client';
import { useEffect, useState } from 'react';
import { Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CropCalendar from './cropCaledar';

const { Option } = Select;

const SelectorWithApi = () => {
  const [options, setOptions] = useState<{ id: string; name: string }[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>('');

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plant/getAll`
        ); // Replace with your actual API endpoint
        const data = await response.json();
        setOptions(data?.data);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (values: string) => {
    setSelectedItem(values);
  };

  return (
    <div className="w-full py-4">
      <div className=" flex justify-center h-full bg-white  shadow-md rounded-lg px-4 py-2 space-x-3">
        {/* Icon */}
        <div>
          <span className="text-gray-600 text-2xl">🌱</span>
        </div>

        {/* Select Dropdown */}
        <div>
          <Select
            placeholder="Select items"
            value={selectedItem}
            onChange={handleChange}
            className="w-60 h-[30px]"
          >
            {options?.map((option) => (
              <Option key={option?.id} value={option?.id}>
                {option?.name}
              </Option>
            ))}
          </Select>
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
