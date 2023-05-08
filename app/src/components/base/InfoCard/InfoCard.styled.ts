import styled from '@emotion/styled';
import { Card } from 'casper-ui-kit';
import { breakpoints } from '../../../styled-theme';

export const InfoCardContentWrapper = styled(Card)`
  width: 100%;
  background: ${props => props.theme.background.primary};
  border: 3px solid ${props => props.theme.border};
  box-shadow: 0px 0.125rem 0.5rem ${props => props.theme.boxShadow};
  border-radius: 0.35rem;
  padding: 2rem;
  overflow-x: auto;
  margin-bottom: 2rem;

  @media only screen and (min-width: ${breakpoints.md}) {
    max-width: 100vw;
  }
`;

export const HeadContentWrapper = styled.div`
  padding-top: 2rem;
  margin-bottom: 2rem;
  @media only screen and (min-width: ${breakpoints.md}) {
    padding: 0;
  }
`;
