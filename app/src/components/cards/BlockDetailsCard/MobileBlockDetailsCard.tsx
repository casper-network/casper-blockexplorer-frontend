import styled from '@emotion/styled';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ApiData } from 'src/api/types';
import { Card, defaultTheme, CopyToClipboard } from 'casper-ui-kit';
import { hashPlaceholder } from 'src/utils';

import { InfoCardContentWrapper } from 'src/components/base';
import {
  DetailDataLabel,
  DetailDataValue,
  DetailDataWrapper,
  Hash,
} from '../../styled';
import { RawData, withSkeletonLoading } from '../../utility';

export interface MobileBlockDetailsCardProps {
  block: ApiData.Block | null;
  isLoading: boolean;
}

export const MobileBlockDetailsCard: React.FC<MobileBlockDetailsCardProps> = ({
  block,
  isLoading,
}) => {
  const { t } = useTranslation();

  const rawBlock = JSON.stringify(block);

  return (
    <>
      <PageHeading>
        {withSkeletonLoading(
          <Hash hash={block?.hash ?? hashPlaceholder} alwaysTruncate />,
          isLoading,
          { width: 275 },
        )}
      </PageHeading>

      <InfoCardContentWrapper>
        <Card.Body>
          <DetailDataRowWrapper>
            <li>
              <DetailDataLabel>{t('block-height')}</DetailDataLabel>
              <DetailDataValue data-cy="block-height">
                {withSkeletonLoading(block?.header.height, isLoading, {
                  width: 100,
                })}
              </DetailDataValue>
            </li>
            <li>
              <DetailDataLabel>{t('current-era')}</DetailDataLabel>
              <DetailDataValue>
                {withSkeletonLoading(block?.header.era_id, isLoading, {
                  width: 100,
                })}
              </DetailDataValue>
            </li>
            <li>
              <DetailDataLabel>{t('timestamp')}</DetailDataLabel>
              <DetailDataValue>
                {withSkeletonLoading(
                  block?.header.timestamp.toLocaleString(),
                  isLoading,
                  {
                    width: 275,
                  },
                )}
              </DetailDataValue>
            </li>
          </DetailDataRowWrapper>
        </Card.Body>
      </InfoCardContentWrapper>
      <InfoCardContentWrapper>
        <Card.Body>
          <DetailDataWrapper>
            <li>
              <DetailDataLabel>{t('parent-hash')}</DetailDataLabel>
              <DetailDataValue height="2rem">
                <StyledHashLink
                  to={{
                    pathname: `/block/${block?.header.parent_hash ?? ''}`,
                  }}>
                  {withSkeletonLoading(
                    <Hash
                      hash={block?.header.parent_hash ?? hashPlaceholder}
                    />,
                    isLoading,
                    {
                      width: 175,
                    },
                  )}
                </StyledHashLink>
                {!isLoading && (
                  <CopyToClipboard
                    textToCopy={block?.header.parent_hash ?? hashPlaceholder}
                  />
                )}
              </DetailDataValue>
            </li>
            <li>
              <DetailDataLabel>{t('block-hash')}</DetailDataLabel>
              <DetailDataValue height="2rem">
                {withSkeletonLoading(
                  <Hash hash={block?.hash ?? hashPlaceholder} />,
                  isLoading,
                  {
                    width: 175,
                  },
                )}
                {!isLoading && (
                  <CopyToClipboard textToCopy={block?.hash ?? ''} />
                )}
              </DetailDataValue>
            </li>
            <li>
              <DetailDataLabel>{t('state-root-hash')}</DetailDataLabel>
              <DetailDataValue>
                {withSkeletonLoading(
                  <Hash
                    hash={block?.header.state_root_hash ?? hashPlaceholder}
                  />,
                  isLoading,
                  {
                    width: 175,
                  },
                )}
              </DetailDataValue>
            </li>
            <li>
              <DetailDataLabel>{t('validator')}</DetailDataLabel>
              <DetailDataValue height="2rem">
                <StyledHashLink
                  to={{
                    pathname: `/account/${block?.body.proposer ?? ''}`,
                  }}>
                  {withSkeletonLoading(
                    <Hash hash={block?.body.proposer ?? hashPlaceholder} />,
                    isLoading,
                    {
                      width: 175,
                    },
                  )}
                </StyledHashLink>
                {!isLoading && (
                  <CopyToClipboard textToCopy={block?.body.proposer ?? ''} />
                )}
              </DetailDataValue>
            </li>
          </DetailDataWrapper>
        </Card.Body>
      </InfoCardContentWrapper>
      <InfoCardContentWrapper>
        <Card.Body>
          <DetailDataWrapper>
            <li>
              <DetailDataLabel>{t('deploys')}</DetailDataLabel>
              <DetailDataValue>
                {withSkeletonLoading(
                  block?.body.deploy_hashes?.length ? (
                    <ul>
                      {block?.body.deploy_hashes?.map(deployHash => (
                        <li key={deployHash}>
                          <StyledHashLink
                            to={{ pathname: `/deploy/${deployHash}` }}>
                            <Hash hash={deployHash} />
                          </StyledHashLink>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    'No deploys'
                  ),
                  isLoading,
                  { width: 150 },
                )}
              </DetailDataValue>
            </li>
            <li>
              <DetailDataLabel>{t('transfers')}</DetailDataLabel>
              <DetailDataValue>
                {withSkeletonLoading(
                  block?.body.transfer_hashes?.length ? (
                    <ul>
                      {block?.body.transfer_hashes?.map(transferHash => (
                        <li key={transferHash}>
                          <StyledHashLink
                            to={{ pathname: `/deploy/${transferHash}` }}>
                            <Hash hash={transferHash} />
                          </StyledHashLink>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    t('no-transfers')
                  ),
                  isLoading,
                  { width: 150 },
                )}
              </DetailDataValue>
            </li>
            <li>
              <DetailDataLabel>{t('raw-data')}</DetailDataLabel>
              <DetailDataValue>
                <RawData rawData={rawBlock} />
              </DetailDataValue>
            </li>
          </DetailDataWrapper>
        </Card.Body>
      </InfoCardContentWrapper>
    </>
  );
};

const PageHeading = styled.h2`
  display: block;
  font-size: clamp(2.8rem, 6vw, 3.75rem);
  margin: 1.5rem 0 2.5rem 0;
  color: ${props => props.theme.text.hash};
  font-weight: ${defaultTheme.typography.fontWeights.medium};

  @media (min-width: ${defaultTheme.typography.breakpoints.xs}) {
    margin: 1.5rem 0 2.5rem 0.5rem;
  }

  @media (min-width: ${defaultTheme.typography.breakpoints.md}) {
    margin: 0 0 0 2rem 0;
  }
`;

const DetailDataRowWrapper = styled(DetailDataWrapper)`
  display: flex;
  flex-wrap: wrap;
`;

const StyledHashLink = styled(Link)`
  color: ${props => props.theme.text.hash};
`;
