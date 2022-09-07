import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { Navbar } from '../Navbar/Navbar';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('account');
  // TODO: remove this when used
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState('');

  const submitValue = () => {
    const trimmedValue = search.trim();

    // TODO: Move this magic strings to some constant variables
    if (filter === 'account') {
      navigate(`/account/${trimmedValue}`);
    } else if (filter === 'deploy') {
      console.log('deploy');
      navigate(`/deploy/${trimmedValue}`);
    } else {
      alert('Wrong value');
    }
  };

  return (
    <div className="bg-[#171B38]">
      <Navbar />
      <div className="flex flex-row justify-center pb-35 pt-20 xxs:pt-50 xxs:py-50 xmd:h-155 lg:flex-col lg:justify-center lg:pl-50">
        <div className="flex flex-row">
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
        <div className="flex relative justify-center  pl-10 pb-30 xmd:pl-30 lg:pt-20">
          <select
            onChange={ev => setFilter(ev.target.value)}
            className="relative left-10 w-75 h-30 text-center rounded-r-none bg-[#FF0013] rounded-lg border-none text-white text-bold focus:outline-none text-xs xxs:text-sm xxs:w-95"
            name=""
            id="">
            <option value="account" defaultValue={''}>
              Account
            </option>
            <option value="deploy">Deploy</option>
          </select>
          <input
            value={search}
            onChange={ev => setSearch(ev.target.value)}
            type="search"
            id="search"
            className="block p-4 pl-20 w-200 text-xs  text-gray-900 bg-gray-50 rounded-lg  border-1 border-solid border-gray-400 focus:outline-none 
             xxs:w-400 xxs:text-sm xxs:pr-32"
            placeholder="Public Key or Deploy Hash"
            required
          />

          <button
            onClick={submitValue}
            type="submit"
            className="bg-[#FF0013] relative right-20 hover:bg-red-400 focus:outline-none  font-medium rounded-r-lg border-none">
            <svg
              aria-hidden="true"
              className="w-20 h-20 text-white pt-5"
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
  );
};
