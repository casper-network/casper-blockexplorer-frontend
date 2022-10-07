import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';
import { DetailDataWrapperRow } from '../../styled/DetailData';
import { Block } from '../../../types';
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

  return (
    <InfoCard>
      <HeadContentWrapper>
        <AccountHeading type="h1">Block Details</AccountHeading>

        <HashHeading type="h2">
          <Hash hash={blockHash} alwaysTruncate />
        </HashHeading>
      </HeadContentWrapper>
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
      <DetailDataWrapperRow>
        <li>
          <DetailDataLabel>Raw Data</DetailDataLabel>
          <DetailDataValue>
            <RawData rawData={rawBlock} />
          </DetailDataValue>
        </li>
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
      </DetailDataWrapperRow>
    </InfoCard>
  );
};

const AccountHeading = styled(Heading)`
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const HashHeading = styled(GradientHeading)`
  font-weight: 800;
  display: inline;
`;
