import React from 'react';

function AudioElement() {
  return (
    <audio id="audio-player" type="audio/mpeg">
      <source src={process.env.REACT_APP_STREAM_URL} />
    </audio>
  );
}

export default AudioElement;
