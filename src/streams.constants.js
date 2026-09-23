const streams = [
  {
    streamingId: 1,
    streamName: process.env.REACT_APP_STREAM_NAME_1 || 'nopalA',
    calendarId: process.env.REACT_APP_CALENDAR_ID_1,
    calendarApiKey: process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY,
  },
  {
    streamingId: 2,
    streamName: process.env.REACT_APP_STREAM_NAME_2 || 'nopalVentana',
    calendarId: process.env.REACT_APP_CALENDAR_ID_2,
    calendarApiKey: process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY,
  },
  {
    streamingId: 3,
    streamName: process.env.REACT_APP_STREAM_NAME_3 || '2e6953be728b',
    calendarId: process.env.REACT_APP_CALENDAR_ID_3,
    calendarApiKey: process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY,
  },
];

export default streams;
