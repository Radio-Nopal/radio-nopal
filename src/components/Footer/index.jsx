import React from 'react';
import nopalLogo from '../../assets/images/nopal.svg';
import SocialNetworksLinks from '../SocialNetworksLinks';
import './Footer.scss';

function Footer() {
  return (
    <div className="bg-black w-full">
      <footer className="footer m-auto max-w-7xl p-8 grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-8 text-white relative z-0">

        <div>
          Radio Nopal

          <br />

          José Rosas Moreno 123 A, Colonia San Rafael, 06470, CDMX
          <br />
          <a href="mailto:contacto@radionopal.com">contacto@radionopal.com</a>
        </div>
        <div />
        <div>
          <a className="underline" href="https://radionopal.us18.list-manage.com/subscribe?u=57b34f7f4e73dc46a559eff4e&id=cfdfd29eb2" target="_blank" rel="noreferrer">
            Suscríbete a nuestro News Letter
          </a>
          <div className="flex pt-2">
            <SocialNetworksLinks color="white" />
          </div>
        </div>
        <div>
          <img
            src={nopalLogo}
            className="footer__nopal-img invert-svg m-auto md:m-0"
            alt="Radio Nopal logo"
          />
        </div>
      </footer>
    </div>
  );
}

export default Footer;
