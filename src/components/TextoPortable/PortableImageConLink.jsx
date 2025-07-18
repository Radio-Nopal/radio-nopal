import React from 'react';
import { urlDeImagen } from '../../util/sanityClient';

function PortableImage({ value, isInline }) {
  const altText = value?.alt || ' ';
  const enlace = value?.enlace;
  const target = value?.linkTarget;
  const imageUrl = urlDeImagen(value?.imagen)?.url();
  if (!imageUrl) return null;

  const imageElement = (
    <img
      src={imageUrl}
      alt={altText}
      loading="lazy"
      className="rounded-3xl w-full"
      style={{
        margin: 'auto',
        display: isInline ? 'inline-block' : 'block',
      }}
    />
  );

  return enlace ? (
    <a href={enlace} target={target ? '_blank' : '_self'} rel="noopener noreferrer">
      {imageElement}
    </a>
  ) : (
    imageElement
  );
}

export default PortableImage;
