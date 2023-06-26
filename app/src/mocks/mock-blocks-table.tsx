import React from 'react';
import { ApiData } from 'src/api/types';
import { ColumnDef } from '@tanstack/react-table';
import {
  Spacer,
  NumberedPagination,
  StyledCopyToClipboard,
} from 'src/components';
import { setBlocksTableOptions, updateBlocksPageNum } from 'src/store';

import {
  Age,
  HashAndCopyToClipboardWrapper,
  StyledHashLink,
  SwitchBlocktime,
} from 'src/components/tables/BlockTable/BlocksTable';
import {
  formatDate,
  formatTimeAgo,
  standardizeNumber,
  truncateHash,
} from 'src/utils';
import { TableOptions } from 'src/store/types';

const showTimestamp = true;

export const getMockBlocks = () => [
  {
    hash: '11111111111',
    header: {
      parent_hash: '111',
      state_root_hash: '222',
      body_hash: '333',
      random_bit: false,
      accumulated_seed: 'testSeed',
      era_end: null,
      timestamp: '2023-06-23T18:14:15+00:00',
      era_id: 1,
      height: 1,
      protocol_version: 'testProtocol',
    },
    body: { proposer: '22222222222', deploy_hashes: [], transfer_hashes: [] },
    proofs: [],
  },
  {
    hash: '11111111111',
    header: {
      parent_hash: '111',
      state_root_hash: '222',
      body_hash: '333',
      random_bit: false,
      accumulated_seed: 'testSeed',
      era_end: null,
      timestamp: '2023-06-23T18:14:15+00:00',
      era_id: 2,
      height: 2,
      protocol_version: 'testProtocol',
    },
    body: { proposer: '22222222222', deploy_hashes: [], transfer_hashes: [] },
    proofs: [],
  },
  {
    hash: '11111111111',
    header: {
      parent_hash: '111',
      state_root_hash: '222',
      body_hash: '333',
      random_bit: false,
      accumulated_seed: 'testSeed',
      era_end: null,
      timestamp: '2023-06-23T18:14:15+00:00',
      era_id: 3,
      height: 3,
      protocol_version: 'testProtocol',
    },
    body: { proposer: '22222222222', deploy_hashes: [], transfer_hashes: [] },
    proofs: [],
  },
  {
    hash: '11111111111',
    header: {
      parent_hash: '111',
      state_root_hash: '222',
      body_hash: '333',
      random_bit: false,
      accumulated_seed: 'testSeed',
      era_end: null,
      timestamp: '2023-06-23T18:14:15+00:00',
      era_id: 4,
      height: 4,
      protocol_version: 'testProtocol',
    },
    body: { proposer: '22222222222', deploy_hashes: [], transfer_hashes: [] },
    proofs: [],
  },
  {
    hash: '11111111111',
    header: {
      parent_hash: '111',
      state_root_hash: '222',
      body_hash: '333',
      random_bit: false,
      accumulated_seed: 'testSeed',
      era_end: null,
      timestamp: '2023-06-23T18:14:15+00:00',
      era_id: 5,
      height: 5,
      protocol_version: 'testProtocol',
    },
    body: { proposer: '22222222222', deploy_hashes: [], transfer_hashes: [] },
    proofs: [],
  },
  {
    hash: '11111111111',
    header: {
      parent_hash: '111',
      state_root_hash: '222',
      body_hash: '333',
      random_bit: false,
      accumulated_seed: 'testSeed',
      era_end: null,
      timestamp: '2023-06-23T18:14:15+00:00',
      era_id: 6,
      height: 6,
      protocol_version: 'testProtocol',
    },
    body: { proposer: '22222222222', deploy_hashes: [], transfer_hashes: [] },
    proofs: [],
  },
  {
    hash: '11111111111',
    header: {
      parent_hash: '111',
      state_root_hash: '222',
      body_hash: '333',
      random_bit: false,
      accumulated_seed: 'testSeed',
      era_end: null,
      timestamp: '2023-06-23T18:14:15+00:00',
      era_id: 7,
      height: 7,
      protocol_version: 'testProtocol',
    },
    body: { proposer: '22222222222', deploy_hashes: [], transfer_hashes: [] },
    proofs: [],
  },
  {
    hash: '11111111111',
    header: {
      parent_hash: '111',
      state_root_hash: '222',
      body_hash: '333',
      random_bit: false,
      accumulated_seed: 'testSeed',
      era_end: null,
      timestamp: '2023-06-23T18:14:15+00:00',
      era_id: 8,
      height: 8,
      protocol_version: 'testProtocol',
    },
    body: { proposer: '22222222222', deploy_hashes: [], transfer_hashes: [] },
    proofs: [],
  },
  {
    hash: '11111111111',
    header: {
      parent_hash: '111',
      state_root_hash: '222',
      body_hash: '333',
      random_bit: false,
      accumulated_seed: 'testSeed',
      era_end: null,
      timestamp: '2023-06-23T18:14:15+00:00',
      era_id: 9,
      height: 9,
      protocol_version: 'testProtocol',
    },
    body: { proposer: '22222222222', deploy_hashes: [], transfer_hashes: [] },
    proofs: [],
  },
  {
    hash: '11111111111',
    header: {
      parent_hash: '111',
      state_root_hash: '222',
      body_hash: '333',
      random_bit: false,
      accumulated_seed: 'testSeed',
      era_end: null,
      timestamp: '2023-06-23T18:14:15+00:00',
      era_id: 10,
      height: 10,
      protocol_version: 'testProtocol',
    },
    body: { proposer: '22222222222', deploy_hashes: [], transfer_hashes: [] },
    proofs: [],
  },
];

export const mockBlocksTableOptions: TableOptions = {
  pagination: {
    pageSize: 10,
    pageNum: 1,
  },
  sorting: {
    sortBy: '',
    order: 'desc',
  },
};

export const getMockRowCountSelectOptions = () => [
  {
    value: 'string',
    label: 'string',
  },
];

export const getMockBlocksTableHeader = () => (
  <div data-testid="blocks-table-header">
    <Spacer />
    <NumberedPagination
      tableOptions={mockBlocksTableOptions}
      setTableOptions={setBlocksTableOptions}
      rowCountSelectOptions={getMockRowCountSelectOptions()}
      setIsTableLoading={jest.fn()}
      totalPages={1}
      updatePageNum={updateBlocksPageNum}
      removeRowsSelect
    />
  </div>
);

export const getMockBlocksTableFooter = () => (
  <div data-testid="blocks-table-footer">
    <Spacer />
    <NumberedPagination
      tableOptions={mockBlocksTableOptions}
      setTableOptions={setBlocksTableOptions}
      rowCountSelectOptions={getMockRowCountSelectOptions()}
      setIsTableLoading={jest.fn()}
      totalPages={1}
      updatePageNum={updateBlocksPageNum}
      removeRowsSelect
    />
  </div>
);

export const mockBlocksTableColumns: ColumnDef<ApiData.Block>[] = [
  {
    header: 'Block Height',
    id: 'height',
    accessorKey: 'header.height',
    cell: ({ getValue }) => (
      <div data-testid="block-height">
        {standardizeNumber(getValue<number>())}
      </div>
    ),
  },
  {
    header: 'Era',
    accessorKey: 'header.era_id',
    maxSize: 100,
    enableSorting: false,
    cell: ({ getValue }) => <div data-testid="era">{getValue<number>()}</div>,
  },
  {
    header: 'Deploy',
    accessorKey: 'body',
    cell: ({ getValue }) => {
      const body = getValue<ApiData.Block['body']>();

      return (
        <div data-testid="deploys">
          {(body.deploy_hashes?.length ?? 0) +
            (body.transfer_hashes?.length ?? 0)}
        </div>
      );
    },
    maxSize: 100,
    enableSorting: false,
  },
  {
    // @ts-ignore
    header: (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <SwitchBlocktime onClick={() => {}}>
        {showTimestamp ? 'datetime' : 'age'}
      </SwitchBlocktime>
    ),
    accessorKey: 'header.timestamp',
    cell: ({ getValue }) => (
      <Age data-testid="timestamp">
        {showTimestamp
          ? formatDate(new Date(getValue<number>()))
          : formatTimeAgo(new Date(getValue<number>()))}
      </Age>
    ),
    enableSorting: false,
    minSize: 200,
  },
  {
    header: 'Block Hash',
    accessorKey: 'hash',
    cell: ({ getValue }) => (
      <HashAndCopyToClipboardWrapper data-testid="block-hash-link">
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
    minSize: 230,
  },
  {
    header: 'Validator',
    accessorKey: 'body.proposer',
    cell: ({ getValue }) => (
      <HashAndCopyToClipboardWrapper data-testid="validator-link">
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
    minSize: 230,
  },
];
