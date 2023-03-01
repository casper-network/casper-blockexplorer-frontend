import React from 'react';
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
import styled from '@emotion/styled';
import { colors, fontWeight, pxToRem } from 'src/styled-theme';
import { css } from '@emotion/react';
import { Loader } from 'src/components/utility';
import { loadConfig } from 'src/utils';
import upIcon from '../../../assets/images/up-icon.png';
import downIcon from '../../../assets/images/down-icon.png';

const { defaultPagination } = loadConfig();

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
}: TableProps<T>) {
  const options: TableOptions<T> = {
    data,
    columns,
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
                                  <SortIcon src={upIcon} alt="sort-asc" />
                                </SortIconWrapper>
                              ),
                              desc: (
                                <SortIconWrapper>
                                  <SortIcon src={downIcon} alt="sort-desc" />
                                </SortIconWrapper>
                              ),
                            }[header.column.getIsSorted() as string] ?? null}
                            {canSort && !isSorted && <CanSortWrapper />}
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
        {tableBodyLoading ? (
          <TableBodyLoadingWrapper
            pageSize={currentPageSize ?? defaultPagination}>
            <LoadingPositionWrapper>
              <Loader size="lg" />
            </LoadingPositionWrapper>
          </TableBodyLoadingWrapper>
        ) : (
          <tbody>
            {getRowModel().rows.map(row => (
              <TableBodyRow key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <TableBodyItem
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableBodyItem>
                  );
                })}
              </TableBodyRow>
            ))}
          </tbody>
        )}
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
  background-color: ${colors.white};
  box-shadow: 0px 2px 7px ${colors.boxShadow};
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
  background-color: ${colors.white};
  position: relative;
`;

const TableHead = styled.thead`
  background-color: ${colors.lightSupporting};
`;

const TableHeader = styled.tr`
  height: 4rem;
`;

const Th = styled.th<{ sortable?: boolean }>`
  text-align: start;
  font-weight: ${fontWeight.bold};
  padding: 0 2rem;
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
    background-color: ${colors.lightSupporting};
  }
`;

const TableBodyItem = styled.td`
  text-align: start;
  padding: 0 ${pxToRem(32)};
  border-bottom: ${pxToRem(1)} solid ${colors.lightSupporting};
`;

const TableBodyLoadingWrapper = styled.div<{ pageSize: number }>`
  height: calc(${({ pageSize }) => pageSize} * ${pxToRem(50)});
`;

const LoadingPositionWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 90%;
`;

const SortIconWrapper = styled.div<{ disabled?: boolean }>`
  height: ${pxToRem(27)};
  width: ${pxToRem(27)};
  background-color: #02115f;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${pxToRem(5)};
  margin-right: 0.5rem;

  * {
    color: white;
    z-index: 1;
  }

  :hover {
    cursor: pointer;
  }
`;

const SortIcon = styled.img`
  width: ${pxToRem(12)};
  height: ${pxToRem(12)};
  margin: 0;
`;

const CanSortWrapper = styled.div`
  height: ${pxToRem(27)};
  width: ${pxToRem(27)};
  background-color: #02115f;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${pxToRem(5)};
  margin-right: 0.5rem;
`;
