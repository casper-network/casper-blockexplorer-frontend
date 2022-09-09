import React from 'react';
import { Account } from '../../../types';
import { DetailCard } from '../../base';
import { CopyToClipboard } from '../../utility';

export interface AccountDetailsCardProps {
  account: Account;
  balance?: string;
}

export const AccountDetailsCard: React.FC<AccountDetailsCardProps> = ({
  account,
  balance,
}) => {
  const { trimmedAccountHash, publicKey } = account;

  const rows = [
    {
      key: `accountHash-${trimmedAccountHash}`,
      detailKey: 'Account Hash',
      value: (
        <>
          <p>{trimmedAccountHash}</p>
          <CopyToClipboard textToCopy={trimmedAccountHash} />
        </>
      ),
    },
    {
      key: `publicKey-${publicKey}`,
      detailKey: 'Public Key',
      value: (
        <>
          <p>{publicKey}</p>
          <CopyToClipboard textToCopy={publicKey} />
        </>
      ),
    },
    {
      key: `balance-${balance}`,
      detailKey: 'Balance',
      value: (
        <>
          <p>{balance} motes</p>
        </>
      ),
    },
  ];

  return <DetailCard rows={rows} />;
};
