import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  fetchDeploy,
  getDeploy,
  getDeployErrorMessage,
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
  }, [dispatch, deployHash]);

  const deploy = useAppSelector(getDeploy);
  const deployLoadingStatus = useAppSelector(getDeployLoadingStatus);
  const deployErrorMessage = useAppSelector(getDeployErrorMessage);

  const isLoading = deployLoadingStatus !== Loading.Complete;

  const pageTitle = `${t('deploy-details')}`;

  const error = useMemo(() => {
    if (deployErrorMessage) return { message: deployErrorMessage };
  }, [deployErrorMessage]);

  return (
    <PageWrapper error={error} isLoading={false}>
      <PageHead pageTitle={pageTitle} />
      <Grid gap="2.5rem">
        <DeployDetailsCard deploy={deploy} isLoading={isLoading} />
        <TransactionDetailsCard deploy={deploy} isLoading={isLoading} />
      </Grid>
    </PageWrapper>
  );
};
