import styled from '@emotion/styled';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ApiData } from 'src/api/types';
import { colors, pxToRem } from 'src/styled-theme';
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

  // const {
  //   hash: blockHash,
  //   header: {
  //     height: blockHeight,
  //     timestamp: readableTimestamp,
  //     era_id: era,
  //     parent_hash: parentHash,
  //     state_root_hash: stateRootHash,
  //   },
  //   body: {
  //     proposer: validatorPublicKey,
  //     transfer_hashes: transferHashes,
  //     deploy_hashes: deployHashes,
  //   },
  // } = block;

  const rawBlock = JSON.stringify(block);

  return (
    <>
      <PageHeading>
        {withSkeletonLoading(
          <Hash hash={block?.hash ?? hashPlaceholder} alwaysTruncate />,
          isLoading,
          {},
        )}
      </PageHeading>

      <InfoCard>
        <DetailDataRowWrapper>
          <li>
            <DetailDataLabel>{t('block-height')}</DetailDataLabel>
            <DetailDataValue>
              {withSkeletonLoading(block?.header.height, isLoading, {})}
            </DetailDataValue>
          </li>
          <li>
            <DetailDataLabel>{t('current-era')}</DetailDataLabel>
            <DetailDataValue>
              {withSkeletonLoading(block?.header.era_id, isLoading, {})}
            </DetailDataValue>
          </li>
          <li>
            <DetailDataLabel>{t('timestamp')}</DetailDataLabel>
            <DetailDataValue>
              {withSkeletonLoading(
                block?.header.timestamp.toLocaleString(),
                isLoading,
                {},
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
                }}>
                {withSkeletonLoading(
                  <Hash hash={block?.header.parent_hash ?? hashPlaceholder} />,
                  isLoading,
                  {},
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
                {},
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
                {},
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
                  {},
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
                        <a href={`/deploy/${deployHash}`}>
                          <Hash hash={deployHash} />
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  'No deploys'
                ),
                isLoading,
                {},
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
                          <Hash hash={transferHash} />
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  t('no-transfers')
                ),
                isLoading,
                {},
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
  background: linear-gradient(
    93.67deg,
    ${colors.gradient1} 1.63%,
    ${colors.gradient2} 64.2%,
    ${colors.gradient3} 92.03%,
    ${colors.gradient4} 92.49%,
    ${colors.gradient5} 151.99%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const DetailDataRowWrapper = styled(DetailDataWrapper)`
  display: flex;
  flex-wrap: wrap;
`;
