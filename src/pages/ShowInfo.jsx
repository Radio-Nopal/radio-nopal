import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { client } from '../util/sanityClient';
import Page from '../components/Page';
import MixcloudArchive from '../components/MixcloudArchive/MixcloudArchive';
import ContactLinks from '../components/HostsInfo/ContactLinks';
import HostsInfo from '../components/HostsInfo/HostsInfo';

function ShowInfo() {
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

  const datosNoEncontrados = !isLoading && datosDePrograma.length === 0;
  const { locutorxs, archivoMixcloud, mediosDeContacto } = datosDePrograma;

  return (
    datosNoEncontrados
      ? <Navigate to="/" />
      : (
        <Page datosDePagina={datosDePrograma} isLoading={isLoading}>

          {locutorxs && (
          <HostsInfo datosDeLocutorxs={locutorxs} />
          )}
          {mediosDeContacto && (
          <>
            <h1 className="text-2xl pt-2 pb-2">Contacto</h1>
            <ContactLinks mediosDeContacto={mediosDeContacto} />
          </>
          )}
          {archivoMixcloud && (
            <>
              <h1 className="text-4xl pt-12 pb-4">Archivo</h1>
              <MixcloudArchive data={archivoMixcloud} />
            </>
          )}

        </Page>
      )

  );
}

export default ShowInfo;
