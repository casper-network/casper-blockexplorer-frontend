import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ColumnDef, OnChangeFn, SortingState } from '@tanstack/react-table';
import { colors, fontWeight, pxToRem } from 'src/styled-theme';
import { ApiData } from 'src/api/types';
import styled from '@emotion/styled';
import {
  formatDate,
  formatTimeAgo,
  standardizeNumber,
  truncateHash,
} from '../../../utils';
import { CopyToClipboard, Loader, RefreshTimer } from '../../utility';
import { Table } from '../../base';

interface BlockTableProps {
  readonly total?: number;
  readonly blocks: ApiData.Block[];
  readonly showValidators?: boolean;
  fetchMore: () => void;
  isLoadingMoreBlocks: boolean;
  isSorting: boolean;
  onSortingChange?: OnChangeFn<SortingState>;
  sorting?: SortingState;
  initialSorting?: SortingState;
}

export const BlockTable: React.FC<BlockTableProps> = ({
  total,
  blocks,
  showValidators,
  fetchMore,
  isLoadingMoreBlocks,
  isSorting,
  ...props
}) => {
  const { t } = useTranslation();

  const [currentTime, setCurrentTime] = useState(Date.now());
  const [showTimestamp, setShowTimestamp] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const header = useMemo(
    () => (
      <BlockTableHead>
        <p>
          {standardizeNumber(total || 0)} {t('total-rows')}
        </p>
        <RefreshTimer />
      </BlockTableHead>
    ),
    [total, t],
  );

  const footer = useMemo(
    () => (
      <BlockTableFooter>
        <ShowMoreButton
          type="button"
          disabled={isLoadingMoreBlocks}
          onClick={fetchMore}>
          {isLoadingMoreBlocks ? <Loader size="sm" /> : t('show-more')}
        </ShowMoreButton>
      </BlockTableFooter>
    ),
    [fetchMore, isLoadingMoreBlocks, t],
  );

  const blockTableTitles = [
    'block-height',
    'era',
    'deploy',
    'age',
    'block-hash',
  ];
  if (showValidators) {
    blockTableTitles.push('validator');
  }

  const columns = useMemo<ColumnDef<ApiData.Block>[]>(
    () => [
      {
        header: `${t('block-height')}`,
        id: 'height',
        accessorKey: 'header.height',
        cell: ({ getValue }) => <>{standardizeNumber(getValue<number>())}</>,
      },
      {
        header: `${t('era')}`,
        accessorKey: 'header.era_id',
        maxSize: 100,
        enableSorting: false,
      },
      {
        header: `${t('deploy')}`,
        accessorKey: 'body.deploy_hashes',
        cell: ({ getValue }) => getValue<string[]>().length,
        maxSize: 100,
        enableSorting: false,
      },
      {
        // @ts-ignore
        header: (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <SwitchBlocktime onClick={() => setShowTimestamp(prev => !prev)}>
            {showTimestamp ? t('datetime') : t('age')}
          </SwitchBlocktime>
        ),
        accessorKey: 'header.timestamp',
        cell: ({ getValue }) => (
          <div>
            {showTimestamp
              ? formatDate(new Date(getValue<number>()))
              : formatTimeAgo(new Date(getValue<number>()))}
          </div>
        ),
        enableSorting: false,
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
        accessorKey: 'body.proposer',
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
        // isVisible: showValidators,
        minSize: 230,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showValidators, t, currentTime, showTimestamp],
  );

  return (
    <Table<ApiData.Block>
      header={header}
      columns={columns}
      data={blocks}
      footer={footer}
      tableBodyLoading={isSorting}
      {...props}
    />
  );
};
const BlockTableHead = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${colors.lightSupporting};
`;

const BlockTableFooter = styled.div`
  display: flex;
  justify-content: space-around;
  padding: ${pxToRem(20)} 2rem;
`;

const ShowMoreButton = styled.button`
  background-color: ${colors.lightSupporting};
  color: ${colors.darkWarning};
  min-width: ${pxToRem(150)};
  padding: 0.5rem 0;
  width: fit-content;
  border-radius: 0.375rem;
  border: none;
  font-weight: ${fontWeight.medium};

  :hover {
    background-color: ${colors.lightWarning};
  }
`;

const SwitchBlocktime = styled.div`
  height: 100%;
  cursor: pointer;
`;
