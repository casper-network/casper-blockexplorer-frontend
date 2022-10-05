import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';
import { Block } from '../../../types';
import { DetailCard, HeadContentWrapper, Heading, InfoCard } from '../../base';
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

  const rows = [
    {
      key: `parentHash-${blockHash}`,
      detailKey: 'Parent Hash',
      value: (
        <>
          <Link
            to={{
              pathname: `/block/${parentHash}`,
            }}>
            <Hash hash={parentHash} />
          </Link>
          <CopyToClipboard textToCopy={parentHash} />
        </>
      ),
    },
    {
      key: `timestamp-${blockHash}`,
      detailKey: 'Timestamp',
      value: readableTimestamp,
    },
    {
      key: `blockHash-${blockHash}`,
      detailKey: 'Block Hash',
      value: (
        <>
          <Hash hash={blockHash} />
          <CopyToClipboard textToCopy={blockHash} />
        </>
      ),
    },
    {
      key: `blockHeight-${blockHash}`,
      detailKey: 'Block Height',
      value: blockHeight,
    },
    { key: `era-${blockHash}`, detailKey: 'Era', value: era },
    {
      key: `stateRootHash-${blockHash}`,
      detailKey: 'State Root Hash',
      value: stateRootHash ? <Hash hash={stateRootHash} /> : '',
    },
    {
      key: `validator-${blockHash}`,
      detailKey: 'Validator',
      value: (
        <>
          <Link
            to={{
              pathname: `/account/${validatorPublicKey}`,
            }}>
            <Hash hash={validatorPublicKey} />
          </Link>
          <CopyToClipboard textToCopy={validatorPublicKey} />
        </>
      ),
    },
    {
      key: `transfers-${blockHash}`,
      detailKey: 'Transfers',
      value: transferHashes?.length ? (
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
      ),
    },
    {
      key: `deploys-${blockHash}`,
      detailKey: 'Deploys',
      value: deployHashes?.length ? (
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
      ),
    },
    {
      key: 'raw-json',
      detailKey: 'Raw Deploy',
      value: <RawData rawData={rawBlock} />,
    },
  ];

  return (
    <InfoCard>
      <HeadContentWrapper>
        <AccountHeading type="h1">Block Details</AccountHeading>

        <HashHeading type="h2">
          <Hash hash={blockHash} alwaysTruncate />
        </HashHeading>
      </HeadContentWrapper>
      <DetailDataWrapper>
        <li>
          <DetailDataLabel>Parent Hash</DetailDataLabel>
          <DetailDataValue>
            <Hash hash={parentHash} />
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
          <DetailDataValue>{stateRootHash}</DetailDataValue>
        </li>
        <li>
          <DetailDataLabel>Validator</DetailDataLabel>
          <DetailDataValue>{validatorPublicKey}</DetailDataValue>
        </li>
      </DetailDataWrapper>
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
