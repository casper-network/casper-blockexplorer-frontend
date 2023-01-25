import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppSelector, appTitle, appFaviconUrl } from 'src/store';

interface PageHeadProps {
  pageTitle: string;
}

export const PageHead: React.FC<PageHeadProps> = ({ pageTitle }) => {
  const favicon = useAppSelector(appFaviconUrl);
  const mainTitle = useAppSelector(appTitle);

  const title = `${pageTitle} | ${mainTitle}`;

  return (
    <Helmet>
      <link rel="icon" href={favicon} />
      <title>{title}</title>
    </Helmet>
  );
};
