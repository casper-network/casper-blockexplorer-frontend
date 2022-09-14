import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Navbar } from '../Navbar/Navbar';
import logo from '../../../assets/images/logo.png';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('account');
  // TODO: remove this when used
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState('');

  // TODO: Move this magic strings to some constant variables

  const submitValue = () => {
    const trimmedValue = search.trim();
    const isHexadecimal = /^[A-F0-9]+$/i.test(search);
    const notPublicKey = !/^0(1[0-9a-fA-F]{64}|2[0-9a-fA-F]{66})$/.test(
      trimmedValue,
    );

    switch (filter) {
      case 'account':
        if (/^0(1[0-9a-fA-F]{64}|2[0-9a-fA-F]{66})$/.test(trimmedValue)) {
          navigate(`/account/${trimmedValue}`);
        } else alert('Please enter a valid public key.');
        break;
      case 'deploy':
        if (isHexadecimal && notPublicKey) {
          navigate(`/deploy/${trimmedValue}`);
        } else alert('Please enter a valid deploy hash.');
        break;
      case 'block':
        if (isHexadecimal && notPublicKey) {
          navigate(`/block/${trimmedValue}`);
        } else alert('Please enter a valid block hash.');
        break;
      default:
        return null;
    }
  };

  return (
    <header className="w-full bg-casper-blue flex justify-center">
      <div className="relative w-full max-w-1600 pl-22 md:pl-30 xl:pl-46 pr-28 md:pr-36 xl:pr-52">
        <div className="flex flex-row justify-center pt-20 pb-30">
          <Link className="no-underline flex flex-row items-center" to="/">
            <div className="flex flex-row items-center">
              <img className="h-40 xxs:h-50" src={logo} alt="Casper Logo" />
              <p className="text-white text-18 xs:text-20 sm:text-24 md:text-26 pl-10 lg:pl-12 font-bold w-20ch">
                Casper BlockExplorer
              </p>
            </div>
          </Link>
          <Navbar />
        </div>
        <form>
          <label htmlFor="default-search" className="sr-only">
            Search
          </label>
          <div className="bg-casper-blue flex relative justify-center pb-50 pt-4">
            <select
              onChange={ev => setFilter(ev.target.value)}
              className="relative left-10 w-90 h-32 sm:h-36 md:h-42 text-center rounded-r-none bg-casper-red rounded-lg border-none text-white focus:outline-none text-12 xs:text-13 sm:text-14 md:text-16 xxs:w-105">
              <option value="account">Account</option>
              <option value="deploy">Deploy</option>
              <option value="block">Block</option>
            </select>
            <input
              value={search}
              onChange={ev => setSearch(ev.target.value)}
              type="search"
              id="search"
              className="block p-4 sm:p-6 md:p-10 pl-20 sm:pl-20 md:pl-20 text-xs text-gray-900 bg-gray-50 rounded-lg border-1 border-solid border-gray-400 focus:outline-none w-full max-w-280 xxs:max-w-400 xxs:text-sm xxs:pr-32"
              required
            />
            <button
              onClick={submitValue}
              type="submit"
              className="bg-casper-red relative right-20 px-16 hover:bg-red-400 focus:outline-none font-medium rounded-r-lg border-none">
              <svg
                aria-hidden="true"
                className="w-24 h-24 text-white pt-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </header>
  );
};
