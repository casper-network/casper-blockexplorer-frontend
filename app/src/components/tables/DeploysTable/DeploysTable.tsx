import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ApiData } from 'src/api/types';
import { Table } from 'src/components/base';
import {
  Loading,
  fetchDeploys,
  getDeploys,
  getDeploysLoadingStatus,
  useAppDispatch,
  useAppSelector,
} from 'src/store';

export const DeploysTable: React.FC = () => {
  const { t } = useTranslation();

  const [isTableLoading, setIsTableLoading] = useState(false);

  const dispatch = useAppDispatch();

  const deploys = useAppSelector(getDeploys);
  const deploysLoadingStatus = useAppSelector(getDeploysLoadingStatus);

  console.log({ deploys });

  const isLoadingPage =
    deploysLoadingStatus !== Loading.Complete && !deploys.length;

  useEffect(() => {
    dispatch(fetchDeploys());
  }, [dispatch]);

  const header = useMemo(() => <div>header placeholder</div>, []);
  const footer = useMemo(() => <div>footer placeholder</div>, []);

  const columns = useMemo<ColumnDef<ApiData.SidecarDeploy>[]>(
    () => [
      {
        header: `${t('deploy-hash')}`,
        id: 'deploy_hash',
        accessorKey: 'deploy_hash',
        cell: ({ getValue }) => getValue<string>(),
        enableSorting: false,
      },
      {
        header: `${t('block-hash')}`,
        id: 'block_hash',
        accessorKey: 'deploy_processed.block_hash',
        cell: ({ getValue }) => getValue<string>(),
        enableSorting: false,
      },
    ],
    [],
  );

  return (
    <Table
      header={header}
      columns={columns}
      data={deploys}
      footer={footer}
      tableBodyLoading={isTableLoading}
      isLastPage={false}
    />
  );
};
