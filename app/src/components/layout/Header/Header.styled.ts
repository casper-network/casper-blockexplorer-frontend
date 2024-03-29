import styled from '@emotion/styled';
import { Heading } from 'src/components/base';
import { defaultTheme, pxToRem } from 'casper-ui-kit';

export const HeaderComponent = styled.header`
  width: 100%;
  background-color: ${props => props.theme.background.primary};
`;

export const HeaderComponentsContainer = styled.div<{
  isFirstVisit: boolean;
}>`
  display: flex;
  justify-content: space-between;
  width: auto;
  margin: 0 0.5rem;
  padding: 0;

  @media (min-width: ${defaultTheme.breakpoints.xs}) {
    margin: 0 1.5rem;
  }

  @media (min-width: ${defaultTheme.breakpoints.lg}) {
    width: auto;
    margin: 0 2.25rem;
    padding: 0;
  }
`;

export const HeroContainer = styled.div<{ isFirstVisit: boolean }>`
  display: ${({ isFirstVisit }) => (isFirstVisit ? 'flex' : 'none')};
  justify-content: center;
  padding: 0;

  @media (min-width: ${defaultTheme.breakpoints.md}) {
    padding-top: 2.5rem;
    justify-content: start;
    width: 64.5%;
    min-width: ${pxToRem(628)};
    max-width: ${pxToRem(792)};
    margin: 0 auto;
  }

  @media (min-width: ${defaultTheme.breakpoints.lg}) {
    width: 58%;
  }
`;

export const HeroHeading = styled(Heading)`
  font-size: 2.8rem;
  font-weight: 400;
  line-height: 1;
  padding-right: 1rem;
  max-width: 18rem;

  @media (min-width: ${defaultTheme.breakpoints.md}) {
    font-size: 3.2rem;
    line-height: 1;
    padding-right: 0rem;
    max-width: 31rem;
    background-size: 100%;
  }
`;

export const PageTableHeader = styled.h1`
  font-weight: ${defaultTheme.typography.fontWeights.light};
  font-size: clamp(2.7rem, 5.5vw, 3.75rem);
  margin: 1.5rem 0 2.5rem 0;
  color: ${props => props.theme.text.primary};

  @media (min-width: ${defaultTheme.breakpoints.md}) {
    margin: 0 0 2.5rem 0;
  }
`;
