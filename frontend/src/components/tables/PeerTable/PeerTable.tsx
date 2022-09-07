import React from 'react';
import { Peer } from '../../../types';
import { Table } from '../../base';

interface PeerTableProps {
  readonly peers: Peer[];
}

export const PeerTable: React.FC<PeerTableProps> = ({ peers }) => {
  const peerTableTitles = ['Node Id', 'Address'];

  const peerTableHeads = peerTableTitles.map(title => {
    return { title: <p className="font-bold">{title}</p>, key: title };
  });

  const peerRows = peers.map(({ id, address }) => {
    const key = id;
    const items = [
      { content: id, key: id },
      { content: address, key: id },
    ];

    return { items, key };
  });

  return <Table headColumns={peerTableHeads} rows={peerRows} />;
};
