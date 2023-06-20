import styled from '@emotion/styled';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ApiData } from 'src/api/types';
import { Table } from 'src/components/base';
import { StyledCopyToClipboard } from 'src/components/utility';
import { DEFAULT_SECONDARY_FONT_FAMILIES } from 'src/constants';
import {
  Loading,
  fetchDeploys,
  getDeploys,
  getDeploysLoadingStatus,
  useAppDispatch,
  useAppSelector,
} from 'src/store';
import { formatTimeAgo, standardizeNumber, truncateHash } from 'src/utils';

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

  // TODO: add sizes
  const columns = useMemo<ColumnDef<ApiData.ProcessedSidecarDeploy>[]>(
    () => [
      {
        header: `${t('deploy-hash')}`,
        id: 'deployHash',
        accessorKey: 'deployHash',
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
        id: 'blockHash',
        accessorKey: 'blockHash',
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
        id: 'publicKey',
        accessorKey: 'publicKey',
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
      {
        header: `${t('age')}`,
        accessorKey: 'timestamp',
        cell: ({ getValue }) => (
          <Age>{formatTimeAgo(new Date(getValue<number>()))}</Age>
        ),
        enableSorting: false,
        // minSize: 200,
      },
      {
        header: `${t('contract')}`,
        accessorKey: 'contractType',
        cell: ({ getValue }) => getValue<string>(),
        enableSorting: false,
      },
      {
        header: `${t('amount')}`,
        accessorKey: 'amountMotes',
        cell: ({ getValue }) => (
          <CSPRText>
            {standardizeNumber((getValue<number>() / 10 ** 9).toFixed(0))}{' '}
            {t('cspr')}
          </CSPRText>
        ),
        enableSorting: false,
        minSize: 200,
      },
      {
        header: `${t('cost')}`,
        accessorKey: 'costMotes',
        cell: ({ getValue }) => (
          <CSPRText>
            {standardizeNumber((getValue<number>() / 10 ** 9).toFixed(0))}{' '}
            {t('cspr')}
          </CSPRText>
        ),
        enableSorting: false,
        minSize: 200,
      },
    ],
    [t],
  );

  return (
    <Table<ApiData.ProcessedSidecarDeploy>
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

const Age = styled.div`
  white-space: nowrap;
`;

const CSPRText = styled.span`
  font-family: ${DEFAULT_SECONDARY_FONT_FAMILIES};
`;
