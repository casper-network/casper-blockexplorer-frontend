import React from 'react';
import styled from '@emotion/styled';

import { pxToRem, defaultTheme } from 'casper-ui-kit';

import { t } from 'i18next';
import { UiKitButton } from '../base/UiKitButton';

export interface HashButtonProps {
  isTruncated: boolean;
  setIsTruncated: React.Dispatch<React.SetStateAction<boolean>>;
  isAvatar?: boolean | undefined;
  heading?: string | undefined;
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
      bgColor=""
      data-cy="hash-expand-contract-button"
      isAvatar={isAvatar}
      type="button"
      onClick={toggleHashView}
      buttonPosition={buttonPosition}
      heading={heading}>
      {isTruncated ? `${t('expand')}` : `${t('collapse')}`}
    </StyledHashButton>
  );
};

const StyledHashButton = styled(UiKitButton)<{
  isAvatar: boolean | undefined;
  buttonPosition: string;
  heading: string | undefined;
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

  /* Safari Version 15.4 (11-15 up to Monterey)*/
  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) and (stroke-color: transparent) {
      padding: 0 0.5rem;
      position: relative;
      right: ${pxToRem(4)};
    }
  }

  :active,
  :hover {
    transition: ease-in-out, color, 400ms;
    color: ${props => props.theme.text.hover};
    transition: ease-in-out, color, 400ms;

    /* Safari Version 15.4 (11-15 up to Monterey)*/
    @media not all and (min-resolution: 0.001dpcm) {
      @supports (-webkit-appearance: none) and (stroke-color: transparent) {
        background: #02115f;
        -webkit-text-fill-color: white;
        font-weight: 500;
        padding: 0 0.5rem;
      }
    }
  }
`;
