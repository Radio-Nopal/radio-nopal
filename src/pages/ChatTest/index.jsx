import React, { useState, useEffect } from 'react';
import { Tilt } from 'react-tilt';
import { client, obtenerUrlDePrimeraImagen } from '../../util/sanityClient';
import PageContent from '../../components/Page/PageContent';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Calendar from '../../components/Calendar/Calendar';
import SocialNetworksLinks from '../../components/SocialNetworksLinks';
import ImageGallery from '../../components/TextoPortable/ImageGallery';
import ChatComponent from '../../components/Chat/ChatComponent';
import TelegramWidget from '../../components/Chat/TelegramWidget';
import { useViewport } from '../../util/viewPort';
import radionopalLogo from '../../assets/images/logo.svg';
import './Home.scss';

function ChatTest() {
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
      <ChatComponent />
      <TelegramWidget />
      <div className="max-w-4xl m-auto p-12 py-32 text-justify">
        <Calendar view={width < breakpoint ? 'dayGridDay' : 'dayGridWeek'} />
      </div>
      <Footer />
    </>
  );
}

export default ChatTest;
