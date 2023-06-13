import React from 'react';
import styled from '@emotion/styled';
import { defaultTheme } from 'casper-ui-kit';
import { UiKitButton, UiKitButtonProps } from '../base/UiKitButton/UiKitButton';

export const NavButton: React.FC<UiKitButtonProps> = ({
  children,
  type,
  onClick,
}) => {
  return (
    <StyledButton>
      <UiKitButton type={type} onClick={onClick} bgColor="transparent">
        {children}
      </UiKitButton>
    </StyledButton>
  );
};

export const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 90%;
  z-index: 20;

  @media (min-width: ${defaultTheme.typography.breakpoints.lg}) {
    display: none;
  }

  button {
    padding: 0;
  }
`;
