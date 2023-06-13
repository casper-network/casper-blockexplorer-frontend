import React from 'react';
import styled from '@emotion/styled';
import { pxToRem } from 'casper-ui-kit';

export type ButtonType = 'submit' | 'reset' | 'button';

export interface ButtonProps {
  readonly children: React.ReactNode;
  readonly onClick?: React.MouseEventHandler<HTMLButtonElement>;
  readonly color?: string;
  readonly type: ButtonType;
  readonly className?: string;
  readonly isDisabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  type,
  children,
  onClick,
  color = 'blue',
  className,
  isDisabled = false,
}) => (
  <StyledButton
    type={type}
    className={className}
    color={color}
    onClick={onClick}
    isDisabled={isDisabled}>
    {children}
  </StyledButton>
);

const StyledButton = styled(Button)<{ color: string }>`
  color: ${props => props.theme.background.primary};
  background-color: ${({ color }) => color};
  text-align: center;
  padding: ${pxToRem(10)};
  border-radius: ${pxToRem(10)};
  cursor: pointer;
  border: none;
`;
