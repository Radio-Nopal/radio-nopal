import React, { useState, useEffect } from 'react';
import { client } from '../util/sanityClient';
import Page from '../components/Page';
import ListaDeProgramas from '../components/ListaDeProgramas';

function Archivo() {
  const [datosDePagina, setDatosDePagina] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = ' *[_type == "pagina" && slug.current == "archivo"]';

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
      <ListaDeProgramas queryFilter="&& archivado == true" />
    </Page>
  );
}

export default Archivo;
