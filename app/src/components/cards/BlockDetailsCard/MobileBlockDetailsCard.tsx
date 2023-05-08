import styled from '@emotion/styled';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ApiData } from 'src/api/types';
import { pxToRem } from 'casper-ui-kit';
import { hashPlaceholder } from 'src/utils';
import { InfoCard } from '../../base';
import {
  DetailDataLabel,
  DetailDataValue,
  DetailDataWrapper,
  Hash,
} from '../../styled';
import { CopyToClipboard, RawData, withSkeletonLoading } from '../../utility';

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
      </InfoCard>
      <InfoCard>
        <DetailDataWrapper>
          <li>
            <DetailDataLabel>{t('parent-hash')}</DetailDataLabel>
            <DetailDataValue height="2rem">
              <Link
                to={{
                  pathname: `/block/${block?.header.parent_hash ?? ''}`,
                }}
                style={{ color: '#2230f0' }}>
                {withSkeletonLoading(
                  <Hash hash={block?.header.parent_hash ?? hashPlaceholder} />,
                  isLoading,
                  {
                    width: 175,
                  },
                )}
              </Link>
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
                {
                  width: 175,
                },
              )}
            </DetailDataValue>
          </li>
          <li>
            <DetailDataLabel>{t('validator')}</DetailDataLabel>
            <DetailDataValue height="2rem">
              <Link
                to={{
                  pathname: `/account/${block?.body.proposer ?? ''}`,
                }}
                style={{ color: '#2230f0' }}>
                {withSkeletonLoading(
                  <Hash hash={block?.body.proposer ?? hashPlaceholder} />,
                  isLoading,
                  {
                    width: 175,
                  },
                )}
              </Link>
              {!isLoading && (
                <CopyToClipboard textToCopy={block?.body.proposer ?? ''} />
              )}
            </DetailDataValue>
          </li>
        </DetailDataWrapper>
      </InfoCard>
      <InfoCard>
        <DetailDataWrapper>
          <li>
            <DetailDataLabel>{t('deploys')}</DetailDataLabel>
            <DetailDataValue>
              {withSkeletonLoading(
                block?.body.deploy_hashes?.length ? (
                  <ul>
                    {block?.body.deploy_hashes?.map(deployHash => (
                      <li key={deployHash}>
                        <a
                          href={`/deploy/${deployHash}`}
                          style={{ color: '#2230f0' }}>
                          <Hash hash={deployHash} />
                        </a>
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
                        <a
                          href={`/deploy/${transferHash}`}
                          style={{ color: '#2230f0' }}>
                          <Hash hash={transferHash} />
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
          <li>
            <DetailDataLabel>{t('raw-data')}</DetailDataLabel>
            <DetailDataValue>
              <RawData rawData={rawBlock} />
            </DetailDataValue>
          </li>
        </DetailDataWrapper>
      </InfoCard>
    </>
  );
};

const PageHeading = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 1rem;
  font-weight: 800;
  display: inline;
  padding-left: ${pxToRem(15)};
  background: #2230f0;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const DetailDataRowWrapper = styled(DetailDataWrapper)`
  display: flex;
  flex-wrap: wrap;
`;
