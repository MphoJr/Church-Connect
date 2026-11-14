import { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import AdminLayout from "../../layouts/AdminLayout";

import { getPastorAppointments } from "../../services/appointmentService";

function Calendar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const response = await getPastorAppointments(user.id);

      const calendarEvents = response.data.map((appointment) => ({
        id: appointment.id,

        title: appointment.meetingType,

        start: `${appointment.preferredDate}T${appointment.preferredTime}`,

        extendedProps: {
          fullName: appointment.fullName,
          phone: appointment.phone,
          message: appointment.message,
        },
      }));

      setEvents(calendarEvents);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEventClick = (info) => {
    alert(
      `
Member: ${info.event.extendedProps.fullName}

Phone: ${info.event.extendedProps.phone}

Meeting: ${info.event.title}

Notes:
${info.event.extendedProps.message}
      `,
    );
  };

  return (
    <AdminLayout>
      <div className="calendar-page">
        <h1>Pastor Calendar</h1>

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="80vh"
          events={events}
          eventClick={handleEventClick}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
        />
      </div>
    </AdminLayout>
  );
}

export default Calendar;
