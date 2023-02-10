import React, { useEffect, useState } from 'react';
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

  const isLoading = accountLoadingStatus !== Loading.Complete;

  const [balance, setBalance] = useState<string | null>(null);

  useAsyncEffect(async () => {
    if (account) {
      // TODO: definitely move this to API layer
      // TODO: also the balance takes a second to show up on account details -> think about proper loading
      const balanceData = await casperApi.getBalance(account.mainPurse);

      setBalance(balanceData);
    }
  }, [account]);

  const pageTitle = `${t('account-details')}`;

  return (
    // TODO: add error as prop after created API layer for proper error handling/UI error
    <PageWrapper isLoading={isLoading}>
      <PageHead pageTitle={pageTitle} />
      {account && <AccountDetailsCard account={account} balance={balance} />}
    </PageWrapper>
  );
};
