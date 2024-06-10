'use client';

import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { StateProvider } from '../store';
import { ViewportProvider } from '../util/viewPort';
import AudioElement from '../components/AudioElement';
import LayoutContent from '../components/LayoutContent';
import '../styles/index.scss';

function RootLayout({ children }) {
  useEffect(() => {
    ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  console.log(
    '%c radionopal.com ',
    `font-weight: bold;
    font-size: 40px;
    color: #365ABD;
    text-shadow: 3px -3px 0 #FFD2C3,
    6px -6px 0 #3F6845,
    9px -9px 0 #FF6F61`,
  );
  console.log(
    '%c /* \n‍ https://github.com/Radio-Nopal/radio-nopal\n */',
    'font-size: 15px; color: blue;',
  );

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </head>
      <body>
        <StateProvider>
          <ViewportProvider>
            <AudioElement />
            {children}
            <LayoutContent />
          </ViewportProvider>
        </StateProvider>
      </body>
    </html>
  );
}

export default RootLayout;
