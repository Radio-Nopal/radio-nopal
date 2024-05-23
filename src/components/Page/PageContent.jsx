import React from 'react';
import Loader from '../Loader';
import TextoPortable from '../TextoPortable';
import './Page.scss';

function PageContent({
  contenido, isLoading,
}) {
  const renderizarSecciones = contenido?.map(({
    titulo, colorFondo, colorTexto, columnas, _key,
  }) => (
    <div className="p-12" key={_key} style={{ background: colorFondo?.hex, color: colorTexto?.hex }}>
      <div className="text-xl text-center">{titulo}</div>
      <section className="flex flex-wrap lg:flex-nowrap m-auto max-w-7xl">
        {columnas?.map(({
          columna, _key: columnaKey,
        }) => (
          <div className={`lg:w-1/${columnas.length} w-1/2 p-4 md:p-4`} key={columnaKey}>
            <TextoPortable value={columna} />
          </div>

        ))}
      </section>
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
