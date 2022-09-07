import React from 'react';

export interface DetailCardRow {
  readonly key: React.Key;
  readonly detailKey: React.ReactNode;
  readonly value: React.ReactNode;
}

export interface DetailCardProps {
  readonly rows: DetailCardRow[];
}
