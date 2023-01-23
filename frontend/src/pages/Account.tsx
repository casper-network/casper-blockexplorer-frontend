import React, { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { casperApi, Account } from '../api';
import {
  AccountDetailsCard,
  PageError,
  PageWrapper,
  PageHead,
} from '../components';

export const AccountPage: React.FC = () => {
  const { id: accountHash } = useParams();

  const { t } = useTranslation();
  const [account, setAccount] = useState<Account>();
  const [error, setError] = useState<PageError>();
  const [balance, setBalance] = useState<string | null>(null);

  useAsyncEffect(async () => {
    if (accountHash) {
      try {
        const accountData = await casperApi.getAccount(accountHash);

        if (!accountData) {
          setError({
            message: `${t('unable-to-locate-account')} ${accountHash}`,
          });
          return;
        }

        setAccount(accountData);
      } catch (err: any) {
        setError({
          message: (err as Error).message,
        });
      }
    }
  }, [accountHash]);

  useAsyncEffect(async () => {
    if (account) {
      const balanceData = await casperApi.getBalance(account.mainPurse);

      setBalance(balanceData);
    }
  }, [account]);

  const isLoading = !account || !balance;

  const pageTitle = `${t('account-details')}`;

  return (
    <PageWrapper error={error} isLoading={isLoading}>
      <PageHead pageTitle={pageTitle} />
      {!isLoading && accountHash && (
        <AccountDetailsCard account={account} balance={balance} />
      )}
    </PageWrapper>
  );
};
