'use client';
import React, { useEffect, useState } from 'react';

interface PlantData {
  data: {
    name: string;
  };
}

const CropCalendar = ({ selectedItem }: { selectedItem: string }) => {
  const [plantData, setPlantData] = useState<PlantData | undefined>(undefined);
  console.log('plantData', plantData);

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
    <div className="overflow-x-auto mt-2">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="border p-2 w-40 text-left">Crop</th>
            {[
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
                <span className="font-semibold text-gray-800">
                  {plantData?.data?.name}
                </span>
                <br />
                <a href="#" className="text-blue-500 text-sm">
                  ℹ Crop info
                </a>
              </div>
            </td>
            {/* {Array(12)
              .fill('')
              .map((_, index) => (
                <td
                  key={index}
                  className={`border p-2 ${
                    [4, 5].includes(index) ? 'bg-gray-700' : ''
                  } ${[10, 11].includes(index) ? 'bg-green-500' : ''}`}
                ></td>
              ))} */}

            {Array(12)
              .fill('')
              .map((_, index) => (
                <td
                  key={index}
                  className={`border p-2 ${
                    [4, 5].includes(index) ? 'bg-gray-700' : ''
                  }`}
                ></td>
              ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CropCalendar;
