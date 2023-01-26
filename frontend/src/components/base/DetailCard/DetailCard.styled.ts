import styled from '@emotion/styled';
import { colors } from '../../../styled-theme';

export const TableData = styled.td<{ noDividers?: boolean }>`
  height: 100%;
  width: auto;
  padding: 1rem 0;
  border: none;
  border-bottom: ${({ noDividers }) =>
    noDividers ? 'none' : '1px solid black'};
`;

export const TableLabel = styled(TableData)`
  width: 12.5rem;
  color: ${colors.darkSupporting};
  white-space: nowrap;
  padding-right: 2rem;
  vertical-align: top;
`;

export const TableValue = styled(TableData)`
  display: flex;
  align-items: center;
`;
