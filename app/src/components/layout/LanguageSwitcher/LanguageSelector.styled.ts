import styled from '@emotion/styled';
import { Button } from 'casper-ui-kit';
import { lightTheme } from 'src/theme';

export const LanguageSelectorWrapper = styled.div``;

export const LanguageSelectorButton = styled(Button)`
  border: ${props => props.theme.text.primary} 2px solid;
  text-align: center;
  padding: 0.26rem 1rem;
  cursor: pointer;
  color: ${props => props.theme.text.primary};
  background-color: ${lightTheme.text.contrast};

  :disabled {
    background-color: ${props => props.theme.text.primary};
    color: ${lightTheme.text.contrast};
  }
`;
