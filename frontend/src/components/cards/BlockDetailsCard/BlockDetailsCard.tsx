import React from 'react';
import { Link } from 'react-router-dom';
import { Block } from '../../../types';
import { DetailCard } from '../../base';
import { CopyToClipboard } from '../../utility';

export interface BlockDetailsCardProps {
  block: Block;
}

export const BlockDetailsCard: React.FC<BlockDetailsCardProps> = ({
  block,
}) => {
  const {
    hash: blockHash,
    readableTimestamp,
    height: blockHeight,
    eraID: era,
    parentHash,
    stateRootHash,
    validatorPublicKey,
    transferHashes,
    deployHashes,
  } = block;

  const rows = [
    {
      key: `timestamp-${blockHash}`,
      detailKey: 'Timestamp',
      value: readableTimestamp,
    },
    {
      key: `blockHash-${blockHash}`,
      detailKey: 'Block Hash',
      value: (
        <>
          <p>{blockHash}</p>
          <CopyToClipboard textToCopy={blockHash} />
        </>
      ),
    },
    {
      key: `blockHeight-${blockHash}`,
      detailKey: 'Block Height',
      value: blockHeight,
    },
    { key: `era-${blockHash}`, detailKey: 'Era', value: era },
    {
      key: `parentHash-${blockHash}`,
      detailKey: 'Parent Hash',
      value: (
        <>
          <Link
            to={{
              pathname: `/block/${parentHash}`,
            }}>
            {blockHash}
          </Link>
          <CopyToClipboard textToCopy={parentHash} />
        </>
      ),
    },
    {
      key: `stateRootHash-${blockHash}`,
      detailKey: 'State Root Hash',
      value: stateRootHash,
    },
    {
      key: `validator-${blockHash}`,
      detailKey: 'Validator',
      value: (
        <>
          <Link
            to={{
              pathname: `/validator/${validatorPublicKey}`,
            }}>
            {validatorPublicKey}
          </Link>
          <CopyToClipboard textToCopy={validatorPublicKey} />
        </>
      ),
    },
    {
      key: `deploys-${blockHash}`,
      detailKey: 'Deploys',
      value: deployHashes?.length ? (
        <ul>
          {deployHashes?.map(deployHash => (
            <a key={deployHash} href={`/deploy/${deployHash}`}>
              <li>{deployHash}</li>
            </a>
          ))}
        </ul>
      ) : (
        'No deploys'
      ),
    },
    {
      key: `transfers-${blockHash}`,
      detailKey: 'Transfers',
      value: transferHashes?.length ? (
        <ul>
          {transferHashes?.map(transferHash => (
            <a key={transferHash} href={`/deploy/${transferHash}`}>
              <li>{transferHash}</li>
            </a>
          ))}
        </ul>
      ) : (
        'No transfers'
      ),
    },
  ];

  return <DetailCard rows={rows} />;
};
