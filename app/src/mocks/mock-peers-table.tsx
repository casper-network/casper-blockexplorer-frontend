import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ApiData } from 'src/api/types';
import { NumberedPagination } from 'src/components';
import { TableOptions } from 'src/store/types';
import { setPeerTableOptions, updateValidatorPageNum } from 'src/store';

export const getMockPeers = () => ({
  paginatedResult: [
    { nodeId: 'tls:9a2c..2889', address: '144.76.85.204:35000' },
    { nodeId: 'tls:9a2c..2881', address: '144.76.85.205:35000' },
  ],
  totalPeers: 233,
});

export const mockPeersTableOptions: TableOptions = {
  pagination: {
    pageSize: 1,
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

export const getMockPeersTableHeader = () => (
  <div data-testid="peers-table-header">
    <div data-testid="total-peers">233 total rows</div>
    <NumberedPagination
      tableOptions={mockPeersTableOptions}
      setTableOptions={setPeerTableOptions}
      rowCountSelectOptions={mockRowCountSelectOptions}
      setIsTableLoading={jest.fn}
      totalPages={1}
      updatePageNum={updateValidatorPageNum}
    />
    ;
  </div>
);

export const getMockPeersTableFooter = () => (
  <div data-testid="peers-table-footer">
    <NumberedPagination
      tableOptions={mockPeersTableOptions}
      setTableOptions={setPeerTableOptions}
      rowCountSelectOptions={mockRowCountSelectOptions}
      setIsTableLoading={jest.fn}
      totalPages={1}
      updatePageNum={updateValidatorPageNum}
    />
  </div>
);

export const mockPeersTableColumns: ColumnDef<ApiData.Peer>[] = [
  {
    header: 'Node Id',
    accessorKey: 'nodeId',
    enableSorting: false,
    size: 250,
    cell: ({ getValue }) => (
      <div data-testid="node-id">{getValue<string>()}</div>
    ),
  },
  {
    header: 'Address',
    accessorKey: 'address',
    enableSorting: false,
    size: 250,
    cell: ({ getValue }) => (
      <div data-testid="address">{getValue<string>()}</div>
    ),
  },
];
