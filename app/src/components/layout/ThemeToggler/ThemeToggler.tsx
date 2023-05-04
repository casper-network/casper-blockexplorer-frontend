import styled from '@emotion/styled';
import React from 'react';
import { DarkModeIcon, LightModeIcon } from 'src/components/icons';
import { pxToRem } from 'src/styled-theme';

interface ThemeTogglerProps {
  isLightTheme: boolean;
  setIsLightTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeToggler: React.FC<ThemeTogglerProps> = ({
  isLightTheme,
  setIsLightTheme,
}) => {
  const setThemeToLocalStorage = (isLightTheme: boolean) => {
    localStorage.setItem('isLightMode', JSON.stringify(isLightTheme));

    setIsLightTheme(isLightTheme);
  };

  return (
    <ThemeTogglerWrapper>
      <IconWrapper
        isSelected={isLightTheme}
        onClick={() => setThemeToLocalStorage(true)}>
        <LightModeIcon />
      </IconWrapper>
      <IconWrapper
        isSelected={!isLightTheme}
        onClick={() => setThemeToLocalStorage(false)}>
        <DarkModeIcon />
      </IconWrapper>
    </ThemeTogglerWrapper>
  );
};

const ThemeTogglerWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 2rem;
  display: flex;
  gap: 0.25rem;
`;

const IconWrapper = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ isSelected, theme }) => {
    const selectedBackground = theme.background.secondary;

    return isSelected ? selectedBackground : 'transparent';
  }};
  border-radius: ${pxToRem(5)};
  width: ${pxToRem(51)};
  height: ${pxToRem(38)};
  cursor: pointer;
`;
