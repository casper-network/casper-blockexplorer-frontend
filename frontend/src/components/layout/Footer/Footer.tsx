import React from 'react';
import { useSelector } from 'react-redux';
import { useAppSelector, getNetworkStatus } from '../../../store';

export const Footer: React.FC = () => {
  const { version, build, networkName } = useAppSelector(getNetworkStatus);

  return (
    <footer className="block bg-casper-blue text-white text-xs text-center py-25">
      <p>
        Casper Node version: {version} ({build})
      </p>
      <p>Network Name: {networkName}</p>
    </footer>
  );
};
