import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppWidth } from 'src/hooks';
import { HashButton } from 'src/components/buttons';
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

import { Coin, CopyToClipboard, RawData } from '../../utility';
import { fontWeight, pxToRem } from '../../../styled-theme';

export interface AccountDetailsCardProps {
  account: Account;
  balance: string;
}

export const AccountDetailsCard: React.FC<AccountDetailsCardProps> = ({
  account,
  balance,
}) => {
  const [isTruncated, setIsTruncated] = useState<boolean>(true);
  const { isMobile } = useAppWidth();
  const { t } = useTranslation();
  const { trimmedAccountHash, publicKey, rawAccount } = account;

  return (
    <InfoCard>
      <HeadContentContainer>
        <AccountHeading type="h1">{t('account-details')}</AccountHeading>
        <AvatarHashContainer>
          <AvatarIcon
            src={`${AVATAR_URL}${trimmedAccountHash}.svg`}
            alt="avatar"
            isTruncated={isTruncated}
          />
          <HashHeading type="h2" isTruncated={isTruncated} isMobile={isMobile}>
            {isTruncated ? (
              <Hash hash={trimmedAccountHash} alwaysTruncate />
            ) : (
              <Hash hash={trimmedAccountHash} />
            )}
          </HashHeading>
        </AvatarHashContainer>
      </HeadContentContainer>
      <HashButton
        isTruncated={isTruncated}
        setIsTruncated={setIsTruncated}
        isAvatar
      />
      <DetailDataWrapper>
        <DetailDataList gap="1.75rem">
          <li>
            <DetailDataLabel>{t('account-hash')}</DetailDataLabel>
            <DetailDataValue>
              <Hash hash={trimmedAccountHash} />
              <CopyToClipboard textToCopy={trimmedAccountHash} />
            </DetailDataValue>
          </li>
          <li>
            <DetailDataLabel>{t('public-key')}</DetailDataLabel>
            <DetailDataValue>
              <Hash hash={publicKey} />
              <CopyToClipboard textToCopy={publicKey} />
            </DetailDataValue>
          </li>
          <li>
            <DetailDataLabel>{t('balance')}</DetailDataLabel>
            <DetailDataValue>
              <Coin>{balance}</Coin>
            </DetailDataValue>
          </li>
          <li>
            <DetailDataLabel>{t('raw-data')}</DetailDataLabel>
            <DetailDataValue>
              <RawData rawData={rawAccount} />
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
  flex-direction: row;
`;

const HashHeading = styled(GradientHeading)<{
  isTruncated: boolean;
  isMobile: boolean;
}>`
  font-weight: ${fontWeight.extraBold};
  display: inline;
  margin: 0;
  min-width: ${pxToRem(360)};
  width: ${({ isTruncated }) => (isTruncated ? '30%' : '95%')};
  overflow-wrap: ${({ isMobile }) => (isMobile ? 'none' : 'break-word')};
`;
