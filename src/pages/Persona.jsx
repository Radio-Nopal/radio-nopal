import React, { useState, useEffect } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { client, obtenerUrlDePrimeraImagen } from '../util/sanityClient';
import Page from '../components/Page';
import TextoPortable from '../components/TextoPortable';
import ContactLinks from '../components/HostsInfo/ContactLinks';

function Persona() {
  const { slug } = useParams();
  const [datosDePersona, setDatosDePersona] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = ` *[_type == "persona" && slug.current == "${slug}"] {
      ...,
      "titulo": nombre,
      "programas": *[_type=='programa' && references(^._id)]{ titulo, slug }
    }`;
    client
      .fetch(query)
      .then((datos) => {
        setDatosDePersona(datos[0] || []);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const datosNoEncontrados = !isLoading && datosDePersona.length === 0;
  const {
    mediosDeContacto, biografia, fotos, nombre, programas,
  } = datosDePersona;

  return (
    datosNoEncontrados
      ? <Navigate to="/" />
      : (
        <Page datosDePagina={datosDePersona} isLoading={isLoading}>
          {fotos && (
          <div
            className="h-96 bg-center bg-cover rounded text-center overflow-hidden mb-6"
            style={{ backgroundImage: `url('${obtenerUrlDePrimeraImagen(fotos)}')` }}
            title={nombre}
          />
          )}
          {biografia && <TextoPortable className="" value={biografia} />}
          <br />
          {!!programas?.length
            && (
              <Link to={`/${programas[0].slug.current}`}>
                <div className="lista-de-personas__description text-gray-400">
                  {`Programa: ${programas[0].titulo}`}
                </div>
              </Link>
            )}
          {mediosDeContacto && (
          <>
            <h1 className="text-2xl pt-2 pb-2 mt-6">Contacto</h1>
            <ContactLinks mediosDeContacto={mediosDeContacto} />
          </>
          )}
        </Page>
      )

  );
}

export default Persona;
