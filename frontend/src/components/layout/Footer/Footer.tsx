import React from 'react';
import { loadConfig } from '../../../utils';
import { useAppSelector, getNetworkStatus } from '../../../store';

const { orgName } = loadConfig();

export const Footer: React.FC = () => {
  const { version, build, networkName } = useAppSelector(getNetworkStatus);

  return (
    <footer className="block bg-casper-blue text-white text-xs text-center py-25">
      <p>
        {orgName} Node version: {version} ({build})
      </p>
      <p>Network Name: {networkName}</p>
    </footer>
  );
};
