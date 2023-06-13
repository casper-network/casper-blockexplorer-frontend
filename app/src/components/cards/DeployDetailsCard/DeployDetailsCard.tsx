import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { HashButton } from 'src/components/buttons';
import { hashPlaceholder } from 'src/utils';
import { defaultTheme, Card } from 'casper-ui-kit';
import { InfoCardContentWrapper } from 'src/components/base';
import { StyledCopyToClipboard } from 'src/components/utility';
import { Heading } from '../../base';
import { Deploy } from '../../../api';
import {
  Hash,
  DetailDataLabel,
  DetailDataWrapper,
  DetailDataValue,
  DetailDataList,
} from '../../styled';

import { RawData, withSkeletonLoading } from '../../utility';

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
  const navigate = useNavigate();

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
                <DetailDataValue data-testid="block-hash" height="2rem">
                  {withSkeletonLoading(
                    <>
                      <StyledHashLink
                        data-testid="block-hash-link"
                        onClick={() => {
                          navigate(`/block/${deploy?.blockHash ?? ''}`);
                        }}
                        to={`/block/${deploy?.blockHash ?? ''}`}>
                        <Hash hash={deploy?.blockHash ?? hashPlaceholder} />
                      </StyledHashLink>
                      <StyledCopyToClipboard
                        textToCopy={deploy?.blockHash ?? ''}
                      />
                    </>,
                    isLoading,
                    { width: '60%' },
                  )}
                </DetailDataValue>
              </li>
              <li>
                <DetailDataLabel>{t('public-key')}</DetailDataLabel>
                <DetailDataValue data-testid="public-key" height="2rem">
                  {withSkeletonLoading(
                    <>
                      <StyledHashLink
                        data-testid="public-key-link"
                        onClick={() => {
                          navigate(`/account/${deploy?.publicKey ?? ''}`);
                        }}
                        to={`/account/${deploy?.publicKey ?? ''}`}>
                        <Hash hash={deploy?.publicKey ?? hashPlaceholder} />
                      </StyledHashLink>
                      <StyledCopyToClipboard
                        textToCopy={deploy?.publicKey ?? ''}
                      />
                    </>,
                    isLoading,
                    { width: '60%' },
                  )}
                </DetailDataValue>
              </li>
              <li>
                <DetailDataLabel>{t('deploy-hash')}</DetailDataLabel>
                <DetailDataValue data-testid="deploy-hash" height="2rem">
                  {withSkeletonLoading(
                    <>
                      <Hash hash={deploy?.deployHash ?? hashPlaceholder} />
                      <StyledCopyToClipboard
                        textToCopy={deploy?.deployHash ?? ''}
                      />
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

  @media (min-width: ${defaultTheme.typography.breakpoints.md}) {
    margin: 0.1rem 0 2rem 0;
  }
`;

const HashHeading = styled(Heading)<{
  isTruncated: boolean;
}>`
  font-weight: ${defaultTheme.typography.fontWeights.medium};
  margin: 0;
  margin: 1.5rem 0 2.5rem 0;
  width: ${({ isTruncated }) => (isTruncated ? '40%' : '75vw')};
  overflow-wrap: none;
  font-size: clamp(2.8rem, 6vw, 3.75rem);
  color: ${props => props.theme.text.hash};
  line-height: ${({ isTruncated }) => (isTruncated ? '4.1rem' : '3.5rem')};

  @media (min-width: ${defaultTheme.typography.breakpoints.xs}) {
    margin: 1.5rem 0 2.5rem 0.5rem;
  }

  @media (min-width: ${defaultTheme.typography.breakpoints.md}) {
    margin: 0;
  }

  @media (min-width: ${defaultTheme.typography.breakpoints.lg}) {
    overflow-wrap: break-word;
  }
`;

const StyledHashLink = styled(Link)`
  color: ${props => props.theme.text.hash};
`;
