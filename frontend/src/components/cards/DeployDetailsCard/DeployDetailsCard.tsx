import React from 'react';
import { Link } from 'react-router-dom';
import { Deploy, DeployStatus } from '../../../types';
import { DetailCard } from '../../base';
import { CopyToClipboard, RawData, Hash } from '../../utility';

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
          <Hash hash={deployHash} />
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
            <Hash hash={blockHash} />
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
            <Hash hash={publicKey} />
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
      value:
        status === DeployStatus.Failed ? (
          <>
            <div className="text-dark-red">{status}</div>
            <img className="w-15 m-5" src={failure} alt="failure icon" />
          </>
        ) : (
          <>
            <div className="text-green">{status}</div>
            <img className="w-15 m-5" src={success} alt="success icon" />
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
