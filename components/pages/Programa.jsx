'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Page from '../Page';
import TextoPortable from '../TextoPortable';
import ContactLinks from '../HostsInfo/ContactLinks';
import HostsInfo from '../HostsInfo/HostsInfo';
import PaginatedMixcloudArchive from '../PaginatedMixcloudArchive';
import { obtenerHorarioConFormato } from '../../util/utils';
import { client, obtenerUrlDePrimeraImagen } from '../../util/sanityClient';

function Programa() {
  const { slug } = useParams();
  const router = useRouter();
  const [datosDePrograma, setDatosDePrograma] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "programa" && slug.current == "${slug}"]{ ..., locutorxs[]-> }`;
    client
      .fetch(query)
      .then((datos) => {
        if (!datos.length) {
          router.push('/');
        } else {
          setDatosDePrograma(datos[0]);
          setIsLoading(false);
        }
      })
      .catch((err) => console.error(err));
  }, []);

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

  const horario = obtenerHorarioConFormato(dias, hora, periodicidad, fechasLegacy);

  return (
    <Page datosDePagina={datosDePrograma} isLoading={isLoading}>
      <div
        className="h-48 m-auto lg:w-48 flex-none bg-center bg-cover rounded-t text-center overflow-hidden"
        style={{ backgroundImage: `url('${obtenerUrlDePrimeraImagen(imagenes)}')` }}
        title={titulo}
      />
      {horario && (
        <div className="show__description text-gray-400">{horario}</div>
      )}
      <br />
      {descripcionDePrograma && <TextoPortable className="" value={descripcionDePrograma} />}
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
