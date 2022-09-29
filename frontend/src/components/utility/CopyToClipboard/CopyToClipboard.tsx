import React, { useState, useEffect } from 'react';
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

  const copiedIcon = (
    <svg
      data-testid="copied-icon"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 25 24"
      strokeWidth="2"
      stroke="white"
      className="w-17 h-17 bg-green rounded-sm ml-5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );

  const copyIcon = (
    <svg
      data-testid="copy-icon"
      width="17"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-slate-500 hover:fill-casper-red focus:text-green-400 transition-all w-17 h-17 ml-5">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.5 2.5L13.5 2.5L13.5 9.5L6.5 9.5L6.5 2.5ZM5 4V1L15 1L15 11H12V14L2 14L2 4L5 4ZM5 5.5H3.5L3.5 12.5L10.5 12.5V11L5 11L5 5.5Z"
      />
    </svg>
  );

  return (
    <button
      className="border-none bg-transparent"
      type="button"
      disabled={isCopied}
      onClick={copyFn}>
      {isCopied ? copiedIcon : copyIcon}
    </button>
  );
};
