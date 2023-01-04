import React from 'react';
import styled from '@emotion/styled';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { colors, fontWeight, pxToRem } from 'src/styled-theme';
import { Block } from '../../../api';
import { standardizeNumber, truncateHash } from '../../../utils';
import { CopyToClipboard, RefreshTimer } from '../../utility';
import { Table } from '../../base';

interface LatestBlocksProps {
  readonly blocks: Block[];
  readonly showValidators?: boolean;
}

export const LatestBlocks: React.FC<LatestBlocksProps> = ({
  blocks,
  showValidators,
}) => {
  const { t } = useTranslation();
  const headContent = (
    <LatestBlocksTableHead>
      <p>{t('latest-blocks')}</p>
      <RefreshTimer />
    </LatestBlocksTableHead>
  );

  const footContent = (
    <LatestBlocksTableFooter>
      <FooterContent to="/blocks">{t('view-blocks')}</FooterContent>
    </LatestBlocksTableFooter>
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
    return {
      title: <BlockTableTitle>{t(title)}</BlockTableTitle>,
      key: title,
    };
  });

  const firstTenBlocks = blocks.slice(0, 10);

  const blockRows = firstTenBlocks.map(
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

const LatestBlocksTableHead = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${colors.grey};
  padding: 0 2rem;
`;

const LatestBlocksTableFooter = styled.div`
  display: flex;
  justify-content: space-around;
  color: ${colors.grey};
  padding: ${pxToRem(20)};
`;

const FooterContent = styled(NavLink)`
  background-color: ${colors.lightGrey};
  color: ${colors.darkRed};
  padding: 0.5rem 1rem;
  width: fit-content;
  border-radius: 0.375rem;
  font-weight: ${fontWeight.medium};

  :hover {
    background-color: ${colors.lightRed};
  }
`;

const BlockTableTitle = styled.p`
  font-weight: ${fontWeight.bold};
`;
