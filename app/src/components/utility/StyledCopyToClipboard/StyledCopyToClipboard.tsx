import React from 'react';
import { CopyToClipboard, defaultTheme } from 'casper-ui-kit';
import { useTheme } from '@emotion/react';

interface StyledCopyToClipboardProps {
  textToCopy: string;
}

export const StyledCopyToClipboard: React.FC<StyledCopyToClipboardProps> = ({
  textToCopy,
}) => {
  const { type: themeType } = useTheme();

  return themeType === 'light' ? (
    <CopyToClipboard
      textToCopy={textToCopy}
      focusColor={defaultTheme.colors.secondary.CasperGreen}
      copyColor={defaultTheme.colors.lowContrastSecondary.CasperLightGrey}
      hoverColor={defaultTheme.colors.primary.CasperRed}
      copiedColor={defaultTheme.colors.secondary.CasperGreen}
    />
  ) : (
    <CopyToClipboard
      textToCopy={textToCopy}
      focusColor={defaultTheme.colors.secondary.CasperGreen}
      hoverColor={defaultTheme.colors.primary.CasperRed}
      copyColor={defaultTheme.colors.secondary.Nero}
      copiedColor={defaultTheme.colors.secondary.CasperGreen}
    />
  );
};
