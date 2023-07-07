import React from 'react';
import { screen } from '@testing-library/react';
import { Table } from 'src/components';
import {
  getMockDeploysTableFooter,
  getMockDeploysTableHeader,
  getMockProcessedSidecarDeploy,
  mockDeploysTableColumns,
  mockDeploysTableOptions,
} from 'src/mocks/mock-deploys-table';
import { formatTimeAgo, standardizeNumber, truncateHash } from 'src/utils';
import { render } from '../../../test-utils';

const processedSidecarDeploys = getMockProcessedSidecarDeploy();
const mockDeploysTableHeader = getMockDeploysTableHeader();
const mockDeploysTableFooter = getMockDeploysTableFooter();
const totalPages = Math.ceil(
  processedSidecarDeploys.length / mockDeploysTableOptions.pagination.pageSize,
);

describe('DeploysTable', () => {
  beforeEach(() => {
    render(
      <Table
        header={mockDeploysTableHeader}
        columns={mockDeploysTableColumns}
        data={processedSidecarDeploys}
        footer={mockDeploysTableFooter}
        currentPageSize={mockDeploysTableOptions.pagination.pageSize}
        placeholderData={{}}
        isLastPage={totalPages === mockDeploysTableOptions.pagination.pageSize}
      />,
    );
  });

  it('should render Deploys Table', () => {
    const deploysTableHeader = screen.getByTestId('deploys-table-header');
    const deploysBaseTable = screen.getByTestId('base-table');
    const deploysTableFooter = screen.getByTestId('deploys-table-footer');

    expect(deploysTableHeader).toBeInTheDocument();
    expect(deploysBaseTable).toBeInTheDocument();
    expect(deploysTableFooter).toBeInTheDocument();
  });

  it('should render Total Rows', () => {
    const totalRows = screen.getByTestId('total-rows');
    expect(totalRows).toHaveTextContent('1 total rows');
  });

  it('should render a truncated Deploy Hash', () => {
    const deployHash = screen.getByTestId('deploy-hash-link');
    expect(deployHash).toHaveTextContent(
      truncateHash(processedSidecarDeploys[0].deployHash),
    );
  });

  it('should render a truncated Block Hash', () => {
    const blockHash = screen.getByTestId('block-hash-link');
    expect(blockHash).toHaveTextContent(
      truncateHash(processedSidecarDeploys[0].blockHash),
    );
  });

  it('should render a truncated Public Key', () => {
    const publicKey = screen.getByTestId('public-key-link');
    expect(publicKey).toHaveTextContent(
      truncateHash(processedSidecarDeploys[0].publicKey),
    );
  });

  it('should render an Age', () => {
    const timestamp = screen.getByTestId('timestamp');
    expect(timestamp).toHaveTextContent(
      formatTimeAgo(new Date(processedSidecarDeploys[0].timestamp)),
    );
  });

  it('should render a Contract type', () => {
    const contractType = screen.getByTestId('contract-type');
    expect(contractType).toHaveTextContent(
      processedSidecarDeploys[0].contractType,
    );
  });

  it('should render an Amount in motes and usd', () => {
    const amountMotes = screen.getByTestId('amount-motes');
    const amountUsd = screen.getByTestId('amount-usd');

    expect(amountMotes).toHaveTextContent(
      standardizeNumber(
        (+processedSidecarDeploys[0].amount.motes / 10 ** 9).toFixed(3),
      ).toString(),
    );
    expect(amountUsd).toHaveTextContent(
      standardizeNumber(
        (+processedSidecarDeploys[0].amount.usd / 10 ** 9).toFixed(3),
      ).toString(),
    );
  });

  it('should render Cost in motes and usd', () => {
    const costMotes = screen.getByTestId('cost-motes');
    const costUsd = screen.getByTestId('cost-usd');

    expect(costMotes).toHaveTextContent(
      standardizeNumber(
        (+processedSidecarDeploys[0].cost.motes / 10 ** 9).toFixed(3),
      ).toString(),
    );
    expect(costUsd).toHaveTextContent(
      standardizeNumber(
        (+processedSidecarDeploys[0].cost.usd / 10 ** 9).toFixed(3),
      ).toString(),
    );
  });

  it('should render a loading DeploysTable', () => {
    render(
      <Table
        header={mockDeploysTableHeader}
        columns={mockDeploysTableColumns}
        data={processedSidecarDeploys}
        footer={mockDeploysTableFooter}
        tableBodyLoading
        currentPageSize={mockDeploysTableOptions.pagination.pageSize}
        placeholderData={{}}
        isLastPage={totalPages === mockDeploysTableOptions.pagination.pageSize}
      />,
    );
    const skeletonLoader = screen.getAllByTestId('skeleton-loader');
    expect(skeletonLoader).toHaveLength(7);
  });
});
