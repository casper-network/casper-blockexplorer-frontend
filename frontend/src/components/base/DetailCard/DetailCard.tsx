import React from 'react';
import { DetailCardProps } from './DetailCard.types';

export const DetailCard: React.FC<DetailCardProps> = ({ rows }) => {
  return (
    <section className="w-full m-0 p-0">
      <div className="w-full bg-white shadow-card rounded-lg px-16 overflow-x-auto max-w-screen-p-incl py-0">
        <table className="w-full">
          <tbody>
            {rows.map(({ detailKey, value, key }, index) => {
              return (
                <tr key={key} data-testid={index + 1}>
                  <td className="h-full w-200 py-16 border-0 border-b-1 border-light-grey border-solid text-slate-500 whitespace-nowrap pr-32 align-top">
                    {detailKey}
                  </td>
                  <td className="h-full w-auto py-16 border-0 border-b-1 flex items-center border-light-grey border-solid">
                    {value}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
