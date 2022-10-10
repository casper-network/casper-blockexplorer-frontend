import React from 'react';
import { Link } from 'react-router-dom';
import { Block } from '../../../api';
import { truncateHash } from '../../../utils';
import { DetailCard } from '../../base';
import { CopyToClipboard } from '../../utility';

export interface BlockCarouselCardProps {
  block: Block;
}

export const BlockCarouselCard: React.FC<BlockCarouselCardProps> = ({
  block,
}) => {
  const {
    hash: blockHash,
    height: blockHeight,
    eraID: era,
    timeSince,
    deployHashes,
  } = block;

  const rows = [
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
  ];

  return <DetailCard rows={rows} />;
};
