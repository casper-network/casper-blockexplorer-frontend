import React from 'react';
import { accountSlice, Loading, storeWithPreloadedState } from 'src/store';
import { screen } from '@testing-library/react';
import { getMockAccount, getMockBalance } from 'src/mocks/mock-account';
import { render } from '../../../test-utils';
import { AccountDetailsCard } from './AccountDetailsCard';

describe('AccountDetailsCard', () => {
  it('should render the AccountDetailsCard', () => {
    render(
      <AccountDetailsCard
        account={getMockAccount()}
        balance={getMockBalance()}
        isAccountLoading={false}
        isBalanceLoading={false}
      />,
    );
    const accountDetailsCard = screen.getByTestId('account-details-card');

    expect(accountDetailsCard).toBeInTheDocument();
    expect(accountDetailsCard).toHaveTextContent('Account Details');
  });

  it('should render skeleton loaders for card details ', () => {
    render(
      <AccountDetailsCard
        account={getMockAccount()}
        balance={getMockBalance()}
        isAccountLoading
        isBalanceLoading
      />,
    );
    const skeletonLoaders = screen.getAllByTestId('skeleton-loader');

    expect(skeletonLoaders.length).toEqual(5);
  });

  it('should render the BaseCard Component', () => {
    render(
      <AccountDetailsCard
        account={getMockAccount()}
        balance={getMockBalance()}
        isAccountLoading={false}
        isBalanceLoading={false}
      />,
    );
    const baseCard = screen.getByTestId('base-card');
    const baseCardBody = screen.getByTestId('base-card-body');

    expect(baseCard).toBeInTheDocument();
    expect(baseCard).toContainElement(baseCardBody);
  });

  it('should render the BaseCard body content', () => {
    render(
      <AccountDetailsCard
        account={getMockAccount()}
        balance={getMockBalance()}
        isAccountLoading={false}
        isBalanceLoading={false}
      />,
      {
        store: storeWithPreloadedState({
          account: {
            ...accountSlice.getInitialState(),
            status: Loading.Complete,
            balanceLoadingStatus: Loading.Complete,
          },
        }),
      },
    );
    const { trimmedAccountHash, publicKey } = getMockAccount();

    const baseCardBody = screen.getByTestId('base-card-body');
    const accountHash = screen.getByTestId('account-hash');
    const publicHash = screen.getByTestId('public-key');
    const balance = screen.getByTestId('account-balance');

    expect(baseCardBody).toBeInTheDocument();
    expect(baseCardBody).toHaveTextContent('Account Hash');
    expect(accountHash).toHaveTextContent(trimmedAccountHash);
    expect(baseCardBody).toHaveTextContent('Public Key');
    expect(publicHash).toHaveTextContent(publicKey);
    expect(baseCardBody).toHaveTextContent('Balance');
    expect(balance).toHaveTextContent('3,147,833,210,320 Motes');
    expect(baseCardBody).toHaveTextContent('Raw Data');
  });
});
