import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

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
    <div className="w-full mb-32 shadow-card rounded-lg overflow-x-auto max-w-screen-p-incl bg-white">
      <div className="w-full py-12">{header}</div>
      <table className="table-auto w-full border-spacing-0 min-w-800 bg-white">
        <thead className="bg-light-grey">
          {getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="h-40">
              {headerGroup.headers.map(header => (
                <th
                  className="text-start px-32"
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
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {getRowModel().rows.map(row => (
            <tr key={row.id} className="h-50 hover:bg-light-grey">
              {row.getVisibleCells().map(cell => {
                return (
                  <td
                    key={cell.id}
                    className="text-start px-32 border-0 border-b-1 border-light-grey border-solid"
                    style={{ width: cell.column.getSize() }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {footer}
    </div>
  );
}
