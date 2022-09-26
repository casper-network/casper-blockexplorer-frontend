import React from 'react';
import { Link } from 'react-router-dom';
import { Block } from '../../../types';
import { truncateHash } from '../../../utils';
import { DetailCard } from '../../base';
import { CopyToClipboard, RawData } from '../../utility';

export interface BlockDetailsCardProps {
  block: Block;
  isCarousel?: boolean;
}

export const BlockDetailsCard: React.FC<BlockDetailsCardProps> = ({
  block,
  isCarousel,
}) => {
  const {
    hash: blockHash,
    readableTimestamp,
    height: blockHeight,
    eraID: era,
    timeSince,
    parentHash,
    stateRootHash,
    validatorPublicKey,
    transferHashes,
    deployHashes,
    rawBlock,
  } = block;

  const rows = [
    ...(isCarousel
      ? [
          {
            key: `blockHeight-${blockHash}`,
            detailKey: 'Block Height',
            value: blockHeight,
          },
          { key: `era-${blockHash}`, detailKey: 'Era', value: era },
          {
            key: `deploys=${blockHash}`,
            detailKey: 'Deploy',
            value: deployHashes?.length,
          },
          {
            key: `age-${blockHash}`,
            detailKey: 'Age',
            value: timeSince,
          },
          {
            key: `hash-${blockHash}`,
            detailKey: 'Block Hash',
            value: (
              <>
                <Link
                  to={{
                    pathname: `/block/${blockHash}`,
                  }}>
                  {truncateHash(blockHash)}
                </Link>
                <CopyToClipboard textToCopy={blockHash} />
              </>
            ),
          },
        ]
      : [
          {
            key: `parentHash-${blockHash}`,
            detailKey: 'Parent Hash',
            value: (
              <>
                <Link
                  to={{
                    pathname: `/block/${parentHash}`,
                  }}>
                  {truncateHash(blockHash)}
                </Link>
                <CopyToClipboard textToCopy={parentHash} />
              </>
            ),
          },
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
                <p>{truncateHash(blockHash)}</p>
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
          {
            key: `validator-${blockHash}`,
            detailKey: 'Validator',
            value: (
              <>
                <Link
                  to={{
                    pathname: `/account/${validatorPublicKey}`,
                  }}>
                  {truncateHash(validatorPublicKey)}
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
                    <li>{truncateHash(deployHash)}</li>
                  </a>
                ))}
              </ul>
            ) : (
              'No deploys'
            ),
          },
          {
            key: `stateRootHash-${blockHash}`,
            detailKey: 'State Root Hash',
            value: stateRootHash,
          },
          {
            key: 'raw-json',
            detailKey: 'Raw Deploy',
            value: <RawData rawData={rawBlock} />,
          },
        ]),
  ];

  return <DetailCard rows={rows} />;
};
