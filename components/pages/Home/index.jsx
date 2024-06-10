'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Tilt } from 'react-tilt';
import PageContent from '../../Page/PageContent';
import Header from '../../Header';
import Footer from '../../Footer';
import Calendar from '../../Calendar/Calendar';
import SocialNetworksLinks from '../../SocialNetworksLinks';
import ImageGallery from '../../TextoPortable/ImageGallery';
import { useViewport } from '../../../util/viewPort';
import { client, obtenerUrlDePrimeraImagen } from '../../../util/sanityClient';
import radionopalLogo from '../../../assets/images/logo.svg';
import './Home.scss';

function Home() {
  const [datosDePagina, setDatosDePagina] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { width } = useViewport();
  const breakpoint = 600;

  useEffect(() => {
    const query = ' *[_type == "pagina" && slug.current == "pagina-de-inicio"]';

    client
      .fetch(query)
      .then((datosPaginaDeInicio) => {
        setDatosDePagina(datosPaginaDeInicio[0] || []);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const {
    imagenesCabecera,
    contenido,
    colorFondo,
  } = datosDePagina;

  const imagenDeEncabezado = obtenerUrlDePrimeraImagen(imagenesCabecera);

  const images = imagenesCabecera?.map(({ imagen }) => imagen);
  return (
    <>

      <Header />
      <div
        className="home__header rounded-3xl"
      >
        <div className="absolute w-full">
          {imagenDeEncabezado && <ImageGallery value={{ images }} />}
        </div>
        <div className="p-4" style={{ height: '80vh' }}>
          <div className="m-auto 2xl:max-w-7xl h-full">

            <div className="home__logo">
              <Tilt>
                <Image
                  width={112}
                  height={173}
                  src={radionopalLogo}
                  alt="Radio Nopal logo"
                />
              </Tilt>
            </div>

          </div>

          <div
            className="relative h-0"
            style={{
              top: '-6vh',
            }}
          >
            <SocialNetworksLinks color={colorFondo?.hex} />
          </div>

        </div>

      </div>

      <PageContent
        contenido={contenido}
        isLoading={isLoading}
      />
      <div className="max-w-4xl m-auto p-12 py-32 text-justify">
        <Calendar view={width < breakpoint ? 'dayGridDay' : 'dayGridWeek'} />
      </div>
      <Footer />
    </>
  );
}

export default Home;
