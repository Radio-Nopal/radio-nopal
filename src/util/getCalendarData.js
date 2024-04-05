import streams from '../streams.constants';

const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function getCalendarData(dispatch) {
  const fetchStreamData = async (stream) => {
    const { streamingId, calendarId, calendarApiKey } = stream;

    const startTime = `${new Date().toISOString().split('.')[0]}Z`; // '2024-04-05T13:36:47.755Z';

    const endTime = `${new Date(Date.now() + 3600000).toISOString().split('.')[0]}Z`;
    const calendarUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${calendarApiKey}&timeMin=${startTime}&timeMax=${endTime}&timeZone=${browserTimeZone}`;

    try {
      const response = await fetch(calendarUrl);
      const data = await response.json();
      console.log({ data });
      const nowPlaying = data.items[0]?.summary;
      dispatch({ type: 'nowPlaying', payload: nowPlaying, streamingId });
    } catch (error) {
      console.error('Oh no, an error occurred:', error);
    }
  };

  streams.forEach(async (stream) => {
    await fetchStreamData(stream);
  });
}

export default getCalendarData;
