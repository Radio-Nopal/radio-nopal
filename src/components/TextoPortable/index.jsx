import React from 'react';
import { PortableText } from '@portabletext/react';
import PortableImage from './PortableImage';
import ImageGallery from './ImageGallery';
// import { getImageDimensions } from '@sanity/asset-utils';

const myPortableTextComponents = {
  types: {
    image: PortableImage,
    imageGallery: ImageGallery,
  },

  marks: {
    link: ({ children, value }) => {
      const rel = !value?.href?.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value?.href} rel={rel}>
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-2">{children}</li>,
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
