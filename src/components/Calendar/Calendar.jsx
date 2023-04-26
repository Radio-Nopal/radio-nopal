import React, { useRef, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import esLocale from '@fullcalendar/core/locales/es';
import './Calendar.scss';

function Calendar({ view }) {
  const navigate = useNavigate();
  const calendarRef = useRef();

  const getApi = () => {
    const { current: calendarDom } = calendarRef;

    return calendarDom ? calendarDom.getApi() : null;
  };

  const changeView = (newView) => {
    const API = getApi();

    API?.changeView(newView);
  };

  useEffect(() => {
    changeView(view);
  }, [view]);

  return (
    <>
      <span className="text-xl" style={{ fontFamily: 'Circular Std Black' }}>
        Esta semana en Radio Nopal
      </span>
      <FullCalendar
        locale={esLocale}
        plugins={[dayGridPlugin, interactionPlugin, googleCalendarPlugin]}
        weekends={false}
        height="auto"
        ref={calendarRef}
        initialView={view}
        googleCalendarApiKey={process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
        }}
        eventClick={(arg) => {
          arg.jsEvent.preventDefault();
          if (arg.event._def.extendedProps.location) {
            navigate(`/${arg.event._def.extendedProps.location}`);
          }
        }}
        events={{
          googleCalendarId: process.env.REACT_APP_CALENDAR_ID,
          className: 'gcal-event',
        }}
      />
    </>
  );
}

export default memo(Calendar);
