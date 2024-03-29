import React from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { Icon, Card, pxToRem, defaultTheme } from 'casper-ui-kit';
import {
  DetailDataLabel,
  DetailDataList,
  DetailDataValue,
  DetailDataWrapper,
  Grid,
  HeadContentWrapper,
  HideOnDesktop,
  HideOnMobile,
  InfoCardContentWrapper,
} from '../../styled';
import { fonts } from '../../../styled-theme';
import { Heading } from '../../base';
import { Coin, withSkeletonLoading } from '../../utility';
import { Deploy, DeployStatus } from '../../../api';

interface TransactionDetailsCardProps {
  readonly deploy: Deploy | null;
  readonly isLoading: boolean;
}

export const TransactionDetailsCard: React.FC<TransactionDetailsCardProps> = ({
  deploy,
  isLoading,
}) => {
  const { t } = useTranslation();

  const statusIcon =
    deploy?.status === DeployStatus.Success ? (
      <Icon icon="SuccessIcon" height={30} />
    ) : (
      <Icon icon="FailureIcon" height={16} />
    );

  return (
    <InfoCardContentWrapper>
      <Card.Body>
        <HeadContentWrapper>
          <TransactionHeading type="h2">
            {t('transaction-details')}
          </TransactionHeading>
        </HeadContentWrapper>
        <DetailDataWrapper>
          <TransactionGrid gap="2rem">
            <DetailDataList gap="2rem">
              {!!deploy?.amount && (
                <li>
                  <Grid gap="1rem" templateColumns="9rem auto">
                    <DetailDataLabel>{t('amount')}</DetailDataLabel>
                    <DetailDataValue data-testid="deploy-amount">
                      <Coin>{deploy?.amount}</Coin>
                    </DetailDataValue>
                  </Grid>
                </li>
              )}
              <li>
                <Grid gap="1rem" templateColumns="9rem 1fr">
                  <DetailDataLabel>{t('cost')}</DetailDataLabel>
                  <DetailDataValue data-testid="deploy-cost">
                    {withSkeletonLoading(
                      <Coin>{deploy?.cost ?? ''}</Coin>,
                      isLoading,
                      {},
                    )}
                  </DetailDataValue>
                </Grid>
              </li>
              <li>
                <Grid gap="1rem" templateColumns="9rem 1fr">
                  <DetailDataLabel>{t('payment-amount')}</DetailDataLabel>
                  <DetailDataValue data-testid="deploy-payment-amount">
                    {withSkeletonLoading(
                      <Coin>{deploy?.paymentAmount ?? ''}</Coin>,
                      isLoading,
                      {},
                    )}
                  </DetailDataValue>
                </Grid>
              </li>
            </DetailDataList>
            <Grid templateColumns="1fr 1fr" templateRows="1fr" gap="2rem 1rem">
              <div>
                <DetailDataLabel>{t('timestamp')}</DetailDataLabel>
                <TransactionDetailData data-testid="readable-time-stamp">
                  {withSkeletonLoading(
                    deploy?.readableTimestamp,
                    isLoading,
                    {},
                  )}
                </TransactionDetailData>
              </div>
              <HideOnMobile>
                <div>
                  <DetailDataLabel>{t('status')}</DetailDataLabel>
                  <DeployStatusData data-testid="status">
                    {withSkeletonLoading(
                      <>
                        {deploy?.status}
                        <StatusIconWrapper>{statusIcon}</StatusIconWrapper>
                      </>,
                      isLoading,
                      {},
                    )}
                  </DeployStatusData>
                </div>
              </HideOnMobile>
              <HideOnDesktop>
                <SpanTwoCols>
                  <DetailDataLabel>{t('status')}</DetailDataLabel>
                  <DeployStatusData>
                    {withSkeletonLoading(
                      <>
                        {deploy?.status}
                        <StatusIconWrapper>{statusIcon}</StatusIconWrapper>
                      </>,
                      isLoading,
                      { width: 100 },
                    )}
                  </DeployStatusData>
                </SpanTwoCols>
              </HideOnDesktop>
              <ActionAndDeployTypeWrapper>
                <DetailDataLabel>{t('action')}</DetailDataLabel>
                <TransactionDetailData data-testid="action">
                  {withSkeletonLoading(deploy?.action, isLoading, {})}
                </TransactionDetailData>
              </ActionAndDeployTypeWrapper>
              {!!deploy?.deployType && (
                <ActionAndDeployTypeWrapper>
                  <DetailDataLabel>{t('deploy-type')}</DetailDataLabel>
                  <TransactionDetailData data-testid="deploy-type">
                    {deploy?.deployType}
                  </TransactionDetailData>
                </ActionAndDeployTypeWrapper>
              )}
            </Grid>
          </TransactionGrid>
        </DetailDataWrapper>
      </Card.Body>
    </InfoCardContentWrapper>
  );
};

const TransactionGrid = styled(Grid)`
  grid-template-columns: 1fr;

  @media only screen and (min-width: ${defaultTheme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const TransactionHeading = styled(Heading)`
  font-size: ${pxToRem(18)};
  font-weight: ${defaultTheme.typography.fontWeights.medium};
  color: ${props => props.theme.text.primary};
`;

const TransactionDetailData = styled.div`
  font-size: ${pxToRem(26)};
  color: ${props => props.theme.text.primary};
`;

const DeployStatusData = styled(TransactionDetailData)`
  display: flex;
  gap: 0.75rem;
`;

const SpanTwoCols = styled(TransactionDetailData)`
  grid-column: span 2;
`;

const ActionAndDeployTypeWrapper = styled(SpanTwoCols)`
  flex-direction: column;
  font-family: ${fonts.secondaryFont};

  div {
    font-size: ${pxToRem(24)};
  }
`;

const StatusIconWrapper = styled.span`
  display: block;
  width: 1.875rem;
  position: relative;
  top: 0.3rem;
`;
