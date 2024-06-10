'use client';

import React, { useEffect, useContext } from 'react';
import { store } from '../store';
import getStreamingStatus from '../util/getStreamingStatus';
import getCalendarData from '../util/getCalendarData';

function LayoutContent({ children }) {
  const { dispatch } = useContext(store);

  useEffect(() => {
    // Obtener los datos del calendario y del estado de transmisión inicialmente
    getCalendarData(dispatch);
    getStreamingStatus(dispatch);

    // Establecer la actualización del calendario cada 15 minutos
    const intervalId = setInterval(() => {
      getCalendarData(dispatch);
    }, 15 * 60 * 1000); // 15 minutos en milisegundos

    // Limpiar el intervalo cuando el componente se desmonte o se actualice
    return () => clearInterval(intervalId);
  }, [dispatch]);

  return <>{children}</>;
}

export default LayoutContent;
