import React, { useState, useEffect } from 'react';
import { client } from '../util/sanityClient';
import Calendar from '../components/Calendar/Calendar';
import Page from '../components/Page';
import ListaDeProgramas from '../components/ListaDeProgramas';
import { useViewport } from '../util/viewPort';

function Programacion() {
  const [datosDePagina, setDatosDePagina] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { width } = useViewport();
  const breakpoint = 600;

  useEffect(() => {
    const query = ' *[_type == "pagina" && slug.current == "programacion"]';

    client
      .fetch(query)
      .then((datos) => {
        setDatosDePagina(datos[0] || []);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Page datosDePagina={datosDePagina} isLoading={isLoading}>
      <br />
      <Calendar view={width < breakpoint ? 'dayGridDay' : 'dayGridWeek'} />
      <ListaDeProgramas queryFilter="&& archivado == false" />
    </Page>
  );
}

export default Programacion;
