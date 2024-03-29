import React, { useState } from 'react';
import { CopyToClipboard, defaultTheme } from 'casper-ui-kit';
import { useTheme } from '@emotion/react';

interface StyledCopyToClipboardProps {
  readonly textToCopy: string;
}

export const StyledCopyToClipboard: React.FC<StyledCopyToClipboardProps> = ({
  textToCopy,
}) => {
  const { type: themeType } = useTheme();
  const [isCopied, setIsCopied] = useState(false);
  return themeType === 'light' ? (
    <CopyToClipboard
      isCopied={isCopied}
      setIsCopied={setIsCopied}
      textToCopy={textToCopy}
      focusColor={defaultTheme.colors.secondary.CasperGreen}
      copyColor={defaultTheme.colors.secondary.Grey84}
      hoverColor={defaultTheme.colors.primary.CasperRed}
      copiedColor={defaultTheme.colors.secondary.CasperGreen}
    />
  ) : (
    <CopyToClipboard
      isCopied={isCopied}
      setIsCopied={setIsCopied}
      textToCopy={textToCopy}
      focusColor={defaultTheme.colors.secondary.CasperGreen}
      hoverColor={defaultTheme.colors.primary.CasperRed}
      copyColor={defaultTheme.colors.secondary.Grey84}
      copiedColor={defaultTheme.colors.secondary.CasperGreen}
    />
  );
};
