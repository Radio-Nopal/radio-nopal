const streams = [
  {
    streamingId: 1,
    streamName: 'nopalA',
    calendarId: process.env.REACT_APP_CALENDAR_ID_1,
    calendarApiKey: process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY,
  },
  {
    streamingId: 2,
    streamName: 'nopalVentana',
    calendarId: process.env.REACT_APP_CALENDAR_ID_2,
    calendarApiKey: process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY,
  },
  {
    streamingId: 3,
    streamName: 'zaza',
    calendarId: process.env.REACT_APP_CALENDAR_ID_2,
    calendarApiKey: process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY,
  },
];

export default streams;
