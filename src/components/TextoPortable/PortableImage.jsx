import React from 'react';
import { urlDeImagen } from '../../util/sanityClient';

function PortableImage({ value, isInline }) {
  const imageUrl = value
    ? urlDeImagen(value).width(1200).quality(80).auto('format')
      .url()
    : '';
  const altText = value?.alt || ' ';
  const enlace = value?.enlace;

  if (!imageUrl) return null;

  const imageElement = (
    <img
      src={imageUrl}
      alt={altText}
      loading="lazy"
      className="rounded-3xl w-full"
      style={{
        margin: 'auto',
        // Display alongside text if image appears inside a block text span
        display: isInline ? 'inline-block' : 'block',
      }}
    />
  );

  return enlace ? (
    <a href={enlace} target="_blank" rel="noopener noreferrer">
      {imageElement}
    </a>
  ) : (
    imageElement
  );
}

export default PortableImage;
