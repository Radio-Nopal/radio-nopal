'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.scss';

function SearchBar({ fullWidth, ocultarMenu }) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const onChange = (e) => setSearchTerm(e.target.value);

  const redirect = () => {
    ocultarMenu();
    if (searchTerm.length > 0) router.push(`/busqueda/${searchTerm}`);
  };

  const onKeyUp = (e) => {
    if (e.which === 13) {
      redirect();
    }
  };

  return (
    <div className={`search-bar ${fullWidth ? '' : 'md:w-1/5'} mt-1 w-full flex`}>
      <button type="button" className="ml-2" onClick={redirect}>
        <FaSearch />
      </button>
      <input
        type="text"
        className="w-full pl-2"
        name="search"
        onKeyUp={onKeyUp}
        onChange={onChange}
        value={searchTerm}
      />
    </div>
  );
}

export default SearchBar;
