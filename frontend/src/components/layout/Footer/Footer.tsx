import styled from '@emotion/styled';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { colors, fontWeight } from '../../../styled-theme';
import { useAppSelector, getNetworkStatus } from '../../../store';

export const Footer: React.FC = () => {
  const { api, build } = useAppSelector(getNetworkStatus);
  const { t } = useTranslation();

  return (
    <FooterWrapper>
      <p>
        {t('casper-node-version')} {build}
      </p>
      <p>
        {t('api-version')} {api}
      </p>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  color: ${colors.primary};
  font-size: clamp(0.9rem, 1vw, 1.3rem);
  font-weight: ${fontWeight.medium};
  line-height: 1.5;
  padding: 3.3rem 0 3.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
