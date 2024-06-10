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

function reducer(state, action) {
  const { streamingId } = action;
  switch (action.type) {
    case 'playing':
    case 'nowPlaying':
    case 'isOnline':
      return {
        ...state,
        streams: {
          ...state.streams,
          [streamingId]: {
            ...state.streams[streamingId],
            [action.type]: action.payload,
          },
        },
      };
    case 'volume':
      return { ...state, volume: action.payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function StateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export { store, StateProvider };
