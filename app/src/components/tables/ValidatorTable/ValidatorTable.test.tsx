import React from 'react';
import { screen } from '@testing-library/react';
import { Table } from 'src/components';
import {
  getMockCurrentEraValidators,
  getMockValidatorsTableHeader,
  getMockValidatorsTableFooter,
  mockValidatorsTableColumns,
  mockValidatorsTableOptions,
  getMockNextEraValidators,
} from 'src/mocks/mock-validator-table';
import { standardizeNumber, truncateHash } from 'src/utils';
import { standardizePercentage } from 'src/utils/standardize-percentage';
import { render } from '../../../test-utils';

const mockCurrentEraValidators = getMockCurrentEraValidators();
const mockNextEraValidators = getMockNextEraValidators();
const mockValidatorsTableFooter = getMockValidatorsTableFooter();
const mockValidatorsTableHeader = getMockValidatorsTableHeader();
const totalPages = Math.ceil(
  mockCurrentEraValidators.status.validatorsCount /
    mockValidatorsTableOptions.pagination.pageSize,
);

describe('ValidatorsTable', () => {
  it('should render Validators Table', () => {
    render(
      <Table
        header={mockValidatorsTableHeader}
        columns={mockValidatorsTableColumns}
        data={mockCurrentEraValidators.validators}
        footer={mockValidatorsTableFooter}
        tableBodyLoading={false}
        currentPageSize={mockValidatorsTableOptions.pagination.pageSize}
        placeholderData={mockCurrentEraValidators}
        isLastPage={
          totalPages === mockValidatorsTableOptions.pagination.pageSize
        }
      />,
    );

    const validatorsTableHeader = screen.getByTestId('validators-table-header');
    const validatorsBaseTable = screen.getByTestId('base-table');
    const validatorsTableFooter = screen.getByTestId('validators-table-footer');

    expect(validatorsTableHeader).toBeInTheDocument();
    expect(validatorsBaseTable).toBeInTheDocument();
    expect(validatorsTableFooter).toBeInTheDocument();
  });

  it('should render a Rank value', () => {
    render(
      <Table
        header={mockValidatorsTableHeader}
        columns={mockValidatorsTableColumns}
        data={mockCurrentEraValidators.validators}
        footer={mockValidatorsTableFooter}
        tableBodyLoading={false}
        currentPageSize={mockValidatorsTableOptions.pagination.pageSize}
        placeholderData={mockCurrentEraValidators}
        isLastPage={
          totalPages === mockValidatorsTableOptions.pagination.pageSize
        }
      />,
    );

    const rank = screen.getByTestId('rank');
    expect(rank).toHaveTextContent(
      mockCurrentEraValidators.validators[0].rank.toString(),
    );
  });

  it('should render a truncated Public Key', () => {
    render(
      <Table
        header={mockValidatorsTableHeader}
        columns={mockValidatorsTableColumns}
        data={mockCurrentEraValidators.validators}
        footer={mockValidatorsTableFooter}
        tableBodyLoading={false}
        currentPageSize={mockValidatorsTableOptions.pagination.pageSize}
        placeholderData={mockCurrentEraValidators}
        isLastPage={
          totalPages === mockValidatorsTableOptions.pagination.pageSize
        }
      />,
    );
    const publicKey = screen.getByTestId('styled-hash-link');

    expect(publicKey).toHaveTextContent(
      truncateHash(mockCurrentEraValidators.validators[0].publicKey),
    );
  });

  it('should render a Fee', () => {
    render(
      <Table
        header={mockValidatorsTableHeader}
        columns={mockValidatorsTableColumns}
        data={mockCurrentEraValidators.validators}
        footer={mockValidatorsTableFooter}
        tableBodyLoading={false}
        currentPageSize={mockValidatorsTableOptions.pagination.pageSize}
        placeholderData={mockCurrentEraValidators}
        isLastPage={
          totalPages === mockValidatorsTableOptions.pagination.pageSize
        }
      />,
    );
    const fee = screen.getByTestId('fee');
    expect(fee).toHaveTextContent(
      mockCurrentEraValidators.validators[0].feePercentage.toString(),
    );
  });

  it('should render number of Delegators', () => {
    render(
      <Table
        header={mockValidatorsTableHeader}
        columns={mockValidatorsTableColumns}
        data={mockCurrentEraValidators.validators}
        footer={mockValidatorsTableFooter}
        tableBodyLoading={false}
        currentPageSize={mockValidatorsTableOptions.pagination.pageSize}
        placeholderData={mockCurrentEraValidators}
        isLastPage={
          totalPages === mockValidatorsTableOptions.pagination.pageSize
        }
      />,
    );
    const delegators = screen.getByTestId('delegators');

    expect(delegators).toHaveTextContent(
      mockCurrentEraValidators.validators[0].delegatorsCount.toString(),
    );
  });

  it('should render a TotalStake', () => {
    render(
      <Table
        header={mockValidatorsTableHeader}
        columns={mockValidatorsTableColumns}
        data={mockCurrentEraValidators.validators}
        footer={mockValidatorsTableFooter}
        tableBodyLoading={false}
        currentPageSize={mockValidatorsTableOptions.pagination.pageSize}
        placeholderData={mockCurrentEraValidators}
        isLastPage={
          totalPages === mockValidatorsTableOptions.pagination.pageSize
        }
      />,
    );
    const totalStake = screen.getByTestId('total-stake');
    expect(totalStake).toHaveTextContent(
      standardizeNumber(
        (
          mockCurrentEraValidators.validators[0].totalStakeMotes /
          10 ** 9
        ).toFixed(0),
      ).toString(),
    );
  });

  it('should render Self Percentage', () => {
    render(
      <Table
        header={mockValidatorsTableHeader}
        columns={mockValidatorsTableColumns}
        data={mockCurrentEraValidators.validators}
        footer={mockValidatorsTableFooter}
        tableBodyLoading={false}
        currentPageSize={mockValidatorsTableOptions.pagination.pageSize}
        placeholderData={mockCurrentEraValidators}
        isLastPage={
          totalPages === mockValidatorsTableOptions.pagination.pageSize
        }
      />,
    );
    const selfPercentage = screen.getByTestId('self-percentage');
    expect(selfPercentage).toHaveTextContent(
      standardizePercentage(
        mockCurrentEraValidators.validators[0].selfPercentage,
      ).toString(),
    );
  });

  it('should render Percentage of Network', () => {
    render(
      <Table
        header={mockValidatorsTableHeader}
        columns={mockValidatorsTableColumns}
        data={mockCurrentEraValidators.validators}
        footer={mockValidatorsTableFooter}
        tableBodyLoading={false}
        currentPageSize={mockValidatorsTableOptions.pagination.pageSize}
        placeholderData={mockCurrentEraValidators}
        isLastPage={
          totalPages === mockValidatorsTableOptions.pagination.pageSize
        }
      />,
    );
    const percentageOfNetwork = screen.getByTestId('percentage-of-network');
    expect(percentageOfNetwork).toHaveTextContent(
      standardizePercentage(
        mockCurrentEraValidators.validators[0].percentageOfNetwork,
      ).toString(),
    );
  });

  it('should update era_id on Next Era button click', () => {
    render(
      <Table
        header={mockValidatorsTableHeader}
        columns={mockValidatorsTableColumns}
        data={mockCurrentEraValidators.validators}
        footer={mockValidatorsTableFooter}
        tableBodyLoading={false}
        currentPageSize={mockValidatorsTableOptions.pagination.pageSize}
        placeholderData={mockCurrentEraValidators}
        isLastPage={
          totalPages === mockValidatorsTableOptions.pagination.pageSize
        }
      />,
    );
  });
});
