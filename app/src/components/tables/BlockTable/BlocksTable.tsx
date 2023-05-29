import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ColumnDef, OnChangeFn, SortingState } from '@tanstack/react-table';
import { defaultTheme, pxToRem } from 'casper-ui-kit';
import { ApiData } from 'src/api/types';
import styled from '@emotion/styled';
import {
  getBlocksTableOptions,
  getTotalBlocks,
  setBlocksTableOptions,
  updateBlocksPageNum,
  useAppSelector,
} from 'src/store';
import { SelectOptions } from 'src/components/layout/Header/Partials';
import {
  formatDate,
  formatTimeAgo,
  standardizeNumber,
  truncateHash,
} from '../../../utils';
import { CopyToClipboard } from '../../utility';
import { Spacer, Table } from '../../base';
import { NumberedPagination } from '../Pagination/NumberedPagination';

const rowCountSelectOptions: SelectOptions[] | null = [
  { value: '5', label: '5 rows' },
  { value: '10', label: '10 rows' },
  { value: '20', label: '20 rows' },
];

interface BlocksTableProps {
  readonly total?: number;
  readonly blocks: ApiData.Block[];
  readonly showValidators?: boolean;
  isTableLoading: boolean;
  onSortingChange?: OnChangeFn<SortingState>;
  sorting?: SortingState;
  initialSorting?: SortingState;
  setIsTableLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BlocksTable: React.FC<BlocksTableProps> = ({
  total,
  blocks,
  showValidators,
  isTableLoading,
  setIsTableLoading,
  ...props
}) => {
  const { t } = useTranslation();

  const [currentTime, setCurrentTime] = useState(Date.now());
  const [showTimestamp, setShowTimestamp] = useState(false);

  const blocksTableOptions = useAppSelector(getBlocksTableOptions);
  const totalBlocks = useAppSelector(getTotalBlocks);

  const totalPages = useMemo(() => {
    return Math.ceil(totalBlocks / blocksTableOptions.pagination.pageSize);
  }, [blocksTableOptions, totalBlocks]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const header = useMemo(
    () => (
      <BlocksTableHead>
        <BlockTableTitleWrapper>
          <LatestBlocks>Latest Blocks</LatestBlocks>
          <p>
            {standardizeNumber(total || 0)} {t('total-rows')}
          </p>
        </BlockTableTitleWrapper>

        <NumberedPagination
          tableOptions={blocksTableOptions}
          setTableOptions={setBlocksTableOptions}
          rowCountSelectOptions={rowCountSelectOptions}
          setIsTableLoading={setIsTableLoading}
          totalPages={totalPages}
          updatePageNum={updateBlocksPageNum}
        />
      </BlocksTableHead>
    ),
    [total, t, blocksTableOptions, totalPages, setIsTableLoading],
  );

  const footer = useMemo(
    () => (
      <BlocksTableFooter>
        <Spacer />
        <NumberedPagination
          tableOptions={blocksTableOptions}
          setTableOptions={setBlocksTableOptions}
          rowCountSelectOptions={rowCountSelectOptions}
          setIsTableLoading={setIsTableLoading}
          totalPages={totalPages}
          updatePageNum={updateBlocksPageNum}
          removeRowsSelect
        />
      </BlocksTableFooter>
    ),
    [blocksTableOptions, totalPages, setIsTableLoading],
  );

  const blocksTableTitles = [
    'block-height',
    'era',
    'deploy',
    'age',
    'block-hash',
  ];
  if (showValidators) {
    blocksTableTitles.push('validator');
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
            <StyledHashLink
              to={{
                pathname: `/block/${getValue<string>()}`,
              }}>
              {truncateHash(getValue<string>())}
            </StyledHashLink>
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
            <StyledHashLink
              to={{
                pathname: `/account/${getValue<string>()}`,
              }}>
              {truncateHash(getValue<string>())}
            </StyledHashLink>
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
      tableBodyLoading={isTableLoading}
      currentPageSize={blocksTableOptions.pagination.pageSize}
      placeholderData={{
        header: { height: 0 },
      }}
      isLastPage={totalPages === blocksTableOptions.pagination.pageNum}
      {...props}
    />
  );
};
const BlocksTableHead = styled.div`
  display: flex;
  min-width: ${pxToRem(900)};
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.text.secondary};
`;

const BlockTableTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const BlocksTableFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${pxToRem(20)} 2rem;
  color: ${props => props.theme.text.secondary};
`;

const SwitchBlocktime = styled.div`
  height: 100%;
  cursor: pointer;
`;

const LatestBlocks = styled.div`
  font-size: ${pxToRem(15)};
  margin-right: 1.5rem;
  color: ${props => props.theme.text.primary};

  @media (min-width: ${defaultTheme.typography.breakpoints.xs}) {
    font-size: ${pxToRem(28)};
  }
`;

const StyledHashLink = styled(Link)`
  color: ${props => props.theme.text.hash};
`;
