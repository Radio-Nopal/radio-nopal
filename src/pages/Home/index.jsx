import React, { useState, useEffect } from 'react';
import { Tilt } from 'react-tilt';
import { client, obtenerUrlDePrimeraImagen } from '../../util/sanityClient';
import PageContent from '../../components/Page/PageContent';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CalendarTabs from '../../components/CalendarTabs';
import ImageGallery from '../../components/TextoPortable/ImageGallery';
import SocialNetworksLinks from '../../components/SocialNetworksLinks';
import TelegramWidget from '../../components/Chat/TelegramWidget';
import radionopalLogo from '../../assets/images/logo.svg';
import './Home.scss';

function Home() {
  const [datosDePagina, setDatosDePagina] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
    <div>
      <Header />
      <div
        className="home__header rounded-3xl"
      >
        <div className="absolute w-full">
          {imagenDeEncabezado && <ImageGallery imagenesCabecera={imagenesCabecera} />}
        </div>
        <div className="p-4" style={{ height: '80vh' }}>
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

      </div>
      <PageContent
        contenido={contenido}
        isLoading={isLoading}
      />
      <CalendarTabs />
      <TelegramWidget />
      <Footer />
    </div>
  );
}

export default Home;
