import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { useAppWidth } from 'src/hooks';
import { HashButton } from 'src/components/buttons';
import { Deploy } from '../../../api';
import { Heading, InfoCard, HeadContentWrapper } from '../../base';
import {
  GradientHeading,
  Hash,
  DetailDataLabel,
  DetailDataWrapper,
  DetailDataValue,
  DetailDataList,
} from '../../styled';

import { CopyToClipboard, RawData } from '../../utility';
import { fontWeight, pxToRem } from '../../../styled-theme';

export interface DeployDetailsCardProps {
  deploy: Deploy;
}

export const DeployDetailsCard: React.FC<DeployDetailsCardProps> = ({
  deploy,
}) => {
  const { deployHash, blockHash, publicKey, rawDeploy } = deploy;
  const [isTruncated, setIsTruncated] = useState<boolean>(true);
  const { isMobile } = useAppWidth();
  const { t } = useTranslation();

  return (
    <InfoCard>
      <HeadContentWrapper>
        <DeployHeading type="h1">{t('deploy-details')}</DeployHeading>
        <HashWrapper>
          <HashHeading type="h2" isTruncated={isTruncated} isMobile={isMobile}>
            {isTruncated ? (
              <Hash hash={blockHash} alwaysTruncate />
            ) : (
              <Hash hash={blockHash} />
            )}
          </HashHeading>
          <HashButton
            isTruncated={isTruncated}
            setIsTruncated={setIsTruncated}
            heading={'deploy'}
          />
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

const HashHeading = styled(GradientHeading)<{
  isTruncated: boolean;
  isMobile: boolean;
}>`
  font-weight: ${fontWeight.extraBold};
  display: inline;
  margin: 0;
  min-width: ${pxToRem(360)};
  width: ${({ isTruncated }) => (isTruncated ? '10%' : '95%')};
  overflow-wrap: ${({ isMobile }) => (isMobile ? 'none' : 'break-word')};
`;
