import React, { useContext } from 'react';
import Player from '../Player/Player';
import NowPlaying from '../NowPlaying/NowPlaying';
import { store } from '../../store';

function PlayerContainer() {
  const { state: storeState } = useContext(store);
  const { playing, isOnline, nowPlaying } = storeState;

  return (
    <div className="header__col gap-2 md:gap-8 flex md:block col-span-6 md:col-span-3 justify-between items-start h-0">
      <div className="flex">
        <div className="inline-flex">
          <Player />
        </div>
        <div className="header__now-playing leading-4">
          {playing && nowPlaying && <span className="header__live-signal ml-1" />}
          {isOnline ? nowPlaying && playing && 'Estás escuchando: ' : 'Offline'}
          <br />
          <span className="header__show-name">
            <NowPlaying />
          </span>
        </div>
      </div>
    </div>
  );
}

export default PlayerContainer;
