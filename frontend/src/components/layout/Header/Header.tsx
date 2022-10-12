import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Resolver, Controller } from 'react-hook-form';

import { FormComponent } from './HeaderComponents';

import {
  HeaderComponent,
  HeaderComponentsContainer,
  LogoLink,
  NavComponentsContainer,
  Nav,
  NavButtonContainer,
  NavButton,
  NavItemsContainer,
  DesktopNav,
  DesktopNavItemsContainer,
  DesktopNavItemLink,
  MobileNav,
  MobileNavItemsContainer,
  MobileNavItemLink,
  HeroContainer,
  HeroHeading,
} from './Header.styled';

import { FormValues, SelectOptions } from './Header.types';

import { useAppSelector, getBounds } from '../../../store';

import { BlueLogo } from '../../logos';
import { OpenMenuIcon, CloseMenuIcon } from '../../icons';

const resolver: Resolver<FormValues> = async values => {
  const isHexadecimal = /^[A-F0-9]+$/i.test(values.hash);
  const isPublicKey = /^0(1[0-9a-fA-F]{64}|2[0-9a-fA-F]{66})$/.test(
    values.hash,
  );
  const formattedBlockHeight = values.hash.split(',').join('').trim();
  const onlyNumbers = /^[0-9]+$/.test(formattedBlockHeight);

  let currentErrorMessage;

  const errorMessage = {
    account: 'Please enter a valid public key.',
    deploy: 'Please enter a valid deploy hash.',
    block: 'Please enter a valid block hash.',
    blockHeight: 'Please enter a valid block height',
  };

  const defaultErrorMessage = 'Please select an option and enter a value';

  const path = {
    account: `/account/${values.hash}`,
    deploy: `/deploy/${values.hash}`,
    block: `/block/${values.hash}`,
    blockHeight: `/block/${formattedBlockHeight}?type=height`,
  };

  switch (values.filterOptions) {
    case 'account':
      if (isPublicKey) {
        values.path = path.account;
      } else currentErrorMessage = errorMessage.account;
      break;
    case 'deploy':
      if (isHexadecimal) {
        values.path = path.deploy;
      } else currentErrorMessage = errorMessage.deploy;
      break;
    case 'block':
      if (isHexadecimal) {
        values.path = path.block;
      } else currentErrorMessage = errorMessage.block;
      break;
    case 'blockHeight':
      if (formattedBlockHeight && onlyNumbers) {
        values.path = path.blockHeight;
      } else currentErrorMessage = errorMessage.blockHeight;
      break;
    default:
      currentErrorMessage = defaultErrorMessage;
  }

  return {
    values: values.filterOptions ? values : {},
    errors: !values.path
      ? {
          hash: {
            type: 'required',
            message: `${currentErrorMessage || defaultErrorMessage}`,
          },
        }
      : {},
  };
};

const navItems = [
  {
    title: 'Home',
    path: '/home',
    key: 'home',
  },
  {
    title: 'Blocks',
    path: '/blocks',
    key: 'blocks',
  },
  {
    title: 'Deploys',
    path: '/deploys',
    key: 'deploys',
  },
  {
    title: 'Accounts',
    path: '/accounts',
    key: 'accounts',
  },
  {
    title: 'Peers',
    path: '/peers',
    key: 'peers',
  },
];

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver,
    defaultValues: { hash: '', filterOptions: 'account' },
  });

  const submitPath: SubmitHandler<FormValues> = data => navigate(data.path);

  const [currentFilterOption, setCurrentFilterOption] = useState('account');

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ hash: '', filterOptions: currentFilterOption });
    }
  }, [isSubmitSuccessful, reset, currentFilterOption]);

  const [isOpened, setIsOpened] = useState(false);
  const bounds = useAppSelector(getBounds);

  const windowWidth = bounds?.width || 0;

  useEffect(() => {
    const escKeyHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        if (isOpened) {
          setIsOpened(false);
        }
      }
    };

    document.addEventListener('keydown', escKeyHandler);

    return () => {
      document.removeEventListener('keydown', escKeyHandler);
    };
  }, [isOpened]);

  const selectOptions: SelectOptions[] = [
    { value: 'account', label: 'Account' },
    { value: 'deploy', label: 'Deploy' },
    { value: 'block', label: 'Block Hash' },
    { value: 'blockHeight', label: 'Block Height' },
  ];

  return (
    <HeaderComponent>
      <HeaderComponentsContainer>
        <LogoLink to="/">
          <BlueLogo />
        </LogoLink>
        <Nav>
          <NavComponentsContainer>
            <NavButtonContainer>
              <NavButton type="button" onClick={() => setIsOpened(!isOpened)}>
                {isOpened ? <CloseMenuIcon /> : <OpenMenuIcon />}
              </NavButton>
            </NavButtonContainer>
            <NavItemsContainer>
              {isOpened && (
                <MobileNav>
                  <MobileNavItemsContainer>
                    {navItems.map(({ path, title, key }) => {
                      return (
                        <li key={key}>
                          <MobileNavItemLink
                            to={path}
                            onClick={() => setIsOpened(false)}>
                            {title}
                          </MobileNavItemLink>
                        </li>
                      );
                    })}
                  </MobileNavItemsContainer>
                </MobileNav>
              )}
              <DesktopNav>
                <DesktopNavItemsContainer>
                  {navItems.map(({ path, title, key }) => {
                    return (
                      <li key={key}>
                        <DesktopNavItemLink to={path}>
                          {title}
                        </DesktopNavItemLink>
                      </li>
                    );
                  })}
                </DesktopNavItemsContainer>
              </DesktopNav>
            </NavItemsContainer>
          </NavComponentsContainer>
        </Nav>
      </HeaderComponentsContainer>
      <HeroContainer>
        <HeroHeading type="h1">Discover the Casper Blockchain.</HeroHeading>
      </HeroContainer>
      <FormComponent
        handleSubmit={handleSubmit}
        submitPath={submitPath}
        register={register}
        errors={errors}
        windowWidth={windowWidth}
        control={control}
        selectOptions={selectOptions}
        currentFilterOption={currentFilterOption}
        setCurrentFilterOption={setCurrentFilterOption}
      />
    </HeaderComponent>
  );
};
