import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tilt } from 'react-tilt';
import HamburgerMenu from 'react-hamburger-menu';
import Menu from '../Menu/Menu';
import VolumeSlider from '../VolumeSlider/VolumeSlider';
import SearchBar from '../SearchBar/SearchBar';
import nopalLogo from '../../assets/images/nopal.svg';
import StreamingPlayer from '../StreamingPlayer';
import StreamingStatusIndicator from './StreamingStatusIndicator';
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
      ([e]) => e.target.classList.toggle('header--is-pinned', e.intersectionRatio < 1),
      { threshold: [1] },
    );
    observer.observe(document.querySelector('.header'));
  }, []);

  const ocultarMenu = () => {
    setState({ showMenu: false });
  };

  return (
    <div className="-top-1 sticky z-10">
      <header className="header">
        <div className="header__container p-3 w-full rounded-2xl">
          <div className="grid grid-cols-8 gap-4 h-5/6 m-auto 2xl:max-w-7xl">
            <div className="header__col gap-0 md:gap-8 flex md:block col-span-7 md:col-span-3 justify-between items-start h-0">
              <div className="flex items-center w-full">
                <Link to="/">
                  <Tilt>
                    <img className="header__logo mr-4" src={nopalLogo} alt="Radio Nopal logo" />
                  </Tilt>
                </Link>
              </div>
            </div>
            <div className="col-span-1 md:col-span-5 flex space-between ml-auto items-center">
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
      <div className="bg-black rounded-xl overflow-hidden">
        <div className="flex flex-wrap m-auto 2xl:max-w-7xl">
          <StreamingStatusIndicator />
          <StreamingPlayer streamingId={1} />
          <StreamingPlayer streamingId={2} />
          <StreamingPlayer streamingId={3} nombreDeStream="Castillo De Chapultepec" />
        </div>
      </div>
    </div>
  );
}

export default Header;
