import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { pxToRem, defaultTheme } from 'casper-ui-kit';

export const IconH2Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 84%;
`;

export const H2 = styled.h2`
  font-size: clamp(1.5rem, 2vw, 1.7rem);
  font-weight: ${defaultTheme.typography.fontWeights.normal};
  color: ${props => props.theme.text.primary};
  line-height: 1;
  max-width: 10.5rem;
  padding-left: 0.7rem;
`;

export const PageLink = styled(Link)`
  color: ${props => props.theme.text.primary};
  font-size: clamp(0.67rem, 1.25vw, 0.9rem);
  text-align: right;
  font-weight: ${defaultTheme.typography.fontWeights.medium};
  min-width: 3.5rem;
  text-decoration: none;
  white-space: nowrap;

  :hover,
  :focus {
    color: ${props => props.theme.text.hover};
    transition: ease-in-out, color, 400ms;
    text-decoration: none;
  }
`;

export const H3 = styled.h3`
  font-weight: ${defaultTheme.typography.fontWeights.normal};
  font-size: clamp(0.9rem, 1.35vw, 1rem);
  line-height: 1;
  padding-top: 1.45rem;
`;

export const H3Data = styled.p`
  color: ${props => props.theme.text.primary};
  font-weight: ${defaultTheme.typography.fontWeights.medium};
  font-size: clamp(1.6rem, 2vw, 2.2rem);
  padding: 0.55rem 0 0.2rem 0;
`;

export const DataContext = styled.p`
  color: ${props => props.theme.text.primary};
  font-size: clamp(0.9rem, 1.25vw, 1rem);
`;

export const Card = styled.section`
  background-color: ${props => props.theme.background.primary};
  color: ${props => props.theme.text.primary};
  padding: 0 2rem;
  border: ${pxToRem(4)} solid ${props => props.theme.border};
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.438rem ${props => props.theme.boxShadow};
  padding-bottom: 1.5rem;
  margin-bottom: ${pxToRem(50)};
  width: 100%;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1.15rem 0;
  border-bottom: 0.094rem solid #f4f4f4;
  min-height: ${pxToRem(80)};
`;

export const Details = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Info = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin: 1.45rem 0;
`;

export const TextWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 1rem;
  font-size: ${pxToRem(24)};

  h3 {
    padding: unset;
  }
`;
