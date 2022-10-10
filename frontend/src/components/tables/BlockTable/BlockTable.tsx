import React from 'react';
import { Link } from 'react-router-dom';

import {
  fetchMoreBlocks,
  getEarliestLoadedBlock,
  getLatestBlockHeight,
  getLoadingMoreBlocksStatus,
  Loading,
  useAppDispatch,
  useAppSelector,
} from '../../../store';
import { Block } from '../../../api';
import { standardizeNumber, truncateHash } from '../../../utils';
import { CopyToClipboard, Loader, RefreshTimer } from '../../utility';

import { Table } from '../../base';

interface BlockTableProps {
  readonly blocks: Block[];
  readonly showValidators?: boolean;
}

export const BlockTable: React.FC<BlockTableProps> = ({
  blocks,
  showValidators,
}) => {
  const dispatch = useAppDispatch();

  const latestBlockHeight = useAppSelector(getLatestBlockHeight);
  const earliestLoadedBlockHeight = useAppSelector(getEarliestLoadedBlock);
  const loadingMoreBlocksStatus = useAppSelector(getLoadingMoreBlocksStatus);

  const headContent = (
    <div className="flex justify-between text-grey px-32">
      <p>{standardizeNumber(latestBlockHeight || 0)} total rows</p>
      <RefreshTimer />
    </div>
  );

  const isLoadingMoreBlocks = loadingMoreBlocksStatus === Loading.Pending;

  const footContent = (
    <div className="flex justify-around px-32 py-20">
      <button
        type="button"
        disabled={isLoadingMoreBlocks}
        onClick={() => {
          if (earliestLoadedBlockHeight) {
            dispatch(fetchMoreBlocks(earliestLoadedBlockHeight));
          }
        }}
        className="bg-light-grey hover:bg-light-red text-dark-red min-w-150 py-8 text-14 w-fit rounded-md border-none font-medium">
        {isLoadingMoreBlocks ? <Loader size="sm" /> : 'Show more'}
      </button>
    </div>
  );

  const blockTableTitles = [
    'Block Height',
    'Era',
    'Deploy',
    'Age',
    'Block Hash',
  ];
  if (showValidators) {
    blockTableTitles.push('Validator');
  }

  const blockTableHeads = blockTableTitles.map(title => {
    return { title: <p className="font-bold">{title}</p>, key: title };
  });

  const blockRows = blocks.map(
    ({
      height,
      eraID,
      deployCount,
      timeSince,
      timestamp,
      hash,
      validatorPublicKey,
    }) => {
      const key = `${hash}-${timestamp}`;

      const items = [
        { content: standardizeNumber(height), key: `${key}-hash` },
        { content: eraID, key: `${key}-era` },
        { content: deployCount, key: `${key}-deploys` },
        { content: timeSince, key: `${key}-age` },
        {
          content: (
            <>
              <Link
                to={{
                  pathname: `/block/${hash}`,
                }}>
                {truncateHash(hash)}
              </Link>
              <CopyToClipboard textToCopy={hash} />
            </>
          ),
          key: `${key}-block-hash`,
        },
      ];

      const validatorColumn = {
        content: (
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
        key: `${key}-validator`,
      };

      if (showValidators) {
        items.push(validatorColumn);
      }

      return { items, key };
    },
  );

  return (
    <Table
      headContent={headContent}
      headColumns={blockTableHeads}
      rows={blockRows}
      footContent={footContent}
    />
  );
};
