import React from 'react';
import { PortableText } from '@portabletext/react';
// import { getImageDimensions } from '@sanity/asset-utils';
import { urlDeImagen } from '../util/sanityClient';

function SampleImageComponent({ value, isInline }) {
  // const { width, height } = getImageDimensions(value);
  return (
    <img
      src={urlDeImagen(value)?.url()}
      alt={value.alt || ' '}
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

const myPortableTextComponents = {
  types: {
    image: SampleImageComponent,
  },

  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel}>
          {children}
        </a>
      );
    },
  },
};

function TextoPortable({ value, className = '' }) {
  return (
    <div className={`portable-text overflow-hidden ${className}`}>
      <PortableText
        value={value}
        components={myPortableTextComponents}
        onMissingComponent={(e) => { console.warn(e); }}
      />
    </div>
  );
}

export default TextoPortable;
