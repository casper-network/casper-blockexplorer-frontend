import React from 'react';
import { TableProps } from './Table.types';

export const Table: React.FC<TableProps> = ({ headColumns, rows }) => {
  const totalRows = rows.length;

  return (
    <div className="w-full mb-32 shadow-card rounded-lg overflow-x-auto bg-white">
      <div className="w-full py-12">
        <p className="text-grey pl-32">{totalRows} total rows</p>
      </div>
      <table className="table-auto w-full border-spacing-0 min-w-800 bg-white">
        <thead className="bg-light-grey">
          <tr className="h-40 ">
            {headColumns.map(({ title, key }) => {
              return <th key={key}>{title}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ items, key }) => {
            return (
              <tr key={key} className="h-50 hover:bg-light-grey">
                {items.map(({ content, key: itemKey }) => {
                  return (
                    <td
                      className="text-center border-0 border-b-1 border-light-grey border-solid "
                      key={itemKey}>
                      {content}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
