import React, { useState, useEffect } from 'react';
import { client, obtenerUrlDePrimeraImagen } from '../../util/sanityClient';
import TextoPortable from '../TextoPortable';
import Loader from '../Loader';
import './ListaDePersonas.scss';

function ListaDePersonas({ searchTerm, filter }) {
  const [datos, setDatos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const search = searchTerm ? `&& nombre match '${searchTerm}'` : '';

  useEffect(() => {
    const query = ` *[_type == "persona" ${search}] {
      ..., 
      "programas": *[_type=='programa' && references(^._id)]{ titulo }
    }`;

    client
      .fetch(query)
      .then((datosDePersona) => {
        const datosFiltrados = filter ? datosDePersona.filter(filter) : datosDePersona;
        setDatos(datosFiltrados);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [searchTerm]);
  console.log(datos);

  const listaDePersonas = datos?.map(({
    biografia, fotos, nombre, programas, _id,
  }) => (
    <div key={_id} className="show">

      <div
        className="show__image bg-cover bg-center"
        style={{
          backgroundImage: `url(${obtenerUrlDePrimeraImagen(fotos)})`,
          backgroundColor: 'black',
        }}
      />
      <h1 className="show__title text-base truncate">{nombre}</h1>

      <span className="show__host">
        <TextoPortable value={biografia} />
      </span>

      <h2 className="show__description text-gray-400">
        {`Programa: ${programas[0]?.titulo}`}
      </h2>

    </div>
  ));
  return (
    <>
      {isLoading && <Loader />}
      <div className="grid grid-cols-2 md:grid-cols-4 pt-8 gap-4">
        {listaDePersonas}
      </div>
      {datos.length === 0 && !isLoading && (
        <span>No se encontraron programas con esta búsqueda.</span>
      )}
    </>
  );
}

export default ListaDePersonas;
