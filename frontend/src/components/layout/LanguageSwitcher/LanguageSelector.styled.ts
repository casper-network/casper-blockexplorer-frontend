import styled from '@emotion/styled';
import { colors } from 'src/styled-theme';

export const LanguageSelectorWrapper = styled.div``;

export const LanguageSelectorButton = styled.button`
  border: ${colors.black} 2px solid;
  text-align: center;
  padding: 0.26rem 1rem;
  cursor: pointer;
  color: ${colors.black};
  background-color: ${colors.white};

  :disabled {
    background-color: ${colors.primary};
    color: ${colors.white};
  }
`;
