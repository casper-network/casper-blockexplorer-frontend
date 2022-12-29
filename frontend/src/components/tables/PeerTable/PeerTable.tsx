import React from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { colors, fontWeight } from 'src/styled-theme';
import { Peer } from '../../../api';
import { Table } from '../../base';

interface PeerTableProps {
  readonly peers: Peer[];
}

export const PeerTable: React.FC<PeerTableProps> = ({ peers }) => {
  const peerTableTitles = ['node-id', 'address'];
  const { t } = useTranslation();

  const headContent = (
    <PeerTableHead>
      <HeadLabel>{t('currently-online')}</HeadLabel>
      <HeadValue>
        {peers.length} {t('total-rows')}
      </HeadValue>
    </PeerTableHead>
  );

  const peerTableHeads = peerTableTitles.map(title => {
    return {
      title: <PeerTableTitle>{t(title)}</PeerTableTitle>,
      key: title,
    };
  });

  const peerRows = peers.map(({ id, address }) => {
    const key = id;
    const items = [
      { content: id, key: `id-${id}` },
      { content: address, key: `address-${id}` },
    ];

    return { items, key };
  });

  return (
    <Table
      headContent={headContent}
      headColumns={peerTableHeads}
      rows={peerRows}
    />
  );
};

const PeerTableTitle = styled.p`
  font-weight: ${fontWeight.bold};
`;

const PeerTableHead = styled.div`
  display: flex;
  padding-left: 2rem;
`;

const HeadLabel = styled.p`
  color: black;
  font-weight: ${fontWeight.bold};
  padding-right: 2rem;
`;

const HeadValue = styled.p`
  color: ${colors.grey};
`;
