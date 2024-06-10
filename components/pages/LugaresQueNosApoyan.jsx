'use client';

import React, { useState, useEffect } from 'react';
import { client } from '../../util/sanityClient';
import Page from '../Page';
import ListaDeLugaresQueNosApoyan from '../ListaDeLugaresQueNosApoyan';

function LugaresQueNosApoyan() {
  const [datosDePagina, setDatosDePagina] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = ' *[_type == "pagina" && slug.current == "lugares-que-nos-apoyan"]';

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
      <ListaDeLugaresQueNosApoyan />
    </Page>
  );
}

export default LugaresQueNosApoyan;
