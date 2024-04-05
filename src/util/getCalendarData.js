import streams from '../streams.constants';

const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function getCalendarData(dispatch) {
  const fetchStreamData = async (stream) => {
    const { streamingId, calendarId, calendarApiKey } = stream;

    const startTime = `${new Date().toISOString().split('.')[0]}Z`;
    const endTime = `${new Date(Date.now() + 3600000 * 3).toISOString().split('.')[0]}Z`;
    const calendarUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${calendarApiKey}&timeMin=${startTime}&timeMax=${endTime}&timeZone=${browserTimeZone}`;

    try {
      const response = await fetch(calendarUrl);
      const data = await response.json();

      const now = new Date();
      const currentHour = now.getHours();
      const currentEvent = data.items.find((event) => {
        const eventStart = new Date(event.start.dateTime);
        const eventEnd = new Date(event.end.dateTime);
        const eventStartHour = eventStart.getHours();
        const eventEndHour = eventEnd.getHours();
        return eventStartHour <= currentHour && currentHour < eventEndHour;
      });
      const { summary } = currentEvent;

      const nowPlaying = summary; // data.items[0]?.summary;
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
