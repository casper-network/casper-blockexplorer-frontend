import styled from '@emotion/styled';

export const DetailDataLabel = styled.h3`
  font-weight: 400;
  font-size: 0.625rem;
  color: #64748b;
`;

export const DetailDataWrapper = styled.div``;

interface DetailDataListProps {
  width?: string;
  gap?: string;
}

export const DetailDataList = styled.ul<DetailDataListProps>`
  display: grid;
  gap: ${({ gap }) => gap ?? '2.5rem'};
  width: ${({ width }) => width ?? 'inherit'};
  height: fit-content;
`;

export const DetailDataValue = styled.div`
  font-size: 1.25rem;
  color: black;
  font-weight: 500;
`;
