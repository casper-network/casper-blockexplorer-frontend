import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const [isHashTruncated, setIsHashTruncated] = useState<boolean>(true);
  const { t } = useTranslation();
  const { trimmedAccountHash, publicKey, rawAccount } = account;

  const toggleHashView = () => {
    setIsHashTruncated(() => !isHashTruncated);
  };

  return (
    <InfoCard>
      <HeadContentContainer>
        <AccountHeading type="h1">{t('account-details')}</AccountHeading>
        <AvatarHashContainer>
          <AvatarIcon
            src={`${AVATAR_URL}${trimmedAccountHash}.svg`}
            alt="avatar"
            isHashTruncated={isHashTruncated}
          />
          <HashHeading type="h2">
            {isHashTruncated ? (
              <Hash hash={trimmedAccountHash} alwaysTruncate />
            ) : (
              <Hash hash={trimmedAccountHash} />
            )}
          </HashHeading>
        </AvatarHashContainer>
      </HeadContentContainer>
      <HashButton type="button" onClick={toggleHashView}>
        {isHashTruncated ? 'Expand' : 'Collapse'}
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

const HashHeading = styled(GradientHeading)`
  font-weight: ${fontWeight.extraBold};
  display: inline;
  margin: 0;
  width: 95%;
  overflow-wrap: break-word;
`;

const HashButton = styled(Button)`
  color: ${colors.greyBlue};
  background-color: transparent;
  border-style: none;
  padding: 0 5px;
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
