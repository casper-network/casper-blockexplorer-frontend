import React, { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { useParams } from 'react-router-dom';
import { Account } from '../types';
import { truncateHash } from '../utils';
import { AccountDetailsCard, PageError, PageWrapper } from '../components';
import { casperApi } from '../api';

export const AccountPage: React.FC = () => {
  const { id: accountHash } = useParams();

  const [account, setAccount] = useState<Account>();
  const [error, setError] = useState<PageError>();
  const [balance, setBalance] = useState<string | null>(null);

  useAsyncEffect(async () => {
    if (accountHash) {
      try {
        const accountData = await casperApi.getAccount(accountHash);

        if (!accountData) {
          setError({
            message: `We were unable to locate account data for hash ${accountHash}`,
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

  return (
    <PageWrapper error={error} isLoading={isLoading}>
      {!isLoading && accountHash && (
        <>
          <div className="w-full text-black mb-24">
            <h2 className="text-24 mb-16">
              Account:{' '}
              <span className="tracking-2 font-normal">
                {truncateHash(accountHash)}
              </span>
            </h2>
          </div>
          <AccountDetailsCard account={account} balance={balance} />
        </>
      )}
    </PageWrapper>
  );
};
