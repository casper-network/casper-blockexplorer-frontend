import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HashButton } from 'src/components/buttons';
import { hashPlaceholder } from 'src/utils';
import {
  getAccountLoadingStatus,
  getBalanceLoadingStatus,
  Loading,
  useAppSelector,
} from 'src/store';
import {
  defaultTheme,
  pxToRem,
  Card,
  Heading,
  HeadingType,
  HeadingProps,
} from 'casper-ui-kit';
import { StyledCopyToClipboard } from 'src/components/utility';
import { AVATAR_URL } from '../../../constants';

import { Account } from '../../../api';
import { HeadContentWrapper, InfoCardContentWrapper } from '../../base';
import {
  Hash,
  AvatarIcon,
  DetailDataWrapper,
  DetailDataLabel,
  DetailDataValue,
  DetailDataList,
} from '../../styled';

import { Coin, RawData, withSkeletonLoading } from '../../utility';

export interface AccountDetailsCardProps {
  account: Account | null;
  balance: string | null;
}

export const AccountDetailsCard: React.FC<AccountDetailsCardProps> = ({
  account,
  balance,
}) => {
  const [isTruncated, setIsTruncated] = useState<boolean>(true);
  const { t } = useTranslation();

  const accountLoadingStatus = useAppSelector(getAccountLoadingStatus);
  const balanceLoadingStatus = useAppSelector(getBalanceLoadingStatus);

  const isAccountLoading = accountLoadingStatus !== Loading.Complete;
  const isBalanceLoading = balanceLoadingStatus !== Loading.Complete;

  return (
    <div data-testid="account-details-card">
      <HeadContentContainer isTruncated={isTruncated}>
        <AccountHeading type={HeadingType.H1} dataCy="h1-account-details">
          {t('account-details')}
        </AccountHeading>
        <AvatarHashContainer>
          {withSkeletonLoading(
            <AccountDetailsWrapper>
              <AvatarIcon
                src={`${AVATAR_URL}${account?.trimmedAccountHash ?? ''}.svg`}
                alt="avatar"
                isTruncated={isTruncated}
                data-cy="avatar-icon"
              />
              <HashExpandWrapper>
                <Heading type={HeadingType.H2}>
                  <HashHeading isTruncated={isTruncated}>
                    <Hash
                      hash={account?.trimmedAccountHash ?? hashPlaceholder}
                      alwaysTruncate={isTruncated}
                    />
                  </HashHeading>
                </Heading>
                <HashButton
                  isTruncated={isTruncated}
                  setIsTruncated={setIsTruncated}
                />
              </HashExpandWrapper>
            </AccountDetailsWrapper>,
            isAccountLoading,
            { width: 350, height: 60 },
          )}
        </AvatarHashContainer>
      </HeadContentContainer>

      <InfoCardContentWrapper>
        <Card.Body>
          <DetailDataWrapper>
            <DetailDataList gap="1.75rem">
              <li>
                <DetailDataLabel data-cy="account-hash-h3">
                  {t('account-hash')}
                </DetailDataLabel>
                <DetailDataValue
                  data-testid="account-hash"
                  data-cy="account-hash"
                  height="2rem">
                  {withSkeletonLoading(
                    <>
                      <Hash
                        hash={account?.trimmedAccountHash ?? hashPlaceholder}
                      />
                      <StyledCopyToClipboard
                        textToCopy={account?.trimmedAccountHash ?? ''}
                      />
                    </>,
                    isAccountLoading,
                    { width: '60%' },
                  )}
                </DetailDataValue>
              </li>
              <li>
                <DetailDataLabel data-cy="public-key-h3">
                  {t('public-key')}
                </DetailDataLabel>
                <DetailDataValue data-testid="public-key" data-cy="public-key">
                  {withSkeletonLoading(
                    account?.publicKey ? (
                      <>
                        <Hash hash={account?.publicKey} />
                        <StyledCopyToClipboard
                          textToCopy={account?.publicKey}
                        />
                      </>
                    ) : (
                      'Unknown'
                    ),
                    isAccountLoading,
                    { width: '60%' },
                  )}
                </DetailDataValue>
              </li>

              <li>
                <DetailDataLabel data-cy="balance-h3">
                  {t('balance')}
                </DetailDataLabel>
                <DetailDataValue data-testid="account-balance">
                  {withSkeletonLoading(
                    <Coin>{balance ?? ''}</Coin>,
                    isBalanceLoading || balance === null,
                    { width: 250 },
                  )}
                </DetailDataValue>
              </li>
              <li>
                <DetailDataLabel data-cy="raw-data-h3">
                  {t('raw-data')}
                </DetailDataLabel>
                <DetailDataValue data-testid="raw-data">
                  {withSkeletonLoading(
                    account?.rawAccount && (
                      <RawData
                        test-cy="raw-data-button"
                        rawData={account?.rawAccount}
                      />
                    ),
                    isAccountLoading,
                    { width: 200, height: '2.25rem' },
                  )}
                </DetailDataValue>
              </li>
            </DetailDataList>
          </DetailDataWrapper>
        </Card.Body>
      </InfoCardContentWrapper>
    </div>
  );
};

const AccountHeading = styled(Heading)<HeadingProps>`
  font-size: 1.25rem;
  font-weight: ${defaultTheme.typography.fontWeights.normal};
  color: ${props => props.theme.text.primary};
  margin-bottom: 2rem;
`;

const AccountDetailsWrapper = styled.div`
  display: flex;
`;

const HeadContentContainer = styled(HeadContentWrapper)<{
  isTruncated?: boolean;
}>`
  margin-bottom: 0.5rem;

  @media (min-width: ${defaultTheme.typography.breakpoints.lg}) {
    margin-bottom: ${({ isTruncated }) => (isTruncated ? '0.5rem' : '5rem')};
  }
`;

const AvatarHashContainer = styled.div`
  display: flex;
  align-items: flex-start;
  height: ${pxToRem(130)};
`;

const HashExpandWrapper = styled.div`
  overflow-wrap: break-word;
  margin: auto 0;
`;

const HashHeading = styled.div<{
  isTruncated: boolean;
}>`
  font-size: clamp(2.1rem, 6vw, 3.75rem);
  font-weight: ${defaultTheme.typography.fontWeights.bold};
  display: inline;
  margin: 0;
  min-width: ${pxToRem(360)};
  overflow-wrap: break-word;
  word-break: break-word;
  color: ${props => props.theme.text.hash};
  line-height: ${({ isTruncated }) => (isTruncated ? '4.1rem' : '3.5rem')};

  @media (min-width: ${defaultTheme.typography.breakpoints.lg}) {
    font-size: ${({ isTruncated }) =>
      isTruncated ? `${pxToRem(60)} ` : '3.3rem'};
    width: ${({ isTruncated }) => (isTruncated ? '10%' : '50vw')};
  }
`;
