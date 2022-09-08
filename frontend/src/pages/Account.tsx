import React, { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { useParams } from 'react-router-dom';

import { getAccount, getBalance } from '../client';

export const AccountPage: React.FC = () => {
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [balance, setBalance] = useState<string | null>(null);

  useAsyncEffect(async () => {
    if (params.id) {
      const fetchedData = await getAccount(params.id);

      setData(fetchedData);
    }
  }, [params.id]);

  useAsyncEffect(async () => {
    if (data) {
      const balance = await getBalance(data.Account?.mainPurse);
      setBalance(balance);
    }
  }, [data]);

  return (
    <div>
      <h2>Account</h2>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {balance && <>Balance: {balance} motes</> }
    </div>
  );
};
