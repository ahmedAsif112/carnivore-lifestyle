import React, { useState, useEffect } from 'react';
import { Modal, Button, Descriptions } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import moment from 'moment-timezone';

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
    seeding_months?: {
      start: string;
      end: string;
    };
    harvest_months?: {
      start: string;
      end: string;
    };
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

  console.log('plantData', plantData);

  const getMonthAndDay = (dateString: string) => {
    const date = moment(dateString, 'DD-MM-YYYY');
    return { month: date.month(), day: date.date() }; // Extract month (0-based) and day
  };

  const seedingStart = getMonthAndDay(
    plantData?.data?.seeding_months?.start || ''
  );
  const seedingEnd = getMonthAndDay(plantData?.data?.seeding_months?.end || '');
  const harvestingStart = getMonthAndDay(
    plantData?.data?.harvest_months?.start || ''
  );
  const harvestingEnd = getMonthAndDay(
    plantData?.data?.harvest_months?.end || ''
  );

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div className="overflow-x-auto pl-4 pr-4 mt-2">
      <table className="min-w-full border-collapse border bg-[rgb(241,241,241)] border-gray-300">
        <thead>
          <tr className="text-black">
            <th className="border p-2 w-40 text-left">Crop</th>
            {months.map((month) => (
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
                <span className="font-semibold text-gray-800">
                  {plantData?.data?.name}
                </span>
                <br />
                <Button
                  type="link"
                  onClick={showModal}
                  className="text-blue-500 text-[15px] font-medium"
                >
                  <InfoCircleFilled /> Crop info
                </Button>
              </div>
            </td>
            {months.map((_, index) => {
              // Seeding Period Highlighting
              let seedingClass = '';
              if (index >= seedingStart.month && index <= seedingEnd.month) {
                if (index === seedingStart.month && seedingStart.day > 15) {
                  seedingClass = 'bg-green-500/50'; // Second half
                } else if (index === seedingEnd.month && seedingEnd.day < 15) {
                  seedingClass = 'bg-green-500/50'; // First half
                } else {
                  seedingClass = 'bg-green-500'; // Full month
                }
              }

              // Harvesting Period Highlighting
              let harvestingClass = '';
              if (
                index >= harvestingStart.month &&
                index <= harvestingEnd.month
              ) {
                if (
                  index === harvestingStart.month &&
                  harvestingStart.day > 15
                ) {
                  harvestingClass = 'bg-gray-700/50'; // Second half
                } else if (
                  index === harvestingEnd.month &&
                  harvestingEnd.day < 15
                ) {
                  harvestingClass = 'bg-gray-700/50'; // First half
                } else {
                  harvestingClass = 'bg-gray-700'; // Full month
                }
              }

              return (
                <td
                  key={index}
                  className={`border p-2 ${seedingClass} ${harvestingClass}`}
                ></td>
              );
            })}
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
            {plantData?.data?.companion?.good?.length ? (
              <Descriptions.Item
                className="capitalize"
                label={<strong>Companion Good</strong>}
              >
                {plantData?.data?.companion?.good?.join(', ')}
              </Descriptions.Item>
            ) : null}
            {plantData?.data?.companion?.bad?.length ? (
              <Descriptions.Item
                className="capitalize"
                label={<strong>Companion Bad</strong>}
              >
                {plantData.data.companion.bad.join(', ')}
              </Descriptions.Item>
            ) : null}
            <Descriptions.Item
              className="capitalize"
              label={<strong>Type</strong>}
            >
              {plantData?.data?.type
                ?.replace(/_/g, ' ')
                ?.replace(/\b\w/g, (char) => char?.toUpperCase())}
            </Descriptions.Item>
            <Descriptions.Item
              className="capitalize"
              label={<strong>Light</strong>}
            >
              {plantData?.data?.light
                ?.replace(/_/g, ' ')
                ?.replace(/\b\w/g, (char) => char?.toUpperCase())}
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
