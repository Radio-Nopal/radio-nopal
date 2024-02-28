import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, obtenerUrlDePrimeraImagen } from '../../util/sanityClient';
import Loader from '../Loader';
import './Shows.scss';

function ShowsList({ searchTerm, queryFilter = '' }) {
  const [datos, setDatos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const search = searchTerm ? `&& titulo match '${searchTerm}'` : '';

  useEffect(() => {
    const query = ` *[_type == "programa" ${search} ${queryFilter}]{ ..., locutorxs[]-> {nombre} }`;
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {datos.map((programa) => {
          const {
            slug, titulo, dias, hora, periodicidad, locutorxs, imagenes, fechasLegacy,
          } = programa;
          const key = slug.current;

          // arregla el problema de que a veces el horario está escrito sin espacios entre los |
          const formatedFechasLegacy = fechasLegacy
            ?.split('|')
            .map((part) => part.trim()) // Remove leading and trailing spaces
            .join(' | ');

          const horario = dias && hora && periodicidad ? `${dias} | ${hora} | ${periodicidad}` : formatedFechasLegacy;

          return (
            <div key={key} className="programa mt-6">
              <Link to={`/${key}`} title={titulo}>
                <div
                  className="bg-cover bg-center md:h-32 h-52"
                  style={{
                    backgroundImage: `url(${obtenerUrlDePrimeraImagen(imagenes)})`,
                    backgroundColor: 'black',
                  }}
                />
                <h1 className="programa__title text-base truncate">{titulo}</h1>
                {locutorxs?.length && locutorxs[0]?.nombre ? (
                  <div className="truncate block max-w-full">
                    {`Por: ${locutorxs?.map((locutor) => locutor.nombre).join(', ')}`}
                  </div>
                ) : (
                  <br />
                )}
                {horario.length ? (
                  <div className="show__description text-left text-gray-400 text-sm">{horario}</div>
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
