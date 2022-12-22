import styled from '@emotion/styled';
import React from 'react';
import { useTranslation } from 'react-i18next';
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
import { fontWeight } from '../../../styled-theme';

export interface AccountDetailsCardProps {
  account: Account;
  balance: string;
}

export const AccountDetailsCard: React.FC<AccountDetailsCardProps> = ({
  account,
  balance,
}) => {
  const { t } = useTranslation();
  const { trimmedAccountHash, publicKey, rawAccount } = account;

  return (
    <InfoCard>
      <HeadContentWrapper>
        <AccountHeading type="h1">{t('account-details')}</AccountHeading>
        <AvatarIcon
          src={`${AVATAR_URL}${trimmedAccountHash}.svg`}
          alt="avatar"
        />
        <HashHeading type="h2">
          <Hash hash={trimmedAccountHash} alwaysTruncate />
        </HashHeading>
      </HeadContentWrapper>
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

const HashHeading = styled(GradientHeading)`
  font-weight: ${fontWeight.extraBold};
  display: inline;
`;
