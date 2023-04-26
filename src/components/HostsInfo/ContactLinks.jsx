import React from 'react';
import {
  FaTwitterSquare,
  FaGlobe,
  FaInstagram,
  FaFacebookSquare,
  FaMailBulk,
  FaLink,
} from 'react-icons/fa';

const renderIcon = (param) => {
  switch (param) {
    case 'email':
      return <FaMailBulk className="inline" />;
    case 'sitioWeb':
      return <FaLink className="inline" />;
    case 'instagram':
      return <FaInstagram className="inline" />;
    case 'facebook':
      return <FaFacebookSquare className="inline" />;
    case 'twitter':
      return <FaTwitterSquare className="inline" />;
    default:
      return <FaGlobe className="inline" />;
  }
};

const obtenerUrl = (medio, usuario) => {
  switch (medio) {
    case 'email':
      return `mailto:${usuario}`;
    case 'sitioWeb':
      return usuario;
    case 'instagram':
      return `https://www.instagram.com/${usuario}`;
    case 'facebook':
      return `https://www.facebook.com/${usuario}`;
    case 'twitter':
      return `https://www.twitter.com/${usuario}`;
    default:
      return usuario;
  }
};

const ContactLinks = ({ mediosDeContacto }) => mediosDeContacto
  .map(({ _key, medio, usuario }) => (
    <a key={_key} href={obtenerUrl(medio, usuario)} target="_blank" rel="noreferrer" alt={usuario} className="pr-1">
      {renderIcon(medio)}
    </a>
  ));

export default ContactLinks;
