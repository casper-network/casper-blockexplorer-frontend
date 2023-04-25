import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  fetchNetworkStatus,
  getNetworkStatus,
  useAppDispatch,
  useAppSelector,
} from 'src/store';
import { loadConfig } from 'src/utils';
import { fontWeight } from '../../../styled-theme';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { title } = loadConfig();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNetworkStatus());
  }, [dispatch]);

  const networkStatus = useAppSelector(getNetworkStatus);

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
  font-weight: ${fontWeight.medium};
  line-height: 1.5;
  padding: 3.3rem 0 3.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
