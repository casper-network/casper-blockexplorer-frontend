import React from 'react';
import styled from '@emotion/styled';
import { ButtonProps, defaultTheme } from 'casper-ui-kit';
import { UiKitButton } from '../base';

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

export const StyledButton = styled(UiKitButton)`
  background-color: transparent;
  z-index: 20;
  padding: 0;

  @media (min-width: ${defaultTheme.typography.breakpoints.lg}) {
    display: none;
  }
`;
