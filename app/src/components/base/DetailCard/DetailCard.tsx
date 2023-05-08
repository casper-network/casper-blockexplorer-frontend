import React from 'react';
import styled from '@emotion/styled';
import { Card } from 'casper-ui-kit';
import {
  FootContentWrapper,
  HeadContentWrapper,
  InfoCardSection,
} from '../InfoCard';
import { TableLabel, TableValue } from './DetailCard.styled';
import { DetailCardProps } from './DetailCard.types';

export const DetailCard: React.FC<DetailCardProps> = ({
  headContent,
  rows,
  footContent,
}) => {
  return (
    <InfoCardSection>
      {!!headContent && (
        <Card.Header>
          <HeadContentWrapper>{headContent}</HeadContentWrapper>
        </Card.Header>
      )}
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
      {!!footContent && (
        <Card.Footer>
          <FootContentWrapper>{footContent}</FootContentWrapper>
        </Card.Footer>
      )}
    </InfoCardSection>
  );
};

const InfoCardTable = styled.table`
  width: 100%;
`;
