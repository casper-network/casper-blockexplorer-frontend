import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';

import { Block } from '../../../types';
import { HeadContentWrapper, InfoCard } from '../../base';
import {
  DetailDataLabel,
  DetailDataWrapperRow,
  DetailDataValue,
  DetailDataWrapper,
  GradientHeading,
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

  return (
    <>
      <HeadContentWrapper>
        <HashHeading type="h2">
          <Hash hash={blockHash} alwaysTruncate />
        </HashHeading>
      </HeadContentWrapper>
      <InfoCard>
        <DetailDataWrapperRow>
          <li>
            <DetailDataLabel>Block Height</DetailDataLabel>
            <DetailDataValue>{blockHeight}</DetailDataValue>
          </li>
          <li>
            <DetailDataLabel>Current Era</DetailDataLabel>
            <DetailDataValue>{era}</DetailDataValue>
          </li>
          <li>
            <DetailDataLabel>Timestamp</DetailDataLabel>
            <DetailDataValue>{readableTimestamp}</DetailDataValue>
          </li>
        </DetailDataWrapperRow>
      </InfoCard>
      <InfoCard>
        <DetailDataWrapper>
          <li>
            <DetailDataLabel>Parent Hash</DetailDataLabel>
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
            <DetailDataLabel>Block Hash</DetailDataLabel>
            <DetailDataValue>
              <Hash hash={blockHash} />
              <CopyToClipboard textToCopy={blockHash} />
            </DetailDataValue>
          </li>
          <li>
            <DetailDataLabel>State Root Hash</DetailDataLabel>
            <DetailDataValue>
              {stateRootHash ? <Hash hash={stateRootHash} /> : ''}
            </DetailDataValue>
          </li>
          <li>
            <DetailDataLabel>Validator</DetailDataLabel>
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
            <DetailDataLabel>Deploys</DetailDataLabel>
            <DetailDataValue>
              {deployHashes?.length ? (
                <ul>
                  {deployHashes?.map(deployHash => (
                    <a key={deployHash} href={`/deploy/${deployHash}`}>
                      <li>
                        <Hash hash={deployHash} />
                      </li>
                    </a>
                  ))}
                </ul>
              ) : (
                'No deploys'
              )}
            </DetailDataValue>
          </li>
          <li>
            <DetailDataLabel>Transfers</DetailDataLabel>
            <DetailDataValue>
              {transferHashes?.length ? (
                <ul>
                  {transferHashes?.map(transferHash => (
                    <a key={transferHash} href={`/deploy/${transferHash}`}>
                      <li>
                        <Hash hash={transferHash} />
                      </li>
                    </a>
                  ))}
                </ul>
              ) : (
                'No transfers'
              )}
            </DetailDataValue>
          </li>
          <li>
            <DetailDataLabel>Raw Data</DetailDataLabel>
            <DetailDataValue>
              <RawData rawData={rawBlock} />
            </DetailDataValue>
          </li>
        </DetailDataWrapper>
      </InfoCard>
    </>
  );
};

const HashHeading = styled(GradientHeading)`
  font-weight: 800;
  display: inline;
`;
