import React from 'react';
import { screen } from '@testing-library/react';
import { Table } from 'src/components';
import {
  getMockDeploysTableFooter,
  getMockDeploysTableHeader,
  getMockProcessedSidecarDeploys,
  mockDeploysTableColumns,
  mockDeploysTableOptions,
} from 'src/mocks/mock-deploys-table';
import { standardizeNumber, truncateHash } from 'src/utils';
import { render } from '../../../test-utils';

const deploys = getMockProcessedSidecarDeploys();
const mockDeploysTableHeader = getMockDeploysTableHeader();
const mockDeploysTableFooter = getMockDeploysTableFooter();
const totalPages = Math.ceil(
  deploys.length / mockDeploysTableOptions.pagination.pageSize,
);

describe('DeploysTable', () => {
  it.only('should render Deploys Table', () => {
    render(
      <Table
        header={mockDeploysTableHeader}
        columns={mockDeploysTableColumns}
        data={deploys}
        footer={mockDeploysTableFooter}
        tableBodyLoading={false}
        currentPageSize={mockDeploysTableOptions.pagination.pageSize}
        placeholderData={{}}
        isLastPage={totalPages === mockDeploysTableOptions.pagination.pageSize}
      />,
    );

    const deploysTableHeader = screen.getByTestId('deploys-table-header');
    const deploysBaseTable = screen.getByTestId('base-table');
    const deploysTableFooter = screen.getByTestId('deploys-table-footer');

    expect(deploysTableHeader).toBeInTheDocument();
    expect(deploysBaseTable).toBeInTheDocument();
    expect(deploysTableFooter).toBeInTheDocument();
  });

  it('should render a truncated Deploy Hash', () => {
    render(
      <Table
        header={mockDeploysTableHeader}
        columns={mockDeploysTableColumns}
        data={deploys}
        footer={mockDeploysTableFooter}
        tableBodyLoading={false}
        currentPageSize={mockDeploysTableOptions.pagination.pageSize}
        placeholderData={{}}
        isLastPage={totalPages === mockDeploysTableOptions.pagination.pageSize}
      />,
    );

    const deployHash = screen.getByTestId('deploy-hash-link');
    expect(deployHash).toHaveTextContent(truncateHash(deploys[0].deployHash));
  });

  it('should render a truncated Block Hash', () => {
    render(
      <Table
        header={mockDeploysTableHeader}
        columns={mockDeploysTableColumns}
        data={deploys}
        footer={mockDeploysTableFooter}
        tableBodyLoading={false}
        currentPageSize={mockDeploysTableOptions.pagination.pageSize}
        placeholderData={{}}
        isLastPage={totalPages === mockDeploysTableOptions.pagination.pageSize}
      />,
    );
    const blockHash = screen.getByTestId('block-hash-link');
    expect(blockHash).toHaveTextContent(truncateHash(deploys[0].blockHash));
  });

  it('should render a truncated Public Key', () => {
    render(
      <Table
        header={mockDeploysTableHeader}
        columns={mockDeploysTableColumns}
        data={deploys}
        footer={mockDeploysTableFooter}
        tableBodyLoading={false}
        currentPageSize={mockDeploysTableOptions.pagination.pageSize}
        placeholderData={{}}
        isLastPage={totalPages === mockDeploysTableOptions.pagination.pageSize}
      />,
    );
    const publicKey = screen.getByTestId('public-key-link');
    expect(publicKey).toHaveTextContent(truncateHash(deploys[0].publicKey));
  });

  it('should render an Age', () => {
    render(
      <Table
        header={mockDeploysTableHeader}
        columns={mockDeploysTableColumns}
        data={deploys}
        footer={mockDeploysTableFooter}
        tableBodyLoading={false}
        currentPageSize={mockDeploysTableOptions.pagination.pageSize}
        placeholderData={{}}
        isLastPage={totalPages === mockDeploysTableOptions.pagination.pageSize}
      />,
    );
    const timestamp = screen.getByTestId('timestamp');

    expect(timestamp).toHaveTextContent(deploys[0].timestamp.toString());
  });

  it('should render a Contract type', () => {
    render(
      <Table
        header={mockDeploysTableHeader}
        columns={mockDeploysTableColumns}
        data={deploys}
        footer={mockDeploysTableFooter}
        tableBodyLoading={false}
        currentPageSize={mockDeploysTableOptions.pagination.pageSize}
        placeholderData={{}}
        isLastPage={totalPages === mockDeploysTableOptions.pagination.pageSize}
      />,
    );
    const contractType = screen.getByTestId('contract-type');
    expect(contractType).toHaveTextContent(deploys[0].contractType);
  });

  it('should render an Amount', () => {
    render(
      <Table
        header={mockDeploysTableHeader}
        columns={mockDeploysTableColumns}
        data={deploys}
        footer={mockDeploysTableFooter}
        tableBodyLoading={false}
        currentPageSize={mockDeploysTableOptions.pagination.pageSize}
        placeholderData={{}}
        isLastPage={totalPages === mockDeploysTableOptions.pagination.pageSize}
      />,
    );

    const amount = screen.getByTestId('amount');
    expect(amount).toHaveTextContent(
      standardizeNumber(
        (+deploys[0].amountMotes / 10 ** 9).toFixed(0),
      ).toString(),
    );
  });

  it('should render Cost', () => {
    render(
      <Table
        header={mockDeploysTableHeader}
        columns={mockDeploysTableColumns}
        data={deploys}
        footer={mockDeploysTableFooter}
        tableBodyLoading={false}
        currentPageSize={mockDeploysTableOptions.pagination.pageSize}
        placeholderData={{}}
        isLastPage={totalPages === mockDeploysTableOptions.pagination.pageSize}
      />,
    );
    const cost = screen.getByTestId('cost');
    expect(cost).toHaveTextContent(
      standardizeNumber(
        (+deploys[0].costMotes / 10 ** 9).toFixed(0),
      ).toString(),
    );
  });

  it('should render a loading DeploysTable', () => {
    render(
      <Table
        header={mockDeploysTableHeader}
        columns={mockDeploysTableColumns}
        data={deploys}
        footer={mockDeploysTableFooter}
        tableBodyLoading
        currentPageSize={mockDeploysTableOptions.pagination.pageSize}
        placeholderData={{}}
        isLastPage={totalPages === mockDeploysTableOptions.pagination.pageSize}
      />,
    );
    const skeletonLoader = screen.getAllByTestId('skeleton-loader');
    expect(skeletonLoader).toHaveLength(70);
  });
});
