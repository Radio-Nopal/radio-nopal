import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.scss';

function Menu({ showMenu }) {
  return (
    <div
      className={`menu z-10 fixed top-0 w-screen h-screen ${
        showMenu ? 'menu--show' : 'menu--hidden'
      }`}
    >
      <ul>
        <li>
          <Link to="/programacion">Programación</Link>
        </li>
        <li>
          <Link to="/">Residencia</Link>
        </li>
        <li>educativa</li>
        <li>archivo</li>
      </ul>
    </div>
  );
}

export default Menu;
