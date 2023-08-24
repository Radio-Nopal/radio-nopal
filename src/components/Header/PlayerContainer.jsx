import React, { useContext } from 'react';
import Player from '../Player/Player';
import NowPlaying from '../NowPlaying/NowPlaying';
import { store } from '../../store';

function PlayerContainer() {
  const { state: storeState } = useContext(store);
  const { isOnline, nowPlaying } = storeState;

  return (
    <>
      <div className="inline-flex">
        <Player />
      </div>
      <div className="header__now-playing">
        {isOnline && nowPlaying && 'EN VIVO'}
        <br />
        <span className="header__show-name">
          <NowPlaying />
        </span>
      </div>
    </>
  );
}

export default PlayerContainer;
