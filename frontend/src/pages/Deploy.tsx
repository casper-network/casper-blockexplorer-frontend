import React, { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { appTitle, useAppSelector } from 'src/store';
import { casperApi, Deploy } from '../api';
import {
  DeployDetailsCard,
  Grid,
  PageError,
  PageWrapper,
  TransactionDetailsCard,
} from '../components';

export const DeployPage: React.FC = () => {
  const { id: deployHash } = useParams();

  const { t } = useTranslation();

  const [deploy, setDeploy] = useState<Deploy>();
  const [error, setError] = useState<PageError>();

  useAsyncEffect(async () => {
    if (deployHash) {
      try {
        const deployData = await casperApi.getDeploy(deployHash);

        if (!deployData) {
          setError({
            message: `${t('unable-to-locate-deploy')} ${deployHash}`,
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

  const title = useAppSelector(appTitle);

  const deployTitle = `${t('deploy-details')} | ${title}`;

  return (
    <PageWrapper error={error} isLoading={isLoading}>
      <Helmet>
        <title>{deployTitle}</title>
      </Helmet>
      {!isLoading && deployHash && (
        <Grid gap="2.5rem">
          <DeployDetailsCard deploy={deploy} />
          <TransactionDetailsCard deploy={deploy} />
        </Grid>
      )}
    </PageWrapper>
  );
};
