import React from 'react';
import './PageTitle.scss';

function PageTitle({
  titulo, subtitulo, descripcion, colorFondo, imagenDeEncabezado,
}) {
  return (
    <div
      className="page-title flex"
      style={{
        height: imagenDeEncabezado ? '80vh' : '',
        backgroundColor: colorFondo || 'none',
        backgroundPosition: 'center center',
        animation: colorFondo ? 'none' : 'background-color-animation 20s 0.08s infinite',
        backgroundImage: `url(${imagenDeEncabezado || 'none'})`,
      }}
    >
      <div
        className="text-center max-w-lg"
        style={{ width: '100%', maxWidth: '100%', alignSelf: 'flex-end' }}
      >
        <div className="page-title__image-container">
          <div
            className={`p-4 page-title__info ${
              imagenDeEncabezado ? 'page-title__info--inverse' : ''
            }`}
          >
            <h1 className="text-5xl pb-4">{titulo && <span>{titulo}</span>}</h1>
            {subtitulo && <h2>{subtitulo && <span>{subtitulo}</span>}</h2> }
            {descripcion && <span>{descripcion}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageTitle;
