import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { colors, pxToRem } from 'src/styled-theme';
import { ReactComponent as CopiedSVG } from '../../icons/copied-icon.svg';
import { ReactComponent as CopySVG } from '../../icons/copy-icon.svg';
import { copyToClipboard } from '../../../utils';

interface CopyToClipboardProps {
  readonly textToCopy: string;
}
export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
  textToCopy,
}) => {
  const [isCopied, setCopied] = useState(false);
  const copyFn = () => {
    setCopied(true);
    copyToClipboard(textToCopy);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isCopied) {
      timeoutId = setTimeout(() => setCopied(false), 3000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isCopied]);

  return (
    <CopyButton type="button" disabled={isCopied} onClick={copyFn}>
      {isCopied ? (
        <CopiedIcon data-testid="copied-icon" />
      ) : (
        <CopyIcon data-testid="copy-icon" />
      )}
    </CopyButton>
  );
};

const CopyIcon = styled(CopySVG)`
  fill: ${colors.darkSupporting};
  transition: all;
  width: 1rem;
  height: 1rem;
  margin-left: ${pxToRem(5)};

  :focus {
    color: ${colors.success};
  }
  :hover {
    fill: ${colors.mediumWarning};
  }
`;

const CopiedIcon = styled(CopiedSVG)`
  width: 1rem;
  height: 1rem;
  background-color: ${colors.success};
  border-radius: 0.125rem;
  margin-left: ${pxToRem(5)};
`;

const CopyButton = styled.button`
  border: none;
  background-color: transparent;
`;
