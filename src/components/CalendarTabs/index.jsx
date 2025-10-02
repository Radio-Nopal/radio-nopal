import React, { useState } from 'react';
import Calendar from '../Calendar/Calendar';
import { useViewport } from '../../util/viewPort';
import calendars from '../../config/calendars';

function CalendarTabs() {
  const { width } = useViewport();
  const breakpoint = 600;
  const [activeTab, setActiveTab] = useState(calendars[0]?.key || 'linea1');

  const current = calendars.find((c) => c.key === activeTab) || calendars[0];
  const view = width < breakpoint ? 'dayGridDay' : 'dayGridWeek';

  return (
    <div className="max-w-4xl m-auto p-12 pt-32">
      <div className="border-b border-gray-300 mb-6 flex gap-2" role="tablist" aria-label="Calendarios">
        {calendars.map((cal) => (
          <button
            key={cal.key}
            type="button"
            role="tab"
            aria-selected={activeTab === cal.key}
            onClick={() => setActiveTab(cal.key)}
            className={`px-4 py-2 rounded-t-md transition-colors ${
              activeTab === cal.key
                ? 'bg-gray-200 text-gray-900'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {cal.title}
          </button>
        ))}
      </div>
      <div className="text-justify">
        <Calendar
          view={view}
          googleCalendarApiKey={current.apiKey}
          googleCalendarId={current.calendarId}
          titulo={current.title}
        />
      </div>
    </div>
  );
}

export default CalendarTabs;
