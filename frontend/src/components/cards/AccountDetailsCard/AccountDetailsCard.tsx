import { BalanceServiceByJsonRPC } from 'casper-js-sdk';
import React from 'react';
import { Link } from 'react-router-dom';
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
  const { accountHash, publicKey } = account;

  const rows = [
    {
      key: `${accountHash}`,
      detailKey: 'Account Hash',
      value: (
        <>
          <p>{accountHash}</p>
          <CopyToClipboard textToCopy={accountHash} />
        </>
      ),
    },
    {
      key: `${publicKey}`,
      detailKey: 'Public Key',
      value: (
        <>
          <p>{publicKey}</p>
          <CopyToClipboard textToCopy={publicKey} />
        </>
      ),
    },
    {
      key: `${balance}`,
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
