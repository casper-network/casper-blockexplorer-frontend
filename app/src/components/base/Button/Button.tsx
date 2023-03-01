import React from 'react';
import styled from '@emotion/styled';
import { pxToRem } from '../../../styled-theme';

export type ButtonType = 'submit' | 'reset' | 'button';

export interface ButtonProps {
  readonly children: React.ReactNode;

  readonly onClick?: any;

  readonly color?: string;
  readonly type: ButtonType;
  readonly className?: string;
  readonly isDisabled?: boolean;
  readonly id?: string;
}

export const Button: React.FC<ButtonProps> = ({
  type,
  children,
  onClick,
  color = 'blue',
  className,
  isDisabled = false,
  id,
}) => {
  return (
    <StyledButton
      type={type}
      className={className}
      color={color}
      onClick={onClick}
      disabled={isDisabled}
      id={id}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ color: string }>`
  color: white;
  background-color: ${({ color }) => color};
  text-align: center;
  padding: ${pxToRem(10)};
  border-radius: ${pxToRem(10)};
  cursor: pointer;
  border: none;
`;
