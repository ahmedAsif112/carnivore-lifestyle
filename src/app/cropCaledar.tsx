import React from 'react';

const CropCalendar = () => {
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
                <span className="font-semibold text-gray-800">Barley</span>
                <br />
                <a href="#" className="text-blue-500 text-sm">
                  ℹ Crop info
                </a>
              </div>
            </td>
            {Array(12)
              .fill('')
              .map((_, index) => (
                <td
                  key={index}
                  className={`border p-2 ${
                    [4, 5].includes(index) ? 'bg-gray-700' : ''
                  } ${[10, 11].includes(index) ? 'bg-green-500' : ''}`}
                ></td>
              ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CropCalendar;
