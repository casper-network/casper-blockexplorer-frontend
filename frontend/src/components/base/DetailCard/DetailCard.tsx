import React from 'react';
import { DetailCardProps } from './DetailCard.types';

export const DetailCard: React.FC<DetailCardProps> = ({ rows }) => {
  return (
    <section className="w-full m-0 p-0">
      <div className="w-full bg-white shadow-card rounded-lg px-16 pb-0 overflow-x-auto">
        <table className="w-full">
          <tbody>
            {rows.map(({ detailKey, value, key }) => {
              return (
                <tr key={key}>
                  <td className="h-full py-16 border-0 border-b-1 border-light-grey border-solid text-slate-500 whitespace-nowrap pr-32">
                    {detailKey}
                  </td>
                  <td className="h-full py-16 border-0 border-b-1 flex items-center border-light-grey border-solid">
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
