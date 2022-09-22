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
    if (isCopied) {
      setTimeout(() => setCopied(false), 5000);
    }
  }, [isCopied]);

  const copiedTextAndStyles = (
    <div className="relative">
      <span className="absolute bg-casper-red p-10 text-white text-xs rounded-lg -bottom-50 -left-50 xl:-bottom-19 xl:left-5 xl:pb-13">
        Copied
      </span>
    </div>
  );

  return (
    <button
      className="border-none bg-transparent"
      type="button"
      disabled={isCopied}
      onClick={copyFn}>
      {isCopied ? (
        copiedTextAndStyles
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-slate-500 hover:fill-casper-red focus:text-green-400 transition-all">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.5 2.5L13.5 2.5L13.5 9.5L6.5 9.5L6.5 2.5ZM5 4V1L15 1L15 11H12V14L2 14L2 4L5 4ZM5 5.5H3.5L3.5 12.5L10.5 12.5V11L5 11L5 5.5Z"
          />
        </svg>
      )}
    </button>
  );
};
