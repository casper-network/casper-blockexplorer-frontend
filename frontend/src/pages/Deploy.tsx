import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  fetchDeploy,
  getDeploy,
  getDeployLoadingStatus,
  Loading,
  useAppDispatch,
  useAppSelector,
} from 'src/store';
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

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDeploy(deployHash ?? ''));
  }, []);

  const deploy = useAppSelector(getDeploy);
  const deployLoadingStatus = useAppSelector(getDeployLoadingStatus);

  const isLoading = deployLoadingStatus !== Loading.Complete;

  const pageTitle = `${t('deploy-details')}`;

  return (
    <PageWrapper isLoading={isLoading}>
      <PageHead pageTitle={pageTitle} />
      {deploy && (
        <Grid gap="2.5rem">
          <DeployDetailsCard deploy={deploy} />
          <TransactionDetailsCard deploy={deploy} />
        </Grid>
      )}
    </PageWrapper>
  );
};
