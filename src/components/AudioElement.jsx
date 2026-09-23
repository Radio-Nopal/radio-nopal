import React from 'react';

function AudioElement() {
  return (
    <>
      <audio id="audio-player-1" type="audio/mpeg" src={process.env.REACT_APP_STREAM_URL_1 || 'https://radio.mensajito.mx/nopalA'} />
      <audio id="audio-player-2" type="audio/mpeg" src={process.env.REACT_APP_STREAM_URL_2 || 'https://radio.mensajito.mx/nopalVentana'} />
      <audio id="audio-player-3" type="audio/mpeg" src={process.env.REACT_APP_STREAM_URL_3 || 'https://radio.mensajito.mx/2e6953be728b'} />
    </>
  );
}

export default AudioElement;
