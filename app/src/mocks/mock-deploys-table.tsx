import React from 'react';
import { Link } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { NumberedPagination } from 'src/components';
import { TableOptions } from 'src/store/types';
import { ApiData } from '../api/types';
import { capitalizeWords } from '../utils/string';
import { formatTimeAgo, standardizeNumber, truncateHash } from '../utils';
import {
  setDeploysTableOptions,
  updateDeploysPageNum,
} from '../store/slices/deploy-slice';

export const getMockProcessedSidecarDeploy = () => [
  {
    amountMotes: '4900000000',
    blockHash:
      '517818104857df60b3ee56ee88caca7b6f5e7bbcde8921c3746508b0a5890141',
    contractType: 'Transfer',
    costMotes: '100000000',
    csprToUsdConversion: 0.03793136,
    deployHash:
      'a742a00a85b41754c39bbf1763ac6d0c298e1137b3f18392dab9ad8319733603',
    publicKey:
      '0202b12880c261f7327457c9b4237e423d1debf8a329429c0589cc74e0c5976d0d66',
    timestamp: '2023-07-05T18:49:16.292Z',
    // timestamp: 0.005,
  },
];

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
    <div>1</div>
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
      enableSorting: false,
      cell: ({ getValue }) => (
        <div>
          <Link
            data-testid="deploy-hash-link"
            to={{
              pathname: `/deploy/${getValue<string>()}`,
            }}>
            {/* {truncateHash(getValue<string>())} */}
            {truncateHash(
              'a742a00a85b41754c39bbf1763ac6d0c298e1137b3f18392dab9ad8319733603',
            )}
          </Link>
        </div>
      ),
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
              '517818104857df60b3ee56ee88caca7b6f5e7bbcde8921c3746508b0a5890141',
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
              '0202b12880c261f7327457c9b4237e423d1debf8a329429c0589cc74e0c5976d0d66',
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
          {formatTimeAgo(new Date('2023-07-05T18:49:16.292Z'))}
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
          {standardizeNumber((4900000000 / 10 ** 9).toFixed(0))}{' '}
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
