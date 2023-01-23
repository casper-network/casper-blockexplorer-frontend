import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useDeploy } from 'src/hooks';
import {
  DeployDetailsCard,
  Grid,
  PageHead,
  PageWrapper,
  TransactionDetailsCard,
} from '../components';

export const DeployPage: React.FC = () => {
  const { id: deployHash } = useParams();
  const { t } = useTranslation();
  const {
    data,
    isLoading,
    error: deployError,
  } = useDeploy({ hash: deployHash || '' });

  const error = useMemo(() => {
    if (deployError) return { message: deployError.response?.statusText || '' };
  }, [deployError]);

  const pageTitle = `${t('deploy-details')}`;

  return (
    <PageWrapper error={error} isLoading={isLoading}>
      <PageHead pageTitle={pageTitle} />
      {data && (
        <Grid gap="2.5rem">
          <DeployDetailsCard deploy={data} />
          <TransactionDetailsCard deploy={data} />
        </Grid>
      )}
    </PageWrapper>
  );
};
