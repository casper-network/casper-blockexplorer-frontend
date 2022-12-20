import React from 'react';
import { useTranslation } from 'react-i18next';
import { Peer } from '../../../api';
import { Table } from '../../base';

interface PeerTableProps {
  readonly peers: Peer[];
}

export const PeerTable: React.FC<PeerTableProps> = ({ peers }) => {
  const peerTableTitles = ['node-id', 'address'];
  const { t } = useTranslation();

  const headContent = (
    <div className="flex pl-32">
      <p className="text-black font-bold pr-32">{t('currently-online')}</p>
      <p className="text-grey">
        {peers.length} {t('total-rows')}
      </p>
    </div>
  );

  const peerTableHeads = peerTableTitles.map(title => {
    return { title: <p className="font-bold">{t(title)}</p>, key: title };
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
