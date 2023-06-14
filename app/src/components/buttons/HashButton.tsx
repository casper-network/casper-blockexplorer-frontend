import React from 'react';
import styled from '@emotion/styled';

import { t } from 'i18next';
import { Button, defaultTheme, pxToRem } from 'casper-ui-kit';

export interface HashButtonProps {
  isTruncated: boolean;
  setIsTruncated: React.Dispatch<React.SetStateAction<boolean>>;
  isAvatar?: boolean;
  heading?: string;
}

export const HashButton: React.FC<HashButtonProps> = ({
  isTruncated,
  setIsTruncated,
  isAvatar,
  heading,
}) => {
  const toggleHashView = () => {
    setIsTruncated(() => !isTruncated);
  };

  const buttonPosition = isTruncated ? `${pxToRem(12)}` : `${pxToRem(24)}`;

  return (
    <StyledHashButton
      isAvatar={isAvatar}
      type="button"
      onClick={toggleHashView}
      buttonPosition={buttonPosition}
      heading={heading}>
      {isTruncated ? `${t('expand')}` : `${t('collapse')}`}
    </StyledHashButton>
  );
};

const StyledHashButton = styled(Button)<{
  isAvatar?: boolean;
  buttonPosition: string;
  heading?: string;
}>`
  display: none;
  color: ${props => props.theme.text.secondary};
  font-weight: 400;
  background-color: transparent;
  border-style: none;
  padding: 0 ${pxToRem(5)};
  width: fit-content;
  position: relative;
  bottom: ${({ isAvatar, buttonPosition }) =>
    isAvatar ? buttonPosition : '0'};
  margin-left: ${({ isAvatar }) =>
    isAvatar ? `${pxToRem(65)}` : `${pxToRem(-5)}`};
  margin-bottom: ${({ isAvatar }) => (isAvatar ? '2rem' : '0')};

  @media (min-width: ${defaultTheme.typography.breakpoints.lg}) {
    display: block;
  }

  :active,
  :hover {
    color: ${props => props.theme.text.hover};
  }
`;
