import React, { useEffect, useMemo } from 'react';
import useAsyncEffect from 'use-async-effect';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  fetchAccount,
  useAppDispatch,
  useAppSelector,
  getAccount,
  getAccountErrorMessage,
  fetchBalance,
  getBalance,
} from 'src/store';
import { AccountDetailsCard, PageHead, PageWrapper } from '../components';

export const AccountPage: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAccount(id ?? ''));
  }, [dispatch, id]);

  const account = useAppSelector(getAccount);
  const accountBalance = useAppSelector(getBalance);
  const accountErrorMessage = useAppSelector(getAccountErrorMessage);

  useAsyncEffect(async () => {
    if (account) {
      await dispatch(fetchBalance(account.mainPurse));
    }
  }, [account]);

  const error = useMemo(() => {
    if (accountErrorMessage) return { message: accountErrorMessage };
  }, [accountErrorMessage]);

  const pageTitle = `${t('account-details')}`;

  return (
    <PageWrapper error={error} isLoading={false}>
      <PageHead pageTitle={pageTitle} />
      <AccountDetailsCard account={account} balance={accountBalance} />
    </PageWrapper>
  );
};
