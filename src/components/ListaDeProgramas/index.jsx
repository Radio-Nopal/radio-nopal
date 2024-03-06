import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { client, obtenerUrlDePrimeraImagen } from '../../util/sanityClient';
import Loader from '../Loader';
import { obtenerHorarioConFormato } from '../../util/utils';
import './ListaDeProgramas.scss';

function ListaDeProgramas({ searchTerm, queryFilter = '' }) {
  const [datos, setDatos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastId, setLastId] = useState(null);
  const search = searchTerm ? `&& titulo match '${searchTerm}'` : '';
  const observerTarget = useRef(null);

  const fetchNextPage = (id, datosAnteriores) => {
    if (id === null) {
      return;
    }
    setIsLoading(true);

    const query = `*[_type == "programa" ${search} ${queryFilter} ${
      id ? ` && _id > '${id}'` : ''
    }] | order(_id) [0...12]{ ..., locutorxs[]-> {nombre} }`;

    client
      .fetch(query)
      .then((result) => {
        if (result.length > 0) {
          setLastId(result[result.length - 1]._id);
        } else {
          setLastId(null); // Reached the end
        }
        setDatos([...datosAnteriores, ...result]);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage(lastId, datos);
        }
      },
      { threshold: 1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, lastId, searchTerm, queryFilter, datos]);

  useEffect(() => {
    fetchNextPage('', []);
  }, [searchTerm]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {datos.map((programa) => {
          const {
            slug,
            titulo,
            dias,
            hora,
            periodicidad,
            locutorxs,
            imagenes,
            fechasLegacy,
          } = programa;
          const key = slug.current;

          const horario = obtenerHorarioConFormato(dias, hora, periodicidad, fechasLegacy);

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
                {locutorxs && locutorxs.length > 0 && locutorxs[0]?.nombre && (
                  <div className="truncate block max-w-full">
                    {`Por: ${locutorxs.map((locutor) => locutor.nombre).join(', ')}`}
                  </div>
                )}
                {horario.length && (
                  <div className="show__description text-left text-gray-400 text-sm capitalize">
                    {horario}
                  </div>
                )}
              </Link>
            </div>
          );
        })}
      </div>
      {isLoading && <Loader />}
      <div ref={observerTarget} />
      {datos.length === 0 && !isLoading && (
        <span>No se encontraron programas con esta búsqueda.</span>
      )}
    </>
  );
}

export default ListaDeProgramas;
