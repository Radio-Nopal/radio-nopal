import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HamburgerMenu from 'react-hamburger-menu';
import Menu from '../Menu/Menu';
import VolumeSlider from '../VolumeSlider/VolumeSlider';
import SearchBar from '../SearchBar/SearchBar';
import PlayerContainer from './PlayerContainer';
import radionopalLogo from '../../assets/images/logo.svg';
import './Header.scss';

const initialState = {
  scroll: false,
  volume: 0.9,
  showMenu: false,
};

function Header() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const observer = new IntersectionObserver(
      // ([e]) => e.target.toggleAttribute('stuck', e.intersectionRatio < 1),
      ([e]) => e.target.classList.toggle('header--is-pinned', e.intersectionRatio < 1),
      { threshold: [1] },
    );
    observer.observe(document.querySelector('.header'));
  }, []);

  const ocultarMenu = () => {
    setState({ showMenu: false });
  };

  return (
    <header className="header -top-1 sticky z-10">
      <div className="header__container p-3 w-full">
        <div className="grid grid-cols-8 gap-4 h-5/6">
          <div className="header__col gap-2 md:gap-8 flex md:block col-span-6 md:col-span-3 justify-between items-start h-0">
            <div className="flex items-center">
              <Link to="/">
                <img className="header__logo mr-4" src={radionopalLogo} alt="Radio Nopal logo" />
              </Link>
              <PlayerContainer />
            </div>
          </div>
          <div className="col-span-2 md:col-span-5 flex space-between ml-auto items-center">
            <div className="flex items-start mr-4">
              <VolumeSlider />
            </div>
            <div className="hidden md:block w-2/4">
              <SearchBar fullWidth ocultarMenu={ocultarMenu} />
              <div className="header__links hidden absolute pt-1 right-8 justify-end" />
            </div>
            <div className="float-right mt-1 md:ml-4 relative">
              <HamburgerMenu
                className="header__hamburger-menu cursor-pointer z-40"
                isOpen={state.showMenu}
                menuClicked={() => setState((prev) => ({ ...prev, showMenu: !state.showMenu }))}
                width={18}
                height={15}
                strokeWidth={3}
                animationDuration={0.5}
                color="gray"
              />
            </div>
          </div>
        </div>
      </div>
      <Menu showMenu={state.showMenu} ocultarMenu={ocultarMenu} />
    </header>
  );
}

export default Header;
