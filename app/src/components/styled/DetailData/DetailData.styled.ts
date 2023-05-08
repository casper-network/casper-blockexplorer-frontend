import styled from '@emotion/styled';
import { pxToRem, defaultTheme } from 'casper-ui-kit';

export const DetailDataLabel = styled.h3`
  font-weight: ${defaultTheme.typography.fontWeights.normal};
  font-size: 1.25rem;
  color: ${props => props.theme.text.secondary};
`;

export const DetailDataWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

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

export const DetailDataValue = styled.div<{
  height?: number | string;
  isLargeText?: boolean;
}>`
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  font-size: ${({ isLargeText }) => (isLargeText ? pxToRem(40) : '1.25rem')};
  color: ${props => props.theme.text.primary};
  font-weight: ${defaultTheme.typography.fontWeights.normal};
`;
