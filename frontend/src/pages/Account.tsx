import React, { useMemo, useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAccount } from 'src/hooks';
import { casperApi } from '../api';
import { AccountDetailsCard, PageHead, PageWrapper } from '../components';

export const AccountPage: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const {
    data: account,
    error: accountError,
    isLoading,
  } = useAccount({
    accountHashOrPublicKey: id || '',
  });

  const [balance, setBalance] = useState<string | null>(null);

  useAsyncEffect(async () => {
    if (account) {
      const balanceData = await casperApi.getBalance(account.mainPurse);

      setBalance(balanceData);
    }
  }, [account]);

  const error = useMemo(() => {
    if (accountError)
      return { message: accountError.response?.statusText || '' };
  }, [accountError]);

  const pageTitle = `${t('account-details')}`;

  return (
    <PageWrapper error={error} isLoading={isLoading}>
      <PageHead pageTitle={pageTitle} />
      {account && <AccountDetailsCard account={account} balance={balance} />}
    </PageWrapper>
  );
};
