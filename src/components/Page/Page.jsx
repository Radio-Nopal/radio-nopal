import React from 'react';
import { obtenerUrlDePrimeraImagen } from '../../util/sanityClient';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PageTitle from '../PageTitle/PageTitle';
import Loader from '../Loader';
import TextoPortable from '../TextoPortable';
import './Page.scss';

function Page({
  children, datosDePagina, isLoading,
}) {
  const {
    titulo,
    subtitulo,
    descripcion,
    colorFondo,
    imagenesCabecera,
    contenido,
  } = datosDePagina;

  const style = { '--header-text-color': colorFondo?.hex || 'black' };

  return (
    <div className="page" style={style}>
      <Header />
      <PageTitle
        titulo={titulo}
        subtitulo={subtitulo}
        descripcion={descripcion}
        colorFondo={colorFondo?.hex}
        imagenDeEncabezado={obtenerUrlDePrimeraImagen(imagenesCabecera)}
      />

      <div className="max-w-4xl m-auto p-8 text-justify">
        {!isLoading ? (
          <div className="mb-8">
            <TextoPortable value={contenido} />
          </div>
        ) : (
          <Loader />
        )}
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Page;
