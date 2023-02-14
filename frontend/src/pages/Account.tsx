import React, { useEffect, useMemo, useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  fetchAccount,
  Loading,
  useAppDispatch,
  useAppSelector,
} from 'src/store';
import {
  getAccount,
  getAccountErrorMessage,
  getAccountLoadingStatus,
} from 'src/store/selectors/account-selectors';
import { casperApi } from '../api';
import { AccountDetailsCard, PageHead, PageWrapper } from '../components';

export const AccountPage: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAccount(id ?? ''));
  }, []);

  const account = useAppSelector(getAccount);
  const accountLoadingStatus = useAppSelector(getAccountLoadingStatus);
  const accountErrorMessage = useAppSelector(getAccountErrorMessage);

  const isLoading = accountLoadingStatus !== Loading.Complete;

  const [balance, setBalance] = useState<string | null>(null);

  useAsyncEffect(async () => {
    if (account) {
      // TODO: move to middleware once repo has been ejected
      const balanceData = await casperApi.getBalance(account.mainPurse);

      setBalance(balanceData);
    }
  }, [account]);

  const error = useMemo(() => {
    if (accountErrorMessage) return { message: accountErrorMessage };
  }, [accountErrorMessage]);

  const pageTitle = `${t('account-details')}`;

  return (
    <PageWrapper error={error} isLoading={isLoading}>
      <PageHead pageTitle={pageTitle} />
      {account && <AccountDetailsCard account={account} balance={balance} />}
    </PageWrapper>
  );
};
