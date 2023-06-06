import React, { useMemo } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  OnChangeFn,
  SortingState,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table';
import Skeleton from 'react-loading-skeleton';
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';
import { DownArrowDark, DownArrowLight } from 'src/components/icons';
import { pxToRem, defaultTheme } from 'casper-ui-kit';

export interface TableProps<T> {
  readonly header?: React.ReactNode;
  readonly columns: ColumnDef<T>[];
  readonly data: T[];
  readonly footer?: React.ReactNode;
  onSortingChange?: OnChangeFn<SortingState>;
  sorting?: SortingState;
  initialSorting?: SortingState;
  tableBodyLoading?: boolean;
  currentPageSize?: number;
  /*
  - used for deeply nested accessor values to allow for skeleton loaders to work
  - parsing tableData will throw error without
  - placeholderData can be anything, it just has to match nested data type
  */
  placeholderData?: { [key: string]: any };
  isLastPage: boolean;
}

export function Table<T extends unknown>({
  columns,
  data,
  header,
  footer,
  onSortingChange,
  sorting,
  initialSorting,
  tableBodyLoading,
  currentPageSize,
  placeholderData,
  isLastPage,
}: TableProps<T>) {
  const { type: themeType } = useTheme();

  const tableData = useMemo(() => {
    if (!data.length || (data.length !== currentPageSize && !isLastPage)) {
      return Array(currentPageSize).fill(placeholderData ?? {}) as T[];
    }

    return data;
  }, [data, currentPageSize, placeholderData, isLastPage]);

  const tableColumns = useMemo(() => {
    return tableBodyLoading
      ? columns.map(column => ({
          ...column,
          cell: () => <Skeleton />,
        }))
      : columns;
  }, [tableBodyLoading, columns]);

  const options: TableOptions<T> = {
    data: tableData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  };

  if (onSortingChange) options.onSortingChange = onSortingChange;
  if (sorting) options.state = { sorting };
  if (initialSorting) options.initialState = { sorting: initialSorting };

  const { getHeaderGroups, getRowModel } = useReactTable(options);

  return (
    <TableWrapper>
      <Header>{header}</Header>
      <StyledTable>
        <TableHead>
          {getHeaderGroups().map(headerGroup => {
            return (
              <TableHeader key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  const isSorted = header.column.getIsSorted();
                  const canSort = header.column.getCanSort();

                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ width: header.getSize() }}
                      sortable={header.column.getCanSort()}
                      onClick={() =>
                        header.column.getCanSort()
                          ? header.column.toggleSorting(
                              header.column.getIsSorted() === 'asc',
                            )
                          : undefined
                      }>
                      {header.isPlaceholder ? null : (
                        <>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          <span>
                            {{
                              asc: (
                                <SortIconWrapper>
                                  {themeType === 'light' ? (
                                    <StyledArrowLight orientation="up" />
                                  ) : (
                                    <StyledArrowDark orientation="up" />
                                  )}
                                </SortIconWrapper>
                              ),
                              desc: (
                                <SortIconWrapper>
                                  {themeType === 'light' ? (
                                    <StyledArrowLight orientation="down" />
                                  ) : (
                                    <StyledArrowDark orientation="down" />
                                  )}
                                </SortIconWrapper>
                              ),
                            }[header.column.getIsSorted() as string] ?? null}
                            {canSort && !isSorted && (
                              <SortIconNeutralWrapper>
                                {themeType === 'light' ? (
                                  <StyledArrowDark orientation="down" />
                                ) : (
                                  <StyledArrowLight orientation="down" />
                                )}
                              </SortIconNeutralWrapper>
                            )}
                          </span>
                        </>
                      )}
                    </Th>
                  );
                })}
              </TableHeader>
            );
          })}
        </TableHead>
        <tbody>
          {getRowModel().rows.map(row => (
            <TableBodyRow key={row.id}>
              {row.getVisibleCells().map(cell => {
                return (
                  <TableBodyItem
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableBodyItem>
                );
              })}
            </TableBodyRow>
          ))}
        </tbody>
      </StyledTable>
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
  margin: 0 auto;
  background-color: ${props => props.theme.background.primary};
  border: 3px solid ${props => props.theme.border};
  box-shadow: 0px 2px 7px ${props => props.theme.boxShadow};
  color: ${props => props.theme.text.primary};
`;

const Header = styled.div`
  padding: 1rem 2rem;
  width: 100%;
`;

const StyledTable = styled.table`
  table-layout: auto;
  width: 100%;
  border-spacing: 0px 0px;
  min-width: ${pxToRem(800)};
  background-color: ${props => props.theme.background.primary};
  position: relative;
`;

const TableHead = styled.thead`
  background-color: ${props => props.theme.background.secondary};
`;

const TableHeader = styled.tr`
  height: 4rem;
`;

const Th = styled.th<{ sortable?: boolean }>`
  text-align: start;
  padding: 0 2rem;
  min-width: 10.25rem;
  font-weight: ${defaultTheme.typography.fontWeights.normal};
  ${({ sortable }) => {
    if (sortable)
      return css`
        position: relative;
        user-select: none;
        cursor: pointer;
        & > span {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      `;
  }}
`;

const TableBodyRow = styled.tr`
  height: ${pxToRem(50)};
  :hover {
    background-color: ${props => props.theme.background.secondary};
  }
`;

const TableBodyItem = styled.td`
  text-align: start;
  padding: 0 2rem;
  border-bottom: ${pxToRem(1)} solid
    ${props => props.theme.background.secondary};
`;

const SortIconWrapper = styled.div<{ disabled?: boolean }>`
  height: ${pxToRem(27)};
  width: ${pxToRem(27)};
  background-color: ${props => props.theme.button};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;

  * {
    color: ${props => props.theme.background.primary};
    z-index: 1;
  }

  :hover {
    cursor: pointer;
  }
`;

const SortIconNeutralWrapper = styled.div<{ disabled?: boolean }>`
  height: ${pxToRem(27)};
  width: ${pxToRem(27)};
  background-color: ${props => props.theme.background.secondary};
  border: 1px solid ${props => props.theme.background.hover};
  border-radius: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;

  * {
    color: ${props => props.theme.background.primary};
    z-index: 1;
  }

  :hover {
    cursor: pointer;
  }
`;

const StyledArrowDark = styled(DownArrowDark)<{ orientation: 'up' | 'down' }>`
  transform: ${({ orientation }) =>
    orientation === 'up' ? 'rotate(180deg)' : undefined};
`;

const StyledArrowLight = styled(DownArrowLight)<{ orientation: 'up' | 'down' }>`
  transform: ${({ orientation }) =>
    orientation === 'up' ? 'rotate(180deg)' : undefined};
`;
