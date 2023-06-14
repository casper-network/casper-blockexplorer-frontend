import styled from '@emotion/styled';
import { UiKitButton } from 'src/components/base';

import { lightTheme } from 'src/theme';

export const LanguageSelectorWrapper = styled.div``;

export const LanguageSelectorButton = styled(UiKitButton)`
  border: ${props => props.theme.border} 2px solid;
  text-align: center;
  padding: 0.26rem 1rem;
  cursor: pointer;
  color: ${props => props.theme.text.primary};
  background-color: ${props => props.theme.background.primary};

  :disabled {
    background-color: ${props => props.theme.background.secondary};
    color: ${lightTheme.text.contrast};
  }
`;
