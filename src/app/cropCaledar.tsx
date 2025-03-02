import React, { useState, useEffect } from 'react';
import { Modal, Button, Descriptions } from 'antd';

interface PlantData {
  data: {
    name: string;
    status: string;
    companion?: {
      good?: string[];
      bad?: string[];
    };
    type?: string;
    light: string;
    water: string;
    required_soil_type: string;
    growing_environment: string[];
    season: string[];
  };
}

const CropCalendar = ({ selectedItem }: { selectedItem: string }) => {
  const [plantData, setPlantData] = useState<PlantData | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plant/getDetails/${selectedItem}`
        );
        const data = await response.json();
        setPlantData(data);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [selectedItem]);

  return (
    <div className="overflow-x-auto pl-4 pr-4 mt-2">
      <table className="min-w-full border-collapse border bg-[rgb(241,241,241)] border-gray-300">
        <thead>
          <tr className=" text-black">
            <th className="border p-2 w-40 text-left">Crop</th>
            {[
              'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December',
            ].map((month) => (
              <th key={month} className="border p-2 text-center">
                {month}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2 flex items-center">
              <div>
                <span className="font-semibold text-gray-800">`${plantData?.data?.name}</span>
                <br />
                <Button type="link" onClick={showModal} className="text-blue-500 text-[15px] font-medium ">
                   Crop info
                </Button>
              </div>
            </td>
            {Array(12).fill('').map((_, index) => (
              <td
                key={index}
                className={`border p-2 ${[4, 5].includes(index) ? 'bg-gray-700' : ''} ${[10, 11].includes(index) ? 'bg-green-500' : ''}`}
              ></td>
            ))}
          </tr>
        </tbody>
      </table>
      {isModalVisible && plantData && (
        <Modal
          title={`${plantData?.data?.name} - Crop Information`}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={false}
          centered
        >
          <Descriptions bordered column={1} className="p-4">
            <Descriptions.Item
              className="capitalize"
              label={<strong>Status</strong>}
            >
              {plantData?.data?.status}
            </Descriptions.Item>
            <Descriptions.Item
              className="capitalize"
              label={<strong>Companion Good</strong>}
            >
              {plantData?.data?.companion?.good?.join(', ')}
            </Descriptions.Item>
            <Descriptions.Item
              className="capitalize"
              label={<strong>Companion Bad</strong>}
            >
              {plantData?.data?.companion?.bad?.join(', ')}
            </Descriptions.Item>
            <Descriptions.Item
              className="capitalize"
              label={<strong>Type</strong>}
            >
              {plantData?.data?.type}
            </Descriptions.Item>
            <Descriptions.Item
              className="capitalize"
              label={<strong>Light</strong>}
            >
              {plantData?.data?.light}
            </Descriptions.Item>
            <Descriptions.Item
              className="capitalize"
              label={<strong>Water</strong>}
            >
              {plantData?.data?.water}
            </Descriptions.Item>
            <Descriptions.Item
              className="capitalize"
              label={<strong>Season</strong>}
            >
              {plantData?.data?.season?.join(', ')}
            </Descriptions.Item>
            <Descriptions.Item
              className="capitalize"
              label={<strong>Growing Environment</strong>}
            >
              {plantData?.data?.growing_environment?.join(', ')}
            </Descriptions.Item>
            <Descriptions.Item
              className="capitalize"
              label={<strong>Soil Type</strong>}
            >
              {plantData?.data?.required_soil_type}
            </Descriptions.Item>
          </Descriptions>
        </Modal>
      )}
    </div>
  );
};

export default CropCalendar;