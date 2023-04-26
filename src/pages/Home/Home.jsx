import React, { useState, useEffect } from 'react';
import { client } from '../../util/sanityClient';
import Calendar from '../../components/Calendar/Calendar';
import Page from '../../components/Page/Page';
import { useViewport } from '../../util/viewPort';
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

  return (
    <Page
      classModifier="home"
      datosDePagina={datosDePagina}
      isLoading={isLoading}
    >
      <span
        className="direccion absolute text-xs"
        style={{
          bottom: '9rem',
          right: '1rem',
          transformOrigin: 'right bottom',
          transform: 'rotate(-90deg) translate(100%, 0)',
        }}
      >
        Calle José Rosas Moreno 123a, colonia San Rafael, CDMX, C.P. 06470
      </span>
      <br />
      <br />
      <Calendar view={width < breakpoint ? 'dayGridDay' : 'dayGridWeek'} />
    </Page>
  );
}

export default Home;
