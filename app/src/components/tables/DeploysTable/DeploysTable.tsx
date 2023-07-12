import styled from '@emotion/styled';
import { ColumnDef, OnChangeFn, SortingState } from '@tanstack/react-table';
import { SelectOptions, defaultTheme, pxToRem } from 'casper-ui-kit';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ApiData } from 'src/api/types';
import { Spacer, Table } from 'src/components/base';
import { StyledCopyToClipboard } from 'src/components/utility';
import { DEFAULT_SECONDARY_FONT_FAMILIES } from 'src/constants';
import {
  Loading,
  fetchDeploys,
  getDeploys,
  getDeploysLoadingStatus,
  getDeploysTableOptions,
  getTotalDeploys,
  setDeploysTableOptions,
  setInitialDeployStateFromUrlSearchParams,
  updateDeploysPageNum,
  updateDeploysSorting,
  useAppDispatch,
  useAppSelector,
} from 'src/store';
import { formatTimeAgo, standardizeNumber, truncateHash } from 'src/utils';
import { capitalizeWords } from 'src/utils/string';
import { NumberedPagination } from '../Pagination';

const rowCountSelectOptions: SelectOptions[] | null = [
  { value: '5', label: '5 rows' },
  { value: '10', label: '10 rows' },
  { value: '20', label: '20 rows' },
];

const validSortableDeploysColumns = ['timestamp'];

export const DeploysTable: React.FC = () => {
  const { t } = useTranslation();

  const [isTableLoading, setIsTableLoading] = useState(false);

  const dispatch = useAppDispatch();

  const deploys = useAppSelector(getDeploys);
  const totalDeploys = useAppSelector(getTotalDeploys);
  const deploysLoadingStatus = useAppSelector(getDeploysLoadingStatus);
  const deploysTableOptions = useAppSelector(getDeploysTableOptions);

  const totalPages = useMemo(() => {
    return Math.ceil(totalDeploys / deploysTableOptions.pagination.pageSize);
  }, [deploysTableOptions, totalDeploys]);

  const isLoadingPage =
    deploysLoadingStatus !== Loading.Complete && !deploys.length;

  useEffect(() => {
    dispatch(
      setInitialDeployStateFromUrlSearchParams(validSortableDeploysColumns),
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDeploys(deploysTableOptions));
  }, [dispatch, deploysTableOptions]);

  useEffect(() => {
    if (isTableLoading || isLoadingPage) {
      setIsTableLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deploys]);

  const header = useMemo(
    () => (
      <DeploysTableHead>
        <DeploysTableTitleWrapper>
          <TotalRows>
            {standardizeNumber(totalDeploys || 0)} {t('total-rows')}
          </TotalRows>
        </DeploysTableTitleWrapper>

        <NumberedPagination
          tableOptions={deploysTableOptions}
          setTableOptions={setDeploysTableOptions}
          rowCountSelectOptions={rowCountSelectOptions}
          setIsTableLoading={setIsTableLoading}
          totalPages={totalPages}
          updatePageNum={updateDeploysPageNum}
        />
      </DeploysTableHead>
    ),
    [totalDeploys, t, deploysTableOptions, totalPages, setIsTableLoading],
  );

  const footer = useMemo(
    () => (
      <DeploysTableFooter>
        <Spacer />
        <NumberedPagination
          tableOptions={deploysTableOptions}
          setTableOptions={setDeploysTableOptions}
          rowCountSelectOptions={rowCountSelectOptions}
          setIsTableLoading={setIsTableLoading}
          totalPages={totalPages}
          updatePageNum={updateDeploysPageNum}
          removeRowsSelect
        />
      </DeploysTableFooter>
    ),
    [deploysTableOptions, totalPages, setIsTableLoading],
  );

  const columns = useMemo<ColumnDef<ApiData.ProcessedSidecarDeploy>[]>(
    () => [
      {
        header: `${t('deploy-hash')}`,
        id: 'deployHash',
        accessorKey: 'deployHash',
        cell: ({ getValue }) => (
          <HashAndCopyToClipboardWrapper>
            <StyledHashLink
              to={{
                pathname: `/deploy/${getValue<string>()}`,
              }}>
              {truncateHash(getValue<string>())}
            </StyledHashLink>
            <StyledCopyToClipboard textToCopy={getValue<string>()} />
          </HashAndCopyToClipboardWrapper>
        ),
        enableSorting: false,
      },
      {
        header: `${t('block-hash')}`,
        id: 'blockHash',
        accessorKey: 'blockHash',
        cell: ({ getValue }) => (
          <HashAndCopyToClipboardWrapper>
            <StyledHashLink
              to={{
                pathname: `/block/${getValue<string>()}`,
              }}>
              {truncateHash(getValue<string>())}
            </StyledHashLink>
            <StyledCopyToClipboard textToCopy={getValue<string>()} />
          </HashAndCopyToClipboardWrapper>
        ),
        enableSorting: false,
      },
      {
        header: `${t('public-key')}`,
        id: 'publicKey',
        accessorKey: 'publicKey',
        cell: ({ getValue }) => (
          <HashAndCopyToClipboardWrapper>
            <StyledHashLink
              to={{
                pathname: `/account/${getValue<string>()}`,
              }}>
              {truncateHash(getValue<string>())}
            </StyledHashLink>
            <StyledCopyToClipboard textToCopy={getValue<string>()} />
          </HashAndCopyToClipboardWrapper>
        ),
        enableSorting: false,
      },
      {
        header: `${t('age')}`,
        accessorKey: 'timestamp',
        cell: ({ getValue }) => (
          <Age>{formatTimeAgo(new Date(getValue<number>()))}</Age>
        ),
      },
      {
        header: `${t('contract')}`,
        accessorKey: 'contractType',
        cell: ({ getValue }) => capitalizeWords(getValue<string>()),
        enableSorting: false,
      },
      {
        header: () => <MoneyTextHeader>{t('amount')}</MoneyTextHeader>,
        accessorKey: 'amount',
        cell: ({ getValue }) => {
          const { motes, usd } = getValue<{ motes: number; usd: number }>();

          const amountCspr = standardizeNumber((motes / 10 ** 9).toFixed(3));
          const amountUsd = standardizeNumber((usd / 10 ** 9).toFixed(3));

          return (
            <MoneyTextWrapper>
              <CSPRText>
                {amountCspr} {t('cspr')}
              </CSPRText>
              <UsdText>${amountUsd}</UsdText>
            </MoneyTextWrapper>
          );
        },
        enableSorting: false,
        minSize: 250,
      },
      {
        header: () => <MoneyTextHeader>{t('cost')}</MoneyTextHeader>,
        accessorKey: 'cost',
        cell: ({ getValue }) => {
          const { motes, usd } = getValue<{ motes: number; usd: number }>();

          const costCspr = standardizeNumber((motes / 10 ** 9).toFixed(3));
          const costUsd = standardizeNumber((usd / 10 ** 9).toFixed(3));

          return (
            <MoneyTextWrapper>
              <CSPRText>
                {costCspr} {t('cspr')}
              </CSPRText>
              <UsdText>${costUsd}</UsdText>
            </MoneyTextWrapper>
          );
        },
        enableSorting: false,
        minSize: 250,
      },
    ],
    [t],
  );

  const onSortingChange: OnChangeFn<SortingState> = updaterOrValue => {
    setIsTableLoading(true);

    if (updaterOrValue instanceof Function) {
      const [updatedVal] = updaterOrValue([
        {
          id: deploysTableOptions.sorting.sortBy,
          desc: deploysTableOptions.sorting.order === 'desc',
        },
      ]);

      let order: 'desc' | 'asc' = 'desc';
      if (deploysTableOptions.sorting.sortBy === updatedVal.id) {
        order = updatedVal.desc ? 'desc' : 'asc';
      }

      dispatch(
        updateDeploysSorting({
          sortBy: updatedVal.id,
          order,
        }),
      );
    }
  };

  return (
    <Table<ApiData.ProcessedSidecarDeploy>
      header={header}
      columns={columns}
      data={deploys}
      footer={footer}
      tableBodyLoading={isTableLoading || isLoadingPage}
      isLastPage={totalPages === deploysTableOptions.pagination.pageNum}
      currentPageSize={deploysTableOptions.pagination.pageSize}
      placeholderData={{
        deployHash:
          '3b0fddb3ed65ddf076892dddbcb98694921e74ea90d33137121a58985859ddcf',
        blockHash:
          '92d9b84db79132a77f76216c7d81b2243fe92ef26db885ae0d64ee585e4799fa',
        publicKey:
          '0202ed20f3a93b5386bc41b6945722b2bd4250c48f5fa0632adf546e2f3ff6f4ddee',
        timestamp: '2023-06-15T22:13:16.579Z',
        contractType: 'Transfer',
        amountMotes: '505124902204510',
        costMotes: '100000000',
      }}
      sorting={[
        {
          id: deploysTableOptions.sorting.sortBy,
          desc: deploysTableOptions.sorting.order === 'desc',
        },
      ]}
      onSortingChange={onSortingChange}
    />
  );
};

const HashAndCopyToClipboardWrapper = styled.div`
  white-space: nowrap;
`;

const StyledHashLink = styled(Link)`
  color: ${props => props.theme.text.hash};
`;

const Age = styled.div`
  white-space: nowrap;
`;

const CSPRText = styled.span`
  font-size: ${pxToRem(18)};
  font-family: ${DEFAULT_SECONDARY_FONT_FAMILIES};
  display: flex;
  justify-content: flex-end;
`;

const UsdText = styled.div`
  font-size: ${pxToRem(14)};
  display: flex;
  justify-content: flex-end;
`;

const MoneyTextWrapper = styled.div``;

const MoneyTextHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DeploysTableHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.text.secondary};
`;

const DeploysTableTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const TotalRows = styled.p`
  margin-right: 1.5rem;
  white-space: nowrap;
`;

const DeploysTableFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: ${pxToRem(20)} 2rem;
  padding: ${pxToRem(20)} 1.5rem;
  min-width: ${pxToRem(450)};

  @media (min-width: ${defaultTheme.breakpoints.lg}) {
    justify-content: flex-end;
    padding: ${pxToRem(20)} 2rem;
  }
`;
