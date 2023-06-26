import React from 'react';
import { screen } from '@testing-library/react';
import { Table } from 'src/components';
import {
  getMockBlocks,
  mockBlocksTableColumns,
  getMockBlocksTableFooter,
  getMockBlocksTableHeader,
} from 'src/mocks/mock-blocks-table';
import { formatDate, truncateHash } from 'src/utils';
import { render } from '../../../test-utils';

const blocks = getMockBlocks();
const mockBlocksTableFooter = getMockBlocksTableFooter();
const mockBlocksTableHeader = getMockBlocksTableHeader();

describe('BlocksTable', () => {
  it('should render the BlocksTable', () => {
    render(
      <Table
        tableBodyLoading={false}
        header={mockBlocksTableHeader}
        columns={mockBlocksTableColumns}
        isLastPage
        data={blocks}
        footer={mockBlocksTableFooter}
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
        isLastPage={false}
        data={blocks}
        footer={mockBlocksTableFooter}
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
        isLastPage={false}
        data={blocks}
        footer={mockBlocksTableFooter}
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
        isLastPage={false}
        data={blocks}
        footer={mockBlocksTableFooter}
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
        isLastPage={false}
        data={blocks}
        footer={mockBlocksTableFooter}
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
        isLastPage={false}
        data={blocks}
        footer={mockBlocksTableFooter}
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
        isLastPage={false}
        data={blocks}
        footer={mockBlocksTableFooter}
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
        tableBodyLoading
        header={mockBlocksTableHeader}
        columns={mockBlocksTableColumns}
        isLastPage={false}
        data={blocks}
        footer={mockBlocksTableFooter}
      />,
    );
    const skeletonLoader = screen.getAllByTestId('skeleton-loader');
    expect(skeletonLoader).toHaveLength(6);
  });
});
