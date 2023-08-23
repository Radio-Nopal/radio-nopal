import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, obtenerUrlDePrimeraImagen } from '../../util/sanityClient';
import Loader from '../Loader';
import './Shows.scss';

function ShowsList({ searchTerm, filter }) {
  const [datos, setDatos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const search = searchTerm ? `&& titulo match '${searchTerm}'` : '';

  useEffect(() => {
    const query = ` *[_type == "programa" ${search}]{ ..., locutorxs[]-> }`;

    client
      .fetch(query)
      .then((datosDeProgramas) => {
        const datosFiltrados = filter ? datosDeProgramas.filter(filter) : datosDeProgramas;
        setDatos(datosFiltrados);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [searchTerm]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="grid grid-cols-2 md:grid-cols-4 pt-8 gap-4">
        {datos.map((programa) => {
          const {
            slug, titulo, dias, hora, periodicidad, locutorxs, imagenes,
          } = programa;
          const key = slug.current;

          return (
            <div key={key} className="show">
              <Link to={`/${key}`} title={titulo}>
                <div
                  className="show__image bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${obtenerUrlDePrimeraImagen(imagenes)})`,
                    backgroundColor: 'black',
                  }}
                />
                <h1 className="show__title text-base truncate">{titulo}</h1>
                {locutorxs ? (
                  <span className="show__host">
                    {`Por: ${locutorxs[0].nombre}`}
                  </span>
                ) : (
                  <br />
                )}
                {dias && hora && periodicidad ? (
                  <div className="show__description text-gray-400">{`${dias} | ${hora} | ${periodicidad}`}</div>
                ) : (
                  <br />
                )}
              </Link>
            </div>
          );
        })}
      </div>
      {datos.length === 0 && !isLoading && (
        <span>No se encontraron programas con esta búsqueda.</span>
      )}
    </>
  );
}

export default ShowsList;
