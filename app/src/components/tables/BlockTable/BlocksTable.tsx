import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ColumnDef, SortingState } from '@tanstack/react-table';
import { defaultTheme, pxToRem } from 'casper-ui-kit';
import { ApiData } from 'src/api/types';
import styled from '@emotion/styled';
import {
  fetchBlocks,
  getBlocks,
  getBlocksLoadingStatus,
  getBlocksTableOptions,
  getLatestBlock,
  getTotalBlocks,
  Loading,
  setBlocksTableOptions,
  setInitialBlockStateFromUrlSearchParams,
  updateBlocksPageNum,
  updateBlocksSorting,
  updateBlocksWithLatest,
  useAppDispatch,
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

const initialSorting: SortingState = [
  {
    id: 'height',
    desc: true,
  },
];

const validSortableBlocksColumns = ['height'];

export const BlocksTable: React.FC = () => {
  const { t } = useTranslation();

  const [isTableLoading, setIsTableLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [showTimestamp, setShowTimestamp] = useState(false);

  const dispatch = useAppDispatch();

  const blocks = useAppSelector(getBlocks);
  const totalBlocks = useAppSelector(getTotalBlocks);
  const latestBlock = useAppSelector(getLatestBlock);
  const blockLoadingStatus = useAppSelector(getBlocksLoadingStatus);
  const blocksTableOptions = useAppSelector(getBlocksTableOptions);

  const totalPages = useMemo(() => {
    return Math.ceil(totalBlocks / blocksTableOptions.pagination.pageSize);
  }, [blocksTableOptions, totalBlocks]);

  const isLoadingPage =
    blockLoadingStatus !== Loading.Complete && !blocks.length;

  useEffect(() => {
    dispatch(
      setInitialBlockStateFromUrlSearchParams(validSortableBlocksColumns),
    );
  }, [dispatch]);

  useEffect(() => {
    // updated from WS
    if (latestBlock) {
      dispatch(updateBlocksWithLatest({ latestBlock }));
    }
  }, [latestBlock, dispatch]);

  useEffect(() => {
    dispatch(fetchBlocks(blocksTableOptions));
  }, [dispatch, blocksTableOptions]);

  useEffect(() => {
    if (isTableLoading || isLoadingPage) {
      setIsTableLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);

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
          <TotalRows>
            {standardizeNumber(totalBlocks || 0)} {t('total-rows')}
          </TotalRows>
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
    [totalBlocks, t, blocksTableOptions, totalPages, setIsTableLoading],
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
        accessorKey: 'body',
        cell: ({ getValue }) => {
          const body = getValue<ApiData.Block['body']>();

          return (
            (body.deploy_hashes?.length ?? 0) +
            (body.transfer_hashes?.length ?? 0)
          );
        },
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
          <Age>
            {showTimestamp
              ? formatDate(new Date(getValue<number>()))
              : formatTimeAgo(new Date(getValue<number>()))}
          </Age>
        ),
        enableSorting: false,
        minSize: 200,
      },
      {
        header: `${t('block-hash')}`,
        accessorKey: 'hash',
        cell: ({ getValue }) => (
          <HashAndCopyToClipboardWrapper>
            <StyledHashLink
              to={{
                pathname: `/block/${getValue<string>()}`,
              }}>
              {truncateHash(getValue<string>())}
            </StyledHashLink>
            <CopyToClipboard textToCopy={getValue<string>()} />
          </HashAndCopyToClipboardWrapper>
        ),
        enableSorting: false,
        minSize: 230,
      },
      {
        header: `${t('validator')}`,
        accessorKey: 'body.proposer',
        cell: ({ getValue }) => (
          <HashAndCopyToClipboardWrapper>
            <StyledHashLink
              to={{
                pathname: `/account/${getValue<string>()}`,
              }}>
              {truncateHash(getValue<string>())}
            </StyledHashLink>
            <CopyToClipboard textToCopy={getValue<string>()} />
          </HashAndCopyToClipboardWrapper>
        ),
        enableSorting: false,
        minSize: 230,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, currentTime, showTimestamp],
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
        header: { height: 0, era_id: 0, timestamp: '2023-06-05T17:06:44.864Z' },
        body: {
          proposer:
            '017d96b9a63abcb61c870a4f55187a0a7ac24096bdb5fc585c12a686a4d892009e',
          deploy_hashes: [],
          transfer_hashes: [],
        },
        hash: '52f7c16323868f73343335f26a484aed0067a3e769dc9187dbae6a305e2b59f3',
      }}
      isLastPage={totalPages === blocksTableOptions.pagination.pageNum}
      sorting={[
        {
          id: blocksTableOptions.sorting.sortBy,
          desc: blocksTableOptions.sorting.order === 'desc',
        },
      ]}
      onSortingChange={() => {
        setIsTableLoading(true);
        dispatch(
          updateBlocksSorting({
            sortBy: 'height',
            order: blocksTableOptions.sorting.order === 'desc' ? 'asc' : 'desc',
          }),
        );
      }}
      initialSorting={initialSorting}
    />
  );
};
const BlocksTableHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.text.secondary};
`;

const BlockTableTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const BlocksTableFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: ${pxToRem(20)} 2rem;
  padding: ${pxToRem(20)} 1.5rem;
  min-width: ${pxToRem(450)};

  @media (min-width: ${defaultTheme.typography.breakpoints.lg}) {
    justify-content: flex-end;
    padding: ${pxToRem(20)} 2rem;
  }
`;

const SwitchBlocktime = styled.div`
  height: 100%;
  cursor: pointer;
`;

const LatestBlocks = styled.div`
  font-size: clamp(1.45rem, 2vw, 1.75rem);
  white-space: nowrap;
  margin-right: 1.5rem;
  color: ${props => props.theme.text.primary};
`;

const TotalRows = styled.p`
  margin-right: 1.5rem;
  white-space: nowrap;
`;

const Age = styled.div`
  white-space: nowrap;
`;

const HashAndCopyToClipboardWrapper = styled.div`
  white-space: nowrap;
`;

const StyledHashLink = styled(Link)`
  color: ${props => props.theme.text.hash};
`;
