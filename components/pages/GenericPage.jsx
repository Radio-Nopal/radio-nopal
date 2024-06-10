'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { client } from '../../util/sanityClient';
import Page from '../Page';

function GenericPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [datosDePagina, setDatosDePagina] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "pagina" && slug.current == "${slug}"]`;

    client
      .fetch(query)
      .then((datos) => {
        if (!datos.length) {
          router.push('/');
        } else {
          setDatosDePagina(datos[0]);
          setIsLoading(false);
        }
      })
      .catch((err) => console.error(err));
  }, [slug]);

  return <Page datosDePagina={datosDePagina} isLoading={isLoading} />;
}

export default GenericPage;
