import React, { useRef, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import esLocale from '@fullcalendar/core/locales/es';
import './Calendar.scss';

function Calendar({
  view, googleCalendarApiKey, googleCalendarId, titulo, darkMode = false,
}) {
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

  const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <>
      <span className="text-xl mt-14" style={{ fontFamily: 'Circular Std Black' }}>
        {titulo}
      </span>
      <div className={`calendar mb-14 ${darkMode ? 'dark' : ''}`}>
        <FullCalendar
          timeZone={browserTimeZone}
          locale={esLocale}
          plugins={[dayGridPlugin, interactionPlugin, googleCalendarPlugin]}
          height="auto"
          ref={calendarRef}
          initialView={view}
          googleCalendarApiKey={googleCalendarApiKey}
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
            googleCalendarId,
            className: 'gcal-event',
          }}
        />
      </div>
    </>

  );
}

export default memo(Calendar);
