import React, { useState } from 'react';
import { t } from 'i18next';
import styled from '@emotion/styled';
import { Button } from 'src/components/base';
import { pxToRem, colors } from 'src/styled-theme';

export interface NavbarLinkButtonProps {
  readonly title: string;
  readonly activeRoute: string;
  readonly setActiveRoute: React.Dispatch<React.SetStateAction<string>>;
  readonly navItemLinkHandler: any;
}

export const NavbarLinkButton: React.FC<NavbarLinkButtonProps> = ({
  title,
  activeRoute,
  navItemLinkHandler,
  setActiveRoute,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  //   TODO: FIX TYPE
  //   const navItemLinkHandler = (event: any, title: string) => {
  //     event.preventDefault();
  //     console.log(event.target.id, title);
  //     if (event.target.id) {
  //       setIsSelected(true);
  //     } else setIsSelected(false);
  //   };

  //   useEffect(() => {
  //     first;

  //     return () => {
  //       second;
  //     };
  //   }, [third]);

  const selectTitle = () => {
    if (activeRoute === '' || activeRoute === title) {
      setActiveRoute(title);
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
    // }
    console.log('active-route =>', activeRoute, 'title =>', title);
    // if (activeRoute === title) {
    // setIsSelected(false);
    // }
    // setIsSelected(false);
  };

  return (
    <DesktopNavItemLink
      type="button"
      //   id={title}

      onClick={(event: any, title: string) => {
        selectTitle();
        navItemLinkHandler(event, title);
      }}
      isSelected={isSelected}>
      {t(title)}
    </DesktopNavItemLink>
  );
};

export const DesktopNavItemLink = styled(Button)<{ isSelected: boolean }>`
  transition: all 0.2s ease;
  color: ${({ isSelected }) =>
    isSelected ? `${colors.white}` : `${colors.primary}`};
  background-color: ${({ isSelected }) =>
    isSelected ? `${colors.primary}` : 'transparent'};
  /* ORIGINAL */
  /* color: ${({ isSelected }) =>
    isSelected ? `${colors.white}` : `${colors.primary}`};
  background-color: ${({ isSelected }) =>
    isSelected ? `${colors.primary}` : 'transparent'}; */
  padding: ${pxToRem(6)} ${pxToRem(20)};
  font-size: clamp(0.9rem, 1.2vw, 1.4rem);
  font-weight: 500;
  text-decoration: none;
  border-radius: ${pxToRem(8)};

  :focus {
    text-decoration: none;
  }

  :active,
  :hover {
    color: ${colors.white};
    background-color: ${colors.primary};
    padding: ${pxToRem(6)} ${pxToRem(20)};
    text-decoration: none;
  }
`;
