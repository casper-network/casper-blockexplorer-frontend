import styled from '@emotion/styled';

interface GridProps {
  gap?: string;
  templateColumns?: string;
  templateRows?: string;
  placeContent?: string;
  placeItems?: string;
}

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-gap: ${({ gap }) => gap ?? 'initial'};
  grid-template-columns: ${({ templateColumns }) =>
    templateColumns ?? 'initial'};
  grid-template-rows: ${({ templateRows }) => templateRows ?? 'initial'};
`;
