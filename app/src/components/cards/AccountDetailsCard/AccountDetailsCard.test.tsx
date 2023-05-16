import React from 'react';
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

const account = {
  trimmedAccountHash:
    '85930bab3c3aa081a60b447c374ec0e81f847ea7612222e08a5c847ff2685f16',
  publicKey:
    '017b9a85b657e0a8c2e01bf2d80b6b2e6f8d8b4bc6d7c479f21e59dceea761710b',
  mainPurse:
    '"uref-770b0c78228941881e99bd4aee0b910d1288a00da6046fb7c8dbb9ccf4b4fa56-007"',
  rawAccount:
    '"account-hash-85930bab3c3aa081a60b447c374ec0e81f847ea7612222e08a5c847ff2685f16"',
};

const balance = '3,147,833,210,320 Motesd';

describe('AccountDetailsCard', () => {
  it('should render the AccountDetailsCard', () => {
    const { getByTestId } = render(
      <AccountDetailsCard account={account} balance={balance} />,
    );
    const accountDetailsCard = getByTestId('AccountDetailsCard');

    expect(accountDetailsCard).toBeInTheDocument();
    expect(accountDetailsCard).toHaveTextContent('Account Details');
  });

  it('should render the BaseCard Component from the Casper UiKit', () => {
    const { getByTestId } = render(
      <AccountDetailsCard account={account} balance={balance} />,
    );
    const baseCard = getByTestId('baseCard');

    expect(baseCard).toBeInTheDocument();
  });

  it('should render the BaseCard body content', () => {
    const { getByTestId } = render(
      <AccountDetailsCard account={account} balance={balance} />,
    );
    const baseCardBody = getByTestId('baseCardBody');

    expect(baseCardBody).toBeInTheDocument();
    expect(baseCardBody).toHaveTextContent('Account Hash');
    expect(baseCardBody).toHaveTextContent('Public Key');
    expect(baseCardBody).toHaveTextContent('Balance');
    expect(baseCardBody).toHaveTextContent('Raw Data');
  });
});

/* <body>
<div>
  <div
    class="css-14923ef"
    data-testid="AccountDetailsCard"
  >
    <h1
      class="css-1gfv6zh"
    >
      Account Details
    </h1>
    <div
      class="css-6van74"
    >
      <span
        aria-busy="true"
        aria-live="polite"
      >
        <span
          class="react-loading-skeleton"
          style="width: 350px; height: 60px;"
        >
          ‌
        </span>
        <br />
      </span>
    </div>
  </div>
  <div
    class="css-19847w4"
    data-testid="baseCard"
  >
    <div
      class="body"
      data-testid="baseCardBody"
    >
      <ul
        class="css-4wjmim"
      >
        <ul
          class="css-qhptt6"
        >
          <li>
            <h3
              class="css-w30hmz"
            >
              Account Hash
            </h3>
            <div
              class="css-1swodwe"
              height="2rem"
            >
              <span
                aria-busy="true"
                aria-live="polite"
              >
                <span
                  class="react-loading-skeleton"
                  style="width: 60%;"
                >
                  ‌
                </span>
                <br />
              </span>
            </div>
          </li>
          <li>
            <h3
              class="css-w30hmz"
            >
              Public Key
            </h3>
            <div
              class="css-n1frap"
            >
              <span
                aria-busy="true"
                aria-live="polite"
              >
                <span
                  class="react-loading-skeleton"
                  style="width: 60%;"
                >
                  ‌
                </span>
                <br />
              </span>
            </div>
          </li>
          <li>
            <h3
              class="css-w30hmz"
            >
              Balance
            </h3>
            <div
              class="css-n1frap"
            >
              <span
                aria-busy="true"
                aria-live="polite"
              >
                <span
                  class="react-loading-skeleton"
                  style="width: 250px;"
                >
                  ‌
                </span>
                <br />
              </span>
            </div>
          </li>
          <li>
            <h3
              class="css-w30hmz"
            >
              Raw Data
            </h3>
            <div
              class="css-n1frap"
            >
              <span
                aria-busy="true"
                aria-live="polite"
              >
                <span
                  class="react-loading-skeleton"
                  style="width: 200px; height: 2.25rem;"
                >
                  ‌
                </span>
                <br />
              </span>
            </div>
          </li>
        </ul>
      </ul>
    </div>
  </div>
</div>
</body> */
