import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="block bg-casper-blue text-white text-xs text-center py-25">
      <p>Casper Node version: 1.4.8 (b94c4f79a)</p>
      <p>Network Name: `integration-test`</p>
    </footer>
  );
};
