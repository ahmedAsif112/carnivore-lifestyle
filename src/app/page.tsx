'use client';
import { useState } from 'react';
import { Modal, Descriptions } from 'antd';

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

// Slots with multiple months assigned
const initialSlots = [
  { id: 1, time: '10 AM', months: ['January', 'February'] }, // Shared between Jan & Feb
  { id: 2, time: '2 PM', months: ['March'] },
  { id: 3, time: '9 AM', months: ['March', 'April'] }, // Shared between Mar & Apr
  { id: 4, time: '1 PM', months: ['May'] },
  { id: 5, time: '5 PM', months: ['June', 'July'] }, // Shared between Jun & Jul
  { id: 6, time: '8 AM', months: ['September'] },
  { id: 7, time: '10 AM', months: ['October'] },
  { id: 8, time: '4 PM', months: ['December'] },
];

const CalendarYearlyView = () => {
  const [slots] = useState(initialSlots);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<{
    id: number;
    time: string;
    months: string[];
  } | null>(null);

  const handleSlotClick = (
    month: string,
    slot: { id: number; time: string; months: string[] }
  ) => {
    setSelectedMonth(month);
    setSelectedSlot(slot);
    setOpenModal(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-center mb-6">
        Yearly Calendar View
      </h2>

      {/* 12-Box Grid Layout */}
      <div className="grid grid-cols-3 gap-4">
        {months.map((month) => (
          <div
            key={month}
            className="border p-4 rounded-lg shadow-md bg-gray-100"
          >
            <h3 className="text-lg font-semibold text-center mb-2">{month}</h3>
            <div className="flex flex-col gap-2">
              {slots.filter((slot) => slot.months.includes(month)).length >
              0 ? (
                slots
                  .filter((slot) => slot.months.includes(month))
                  .map((slot) => (
                    <button
                      key={slot.id}
                      className="bg-blue-500 text-white text-sm py-1 px-3 rounded-md hover:bg-blue-600"
                      onClick={() => handleSlotClick(month, slot)}
                    >
                      {slot.time}
                    </button>
                  ))
              ) : (
                <p className="text-gray-500 text-sm text-center">No slots</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Slot Details Modal */}
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        title="Slot Details"
        footer={null}
      >
        {selectedSlot && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Slot Time">
              {selectedSlot.time}
            </Descriptions.Item>
            <Descriptions.Item label="Assigned Months">
              {selectedSlot.months.join(', ')}
            </Descriptions.Item>
            <Descriptions.Item label="Clicked Month">
              {selectedMonth}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default CalendarYearlyView;
