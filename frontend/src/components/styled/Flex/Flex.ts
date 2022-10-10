import styled from '@emotion/styled';

interface FlexProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  gap?: string;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction ?? 'row'};
  gap: ${({ gap }) => gap ?? '0px'};
`;
