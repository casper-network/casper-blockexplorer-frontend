import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Button, pxToRem } from 'casper-ui-kit';
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
    <CopyButton
      type="button"
      disabled={isCopied}
      onClick={copyFn}
      focusBorderColor="transparent">
      {isCopied ? (
        <CopiedIcon data-testid="copied-icon" />
      ) : (
        <CopyIcon data-testid="copy-icon" />
      )}
    </CopyButton>
  );
};

const CopyIcon = styled(CopySVG)`
  fill: ${props => props.theme.text.secondary};
  transition: all;
  width: 1rem;
  height: 1rem;
  margin-left: ${pxToRem(5)};

  :focus {
    color: ${props => props.theme.text.success};
  }
  :hover {
    fill: ${props => props.theme.text.warning};
  }
`;

const CopiedIcon = styled(CopiedSVG)`
  width: 1rem;
  height: 1rem;
  background-color: ${props => props.theme.text.success};
  border-radius: 0.125rem;
  margin-left: ${pxToRem(5)};
`;

const CopyButton = styled(Button)`
  border: none;
  background-color: transparent;
  padding: 0 0.5rem;
`;
