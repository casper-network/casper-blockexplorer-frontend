import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export interface NavProps {
  readonly title: string;
  readonly path: string;
}

const navItems = [
  {
    title: 'Home',
    path: '/',
    key: 'home',
  },
  {
    title: 'Peers',
    path: '/peers',
    key: 'peers',
  },
];

export const Navbar: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const windowWidth = window.innerWidth;

  useEffect(() => {
    const closeDropdown = () => {
      if (windowWidth > 1024) {
        setIsOpened(false);
      }
    };

    window.addEventListener('resize', closeDropdown);
  }, [windowWidth]);

  return (
    <nav className="z-10 w-full py-10 pb-10 pr-10 lg:pt-20 lg:pr-56 bg-[#181B38]">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-row justify-end lg:justify-between">
          <button
            type="button"
            className="lg:hidden bg-transparent border-none"
            onClick={() => setIsOpened(!isOpened)}>
            {isOpened ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="white"
                className="w-24 h-24">
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-24 h-24">
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
        <button
          type="button"
          className={`bg-[#181B38] border-none lg:flex lg:space-x-12 lg:flex-row lg:w-auto ${
            isOpened
              ? 'absolute z-10 w-screen mt-20 pb-25 bg-[#181B38] flex flex-col align-items lg:mt-0'
              : 'hidden'
          }`}>
          {navItems.map(({ path, title, key }) => {
            return (
              <Link
                to={path}
                className="text-white py-5 xxs:py-11 lg:py-0 w-full"
                key={key}>
                {title}
              </Link>
            );
          })}
        </button>
      </div>
    </nav>
  );
};
