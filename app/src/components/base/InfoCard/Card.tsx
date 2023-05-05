import styled from '@emotion/styled';
import React from 'react';
import { subComponentHelper } from 'casper-ui-kit';

export interface Children {
  children: React.ReactNode;
}

export interface CardProps extends Children {
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  const subComponentList = Object.keys(Card);

  const subComponents = subComponentHelper(subComponentList, children);

  return (
    <CardContentWrapper data-testid="baseCard" className={className}>
      {subComponents.map(component => component)}
    </CardContentWrapper>
  );
};

const Header: React.FC<Children> = ({ children }) => (
  <div data-testid="baseCardHeader" className="header">
    {children}
  </div>
);
Card.Header = Header;

const Body: React.FC<Children> = ({ children }) => (
  <div data-testid="baseCardBody" className="body">
    {children}
  </div>
);
Card.Body = Body;

const Footer: React.FC<Children> = ({ children }) => (
  <div data-testid="baseCardFooter" className="footer">
    {children}
  </div>
);
Card.Footer = Footer;

export const CardContentWrapper = styled.div`
  width: 100%;
  background: white;
  border: 1px solid #e3e3e9;
  box-shadow: 0px 0.125rem 0.5rem rgba(127, 128, 149, 0.2);
  border-radius: 0.35rem;
  padding: 2rem;
  overflow-x: auto;
  max-width: calc(100vw - 4rem);
  margin: 0 auto 2rem auto;
`;
