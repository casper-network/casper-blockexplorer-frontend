import React, { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { useParams } from 'react-router-dom';
import { Account } from '../types';
import { truncateHash } from '../utils';
import { AccountDetailsCard, Loader } from '../components';
import { getAccount, getBalance } from '../client';

export const AccountPage: React.FC = () => {
  const { id: accountHash } = useParams();

  const [account, setAccount] = useState<Account>();
  const [error, setError] = useState<boolean>(false);
  const [balance, setBalance] = useState<string | null>(null);

  useAsyncEffect(async () => {
    if (accountHash) {
      const accountData = await getAccount(accountHash);

      if (!accountData) {
        setError(true);
        return;
      }

      setAccount(accountData);
    }
  }, [accountHash]);

  useAsyncEffect(async () => {
    if (account) {
      const balanceData = await getBalance(account.mainPurse);

      setBalance(balanceData);
    }
  }, [account]);

  if (!accountHash) {
    return (
      <div className="w-full px-48 mt-24">
        <div className="w-full max-w-1200">
          <h2 className="text-24 mb-8">Whoops! Something went wrong!</h2>
          <p>Please check if your url includes an account hash.</p>
        </div>
      </div>
    );
  }

  if (!account || !balance) {
    return (
      <div className="w-full h-[75vh] px-48 mt-24">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[75vh] px-48 mt-24">
        <div className="w-full max-w-1200">
          <h2 className="text-24 mb-8">Whoops! Something went wrong!</h2>
          <p>We were unable to fetch account with hash:</p>
          <h3>{accountHash}</h3>
        </div>
      </div>
    );
  }

  const truncatedAccountHash = truncateHash(accountHash);

  return (
    <div className="w-full h-[75vh] px-48 mt-24">
      <div className="w-full max-w-1200">
        <div className="w-full text-black mb-24">
          <h2 className="text-24 mb-16">
            Account:{' '}
            <span className="tracking-2 font-normal">
              {truncatedAccountHash}
            </span>
          </h2>
        </div>
        <AccountDetailsCard account={account} balance={balance} />
      </div>
    </div>
  );
};
