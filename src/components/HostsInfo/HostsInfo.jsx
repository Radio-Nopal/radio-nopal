import React from 'react';
import { Link } from 'react-router-dom';
import { obtenerUrlDePrimeraImagen } from '../../util/sanityClient';
import TextoPortable from '../TextoPortable';

const HostsInfo = ({ datosDeLocutorxs }) => datosDeLocutorxs.map(({
  _id, nombre, biografia, fotos, slug,
}) => (
  <Link to={`/somos/${slug.current}`} key={_id} className="w-full">
    <div className="w-full lg:flex py-6">
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-center bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style={{ backgroundImage: `url('${obtenerUrlDePrimeraImagen(fotos)}')`, backgroundColor: 'black' }}
        title={nombre}
      />
      <div className="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-full">
        <div className="mb-8">
          <div className="text-black font-bold text-xl mb-2">{nombre}</div>
          <div className="text-grey-darker text-base">
            <TextoPortable className="overflow-wrap" value={biografia} />
          </div>
        </div>
      </div>
    </div>
  </Link>
));

export default HostsInfo;
