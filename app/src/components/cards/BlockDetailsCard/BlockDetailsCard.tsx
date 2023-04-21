import styled from '@emotion/styled';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ApiData } from 'src/api/types';
import { HashButton } from 'src/components/buttons';
import { breakpoints, fontWeight, pxToRem } from 'src/styled-theme';
import { hashPlaceholder } from 'src/utils';
import { Heading, InfoCard } from '../../base';
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

  // TODO: need BACK button to /blocks
  return (
    <>
      <PageHeading>
        <HashWrapper>
          <HashHeading type="h2" isTruncated={isTruncated}>
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

      <InfoCard>
        <DetailDataRowWrapper>
          <li>
            <DetailDataLabel>{t('block-height')}</DetailDataLabel>
            <DetailDataValue>
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
        <DetailDataWrapper>
          <li>
            <DetailDataLabel>{t('parent-hash')}</DetailDataLabel>
            <DetailDataValue height="2rem">
              <Link
                to={{
                  pathname: `/block/${block?.header.parent_hash ?? ''}`,
                }}>
                {withSkeletonLoading(
                  <Hash hash={block?.header.parent_hash ?? hashPlaceholder} />,
                  isLoading,
                  { width: 850 },
                )}
              </Link>
              {!isLoading && (
                <CopyToClipboard textToCopy={block?.header.parent_hash ?? ''} />
              )}
            </DetailDataValue>
          </li>
          <li>
            <DetailDataLabel>{t('block-hash')}</DetailDataLabel>
            <DetailDataValue height="2rem">
              {withSkeletonLoading(
                <Hash hash={block?.hash ?? hashPlaceholder} />,
                isLoading,
                { width: 850 },
              )}
              {!isLoading && <CopyToClipboard textToCopy={block?.hash ?? ''} />}
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
                { width: 850 },
              )}
            </DetailDataValue>
          </li>
          <li>
            <DetailDataLabel>{t('validator')}</DetailDataLabel>
            <DetailDataValue height="2rem">
              <Link
                to={{
                  pathname: `/account/${block?.body.proposer ?? ''}`,
                }}>
                {withSkeletonLoading(
                  <Hash hash={block?.body.proposer ?? hashPlaceholder} />,
                  isLoading,
                  { width: 850 },
                )}
              </Link>
              {!isLoading && (
                <CopyToClipboard textToCopy={block?.body.proposer ?? ''} />
              )}
            </DetailDataValue>
          </li>
        </DetailDataWrapper>
        <DetailDataRowWrapper>
          <li>
            <DetailDataLabel>{t('raw-data')}</DetailDataLabel>
            <DetailDataValue>
              <RawData rawData={rawBlock} />
            </DetailDataValue>
          </li>
          <li>
            <DetailDataLabel>{t('deploys')}</DetailDataLabel>
            <DetailDataValue>
              {withSkeletonLoading(
                block?.body.deploy_hashes?.length ? (
                  <ul>
                    {block?.body.deploy_hashes?.map(deployHash => (
                      <li key={deployHash}>
                        <a href={`/deploy/${deployHash}`}>
                          <Hash
                            alwaysTruncate
                            hash={deployHash ?? hashPlaceholder}
                          />
                        </a>
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
            <DetailDataValue>
              {withSkeletonLoading(
                block?.body.transfer_hashes?.length ? (
                  <ul>
                    {block?.body.transfer_hashes?.map(transferHash => (
                      <li key={transferHash}>
                        <a href={`/deploy/${transferHash}`}>
                          <Hash
                            alwaysTruncate
                            hash={transferHash ?? hashPlaceholder}
                          />
                        </a>
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
      </InfoCard>
    </>
  );
};

const AccountHeading = styled(Heading)`
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const HashWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HashHeading = styled(Heading)<{ isTruncated: boolean }>`
  font-weight: ${fontWeight.medium};
  display: inline;
  margin: 0;
  width: ${({ isTruncated }) => (isTruncated ? '40%' : '75vw')};
  min-width: ${pxToRem(360)};
  overflow-wrap: break-word;
  font-size: ${pxToRem(60)};
  color: #2230f0;
`;

const DetailDataRowWrapper = styled.ul`
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: ${breakpoints.lg}) {
    flex-direction: row;
    gap: ${pxToRem(96)};
  }
`;

const PageHeading = styled.div``;
