import React, { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  fetchPeers,
  getPeerLoadingStatus,
  getPeers,
  getPeersTableOptions,
  getTotalPeers,
  Loading,
  setPeerTableOptions,
  updatePeerPageNum,
  useAppDispatch,
  useAppSelector,
} from 'src/store';
import styled from '@emotion/styled';
import { ColumnDef } from '@tanstack/react-table';
import { ApiData } from 'src/api/types';
import { SelectOptions } from 'src/components/layout/Header/Partials';
import { standardizeNumber } from 'src/utils';
import { pxToRem } from 'casper-ui-kit';
import { Table } from '../../base';
import { NumberedPagination } from '../Pagination/NumberedPagination';

export const PeersTable: React.FC = () => {
  const [isTableLoading, setIsTableLoading] = useState(false);
  const peersTableOptions = useAppSelector(getPeersTableOptions);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const peers = useAppSelector(getPeers);
  const peerLoadingStatus = useAppSelector(getPeerLoadingStatus);

  useEffect(() => {
    dispatch(fetchPeers(peersTableOptions));
  }, [dispatch, peersTableOptions]);

  useEffect(() => {
    if (isTableLoading) {
      setIsTableLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peers]);

  const isPageLoading = peerLoadingStatus !== Loading.Complete || !peers.length;

  const totalPeers = useAppSelector(getTotalPeers);

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

  const totalPages = useMemo(() => {
    return Math.ceil(totalPeers / peersTableOptions.pagination.pageSize);
  }, [peersTableOptions, totalPeers]);

  const columns = useMemo<ColumnDef<ApiData.Peer>[]>(
    () => [
      {
        header: `${t('node-id')}`,
        accessorKey: 'nodeId',
        enableSorting: false,
        size: 250,
      },
      {
        header: `${t('address')}`,
        accessorKey: 'address',
        enableSorting: false,
        size: 250,
      },
    ],
    [t],
  );

  const header = (
    <PeerTableHead>
      <PeertableTitleWrapper>
        <HeadLabel>{t('currently-online')}</HeadLabel>
        <TotalRows>
          {standardizeNumber(totalPeers || 0)} {t('total-rows')}
        </TotalRows>
      </PeertableTitleWrapper>
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

  const footer = useMemo(
    () => (
      <PeersTableFooter>
        <NumberedPagination
          tableOptions={peersTableOptions}
          setTableOptions={setPeerTableOptions}
          rowCountSelectOptions={rowCountSelectOptions}
          setIsTableLoading={setIsTableLoading}
          totalPages={totalPages}
          updatePageNum={updatePeerPageNum}
          removeRowsSelect
        />
      </PeersTableFooter>
    ),
    [peersTableOptions, totalPages, setIsTableLoading, rowCountSelectOptions],
  );

  return (
    <Table<ApiData.Peer>
      header={header}
      columns={columns}
      data={peers}
      footer={footer}
      tableBodyLoading={isTableLoading || isPageLoading}
      currentPageSize={peersTableOptions.pagination.pageSize}
      isLastPage={totalPages === peersTableOptions.pagination.pageNum}
    />
  );
};

const PeerTableHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.text.secondary};
`;

const HeadLabel = styled.p`
  color: ${props => props.theme.text.primary};
  margin-right: 1.5rem;
  white-space: nowrap;
  font-size: clamp(1.45rem, 2vw, 1.75rem);
`;

const TotalRows = styled.p`
  //   border: solid 1px pink;
  margin-right: 1.5rem;
  //   min-width: 8rem;
  white-space: nowrap;
`;

const PeersTableFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: ${pxToRem(20)} 2rem;
`;

const PeertableTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
