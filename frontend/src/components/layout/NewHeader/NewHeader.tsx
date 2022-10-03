import React, { useEffect, useState } from 'react';

import { MOBILE_BREAKPOINT } from 'src/constants';

import { useNavigate, Link } from 'react-router-dom';
import { useForm, SubmitHandler, Resolver, Controller } from 'react-hook-form';
import Select from 'react-select';

import { useAppSelector, getBounds } from '../../../store';

import blueLogo from '../../../assets/images/blue-casper-logo.svg';
import { ReactComponent as OpenMenuIcon } from '../../../assets/icons/open-menu-icon.svg';
import { ReactComponent as CloseMenuIcon } from '../../../assets/icons/close-menu-icon.svg';
import { ReactComponent as ButtonIcon } from '../../../assets/icons/button-icon.svg';

type FormValues = {
  hash: string;
  filterOptions: string;
  path: string;
  blockHeight: string | number;
};

interface SelectOptions {
  value: string;
  label: string;
}

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
    { value: 'block', label: 'Blk Hash' },
    { value: 'blockHeight', label: 'Blk Height' },
    { value: 'deploy', label: 'Deploy' },
  ];

  //   console.log(selectOptions[0]);

  const form = (
    <div className="flex justify-center py-64">
      <form onSubmit={handleSubmit(submitPath)}>
        <label htmlFor="default-search" className="sr-only">
          Search
        </label>

        <Controller
          control={control}
          render={({ field: { onChange, value, name } }) => {
            const currentSelection = selectOptions.find(
              option => option.value === value,
            );

            const handleSelectChange = (
              selectedOption: SelectOptions | null,
            ) => {
              onChange(selectedOption?.value);
              setCurrentFilterOption(selectedOption?.value!);
              console.log(currentSelection);
            };

            return (
              <ul className="flex flex-row justify-between">
                {selectOptions.map((option, key) => {
                  const handleClick = () => {
                    console.log(option.value);
                    onChange(option.value);
                    setCurrentFilterOption(option.value);
                  };

                  return (
                    <li key={`${key}-selectOption`}>
                      <button
                        onClick={handleClick}
                        className={`${
                          currentFilterOption === option.value
                            ? 'bg-cobalt-blue text-white'
                            : 'bg-[#e6e6e7] text-black'
                        } text-xs text-bold border-none rounded-full py-5 px-10`}
                        type="button">
                        {option.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
              // <Select
              //   defaultValue={selectOptions[0]}
              //   value={currentSelection}
              //   name={name}
              //   options={selectOptions}
              //   onChange={handleSelectChange}
              //   isSearchable={false}
              //   noOptionsMessage={() => null}
              //   className="custom-select"
              //   classNamePrefix="react-select"
              // />
            );
          }}
          name="filterOptions"
          rules={{
            required: true,
          }}
        />
        <div className="flex justify-center bg-casper-white pt-25 lg:pt-39">
          <input
            {...register('hash', { required: true })}
            type="search"
            id="search"
            className="block h-45 rounded-l-md md:py-5 px-20 sm:pl-20 md:px-20 mb-0 mt-0 text-sm text-gray-900 bg-gray-50 border-none shadow-inner shadow-gray-300 focus:outline-none w-screen max-w-260 appearance-none"
            placeholder="Select search criteria"
            required
          />
          <button
            type="submit"
            className="bg-cobalt-blue w-45 relative h-45 right-1 focus:outline-none font-medium rounded-r-md border-none cursor-pointer">
            <ButtonIcon />
          </button>
        </div>
        {errors.hash && (
          <div className="flex flex-row justify-center px-5 lg:pb-16 ">
            <div className="fill-casper-white pt-12 w-20 h-30 stroke-casper-red stroke-2 mr-7 ">
              <svg>
                <path
                  viewBox="0 0 30 16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
            <p className="text-casper-red text-[0.9rem] xxs:text-base pt-14 xxs:pt-12">
              {errors.hash.message}
            </p>
          </div>
        )}
      </form>
    </div>
  );

  return (
    <header className="w-full bg-casper-white">
      <div className="flex flex-row justify-between w-full max-w-1800 px-40 py-20 xxs:pl-22 md:pl-30 xl:pl-46 pr-28 md:pr-36 xl:pr-52">
        <div className="pt-7">
          <Link
            className="no-underline hover:no-underline focus:no-underline flex flex-row items-center"
            to="/">
            <div className="flex flex-row items-center">
              <img
                className="h-26 w-28 xxs:h-50"
                src={blueLogo}
                alt="Casper Logo"
              />
            </div>
          </Link>
        </div>
        <nav className="z-10 lg:py-40 bg-casper-white lg:w-200">
          <div className="flex flex-col lg:flex-row lg:justify-between">
            <div className="z-30 pt-3 flex flex-row justify-end lg:justify-between">
              <button
                type="button"
                className="lg:hidden bg-transparent border-none"
                onClick={() => setIsOpened(!isOpened)}>
                {isOpened ? <CloseMenuIcon /> : <OpenMenuIcon />}
              </button>
            </div>
            <div className="bg-casper-white border-none lg:flex lg:space-x-12 lg:flex-row lg:w-auto">
              {isOpened && (
                <nav className="px-20 lg:hidden">
                  <ul className="z-10 bg-cobalt-blue flex flex-col gap-5 absolute w-screen h-screen items-center justify-center left-0 top-0">
                    {navItems.map(({ path, title, key }) => {
                      return (
                        <li key={key}>
                          <Link
                            to={path}
                            className="text-white text-22 p-5 xxs:py-11 w-full font-medium tracking-wide">
                            {title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              )}
              <nav className="hidden lg:block">
                <ul className="flex gap-x-8 pt-2">
                  {navItems.map(({ path, title, key }) => {
                    return (
                      <li key={key}>
                        <Link
                          to={path}
                          className="text-white text-18 py-5 xxs:py-11 lg:py-0 w-full font-medium tracking-wide">
                          {title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </nav>
      </div>
      <div className="flex justify-center pt-4">
        <h1 className="text-transparent text-inter bg-clip-text font-bold leading-10 text-[2.75rem] max-w-250  w-20ch bg-gradient-to-r from-[#1E1D86] to-[#E2324A]">
          Discover the Casper Blockchain.
        </h1>
      </div>
      {form}
    </header>
  );
};
