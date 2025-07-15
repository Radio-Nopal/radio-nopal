import React from 'react';
import { PortableText } from '@portabletext/react';
import PortableImage from './PortableImage';
import ImageGallery from './ImageGallery';

const myPortableTextComponents = {
  types: {
    image: PortableImage,
    imageGallery: ImageGallery,
    embed: ({ value }) => {
      const { iframeHtml } = value;
      if (!iframeHtml) return null;
      return (
        <div
          style={{ margin: '20px 0' }}
          dangerouslySetInnerHTML={{ __html: iframeHtml }}
        />
      );
    },
  },

  marks: {
    link: ({ children, value }) => {
      const isExternal = !value?.href?.startsWith('/');
      const target = value?.blank ? '_blank' : undefined;
      const rel = isExternal ? 'noreferrer noopener' : undefined;

      return (
        <a href={value?.href} target={target} rel={rel}>
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
