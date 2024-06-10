import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '../../util/sanityClient';
import Loader from '../Loader';
import './PagesList.scss';

function PagesList({ searchTerm }) {
  const [data, setDatos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const search = searchTerm ? `&& titulo match '${searchTerm}'` : '';

  useEffect(() => {
    const query = ` *[_type == "pagina" ${search}]`;

    client
      .fetch(query)
      .then((datosDeProgramas) => {
        setDatos(datosDeProgramas);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [searchTerm]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="pt-8">
        {data.map(({
          _id, slug, titulo, descripcion,
        }) => (
          <li key={_id}>
            <Link href={`/info/${slug.current}`}>
              <span className="text-2xl">{titulo}</span>
              <br />
              <span className="ml-6">{descripcion}</span>
            </Link>
          </li>
        ))}
      </div>
      {data.length === 0 && !isLoading && (
        <span>No se encontraron páginas con esta búsqueda.</span>
      )}
    </>
  );
}

export default PagesList;
