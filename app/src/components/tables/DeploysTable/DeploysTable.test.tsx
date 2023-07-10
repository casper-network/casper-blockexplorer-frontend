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
const totalColumns = mockDeploysTableColumns.length;

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
    expect(totalRows).toHaveTextContent(
      `${processedSidecarDeploys.length} total rows`,
    );
  });

  it('should render a truncated Deploy Hash', () => {
    const deployHash = screen.getAllByTestId('deploy-hash-link');
    expect(deployHash[0]).toHaveTextContent(
      truncateHash(processedSidecarDeploys[0].deployHash),
    );
  });

  it('should render a truncated Block Hash', () => {
    const blockHash = screen.getAllByTestId('block-hash-link');
    expect(blockHash[0]).toHaveTextContent(
      truncateHash(processedSidecarDeploys[0].blockHash),
    );
  });

  it('should render a truncated Public Key', () => {
    const publicKey = screen.getAllByTestId('public-key-link');
    expect(publicKey[0]).toHaveTextContent(
      truncateHash(processedSidecarDeploys[0].publicKey),
    );
  });

  it('should render an Age', () => {
    const timestamp = screen.getAllByTestId('timestamp');
    expect(timestamp[0]).toHaveTextContent(
      formatTimeAgo(new Date(processedSidecarDeploys[0].timestamp)),
    );
  });

  it('should render a Contract type', () => {
    const contractType = screen.getAllByTestId('contract-type');
    expect(contractType[0]).toHaveTextContent(
      processedSidecarDeploys[0].contractType,
    );
  });

  it('should render an Amount in motes and usd', () => {
    const amountMotes = screen.getAllByTestId('amount-motes');
    const amountUsd = screen.getAllByTestId('amount-usd');

    expect(amountMotes[0]).toHaveTextContent(
      standardizeNumber(
        (+processedSidecarDeploys[0].amount.motes / 10 ** 9).toFixed(3),
      ).toString(),
    );
    expect(amountUsd[0]).toHaveTextContent(
      standardizeNumber(
        (+processedSidecarDeploys[0].amount.usd / 10 ** 9).toFixed(3),
      ).toString(),
    );
  });

  it('should render Cost in motes and usd', () => {
    const costMotes = screen.getAllByTestId('cost-motes');
    const costUsd = screen.getAllByTestId('cost-usd');

    expect(costMotes[0]).toHaveTextContent(
      standardizeNumber(
        (+processedSidecarDeploys[0].cost.motes / 10 ** 9).toFixed(3),
      ).toString(),
    );
    expect(costUsd[0]).toHaveTextContent(
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
    expect(skeletonLoader).toHaveLength(
      processedSidecarDeploys.length * totalColumns,
    );
  });
});
