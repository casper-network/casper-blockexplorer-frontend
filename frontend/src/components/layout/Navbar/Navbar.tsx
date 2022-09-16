import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../store';
import { getBounds } from '../../../store';

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
  const bounds = useAppSelector(getBounds);

  const windowWidth = bounds?.width || 0;

  if (isOpened && windowWidth > 1024) {
    setIsOpened(false);
  }

  useEffect(() => {
    const escKeyHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();

        if (isOpened) {
          setIsOpened(false);
        }
      }
    };

    document.addEventListener('keydown', escKeyHandler);

    return () => {
      document.removeEventListener('keydown', escKeyHandler);
    };
  }, [isOpened]);

  return (
    <nav className="z-10 w-full py-10 lg:py-20 bg-[#181B38]">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="z-30 flex flex-row justify-end lg:justify-between">
          <button
            type="button"
            className="lg:hidden bg-transparent border-none p-0 h-40"
            onClick={() => setIsOpened(!isOpened)}>
            {isOpened ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="white"
                className="w-40 h-40">
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-40 h-40">
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="bg-[#181B38] border-none lg:flex lg:space-x-12 lg:flex-row lg:w-auto">
          {isOpened && (
            <nav className="lg:hidden">
              <ul className="z-10 bg-casper-blue flex flex-col gap-4 absolute w-full h-full items-center justify-center left-0 top-0">
                {navItems.map(({ path, title, key }) => {
                  return (
                    <li key={key}>
                      <Link
                        to={path}
                        className="text-white text-22 py-5 xxs:py-11 w-full font-medium tracking-wide">
                        {title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
          <nav className="hidden lg:block">
            <ul className="flex gap-x-8">
              {navItems.map(({ path, title, key }) => {
                return (
                  <li key={key}>
                    <Link
                      to={path}
                      className="text-white text-18 py-5 xxs:py-11 lg:py-0 w-full font-medium tracking-wide">
                      {title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </nav>
  );
};
