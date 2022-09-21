import React from 'react';
import { copyToClipboard } from '../../../utils';

interface CopyToClipboardProps {
  readonly textToCopy: string;
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
  textToCopy,
}) => {
  return (
    <div className="tooltip inline-block align-middle">
      <button
        className="border-none bg-transparent "
        type="button"
        onClick={() => copyToClipboard(textToCopy)}>
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
      </button>
      <div className="hidden tooltip-container relative">
        <p className="bg-casper-blue p-10 text-white z-10 rounded-lg absolute  bottom-20 -left-44 xl:left-7  xl:pb-13">
          Copy
        </p>
      </div>
    </div>
  );
};
