import React, { useState, useEffect, useRef } from 'react';
import Chip from '@mui/material/Chip';
import { Link } from 'react-router-dom';
import { client, obtenerUrlDePrimeraImagen } from '../../util/sanityClient';
import TextoPortable from '../TextoPortable';
import ContactLinks from '../HostsInfo/ContactLinks';
import Loader from '../Loader';
import './ListaDeLugares.scss';

function ListaDeLugaresQueNosApoyan({ searchTerm }) {
  const [datos, setDatos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const search = searchTerm ? `&& nombre match '${searchTerm}'` : '';
  const [lastId, setLastId] = useState(null);

  const observerTarget = useRef(null);

  const fetchNextPage = (id, datosAnteriores) => {
    if (id === null) {
      return;
    }
    setIsLoading(true);

    const query = `*[_type == "lugaresQueNosApoyan" ${search} ${id ? ` && _id > '${id}'` : ''}] | order(_id) [0...12]`;

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
  console.log({ datos });

  // Obtener todas las categorías únicas
  const todasLasCategorias = [...new Set(datos.flatMap(({ categorias }) => categorias))];

  // Filtrar los lugares por las categorías seleccionadas
  const lugaresFiltrados = categoriasSeleccionadas.length > 0
    ? datos.filter(
      (lugar) => categoriasSeleccionadas.every((cat) => lugar.categorias.includes(cat)),
    )
    : datos;

  const handleCategoriaClick = (categoria) => {
    setCategoriasSeleccionadas((prevSelected) => (prevSelected.includes(categoria)
      ? prevSelected.filter((cat) => cat !== categoria)
      : [...prevSelected, categoria]));
  };

  const listaDeLugares = lugaresFiltrados?.map(({
    /*  categorias, */
    beneficios,
    descripcion,
    direccion,
    fotos,
    nombre,
    _id,
    mediosDeContacto,
    sitioWeb,
  }) => (
    <div key={_id} className="lista-de-lugares">
      <Link to={sitioWeb || 'www.radionopal.com'} target="_blank" rel="noopener noreferrer">
        <div
          className="md:h-32 h-52 bg-cover bg-center"
          style={{
            backgroundImage: `url(${obtenerUrlDePrimeraImagen(fotos)})`,
            backgroundColor: 'black',
          }}
        />
        <h4 className="text-2xl font-bold truncate">{nombre}</h4>
      </Link>

      {descripcion && (
      <span className="lista-de-lugares__descripcion">
        <TextoPortable value={[descripcion[0]]} />
      </span>
      )}
      {beneficios && beneficios.length > 0 && (
      <ul className="list-disc pl-5">
        {beneficios.map((beneficio) => (
          <li key={`${_id}-${beneficio}`} className="list-item">{beneficio}</li>
        ))}
      </ul>
      )}
      <div>{direccion}</div>
      <ContactLinks mediosDeContacto={mediosDeContacto} />
    </div>
  ));
  return (
    <>
      <div className="categorias-chips">
        {todasLasCategorias.map((categoria) => (
          <Chip
            key={categoria}
            label={categoria}
            clickable
            onClick={() => handleCategoriaClick(categoria)}
            color={categoriasSeleccionadas.includes(categoria) ? 'primary' : 'default'}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 pt-8 gap-8">
        {listaDeLugares}
        {isLoading && <Loader />}

        <div ref={observerTarget} />
      </div>
      {lugaresFiltrados.length === 0 && !isLoading && (
        <span>No se encontraron lugares con esta búsqueda.</span>
      )}
    </>
  );
}

export default ListaDeLugaresQueNosApoyan;
