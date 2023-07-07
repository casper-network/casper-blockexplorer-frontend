import React from 'react';
import { NumberedPagination } from 'src/components';
import { TableOptions } from 'src/store/types';
import { setDeploysTableOptions, updateDeploysPageNum } from 'src/store';
import { ColumnDef } from '@tanstack/react-table';
import { ApiData } from 'src/api/types';
import { Link } from 'react-router-dom';
import { truncateHash, formatTimeAgo, standardizeNumber } from 'src/utils';
import { capitalizeWords } from 'src/utils/string';

export const getMockProcessedSidecarDeploy = () => [
  {
    deployHash:
      '4b0fddb3ed65ddf076892dddbcb98694921e74ea90d33137121a58985859ddcf',
    blockHash:
      '92d9b84db79132a77f76216c7d81b2243fe92ef26db885ae0d64ee585e4799fa',
    publicKey:
      '0202ed20f3a93b5386bc41b6945722b2bd4250c48f5fa0632adf546e2f3ff6f4ddee',
    timestamp: '2023-06-15T22:13:16.579Z',
    contractType: 'Transfer',
    amount: {
      motes: '505124902204510',
      usd: '5051249902',
    },
    cost: {
      motes: '100000000',
      usd: '10000000',
    },
    csprToUsdConversion: 10,
  },
  {
    deployHash:
      '4b0fddb3ed65ddf076892dddbcb98694921e74ea90d33137121a58985859ddcf',
    blockHash:
      '92d9b84db79132a77f76216c7d81b2243fe92ef26db885ae0d64ee585e4799fa',
    publicKey:
      '0202ed20f3a93b5386bc41b6945722b2bd4250c48f5fa0632adf546e2f3ff6f4ddee',
    timestamp: '2023-06-15T22:13:16.579Z',
    contractType: 'Transfer',
    amount: {
      motes: '505124902204510',
      usd: '5051249902',
    },
    cost: {
      motes: '100000000',
      usd: '10000000',
    },
    csprToUsdConversion: 10,
  },
  {
    deployHash:
      '4b0fddb3ed65ddf076892dddbcb98694921e74ea90d33137121a58985859ddcf',
    blockHash:
      '92d9b84db79132a77f76216c7d81b2243fe92ef26db885ae0d64ee585e4799fa',
    publicKey:
      '0202ed20f3a93b5386bc41b6945722b2bd4250c48f5fa0632adf546e2f3ff6f4ddee',
    timestamp: '2023-06-15T22:13:16.579Z',
    contractType: 'Transfer',
    amount: {
      motes: '505124902204510',
      usd: '5051249902',
    },
    cost: {
      motes: '100000000',
      usd: '10000000',
    },
    csprToUsdConversion: 10,
  },
];

const mockProcessedSidecarDeploys = getMockProcessedSidecarDeploy();
const totalDeploys = mockProcessedSidecarDeploys.length;

export const mockDeploysTableOptions: TableOptions = {
  pagination: {
    pageSize: totalDeploys,
    pageNum: 1,
  },
  sorting: {
    sortBy: '',
    order: 'desc',
  },
};

const mockRowCountSelectOptions = [
  {
    value: 'string',
    label: 'string',
  },
];

export const getMockDeploysTableHeader = () => (
  <div data-testid="deploys-table-header">
    <div data-testid="total-rows">`${totalDeploys} total rows`</div>
    <NumberedPagination
      tableOptions={mockDeploysTableOptions}
      setTableOptions={setDeploysTableOptions}
      rowCountSelectOptions={mockRowCountSelectOptions}
      setIsTableLoading={jest.fn}
      totalPages={1}
      updatePageNum={updateDeploysPageNum}
    />
    ;
  </div>
);

export const getMockDeploysTableFooter = () => (
  <div data-testid="deploys-table-footer">
    <NumberedPagination
      tableOptions={mockDeploysTableOptions}
      setTableOptions={setDeploysTableOptions}
      rowCountSelectOptions={mockRowCountSelectOptions}
      setIsTableLoading={jest.fn}
      totalPages={1}
      updatePageNum={updateDeploysPageNum}
    />
    ;
  </div>
);

export const mockDeploysTableColumns: ColumnDef<ApiData.ProcessedSidecarDeploy>[] =
  [
    {
      header: 'Deploy Hash',
      id: 'deployHash',
      accessorKey: 'deployHash',
      cell: ({ getValue }) => {
        return (
          <div>
            <Link
              data-testid="deploy-hash-link"
              to={{
                pathname: `/deploy/${getValue<string>()}`,
              }}>
              {truncateHash(getValue<string>())}
            </Link>
          </div>
        );
      },
      enableSorting: false,
    },
    {
      header: 'Block Hash',
      id: 'blockHash',
      accessorKey: 'blockHash',
      cell: ({ getValue }) => (
        <div>
          <Link
            data-testid="block-hash-link"
            to={{
              pathname: `/block/${getValue<string>()}`,
            }}>
            {truncateHash(getValue<string>())}
          </Link>
        </div>
      ),
      enableSorting: false,
    },
    {
      header: 'Public Key',
      id: 'publicKey',
      accessorKey: 'publicKey',
      cell: ({ getValue }) => (
        <div>
          <Link
            data-testid="public-key-link"
            to={{
              pathname: `/account/${getValue<string>()}`,
            }}>
            {truncateHash(getValue<string>())}
          </Link>
        </div>
      ),
      enableSorting: false,
    },
    {
      header: 'Age',
      accessorKey: 'timestamp',
      cell: ({ getValue }) => (
        <div data-testid="timestamp">
          {formatTimeAgo(new Date(getValue<number>()))}
        </div>
      ),
    },
    {
      header: 'Contract',
      accessorKey: 'contractType',
      cell: ({ getValue }) => (
        <div data-testid="contract-type">
          {capitalizeWords(getValue<string>())}
        </div>
      ),
      enableSorting: false,
    },
    {
      header: () => <div>Amount</div>,
      accessorKey: 'amount',
      cell: ({ getValue }) => {
        const { motes, usd } = getValue<{ motes: number; usd: number }>();

        const amountCspr = standardizeNumber((motes / 10 ** 9).toFixed(3));
        const amountUsd = standardizeNumber((usd / 10 ** 9).toFixed(3));

        return (
          <div>
            <span data-testid="amount-motes">{amountCspr} cspr</span>
            <span data-testid="amount-usd">${amountUsd}</span>
          </div>
        );
      },
      enableSorting: false,
      minSize: 250,
    },
    {
      header: () => <div>cost</div>,
      accessorKey: 'cost',
      cell: ({ getValue }) => {
        const { motes, usd } = getValue<{ motes: number; usd: number }>();

        const costCspr = standardizeNumber((motes / 10 ** 9).toFixed(3));
        const costUsd = standardizeNumber((usd / 10 ** 9).toFixed(3));

        return (
          <div>
            <span data-testid="cost-motes">{costCspr} cspr</span>
            <span data-testid="cost-usd">${costUsd}</span>
          </div>
        );
      },
      enableSorting: false,
      minSize: 250,
    },
  ];
