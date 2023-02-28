import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getPeersTableOptions,
  getTotalPeers,
  setPeerTableOptions,
  updatePeerPageNum,
  useAppSelector,
} from 'src/store';
import styled from '@emotion/styled';
import { ColumnDef } from '@tanstack/react-table';
import { ApiData } from 'src/api/types';
import { colors, fontWeight } from 'src/styled-theme';
import { SelectOptions } from 'src/components/layout/Header/Partials';
import { Table } from '../../base';
import { NumberedPagination } from '../Pagination/NumberedPagination';

interface PeersTableProps {
  readonly peers: ApiData.Peer[];
  isTableLoading: boolean;
  setIsTableLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PeersTable: React.FC<PeersTableProps> = ({
  peers,
  isTableLoading,
  setIsTableLoading,
}) => {
  const { t } = useTranslation();

  const rowCountSelectOptions: SelectOptions[] | null = useMemo(
    () => [
      {
        value: '5',
        label: t('rows', {
          count: 5,
        }),
      },
      {
        value: '10',
        label: t('rows', {
          count: 10,
        }),
      },
      {
        value: '20',
        label: t('rows', {
          count: 20,
        }),
      },
    ],
    [t],
  );

  const peersTableOptions = useAppSelector(getPeersTableOptions);
  const totalPeers = useAppSelector(getTotalPeers);

  const totalPages = useMemo(() => {
    return Math.ceil(totalPeers / peersTableOptions.pagination.pageSize);
  }, [peersTableOptions, totalPeers]);

  const columns = useMemo<ColumnDef<ApiData.Peer>[]>(
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
    ],
    [t],
  );

  const header = (
    <PeerTableHead>
      <HeadLabel>{t('currently-online')}</HeadLabel>
      <NumberedPagination
        tableOptions={peersTableOptions}
        setTableOptions={setPeerTableOptions}
        rowCountSelectOptions={rowCountSelectOptions}
        setIsTableLoading={setIsTableLoading}
        totalPages={totalPages}
        updatePageNum={updatePeerPageNum}
      />
    </PeerTableHead>
  );

  return (
    <Table<ApiData.Peer>
      header={header}
      columns={columns}
      data={peers}
      tableBodyLoading={isTableLoading}
      currentPageSize={peersTableOptions.pagination.pageSize}
    />
  );
};

const PeerTableHead = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeadLabel = styled.p`
  color: ${colors.black};
  font-weight: ${fontWeight.bold};
  padding-right: 2rem;
`;
