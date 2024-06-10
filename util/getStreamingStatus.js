import { io } from 'socket.io-client';
import streams from './streams.constants';

function getStreamingStatus(dispatch) {
  const handleSocketMessage = (msg) => {
    streams.forEach(async (stream) => {
      const { streamName, streamingId } = stream;
      const currentlyOnline = msg.includes(streamName);
      await dispatch({ type: 'isOnline', payload: currentlyOnline, streamingId });
    });
  };

  const socket = io(process.env.NEXT_PUBLIC_MENSAJITO_SOCKET_URL, {
    transports: ['websocket', 'polling', 'flashsocket'],
  });

  socket.on('estacion', handleSocketMessage);
}

export default getStreamingStatus;
