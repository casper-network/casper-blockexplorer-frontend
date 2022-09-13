import React from 'react';
import { DetailCardProps } from './DetailCard.types';

export const DetailCard: React.FC<DetailCardProps> = ({ rows }) => {
  return (
    <section className="w-full m-0 p-0">
      <div className="w-full bg-[#FFF] shadow-card rounded-lg pb-0 overflow-x-auto">
        <table className="w-full">
          <tbody>
            {rows.map(({ detailKey, value, key }) => {
              return (
                <div className="hover:bg-light-grey rounded-lg ">
                  <tr key={key}>
                    <td className="h-full py-16 border-0 border-b-1 border-light-grey border-solid text-slate-500 whitespace-nowrap pr-32 px-16">
                      {detailKey}
                    </td>
                    <td className="h-full py-16 border-0 border-b-1 flex items-center border-light-grey border-solid">
                      {value}
                    </td>
                  </tr>
                </div>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
