import React from 'react';
import styled from '@emotion/styled';
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
      <InfoCardTable>
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
      </InfoCardTable>
      {!!footContent && <FootContentWrapper>{footContent}</FootContentWrapper>}
    </InfoCard>
  );
};

const InfoCardTable = styled.table`
  width: 100%;
`;
