import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { ApiData } from 'src/api/types';
import { HashButton } from 'src/components/buttons';
import { defaultTheme, pxToRem, Card } from 'casper-ui-kit';
import { hashPlaceholder } from 'src/utils';
import { Heading, InfoCardContentWrapper, Spacer } from '../../base';
import {
  DetailDataLabel,
  DetailDataValue,
  DetailDataWrapper,
  Hash,
} from '../../styled';
import { CopyToClipboard, RawData, withSkeletonLoading } from '../../utility';

export interface BlockDetailsCardProps {
  block: ApiData.Block | null;
  isLoading: boolean;
}

export const BlockDetailsCard: React.FC<BlockDetailsCardProps> = ({
  block,
  isLoading,
}) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const { t } = useTranslation();

  const rawBlock = JSON.stringify(block);

  const navigate = useNavigate();

  const handleParentLink = () => {
    navigate(`/block/${block?.header.parent_hash ?? ''}`);
  };

  const handleValidatorLink = () => {
    navigate(`/account/${block?.body.proposer ?? ''}`);
  };

  return (
    <div data-testid="block-details-card">
      <PageHeading>
        <HashWrapper>
          <HashHeading
            type="h2"
            isTruncated={isTruncated}
            data-cy="hash-heading">
            {withSkeletonLoading(
              <Hash
                hash={block?.hash ?? hashPlaceholder}
                alwaysTruncate={isTruncated}
              />,
              isLoading,
              { width: 275 },
            )}
          </HashHeading>
          {withSkeletonLoading(
            <HashButton
              isTruncated={isTruncated}
              setIsTruncated={setIsTruncated}
            />,
            isLoading,
            { width: 75 },
          )}
        </HashWrapper>
      </PageHeading>

      <InfoCardContentWrapper>
        <Card.Body>
          <DetailDataRowWrapper>
            <li>
              <DetailDataLabel>{t('block-height')}</DetailDataLabel>
              <DetailDataValue
                data-testid="block-height"
                data-cy="block-height"
                isLargeText>
                {withSkeletonLoading(block?.header.height, isLoading, {
                  width: 100,
                })}
              </DetailDataValue>
            </li>
            <li>
              <DetailDataLabel>{t('current-era')}</DetailDataLabel>
              <DetailDataValue data-testid="current-era" isLargeText>
                {withSkeletonLoading(block?.header.era_id, isLoading, {
                  width: 100,
                })}
              </DetailDataValue>
            </li>
            <li>
              <DetailDataLabel>{t('timestamp')}</DetailDataLabel>
              <DetailDataValue data-testid="timestamp" isLargeText>
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

          <Spacer height="2.5rem" />

          <DetailDataWrapper>
            <li>
              <DetailDataLabel>{t('parent-hash')}</DetailDataLabel>
              <DetailDataValue data-testid="parent-hash" height="2rem">
                <StyledHashLink
                  to={{
                    pathname: `/block/${block?.header.parent_hash ?? ''}`,
                  }}
                  onClick={handleParentLink}>
                  {withSkeletonLoading(
                    <Hash
                      hash={block?.header.parent_hash ?? hashPlaceholder}
                    />,
                    isLoading,
                    { width: 850 },
                  )}
                </StyledHashLink>
                {!isLoading && (
                  <CopyToClipboard
                    textToCopy={block?.header.parent_hash ?? ''}
                  />
                )}
              </DetailDataValue>
            </li>
            <li>
              <DetailDataLabel>{t('block-hash')}</DetailDataLabel>
              <DetailDataValue data-testid="block-hash" height="2rem">
                {withSkeletonLoading(
                  <Hash hash={block?.hash ?? hashPlaceholder} />,
                  isLoading,
                  { width: 850 },
                )}
                {!isLoading && (
                  <CopyToClipboard textToCopy={block?.hash ?? ''} />
                )}
              </DetailDataValue>
            </li>
            <li>
              <DetailDataLabel>{t('state-root-hash')}</DetailDataLabel>
              <DetailDataValue data-testid="state-root-hash">
                {withSkeletonLoading(
                  <Hash
                    hash={block?.header.state_root_hash ?? hashPlaceholder}
                  />,
                  isLoading,
                  { width: 850 },
                )}
              </DetailDataValue>
            </li>
            <li>
              <DetailDataLabel>{t('validator')}</DetailDataLabel>
              <DetailDataValue data-testid="validator" height="2rem">
                <StyledHashLink
                  to={{
                    pathname: `/account/${block?.body.proposer ?? ''}`,
                  }}
                  onClick={handleValidatorLink}>
                  {withSkeletonLoading(
                    <Hash hash={block?.body.proposer ?? hashPlaceholder} />,
                    isLoading,
                    { width: 850 },
                  )}
                </StyledHashLink>
                {!isLoading && (
                  <CopyToClipboard textToCopy={block?.body.proposer ?? ''} />
                )}
              </DetailDataValue>
            </li>
          </DetailDataWrapper>

          <Spacer height="2.5rem" />

          <DetailDataRowWrapper>
            <li>
              <DetailDataLabel>{t('raw-data')}</DetailDataLabel>
              <DetailDataValue>
                <RawData rawData={rawBlock} />
              </DetailDataValue>
            </li>
            <li>
              <DetailDataLabel>{t('deploys')}</DetailDataLabel>
              <DetailDataValue isLargeText>
                {withSkeletonLoading(
                  block?.body.deploy_hashes?.length ? (
                    <ul>
                      {block?.body.deploy_hashes?.map(deployHash => (
                        <li key={deployHash}>
                          <StyledHashLink
                            to={{ pathname: `/deploy/${deployHash}` }}>
                            <Hash
                              alwaysTruncate
                              hash={deployHash ?? hashPlaceholder}
                            />
                          </StyledHashLink>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    t('no-deploys')
                  ),
                  isLoading,
                  { width: 150 },
                )}
              </DetailDataValue>
            </li>
            <li>
              <DetailDataLabel>{t('transfers')}</DetailDataLabel>
              <DetailDataValue isLargeText>
                {withSkeletonLoading(
                  block?.body.transfer_hashes?.length ? (
                    <ul>
                      {block?.body.transfer_hashes?.map(transferHash => (
                        <li key={transferHash}>
                          <StyledHashLink
                            to={{ pathname: `/deploy/${transferHash}` }}>
                            <Hash
                              alwaysTruncate
                              hash={transferHash ?? hashPlaceholder}
                            />
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
          </DetailDataRowWrapper>
        </Card.Body>
      </InfoCardContentWrapper>
    </div>
  );
};

const { breakpoints } = defaultTheme.typography;

const HashWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HashHeading = styled(Heading)<{ isTruncated: boolean }>`
  font-weight: ${defaultTheme.typography.fontWeights.medium};
  display: inline;
  margin: 0;
  width: ${({ isTruncated }) => (isTruncated ? '40%' : '75vw')};
  min-width: ${pxToRem(400)};
  overflow-wrap: break-word;
  font-size: ${({ isTruncated }) =>
    isTruncated ? `${pxToRem(60)}` : '3.3rem'};
  color: ${props => props.theme.text.hash};
  line-height: ${({ isTruncated }) => (isTruncated ? '4.1rem' : '3.5rem')};
`;

const DetailDataRowWrapper = styled.ul`
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: ${breakpoints.lg}) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${pxToRem(96)};
  }
`;

const PageHeading = styled.div`
  @media only screen and (min-width: ${breakpoints.lg}) {
    margin-bottom: 2rem;
  }
`;

const StyledHashLink = styled(Link)`
  color: ${props => props.theme.text.hash};
`;
