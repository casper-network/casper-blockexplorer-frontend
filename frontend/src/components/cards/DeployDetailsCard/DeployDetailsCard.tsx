import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { Deploy } from '../../../api';
import { Heading, InfoCard, HeadContentWrapper, Button } from '../../base';
import {
  GradientHeading,
  Hash,
  DetailDataLabel,
  DetailDataWrapper,
  DetailDataValue,
  DetailDataList,
} from '../../styled';

import { CopyToClipboard, RawData } from '../../utility';
import { colors, fontWeight, pxToRem } from '../../../styled-theme';

export interface DeployDetailsCardProps {
  deploy: Deploy;
}

export const DeployDetailsCard: React.FC<DeployDetailsCardProps> = ({
  deploy,
}) => {
  const { deployHash, blockHash, publicKey, rawDeploy } = deploy;
  const [isTruncated, setIsTruncated] = useState<boolean>(true);
  const { t } = useTranslation();

  const toggleHashView = () => {
    setIsTruncated(() => !isTruncated);
  };

  return (
    <InfoCard>
      <HeadContentWrapper>
        <DeployHeading type="h1">{t('deploy-details')}</DeployHeading>
        <HashWrapper>
          <HashHeading type="h2" isTruncated={isTruncated}>
            {isTruncated ? (
              <Hash hash={blockHash} alwaysTruncate />
            ) : (
              <Hash hash={blockHash} />
            )}
          </HashHeading>
          <HashButton type="button" onClick={toggleHashView}>
            {isTruncated ? 'Expand' : 'Collapse'}
          </HashButton>
        </HashWrapper>
      </HeadContentWrapper>
      <DetailDataWrapper>
        <DetailDataList>
          <li>
            <DetailDataLabel>{t('block-hash')}</DetailDataLabel>
            <DetailDataValue>
              <Link to={`/block/${blockHash}`}>
                <Hash hash={blockHash} />
              </Link>
              <CopyToClipboard textToCopy={blockHash} />
            </DetailDataValue>
          </li>
          <li>
            <DetailDataLabel>{t('public-key')}</DetailDataLabel>
            <DetailDataValue>
              <Link to={`/account/${publicKey}`}>
                <Hash hash={publicKey} />
              </Link>
              <CopyToClipboard textToCopy={publicKey} />
            </DetailDataValue>
          </li>
          <li>
            <DetailDataLabel>{t('deploy-hash')}</DetailDataLabel>
            <DetailDataValue>
              <Hash hash={deployHash} />
              <CopyToClipboard textToCopy={deployHash} />
            </DetailDataValue>
          </li>
          <li>
            <DetailDataLabel>{t('raw-data')}</DetailDataLabel>
            <DetailDataValue>
              <RawData rawData={rawDeploy} />
            </DetailDataValue>
          </li>
        </DetailDataList>
      </DetailDataWrapper>
    </InfoCard>
  );
};

const DeployHeading = styled(Heading)`
  font-size: 1.125rem;
  font-weight: ${fontWeight.medium};
  margin-bottom: 1rem;
`;

const HashWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HashHeading = styled(GradientHeading)<{ isTruncated: boolean }>`
  font-weight: ${fontWeight.extraBold};
  display: inline;
  margin: 0;
  width: ${({ isTruncated }) => (isTruncated ? '30%' : '100%')};
  overflow-wrap: break-word;
`;

const HashButton = styled(Button)`
  color: ${colors.greyBlue};
  background-color: transparent;
  border-style: none;
  padding: 0 ${pxToRem(5)};
  width: fit-content;
  position: relative;
  right: ${pxToRem(4)};

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
