import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  // TODO: remove this when used
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState('');

  const submitValue = () => {
    const trimmedValue = search.trim();

    // TODO: Move this magic strings to some constant variables
    if (trimmedValue.length === 66 || trimmedValue.length === 68) {
      navigate(`/account/${trimmedValue}`);
    } else if (trimmedValue.length === 64) {
      console.log('deploy');
      navigate(`/deploy/${trimmedValue}`);
    } else {
      alert('Wrong value');
    }
  };

  return (
    <div className="bg-[#171B38]">
      <div className="flex flex-row justify-center py-35 xxs:py-50 xmd:h-175 xmd:flex-col xmd:justify-center xmd:pl-50">
        <div className="flex flex-row ">
          <img className="h-35 xxs:h-50" src={logo} alt="Casper Logo" />
          <h1 className="text-white text-21 xxs:text-24 xxs:pt-6  xmd:pl-15">
            Casper BlockExplorer
          </h1>
        </div>
      </div>
      <form>
        <label htmlFor="default-search" className="sr-only">
          Search
        </label>
        <div className="flex relative justify-center pb-30 pl-30">
          <input
            value={search}
            onChange={ev => setSearch(ev.target.value)}
            type="search"
            id="search"
            className="block p-4 pr-32 pl-10 w-400 text-sm text-gray-900 bg-gray-50 rounded-lg border-none focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Public Key or Deploy Hash"
            required
          />
          <button
            onClick={submitValue}
            type="submit"
            className="bg-[#FF0013] relative right-32 hover:bg-red-400 focus:ring-1  focus:ring-blue-300 font-medium rounded-lg ">
            <svg
              aria-hidden="true"
              className="w-20 h-20 text-white pt-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};
