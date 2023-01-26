import styled from '@emotion/styled';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNetworkStatus } from 'src/hooks';
import { loadConfig } from 'src/utils';
import { colors, fontWeight } from '../../../styled-theme';

export const Footer: React.FC = () => {
  const { data } = useNetworkStatus();
  const { t } = useTranslation();
  const { title } = loadConfig();

  return (
    <FooterWrapper>
      <p>
        {title} {t('node-version')} {data?.build_version.slice(0, 5)}
      </p>
      <p>
        {t('api-version')} {data?.api_version}
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
