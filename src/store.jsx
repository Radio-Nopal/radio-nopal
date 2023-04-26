import React, { createContext, useReducer } from 'react';

const initialState = {
  playing: false,
  volume: 0.9,
  nowPlaying: '',
  isOnline: false,
  lastTweet: '',
};

const store = createContext(initialState);
const { Provider } = store;

function StateProvider({ children }) {
  const [state, dispatch] = useReducer((reducer, action) => {
    switch (action.type) {
      case 'playing':
        return { ...reducer, playing: action.payload };
      case 'volume':
        return { ...reducer, volume: action.payload };
      case 'nowPlaying':
        return { ...reducer, nowPlaying: action.payload };
      case 'isOnline':
        return { ...reducer, isOnline: action.payload };
      case 'lastTweet':
        return { ...reducer, lastTweet: action.payload };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export { store, StateProvider };
