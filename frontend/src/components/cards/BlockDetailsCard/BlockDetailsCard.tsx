import styled from '@emotion/styled';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { HashButton } from 'src/components/buttons';
import { fontWeight, pxToRem } from 'src/styled-theme';
import { Block } from '../../../api';
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
  block: Block;
}

export const BlockDetailsCard: React.FC<BlockDetailsCardProps> = ({
  block,
}) => {
  const {
    hash: blockHash,
    readableTimestamp,
    height: blockHeight,
    eraID: era,
    parentHash,
    stateRootHash,
    validatorPublicKey,
    transferHashes,
    deployHashes,
    rawBlock,
  } = block;
  const [isTruncated, setIsTruncated] = useState<boolean>(true);
  const { t } = useTranslation();

  return (
    <InfoCard>
      <HeadContentWrapper>
        <AccountHeading type="h1">{t('block-details')}</AccountHeading>
        <HashWrapper>
          <HashHeading type="h2" isTruncated={isTruncated}>
            {isTruncated ? (
              <Hash hash={blockHash} alwaysTruncate />
            ) : (
              <Hash hash={blockHash} />
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
          <DetailDataValue>{blockHeight}</DetailDataValue>
        </li>
        <li>
          <DetailDataLabel>{t('current-era')}</DetailDataLabel>
          <DetailDataValue>{era}</DetailDataValue>
        </li>
        <li>
          <DetailDataLabel>{t('timestamp')}</DetailDataLabel>
          <DetailDataValue>{readableTimestamp}</DetailDataValue>
        </li>
      </DetailDataRowWrapper>
      <DetailDataWrapper>
        <li>
          <DetailDataLabel>{t('parent-hash')}</DetailDataLabel>
          <DetailDataValue>
            <Link
              to={{
                pathname: `/block/${parentHash}`,
              }}>
              <Hash hash={parentHash} />
            </Link>
            <CopyToClipboard textToCopy={parentHash} />
          </DetailDataValue>
        </li>
        <li>
          <DetailDataLabel>{t('block-hash')}</DetailDataLabel>
          <DetailDataValue>
            <Hash hash={blockHash} />
            <CopyToClipboard textToCopy={blockHash} />
          </DetailDataValue>
        </li>
        <li>
          <DetailDataLabel>{t('state-root-hash')}</DetailDataLabel>
          <DetailDataValue>
            {stateRootHash ? <Hash hash={stateRootHash} /> : ''}
          </DetailDataValue>
        </li>
        <li>
          <DetailDataLabel>{t('validator')}</DetailDataLabel>
          <DetailDataValue>
            <Link
              to={{
                pathname: `/account/${validatorPublicKey}`,
              }}>
              <Hash hash={validatorPublicKey} />
            </Link>
            <CopyToClipboard textToCopy={validatorPublicKey} />
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
            {deployHashes?.length ? (
              <ul>
                {deployHashes?.map(deployHash => (
                  <li key={deployHash}>
                    <a href={`/deploy/${deployHash}`}>
                      <Hash alwaysTruncate hash={deployHash} />
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
            {transferHashes?.length ? (
              <ul>
                {transferHashes?.map(transferHash => (
                  <li key={transferHash}>
                    <a href={`/deploy/${transferHash}`}>
                      <Hash alwaysTruncate hash={transferHash} />
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
