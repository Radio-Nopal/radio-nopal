import React from 'react';
import Loader from '../Loader';
import TextoPortable from '../TextoPortable';
import './Page.scss';

function PageContent({
  contenido, isLoading,
}) {
  const renderizarSecciones = contenido?.map(({
    izquierda, derecha, colorFondo, _key,
  }) => (
    <div className="p-12 flex flex-wrap" key={_key} style={{ background: colorFondo?.hex }}>
      <div className="lg:w-1/2 w-full p-8">
        <TextoPortable value={izquierda} />
      </div>
      <div className="lg:w-1/2 w-full p-8">
        <TextoPortable value={derecha} />
      </div>
    </div>
  ));

  return (
    !isLoading ? (
      renderizarSecciones
    ) : (
      <Loader />
    )
  );
}

export default PageContent;
