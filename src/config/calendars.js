const calendars = [
  {
    key: 'linea1',
    title: 'Radio Nopal Línea 1',
    apiKey: process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY,
    calendarId: process.env.REACT_APP_CALENDAR_ID_1,
  },
  {
    key: 'linea2',
    title: 'Radio Nopal Línea 2',
    apiKey: process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY,
    calendarId: process.env.REACT_APP_CALENDAR_ID_2,
  },
  {
    key: 'eventos',
    title: 'Eventos',
    apiKey: process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY,
    calendarId: process.env.REACT_APP_CALENDAR_ID_3,
  },
];

export default calendars;
