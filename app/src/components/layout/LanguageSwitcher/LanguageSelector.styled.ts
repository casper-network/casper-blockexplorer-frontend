import styled from '@emotion/styled';
import { Button } from 'casper-ui-kit';

import { lightTheme } from 'src/theme';

export const LanguageSelectorWrapper = styled.div``;

export const LanguageSelectorButton = styled(Button)`
  border: ${props => props.theme.border} 2px solid;
  text-align: center;
  cursor: pointer;
  color: ${lightTheme.text.contrast};
  background-color: ${props => props.theme.background.secondary};

  :focus {
    border: ${props => props.theme.border} 2px solid;
  }

  :disabled {
    background-color: ${props => props.theme.background.primary};
    color: ${props => props.theme.text.primary};
  }
`;
