import React, { useContext } from 'react';
import ReactGA from 'react-ga';
import { store } from '../../store';
import './SreamingPlayer.scss';

function StreamingPlayer({ streamingId }) {
  const { state, dispatch } = useContext(store);
  const { streams } = state;
  const { playing, isOnline, nowPlaying } = streams[streamingId];
  const audioElement = document.getElementById(`audio-player-${streamingId}`);
  const handlePlayerClick = () => {
    if (!isOnline) return;
    if (!playing) {
      ReactGA.event({
        category: 'Botón Play',
        action: `Hizo click en botón de play ${streamingId}`,
      });
      try {
        audioElement.play();
        console.log(audioElement);
      } catch (e) {
        console.warn(e);
        return;
      }
      dispatch({ type: 'playing', payload: true, streamingId });
    } else {
      try {
        audioElement.pause();
      } catch (e) {
        console.warn(e);
        return;
      }
      dispatch({ type: 'playing', payload: false, streamingId });
    }
  };

  const borderColorClass = isOnline ? 'border-red-600' : 'border-gray-600';

  return (

    <button
      type="button"
      className={`streaming-player 
        ${playing ? 'streaming-player--playing' : ''}
        ${isOnline ? '' : 'streaming-player--isOffline'}
        ${borderColorClass}
        flex-auto md:flex-1`}
      onClick={handlePlayerClick}
    >
      <div className={`streaming-player__container grid grid-cols-8 items-center ${!isOnline && 'text-gray-500'}`}>
        <div className="streaming-player__icon">
          <svg />
        </div>
        <div className="text-start col-span-6 truncate uppercase">
          {nowPlaying}
        </div>
        <div className="text-2xl">
          {streamingId}
        </div>
      </div>
    </button>

  );
}

export default StreamingPlayer;
