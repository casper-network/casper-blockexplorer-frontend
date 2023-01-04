import React from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { colors, fontWeight, pxToRem } from 'src/styled-theme';
import styled from '@emotion/styled';
import {
  fetchMoreBlocks,
  getEarliestLoadedBlock,
  getLatestBlockHeight,
  getLoadingMoreBlocksStatus,
  Loading,
  useAppDispatch,
  useAppSelector,
} from '../../../store';
import { Block } from '../../../api';
import { standardizeNumber, truncateHash } from '../../../utils';
import { CopyToClipboard, Loader, RefreshTimer } from '../../utility';

import { Table } from '../../base';

interface BlockTableProps {
  readonly blocks: Block[];
  readonly showValidators?: boolean;
}

export const BlockTable: React.FC<BlockTableProps> = ({
  blocks,
  showValidators,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const latestBlockHeight = useAppSelector(getLatestBlockHeight);
  const earliestLoadedBlockHeight = useAppSelector(getEarliestLoadedBlock);
  const loadingMoreBlocksStatus = useAppSelector(getLoadingMoreBlocksStatus);

  const headContent = (
    <BlockTableHead>
      <p>
        {standardizeNumber(latestBlockHeight || 0)} {t('total-rows')}
      </p>
      <RefreshTimer />
    </BlockTableHead>
  );

  const isLoadingMoreBlocks = loadingMoreBlocksStatus === Loading.Pending;

  const footContent = (
    <BlockTableFooter>
      <ShowMoreButton
        type="button"
        disabled={isLoadingMoreBlocks}
        onClick={() => {
          if (earliestLoadedBlockHeight) {
            dispatch(fetchMoreBlocks(earliestLoadedBlockHeight));
          }
        }}>
        {isLoadingMoreBlocks ? <Loader size="sm" /> : t('show-more')}
      </ShowMoreButton>
    </BlockTableFooter>
  );

  const blockTableTitles = [
    'block-height',
    'era',
    'deploy',
    'age',
    'block-hash',
  ];
  if (showValidators) {
    blockTableTitles.push('validator');
  }

  const blockTableHeads = blockTableTitles.map(title => {
    return { title: <BlockTableTitle>{t(title)}</BlockTableTitle>, key: title };
  });

  const blockRows = blocks.map(
    ({
      height,
      eraID,
      deployCount,
      timeSince,
      timestamp,
      hash,
      validatorPublicKey,
    }) => {
      const key = `${hash}-${timestamp}`;

      const items = [
        { content: standardizeNumber(height), key: `${key}-hash` },
        { content: eraID, key: `${key}-era` },
        { content: deployCount, key: `${key}-deploys` },
        { content: timeSince, key: `${key}-age` },
        {
          content: (
            <>
              <Link
                to={{
                  pathname: `/block/${hash}`,
                }}>
                {truncateHash(hash)}
              </Link>
              <CopyToClipboard textToCopy={hash} />
            </>
          ),
          key: `${key}-block-hash`,
        },
      ];

      const validatorColumn = {
        content: (
          <>
            <Link
              to={{
                pathname: `/account/${validatorPublicKey}`,
              }}>
              {truncateHash(validatorPublicKey)}
            </Link>
            <CopyToClipboard textToCopy={validatorPublicKey} />
          </>
        ),
        key: `${key}-validator`,
      };

      if (showValidators) {
        items.push(validatorColumn);
      }

      return { items, key };
    },
  );

  return (
    <Table
      headContent={headContent}
      headColumns={blockTableHeads}
      rows={blockRows}
      footContent={footContent}
    />
  );
};
const BlockTableHead = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${colors.grey};
`;

const BlockTableFooter = styled.div`
  display: flex;
  justify-content: space-around;
  padding: ${pxToRem(20)} 2rem;
`;

const ShowMoreButton = styled.button`
  background-color: ${colors.lightGrey};
  color: ${colors.darkRed};
  min-width: ${pxToRem(150)};
  padding: 0.5rem 0;
  width: fit-content;
  border-radius: 0.375rem;
  border: none;
  font-weight: ${fontWeight.medium};

  :hover {
    background-color: ${colors.lightRed};
  }
`;
const BlockTableTitle = styled.p`
  font-weight: ${fontWeight.bold};
`;
