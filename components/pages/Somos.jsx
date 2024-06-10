'use client';

import React, { useState, useEffect } from 'react';
import { client } from '../../util/sanityClient';
import Page from '../Page';
import ListaDePersonas from '../ListaDePersonas';

function Somos() {
  const [datosDePagina, setDatosDePagina] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = ' *[_type == "pagina" && slug.current == "somos"]';

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
      <ListaDePersonas />
    </Page>
  );
}

export default Somos;
