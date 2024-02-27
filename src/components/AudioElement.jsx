import React from 'react';

function AudioElement() {
  return (
    <>
      <audio id="audio-player-1" type="audio/mpeg">
        <source src={process.env.REACT_APP_STREAM_URL_1} />
      </audio>
      <audio id="audio-player-2" type="audio/mpeg">
        <source src={process.env.REACT_APP_STREAM_URL_2} />
      </audio>
    </>
  );
}

export default AudioElement;
