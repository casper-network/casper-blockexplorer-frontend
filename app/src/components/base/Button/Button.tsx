import React from 'react';
import styled from '@emotion/styled';
import { colors, pxToRem } from '../../../styled-theme';

export type ButtonType = 'submit' | 'reset' | 'button';

export interface ButtonProps {
  readonly children: React.ReactNode;
  // readonly onClick?: React.MouseEventHandler<HTMLButtonElement>;
  // readonly onClick?: React.MouseEvent<HTMLElement>;
  // readonly onClick?: (event: MouseEvent) => React.MouseEvent<HTMLElement>;
  // readonly onClick?: (e: React.MouseEvent) => void;
  // readonly onClick?: () => void;
  readonly onClick?: any;
  readonly color?: string;
  readonly type: ButtonType;
  readonly className?: string;
  readonly isDisabled?: boolean;
  readonly id?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  color = 'blue',
  type,
  className,
  isDisabled = false,
  id,
}) => {
  return (
    <StyledButton
      type={type}
      className={className}
      bgColor={color}
      onClick={onClick}
      disabled={isDisabled}
      id={id}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ bgColor: string }>`
  color: ${colors.white};
  background-color: ${({ bgColor }) => bgColor};
  text-align: center;
  padding: ${pxToRem(10)};
  border-radius: ${pxToRem(10)};
  cursor: pointer;
  border: none;
`;
