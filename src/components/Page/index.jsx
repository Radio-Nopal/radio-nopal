import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import PageTitle from '../PageTitle/PageTitle';
import PageContent from './PageContent';
import { obtenerUrlDePrimeraImagen } from '../../util/sanityClient';
import './Page.scss';

function Page({
  children, datosDePagina, isLoading,
}) {
  const {
    titulo,
    descripcionDePagina,
    colorFondo,
    imagenesCabecera,
    contenido,
  } = datosDePagina;

  const style = { '--header-text-color': colorFondo?.hex || 'black' };

  return (
    <div className="page flex flex-col min-h-screen" style={style}>
      <Header />
      <PageTitle
        titulo={titulo}
        descripcionDePagina={descripcionDePagina}
        colorFondo={colorFondo?.hex}
        imagenDeEncabezado={obtenerUrlDePrimeraImagen(imagenesCabecera)}
      />

      <PageContent
        contenido={contenido}
        isLoading={isLoading}
      />
      <div className="md:max-w-4xl m-auto mt-0 p-8 w-full">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Page;
