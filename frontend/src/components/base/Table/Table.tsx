import React from 'react';
import styled from '@emotion/styled';
import { colors, pxToRem } from 'src/styled-theme';
import { TableProps } from './Table.types';

export const Table: React.FC<TableProps> = ({
  headColumns,
  rows,
  headContent,
  footContent,
}) => {
  return (
    <TableWrapper>
      <HeadContent>{headContent}</HeadContent>
      <TableContent>
        <TableHead>
          <TableHeadContent>
            {headColumns.map(({ title, key }, index) => {
              return (
                <TableHeadItem key={key} data-testid={`head-${index + 1}`}>
                  {title}
                </TableHeadItem>
              );
            })}
          </TableHeadContent>
        </TableHead>
        <tbody>
          {rows.map(({ items, key }, rowIndex) => {
            return (
              <TableBodyRow key={key} data-testid={`row-${rowIndex + 1}`}>
                {items.map(({ content, key: itemKey }, rowColIndex) => {
                  return (
                    <TableBodyItem
                      key={itemKey}
                      data-testid={`rowCol-${rowColIndex + 1}`}>
                      {content}
                    </TableBodyItem>
                  );
                })}
              </TableBodyRow>
            );
          })}
        </tbody>
      </TableContent>
      {footContent && footContent}
    </TableWrapper>
  );
};

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
