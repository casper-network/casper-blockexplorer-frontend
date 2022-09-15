import React from 'react';
import { Link } from 'react-router-dom';
import { Deploy } from '../../../types';
import { truncateHash } from '../../../utils';
import { DetailCard } from '../../base';
import { CopyToClipboard } from '../../utility';

export interface DeployDetailsCardProps {
  deploy: Deploy;
}

export const DeployDetailsCard: React.FC<DeployDetailsCardProps> = ({
  deploy,
}) => {
  const {
    timestamp,
    readableTimestamp,
    deployHash,
    blockHash,
    publicKey,
    status,
    cost,
    paymentAmount
  } = deploy;

  const rows = [
    {
      key: `timestamp-${timestamp}`,
      detailKey: 'Timestamp',
      value: readableTimestamp,
    },
    {
      key: `deployHash-${deployHash}`,
      detailKey: 'Deploy Hash',
      value: (
        <>
          <p>{deployHash}</p>
          <CopyToClipboard textToCopy={deployHash} />
        </>
      ),
    },
    {
      key: `blockHash-${blockHash}`,
      detailKey: 'Block Hash',
      value: (
        <>
          <Link to={`/block/${blockHash}`}>
            <p>{blockHash}</p>
          </Link>
          <CopyToClipboard textToCopy={blockHash} />
        </>
      ),
    },
    {
      key: `publicKey-${publicKey}`,
      detailKey: 'Public Key',
      value: (
        <>
          <Link to={`/account/${publicKey}`}>
            <p>{truncateHash(publicKey)}</p>
          </Link>
          <CopyToClipboard textToCopy={publicKey} />
        </>
      ),
    },
    {
      key: `payment-${deployHash}`,
      detailKey: 'Payment Amount',
      value: paymentAmount,
    },
    {
      key: `status-${status}`,
      detailKey: 'Status',
      value: status,
    },
    {
      key: `cost-${deployHash}`,
      detailKey: 'Cost',
      value: cost,
    },
  ];

  return <DetailCard rows={rows} />;
};
