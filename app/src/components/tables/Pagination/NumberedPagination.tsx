import styled from '@emotion/styled';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectOptions } from 'src/components/layout/Header/Partials';
import { CustomSelect } from 'src/components/layout/Header/Partials/CustomSelect';
import { DEFAULT_PAGESIZE } from 'src/constants';
import { useAppDispatch } from 'src/store';
import { TableOptions } from 'src/store/types';
import { colors, fontWeight, pxToRem } from 'src/styled-theme';
import { standardizeNumber } from 'src/utils';
import lessThanWhite from '../../../assets/images/less-than-white.png';
import moreThanWhite from '../../../assets/images/more-than-white.png';

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
          <JumpPageIcon src={lessThanWhite} alt="page-down" />
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
          <JumpPageIcon src={moreThanWhite} alt="page-up" />
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
  background-color: ${colors.lightSupporting};
  color: ${colors.black};
  min-width: ${pxToRem(68)};
  height: ${pxToRem(38)};
  width: fit-content;
  border: none;
  font-weight: ${fontWeight.medium};

  :hover {
    cursor: pointer;
    background-color: ${colors.mediumSupporting};
  }
`;

const NextPreviousPageIconWrapper = styled.div<{ disabled?: boolean }>`
  height: ${pxToRem(38)};
  width: ${pxToRem(38)};
  background-color: #4589f6;
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
  height: ${pxToRem(38)};
  padding: 0 1.5rem;
  color: ${colors.black};
  background-color: ${colors.lightSupporting};
  font-weight: ${fontWeight.medium};
`;

const JumpPageIcon = styled.img`
  width: ${pxToRem(18)};
  height: ${pxToRem(18)};
  margin: 0;
`;

const RowsSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 3rem;
`;

const RowsSelectLabel = styled.div`
  margin-right: 1rem;
  color: ${colors.black};
  font-weight: ${fontWeight.medium};
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
    background-color: ${colors.lightSupporting};
    height: ${pxToRem(38)};

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
    color: ${colors.black};
    padding: 0;
    margin: 0;
    width: fit-content;
    height: ${pxToRem(38)};
  }

  .react-select__value-container:hover {
    cursor: pointer;
  }

  .react-select__single-value {
    color: ${colors.black};
    font-weight: 500;
    font-size: 1rem;
    text-align: left;
  }

  .react-select__dropdown-indicator svg {
    color: ${colors.black};
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
    color: ${colors.black};
    width: fit-content;
    padding: 0;
    height: ${pxToRem(38)};
  }

  .react-select__menu-list {
    color: ${colors.black};
    font-size: 1rem;
    padding: 0;
    margin: 0;
  }

  .react-select__menu {
    text-align: center;
    background-color: ${colors.lightSupporting};
    width: ${pxToRem(145)};
    border-radius: 0;

    * {
      color: ${colors.black};
      padding: 0.35rem 0;
    }
  }

  .react-select__option:hover,
  .react-select__option:focus {
    transition: ease-in-out, font-weight, color, 400ms;
    font-weight: 700;
    background: linear-gradient(
      95.02deg,
      ${colors.gradient1} 0.62%,
      ${colors.gradient2} 48.99%,
      ${colors.gradient3} 70.51%,
      ${colors.gradient4} 70.85%,
      ${colors.gradient5} 116.85%
    );
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
    background-color: transparent;
    cursor: pointer;
  }

  .react-select__option {
    background-color: transparent;
  }

  .react-select__option--is-selected {
    display: none;
  }
`;
