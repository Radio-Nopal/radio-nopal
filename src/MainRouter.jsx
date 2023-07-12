import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GenericPage from './pages/GenericPage';
import ShowInfo from './pages/ShowInfo';
import Home from './pages/Home/Home';
import SearchResults from './pages/SearchResults';
import Archivo from './pages/Archivo';
import Programacion from './pages/Programacion';
import ScrollToTop from './util/ScrollToTop';

function MainRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/info/:slug" element={<GenericPage />} />
        <Route path="/busqueda/:searchTerm" element={<SearchResults />} />
        <Route path="/archivo" element={<Archivo />} />
        <Route path="/programacion" element={<Programacion />} />
        <Route path="/:slug" element={<ShowInfo />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRouter;
