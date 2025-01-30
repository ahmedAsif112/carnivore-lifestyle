/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Modal, Input, Radio, Select, Descriptions } from 'antd';
import { Option } from 'antd/es/mentions';

const CalenderMain = () => {
  const [allActivity, setAllActivity] = useState<any>([]);
  const [calendarEvents, setCalendarEvents] = useState<any>([]); // Local state for calendar events
  const [openAddEvent, setOpenAddEvent] = useState<any>(false); // Popup state for adding event
  const [openViewEvent, setOpenViewEvent] = useState<any>(false); // Popup state for viewing event
  const [newEvent, setNewEvent] = useState<any>({
    plant: '',
    location: '',
    environment: 'glasshouse',
    soilType: '',
    light: '',
    water: '',
    droughtResistant: 'no',
  });
  const [selectedEvent, setSelectedEvent] = useState<any>(null); // Selected event details

  useEffect(() => {
    setCalendarEvents(allActivity || []);
  }, [allActivity]);

  const handleDateClick = (info: any) => {
    const dateTime = new Date(info.date);
    dateTime.setHours(12, 0, 0); // Default to noon if no time is provided

    setNewEvent({ ...newEvent, date: dateTime.toISOString() });
    setOpenAddEvent(true);
  };

  const handleEventClick = (info: any) => {
    setSelectedEvent(info.event);
    setOpenViewEvent(true);
  };

  const handleCloseAddEvent = () => {
    setOpenAddEvent(false);
    setNewEvent({
      plant: '',
      location: '',
      environment: '',
      soilType: '',
      light: '',
      water: '',
      droughtResistant: '',
    });
  };

  const handleCloseViewEvent = () => {
    setOpenViewEvent(false);
    setSelectedEvent(null);
  };

  const handleSave = () => {
    if (
      newEvent.plant &&
      newEvent.location &&
      newEvent.droughtResistant &&
      newEvent.water &&
      newEvent.light &&
      newEvent.soilType &&
      newEvent.environment &&
      newEvent.date
    ) {
      const eventToAdd = {
        title: newEvent.plant,
        start: newEvent.date,
        location: newEvent.location,
        extendedProps: {
          droughtResistant: newEvent.droughtResistant,
          water: newEvent.water,
          light: newEvent.light,
          soilType: newEvent.soilType,
          environment: newEvent.environment,
        },
      };

      setCalendarEvents((prev: any) => [...prev, eventToAdd]);
      setAllActivity((prev: any) => [...(prev || []), eventToAdd]);
      handleCloseAddEvent();
    }
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="timeGridWeek"
        weekends={true}
        allDayContent={false}
        allDaySlot={false}
        events={calendarEvents}
        height={'auto'}
        headerToolbar={{
          left: 'prev next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }}
        eventContent={renderEventContent}
        dateClick={handleDateClick} // Handle date clicks
        eventClick={handleEventClick} // Handle event clicks
      />

      {/* Modal for adding event */}
      <Modal
        open={openAddEvent}
        onCancel={handleCloseAddEvent}
        onOk={handleSave}
        title="Add New Event"
      >
        <div className="flex flex-col gap-4">
          {/* Plant Selection */}
          <Select
            placeholder="Select Plant"
            onChange={(value) => setNewEvent({ ...newEvent, plant: value })}
            className="w-full"
          >
            <Option value="rose">Rose</Option>
            <Option value="sunflower">Sunflower</Option>
            <Option value="tulip">Tulip</Option>
          </Select>

          {/* Location Input */}
          <Input
            placeholder="Enter Location"
            onChange={(e) =>
              setNewEvent({ ...newEvent, location: e.target.value })
            }
            className="w-full"
          />

          {/* Growing Environment */}
          <Radio.Group
            onChange={(e) =>
              setNewEvent({ ...newEvent, environment: e.target.value })
            }
            className="w-full flex flex-col gap-2"
          >
            <p className="font-normal">Growing Environment</p>
            <Radio value="glasshouse">Glasshouse</Radio>
            <Radio value="outdoor">Outdoor</Radio>
          </Radio.Group>

          {/* Soil Type */}
          <Select
            placeholder="Select Soil Type"
            onChange={(value) => setNewEvent({ ...newEvent, soilType: value })}
            className="w-full"
          >
            <Option value="sandy">Sandy</Option>
            <Option value="loamy">Loamy</Option>
            <Option value="clay">Clay</Option>
          </Select>

          {/* Light Requirements */}
          <Select
            placeholder="Select Light Requirements"
            onChange={(value) => setNewEvent({ ...newEvent, light: value })}
            className="w-full"
          >
            <Option value="full-sun">Full Sun</Option>
            <Option value="partial-shade">Partial Shade</Option>
          </Select>

          {/* Watering Needs */}
          <Select
            placeholder="Select Watering Needs"
            onChange={(value) => setNewEvent({ ...newEvent, water: value })}
            className="w-full"
          >
            <Option value="low">Low</Option>
            <Option value="medium">Medium</Option>
            <Option value="high">High</Option>
          </Select>

          {/* Drought Resistance */}
          <Radio.Group
            value={newEvent.droughtResistant}
            onChange={(e) =>
              setNewEvent({ ...newEvent, droughtResistant: e.target.value })
            }
            className="w-full flex-col flex  gap-3"
          >
            <p className="font-normal">Drought Resistance</p>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </div>
      </Modal>

      {/* Modal for viewing event */}
      <Modal
        open={openViewEvent}
        onCancel={handleCloseViewEvent}
        title="Event Details"
        footer={null}
      >
        {selectedEvent && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Plant">
              {selectedEvent.title}
            </Descriptions.Item>
            <Descriptions.Item label="Location">
              {selectedEvent.extendedProps?.location}
            </Descriptions.Item>
            <Descriptions.Item label="Start">
              {selectedEvent.start.toLocaleString()}
            </Descriptions.Item>
            {selectedEvent.extendedProps && (
              <>
                <Descriptions.Item label="Drought Resistant">
                  {selectedEvent.extendedProps.droughtResistant}
                </Descriptions.Item>
                <Descriptions.Item label="Watering Needs">
                  {selectedEvent.extendedProps.water}
                </Descriptions.Item>
                <Descriptions.Item label="Light Requirements">
                  {selectedEvent.extendedProps.light}
                </Descriptions.Item>
                <Descriptions.Item label="Soil Type">
                  {selectedEvent.extendedProps.soilType}
                </Descriptions.Item>
                <Descriptions.Item label="Environment">
                  {selectedEvent.extendedProps.environment}
                </Descriptions.Item>
              </>
            )}
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default CalenderMain;
