import styled from '@emotion/styled';
import React from 'react';
import { AVATAR_URL } from '../../../constants';

import { Account } from '../../../types';
import { HeadContentWrapper, Heading, InfoCard } from '../../base';
import {
  GradientHeading,
  Hash,
  AvatarIcon,
  DetailDataWrapper,
  DetailDataLabel,
  DetailDataValue,
} from '../../styled';

import { CopyToClipboard, RawData } from '../../utility';

export interface AccountDetailsCardProps {
  account: Account;
  balance?: string;
}

export const AccountDetailsCard: React.FC<AccountDetailsCardProps> = ({
  account,
  balance,
}) => {
  const { trimmedAccountHash, publicKey, rawAccount } = account;

  return (
    <InfoCard>
      <HeadContentWrapper>
        <AccountHeading type="h1">Account Details</AccountHeading>
        <AvatarIcon
          src={`${AVATAR_URL}${trimmedAccountHash}.svg`}
          alt="avatar"
        />
        <HashHeading type="h2">
          <Hash hash={trimmedAccountHash} alwaysTruncate />
        </HashHeading>
      </HeadContentWrapper>
      <DetailDataWrapper>
        <li>
          <DetailDataLabel>Account Hash</DetailDataLabel>
          <DetailDataValue>
            <Hash hash={trimmedAccountHash} />
            <CopyToClipboard textToCopy={trimmedAccountHash} />
          </DetailDataValue>
        </li>
        <li>
          <DetailDataLabel>Public Key</DetailDataLabel>
          <DetailDataValue>
            <Hash hash={publicKey} />
            <CopyToClipboard textToCopy={publicKey} />
          </DetailDataValue>
        </li>
        <li>
          <DetailDataLabel>Balance</DetailDataLabel>
          <DetailDataValue>{balance} Motes</DetailDataValue>
        </li>
        <li>
          <DetailDataLabel>Raw Data</DetailDataLabel>
          <DetailDataValue>
            <RawData rawData={rawAccount} />
          </DetailDataValue>
        </li>
      </DetailDataWrapper>
    </InfoCard>
  );
};

const AccountHeading = styled(Heading)`
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const HashHeading = styled(GradientHeading)`
  font-weight: 800;
  display: inline;
`;
