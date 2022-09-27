import React from 'react';

export interface TableHeadColumn {
  readonly title: React.ReactNode;
  readonly key: React.Key;
}

export interface TableRowItem {
  readonly content: React.ReactNode;
  readonly key: React.Key;
}

export interface TableRow {
  readonly items: TableRowItem[];
  readonly key: React.Key;
}

export interface TableProps {
  readonly headContent: React.ReactNode;
  readonly headColumns: TableHeadColumn[];
  readonly rows: TableRow[];
  readonly footContent?: React.ReactNode;
}
