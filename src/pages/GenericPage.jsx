import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { client } from '../util/sanityClient';
import Page from '../components/Page/Page';

function GenericPage() {
  const { slug } = useParams();
  const [datosDePagina, setDatosDePagina] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "pagina" && slug.current == "${slug}"]`;

    client
      .fetch(query)
      .then((datos) => {
        setDatosDePagina(datos[0] || []);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const datosNoEncontrados = !isLoading && datosDePagina.length === 0;

  return (
    datosNoEncontrados
      ? <Navigate to="/" />
      : <Page datosDePagina={datosDePagina} isLoading={isLoading} />
  );
}

export default GenericPage;
