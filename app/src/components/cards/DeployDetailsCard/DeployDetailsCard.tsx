import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { useAppWidth } from 'src/hooks';
import { HashButton } from 'src/components/buttons';
import { hashPlaceholder } from 'src/utils';
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

import { CopyToClipboard, RawData, withSkeletonLoading } from '../../utility';
import { fontWeight, pxToRem } from '../../../styled-theme';

export interface DeployDetailsCardProps {
  deploy: Deploy | null;
  isLoading: boolean;
}

export const DeployDetailsCard: React.FC<DeployDetailsCardProps> = ({
  deploy,
  isLoading,
}) => {
  const [isTruncated, setIsTruncated] = useState<boolean>(true);
  const { isMobile } = useAppWidth();
  const { t } = useTranslation();

  return (
    <InfoCard>
      <HeadContentWrapper>
        <DeployHeading type="h1">{t('deploy-details')}</DeployHeading>
        <HashWrapper>
          {withSkeletonLoading(
            <>
              <HashHeading
                type="h2"
                isTruncated={isTruncated}
                isMobile={isMobile}>
                <Hash
                  hash={deploy?.blockHash ?? hashPlaceholder}
                  alwaysTruncate={isTruncated}
                />
              </HashHeading>
              <HashButton
                isTruncated={isTruncated}
                setIsTruncated={setIsTruncated}
                heading={'deploy'}
              />
            </>,
            isLoading,
            { width: 350, height: 60 },
          )}
        </HashWrapper>
      </HeadContentWrapper>
      <DetailDataWrapper>
        <DetailDataList>
          <li>
            <DetailDataLabel>{t('block-hash')}</DetailDataLabel>
            <DetailDataValue height="2rem">
              {withSkeletonLoading(
                <>
                  <Link to={`/block/${deploy?.blockHash ?? ''}`}>
                    <Hash hash={deploy?.blockHash ?? hashPlaceholder} />
                  </Link>
                  <CopyToClipboard textToCopy={deploy?.blockHash ?? ''} />
                </>,
                isLoading,
                { width: '60%' },
              )}
            </DetailDataValue>
          </li>
          <li>
            <DetailDataLabel>{t('public-key')}</DetailDataLabel>
            <DetailDataValue height="2rem">
              {withSkeletonLoading(
                <>
                  <Link to={`/account/${deploy?.publicKey ?? ''}`}>
                    <Hash hash={deploy?.publicKey ?? hashPlaceholder} />
                  </Link>
                  <CopyToClipboard textToCopy={deploy?.publicKey ?? ''} />
                </>,
                isLoading,
                { width: '60%' },
              )}
            </DetailDataValue>
          </li>
          <li>
            <DetailDataLabel>{t('deploy-hash')}</DetailDataLabel>
            <DetailDataValue height="2rem">
              {withSkeletonLoading(
                <>
                  <Hash hash={deploy?.deployHash ?? hashPlaceholder} />
                  <CopyToClipboard textToCopy={deploy?.deployHash ?? ''} />
                </>,
                isLoading,
                { width: '60%' },
              )}
            </DetailDataValue>
          </li>
          <li>
            <DetailDataLabel>{t('raw-data')}</DetailDataLabel>
            <DetailDataValue>
              {withSkeletonLoading(
                deploy?.rawDeploy && <RawData rawData={deploy.rawDeploy} />,
                isLoading,
                { width: 200, height: '2.25rem' },
              )}
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
  min-height: ${pxToRem(75)};
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
