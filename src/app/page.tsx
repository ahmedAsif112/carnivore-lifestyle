/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, Button, Select, Radio, Input, Descriptions } from 'antd';

const { Option } = Select;

const CalenderMain = () => {
  const [calendarEvents, setCalendarEvents] = useState<any>([]);
  const [filteredEvents, setFilteredEvents] = useState<any>([]);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openViewEvent, setOpenViewEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [filters, setFilters] = useState({
    plant: '',
    location: '',
    environment: '',
  });

  useEffect(() => {
    // Define default slots
    const events = [
      {
        title: 'Spring Planting',
        start: '2025-03-15',
        location: 'Farm A',
        environment: 'Glasshouse',
        details: 'Prepare soil for planting new crops',
      },
      {
        title: 'Summer Growth',
        start: '2025-06-10',
        location: 'Farm B',
        environment: 'Outdoor',
        details: 'Monitor plant growth and fertilize as needed',
      },
      {
        title: 'Harvest Time',
        start: '2025-09-25',
        location: 'Farm C',
        environment: 'Glasshouse',
        details: 'Harvest crops and prepare for next planting',
      },
      {
        title: 'Winter Care',
        start: '2025-12-05',
        location: 'Farm D',
        environment: 'Outdoor',
        details: 'Protect plants from frost and prune as necessary',
      },
    ];
    setCalendarEvents(events);
    setFilteredEvents(events);
  }, []);

  const applyFilters = () => {
    let filtered = calendarEvents;

    if (filters.plant) {
      filtered = filtered.filter((event: any) =>
        event.title.includes(filters.plant)
      );
    }
    if (filters.location) {
      filtered = filtered.filter(
        (event: any) => event.location === filters.location
      );
    }
    if (filters.environment) {
      filtered = filtered.filter(
        (event: any) => event.environment === filters.environment
      );
    }

    setFilteredEvents(filtered);
    setOpenFilterModal(false);
  };

  const handleEventClick = (info: any) => {
    setSelectedEvent(info.event.extendedProps);
    setOpenViewEvent(true);
  };

  return (
    <div>
      {/* Filters Button */}
      <div className="flex justify-between mb-4">
        <Button type="primary" onClick={() => setOpenFilterModal(true)}>
          Open Filters
        </Button>
      </div>

      {/* FullCalendar Component */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="multiMonthYear"
        events={filteredEvents.map((event: any) => ({
          ...event,
          extendedProps: event, // Pass all event details
        }))}
        height={'auto'}
        selectable={false} // Disable interaction
        editable={false} // Prevent modifications
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'multiMonthYear',
        }}
        views={{
          multiMonthYear: {
            type: 'dayGrid',
            duration: { months: 12 },
            buttonText: 'Year',
          },
        }}
        eventContent={renderEventContent}
        eventClick={handleEventClick} // Open event details modal on click
      />

      {/* Filter Modal */}
      <Modal
        open={openFilterModal}
        onCancel={() => setOpenFilterModal(false)}
        onOk={applyFilters}
        title="Filter Events"
      >
        <div className="flex flex-col gap-4">
          {/* Plant Filter */}
          <Select
            placeholder="Filter by Plant"
            onChange={(value) => setFilters({ ...filters, plant: value })}
            className="w-full"
            allowClear
          >
            <Option value="Spring Planting">Spring Planting</Option>
            <Option value="Summer Growth">Summer Growth</Option>
            <Option value="Harvest Time">Harvest Time</Option>
            <Option value="Winter Care">Winter Care</Option>
          </Select>

          {/* Location Filter */}
          <Input
            placeholder="Filter by Location"
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
            className="w-full"
          />

          {/* Environment Filter */}
          <Radio.Group
            onChange={(e) =>
              setFilters({ ...filters, environment: e.target.value })
            }
            className="w-full flex flex-col gap-2"
          >
            <p className="font-normal">Environment</p>
            <Radio value="Glasshouse">Glasshouse</Radio>
            <Radio value="Outdoor">Outdoor</Radio>
          </Radio.Group>
        </div>
      </Modal>

      {/* Event Details Modal */}
      <Modal
        open={openViewEvent}
        onCancel={() => setOpenViewEvent(false)}
        title="Event Details"
        footer={null}
      >
        {selectedEvent && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Plant">
              {selectedEvent.title}
            </Descriptions.Item>
            <Descriptions.Item label="Location">
              {selectedEvent.location}
            </Descriptions.Item>
            <Descriptions.Item label="Start">
              {new Date(selectedEvent.start).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Environment">
              {selectedEvent.environment}
            </Descriptions.Item>
            <Descriptions.Item label="Details">
              {selectedEvent.details}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b> <i>{eventInfo.event.title}</i>
    </>
  );
}

export default CalenderMain;
