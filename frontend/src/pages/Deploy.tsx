import React, { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { useParams } from 'react-router-dom';
import { Deploy } from '../types';
import { truncateHash } from '../utils';
import { DeployDetailsCard, Loader } from '../components';

import { getDeploy } from '../client';

export const DeployPage: React.FC = () => {
  const { id: deployHash } = useParams();

  const [deploy, setDeploy] = useState<Deploy>();
  const [error, setError] = useState<boolean>(false);

  useAsyncEffect(async () => {
    if (deployHash) {
      const deployData = await getDeploy(deployHash);

      if (!deployData) {
        setError(true);
        return;
      }

      setDeploy(deployData);
    }
  }, [deployHash]);

  if (!deployHash) {
    return (
      <div>
        <p>Error!</p>
      </div>
    );
  }

  if (!deploy) {
    return (
      <div className="bg-light-grey w-full px-48 my-24">
        <div className="w-full max-w-1200">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    <div className="bg-light-grey w-full px-48 my-24">
      <div className="w-full max-w-1200">
        <h2 className="text-24 mb-8">Whoops! Something went wrong!</h2>
        <p>We were unable to fetch block with hash:</p>
        <h3>{deployHash}</h3>
      </div>
    </div>;
  }

  const truncatedDeployHash = truncateHash(deployHash);

  return (
    <div className="bg-light-grey w-full px-48 pt-20 pl-20">
      <div className="w-full max-w-1200">
        <div className="w-full text-black mb-24">
          <h2 className="text-24 mb-16">
            Deploy:{' '}
            <span className="tracking-2 font-normal">
              {truncatedDeployHash}
            </span>
          </h2>
        </div>
        <DeployDetailsCard deploy={deploy} />
      </div>
    </div>
  );
};
