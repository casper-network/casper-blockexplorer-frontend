import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppWidth } from 'src/hooks';
import { AVATAR_URL } from '../../../constants';

import { Account } from '../../../api';
import { Button, HeadContentWrapper, Heading, InfoCard } from '../../base';
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
import { colors, fontWeight, pxToRem } from '../../../styled-theme';

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

  const toggleHashView = () => {
    setIsTruncated(() => !isTruncated);
  };

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
      <HashButton type="button" onClick={toggleHashView} isMobile={isMobile}>
        {isTruncated ? `${t('expand')}` : `${t('collapse')}`}
      </HashButton>

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

const HashButton = styled(Button)<{ isMobile: boolean }>`
  display: ${({ isMobile }) => (isMobile ? 'none' : 'block')};
  color: ${colors.greyBlue};
  background-color: transparent;
  border-style: none;
  padding: 0 ${pxToRem(5)};
  margin-left: ${pxToRem(65)};
  width: fit-content;
  margin-bottom: 2rem;

  :active,
  :hover {
    transition: ease-in-out, font-weight, color, 400ms;
    font-weight: 700;
    background: linear-gradient(
      95.02deg,
      #1c1e90 0.62%,
      #693590 48.99%,
      #d81d54 70.51%,
      #d81e54 70.85%,
      #fd6b52 116.85%
    );
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
    background-color: transparent;
  }
`;
