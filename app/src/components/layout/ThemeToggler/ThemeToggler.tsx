import styled from '@emotion/styled';
import React from 'react';
import { DarkModeIcon, LightModeIcon } from 'src/components/icons';

interface ThemeTogglerProps {
  isLightTheme: boolean;
}

export const ThemeToggler: React.FC<ThemeTogglerProps> = ({ isLightTheme }) => {
  return (
    <ThemeTogglerWrapper>
      <StyledLightModeIcon isSelected={isLightTheme} />
      <StyledDarkModeIcon isSelected={isLightTheme} />
    </ThemeTogglerWrapper>
  );
};

const ThemeTogglerWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
`;

const StyledLightModeIcon = styled(LightModeIcon)<{ isSelected: boolean }>``;

const StyledDarkModeIcon = styled(DarkModeIcon)<{ isSelected: boolean }>``;
