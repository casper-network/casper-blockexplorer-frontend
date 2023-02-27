import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  fetchCurrentEraValidatorStatus,
  fetchValidators,
  getCurrentEraValidatorStatusStatus,
  getValidatorLoadingStatus,
  getValidators,
  getValidatorsTableOptions,
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
  const [isTableLoading, setIsTableLoading] = useState(false);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const validators = useAppSelector(getValidators);
  const validatorsTableOptions = useAppSelector(getValidatorsTableOptions);
  const validatorsLoadingStatus = useAppSelector(getValidatorLoadingStatus);
  const validatorsStatusLoadingStatus = useAppSelector(
    getCurrentEraValidatorStatusStatus,
  );

  useEffect(() => {
    dispatch(fetchCurrentEraValidatorStatus());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchValidators(validatorsTableOptions));
  }, [dispatch, validatorsTableOptions]);

  useEffect(() => {
    if (isTableLoading) {
      setIsTableLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validators]);

  const isPageLoading =
    validatorsLoadingStatus !== Loading.Complete ||
    validatorsStatusLoadingStatus !== Loading.Complete ||
    !validators.length;

  const pageTitle = `${t('validators')}`;

  return (
    <PageWrapper isLoading={false}>
      <PageHead pageTitle={pageTitle} />
      <GradientHeading type="h2">{t('active-validators')}</GradientHeading>
      <ValidatorTable
        validators={validators}
        isTableLoading={isTableLoading || isPageLoading}
        setIsTableLoading={setIsTableLoading}
      />
    </PageWrapper>
  );
};
