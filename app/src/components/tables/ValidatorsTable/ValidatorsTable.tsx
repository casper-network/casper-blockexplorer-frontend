import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { ColumnDef, OnChangeFn, SortingState } from '@tanstack/react-table';
import { Button, defaultTheme, pxToRem, Table } from 'casper-ui-kit';
import {
  fetchCurrentEraValidatorStatus,
  fetchValidators,
  getCurrentEraValidatorStatusStatus,
  getTotalEraValidators,
  getValidatorLoadingStatus,
  getCurrentEraValidators,
  getValidatorsTableOptions,
  Loading,
  setValidatorTableOptions,
  updateValidatorPageNum,
  updateValidatorSorting,
  useAppDispatch,
  useAppSelector,
  getNextEraValidators,
  getLatestBlock,
  setInitialValidatorStateFromUrlSearchParams,
} from 'src/store';
import { standardizeNumber, truncateHash } from 'src/utils';
import { ApiData } from 'src/api/types';
import { Link } from 'react-router-dom';
import { SelectOptions } from 'src/components/layout/Header/Partials';
import { DEFAULT_SECONDARY_FONT_FAMILIES } from 'src/constants';
import { standardizePercentage } from 'src/utils/standardize-percentage';
import { StyledCopyToClipboard } from 'src/components/utility';
import { useTheme } from '@emotion/react';
import { NumberedPagination } from '../Pagination';

const validSortableValidatorsColumns = [
  'feePercentage',
  'delegatorsCount',
  'totalStakeMotes',
  'selfPercentage',
  'percentageOfNetwork',
];

export const ValidatorsTable: React.FC = () => {
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [isCurrentEra, setIsCurrentEra] = useState(true);

  const { t } = useTranslation();

  const { type: themeType } = useTheme();

  const dispatch = useAppDispatch();

  const currentEraValidators = useAppSelector(getCurrentEraValidators);
  const nextEraValidators = useAppSelector(getNextEraValidators);
  const validatorsLoadingStatus = useAppSelector(getValidatorLoadingStatus);
  const validatorsStatusLoadingStatus = useAppSelector(
    getCurrentEraValidatorStatusStatus,
  );
  const validatorsTableOptions = useAppSelector(getValidatorsTableOptions);
  const totalEraValidators = useAppSelector(getTotalEraValidators);
  const latestBlock = useAppSelector(getLatestBlock);

  const currentEraId = latestBlock?.header.era_id;

  useEffect(() => {
    dispatch(fetchCurrentEraValidatorStatus());

    dispatch(
      setInitialValidatorStateFromUrlSearchParams(
        validSortableValidatorsColumns,
      ),
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchValidators(validatorsTableOptions));
  }, [dispatch, validatorsTableOptions]);

  useEffect(() => {
    if (isTableLoading) {
      setIsTableLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEraValidators]);

  const isPageLoading =
    validatorsLoadingStatus !== Loading.Complete ||
    validatorsStatusLoadingStatus !== Loading.Complete ||
    !currentEraValidators.length;

  const rowCountSelectOptions: SelectOptions[] | null = useMemo(
    () => [
      {
        value: '5',
        label: t('rows', {
          count: 5,
        }),
      },
      {
        value: '10',
        label: t('rows', {
          count: 10,
        }),
      },
      {
        value: '20',
        label: t('rows', {
          count: 20,
        }),
      },
    ],
    [t],
  );

  const totalPages = useMemo(() => {
    return Math.ceil(
      totalEraValidators / validatorsTableOptions.pagination.pageSize,
    );
  }, [validatorsTableOptions, totalEraValidators]);

  const columns = useMemo<ColumnDef<ApiData.ValidatorsInfo>[]>(
    () => [
      {
        header: `${t('rank')}`,
        accessorKey: 'rank',
        enableSorting: false,
        maxSize: 100,
        cell: ({ getValue }) => getValue<number>(),
      },
      {
        header: `${t('public-key')}`,
        accessorKey: 'publicKey',
        enableSorting: false,
        minSize: 200,
        cell: ({ getValue }) => (
          <HashAndCopyToClipboardWrapper>
            <StyledHashLink
              to={{
                pathname: `/account/${getValue<string>()}`,
              }}>
              {truncateHash(getValue<string>())}
            </StyledHashLink>
            <StyledCopyToClipboard textToCopy={getValue<string>()} />
          </HashAndCopyToClipboardWrapper>
        ),
      },
      {
        header: `${t('fee-percentage')}`,
        accessorKey: 'feePercentage',
        maxSize: 125,
        cell: ({ getValue }) => standardizePercentage(getValue<number>(), 2),
      },
      {
        header: `${t('delegators')}`,
        accessorKey: 'delegatorsCount',
        maxSize: 125,
        cell: ({ getValue }) => standardizeNumber(getValue<number>()),
      },
      {
        header: `${t('total-stake')}`,
        accessorKey: 'totalStakeMotes',
        minSize: 200,
        cell: ({ getValue }) => (
          <CSPRText>
            {/* TODO: see https://github.com/casper-network/casper-blockexplorer-middleware/issues/23 */}
            {standardizeNumber((getValue<number>() / 10 ** 9).toFixed(0))}{' '}
            {t('cspr')}
          </CSPRText>
        ),
      },
      {
        header: `${t('self-percentage')}`,
        accessorKey: 'selfPercentage',
        maxSize: 150,
        cell: ({ getValue }) => standardizePercentage(getValue<number>(), 2),
      },
      {
        header: `${t('network-percentage')}`,
        accessorKey: 'percentageOfNetwork',
        maxSize: 150,
        cell: ({ getValue }) => standardizePercentage(getValue<number>(), 2),
      },
    ],
    [t],
  );

  const header = (
    <ValidatorTableHead>
      <HeaderEraToggleWrapper>
        <EraToggleButton
          type="button"
          onClick={() => setIsCurrentEra(true)}
          selected={isCurrentEra}>
          Current Era {currentEraId ?? ''}
        </EraToggleButton>
        <EraToggleButton
          type="button"
          selected={!isCurrentEra}
          onClick={() => setIsCurrentEra(false)}>
          Next Era {currentEraId ? currentEraId + 1 : ''}
        </EraToggleButton>
      </HeaderEraToggleWrapper>
      <HeaderPaginationWrapper>
        <HeadValue>
          {totalEraValidators} {t('total-rows')}
        </HeadValue>
        <NumberedPagination
          tableOptions={validatorsTableOptions}
          setTableOptions={setValidatorTableOptions}
          rowCountSelectOptions={rowCountSelectOptions}
          setIsTableLoading={setIsTableLoading}
          totalPages={totalPages}
          updatePageNum={updateValidatorPageNum}
        />
      </HeaderPaginationWrapper>
    </ValidatorTableHead>
  );

  const footer = useMemo(
    () => (
      <ValidatorsTableFooter>
        <NumberedPagination
          tableOptions={validatorsTableOptions}
          setTableOptions={setValidatorTableOptions}
          rowCountSelectOptions={rowCountSelectOptions}
          setIsTableLoading={setIsTableLoading}
          totalPages={totalPages}
          updatePageNum={updateValidatorPageNum}
          removeRowsSelect
        />
      </ValidatorsTableFooter>
    ),
    [
      validatorsTableOptions,
      totalPages,
      setIsTableLoading,
      rowCountSelectOptions,
    ],
  );

  const onSortingChange: OnChangeFn<SortingState> = updaterOrValue => {
    setIsTableLoading(true);

    if (updaterOrValue instanceof Function) {
      const [updatedVal] = updaterOrValue([
        {
          id: validatorsTableOptions.sorting.sortBy,
          desc: validatorsTableOptions.sorting.order === 'desc',
        },
      ]);

      let order: 'desc' | 'asc' = 'desc';
      if (validatorsTableOptions.sorting.sortBy === updatedVal.id) {
        order = updatedVal.desc ? 'desc' : 'asc';
      }

      dispatch(
        updateValidatorSorting({
          sortBy: updatedVal.id,
          order,
        }),
      );
    }
  };

  return (
    <Table<ApiData.ValidatorsInfo>
      header={header}
      columns={columns}
      data={isCurrentEra ? currentEraValidators : nextEraValidators}
      footer={footer}
      tableBodyLoading={isTableLoading || isPageLoading}
      currentPageSize={validatorsTableOptions.pagination.pageSize}
      sorting={[
        {
          id: validatorsTableOptions.sorting.sortBy,
          desc: validatorsTableOptions.sorting.order === 'desc',
        },
      ]}
      onSortingChange={onSortingChange}
      placeholderData={{}}
      isLastPage={totalPages === validatorsTableOptions.pagination.pageNum}
    />
  );
};

const ValidatorTableHead = styled.div`
  display: flex;
  flex-direction: column;
  min-width: ${pxToRem(800)};
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.text.secondary};
`;

const HeadValue = styled.p`
  color: ${props => props.theme.text.secondary};
`;

const HeaderPaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderEraToggleWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  padding-bottom: 1rem;

  @media (min-width: ${defaultTheme.breakpoints.lg}) {
    justify-content: center;
  }
`;

export const EraToggleButton = styled(Button)<{ selected: boolean }>`
  border-style: none;
  background: ${({ selected, theme }) =>
    selected ? theme.button : theme.background.secondary};
  color: ${({ selected, theme }) =>
    selected ? theme.text.contrast : theme.text.primary};
  width: ${pxToRem(208)};
  height: ${pxToRem(38)};

  &:hover {
    cursor: pointer;
    background: ${({ selected, theme }) =>
      selected ? theme.button : theme.background.secondary};
  }
`;

const CSPRText = styled.span`
  font-family: ${DEFAULT_SECONDARY_FONT_FAMILIES};
`;

const ValidatorsTableFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: ${pxToRem(20)} 1.5rem;
  min-width: ${pxToRem(450)};

  @media (min-width: ${defaultTheme.breakpoints.lg}) {
    justify-content: flex-end;
    padding: ${pxToRem(20)} 2rem;
  }
`;

const HashAndCopyToClipboardWrapper = styled.div`
  white-space: nowrap;
`;

const StyledHashLink = styled(Link)`
  color: ${props => props.theme.text.hash};
`;
