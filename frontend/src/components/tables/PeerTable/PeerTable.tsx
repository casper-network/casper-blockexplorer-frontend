import React from 'react';
import { Peer } from '../../../types';
import { Table } from '../../base';

interface PeerTableProps {
  readonly peers: Peer[];
}

export const PeerTable: React.FC<PeerTableProps> = ({ peers }) => {
  const peerTableTitles = ['Node Id', 'Address'];

  const headContent = (
    <div className="flex pl-32">
      <p className="text-black font-bold pr-32">Currently Online</p>
      <p className="text-grey">{peers.length} total rows</p>
    </div>
  );

  const peerTableHeads = peerTableTitles.map(title => {
    return { title: <p className="font-bold">{title}</p>, key: title };
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
