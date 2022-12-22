import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from '@tanstack/react-table';

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
import {
  formatDate,
  formatTimeAgo,
  standardizeNumber,
  truncateHash,
} from '../../../utils';
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
  const { t } = useTranslation();

  const latestBlockHeight = useAppSelector(getLatestBlockHeight);
  const earliestLoadedBlockHeight = useAppSelector(getEarliestLoadedBlock);
  const loadingMoreBlocksStatus = useAppSelector(getLoadingMoreBlocksStatus);
  const isLoadingMoreBlocks = loadingMoreBlocksStatus === Loading.Pending;
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const header = useMemo(
    () => (
      <div className="flex justify-between text-grey px-32">
        <p>
          {standardizeNumber(latestBlockHeight || 0)} {t('total-rows')}
        </p>
        <RefreshTimer />
      </div>
    ),
    [latestBlockHeight, t],
  );

  const footer = useMemo(
    () => (
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
          {isLoadingMoreBlocks ? <Loader size="sm" /> : t('show-more')}
        </button>
      </div>
    ),
    [dispatch, earliestLoadedBlockHeight, isLoadingMoreBlocks, t],
  );

  const columns = useMemo<ColumnDef<Block>[]>(
    () => [
      {
        header: `${t('block-height')}`,
        accessorKey: 'height',
        cell: ({ getValue }) => <>{standardizeNumber(getValue<number>())}</>,
      },
      {
        header: `${t('era')}`,
        accessorKey: 'eraID',
        maxSize: 100,
      },
      {
        header: `${t('deploy')}`,
        accessorKey: 'deployCount',
        maxSize: 100,
      },
      {
        header: `${t('age')}`,
        accessorKey: 'timestamp',
        cell: ({ getValue, column }) => (
          <div>
            {column.getIsSorted()
              ? formatDate(new Date(getValue<number>()))
              : formatTimeAgo(new Date(getValue<number>()))}
          </div>
        ),
        minSize: 200,
      },
      {
        header: `${t('block-hash')}`,
        accessorKey: 'hash',
        cell: ({ getValue }) => (
          <div className="flex flex-row items-center">
            <Link
              to={{
                pathname: `/block/${getValue<string>()}`,
              }}>
              {truncateHash(getValue<string>())}
            </Link>
            <CopyToClipboard textToCopy={getValue<string>()} />
          </div>
        ),
        enableSorting: false,
        minSize: 230,
      },
      {
        header: `${t('validator')}`,
        accessorKey: 'validatorPublicKey',
        cell: ({ getValue }) => (
          <div className="flex flex-row items-center">
            <Link
              to={{
                pathname: `/account/${getValue<string>()}`,
              }}>
              {truncateHash(getValue<string>())}
            </Link>
            <CopyToClipboard textToCopy={getValue<string>()} />
          </div>
        ),
        enableSorting: false,
        isVisible: showValidators,
        minSize: 230,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showValidators, t, currentTime],
  );

  return (
    <Table<Block>
      header={header}
      columns={columns}
      data={blocks}
      footer={footer}
    />
  );
};
