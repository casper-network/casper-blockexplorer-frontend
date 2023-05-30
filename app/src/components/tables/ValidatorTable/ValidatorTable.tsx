import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { ColumnDef, OnChangeFn, SortingState } from '@tanstack/react-table';
import { pxToRem } from 'casper-ui-kit';
import {
  fetchCurrentEraValidatorStatus,
  fetchValidators,
  getCurrentEraValidatorStatusStatus,
  getTotalEraValidators,
  getValidatorLoadingStatus,
  getValidators,
  getValidatorsTableOptions,
  Loading,
  setValidatorTableOptions,
  updateValidatorPageNum,
  updateValidatorSorting,
  useAppDispatch,
  useAppSelector,
} from 'src/store';
import { standardizeNumber, truncateHash } from 'src/utils';
import { ApiData } from 'src/api/types';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'src/components/utility';
import { SelectOptions } from 'src/components/layout/Header/Partials';
import { DEFAULT_SECONDARY_FONT_FAMILIES } from 'src/constants';
import { standardizePercentage } from 'src/utils/standardize-percentage';
import { Table } from '../../base';
import { NumberedPagination } from '../Pagination';

export const ValidatorTable: React.FC = () => {
  const [isTableLoading, setIsTableLoading] = useState(false);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const validators = useAppSelector(getValidators);
  const validatorsLoadingStatus = useAppSelector(getValidatorLoadingStatus);
  const validatorsStatusLoadingStatus = useAppSelector(
    getCurrentEraValidatorStatusStatus,
  );
  const validatorsTableOptions = useAppSelector(getValidatorsTableOptions);
  const totalEraValidators = useAppSelector(getTotalEraValidators);

  useEffect(() => {
    dispatch(fetchCurrentEraValidatorStatus());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchValidators(validatorsTableOptions));
  }, [dispatch, validatorsTableOptions]);

  useEffect(() => {
    if (isTableLoading) {
      setIsTableLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validators]);

  const isPageLoading =
    validatorsLoadingStatus !== Loading.Complete ||
    validatorsStatusLoadingStatus !== Loading.Complete ||
    !validators.length;

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
          <div>
            <StyledHashLink
              to={{
                pathname: `/account/${getValue<string>()}`,
              }}>
              {truncateHash(getValue<string>())}
            </StyledHashLink>
            <CopyToClipboard textToCopy={getValue<string>()} />
          </div>
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
      data={validators}
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
  min-width: ${pxToRem(825)};
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.text.secondary};
  height: ${pxToRem(42)};
`;

const HeadValue = styled.p`
  color: ${props => props.theme.text.secondary};
`;

const CSPRText = styled.span`
  font-family: ${DEFAULT_SECONDARY_FONT_FAMILIES};
`;

const ValidatorsTableFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: ${pxToRem(20)} 2rem;
`;

const StyledHashLink = styled(Link)`
  color: ${props => props.theme.text.hash};
`;
