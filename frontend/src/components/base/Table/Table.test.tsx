import React from 'react';
import { screen } from '@testing-library/react';

import { createMockBlocks, render } from '../../../test-utils';
import { Table } from './Table';
import { ApiData } from 'src/api/types';

const header = <div>This is the head content</div>;

const footer = <div>This is the foot content</div>;

const data = createMockBlocks(5);

const columns = [
  {
    header: 'Block Height',
    accessorKey: 'height',
  },
  {
    header: 'Era',
    accessorKey: 'eraID',
  },
  {
    header: 'Deploy',
    accessorKey: 'deployCount',
  },
  {
    header: 'Age',
    accessorKey: 'timestamp',
  },
  {
    header: 'Block Hash',
    accessorKey: 'hash',
    minSize: 230,
  },
  {
    header: 'Validator',
    accessorKey: 'validatorPublicKey',
    maxSize: 100,
  },
];

const Template = () => {
  return (
    <Table<ApiData.Block>
      header={header}
      columns={columns}
      data={data}
      footer={footer}
    />
  );
};

describe('Table', () => {
  it('should render 5 table heads when given 5 head columns', () => {
    render(<Template />);

    const fifthTableHead = screen.getByText('Block Hash');

    expect(fifthTableHead).toBeInTheDocument();
  });

  it('should render 5 rows when given 5 rows', () => {
    render(<Template />);

    const fifthRow = screen.getByText(data[4].hash);

    expect(fifthRow).toBeInTheDocument();
  });

  it('should render row column content', () => {
    render(<Template />);

    const thirdRowSecondColumnContent = screen.getByText(data[2].hash);

    expect(thirdRowSecondColumnContent).toBeInTheDocument();
  });

  it('should render foot content when given foot content', () => {
    render(<Template />);

    const footerByText = screen.getByText('This is the foot content');

    expect(footerByText).toBeInTheDocument();
  });

  it('should render head content', () => {
    render(<Template />);

    const headerByText = screen.getByText('This is the head content');

    expect(headerByText).toBeInTheDocument();
  });
});
