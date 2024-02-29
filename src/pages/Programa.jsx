import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { client, obtenerUrlDePrimeraImagen } from '../util/sanityClient';
import Page from '../components/Page';
import TextoPortable from '../components/TextoPortable';
import ContactLinks from '../components/HostsInfo/ContactLinks';
import HostsInfo from '../components/HostsInfo/HostsInfo';
import PaginatedMixcloudArchive from '../components/PaginatedMixcloudArchive';

function Programa() {
  const { slug } = useParams();
  const [datosDePrograma, setDatosDePrograma] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "programa" && slug.current == "${slug}"]{ ..., locutorxs[]-> }`;
    client
      .fetch(query)
      .then((datos) => {
        setDatosDePrograma(datos[0] || []);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const datosNoEncontrados = !isLoading && !Object.keys(datosDePrograma).length;
  const {
    locutorxs,
    mediosDeContacto,
    descripcionDePrograma,
    dias,
    hora,
    periodicidad,
    titulo,
    imagenes,
    fechasLegacy,
    mixcloudIframeLinks = [],
  } = datosDePrograma;
  const laFechaFueImportadaDeWordpress = !!fechasLegacy?.length;
  const mostrarPeriodicidad = dias && hora && periodicidad && !laFechaFueImportadaDeWordpress;

  return datosNoEncontrados ? (
    <Navigate to="/" />
  ) : (
    <Page datosDePagina={datosDePrograma} isLoading={isLoading}>
      <div
        className="h-48 m-auto lg:w-48 flex-none bg-center bg-cover rounded-t text-center overflow-hidden"
        style={{ backgroundImage: `url('${obtenerUrlDePrimeraImagen(imagenes)}')` }}
        title={titulo}
      />
      {laFechaFueImportadaDeWordpress && (
        <div className="show__description text-gray-400">{fechasLegacy}</div>
      )}
      {mostrarPeriodicidad && (
        <div className="show__description text-gray-400">{`${dias} | ${hora} | ${periodicidad}`}</div>
      )}
      <br />
      {descripcionDePrograma && <TextoPortable className="text-justify" value={descripcionDePrograma} />}
      <br />
      {locutorxs && locutorxs.length > 0 && locutorxs[0]?.nombre && (
        <HostsInfo datosDeLocutorxs={locutorxs} />
      )}
      {mediosDeContacto && (
        <>
          <h1 className="text-2xl pt-2 pb-2">Contacto</h1>
          <ContactLinks mediosDeContacto={mediosDeContacto} />
        </>
      )}
      {
        mixcloudIframeLinks.length > 0
        && <PaginatedMixcloudArchive mixcloudIframeLinks={mixcloudIframeLinks} itemsPerPage={2} />
      }
    </Page>
  );
}

export default Programa;
