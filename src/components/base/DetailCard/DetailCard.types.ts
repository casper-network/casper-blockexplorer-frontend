import React from 'react';

export interface DetailCardRow {
  readonly key: React.Key;
  readonly detailKey: React.ReactNode;
  readonly value: React.ReactNode;
}

export interface DetailCardProps {
  readonly headContent?: React.ReactNode;
  readonly rows: DetailCardRow[];
  readonly footContent?: React.ReactNode;
  readonly noDividers?: boolean;
}
