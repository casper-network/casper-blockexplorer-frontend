import styled from '@emotion/styled';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { pxToRem } from 'src/styled-theme';

import { Block } from '../../../api';
import { InfoCard } from '../../base';
import {
  DetailDataLabel,
  DetailDataValue,
  DetailDataWrapper,
  Hash,
} from '../../styled';
import { CopyToClipboard, RawData } from '../../utility';

export interface MobileBlockDetailsCardProps {
  block: Block;
}

export const MobileBlockDetailsCard: React.FC<MobileBlockDetailsCardProps> = ({
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

  const { t } = useTranslation();

  return (
    <>
      <PageHeading>
        <Hash hash={blockHash} alwaysTruncate />
      </PageHeading>

      <InfoCard>
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
      </InfoCard>
      <InfoCard>
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
      </InfoCard>
      <InfoCard>
        <DetailDataWrapper>
          <li>
            <DetailDataLabel>{t('deploys')}</DetailDataLabel>
            <DetailDataValue>
              {deployHashes?.length ? (
                <ul>
                  {deployHashes?.map(deployHash => (
                    <li key={deployHash}>
                      <a href={`/deploy/${deployHash}`}>
                        <Hash hash={deployHash} />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                'No deploys'
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
                        <Hash hash={transferHash} />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                t('no-transfers')
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
  font-size: 2.75rem;
  margin-bottom: 1rem;
  font-weight: 800;
  display: inline;
  padding-left: ${pxToRem(15)};
  background: linear-gradient(
    93.67deg,
    #1c1e90 1.63%,
    #693590 64.2%,
    #d81d54 92.03%,
    #d81e54 92.49%,
    #fd6b52 151.99%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const DetailDataRowWrapper = styled(DetailDataWrapper)`
  display: flex;
  flex-wrap: wrap;
`;
