import styled from '@emotion/styled';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { standardizeNumber } from '../../../utils';
import { fonts } from '../../../styled-theme';

interface CoinProps {
  children: string;
}

export const Coin: React.FC<CoinProps> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <CoinWrapper>
      {standardizeNumber(children)} {t('motes')}
    </CoinWrapper>
  );
};

const CoinWrapper = styled.p`
  font-family: ${fonts.jetBrains};
`;
