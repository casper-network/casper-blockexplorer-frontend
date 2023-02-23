import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  fetchValidators,
  getValidatorLoadingStatus,
  getValidators,
  Loading,
  useAppDispatch,
  useAppSelector,
} from 'src/store';
import {
  GradientHeading,
  PageHead,
  PageWrapper,
  ValidatorTable,
} from '../components';

export const Validators: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchValidators());
  }, [dispatch]);

  const validators = useAppSelector(getValidators);
  const validatorsLoadingStatus = useAppSelector(getValidatorLoadingStatus);

  const isLoading = validatorsLoadingStatus !== Loading.Complete;

  const pageTitle = `${t('validators')}`;

  return (
    <PageWrapper isLoading={isLoading}>
      <PageHead pageTitle={pageTitle} />
      <GradientHeading type="h2">{t('active-validators')}</GradientHeading>
      {validators && <ValidatorTable validators={validators} />}
    </PageWrapper>
  );
};
