import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ApiData } from 'src/api/types';
import { NumberedPagination, StyledCopyToClipboard } from 'src/components';
import { TableOptions } from 'src/store/types';
import { setValidatorTableOptions, updateValidatorPageNum } from 'src/store';
import {
  CSPRText,
  HashAndCopyToClipboardWrapper,
  StyledHashLink,
} from 'src/components/tables/ValidatorTable/ValidatorTable';
import { standardizeNumber, truncateHash } from 'src/utils';
import { standardizePercentage } from 'src/utils/standardize-percentage';

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
  status: { validatorsCount: 100, bidsCount: 110, latestEraId: 8887 },
});

export const getMockNextEraValidators = () => ({
  validators: [
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
  status: { validatorsCount: 100, bidsCount: 110, latestEraId: 8888 },
});

export const mockValidatorsTableOptions: TableOptions = {
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

export const getMockValidatorsTableHeader = () => (
  <div data-testid="validators-table-header">
    {/* <EraToggleButton type="button" onClick={jest.fn} selected={isCurrentEra}>
      Current Era {currentEraId ?? ''}
    </EraToggleButton>
    <EraToggleButton type="button" selected={!isCurrentEra} onClick={jest.fn}>
      Next Era {currentEraId ? currentEraId + 1 : ''}
    </EraToggleButton> */}
    <NumberedPagination
      tableOptions={mockValidatorsTableOptions}
      setTableOptions={setValidatorTableOptions}
      rowCountSelectOptions={mockRowCountSelectOptions}
      setIsTableLoading={jest.fn}
      totalPages={1}
      updatePageNum={updateValidatorPageNum}
    />
    ;
  </div>
);

export const getMockValidatorsTableFooter = () => (
  <div data-testid="validators-table-footer">
    <NumberedPagination
      tableOptions={mockValidatorsTableOptions}
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
      <HashAndCopyToClipboardWrapper>
        <StyledHashLink
          data-testid="styled-hash-link"
          to={{
            pathname: `/account/${getValue<string>()}`,
          }}>
          {truncateHash(getValue<string>())}
        </StyledHashLink>
        <StyledCopyToClipboard textToCopy={getValue<string>()} />
      </HashAndCopyToClipboardWrapper>
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
      <CSPRText data-testid="total-stake">
        {standardizeNumber((getValue<number>() / 10 ** 9).toFixed(0))}
      </CSPRText>
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
