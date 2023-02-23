import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors, fontWeight, pxToRem } from '../../../styled-theme';

export const IconH2Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 84%;
`;

export const H2 = styled.h2`
  font-size: clamp(1.5rem, 2vw, 1.7rem);
  font-weight: ${fontWeight.semiBold};
  line-height: 1;
  max-width: 10.5rem;
  padding-left: 0.7rem;
`;

export const PageLink = styled(Link)`
  color: ${colors.primary};
  font-size: clamp(0.67rem, 1.25vw, 0.9rem);
  text-align: right;
  font-weight: ${fontWeight.medium};
  min-width: 3.5rem;
  text-decoration: none;
  white-space: nowrap;

  :hover,
  :focus {
    background-color: ${colors.primary};
    background-image: linear-gradient(
      90deg,
      ${colors.gradient1},
      ${colors.gradient2},
      ${colors.gradient3},
      ${colors.gradient4},
      ${colors.gradient5}
    );
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
    text-decoration: none;
  }
`;

export const H3 = styled.h3`
  font-weight: ${fontWeight.medium};
  font-size: clamp(0.9rem, 1.35vw, 1rem);
  line-height: 1;
  padding-top: 1.45rem;
`;

export const H3Data = styled.p`
  color: ${colors.primary};
  font-weight: ${fontWeight.extraBold};
  font-size: clamp(1.6rem, 2vw, 2.2rem);
  padding: 0.55rem 0 0.2rem 0;
`;

export const DataContext = styled.p`
  color: ${colors.darkSupporting};
  font-weight: ${fontWeight.medium};
  font-size: clamp(0.9rem, 1.25vw, 1rem);
`;

export const Card = styled.section`
  background: ${colors.white};
  padding: 0 2rem;
  border: 0.063rem solid ${colors.mediumSupporting};
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.438rem ${colors.boxShadow};
  padding-bottom: 1.5rem;
  margin-bottom: ${pxToRem(50)};
  width: 100%;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1.15rem 0;
  border-bottom: 0.094rem solid #f2f3f5;
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

  h3 {
    padding: unset;
  }
`;
