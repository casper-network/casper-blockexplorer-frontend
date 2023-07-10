import React from 'react';
import { screen } from '@testing-library/react';
import { Table } from 'src/components';
import {
  getMockCurrentEraValidators,
  getMockCurrentEraValidatorsTableHeader,
  mockValidatorsTableColumns,
  getMockCurrentEraValidatorsTableFooter,
  mockCurrentEraValidatorsTableOptions,
  getMockNextEraValidators,
  getMockNextEraValidatorsTableFooter,
  getMockNextEraValidatorsTableHeader,
  mockNextEraValidatorsTableOptions,
} from 'src/mocks/mock-validator-table';
import { standardizeNumber, truncateHash } from 'src/utils';
import { standardizePercentage } from 'src/utils/standardize-percentage';
import userEvent from '@testing-library/user-event';
import { render } from '../../../test-utils';
import { EraToggleButton } from './ValidatorsTable';

const mockCurrentEraValidators = getMockCurrentEraValidators();
const mockCurrentEraValidatorsTableHeader =
  getMockCurrentEraValidatorsTableHeader();
const mockCurrentEraValidatorsTableFooter =
  getMockCurrentEraValidatorsTableFooter();
const currentEraTotalPages = Math.ceil(
  mockCurrentEraValidators.validators.length /
    mockCurrentEraValidatorsTableOptions.pagination.pageSize,
);

const mockNextEraValidators = getMockNextEraValidators();
const mockNextEraValidatorsTableHeader = getMockNextEraValidatorsTableHeader();
const mockNextEraValidatorsTableFooter = getMockNextEraValidatorsTableFooter();
const nexEraTotalPages = Math.ceil(
  mockNextEraValidators.nextEraValidators.length /
    mockNextEraValidatorsTableOptions.pagination.pageSize,
);

const totalColumns = mockValidatorsTableColumns.length;

describe('ValidatorsTable', () => {
  beforeEach(() =>
    render(
      <Table
        header={mockCurrentEraValidatorsTableHeader}
        columns={mockValidatorsTableColumns}
        data={mockCurrentEraValidators.validators}
        footer={mockCurrentEraValidatorsTableFooter}
        currentPageSize={
          mockCurrentEraValidatorsTableOptions.pagination.pageSize
        }
        placeholderData={{}}
        isLastPage={
          currentEraTotalPages ===
          mockCurrentEraValidatorsTableOptions.pagination.pageSize
        }
      />,
    ),
  );

  it('should render Validators Table', () => {
    const validatorsTableHeader = screen.getByTestId('validators-table-header');
    const validatorsBaseTable = screen.getByTestId('base-table');
    const validatorsTableFooter = screen.getByTestId('validators-table-footer');

    expect(validatorsTableHeader).toBeInTheDocument();
    expect(validatorsBaseTable).toBeInTheDocument();
    expect(validatorsTableFooter).toBeInTheDocument();
  });

  it('should render a Rank', () => {
    const rank = screen.getAllByTestId('rank');
    expect(rank[0]).toHaveTextContent(
      mockCurrentEraValidators.validators[0].rank.toString(),
    );
  });

  it('should render a truncated Public Key', () => {
    const publicKey = screen.getAllByTestId('truncated-public-key');

    expect(publicKey[0]).toHaveTextContent(
      truncateHash(mockCurrentEraValidators.validators[0].publicKey),
    );
  });

  it('should render a Fee', () => {
    const fee = screen.getAllByTestId('fee');
    expect(fee[0]).toHaveTextContent(
      mockCurrentEraValidators.validators[0].feePercentage.toString(),
    );
  });

  it('should render number of Delegators', () => {
    const delegators = screen.getAllByTestId('delegators');

    expect(delegators[0]).toHaveTextContent(
      mockCurrentEraValidators.validators[0].delegatorsCount.toString(),
    );
  });

  it('should render Total Stake for Current Era', () => {
    const totalStake = screen.getAllByTestId('total-stake');
    expect(totalStake[0]).toHaveTextContent(
      standardizeNumber(
        (
          mockCurrentEraValidators.validators[0].totalStakeMotes /
          10 ** 9
        ).toFixed(0),
      ).toString(),
    );
  });

  it('should render Self Percentage', () => {
    const selfPercentage = screen.getAllByTestId('self-percentage');
    expect(selfPercentage[0]).toHaveTextContent(
      standardizePercentage(
        mockCurrentEraValidators.validators[0].selfPercentage,
      ).toString(),
    );
  });

  it('should render Percentage of Network', () => {
    const percentageOfNetwork = screen.getAllByTestId('percentage-of-network');
    expect(percentageOfNetwork[0]).toHaveTextContent(
      standardizePercentage(
        mockCurrentEraValidators.validators[0].percentageOfNetwork,
      ).toString(),
    );
  });

  it('should render a loading ValidatorsTable', () => {
    render(
      <Table
        header={mockCurrentEraValidatorsTableHeader}
        columns={mockValidatorsTableColumns}
        data={mockCurrentEraValidators.validators}
        footer={mockCurrentEraValidatorsTableFooter}
        currentPageSize={
          mockCurrentEraValidatorsTableOptions.pagination.pageSize
        }
        tableBodyLoading
        placeholderData={{}}
        isLastPage={
          currentEraTotalPages ===
          mockCurrentEraValidatorsTableOptions.pagination.pageSize
        }
      />,
    );
    const skeletonLoader = screen.getAllByTestId('skeleton-loader');
    expect(skeletonLoader).toHaveLength(
      mockCurrentEraValidators.validators.length * totalColumns,
    );
  });
});

describe('Next Era', () => {
  it('should render Total Stake for Next Era', () => {
    const { status } = getMockNextEraValidators();
    const onClickMock = jest.fn().mockReturnValue(true);
    const isCurrentEra = false;

    render(
      <div>
        <EraToggleButton type="button" selected={false}>
          Current Era 8888
        </EraToggleButton>
        <EraToggleButton type="button" onClick={onClickMock} selected>
          Next Era {status.latestEraId}
        </EraToggleButton>
        <Table
          header={mockNextEraValidatorsTableHeader}
          columns={mockValidatorsTableColumns}
          data={
            isCurrentEra
              ? mockCurrentEraValidators.validators
              : mockNextEraValidators.nextEraValidators
          }
          footer={mockNextEraValidatorsTableFooter}
          currentPageSize={
            mockNextEraValidatorsTableOptions.pagination.pageSize
          }
          placeholderData={{}}
          isLastPage={
            nexEraTotalPages ===
            mockNextEraValidatorsTableOptions.pagination.pageSize
          }
        />
      </div>,
    );

    const currentEraButton = screen.getByText('Current Era 8888');
    const nextEraButton = screen.getByText('Next Era 8889');
    const totalStake = screen.getAllByTestId('total-stake');

    expect(currentEraButton).toBeInTheDocument();
    expect(nextEraButton).toBeInTheDocument();

    userEvent.click(nextEraButton);

    expect(onClickMock).toBeCalledTimes(1);
    expect(onClickMock).toReturnWith(true);
    expect(totalStake[0]).toHaveTextContent(
      standardizeNumber(
        (
          mockNextEraValidators.nextEraValidators[0].totalStakeMotes /
          10 ** 9
        ).toFixed(0),
      ).toString(),
    );
  });
});
