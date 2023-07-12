import React from 'react';
import {
  FaInstagram, FaPatreon, FaTwitterSquare, FaMixcloud,
} from 'react-icons/fa';
import './SocialNetworksLinks.scss';

function SocialNetworksLinks() {
  const size = '1.2em';
  return (
    <div className="social-network-links">
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
      </div>
    </div>
  );
}

export default SocialNetworksLinks;
