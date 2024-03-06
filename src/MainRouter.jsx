import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GenericPage from './pages/GenericPage';
import Programa from './pages/Programa';
import Persona from './pages/Persona';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Archivo from './pages/Archivo';
import Somos from './pages/Somos';
import Programacion from './pages/Programacion';
import ScrollToTop from './util/ScrollToTop';
import getStreamingStatus from './util/getStreamingStatus';
import getCalendarData from './util/getCalendarData';
import { store } from './store';

// const basename = process.env.NODE_ENV === 'development' ? '/' : '/radio-nopal';

function MainRouter() {
  const { dispatch } = useContext(store);

  useEffect(() => {
    getCalendarData(dispatch);
    getStreamingStatus(dispatch);
  }, []);

  return (
    <BrowserRouter basename="/">
      <ScrollToTop />
      <Routes>
        <Route path="/info/:slug" element={<GenericPage />} />
        <Route exact path="/somos/:slug" element={<Persona />} />
        <Route path="/busqueda/:searchTerm" element={<SearchResults />} />
        <Route path="/archivo" element={<Archivo />} />
        <Route path="/somos" element={<Somos />} />
        <Route path="/programacion" element={<Programacion />} />
        <Route path="/:slug" element={<Programa />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRouter;
