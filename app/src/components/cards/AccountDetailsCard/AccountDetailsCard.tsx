import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppWidth } from 'src/hooks';
import { HashButton } from 'src/components/buttons';
import { hashPlaceholder } from 'src/utils';
import {
  getAccountLoadingStatus,
  getBalanceLoadingStatus,
  Loading,
  useAppSelector,
} from 'src/store';
import { AVATAR_URL } from '../../../constants';

import { Account } from '../../../api';
import { HeadContentWrapper, Heading, InfoCard } from '../../base';
import {
  GradientHeading,
  Hash,
  AvatarIcon,
  DetailDataWrapper,
  DetailDataLabel,
  DetailDataValue,
  DetailDataList,
} from '../../styled';

import {
  Coin,
  CopyToClipboard,
  RawData,
  withSkeletonLoading,
} from '../../utility';
import { fontWeight, pxToRem } from '../../../styled-theme';

export interface AccountDetailsCardProps {
  account: Account | null;
  balance: string | null;
}

export const AccountDetailsCard: React.FC<AccountDetailsCardProps> = ({
  account,
  balance,
}) => {
  const [isTruncated, setIsTruncated] = useState<boolean>(true);
  const { isMobile } = useAppWidth();
  const { t } = useTranslation();

  const accountLoadingStatus = useAppSelector(getAccountLoadingStatus);
  const balanceLoadingStatus = useAppSelector(getBalanceLoadingStatus);

  const isAccountLoading = accountLoadingStatus !== Loading.Complete;
  const isBalanceLoading = balanceLoadingStatus !== Loading.Complete;

  return (
    <InfoCard>
      <HeadContentContainer>
        <AccountHeading type="h1">{t('account-details')}</AccountHeading>
        <AvatarHashContainer>
          {withSkeletonLoading(
            <>
              <AvatarIcon
                src={`${AVATAR_URL}${account?.trimmedAccountHash ?? ''}.svg`}
                alt="avatar"
                isTruncated={isTruncated}
              />
              <HashExpandWrapper>
                <HashHeading
                  type="h2"
                  isTruncated={isTruncated}
                  isMobile={isMobile}>
                  <Hash
                    hash={account?.trimmedAccountHash ?? hashPlaceholder}
                    alwaysTruncate={isTruncated}
                  />
                </HashHeading>
                <HashButton
                  isTruncated={isTruncated}
                  setIsTruncated={setIsTruncated}
                />
              </HashExpandWrapper>
            </>,
            isAccountLoading,
            { width: 350, height: 60 },
          )}
        </AvatarHashContainer>
      </HeadContentContainer>
      <DetailDataWrapper>
        <DetailDataList gap="1.75rem">
          <li>
            <DetailDataLabel>{t('account-hash')}</DetailDataLabel>
            <DetailDataValue height="2rem">
              {withSkeletonLoading(
                <>
                  <Hash hash={account?.trimmedAccountHash ?? hashPlaceholder} />
                  <CopyToClipboard
                    textToCopy={account?.trimmedAccountHash ?? ''}
                  />
                </>,
                isAccountLoading,
                { width: '60%' },
              )}
            </DetailDataValue>
          </li>
          <li>
            <DetailDataLabel>{t('public-key')}</DetailDataLabel>
            <DetailDataValue>
              {withSkeletonLoading(
                account?.publicKey ? (
                  <>
                    <Hash hash={account?.publicKey} />
                    <CopyToClipboard textToCopy={account?.publicKey} />
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
            <DetailDataLabel>{t('balance')}</DetailDataLabel>
            <DetailDataValue>
              {withSkeletonLoading(
                <Coin>{balance ?? ''}</Coin>,
                isBalanceLoading || balance === null,
                { width: 250 },
              )}
            </DetailDataValue>
          </li>
          <li>
            <DetailDataLabel>{t('raw-data')}</DetailDataLabel>
            <DetailDataValue>
              {withSkeletonLoading(
                account?.rawAccount && (
                  <RawData rawData={account?.rawAccount} />
                ),
                isAccountLoading,
                { width: 200, height: '2.25rem' },
              )}
            </DetailDataValue>
          </li>
        </DetailDataList>
      </DetailDataWrapper>
    </InfoCard>
  );
};

const AccountHeading = styled(Heading)`
  font-size: 1.125rem;
  font-weight: ${fontWeight.medium};
  margin-bottom: 1rem;
`;

const HeadContentContainer = styled(HeadContentWrapper)`
  margin: 0;
`;

const AvatarHashContainer = styled.div`
  display: flex;
  align-items: flex-start;
  height: ${pxToRem(130)};
`;

const HashExpandWrapper = styled.div``;

const HashHeading = styled(GradientHeading)<{
  isTruncated: boolean;
  isMobile: boolean;
}>`
  font-weight: ${fontWeight.extraBold};
  display: inline;
  margin: 0;
  min-width: ${pxToRem(360)};
  width: ${({ isTruncated, isMobile }) =>
    isTruncated || isMobile ? '10%' : '95%'};
  overflow-wrap: ${({ isMobile }) => (isMobile ? 'none' : 'break-word')};
`;
