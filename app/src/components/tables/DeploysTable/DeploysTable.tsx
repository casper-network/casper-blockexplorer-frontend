import styled from '@emotion/styled';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ApiData } from 'src/api/types';
import { Table } from 'src/components/base';
import { StyledCopyToClipboard } from 'src/components/utility';
import {
  Loading,
  fetchDeploys,
  getDeploys,
  getDeploysLoadingStatus,
  useAppDispatch,
  useAppSelector,
} from 'src/store';
import { truncateHash } from 'src/utils';

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

  useEffect(() => {
    if (isTableLoading || isLoadingPage) {
      setIsTableLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deploys]);

  const header = useMemo(() => <div>header placeholder</div>, []);
  const footer = useMemo(() => <div>footer placeholder</div>, []);

  const columns = useMemo<ColumnDef<ApiData.SidecarDeploy>[]>(
    () => [
      {
        header: `${t('deploy-hash')}`,
        id: 'deploy_hash',
        accessorKey: 'deploy_hash',
        cell: ({ getValue }) => (
          <HashAndCopyToClipboardWrapper>
            <StyledHashLink
              to={{
                pathname: `/deploy/${getValue<string>()}`,
              }}>
              {truncateHash(getValue<string>())}
            </StyledHashLink>
            <StyledCopyToClipboard textToCopy={getValue<string>()} />
          </HashAndCopyToClipboardWrapper>
        ),
        enableSorting: false,
      },
      {
        header: `${t('block-hash')}`,
        id: 'block_hash',
        accessorKey: 'deploy_processed.block_hash',
        cell: ({ getValue }) => (
          <HashAndCopyToClipboardWrapper>
            <StyledHashLink
              to={{
                pathname: `/block/${getValue<string>()}`,
              }}>
              {truncateHash(getValue<string>())}
            </StyledHashLink>
            <StyledCopyToClipboard textToCopy={getValue<string>()} />
          </HashAndCopyToClipboardWrapper>
        ),
        enableSorting: false,
      },
      {
        header: `${t('public-key')}`,
        id: 'public_key',
        accessorKey: 'deploy_processed.account',
        cell: ({ getValue }) => (
          <HashAndCopyToClipboardWrapper>
            <StyledHashLink
              to={{
                pathname: `/account/${getValue<string>()}`,
              }}>
              {truncateHash(getValue<string>())}
            </StyledHashLink>
            <StyledCopyToClipboard textToCopy={getValue<string>()} />
          </HashAndCopyToClipboardWrapper>
        ),
        enableSorting: false,
      },
    ],
    [t],
  );

  return (
    <Table<ApiData.SidecarDeploy>
      header={header}
      columns={columns}
      data={deploys}
      footer={footer}
      tableBodyLoading={isTableLoading || isLoadingPage}
      isLastPage={false}
      currentPageSize={10}
      placeholderData={{}}
    />
  );
};

const HashAndCopyToClipboardWrapper = styled.div`
  white-space: nowrap;
`;

const StyledHashLink = styled(Link)`
  color: ${props => props.theme.text.hash};
`;
