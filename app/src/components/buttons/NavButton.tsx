import React from 'react';
import styled from '@emotion/styled';
import { Button, defaultTheme } from 'casper-ui-kit';
import { ButtonProps } from '../base/Button/Button';

export const NavButton: React.FC<ButtonProps> = ({
  children,
  type,
  onClick,
  color,
}) => {
  return (
    <ButtonStyles>
      <Button type={type} onClick={onClick} color={color} bgColor="">
        {children}
      </Button>
    </ButtonStyles>
  );
};

export const ButtonStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  margin: 0 auto;
  width: 90%;
  border-style: none;
  z-index: 20;

  @media (min-width: ${defaultTheme.typography.breakpoints.lg}) {
    display: none;
  }

  button {
    padding: 0;
  }
`;
