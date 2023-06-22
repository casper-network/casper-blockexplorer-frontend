import styled from '@emotion/styled';
import React from 'react';
import { defaultTheme } from 'casper-ui-kit';
import { useTranslation } from 'react-i18next';
import { ApiData } from 'src/api/types';

interface FooterProps {
  readonly title?: string;
  readonly networkStatus: ApiData.Status | null;
}

export const Footer: React.FC<FooterProps> = ({ title, networkStatus }) => {
  const { t } = useTranslation();

  return (
    <FooterWrapper>
      <p>
        {title} {t('node-version')} {networkStatus?.build_version.slice(0, 5)}
      </p>
      <p>
        {t('api-version')} {networkStatus?.api_version}
      </p>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  color: ${props => props.theme.border};
  background-color: ${props => props.theme.background.primary};
  font-size: clamp(0.9rem, 1vw, 1.3rem);
  font-weight: ${defaultTheme.typography.fontWeights.medium};
  line-height: 1.5;
  padding: 3.3rem 0 3.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
