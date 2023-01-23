import React from 'react';
import styled from '@emotion/styled';

import { useAppWidth } from 'src/hooks';
import { colors, pxToRem } from 'src/styled-theme';
import { t } from 'i18next';
import { Button } from '../base';

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
  const { isMobile } = useAppWidth();

  const toggleHashView = () => {
    setIsTruncated(() => !isTruncated);
  };

  const buttonPosition = isTruncated ? `${pxToRem(12)}` : `${pxToRem(24)}`;

  return (
    <StyledHashButton
      isAvatar={isAvatar}
      type="button"
      onClick={toggleHashView}
      isMobile={isMobile}
      buttonPosition={buttonPosition}
      heading={heading}>
      {isTruncated ? `${t('expand')}` : `${t('collapse')}`}
    </StyledHashButton>
  );
};

const StyledHashButton = styled(Button)<{
  isMobile: boolean;
  isAvatar: boolean | undefined;
  buttonPosition: string;
  heading: string | undefined;
}>`
  display: ${({ isMobile, isAvatar, heading }) =>
    (isMobile && isAvatar) || (isMobile && heading === 'deploy')
      ? 'none'
      : 'block'};
  color: ${colors.greyBlue};
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
    transition: ease-in-out, font-weight, color, 400ms;
    font-weight: 700;
    background: linear-gradient(
      95.02deg,
      ${colors.gradient1} 0.62%,
      ${colors.gradient2} 48.99%,
      ${colors.gradient3} 70.51%,
      ${colors.gradient4} 70.85%,
      ${colors.gradient5} 116.85%
    );
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
    background-color: transparent;

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
