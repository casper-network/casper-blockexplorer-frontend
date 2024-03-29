import styled from '@emotion/styled';
import { defaultTheme, pxToRem, Card } from 'casper-ui-kit';

export const InfoCardSection = styled(Card)`
  margin: 0;
  padding: 0;
  width: 100%;

  @media (min-width: ${defaultTheme.breakpoints.md}) {
    padding-top: ${pxToRem(24)};
  }

  @media only screen and (min-width: ${defaultTheme.breakpoints.lg}) {
    padding-top: ${pxToRem(15)};
  }
`;

export const InfoCardContentWrapper = styled(Card)`
  width: 100%;
  background: ${props => props.theme.background.primary};
  border: 3px solid ${props => props.theme.border};
  box-shadow: 0px 0.125rem 0.5rem ${props => props.theme.boxShadow};
  border-radius: 0.35rem;
  padding: 2rem;
  overflow-x: auto;
  margin-bottom: 2rem;

  @media only screen and (min-width: ${defaultTheme.breakpoints.md}) {
    max-width: 100vw;
  }
`;

export const HeadContentWrapper = styled.div`
  padding-top: 2rem;
  margin-bottom: 2rem;

  @media only screen and (min-width: ${defaultTheme.breakpoints.md}) {
    padding: 0;
  }
`;
