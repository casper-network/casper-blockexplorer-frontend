import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { NumberedPagination } from 'src/components';
import { setDeploysTableOptions, updateDeploysPageNum } from 'src/store';
import { TableOptions } from 'src/store/types';
import { ApiData } from 'src/api/types';

import { standardizeNumber } from 'src/utils';
import { Link } from 'react-router-dom';

export const getMockProcessedSidecarDeploys = () => [
  {
    timestamp: 2023,
    deployHash:
      '3003b32cec89081b96502752f2dab6a74ed64803271dee78d9b5c487270cadeb',
    blockHash:
      'b2a3dbe2a6ac18a011ccede2205191021c27c7d08a497a90849a4207c9655859',
    publicKey:
      '01a35887f3962a6a232e8e11fa7d4567b6866d68850974aad7289ef287676825f6',
    contractType: 'revoke_bid',
    deployType: 'StoredContractByHash',
    amountMotes: '32342342343',
    costMotes: '5794181780',
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
            {/* {truncateHash(getValue<string>())} */}
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
            {/* {truncateHash(getValue<string>())} */}
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
            {/* {truncateHash(getValue<string>())} */}
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
          {/* {formatTimeAgo(new Date(getValue<number>()))} */}
        </div>
      ),
    },
    {
      header: 'Contract',
      accessorKey: 'contractType',
      cell: ({ getValue }) => (
        <div data-testid="contract-type">
          {/* {capitalizeWords(getValue<string>())} */}
        </div>
      ),
      enableSorting: false,
    },
    {
      header: 'Amount',
      accessorKey: 'amountMotes',
      cell: ({ getValue }) => (
        <span data-testid="amount-motes">
          {standardizeNumber((getValue<number>() / 10 ** 9).toFixed(0))}{' '}
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
          {standardizeNumber((getValue<number>() / 10 ** 9).toFixed(0))}{' '}
        </span>
      ),
      enableSorting: false,
      minSize: 200,
    },
  ];
