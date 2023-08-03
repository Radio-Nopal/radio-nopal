import React, { useState, useEffect } from 'react';
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
  } = datosDePagina;

  const imagenDeEncabezado = obtenerUrlDePrimeraImagen(imagenesCabecera);
  return (
    <>
      <Header />
      <div
        className="home__header p-4"
        style={{
          backgroundImage: `url(${imagenDeEncabezado || 'none'})`,
        }}
      >
        <div className="home__logo">
          <img src={radionopalLogo} alt="Radio Nopal logo" />
        </div>

      </div>

      <div
        className="relative h-0"
        style={{
          top: '-6vh',
        }}
      >
        <SocialNetworksLinks />
      </div>

      <PageContent
        contenido={contenido}
        isLoading={isLoading}
      />
      <div className="max-w-4xl m-auto p-8 text-justify">
        <Calendar view={width < breakpoint ? 'dayGridDay' : 'dayGridWeek'} />
      </div>
      <Footer />
    </>
  );
}

export default Home;
