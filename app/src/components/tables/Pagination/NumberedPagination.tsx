import styled from '@emotion/styled';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectOptions } from 'src/components/layout/Header/Partials';
import { CustomSelect } from 'src/components/layout/Header/Partials/CustomSelect';
import { DEFAULT_PAGESIZE } from 'src/constants';
import { useAppDispatch } from 'src/store';
import { TableOptions } from 'src/store/types';
import { standardizeNumber } from 'src/utils';
import { pxToRem } from 'casper-ui-kit';
import {
  LessThanLight,
  GreaterThanLight,
  LessThanDark,
  GreaterThanDark,
} from 'src/components/icons';
import { useTheme } from '@emotion/react';

interface NumberedPaginationProps {
  rowCountSelectOptions: SelectOptions[];
  tableOptions: TableOptions;
  setTableOptions: ActionCreatorWithPayload<TableOptions, string>;
  setIsTableLoading: React.Dispatch<React.SetStateAction<boolean>>;
  totalPages: number;
  updatePageNum: ActionCreatorWithPayload<number, string>;
  removeRowsSelect?: boolean;
}

export const NumberedPagination: React.FC<NumberedPaginationProps> = ({
  rowCountSelectOptions,
  tableOptions,
  setTableOptions,
  setIsTableLoading,
  totalPages,
  updatePageNum,
  removeRowsSelect,
}) => {
  const { t } = useTranslation();
  const { type: themeType } = useTheme();

  const dispatch = useAppDispatch();

  const rowCountOption = useMemo(
    () =>
      rowCountSelectOptions.find(
        option => Number(option.value) === tableOptions.pagination.pageSize,
      ),
    [tableOptions.pagination.pageSize, rowCountSelectOptions],
  );

  const jumpToPage = (pageNum: number) => {
    setIsTableLoading(true);
    dispatch(
      setTableOptions({
        ...tableOptions,
        pagination: {
          ...tableOptions.pagination,
          pageNum,
        },
      }),
    );
  };

  const handleSelectChange = (selectedOption: SelectOptions | null) => {
    if (selectedOption) {
      // reset to first page - avoids messy XXXX out of XXX when switching from 20 to 10
      setIsTableLoading(true);

      dispatch(
        setTableOptions({
          ...tableOptions,
          pagination: {
            pageSize: Number(selectedOption.value) ?? DEFAULT_PAGESIZE,
            pageNum: 1,
          },
        }),
      );
    }
  };

  return (
    <PageWrapper>
      {!removeRowsSelect && (
        <RowsSelectWrapper>
          <RowsSelectLabel>{t('show')}</RowsSelectLabel>
          <CustomSelect
            defaultValue={rowCountSelectOptions[1]}
            name="row-count"
            options={rowCountSelectOptions}
            currentSelection={rowCountOption}
            onChange={handleSelectChange}
            customSelectWrapper={SelectWrapper}
          />
        </RowsSelectWrapper>
      )}
      <PaginationWrapper>
        <JumpToPageButton onClick={() => jumpToPage(1)}>
          {t('first')}
        </JumpToPageButton>
        <NextPreviousPageIconWrapper
          onClick={() => {
            if (tableOptions.pagination.pageNum === 1) return;
            setIsTableLoading(true);
            dispatch(updatePageNum(-1));
          }}>
          {themeType === 'light' ? <LessThanLight /> : <LessThanDark />}
        </NextPreviousPageIconWrapper>
        <PageNumberWrapper>
          {t('page-out-of', {
            pageNum: standardizeNumber(tableOptions.pagination.pageNum),
            totalPages: standardizeNumber(totalPages || 1),
          })}
        </PageNumberWrapper>
        <NextPreviousPageIconWrapper
          onClick={() => {
            if (tableOptions.pagination.pageNum === totalPages) return;
            setIsTableLoading(true);
            dispatch(updatePageNum(1));
          }}>
          {themeType === 'light' ? <GreaterThanLight /> : <GreaterThanDark />}
        </NextPreviousPageIconWrapper>
        <JumpToPageButton onClick={() => jumpToPage(totalPages)}>
          {t('last')}
        </JumpToPageButton>
      </PaginationWrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
`;

const PaginationWrapper = styled.div`
  display: flex;

  * {
    user-select: none;
    margin: 0 0.25rem;
  }
`;

const JumpToPageButton = styled.button`
  background-color: ${props => props.theme.background.secondary};
  color: ${props => props.theme.text.primary};
  min-width: ${pxToRem(68)};
  height: ${pxToRem(38)};
  width: fit-content;
  border: none;

  :hover {
    cursor: pointer;
    background-color: ${props => props.theme.background.hover};
  }
`;

const NextPreviousPageIconWrapper = styled.div<{ disabled?: boolean }>`
  height: ${pxToRem(38)};
  width: ${pxToRem(38)};
  background-color: ${props => props.theme.button};
  display: flex;
  justify-content: center;
  align-items: center;

  * {
    color: white;
    z-index: 1;
  }

  :hover {
    cursor: pointer;
  }
`;

const PageNumberWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 10.5rem;
  height: ${pxToRem(38)};
  color: ${props => props.theme.text.primary};
  background-color: ${props => props.theme.background.secondary};
`;

const RowsSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.25rem;
`;

const RowsSelectLabel = styled.div`
  margin-right: 1rem;
  color: ${props => props.theme.text.primary};
`;

const SelectWrapper = styled.div<{ isMenuOpen: boolean }>`
  .react-select__control {
    width: ${pxToRem(145)};
    box-shadow: none;
    border: none;
    border-radius: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.background.secondary};
    height: ${pxToRem(38)};
    transition: none;

    :hover {
      cursor: pointer;
    }
  }

  .react-select__value-container {
    margin: 0;
    max-width: fit-content;
    padding: 0;
  }

  .react-select__indicators {
    display: block;
    color: ${props => props.theme.text.primary};
    padding: 0;
    margin: 0;
    width: fit-content;
    height: ${pxToRem(38)};
  }

  .react-select__value-container:hover {
    cursor: pointer;
  }

  .react-select__single-value {
    color: ${props => props.theme.text.primary};
    font-size: 1rem;
    text-align: left;
  }

  .react-select__dropdown-indicator svg {
    color: ${props => props.theme.text.primary};
    transition: all 200ms ease-in;
    transform: ${({ isMenuOpen }) => (isMenuOpen ? 'rotate(180deg)' : null)};

    :focus,
    :hover {
      cursor: pointer;
    }
  }

  .react-select__indicator {
    display: flex;
    align-items: center;
    color: ${props => props.theme.text.primary};
    width: fit-content;
    padding: 0;
    height: ${pxToRem(38)};
  }

  .react-select__menu-list {
    color: ${props => props.theme.text.primary};
    font-size: 1rem;
    padding: 0;
    margin: 0;
  }

  .react-select__menu {
    text-align: center;
    background-color: ${props => props.theme.background.secondary};
    width: ${pxToRem(145)};
    border-radius: 0;

    * {
      color: ${props => props.theme.text.primary};
      padding: 0.35rem 0;
    }
  }

  .react-select__option:hover,
  .react-select__option:focus {
    color: ${props => props.theme.text.hover};
    transition: ease-in-out, color, 400ms;
    cursor: pointer;
  }

  .react-select__option {
    background-color: transparent;
  }

  .react-select__option--is-selected {
    display: none;
  }
`;
