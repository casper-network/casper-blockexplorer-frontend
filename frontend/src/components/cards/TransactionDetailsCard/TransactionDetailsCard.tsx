import React from 'react';
import styled from '@emotion/styled';
import {
  DetailDataLabel,
  DetailDataList,
  DetailDataValue,
  DetailDataWrapper,
  Grid,
} from '../../styled';
import { fonts, fontWeight, pxToRem } from '../../../styled-theme';
import { HeadContentWrapper, Heading, InfoCard } from '../../base';
import { Coin } from '../../utility';
import { Deploy, DeployStatus } from '../../../api';
import { FailureIcon, SuccessIcon } from '../../icons';

interface TransactionDetailsCardProps {
  deploy: Deploy;
}

export const TransactionDetailsCard: React.FC<TransactionDetailsCardProps> = ({
  deploy,
}) => {
  const { paymentAmount, cost, amount, readableTimestamp, action, status } =
    deploy;

  const statusIcon =
    status === DeployStatus.Success ? <SuccessIcon /> : <FailureIcon />;

  return (
    <InfoCard>
      <HeadContentWrapper>
        <TransactionHeading type="h2">Transaction Details</TransactionHeading>
      </HeadContentWrapper>
      <DetailDataWrapper>
        <Grid gap="2rem" templateColumns="1fr 1fr">
          <DetailDataList gap="1.5rem">
            {!!amount && (
              <li>
                <Grid gap="1rem" templateColumns="9rem auto">
                  <DetailDataLabel>Amount</DetailDataLabel>
                  <DetailDataValue>
                    <Coin>{amount}</Coin>
                  </DetailDataValue>
                </Grid>
              </li>
            )}
            <li>
              <Grid gap="1rem" templateColumns="9rem 1fr">
                <DetailDataLabel>Cost</DetailDataLabel>
                <DetailDataValue>
                  <Coin>{cost}</Coin>
                </DetailDataValue>
              </Grid>
            </li>
            <li>
              <Grid gap="1rem" templateColumns="9rem 1fr">
                <DetailDataLabel>Payment Amount</DetailDataLabel>
                <DetailDataValue>
                  <Coin>{paymentAmount}</Coin>
                </DetailDataValue>
              </Grid>
            </li>
          </DetailDataList>
          <Grid templateColumns="1fr 1fr" templateRows="1fr 1fr" gap="1rem">
            <div>
              <DetailDataLabel>Timestamp</DetailDataLabel>
              <TransactionDetailData>{readableTimestamp}</TransactionDetailData>
            </div>
            <div>
              <DetailDataLabel>Status</DetailDataLabel>
              <TransactionDetailData>
                {status}
                <StatusIconWrapper>{statusIcon}</StatusIconWrapper>
              </TransactionDetailData>
            </div>
            <ActionTypeWrapper>
              <DetailDataLabel>Action</DetailDataLabel>
              <TransactionDetailData>{action}</TransactionDetailData>
            </ActionTypeWrapper>
          </Grid>
        </Grid>
      </DetailDataWrapper>
    </InfoCard>
  );
};

const TransactionHeading = styled(Heading)`
  font-size: ${pxToRem(18)};
  font-weight: ${fontWeight.medium};
`;

const TransactionDetailData = styled.div`
  font-size: ${pxToRem(26)};
  display: flex;
  gap: 0.75rem;
`;

const ActionTypeWrapper = styled(TransactionDetailData)`
  flex-direction: column;
  grid-column: span 2;
  font-family: ${fonts.jetBrains};

  p {
    font-size: ${pxToRem(24)};
  }
`;

const StatusIconWrapper = styled.span`
  display: block;
  width: 1.875rem;
  position: relative;
  top: 0.3rem;
`;
