import React, { useContext, useEffect } from 'react';
import getLastTweet from '../../util/getLastTweet/getLastTweet';
import { store } from '../../store';

function LastTweet() {
  const { dispatch } = useContext(store);
  // const { lastTweet } = state;

  useEffect(() => {
    getLastTweet((data) => {
      dispatch({ type: 'lastTweet', payload: data[0].tweet });
    });
  }, []);
  return <div>asdf alsdf a dsf </div>;
  // return <div dangerouslySetInnerHTML={{ __html: lastTweet }} />;
}

export default LastTweet;
