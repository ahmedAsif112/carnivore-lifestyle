'use client';
import { useEffect, useState } from 'react';
import { Select, Button, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CropCalendar from './cropCaledar';

const SelectorWithApi = () => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [selectedItem, setSelectedItem] = useState<string>();
  const [tempSelectedItem, setTempSelectedItem] = useState<string>(); // Temporary selection

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

  const handleSelectChange = (value: string) => {
    setTempSelectedItem(value); // Store the selection temporarily
  };

  const handleSearchClick = () => {
    setSelectedItem(tempSelectedItem); // Update the actual selected item on search click
  };

  return (
    <div className="w-full py-4 px-2">
      <div className="flex flex-wrap justify-center items-center bg-white shadow-md rounded-lg p-4 space-x-3 md:space-x-4">
        {/* Icon */}
        <div>
          <span className="text-gray-600 text-2xl">🌱</span>
        </div>

        {/* Select Dropdown */}
        <div className="w-full sm:w-auto">
          <Select
            placeholder="Select Plants"
            value={tempSelectedItem} // Show temp selection
            onChange={handleSelectChange}
            className="w-full sm:w-60 h-[30px]"
            showSearch
            allowClear
            options={options}
            filterOption={(input, option) =>
              option ? option.label.toLowerCase().includes(input.toLowerCase()) : false
            }
          />
        </div>

        {/* Search Button */}
        <div className="w-full sm:w-auto flex justify-center">
          <Button
            type="primary"
            className="bg-green-500 hover:bg-green-600 text-white flex items-center justify-center h-[30px] w-full sm:w-auto"
            onClick={handleSearchClick} // Update selected item on button click
          >
            <SearchOutlined className="mr-1" /> Search
          </Button>
        </div>
      </div>

      {/* Display selected plant info */}
      {selectedItem ? (
        <CropCalendar selectedItem={selectedItem} />
      ) : (
        <div className="min-h-[80vh] flex justify-center items-center w-full">
          <Empty />
        </div>
      )}
    </div>
  );
};

export default SelectorWithApi;
