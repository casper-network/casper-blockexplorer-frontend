import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Deploy } from '../../../types';
import { Heading, InfoCard, HeadContentWrapper } from '../../base';
import { GradientHeading, Hash } from '../../styled';
import { CopyToClipboard } from '../../utility';

export interface DeployDetailsCardProps {
  deploy: Deploy;
}

export const DeployDetailsCard: React.FC<DeployDetailsCardProps> = ({
  deploy,
}) => {
  const { deployHash, blockHash, publicKey } = deploy;

  return (
    <InfoCard>
      <HeadContentWrapper>
        <DeployHeading type="h1">Deploy Details</DeployHeading>
        <HashHeading type="h2">
          <Hash hash={deployHash} alwaysTruncate />
        </HashHeading>
      </HeadContentWrapper>
      <DetailDataWrapper>
        <li>
          <DetailDataLabel>Block Hash</DetailDataLabel>
          <DetailDataValue>
            <Link to={`/block/${blockHash}`}>
              <Hash hash={blockHash} />
            </Link>
            <CopyToClipboard textToCopy={blockHash} />
          </DetailDataValue>
        </li>
        <li>
          <DetailDataLabel>Public Key</DetailDataLabel>
          <DetailDataValue>
            <Link to={`/account/${publicKey}`}>
              <Hash hash={publicKey} />
            </Link>
            <CopyToClipboard textToCopy={publicKey} />
          </DetailDataValue>
        </li>
        <li>
          <DetailDataLabel>Deploy Hash</DetailDataLabel>
          <DetailDataValue>
            <Hash hash={deployHash} />
            <CopyToClipboard textToCopy={deployHash} />
          </DetailDataValue>
        </li>
      </DetailDataWrapper>
    </InfoCard>
  );
};

const DeployHeading = styled(Heading)`
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const HashHeading = styled(GradientHeading)`
  font-weight: 800;
`;

const DetailDataLabel = styled.h3`
  font-weight: 400;
  font-size: 1.05rem;
  color: #64748b;
`;

const DetailDataValue = styled.p`
  font-size: 1.25rem;
  color: black;
  font-weight: 500;
`;

const DetailDataWrapper = styled.ul`
  display: grid;
  gap: 2.5rem;
`;
