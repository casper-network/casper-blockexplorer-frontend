import React from 'react';
import styled from '@emotion/styled';
import { breakpoints } from '../../styled-theme';
import { Button } from '../base';
import { ButtonProps } from '../base/Button/Button';

export const NavButton: React.FC<ButtonProps> = ({
  children,
  type,
  onClick,
  color,
}) => {
  return (
    <NavButtonContainer>
      <ButtonStyles>
        <Button type={type} onClick={onClick} color={color}>
          {children}
        </Button>
      </ButtonStyles>
    </NavButtonContainer>
  );
};

export const NavButtonContainer = styled.div`
  z-index: 30;
`;

export const ButtonStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  margin: 0 auto;
  padding: 0;
  width: 90%;
  border-style: none;

  @media (min-width: ${breakpoints.lg}) {
    display: none;
  }
`;
