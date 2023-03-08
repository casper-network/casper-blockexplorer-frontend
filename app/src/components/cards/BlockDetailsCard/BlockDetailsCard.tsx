import styled from '@emotion/styled';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton, { SkeletonStyleProps } from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { ApiData } from 'src/api/types';
import { HashButton } from 'src/components/buttons';
import { fontWeight, pxToRem } from 'src/styled-theme';
import { HeadContentWrapper, Heading, InfoCard } from '../../base';
import {
  DetailDataLabel,
  DetailDataValue,
  DetailDataWrapper,
  GradientHeading,
  Hash,
} from '../../styled';
import { CopyToClipboard, RawData } from '../../utility';

export interface BlockDetailsCardProps {
  block: ApiData.Block | null;
  isLoading: boolean;
}

export const BlockDetailsCard: React.FC<BlockDetailsCardProps> = ({
  block,
  isLoading,
}) => {
  console.log({ isLoading });

  const [isTruncated, setIsTruncated] = useState(true);
  const { t } = useTranslation();

  // if (!block) return null;

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

  const withSkeletonLoading = (
    child: React.ReactNode,
    isLoading: boolean,
    skeletonStyleOverride?: SkeletonStyleProps,
  ) => {
    if (isLoading) {
      return <Skeleton {...skeletonStyleOverride} />;
    }

    return child;
  };

  return (
    <InfoCard>
      <HeadContentWrapper>
        <AccountHeading type="h1">{t('block-details')}</AccountHeading>
        <HashWrapper>
          <HashHeading type="h2" isTruncated={isTruncated}>
            {isTruncated ? (
              <Hash hash={block?.hash ?? '*'.repeat(64)} alwaysTruncate />
            ) : (
              <Hash hash={block?.hash ?? '*'.repeat(64)} />
            )}
          </HashHeading>
          <HashButton
            isTruncated={isTruncated}
            setIsTruncated={setIsTruncated}
            isAvatar={false}
          />
        </HashWrapper>
      </HeadContentWrapper>
      <DetailDataRowWrapper>
        <li>
          <DetailDataLabel>{t('block-height')}</DetailDataLabel>
          <DetailDataValue>
            {withSkeletonLoading(block?.header.height, isLoading)}
          </DetailDataValue>
        </li>
        <li>
          <DetailDataLabel>{t('current-era')}</DetailDataLabel>
          <DetailDataValue>{block?.header.era_id}</DetailDataValue>
        </li>
        <li>
          <DetailDataLabel>{t('timestamp')}</DetailDataLabel>
          <DetailDataValue>
            {block?.header.timestamp.toLocaleString()}
          </DetailDataValue>
        </li>
      </DetailDataRowWrapper>
      <DetailDataWrapper>
        <li>
          <DetailDataLabel>{t('parent-hash')}</DetailDataLabel>
          <DetailDataValue>
            <Link
              to={{
                pathname: `/block/${
                  block?.header.parent_hash ?? '*'.repeat(64)
                }`,
              }}>
              <Hash hash={block?.header.parent_hash ?? '*'.repeat(64)} />
            </Link>
            <CopyToClipboard
              textToCopy={block?.header.parent_hash ?? '*'.repeat(64)}
            />
          </DetailDataValue>
        </li>
        <li>
          <DetailDataLabel>{t('block-hash')}</DetailDataLabel>
          <DetailDataValue>
            <Hash hash={block?.hash ?? '*'.repeat(64)} />
            <CopyToClipboard textToCopy={block?.hash ?? '*'.repeat(64)} />
          </DetailDataValue>
        </li>
        <li>
          <DetailDataLabel>{t('state-root-hash')}</DetailDataLabel>
          <DetailDataValue>
            {block?.header.state_root_hash ? (
              <Hash hash={block.header.state_root_hash} />
            ) : (
              ''
            )}
          </DetailDataValue>
        </li>
        <li>
          <DetailDataLabel>{t('validator')}</DetailDataLabel>
          <DetailDataValue>
            <Link
              to={{
                pathname: `/account/${block?.body.proposer ?? '*'.repeat(64)}`,
              }}>
              <Hash hash={block?.body.proposer ?? '*'.repeat(64)} />
            </Link>
            <CopyToClipboard
              textToCopy={block?.body.proposer ?? '*'.repeat(64)}
            />
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
            {block?.body.deploy_hashes?.length ? (
              <ul>
                {block?.body.deploy_hashes?.map(deployHash => (
                  <li key={deployHash}>
                    <a href={`/deploy/${deployHash}`}>
                      <Hash
                        alwaysTruncate
                        hash={deployHash ?? '*'.repeat(64)}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              t('no-deploys')
            )}
          </DetailDataValue>
        </li>
        <li>
          <DetailDataLabel>{t('transfers')}</DetailDataLabel>
          <DetailDataValue>
            {block?.body.transfer_hashes?.length ? (
              <ul>
                {block?.body.transfer_hashes?.map(transferHash => (
                  <li key={transferHash}>
                    <a href={`/deploy/${transferHash}`}>
                      <Hash
                        alwaysTruncate
                        hash={transferHash ?? '*'.repeat(64)}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              t('no-transfers')
            )}
          </DetailDataValue>
        </li>
      </DetailDataRowWrapper>
    </InfoCard>
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

const HashHeading = styled(GradientHeading)<{ isTruncated: boolean }>`
  font-weight: ${fontWeight.extraBold};
  display: inline;
  margin: 0;
  width: ${({ isTruncated }) => (isTruncated ? '10%' : '100%')};
  min-width: ${pxToRem(360)};
  overflow-wrap: break-word;
`;

const DetailDataRowWrapper = styled(DetailDataWrapper)`
  grid-template-columns: 0.75fr 0.75fr 3fr;
  margin: 2.5rem 0;
`;
