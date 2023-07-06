import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { NumberedPagination } from 'src/components';
import { TableOptions } from 'src/store/types';
import { Link } from 'react-router-dom';
import { ApiData } from 'src/api/types';
import { capitalizeWords } from 'src/utils/string';
import { formatTimeAgo, standardizeNumber, truncateHash } from 'src/utils';
import { setDeploysTableOptions, updateDeploysPageNum } from 'src/store';

export const getMockProcessedSidecarDeploy = () => ({
  deploys: [
    {
      deployHash:
        '4b0fddb3ed65ddf076892dddbcb98694921e74ea90d33137121a58985859ddcf',
      blockHash:
        '92d9b84db79132a77f76216c7d81b2243fe92ef26db885ae0d64ee585e4799fa',
      publicKey:
        '0202ed20f3a93b5386bc41b6945722b2bd4250c48f5fa0632adf546e2f3ff6f4ddee',
      timestamp: '2023-06-15T22:13:16.579Z',
      contractType: 'Transfer',
      amountMotes: '505124902204510',
      costMotes: '100000000',
    },
  ],
});

export const mockDeploysTableOptions: TableOptions = {
  pagination: {
    pageSize: 10,
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
    <div>500 total rows</div>
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
      cell: ({ getValue }) => (
        <div>
          <Link
            data-testid="deploy-hash-link"
            to={{
              pathname: `/deploy/${getValue<string>()}`,
            }}>
            {truncateHash(getValue<string>())}
            {/* {truncateHash(
              '4b0fddb3ed65ddf076892dddbcb98694921e74ea90d33137121a58985859ddcf',
            )} */}
          </Link>
        </div>
      ),
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
            {truncateHash(
              '92d9b84db79132a77f76216c7d81b2243fe92ef26db885ae0d64ee585e4799fa',
            )}
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
            {truncateHash(
              '0202ed20f3a93b5386bc41b6945722b2bd4250c48f5fa0632adf546e2f3ff6f4ddee',
            )}
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
          {formatTimeAgo(new Date('2023-06-15T22:13:16.579Z'))}
        </div>
      ),
    },
    {
      header: 'Contract',
      accessorKey: 'contractType',
      cell: ({ getValue }) => (
        <div data-testid="contract-type">{capitalizeWords('Transfer')}</div>
      ),
      enableSorting: false,
    },
    {
      header: 'Amount',
      accessorKey: 'amountMotes',
      cell: ({ getValue }) => (
        <span data-testid="amount-motes">
          {standardizeNumber((505124902204510 / 10 ** 9).toFixed(0))}{' '}
        </span>
      ),
      enableSorting: false,
      minSize: 200,
    },
    {
      header: 'Cost',
      accessorKey: 'costMotes',
      cell: ({ getValue }) => (
        <span data-testid="cost-motes">
          {standardizeNumber((100000000 / 10 ** 9).toFixed(0))}{' '}
        </span>
      ),
      enableSorting: false,
      minSize: 200,
    },
  ];
