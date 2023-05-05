import styled from '@emotion/styled';
import { breakpoints, pxToRem } from '../../../styled-theme';
import { Card } from './Card';

export const InfoCardSection = styled(Card)`
  margin: 0;
  padding: 0;
  width: 100%;

  @media (min-width: ${breakpoints.md}) {
    padding-top: ${pxToRem(24)};
  }

  @media only screen and (min-width: ${breakpoints.lg}) {
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

  @media only screen and (min-width: ${breakpoints.md}) {
    max-width: 100vw;
  }
`;

export const HeadContentWrapper = styled(Card.Header)`
  margin-bottom: 2rem;
`;

export const FootContentWrapper = styled(Card.Footer)`
  margin-top: 1rem;
`;

// export const InfoCardSection = styled.section`
//   margin: 0;
//   padding: 0;
//   width: 100%;

//   @media (min-width: ${breakpoints.md}) {
//     padding-top: ${pxToRem(24)};
//   }

//   @media only screen and (min-width: ${breakpoints.lg}) {
//     padding-top: ${pxToRem(15)};
//   }
// `;

// export const InfoCardContentWrapper = styled.div`
//   width: 100%;
//   background: ${props => props.theme.background.primary};
//   border: 3px solid ${props => props.theme.border};
//   box-shadow: 0px 0.125rem 0.5rem ${props => props.theme.boxShadow};
//   border-radius: 0.35rem;
//   padding: 2rem;
//   overflow-x: auto;
//   margin-bottom: 2rem;

//   @media only screen and (min-width: ${breakpoints.md}) {
//     max-width: 100vw;
//   }
// `;

// export const HeadContentWrapper = styled.div`
//   margin-bottom: 2rem;
// `;

// export const FootContentWrapper = styled.div`
//   margin-top: 1rem;
// `;
