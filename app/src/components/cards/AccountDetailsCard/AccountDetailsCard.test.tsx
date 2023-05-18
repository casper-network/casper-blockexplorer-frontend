import React from 'react';
import { accountSlice, Loading, storeWithPreloadedState } from 'src/store';
import { screen } from '@testing-library/react';
import { render } from '../../../test-utils';
import { AccountDetailsCard } from './AccountDetailsCard';

jest.mock('react-i18next', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const englishTranslations = jest.requireActual(
    '../../../../public/locales/en/translation.json',
  );

  return {
    useTranslation: () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return { t: (key: string) => englishTranslations[key] };
    },
  };
});

const getRawAccount = () => ({
  _accountHash:
    'account-hash-4a15ca0c89ff7d2e30cf77bfd20793f61531d72b08d66bd6c9db3aef52b5cea5',
  namedKeys: [],
  mainPurse:
    'uref-4ba7b97ccc3af3dfe87f2b834865941ecafb09483bcb8fbb1fa49dd6aecf4ca3-007',
  associatedKeys: [
    {
      accountHash:
        'account-hash-4a15ca0c89ff7d2e30cf77bfd20793f61531d72b08d66bd6c9db3aef52b5cea5',
      weight: 1,
    },
  ],
  actionThresholds: { deployment: 1, keyManagement: 1 },
});

const getMockAccount = () => ({
  trimmedAccountHash:
    '4a15ca0c89ff7d2e30cf77bfd20793f61531d72b08d66bd6c9db3aef52b5cea5',
  publicKey:
    '0103dd8b2b18ef0b9fd5b7c8e340b104ee4d966f2a167eb1a938963f8c8f699a45',
  mainPurse:
    'uref-4ba7b97ccc3af3dfe87f2b834865941ecafb09483bcb8fbb1fa49dd6aecf4ca3-007',
  rawAccount: JSON.stringify(getRawAccount),
});

const getMockBalance = () => '3147833210320';

describe('AccountDetailsCard', () => {
  it('should render the AccountDetailsCard', () => {
    render(
      <AccountDetailsCard
        account={getMockAccount()}
        balance={getMockBalance()}
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
      />,
    );
    const baseCard = screen.getByTestId('baseCard');
    const baseCardBody = screen.getByTestId('baseCardBody');

    expect(baseCard).toBeInTheDocument();
    expect(baseCard).toContainElement(baseCardBody);
  });

  it('should render the BaseCard body content', () => {
    render(
      <AccountDetailsCard
        account={getMockAccount()}
        balance={getMockBalance()}
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

    const baseCardBody = screen.getByTestId('baseCardBody');
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
    // expect(rawData).toHaveTextContent(JSON.stringify(getRawAccount()));
  });
});
