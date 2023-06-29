import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import { Table } from 'src/components';
import {
  getMockCurrentEraValidators,
  getMockValidatorsTableFooter,
  mockValidatorsTableColumns,
  mockValidatorsTableOptions,
  getMockNextEraValidators,
  getMockValidatorsTableHeader,
} from 'src/mocks/mock-validator-table';
import { standardizeNumber, truncateHash } from 'src/utils';
import { standardizePercentage } from 'src/utils/standardize-percentage';
import userEvent from '@testing-library/user-event';
import { render } from '../../../test-utils';
import { EraToggleButton } from './ValidatorTable';

const mockCurrentEraValidators = getMockCurrentEraValidators();
const mockNextEraValidators = getMockNextEraValidators();
const mockValidatorsTableHeader = getMockValidatorsTableHeader();
const mockValidatorsTableFooter = getMockValidatorsTableFooter();
const totalPages = Math.ceil(
  mockCurrentEraValidators.status.validatorsCount /
    mockValidatorsTableOptions.pagination.pageSize,
);

describe('ValidatorsTable', () => {
  beforeEach(() =>
    render(
      <Table
        header={mockValidatorsTableHeader}
        columns={mockValidatorsTableColumns}
        data={mockCurrentEraValidators.validators}
        footer={mockValidatorsTableFooter}
        tableBodyLoading={false}
        currentPageSize={mockValidatorsTableOptions.pagination.pageSize}
        placeholderData={{}}
        isLastPage={
          totalPages === mockValidatorsTableOptions.pagination.pageSize
        }
      />,
    ),
  );
  afterAll(() => {
    cleanup();
  });
  it('should render Validators Table', () => {
    const validatorsTableHeader = screen.getByTestId('validators-table-header');
    const validatorsBaseTable = screen.getByTestId('base-table');
    const validatorsTableFooter = screen.getByTestId('validators-table-footer');

    expect(validatorsTableHeader).toBeInTheDocument();
    expect(validatorsBaseTable).toBeInTheDocument();
    expect(validatorsTableFooter).toBeInTheDocument();
  });

  it('should render a Rank', () => {
    const rank = screen.getByTestId('rank');
    expect(rank).toHaveTextContent(
      mockCurrentEraValidators.validators[0].rank.toString(),
    );
  });

  it('should render a truncated Public Key', () => {
    const publicKey = screen.getByTestId('truncated-public-key');

    expect(publicKey).toHaveTextContent(
      truncateHash(mockCurrentEraValidators.validators[0].publicKey),
    );
  });

  it('should render a Fee', () => {
    const fee = screen.getByTestId('fee');
    expect(fee).toHaveTextContent(
      mockCurrentEraValidators.validators[0].feePercentage.toString(),
    );
  });

  it('should render number of Delegators', () => {
    const delegators = screen.getByTestId('delegators');

    expect(delegators).toHaveTextContent(
      mockCurrentEraValidators.validators[0].delegatorsCount.toString(),
    );
  });

  it('should render Total Stake for Current Era', () => {
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
    const selfPercentage = screen.getByTestId('self-percentage');
    expect(selfPercentage).toHaveTextContent(
      standardizePercentage(
        mockCurrentEraValidators.validators[0].selfPercentage,
      ).toString(),
    );
  });

  it('should render Percentage of Network', () => {
    const percentageOfNetwork = screen.getByTestId('percentage-of-network');
    expect(percentageOfNetwork).toHaveTextContent(
      standardizePercentage(
        mockCurrentEraValidators.validators[0].percentageOfNetwork,
      ).toString(),
    );
  });

  it('should render a loading ValidatorsTable', () => {
    render(
      <Table
        header={mockValidatorsTableHeader}
        columns={mockValidatorsTableColumns}
        data={mockCurrentEraValidators.validators}
        footer={mockValidatorsTableFooter}
        tableBodyLoading
        currentPageSize={mockValidatorsTableOptions.pagination.pageSize}
        placeholderData={{}}
        isLastPage={
          totalPages === mockValidatorsTableOptions.pagination.pageSize
        }
      />,
    );
    const skeletonLoader = screen.getAllByTestId('skeleton-loader');
    expect(skeletonLoader).toHaveLength(7);
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
          header={mockValidatorsTableHeader}
          columns={mockValidatorsTableColumns}
          data={
            isCurrentEra
              ? mockCurrentEraValidators.validators
              : mockNextEraValidators.validators
          }
          footer={mockValidatorsTableFooter}
          tableBodyLoading={false}
          currentPageSize={mockValidatorsTableOptions.pagination.pageSize}
          placeholderData={{}}
          isLastPage={
            totalPages === mockValidatorsTableOptions.pagination.pageSize
          }
        />
      </div>,
    );

    const currentEraButton = screen.getByText('Current Era 8888');
    const nextEraButton = screen.getByText('Next Era 8889');
    const totalStake = screen.getByTestId('total-stake');

    expect(currentEraButton).toBeInTheDocument();
    expect(nextEraButton).toBeInTheDocument();

    userEvent.click(nextEraButton);

    expect(onClickMock).toBeCalledTimes(1);
    expect(onClickMock).toReturnWith(true);
    expect(totalStake).toHaveTextContent(
      standardizeNumber(
        (mockNextEraValidators.validators[0].totalStakeMotes / 10 ** 9).toFixed(
          0,
        ),
      ).toString(),
    );
  });
});
