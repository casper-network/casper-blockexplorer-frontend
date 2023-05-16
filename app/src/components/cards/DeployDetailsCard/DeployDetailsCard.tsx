import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { HashButton } from 'src/components/buttons';
import { hashPlaceholder } from 'src/utils';
import { pxToRem, defaultTheme, Card } from 'casper-ui-kit';
import { InfoCardContentWrapper } from 'src/components/base';
import { Heading } from '../../base';
import { Deploy } from '../../../api';
import {
  Hash,
  DetailDataLabel,
  DetailDataWrapper,
  DetailDataValue,
  DetailDataList,
} from '../../styled';

import { CopyToClipboard, RawData, withSkeletonLoading } from '../../utility';

export interface DeployDetailsCardProps {
  deploy: Deploy | null;
  isLoading: boolean;
}

export const DeployDetailsCard: React.FC<DeployDetailsCardProps> = ({
  deploy,
  isLoading,
}) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const { t } = useTranslation();

  return (
    <div data-testid="deploy-details-card">
      <HeaderContent>
        <HashWrapper>
          {withSkeletonLoading(
            <>
              <HashHeading type="h2" isTruncated={isTruncated}>
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
      </HeaderContent>
      <InfoCardContentWrapper>
        <Card.Body>
          <DetailDataWrapper>
            <DetailDataList>
              <li>
                <DetailDataLabel>{t('block-hash')}</DetailDataLabel>
                <DetailDataValue height="2rem">
                  {withSkeletonLoading(
                    <>
                      <StyledHashLink to={`/block/${deploy?.blockHash ?? ''}`}>
                        <Hash hash={deploy?.blockHash ?? hashPlaceholder} />
                      </StyledHashLink>
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
                      <StyledHashLink
                        to={`/account/${deploy?.publicKey ?? ''}`}>
                        <Hash hash={deploy?.publicKey ?? hashPlaceholder} />
                      </StyledHashLink>
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
        </Card.Body>
      </InfoCardContentWrapper>
    </div>
  );
};

const HeaderContent = styled.div``;

const HashWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: ${pxToRem(75)};
`;

const HashHeading = styled(Heading)<{
  isTruncated: boolean;
}>`
  font-weight: ${defaultTheme.typography.fontWeights.medium};
  display: inline;
  margin: 0;
  min-width: ${pxToRem(360)};
  width: ${({ isTruncated }) => (isTruncated ? '40%' : '75vw')};
  overflow-wrap: none;
  font-size: ${pxToRem(60)};
  color: ${props => props.theme.text.hash};

  @media (min-width: ${defaultTheme.typography.breakpoints.lg}) {
    overflow-wrap: break-word;
  }
`;

const StyledHashLink = styled(Link)`
  color: ${props => props.theme.text.hash};
`;
