import React from 'react';
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

const getMockAccount = () => ({
  trimmedAccountHash:
    '85930bab3c3aa081a60b447c374ec0e81f847ea7612222e08a5c847ff2685f16',
  publicKey:
    '017b9a85b657e0a8c2e01bf2d80b6b2e6f8d8b4bc6d7c479f21e59dceea761710b',
  mainPurse:
    '"uref-770b0c78228941881e99bd4aee0b910d1288a00da6046fb7c8dbb9ccf4b4fa56-007"',
  rawAccount:
    '"account-hash-85930bab3c3aa081a60b447c374ec0e81f847ea7612222e08a5c847ff2685f16"',
});

const getMockBalance = () => '3,147,833,210,320 Motes';

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
    );
    const { trimmedAccountHash, publicKey } = getMockAccount();

    const baseCardBody = screen.getByTestId('baseCardBody');
    const accountHash = screen.getByTestId('account-hash');
    const publicHash = screen.getByTestId('public-key');
    const balance = screen.getByTestId('balance');

    expect(baseCardBody).toBeInTheDocument();
    expect(baseCardBody).toHaveTextContent('Account Hash');
    expect(accountHash).toHaveTextContent(trimmedAccountHash);
    expect(baseCardBody).toHaveTextContent('Public Key');
    expect(publicHash).toHaveTextContent(publicKey);
    expect(baseCardBody).toHaveTextContent('Balance');
    expect(balance).toHaveTextContent(getMockBalance());
    expect(baseCardBody).toHaveTextContent('Raw Data');
  });
});
