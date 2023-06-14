import React, { useEffect } from 'react';
import { fetchDeploys, useAppDispatch } from 'src/store';

export const DeploysTable: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDeploys());
  }, [dispatch]);

  // TODO: ticket #393
  return <>deploys table placeholder</>;
};
