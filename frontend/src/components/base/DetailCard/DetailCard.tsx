import React from 'react';
import { InfoCard, FootContentWrapper, HeadContentWrapper } from '../InfoCard';
import { TableLabel, TableValue } from './DetailCard.styled';
import { DetailCardProps } from './DetailCard.types';

export const DetailCard: React.FC<DetailCardProps> = ({
  headContent,
  rows,
  footContent,
}) => {
  return (
    <InfoCard>
      {!!headContent && <HeadContentWrapper>{headContent}</HeadContentWrapper>}
      <table className="w-full">
        <tbody>
          {rows.map(({ detailKey, value, key }, index) => {
            return (
              <tr key={key} data-testid={index + 1}>
                <TableLabel noDividers>{detailKey}</TableLabel>
                <TableValue noDividers>{value}</TableValue>
              </tr>
            );
          })}
        </tbody>
      </table>
      {!!footContent && <FootContentWrapper>{footContent}</FootContentWrapper>}
    </InfoCard>
  );
};
