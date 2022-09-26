import React from 'react';
import { Link } from 'react-router-dom';
import { MOBILE_BREAKPOINT } from 'src/constants';
import { useAppSelector, getBounds } from 'src/store';
import { Block } from '../../../types';
import { truncateHash } from '../../../utils';
import { DetailCard } from '../../base';
import { CopyToClipboard, RawData } from '../../utility';

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
    rawBlock,
  } = block;

  const bounds = useAppSelector(getBounds);
  const windowWidth = bounds?.width || 0;
  const isMobile = windowWidth < MOBILE_BREAKPOINT;
  const rows = [
    {
      key: `parentHash-${blockHash}`,
      detailKey: 'Parent Hash',
      value: (
        <>
          <Link
            to={{
              pathname: `/block/${parentHash}`,
            }}>
            {isMobile ? truncateHash(blockHash) : blockHash}
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
          <p>{isMobile ? truncateHash(blockHash) : blockHash}</p>
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
            {isMobile ? truncateHash(validatorPublicKey) : validatorPublicKey}
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
              <li>{isMobile ? truncateHash(deployHash) : deployHash}</li>
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
      value:
        isMobile && stateRootHash ? truncateHash(stateRootHash) : stateRootHash,
    },
    {
      key: 'raw-json',
      detailKey: 'Raw Deploy',
      value: <RawData rawData={rawBlock} />,
    },
  ];

  return <DetailCard rows={rows} />;
};
