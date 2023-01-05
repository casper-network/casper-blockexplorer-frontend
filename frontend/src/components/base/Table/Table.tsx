import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import styled from '@emotion/styled';
import { colors, pxToRem } from 'src/styled-theme';

export interface TableProps<T> {
  readonly header?: React.ReactNode;
  readonly columns: ColumnDef<T>[];
  readonly data: T[];
  readonly footer?: React.ReactNode;
}

export function Table<T extends unknown>({
  columns,
  data,
  header,
  footer,
}: TableProps<T>) {
  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <TableWrapper>
      <HeadContent>{header}</HeadContent>
      <TableContent>
        <TableHead>
          {getHeaderGroups().map(headerGroup => (
            <TableHeadContent key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHeadItem
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ width: header.getSize() }}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: `relative ${
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none mr-4'
                            : ''
                        }`,
                        onClick: header.column.getToggleSortingHandler(),
                      }}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      <span className="absolute right-0 top-1/2">
                        {{
                          asc: '🔼',
                          desc: '🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </span>
                    </div>
                  )}
                </TableHeadItem>
              ))}
            </TableHeadContent>
          ))}
        </TableHead>
        <tbody>
          {getRowModel().rows.map(row => (
            <TableBodyRow key={row.id} className="h-50 hover:bg-light-grey">
              {row.getVisibleCells().map(cell => {
                return (
                  <TableBodyItem
                    key={cell.id}
                    className="text-start px-32 border-0 border-b-1 border-light-grey border-solid"
                    style={{ width: cell.column.getSize() }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableBodyItem>
                );
              })}
            </TableBodyRow>
          ))}
        </tbody>
      </TableContent>
      {footer}
    </TableWrapper>
  );
}

const TableWrapper = styled.div`
  width: 100%;
  margin-bottom: 8rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  max-width: calc(100vw - 5rem);
  background-color: white;
  box-shadow: 0px 2px 7px rgba(127, 128, 149, 0.2);
`;

const HeadContent = styled.div`
  padding: 1rem 2rem;
  width: 100%;
`;

const TableContent = styled.table`
  table-layout: auto;
  width: 100%;
  border-spacing: 0px 0px;
  min-width: ${pxToRem(800)};
  background-color: white;
`;

const TableHead = styled.thead`
  background-color: ${colors.lightGrey};
`;

const TableHeadContent = styled.tr`
  height: 4rem;
`;

const TableHeadItem = styled.th`
  text-align: start;
  padding: 0 2rem;
`;

const TableBodyRow = styled.tr`
  height: ${pxToRem(50)};
  :hover {
    background-color: ${colors.lightGrey};
  }
`;

const TableBodyItem = styled.td`
  text-align: start;
  padding: 0 ${pxToRem(32)};
  border-bottom: ${pxToRem(1)} solid ${colors.lightGrey};
`;
