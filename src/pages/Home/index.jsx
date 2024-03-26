import React, { useState, useEffect } from 'react';
import { Tilt } from 'react-tilt';
import { client, obtenerUrlDePrimeraImagen } from '../../util/sanityClient';
import PageContent from '../../components/Page/PageContent';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Calendar from '../../components/Calendar/Calendar';
import SocialNetworksLinks from '../../components/SocialNetworksLinks';
import { useViewport } from '../../util/viewPort';

import radionopalLogo from '../../assets/images/logo.svg';
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
  return (
    <>
      <Header />
      <div
        className="home__header p-4 rounded-3xl"
        style={{
          backgroundImage: `url(${imagenDeEncabezado || 'none'})`,
        }}
      >
        <div className="m-auto 2xl:max-w-7xl h-full">

          <div className="home__logo">
            <Tilt>
              <img
                src={radionopalLogo}
                className="m-auto"
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

      <PageContent
        contenido={contenido}
        isLoading={isLoading}
      />
      <div className="max-w-4xl m-auto p-12 py-22 text-justify">
        <Calendar view={width < breakpoint ? 'dayGridDay' : 'dayGridWeek'} />
      </div>
      <Footer />
    </>
  );
}

export default Home;
