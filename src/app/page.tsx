'use client';
import { useEffect, useState } from 'react';
import { Select, Button, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CropCalendar from '../components/cropCaledar';

const SelectorWithApi = () => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
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
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
      

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Select Your Plant</h2>

        <div className="space-y-4">
          {/* First Select Dropdown */}
          <Select
            placeholder="Select a Plant"
            value={tempSelectedItem}
            onChange={handleSelectChange}
            className="w-full h-11 rounded-md shadow-md"
            showSearch
            allowClear
            options={options}
            filterOption={(input, option) =>
              option ? option.label.toLowerCase().includes(input.toLowerCase()) : false
            }
          />

          {/* Second Select Dropdown */}
          <Select
            placeholder="Select Another Plant"
            value={tempSelectedItem}
            onChange={handleSelectChange}
            className="w-full h-11 rounded-md shadow-md"
            showSearch
            allowClear
            options={options}
            filterOption={(input, option) =>
              option ? option.label.toLowerCase().includes(input.toLowerCase()) : false
            }
          />

          {/* Search Button */}
          <Button
            type="primary"
            className="w-full bg-green-500 hover:bg-green-600 transition-all duration-300 text-white font-medium py-2 flex items-center justify-center rounded-md shadow-md"
            onClick={handleSearchClick}
          >
            <SearchOutlined className="mr-2" /> Search
          </Button>
        </div>
      </div>

      {/* Display selected plant info */}
      {selectedItem ? (
        <CropCalendar selectedItem={selectedItem} />
      ) : (
        <div className="min-h-[60vh] flex justify-center items-center w-full">
          <Empty />
        </div>
      )}
    </div>
  );
};

export default SelectorWithApi;
