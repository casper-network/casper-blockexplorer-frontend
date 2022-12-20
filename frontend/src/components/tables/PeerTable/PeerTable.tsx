import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from '@tanstack/react-table';
import { Peer } from '../../../api';
import { Table } from '../../base';

interface PeerTableProps {
  readonly peers: Peer[];
}

export const PeerTable: React.FC<PeerTableProps> = ({ peers }) => {
  const { t } = useTranslation();
  const columns = useMemo<ColumnDef<Peer>[]>(
    () => [
      {
        header: `${t('node-id')}`,
        accessorKey: 'id',
        enableSorting: false,
      },
      {
        header: `${t('address')}`,
        accessorKey: 'address',
        enableSorting: false,
      },
    ],
    [t],
  );

  const header = (
    <div className="flex pl-32">
      <p className="text-black font-bold pr-32">{t('currently-online')}</p>
      <p className="text-grey">
        {peers.length} {t('total-rows')}
      </p>
    </div>
  );

  return <Table<Peer> header={header} columns={columns} data={peers} />;
};
