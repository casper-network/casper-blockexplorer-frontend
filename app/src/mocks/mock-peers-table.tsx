import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ApiData } from 'src/api/types';
import { NumberedPagination } from 'src/components';
import { TableOptions } from 'src/store/types';
import { setPeerTableOptions, updateValidatorPageNum } from 'src/store';

export const getMockPeers = () => ({
  paginatedResult: [
    { nodeId: 'tls:9a2c..2889', address: '144.76.85.204:35000' },
    { nodeId: 'tls:0152..1130', address: '65.108.127.242:35000' },
    { nodeId: 'tls:026d..121c', address: '3.141.144.131:35000' },
    { nodeId: 'tls:0309..c08f', address: '82.53.3.172:33216' },
    { nodeId: 'tls:0427..d740', address: '54.177.85.235:35000' },
    { nodeId: 'tls:9a2c..2888', address: '144.76.85.204:35000' },
    { nodeId: 'tls:0152..1137', address: '66.108.127.242:35000' },
    { nodeId: 'tls:026d..121a', address: '3.241.144.131:35000' },
    { nodeId: 'tls:0309..c08t', address: '82.63.3.172:33216' },
    { nodeId: 'tls:0427..d744', address: '54.187.85.235:35000' },
    { nodeId: 'tls:9a2c..2889', address: '144.76.85.204:35000' },
    { nodeId: 'tls:0152..1130', address: '65.108.127.242:35000' },
    { nodeId: 'tls:026d..121c', address: '3.141.144.131:35000' },
    { nodeId: 'tls:0309..c08f', address: '82.53.3.172:33216' },
    { nodeId: 'tls:0427..d740', address: '54.177.85.235:35000' },
    { nodeId: 'tls:9a2c..2888', address: '144.76.85.204:35000' },
    { nodeId: 'tls:0152..1137', address: '66.108.127.242:35000' },
    { nodeId: 'tls:026d..121a', address: '3.241.144.131:35000' },
    { nodeId: 'tls:0309..c08t', address: '82.63.3.172:33216' },
    { nodeId: 'tls:0427..d744', address: '54.187.85.235:35000' },
  ],
  totalPeers: 233,
});

const mockPeers = getMockPeers();
const { totalPeers, paginatedResult } = mockPeers;

export const mockPeersTableOptions: TableOptions = {
  pagination: {
    pageSize: paginatedResult.length,
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
    <div data-testid="total-peers">`${totalPeers} total rows`</div>
    <NumberedPagination
      tableOptions={mockPeersTableOptions}
      setTableOptions={setPeerTableOptions}
      rowCountSelectOptions={mockRowCountSelectOptions}
      setIsTableLoading={jest.fn}
      totalPages={2}
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
