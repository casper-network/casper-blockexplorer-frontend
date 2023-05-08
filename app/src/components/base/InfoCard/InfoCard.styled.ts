import styled from '@emotion/styled';
import { defaultTheme, pxToRem } from 'casper-ui-kit';

export const InfoCardSection = styled.section`
  margin: 0;
  padding: 0;
  width: 100%;

  @media (min-width: ${defaultTheme.typography.breakpoints.md}) {
    padding-top: ${pxToRem(24)};
  }

  @media only screen and (min-width: ${defaultTheme.typography.breakpoints
      .lg}) {
    padding-top: ${pxToRem(15)};
  }
`;

export const InfoCardContentWrapper = styled.div`
  width: 100%;
  background: ${props => props.theme.background.primary};
  border: 3px solid ${props => props.theme.border};
  box-shadow: 0px 0.125rem 0.5rem ${props => props.theme.boxShadow};
  border-radius: 0.35rem;
  padding: 2rem;
  overflow-x: auto;
  margin-bottom: 2rem;

  @media only screen and (min-width: ${defaultTheme.typography.breakpoints
      .md}) {
    max-width: 100vw;
  }
`;

export const HeadContentWrapper = styled.div`
  margin-bottom: 2rem;
`;

export const FootContentWrapper = styled.div`
  margin-top: 1rem;
`;
