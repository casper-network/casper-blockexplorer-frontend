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
    timestamp,
    height: blockHeight,
    eraID: era,
    parentHash,
    stateRootHash,
    validatorPublicKey,
  } = block;

  const rows = [
    { key: `timestamp-${blockHash}`, detailKey: 'Timestamp', value: timestamp },
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
  ];

  return <DetailCard rows={rows} />;
};
