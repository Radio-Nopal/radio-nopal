import streams from '../streams.constants';

const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function getCalendarData(dispatch) {
  const fetchStreamData = async (stream) => {
    const { streamingId, calendarId, calendarApiKey } = stream;
    const calendarUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${calendarApiKey}&timeMin=${new Date().toISOString()}&timeMax=${new Date(Date.now() + 3600000).toISOString()}&timeZone=${browserTimeZone}`;

    try {
      const response = await fetch(calendarUrl);
      const data = await response.json();
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
