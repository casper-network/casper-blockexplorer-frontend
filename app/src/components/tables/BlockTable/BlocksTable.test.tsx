import React from 'react';
import { screen } from '@testing-library/react';
import { Table } from 'src/components';
import {
  getMockBlocks,
  mockBlocksTableColumns,
  getMockBlocksTableFooter,
  getMockBlocksTableHeader,
  mockBlocksTableOptions,
  placeholderData,
} from 'src/mocks/mock-blocks-table';
import { formatDate, truncateHash } from 'src/utils';
import { render } from '../../../test-utils';

const blocks = getMockBlocks();
const mockBlocksTableFooter = getMockBlocksTableFooter();
const mockBlocksTableHeader = getMockBlocksTableHeader();
const totalPages = Math.ceil(
  blocks.length / mockBlocksTableOptions.pagination.pageSize,
);

describe('BlocksTable', () => {
  it('should render the BlocksTable', () => {
    render(
      <Table
        header={mockBlocksTableHeader}
        columns={mockBlocksTableColumns}
        currentPageSize={mockBlocksTableOptions.pagination.pageSize}
        isLastPage={totalPages === mockBlocksTableOptions.pagination.pageNum}
        data={blocks}
        footer={mockBlocksTableFooter}
        placeholderData={placeholderData}
      />,
    );
    const blocksBaseTable = screen.getByTestId('base-table');
    const blocksTableFooter = screen.getByTestId('blocks-table-footer');
    const blocksTableHeader = screen.getByTestId('blocks-table-header');

    expect(blocksBaseTable).toBeInTheDocument();
    expect(blocksTableFooter).toBeInTheDocument();
    expect(blocksTableHeader).toBeInTheDocument();
  });

  it('should render Timestamp', () => {
    render(
      <Table
        header={mockBlocksTableHeader}
        columns={mockBlocksTableColumns}
        currentPageSize={mockBlocksTableOptions.pagination.pageSize}
        isLastPage={totalPages === mockBlocksTableOptions.pagination.pageNum}
        data={blocks}
        footer={mockBlocksTableFooter}
        placeholderData={placeholderData}
      />,
    );
    const timestamp = screen.getAllByTestId('timestamp');
    expect(timestamp).toHaveLength(1);
    expect(timestamp[0]).toHaveTextContent(
      formatDate(new Date(blocks[0].header.timestamp)),
    );
  });

  it('should render block height', () => {
    render(
      <Table
        header={mockBlocksTableHeader}
        columns={mockBlocksTableColumns}
        currentPageSize={mockBlocksTableOptions.pagination.pageSize}
        isLastPage={totalPages === mockBlocksTableOptions.pagination.pageNum}
        data={blocks}
        footer={mockBlocksTableFooter}
        placeholderData={{
          header: {
            height: 0,
            era_id: 0,
            timestamp: '2023-06-05T17:06:44.864Z',
          },
          body: {
            proposer:
              '017d96b9a63abcb61c870a4f55187a0a7ac24096bdb5fc585c12a686a4d892009e',
            deploy_hashes: [],
            transfer_hashes: [],
          },
          hash: '52f7c16323868f73343335f26a484aed0067a3e769dc9187dbae6a305e2b59f3',
        }}
      />,
    );
    const blockHeight = screen.getAllByTestId('block-height');
    expect(blockHeight).toHaveLength(1);
    expect(blockHeight[0]).toHaveTextContent(
      blocks[0].header.height.toString(),
    );
  });

  it('should render era', () => {
    render(
      <Table
        header={mockBlocksTableHeader}
        columns={mockBlocksTableColumns}
        currentPageSize={mockBlocksTableOptions.pagination.pageSize}
        isLastPage={totalPages === mockBlocksTableOptions.pagination.pageNum}
        data={blocks}
        footer={mockBlocksTableFooter}
        placeholderData={placeholderData}
      />,
    );
    const era = screen.getAllByTestId('era');
    expect(era).toHaveLength(1);
    expect(era[0]).toHaveTextContent(blocks[0].header.era_id.toString());
  });

  it('should render validator links', () => {
    render(
      <Table
        header={mockBlocksTableHeader}
        columns={mockBlocksTableColumns}
        currentPageSize={mockBlocksTableOptions.pagination.pageSize}
        isLastPage={totalPages === mockBlocksTableOptions.pagination.pageNum}
        data={blocks}
        footer={mockBlocksTableFooter}
        placeholderData={placeholderData}
      />,
    );
    const validatorLink = screen.getAllByTestId('validator-link');
    expect(validatorLink).toHaveLength(1);
    expect(validatorLink[0]).toHaveTextContent(
      truncateHash(blocks[0].body.proposer),
    );
  });

  it('should render block hash links', () => {
    render(
      <Table
        header={mockBlocksTableHeader}
        columns={mockBlocksTableColumns}
        currentPageSize={mockBlocksTableOptions.pagination.pageSize}
        isLastPage={totalPages === mockBlocksTableOptions.pagination.pageNum}
        data={blocks}
        footer={mockBlocksTableFooter}
        placeholderData={placeholderData}
      />,
    );
    const blockHashLink = screen.getAllByTestId('block-hash-link');
    expect(blockHashLink).toHaveLength(1);
    expect(blockHashLink[0]).toHaveTextContent(truncateHash(blocks[0].hash));
  });

  it('should render deploys count', () => {
    render(
      <Table
        header={mockBlocksTableHeader}
        columns={mockBlocksTableColumns}
        currentPageSize={mockBlocksTableOptions.pagination.pageSize}
        isLastPage={totalPages === mockBlocksTableOptions.pagination.pageNum}
        data={blocks}
        footer={mockBlocksTableFooter}
        placeholderData={placeholderData}
      />,
    );
    const deploys = screen.getAllByTestId('deploys');
    const deploysCount =
      blocks[0].body.deploy_hashes.length +
      blocks[0].body.transfer_hashes.length;
    expect(deploys).toHaveLength(1);
    expect(deploys[0]).toHaveTextContent(deploysCount.toString());
  });

  it('should render a loading BlocksTable', () => {
    render(
      <Table
        header={mockBlocksTableHeader}
        columns={mockBlocksTableColumns}
        currentPageSize={mockBlocksTableOptions.pagination.pageSize}
        isLastPage={totalPages === mockBlocksTableOptions.pagination.pageNum}
        data={blocks}
        footer={mockBlocksTableFooter}
        tableBodyLoading
        placeholderData={placeholderData}
      />,
    );
    const skeletonLoader = screen.getAllByTestId('skeleton-loader');
    expect(skeletonLoader).toHaveLength(6);
  });
});
