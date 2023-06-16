import React from 'react';
import styled from '@emotion/styled';
import { Button, ButtonProps, defaultTheme } from 'casper-ui-kit';

export const NavButton: React.FC<ButtonProps> = ({
  children,
  type,
  onClick,
}) => {
  return (
    <StyledButton type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export const StyledButton = styled(Button)`
  background-color: transparent;
  z-index: 20;
  padding: 0;

  @media (min-width: ${defaultTheme.typography.breakpoints.lg}) {
    display: none;
  }
`;
