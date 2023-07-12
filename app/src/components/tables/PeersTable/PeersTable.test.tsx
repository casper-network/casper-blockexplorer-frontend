import React from 'react';
import { screen } from '@testing-library/react';
import { Table } from 'src/components';
import {
  getMockPeers,
  mockPeersTableColumns,
  getMockPeersTableHeader,
  getMockPeersTableFooter,
  mockPeersTableOptions,
} from '../../../mocks/mock-peers-table';
import { render } from '../../../test-utils';

const mockPeers = getMockPeers();
const mockPeersTableHeader = getMockPeersTableHeader();
const mockPeersTableFooter = getMockPeersTableFooter();
const totalPages = Math.ceil(
  mockPeers.paginatedResult.length / mockPeersTableOptions.pagination.pageSize,
);
const totalColumns = mockPeersTableColumns.length;

describe('PeersTable', () => {
  beforeEach(() =>
    render(
      <Table
        header={mockPeersTableHeader}
        columns={mockPeersTableColumns}
        data={mockPeers.paginatedResult}
        footer={mockPeersTableFooter}
        currentPageSize={mockPeersTableOptions.pagination.pageSize}
        placeholderData={{}}
        isLastPage={totalPages === mockPeersTableOptions.pagination.pageSize}
      />,
    ),
  );

  it('should render Peers Table', () => {
    const peersTableHeader = screen.getByTestId('peers-table-header');
    const peersBaseTable = screen.getByTestId('base-table');
    const peersTableFooter = screen.getByTestId('peers-table-footer');

    expect(peersTableHeader).toBeInTheDocument();
    expect(peersBaseTable).toBeInTheDocument();
    expect(peersTableFooter).toBeInTheDocument();
  });

  it('should render Total Peers', () => {
    const totalPeers = screen.getByTestId('total-peers');
    expect(totalPeers).toHaveTextContent(mockPeers.totalPeers.toString());
  });

  it('should render a Node Id', () => {
    const nodeId = screen.getAllByTestId('node-id');
    expect(nodeId[0]).toHaveTextContent(mockPeers.paginatedResult[0].nodeId);
  });

  it('should render an Address', () => {
    const address = screen.getAllByTestId('address');
    expect(address[0]).toHaveTextContent(mockPeers.paginatedResult[0].address);
  });

  it('should render a loading PeersTable', () => {
    render(
      <Table
        header={mockPeersTableHeader}
        columns={mockPeersTableColumns}
        data={mockPeers.paginatedResult}
        footer={mockPeersTableFooter}
        tableBodyLoading
        currentPageSize={mockPeersTableOptions.pagination.pageSize}
        placeholderData={{}}
        isLastPage={totalPages === mockPeersTableOptions.pagination.pageSize}
      />,
    );
    const skeletonLoader = screen.getAllByTestId('skeleton-loader');
    expect(skeletonLoader).toHaveLength(
      mockPeers.paginatedResult.length * totalColumns,
    );
  });
});
