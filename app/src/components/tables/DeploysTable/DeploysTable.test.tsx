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
  processedSidecarDeploys.deploys.length /
    mockDeploysTableOptions.pagination.pageSize,
);

describe('DeploysTable', () => {
  beforeEach(() => {
    render(
      <Table
        header={mockDeploysTableHeader}
        columns={mockDeploysTableColumns}
        data={processedSidecarDeploys.deploys}
        footer={mockDeploysTableFooter}
        currentPageSize={mockDeploysTableOptions.pagination.pageSize}
        placeholderData={
          {
            // deployHash:
            //   'testddb3ed65ddf076892dddbcb98694921e74ea90d33137121a58985859ddcf',
            // blockHash:
            //   '92d9b84db79132a77f76216c7d81b2243fe92ef26db885ae0d64ee585e4799fa',
            // publicKey:
            //   '0202ed20f3a93b5386bc41b6945722b2bd4250c48f5fa0632adf546e2f3ff6f4ddee',
            // timestamp: '2023-06-15T22:13:16.579Z',
            // contractType: 'Transfer',
            // amountMotes: '505124902204510',
            // costMotes: '100000000',
          }
        }
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

  it('should render a truncated Deploy Hash', async () => {
    const deployHash = screen.getAllByTestId('deploy-hash-link');
    expect(deployHash[0]).toHaveTextContent(
      truncateHash(processedSidecarDeploys.deploys[0].deployHash),
    );
  });

  it('should render a truncated Block Hash', () => {
    const blockHash = screen.getAllByTestId('block-hash-link');
    expect(blockHash[0]).toHaveTextContent(
      truncateHash(processedSidecarDeploys.deploys[0].blockHash),
    );
  });

  it('should render a truncated Public Key', () => {
    const publicKey = screen.getAllByTestId('public-key-link');
    expect(publicKey[0]).toHaveTextContent(
      truncateHash(processedSidecarDeploys.deploys[0].publicKey),
    );
  });

  it('should render an Age', () => {
    const timestamp = screen.getAllByTestId('timestamp');
    expect(timestamp[0]).toHaveTextContent(
      formatTimeAgo(new Date(processedSidecarDeploys.deploys[0].timestamp)),
    );
  });

  it('should render a Contract type', () => {
    const contractType = screen.getAllByTestId('contract-type');
    expect(contractType[0]).toHaveTextContent(
      processedSidecarDeploys.deploys[0].contractType,
    );
  });

  it('should render an Amount', () => {
    const amount = screen.getAllByTestId('amount-motes');
    expect(amount[0]).toHaveTextContent(
      standardizeNumber(
        (+processedSidecarDeploys.deploys[0].amountMotes / 10 ** 9).toFixed(0),
      ).toString(),
    );
  });

  it('should render Cost', () => {
    const cost = screen.getAllByTestId('cost-motes');
    expect(cost[0]).toHaveTextContent(
      standardizeNumber(
        (+processedSidecarDeploys.deploys[0].costMotes / 10 ** 9).toFixed(0),
      ).toString(),
    );
  });

  it('should render a loading DeploysTable', () => {
    render(
      <Table
        header={mockDeploysTableHeader}
        columns={mockDeploysTableColumns}
        data={processedSidecarDeploys.deploys}
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
