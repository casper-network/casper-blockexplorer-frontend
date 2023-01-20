import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDeploy } from 'src/hooks';
import {
  DeployDetailsCard,
  Grid,
  PageWrapper,
  TransactionDetailsCard,
} from '../components';

export const DeployPage: React.FC = () => {
  const { id: deployHash } = useParams();

  const {
    data,
    isLoading,
    error: deployError,
  } = useDeploy({ hash: deployHash || '' });

  const error = useMemo(() => {
    if (deployError) return { message: deployError.response?.statusText || '' };
  }, [deployError]);

  return (
    <PageWrapper error={error} isLoading={isLoading}>
      {data && (
        <Grid gap="2.5rem">
          <DeployDetailsCard deploy={data} />
          <TransactionDetailsCard deploy={data} />
        </Grid>
      )}
    </PageWrapper>
  );
};
