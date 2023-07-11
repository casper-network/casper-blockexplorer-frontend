import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ApiData } from 'src/api/types';
import { NumberedPagination } from 'src/components';
import { TableOptions } from 'src/store/types';
import { setValidatorTableOptions, updateValidatorPageNum } from 'src/store';
import { standardizeNumber, truncateHash } from 'src/utils';
import { standardizePercentage } from 'src/utils/standardize-percentage';
import { Link } from 'react-router-dom';

export const getMockCurrentEraValidators = () => ({
  validators: [
    {
      publicKey:
        '015692c70f62a5227b4af46b90f03b0966725d8101215dfcf395445459e5ba2fad',
      totalStakeMotes: 115914132215810220,
      feePercentage: 10,
      delegatorsCount: 5,
      selfPercentage: 1.37,
      percentageOfNetwork: 1.33,
      rank: 25,
    },
  ],
  status: { validatorsCount: 100, bidsCount: 110, latestEraId: 8888 },
});

export const getMockNextEraValidators = () => ({
  nextEraValidators: [
    {
      publicKey:
        '015692c70f62a5227b4af46b90f03b0966725d8101215dfcf395445459e5ba2fad',
      totalStakeMotes: 115929495810390480,
      feePercentage: 10,
      delegatorsCount: 5,
      selfPercentage: 1.37,
      percentageOfNetwork: 1.33,
      rank: 25,
    },
  ],
  status: { validatorsCount: 100, bidsCount: 110, latestEraId: 8889 },
});

const mockCurrentEraValidators = getMockCurrentEraValidators();
const { validators } = mockCurrentEraValidators;

export const mockCurrentEraValidatorsTableOptions: TableOptions = {
  pagination: {
    pageSize: validators.length,
    pageNum: 1,
  },
  sorting: {
    sortBy: '',
    order: 'desc',
  },
};

const mockNextEraValidators = getMockNextEraValidators();
const { nextEraValidators } = mockNextEraValidators;

export const mockNextEraValidatorsTableOptions: TableOptions = {
  pagination: {
    pageSize: nextEraValidators.length,
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

export const getMockCurrentEraValidatorsTableHeader = () => (
  <div data-testid="validators-table-header">
    <NumberedPagination
      tableOptions={mockCurrentEraValidatorsTableOptions}
      setTableOptions={setValidatorTableOptions}
      rowCountSelectOptions={mockRowCountSelectOptions}
      setIsTableLoading={jest.fn}
      totalPages={1}
      updatePageNum={updateValidatorPageNum}
    />
    ;
  </div>
);

export const getMockCurrentEraValidatorsTableFooter = () => (
  <div data-testid="validators-table-footer">
    <NumberedPagination
      tableOptions={mockCurrentEraValidatorsTableOptions}
      setTableOptions={setValidatorTableOptions}
      rowCountSelectOptions={mockRowCountSelectOptions}
      setIsTableLoading={jest.fn}
      totalPages={1}
      updatePageNum={updateValidatorPageNum}
    />
    ;
  </div>
);

export const getMockNextEraValidatorsTableHeader = () => (
  <div data-testid="validators-table-header">
    <NumberedPagination
      tableOptions={mockNextEraValidatorsTableOptions}
      setTableOptions={setValidatorTableOptions}
      rowCountSelectOptions={mockRowCountSelectOptions}
      setIsTableLoading={jest.fn}
      totalPages={1}
      updatePageNum={updateValidatorPageNum}
    />
    ;
  </div>
);

export const getMockNextEraValidatorsTableFooter = () => (
  <div data-testid="validators-table-footer">
    <NumberedPagination
      tableOptions={mockNextEraValidatorsTableOptions}
      setTableOptions={setValidatorTableOptions}
      rowCountSelectOptions={mockRowCountSelectOptions}
      setIsTableLoading={jest.fn}
      totalPages={1}
      updatePageNum={updateValidatorPageNum}
    />
    ;
  </div>
);

export const mockValidatorsTableColumns: ColumnDef<ApiData.ValidatorsInfo>[] = [
  {
    header: 'Rank',
    accessorKey: 'rank',
    enableSorting: false,
    maxSize: 100,
    cell: ({ getValue }) => <div data-testid="rank">{getValue<number>()}</div>,
  },
  {
    header: 'Public Key',
    accessorKey: 'publicKey',
    enableSorting: false,
    minSize: 200,
    cell: ({ getValue }) => (
      <div>
        <Link
          data-testid="truncated-public-key"
          to={{
            pathname: `/account/${getValue<string>()}`,
          }}>
          {truncateHash(getValue<string>())}
        </Link>
      </div>
    ),
  },
  {
    header: 'Fee',
    accessorKey: 'feePercentage',
    maxSize: 125,
    cell: ({ getValue }) => (
      <div data-testid="fee">
        {standardizePercentage(getValue<number>(), 2)}
      </div>
    ),
  },
  {
    header: 'Delegators',
    accessorKey: 'delegatorsCount',
    maxSize: 125,
    cell: ({ getValue }) => (
      <div data-testid="delegators">
        {standardizeNumber(getValue<number>())}
      </div>
    ),
  },
  {
    header: 'Total Stake',
    accessorKey: 'totalStakeMotes',
    minSize: 200,
    cell: ({ getValue }) => (
      <span data-testid="total-stake">
        {standardizeNumber((getValue<number>() / 10 ** 9).toFixed(0))}
      </span>
    ),
  },
  {
    header: 'Self Percentage',
    accessorKey: 'selfPercentage',
    maxSize: 150,
    cell: ({ getValue }) => (
      <div data-testid="self-percentage">
        {standardizePercentage(getValue<number>(), 2)}
      </div>
    ),
  },
  {
    header: 'Network Percentage',
    accessorKey: 'percentageOfNetwork',
    maxSize: 150,
    cell: ({ getValue }) => (
      <div data-testid="percentage-of-network">
        {standardizePercentage(getValue<number>(), 2)}
      </div>
    ),
  },
];
