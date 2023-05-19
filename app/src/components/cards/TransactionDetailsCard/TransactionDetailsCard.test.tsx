import React from 'react';
import { screen } from '@testing-library/react';
import { getMockDeploy, render } from '../../../test-utils';
import { TransactionDetailsCard } from './TransactionDetailsCard';

const mockDeploy = getMockDeploy();

describe('TransactionDetailsCard', () => {
  it('should render TransactionDetailsCard  ', () => {
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

    const amount = screen.getByTestId('deploy-amount');
    const paymentAmount = screen.getByTestId('deploy-payment-amount');
    const cost = screen.getByTestId('deploy-cost');
    const readableTimeStamp = screen.getByTestId('readable-time-stamp');
    const status = screen.getByTestId('status');
    const action = screen.getByTestId('action');
    const deployType = screen.getByTestId('deploy-type');

    expect(amount).toHaveTextContent(mockDeploy.amount);
    expect(paymentAmount).toHaveTextContent(mockDeploy.paymentAmount);
    expect(cost).toHaveTextContent(mockDeploy.cost);
    expect(readableTimeStamp).toHaveTextContent(mockDeploy.readableTimestamp);
    expect(status).toHaveTextContent(mockDeploy.status);
    expect(action).toHaveTextContent(mockDeploy.action);
    expect(deployType).toHaveTextContent(mockDeploy.deployType);
  });
});
