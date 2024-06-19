'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
          <Link href="/" onClick={handleCloseMenu}>
            Inicio
          </Link>
        </li>
        <li>
          <Link href="/programacion" onClick={handleCloseMenu}>
            Programación
          </Link>
        </li>
        <li>
          <Link href="/somos" onClick={handleCloseMenu}>
            Somos
          </Link>
        </li>
        <li>
          <Link href="/archivo" onClick={handleCloseMenu}>
            Archivo
          </Link>
        </li>
        <li>
          <Link href="/info/educativa" onClick={handleCloseMenu}>
            Educativa
          </Link>
        </li>
        <li>
          <Link href="/info/residencia" onClick={handleCloseMenu}>
            Residencia
          </Link>
        </li>
        <li>
          <Link href="/info/apoyanos" onClick={handleCloseMenu}>
            Apóyanos
          </Link>
        </li>
        <li>
          <Link href="/lugares-que-nos-apoyan" onClick={handleCloseMenu}>
            Lugares que nos apoyan
          </Link>
        </li>
        <br />
        <li>
          <SearchBar ocultarMenu={ocultarMenu} />
        </li>
        <br />
        <li>
          <Link href="/" onClick={handleCloseMenu}>
            <Image
              src={nopalLogo}
              width={'auto'}
              height={60}
              alt="Radio Nopal logo"
            />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
