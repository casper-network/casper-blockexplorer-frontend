import React from 'react';

import { Link } from 'react-router-dom';
import { Deploy, DeployStatus } from '../../../types';
import { truncateHash } from '../../../utils';
import { DetailCard } from '../../base';
import { CopyToClipboard, RawData } from '../../utility';

import failure from '../../../assets/icons/failure.svg';
import success from '../../../assets/icons/success.svg';

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
    paymentAmount,
    rawDeploy,
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
      value: status.includes('Failed') ? (
        <>
          <div className="text-dark-red">{status}</div>
          <img className="w-15 m-5" src={failure} />
        </>
      ) : (
        <>
          <div className="text-green">{status}</div>
          <img className="w-15 m-5" src={success} />
        </>
      ),
    },
    {
      key: `cost-${deployHash}`,
      detailKey: 'Cost',
      value: cost,
    },
    {
      key: 'raw-json',
      detailKey: 'Raw Deploy',
      value: <RawData rawData={rawDeploy} />,
    },
  ];

  return <DetailCard rows={rows} />;
};
