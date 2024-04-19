import React from 'react';
import { urlDeImagen } from '../../util/sanityClient';

function PortableImage({ value, isInline }) {
  // const { width, height } = getImageDimensions(value);
  return (
    <img
      src={urlDeImagen(value)?.url()}
      alt={value?.alt || ' '}
      loading="lazy"
      className="rounded-3xl w-full"
      style={{
        margin: 'auto',
        // Display alongside text if image appears inside a block text span
        display: isInline ? 'inline-block' : 'block',

        // Avoid jumping around with aspect-ratio CSS property
        // aspectRatio: width / height,
      }}
    />
  );
}

export default PortableImage;
