import React from 'react';
import { screen } from '@testing-library/react';
import { DeployStatus } from 'src/api/types';
import { render } from '../../../test-utils';
import { TransactionDetailsCard } from './TransactionDetailsCard';

const mockDeploy = {
  timestamp: 0,
  timeSince: '',
  readableTimestamp: 'testReadableTimestamp',
  deployHash: '',
  blockHash: '',
  publicKey: '',
  status: DeployStatus.Success,
  amount: '100',
  action: 'testAction',
  deployType: 'testType',
  paymentAmount: '200',
  cost: '300',
  rawDeploy: '',
};

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe('TransactionDetailsCard', () => {
  it('should render DeployDetailsCard  ', () => {
    render(<TransactionDetailsCard deploy={mockDeploy} isLoading={false} />);

    const transactionDetailsCard = screen.getByTestId('baseCard');

    expect(transactionDetailsCard).toBeInTheDocument();
  });

  it('should render skeleton loaders for card details ', () => {
    render(<TransactionDetailsCard deploy={mockDeploy} isLoading />);

    const skeletonLoaders = screen.getAllByTestId('skeleton-loader');

    expect(skeletonLoaders.length).toEqual(6);
  });

  it('should render deploy details ', () => {
    render(<TransactionDetailsCard deploy={mockDeploy} isLoading={false} />);

    const amount = screen.getByTestId('deploy-amount').firstChild?.textContent;
    const paymentAmount = screen.getByTestId('deploy-payment-amount').firstChild
      ?.textContent;
    const cost = screen.getByTestId('deploy-cost').firstChild?.textContent;
    const readableTimeStamp = screen.getByTestId('readable-time-stamp')
      .firstChild?.textContent;
    const status = screen.getByTestId('status').firstChild?.textContent;
    const action = screen.getByTestId('action').firstChild?.textContent;
    const deployType =
      screen.getByTestId('deploy-type').firstChild?.textContent;

    expect(amount).toEqual('100 motes');
    expect(paymentAmount).toEqual('200 motes');
    expect(cost).toEqual('300 motes');
    expect(readableTimeStamp).toEqual('testReadableTimestamp');
    expect(status).toEqual('Success');
    expect(action).toEqual('testAction');
    expect(deployType).toEqual('testType');
  });
});
