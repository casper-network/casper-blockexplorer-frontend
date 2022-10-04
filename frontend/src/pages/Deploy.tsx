import React, { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { useParams } from 'react-router-dom';
import { Deploy } from '../types';
import {
  DeployDetailsCard,
  GradientHeading,
  Hash,
  PageError,
  PageWrapper,
} from '../components';

import { casperApi } from '../api';

export const DeployPage: React.FC = () => {
  const { id: deployHash } = useParams();

  const [deploy, setDeploy] = useState<Deploy>();
  const [error, setError] = useState<PageError>();

  useAsyncEffect(async () => {
    if (deployHash) {
      try {
        const deployData = await casperApi.getDeploy(deployHash);

        if (!deployData) {
          setError({
            message: `We were unable to locate deploy data for hash ${deployHash}`,
          });
          return;
        }

        setDeploy(deployData);
      } catch (err: any) {
        setError({
          message: (err as Error).message,
        });
      }
    }
  }, [deployHash]);

  const isLoading = !deploy;

  return (
    <PageWrapper error={error} isLoading={isLoading}>
      {!isLoading && deployHash && (
        <>
          <div className="w-full text-black mb-24">
            <GradientHeading type="h2">
              Deploy: <Hash hash={deployHash} alwaysTruncate />
            </GradientHeading>
          </div>
          <DeployDetailsCard deploy={deploy} />
        </>
      )}
    </PageWrapper>
  );
};
