import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../util/sanityClient';
import Calendar from '../../components/Calendar/Calendar';
import Page from '../../components/Page/Page';
import SocialNetworksLinks from './SocialNetworksLinks';
import { useViewport } from '../../util/viewPort';
import radionopalLogo from '../../assets/images/logo.svg';

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

  return (
    <Page
      datosDePagina={datosDePagina}
      isLoading={isLoading}
    >
      <Link to="/" className="contents">
        <img className="header__logo mb-6" src={radionopalLogo} alt="Radio Nopal logo" />
      </Link>
      <SocialNetworksLinks />
      <Calendar view={width < breakpoint ? 'dayGridDay' : 'dayGridWeek'} />
    </Page>
  );
}

export default Home;
