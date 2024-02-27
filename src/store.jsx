import React, { createContext, useReducer } from 'react';

const initialState = {
  volume: 0.9,
  streams: {
    1: {
      playing: false,
      nowPlaying: '',
      isOnline: false,
    },
    2: {
      playing: false,
      nowPlaying: '',
      isOnline: false,
    },
  },
};

const store = createContext(initialState);
const { Provider } = store;

function StateProvider({ children }) {
  const [state, dispatch] = useReducer((reducer, action) => {
    const { streamingId } = action;
    switch (action.type) {
      case 'playing':
      case 'nowPlaying':
      case 'isOnline':
        return {
          ...reducer,
          streams: {
            ...reducer.streams,
            [streamingId]: {
              ...reducer.streams[streamingId],
              [action.type]: action.payload,
            },
          },
        };
      case 'volume':
        return { ...reducer, volume: action.payload };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export { store, StateProvider };
