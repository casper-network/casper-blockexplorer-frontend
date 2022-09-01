import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './header-assets/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  // TODO: remove this when used
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState('');

  const submitValue = async () => {
    const trimedValue = search.trim();

    // TODO: Move this magic strings to some consts
    if (trimedValue.length === 66 || trimedValue.length === 68) {
      navigate(`/account/${trimedValue}`);
    } else if (trimedValue.length === 64) {
      console.log('deploy');
      navigate(`/deploy/${trimedValue}`);
    } else {
      alert('Wrong value');
    }
  };

  return (
    <div className="bg-[#181C36]">
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
        <div className="flex justify-center pb-30 pl-30">
          <div className="flex inset-y-0 left-0 items-center pl-3 pointer-events-none"></div>
          <input
            value={search}
            onChange={ev => setSearch(ev.target.value)}
            type="search"
            id="search"
            className="block p-4 pl-10 w-400 text-sm text-gray-900 bg-gray-50 rounded-lg border-none focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Public Key or Deploy Hash"
            required
          />
          <button
            onClick={submitValue}
            type="submit"
            className="bg-[#FF0013] relative right-30 right-0 hover:bg-red-400 focus:ring-1  focus:ring-blue-300 font-medium rounded-lg ">
            <svg
              aria-hidden="true"
              className="w-20 h-20 text-white pt-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Header;
