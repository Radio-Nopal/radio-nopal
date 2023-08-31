import React from 'react';
import { NavLink } from 'react-router-dom';
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
          <NavLink to="/programacion">Programación</NavLink>
        </li>
        <li>
          <NavLink to="/somos">Somos</NavLink>
        </li>
        <li>
          <NavLink reloadDocument to="/info/educativa">Educativa</NavLink>
        </li>
        <li>
          <NavLink reloadDocument to="/info/residencia">Residencia</NavLink>
        </li>
        <li>
          <NavLink reloadDocument to="/info/apoyanos">Apóyanos</NavLink>
        </li>
        <br />
        <li>
          <SearchBar ocultarMenu={ocultarMenu} />
        </li>
        <br />
        <li>
          <NavLink to="/">
            <img
              src={nopalLogo}
              className="footer__nopal-img"
              alt="Radio Nopal logo"
            />
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
