import React, { useMemo, useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { useParams } from 'react-router-dom';
import { useAccount } from 'src/hooks';
import { casperApi } from '../api';
import { AccountDetailsCard, PageWrapper } from '../components';

export const AccountPage: React.FC = () => {
  const { id } = useParams();

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

  return (
    <PageWrapper error={error} isLoading={isLoading}>
      {account && <AccountDetailsCard account={account} balance={balance} />}
    </PageWrapper>
  );
};
