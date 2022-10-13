import React from 'react';
import { Link, NavLink } from 'react-router-dom';
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
  const headContent = (
    <div className="flex justify-between text-grey px-32">
      <p>Latest Blocks</p>
      <RefreshTimer />
    </div>
  );

  const footContent = (
    <div className="flex justify-around text-grey p-20">
      <NavLink
        to="/blocks"
        className="bg-light-grey hover:bg-light-red text-dark-red px-16 py-8 text-14 w-fit rounded-md font-medium">
        View Blocks
      </NavLink>
    </div>
  );

  const blockTableTitles = [
    'Block Height',
    'Era',
    'Deploy',
    'Age',
    'Block Hash',
  ];
  if (showValidators) {
    blockTableTitles.push('Validator');
  }

  const blockTableHeads = blockTableTitles.map(title => {
    return { title: <p className="font-bold">{title}</p>, key: title };
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
