import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { client, obtenerUrlDePrimeraImagen } from '../../util/sanityClient';
import TextoPortable from '../TextoPortable';
import ContactLinks from '../HostsInfo/ContactLinks';
import Loader from '../Loader';
import './ListaDePersonas.scss';

function ListaDePersonas({ searchTerm }) {
  const [datos, setDatos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const search = searchTerm ? `&& nombre match '${searchTerm}'` : '';
  const [lastId, setLastId] = useState(null);

  const observerTarget = useRef(null);

  const fetchNextPage = (id, datosAnteriores) => {
    if (id === null) {
      return;
    }
    setIsLoading(true);

    const query = `*[_type == "persona" ${search} ${id ? ` && _id > '${id}'` : ''}] | order(_id) [0...12] {
      ..., 
      "programas": *[_type=='programa' && references(^._id)] { titulo, slug }
    }`;

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
  }, [observerTarget, lastId, search, datos]);

  useEffect(() => {
    fetchNextPage('', []);
  }, [searchTerm]);

  const listaDePersonas = datos?.map(({
    biografia, fotos, nombre, programas, _id, mediosDeContacto, slug,
  }) => (
    <div key={_id} className="lista-de-personas">
      <Link to={`/somos/${slug.current}`}>
        <div
          className="md:h-32 h-52 bg-cover bg-center"
          style={{
            backgroundImage: `url(${obtenerUrlDePrimeraImagen(fotos)})`,
            backgroundColor: 'black',
          }}
        />
        <h1 className="lista-de-personas__title text-base truncate">{nombre}</h1>
      </Link>
      {!!programas.length
      && (
        <Link to={`/${programas[0].slug.current}`}>
          <div className="lista-de-personas__description text-gray-400">
            {`Programa: ${programas[0].titulo}`}
          </div>
        </Link>
      )}

      {biografia && (
      <span className="lista-de-personas__biografia">
        <TextoPortable value={[biografia[0]]} />
      </span>
      )}
      <ContactLinks mediosDeContacto={mediosDeContacto} />
    </div>
  ));
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 pt-8 gap-8">
        {listaDePersonas}
        {isLoading && <Loader />}

        <div ref={observerTarget} />
      </div>
      {datos.length === 0 && !isLoading && (
        <span>No se encontraron personas con esta búsqueda.</span>
      )}
    </>
  );
}

export default ListaDePersonas;
