import React from 'react';
import { Link } from 'react-router-dom';
import { Block } from '../../../types';
import { truncateHash } from '../../../utils';
import { CopyToClipboard } from '../../utility';
import { Table } from '../../base';

interface BlockTableProps {
  readonly blocks: Block[];
  readonly showValidators?: boolean;
}

export const BlockTable: React.FC<BlockTableProps> = ({
  blocks,
  showValidators,
}) => {
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
        { content: height, key: `${key}-hash` },
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

  return <Table headColumns={blockTableHeads} rows={blockRows} />;
};
