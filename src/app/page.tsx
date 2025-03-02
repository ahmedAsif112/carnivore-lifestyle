'use client';
import { useEffect, useState } from 'react';
import { Select, Button } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const SelectorWithApi = () => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch('/api/get-sections'); // Replace with your actual API endpoint
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (values: string[]) => {
    setSelectedItems(values);
  };

  const getSelectedText = () => {
    if (selectedItems.length === 0) return 'Select items';
    if (selectedItems.length <= 2) return selectedItems.join(', ');
    return `${selectedItems.slice(0, 2).join(', ')} (+${selectedItems.length - 2} others)`;
  };

  return (
    <div className="w-full py-4">
      <div className=" flex justify-center h-full bg-white  shadow-md rounded-lg px-4 py-2 space-x-3">
        {/* Icon */}
        <div><span className="text-gray-600 text-2xl">🌱</span></div>

        {/* Select Dropdown */}
        <div >
          <Select
          mode="multiple"
          placeholder="Select items"
          value={selectedItems}
          onChange={handleChange}
          className="w-60 h-[30px] "
          dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
        >
          {options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
        </div>

        {/* Search Button */}
        <div><Button type="primary" className="bg-green-500 hover:bg-green-600 text-white flex items-center h-[30px]">
          <SearchOutlined className="mr-1" /> Search
        </Button></div>

       
      </div>

      
    </div>
  );
};

export default SelectorWithApi;
