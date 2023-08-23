import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import nopalLogo from '../../assets/images/nopal.svg';
import './Menu.scss';

function Menu({ showMenu, ocultarMenu }) {
  return (
    <div
      className={`menu p-12 z-10 text-4xl fixed top-0 w-screen h-screen ${
        showMenu ? 'menu--show' : 'menu--hidden'
      }`}
    >
      <ul>
        <li>
          <Link to="/programacion">Programación</Link>
        </li>
        <li>
          <Link to="/somos">Somos</Link>
        </li>
        <li>
          <Link to="/info/residencia">Residencia</Link>
        </li>
        <li>
          <Link to="/info/educativa">Educativa</Link>
        </li>
        <li>
          <Link to="/archivo">Archivo</Link>
        </li>
        <br />
        <li>
          <SearchBar ocultarMenu={ocultarMenu} />
        </li>
        <br />
        <li>
          <div className="text-center">
            <img
              src={nopalLogo}
              className="footer__nopal-img"
              alt="Radio Nopal logo"
            />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
