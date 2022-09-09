import React from 'react';
import { Link } from 'react-router-dom';
import { Deploy } from '../../../types';
import { DetailCard } from '../../base';
import { CopyToClipboard } from '../../utility';

export interface DeployDetailsCardProps {
  deploy: Deploy;
}

export const DeployDetailsCard: React.FC<DeployDetailsCardProps> = ({
  deploy,
}) => {
  const { timestamp, deployHash, blockHash, publicKey } = deploy;

  // console.log(deploy);

  const rows = [
    {
      key: `timestamp-${deploy.timestamp}`,
      detailKey: 'Timestamp',
      value: timestamp,
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
      key: `blockHash-${deployHash}`,
      detailKey: 'Block Hash',
      value: (
        <>
          <Link to="">
            <p>{blockHash}</p>
            <CopyToClipboard textToCopy={blockHash} />
          </Link>
        </>
      ),
    },
    {
      key: `publicKey-${deployHash}`,
      detailKey: 'Public Key',
      value: (
        <>
          <Link to="">
            <p>{publicKey}</p>
            <CopyToClipboard textToCopy={publicKey} />
          </Link>
        </>
      ),
    },
  ];

  return <DetailCard rows={rows} />;
};
