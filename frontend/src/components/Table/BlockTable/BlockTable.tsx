import React from 'react';
import { Link } from 'react-router-dom';
import { Block } from '../../../types';
import { truncateHash } from '../../../utils';
import { CopyToClipboard } from '../../utility';
import { Table } from '../Table';

interface BlockTableProps {
  readonly blocks: Block[];
}

export const BlockTable: React.FC<BlockTableProps> = ({ blocks }) => {
  const blockTableTitles = [
    'Block Height',
    'Era',
    'Deploys',
    'Age',
    'Block Hash',
    'Validator',
  ];

  const blockTableHeads = blockTableTitles.map(title => {
    return { title: <p className="font-bold">{title}</p>, key: title };
  });

  const blockRows = blocks.map(
    ({ height, eraID, transactions, timestamp, hash, validatorPublicKey }) => {
      const key = `${hash}-${timestamp}`;
      const items = [
        { content: height, key: `${key}-hash` },
        { content: eraID, key: `${key}-era` },
        { content: transactions, key: `${key}-deploys` },
        { content: timestamp, key: `${key}-age` },
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
        {
          content: (
            <>
              <Link
                to={{
                  pathname: `/validator/${validatorPublicKey}`,
                }}>
                {truncateHash(validatorPublicKey)}
              </Link>
              <CopyToClipboard textToCopy={validatorPublicKey} />
            </>
          ),
          key: `${key}-validator`,
        },
      ];

      return { items, key };
    },
  );

  return <Table headColumns={blockTableHeads} rows={blockRows} />;
};
