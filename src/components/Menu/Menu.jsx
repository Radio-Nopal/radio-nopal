import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import nopalLogo from '../../assets/images/nopal.svg';
import './Menu.scss';

function Menu({ showMenu, ocultarMenu }) {
  const handleCloseMenu = () => {
    ocultarMenu();
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        ocultarMenu();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [ocultarMenu]);

  return (
    <div
      className={`menu p-12 z-10 text-4xl fixed top-0 w-screen h-screen ${
        showMenu ? 'menu--show' : 'menu--hidden'
      }`}
    >
      <ul>
        <li>
          <NavLink to="/programacion" onClick={handleCloseMenu}>Programación</NavLink>
        </li>
        <li>
          <NavLink to="/somos" onClick={handleCloseMenu}>Somos</NavLink>
        </li>
        <li>
          <NavLink to="/archivo" onClick={handleCloseMenu}>Archivo</NavLink>
        </li>
        <li>
          <NavLink reloadDocument to="/info/educativa" onClick={handleCloseMenu}>Educativa</NavLink>
        </li>
        <li>
          <NavLink reloadDocument to="/info/residencia" onClick={handleCloseMenu}>Residencia</NavLink>
        </li>
        <li>
          <NavLink reloadDocument to="/info/apoyanos" onClick={handleCloseMenu}>Apóyanos</NavLink>
        </li>
        <br />
        <li>
          <SearchBar ocultarMenu={ocultarMenu} />
        </li>
        <br />
        <li>
          <NavLink to="/" onClick={handleCloseMenu}>
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
