import React from 'react';

import { MOBILE_BREAKPOINT } from 'src/constants';
import { useAppSelector, getBounds } from 'src/store';

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

  const bounds = useAppSelector(getBounds);
  const windowWidth = bounds?.width || 0;
  const isMobile = windowWidth < MOBILE_BREAKPOINT;

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
          <p>{isMobile ? truncateHash(deployHash) : deployHash}</p>
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
            <p>{isMobile ? truncateHash(blockHash) : blockHash}</p>
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
            <p>{isMobile ? truncateHash(publicKey) : publicKey}</p>
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
