import React from 'react';
import { Helmet } from 'react-helmet-async';
import { loadConfig } from 'src/utils';

interface PageHeadProps {
  pageTitle: string;
}

const { title, faviconUrl } = loadConfig();

export const PageHead: React.FC<PageHeadProps> = ({ pageTitle }) => {
  return (
    <Helmet>
      <link rel="icon" href={faviconUrl} />
      <title>
        {pageTitle} | {title}
      </title>
    </Helmet>
  );
};
