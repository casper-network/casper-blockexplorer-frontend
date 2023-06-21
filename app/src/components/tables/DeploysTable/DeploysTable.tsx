import styled from '@emotion/styled';
import { ColumnDef } from '@tanstack/react-table';
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
  updateDeploysPageNum,
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
    dispatch(fetchDeploys());
  }, [dispatch]);

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
        enableSorting: false,
      },
      {
        header: `${t('contract')}`,
        accessorKey: 'contractType',
        cell: ({ getValue }) => capitalizeWords(getValue<string>()),
        enableSorting: false,
      },
      {
        header: `${t('amount')}`,
        accessorKey: 'amountMotes',
        cell: ({ getValue }) => (
          <CSPRText>
            {standardizeNumber((getValue<number>() / 10 ** 9).toFixed(0))}{' '}
            {t('cspr')}
          </CSPRText>
        ),
        enableSorting: false,
        minSize: 200,
      },
      {
        header: `${t('cost')}`,
        accessorKey: 'costMotes',
        cell: ({ getValue }) => (
          <CSPRText>
            {standardizeNumber((getValue<number>() / 10 ** 9).toFixed(0))}{' '}
            {t('cspr')}
          </CSPRText>
        ),
        enableSorting: false,
        minSize: 200,
      },
    ],
    [t],
  );

  return (
    <Table<ApiData.ProcessedSidecarDeploy>
      header={header}
      columns={columns}
      data={deploys}
      footer={footer}
      tableBodyLoading={isTableLoading || isLoadingPage}
      isLastPage={false}
      currentPageSize={10}
      placeholderData={{}}
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
  font-family: ${DEFAULT_SECONDARY_FONT_FAMILIES};
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

  @media (min-width: ${defaultTheme.typography.breakpoints.lg}) {
    justify-content: flex-end;
    padding: ${pxToRem(20)} 2rem;
  }
`;
