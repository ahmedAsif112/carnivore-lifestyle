/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Modal, Input, Typography } from 'antd';

const { Text } = Typography;

const CalenderMain = () => {
  const [allActivity, setAllActivity] = useState<any>([]);
  const [calendarEvents, setCalendarEvents] = useState<any>([]); // Local state for calendar events
  const [openAddEvent, setOpenAddEvent] = useState<any>(false); // Popup state for adding event
  const [openViewEvent, setOpenViewEvent] = useState<any>(false); // Popup state for viewing event
  const [newEvent, setNewEvent] = useState<any>({
    name: '',
    class: '',
    date: '',
  });
  const [selectedEvent, setSelectedEvent] = useState<any>(null); // Selected event details

  useEffect(() => {
    setCalendarEvents(allActivity || []);
  }, [allActivity]);

  const handleDateClick = (info: any) => {
    setNewEvent({ ...newEvent, date: info.dateStr });
    setOpenAddEvent(true); // Open popup to add event
  };

  const handleEventClick = (info: any) => {
    setSelectedEvent(info.event); // Set selected event details
    setOpenViewEvent(true); // Open popup to view event
  };

  const handleCloseAddEvent = () => {
    setOpenAddEvent(false);
    setNewEvent({ name: '', class: '', date: '' });
  };

  const handleCloseViewEvent = () => {
    setOpenViewEvent(false);
    setSelectedEvent(null);
  };

  const handleSave = () => {
    if (newEvent.name && newEvent.class && newEvent.date) {
      const eventToAdd = {
        title: `${newEvent.name} - ${newEvent.class}`,
        start: newEvent.date,
      };
      setCalendarEvents((prev: any) => [...prev, eventToAdd]); // Update local calendar events
      setAllActivity((prev: any) => [...(prev || []), eventToAdd]); // Update allActivity
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
          left: 'prev,next today',
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
        <Input
          placeholder="Name"
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
        />
        <Input
          placeholder="Class"
          value={newEvent.class}
          onChange={(e) => setNewEvent({ ...newEvent, class: e.target.value })}
        />
      </Modal>

      {/* Modal for viewing event */}
      <Modal
        open={openViewEvent}
        onCancel={handleCloseViewEvent}
        title="Event Details"
        footer={null}
      >
        {selectedEvent && (
          <>
            <Text strong>Title:</Text> {selectedEvent.title}
            <br />
            <Text strong>Start:</Text> {selectedEvent.start.toLocaleString()}
            {selectedEvent.end && (
              <>
                <br />
                <Text strong>End:</Text> {selectedEvent.end.toLocaleString()}
              </>
            )}
          </>
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
