import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { ColumnDef } from '@tanstack/react-table';
import { colors, fontWeight } from 'src/styled-theme';
import { Peer } from '../../../api';
import { Table } from '../../base';
import { truncateHash } from '../../../utils';

interface PeerTableProps {
  readonly peers: Peer[];
}

export const PeerTable: React.FC<PeerTableProps> = ({ peers }) => {
  const { t } = useTranslation();
  const columns = useMemo<ColumnDef<Peer>[]>(
    () => [
      {
        header: `${t('node-id')}`,
        accessorKey: 'nodeId',
        enableSorting: false,
      },
      {
        header: `${t('address')}`,
        accessorKey: 'address',
        enableSorting: false,
      },
      {
        header: `${t('uptime')}`,
        accessorKey: 'uptime',
        enableSorting: false,
      },
      {
        header: `${t('last-block-hash')}`,
        accessorKey: 'lastAddedBlockHash',
        enableSorting: false,
        cell: ({ getValue }) => (
          <div className="flex flex-row items-center">
            <Link
              to={{
                pathname: `/block/${getValue<string>()}`,
              }}>
              {truncateHash(getValue<string>())}
            </Link>
          </div>
        ),
      },
      {
        header: `${t('isAlive')}`,
        accessorKey: 'isAlive',
        enableSorting: false,
        cell: ({ getValue }) => (
          <div className="flex flex-row items-center">
            {getValue<boolean>() ? t('up') : t('down')}
          </div>
        ),
      },
    ],
    [t],
  );

  const header = (
    <PeerTableHead>
      <HeadLabel>{t('currently-online')}</HeadLabel>
      <HeadValue>
        {peers.length} {t('total-rows')}
      </HeadValue>
    </PeerTableHead>
  );

  return <Table<Peer> header={header} columns={columns} data={peers} />;
};

const PeerTableHead = styled.div`
  display: flex;
`;

const HeadLabel = styled.p`
  color: black;
  font-weight: ${fontWeight.bold};
  padding-right: 2rem;
`;

const HeadValue = styled.p`
  color: ${colors.grey};
`;
