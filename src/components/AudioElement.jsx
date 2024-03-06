import React from 'react';

function AudioElement() {
  return (
    <audio id="audio-player-1" type="audio/mpeg" src={process.env.REACT_APP_STREAM_URL_1} />
  );
}

export default AudioElement;
