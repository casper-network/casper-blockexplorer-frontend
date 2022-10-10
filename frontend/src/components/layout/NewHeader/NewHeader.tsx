import React, { useEffect, useState } from 'react';

import { MOBILE_BREAKPOINT } from 'src/constants';

import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Resolver, Controller } from 'react-hook-form';
import Select from 'react-select';

import {
  MobileSelectContainer,
  MobileSelectButton,
  FormContainer,
  Form,
  FormComponentsContainer,
  InputAndButtonContainer,
  SearchInput,
  SubmitButton,
  ErrorMessageContainer,
  ErrorSvgContainer,
  ErrorMessage,
  Header,
  HeaderComponentsContainer,
  LogoLink,
  BlueCasperLogo,
  DesktopToolsContainer,
  WhiteCasperLogo,
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
  H1Container,
  H1,
} from './NewHeader.styled';

import { FormValues, SelectOptions } from './NewHeader.types';

import { useAppSelector, getBounds } from '../../../store';

import blueLogo from '../../../assets/images/blue-casper-logo.svg';
import whiteLogo from '../../../assets/images/white-casper-logo.svg';
import { ReactComponent as OpenMenuIcon } from '../../../assets/icons/open-menu-icon.svg';
import { ReactComponent as CloseMenuIcon } from '../../../assets/icons/close-menu-icon.svg';
import { ReactComponent as ButtonIcon } from '../../../assets/icons/button-icon.svg';

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

export const NewHeader: React.FC = () => {
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

  const mobileSelect = (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <MobileSelectContainer>
            {selectOptions.map((option, key) => {
              const handleClick = () => {
                onChange(option.value);
                setCurrentFilterOption(option.value);
              };

              return (
                <li key={key}>
                  <MobileSelectButton
                    onClick={handleClick}
                    style={{
                      backgroundColor:
                        currentFilterOption === option.value
                          ? '#0325d1'
                          : '#F1F1F4',
                      color:
                        currentFilterOption === option.value ? '#fff' : '#000',
                    }}
                    type="button">
                    {option.label.includes('Block')
                      ? option.label.replace('Block', 'Blk')
                      : option.label}
                  </MobileSelectButton>
                </li>
              );
            })}
          </MobileSelectContainer>
        );
      }}
      name="filterOptions"
      rules={{
        required: true,
      }}
    />
  );

  const desktopSelect = (
    <Controller
      control={control}
      render={({ field: { onChange, value, name } }) => {
        const currentSelection = selectOptions.find(
          option => option.value === value,
        );

        const handleSelectChange = (selectedOption: SelectOptions | null) => {
          onChange(selectedOption?.value);
          setCurrentFilterOption(selectedOption?.value!);
        };

        return (
          <Select
            defaultValue={selectOptions[0]}
            value={currentSelection}
            name={name}
            options={selectOptions}
            onChange={handleSelectChange}
            isSearchable={false}
            noOptionsMessage={() => null}
            className="custom-select"
            classNamePrefix="react-select"
          />
        );
      }}
      name="filterOptions"
      rules={{
        required: true,
      }}
    />
  );

  const form = (
    <FormContainer>
      <Form onSubmit={handleSubmit(submitPath)}>
        <label htmlFor="default-search" className="sr-only">
          Search
        </label>
        <FormComponentsContainer>
          {windowWidth > MOBILE_BREAKPOINT ? desktopSelect : mobileSelect}
          <InputAndButtonContainer>
            <SearchInput
              {...register('hash', { required: true })}
              type="search"
              id="search"
              placeholder="Select search criteria"
              required
            />
            <SubmitButton type="submit">
              <ButtonIcon />
            </SubmitButton>
          </InputAndButtonContainer>
        </FormComponentsContainer>
        {errors.hash && (
          <ErrorMessageContainer>
            <ErrorSvgContainer>
              <svg>
                <path
                  viewBox="0 0 30 16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </ErrorSvgContainer>
            <ErrorMessage>{errors.hash.message}</ErrorMessage>
          </ErrorMessageContainer>
        )}
      </Form>
    </FormContainer>
  );

  const MobileLogo = (
    <LogoLink to="/">
      <BlueCasperLogo src={blueLogo} alt="Casper Logo" />
    </LogoLink>
  );

  const DesktopTools = (
    <DesktopToolsContainer>
      <LogoLink to="/">
        <WhiteCasperLogo src={whiteLogo} alt="Casper Logo" />
      </LogoLink>
    </DesktopToolsContainer>
  );

  return (
    <Header>
      <HeaderComponentsContainer>
        {windowWidth > MOBILE_BREAKPOINT ? DesktopTools : MobileLogo}
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
      <H1Container>
        <H1 type="h1">Discover the Casper Blockchain.</H1>
      </H1Container>
      {form}
    </Header>
  );
};
