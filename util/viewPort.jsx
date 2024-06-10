"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

const viewportContext = createContext({});

export function ViewportProvider({ children }) {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
      window.addEventListener('resize', handleWindowResize);
    }
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return <viewportContext.Provider value={{ width }}>{children}</viewportContext.Provider>;
}

export const useViewport = () => {
  const { width } = useContext(viewportContext);
  return { width };
};
