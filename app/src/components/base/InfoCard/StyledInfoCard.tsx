import styled from '@emotion/styled';
import React from 'react';
import { pxToRem, subComponentHelper } from 'casper-ui-kit';
import { breakpoints } from 'src/styled-theme';

export interface Children {
  children: React.ReactNode;
}

export interface StyledInfoCardProps extends Children {}

export const StyledInfoCard = ({ children }: StyledInfoCardProps) => {
  const subComponentList = Object.keys(StyledInfoCard);
  const subComponents = subComponentHelper(subComponentList, children);

  return (
    <StyledInfoCardSection>
      {subComponents.map(component => component)}
    </StyledInfoCardSection>
  );
};

export const StyledInfoCardContentWrapper = styled.div`
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

export const StyledInfoCardSection = styled.section`
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

export const HeadContentWrapper = styled.div`
  margin-bottom: 2rem;
`;

export const FootContentWrapper = styled.div`
  margin-top: 1rem;
`;

const Header: React.FC<Children> = ({ children }) => (
  <HeadContentWrapper className="header">{children}</HeadContentWrapper>
);
StyledInfoCard.Header = Header;

const Body: React.FC<Children> = ({ children }) => (
  <StyledInfoCardContentWrapper className="body">
    {children}
  </StyledInfoCardContentWrapper>
);
StyledInfoCard.Body = Body;

const Footer: React.FC<Children> = ({ children }) => (
  <FootContentWrapper className="footer">{children}</FootContentWrapper>
);
StyledInfoCard.Footer = Footer;
