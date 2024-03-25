import React from 'react';
import {
  FaInstagram, FaPatreon, FaTwitterSquare, FaMixcloud, FaCoffee, FaFacebook, FaTiktok,
} from 'react-icons/fa';
import './SocialNetworksLinks.scss';

function SocialNetworksLinks({ color }) {
  const size = '1.2em';
  const style = { '--header-text-color': color || 'black' };
  return (
    <div className="social-network-links md:justify-end" style={style}>
      <div
        className="flex"
      >
        <a href="https://twitter.com/radio_nopal" rel="noreferrer" target="_blank">
          <FaTwitterSquare size={size} />
        </a>
        <a href="https://www.instagram.com/radionopal/" rel="noreferrer" target="_blank">
          <FaInstagram size={size} />
        </a>

        <a href="https://www.patreon.com/nopalradio" rel="noreferrer" target="_blank">
          <FaPatreon size={size} />
        </a>
        <a href="https://www.mixcloud.com/radionopal/" rel="noreferrer" target="_blank">
          <FaMixcloud size={size} />
        </a>
        <a href="https://www.buymeacoffee.com/radionopal" rel="noreferrer" target="_blank">
          <FaCoffee size={size} />
        </a>
        <a href="https://www.facebook.com/RadioNopal/" rel="noreferrer" target="_blank">
          <FaFacebook size={size} />
        </a>
        <a href="https://www.tiktok.com/@radionopal" rel="noreferrer" target="_blank">
          <FaTiktok size={size} />
        </a>
      </div>
    </div>
  );
}

export default SocialNetworksLinks;
