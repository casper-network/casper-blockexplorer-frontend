import React from 'react';
import styled from '@emotion/styled';

interface SpacerProps {
  height?: string | number;
  width?: string | number;
}

export const Spacer: React.FC<SpacerProps> = ({ height, width }) => {
  return <StyledSpacer height={height} width={width} />;
};

const StyledSpacer = styled.div<{
  height?: string | number;
  width?: string | number;
}>`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
`;
