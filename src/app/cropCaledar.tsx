import React, { useState } from 'react';
import { Modal, Button, Descriptions } from 'antd';

const CropCalendar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
                <span className="font-semibold text-gray-800">Barley</span>
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

      <Modal title="Barley - Crop Information" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Descriptions bordered column={1} className="p-4">
          <Descriptions.Item label={<strong>Growing Environment</strong>}>Outdoor</Descriptions.Item>
          <Descriptions.Item label={<strong>Soil Type</strong>}>Sandy</Descriptions.Item>
          <Descriptions.Item label={<strong>Light Requirements</strong>}>Full Sun</Descriptions.Item>
          <Descriptions.Item label={<strong>Watering Needs</strong>}>High</Descriptions.Item>
          <Descriptions.Item label={<strong>Drought Resistance</strong>}>Yes</Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
};

export default CropCalendar;