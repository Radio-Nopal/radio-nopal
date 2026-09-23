import React from 'react';

function AudioElement() {
  return (
    <>
      <audio id="audio-player-1" type="audio/mpeg" src={process.env.REACT_APP_STREAM_URL_1} />
      <audio id="audio-player-2" type="audio/mpeg" src={process.env.REACT_APP_STREAM_URL_2} />
      <audio id="audio-player-3" type="audio/mpeg" src={process.env.REACT_APP_STREAM_URL_3} />
    </>
  );
}

export default AudioElement;
