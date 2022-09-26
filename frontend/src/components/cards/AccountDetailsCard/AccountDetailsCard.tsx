import React from 'react';
import { truncateHash } from 'src/utils';
import { Account } from '../../../types';
import { DetailCard } from '../../base';
import { CopyToClipboard, RawData } from '../../utility';

export interface AccountDetailsCardProps {
  account: Account;
  balance?: string;
}

export const AccountDetailsCard: React.FC<AccountDetailsCardProps> = ({
  account,
  balance,
}) => {
  const { trimmedAccountHash, publicKey, rawAccount } = account;

  const rows = [
    {
      key: `accountHash-${trimmedAccountHash}`,
      detailKey: 'Account Hash',
      value: (
        <>
          <p>{truncateHash(trimmedAccountHash)}</p>
          <CopyToClipboard textToCopy={trimmedAccountHash} />
        </>
      ),
    },
    {
      key: `publicKey-${publicKey}`,
      detailKey: 'Public Key',
      value: (
        <>
          <p>{truncateHash(publicKey)}</p>
          <CopyToClipboard textToCopy={publicKey} />
        </>
      ),
    },
    {
      key: `balance-${balance || 'missing'}`,
      detailKey: 'Balance',
      value: <p>{balance || 0} motes</p>,
    },
    {
      key: 'raw-json',
      detailKey: 'Raw Deploy',
      value: <RawData rawData={rawAccount} />,
    },
  ];

  return <DetailCard rows={rows} />;
};
