import React, { useState, useEffect } from 'react';
import { Modal, Button, Descriptions, Spin } from 'antd';
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
  const [loading, setLoading] = useState(true); // Loading state

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plant/getDetails/${selectedItem}`
        );
        const data = await response.json();
        setPlantData(data);
      } catch (error) {
        console.error('Error fetching options:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [selectedItem]);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto pl-4 pr-4 mt-2 text-sm">
        <div className="flex items-center space-x-4 pb-6   justify-end pr-2 pt-5">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500"></div>
            <span className="text-gray-500">Planting period</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-800"></div>
            <span className="text-gray-500">Harvesting period</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[linear-gradient(to_right,#22c55e_50%,#1f2937_50%)]"></div>
            <span className="text-gray-500">Planting & Harvesting period</span>
          </div>
        </div>
        <div className="overflow-auto rounded-lg shadow-lg">
          <table className=" w-full min-w-[800px] gap-5 bg-gray-100 rounded-lg">
            <thead>
              <tr className="text-black text-xs md:text-sm">
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
                <td className="border p-2 flex items-center w-40 border-none">
                  <div>
                    <span className=" text-midClamp font-bold text-gray-800">
                      {plantData?.data?.name}
                    </span>
                    <br />
                    <Button
                      type="link"
                      onClick={showModal}
                      className="text-blue-500 text-[15px] font-medium border-none"
                    >
                      <InfoCircleFilled /> Crop info
                    </Button>
                  </div>
                </td>
                {months.map((_, index) => {
                  let bgStyle = {};
                  const isSeeding =
                    seedingStart.month <= seedingEnd.month
                      ? index >= seedingStart.month && index <= seedingEnd.month
                      : index >= seedingStart.month ||
                        index <= seedingEnd.month;

                  const isHarvesting =
                    harvestingStart.month <= harvestingEnd.month
                      ? index >= harvestingStart.month &&
                        index <= harvestingEnd.month
                      : index >= harvestingStart.month ||
                        index <= harvestingEnd.month;

                  if (isSeeding && isHarvesting) {
                    bgStyle = {
                      background:
                        'linear-gradient(to right, #22c55e 50%, #374151 50%)',
                    };
                  } else if (isSeeding) {
                    bgStyle = { backgroundColor: '#22c55e' };
                  } else if (isHarvesting) {
                    bgStyle = { backgroundColor: '#374151' };
                  }

                  return (
                    <td
                      key={index}
                      className="border p-2 w-[40px] h-10"
                      style={bgStyle}
                    ></td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {isModalVisible && plantData && (
          <Modal
            title={`${plantData?.data?.name} - Crop Information`}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={false}
            centered
          >
            <Descriptions bordered column={1} className="p-4">
              {plantData?.data?.seeding_months?.start &&
                plantData?.data?.seeding_months?.end && (
                  <Descriptions.Item
                    className="capitalize"
                    label={<strong>Seeding Period</strong>}
                  >
                    {plantData?.data?.seeding_months?.start} -{' '}
                    {plantData?.data?.seeding_months?.end}
                  </Descriptions.Item>
                )}
              {plantData?.data?.harvest_months?.start &&
                plantData?.data?.harvest_months?.end && (
                  <Descriptions.Item
                    className="capitalize"
                    label={<strong>Harvesting Period</strong>}
                  >
                    {plantData?.data?.harvest_months?.start} -{' '}
                    {plantData?.data?.harvest_months?.end}
                  </Descriptions.Item>
                )}
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
    </div>
  );
};

export default CropCalendar;
