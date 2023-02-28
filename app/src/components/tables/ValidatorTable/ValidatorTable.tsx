import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { ColumnDef, OnChangeFn, SortingState } from '@tanstack/react-table';
import { colors, pxToRem } from 'src/styled-theme';
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
      },
      {
        header: `${t('public-key')}`,
        accessorKey: 'publicKey',
        enableSorting: false,
        cell: ({ getValue }) => (
          <div>
            <Link
              to={{
                pathname: `/account/${getValue<string>()}`,
              }}>
              {truncateHash(getValue<string>())}
            </Link>
            <CopyToClipboard textToCopy={getValue<string>()} />
          </div>
        ),
      },
      {
        header: `${t('fee-percentage')}`,
        accessorKey: 'feePercentage',
        cell: ({ getValue }) =>
          `${getValue<number>().toLocaleString('en', {
            useGrouping: false,
            minimumFractionDigits: 2,
          })}%`,
      },
      {
        header: `${t('delegators')}`,
        accessorKey: 'delegatorsCount',
        cell: ({ getValue }) => standardizeNumber(getValue<number>()),
      },
      {
        header: `${t('total-stake')}`,
        accessorKey: 'totalStakeMotes',
        cell: ({ getValue }) => (
          <CSPRText>
            {/* TODO: use BigNumber.js library here? */}
            {standardizeNumber((getValue<number>() / 10 ** 9).toFixed(0))} CSPR
          </CSPRText>
        ),
      },
      {
        header: `${t('self-percentage')}`,
        accessorKey: 'selfPercentage',
        cell: ({ getValue }) =>
          `${getValue<number>().toLocaleString('en', {
            useGrouping: false,
            minimumFractionDigits: 2,
          })}%`,
      },
      {
        header: `${t('network-percentage')}`,
        accessorKey: 'percentageOfNetwork',
        cell: ({ getValue }) =>
          `${getValue<number>().toLocaleString('en', {
            useGrouping: false,
            minimumFractionDigits: 2,
          })}%`,
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

  const onSortingChange: OnChangeFn<SortingState> = updaterOrValue => {
    setIsTableLoading(true);
    if (updaterOrValue instanceof Function) {
      const [updatedVal] = updaterOrValue([
        {
          id: validatorsTableOptions.sorting.sortBy,
          desc: validatorsTableOptions.sorting.order === 'desc',
        },
      ]);

      dispatch(
        updateValidatorSorting({
          sortBy: updatedVal.id,
          order: updatedVal.desc ? 'desc' : 'asc',
        }),
      );
    }
  };

  return (
    <Table<ApiData.ValidatorsInfo>
      header={header}
      columns={columns}
      data={validators}
      footer={<ValidatorFooter />}
      tableBodyLoading={isTableLoading || isPageLoading}
      currentPageSize={validatorsTableOptions.pagination.pageSize}
      sorting={[
        {
          id: validatorsTableOptions.sorting.sortBy,
          desc: validatorsTableOptions.sorting.order === 'desc',
        },
      ]}
      onSortingChange={onSortingChange}
    />
  );
};

const ValidatorTableHead = styled.div`
  display: flex;
  min-width: ${pxToRem(900)};
  justify-content: space-between;
  align-items: center;
  color: ${colors.darkSupporting};
`;

const ValidatorFooter = styled.div`
  height: ${pxToRem(50)};
`;

const HeadValue = styled.p`
  color: ${colors.darkSupporting};
`;

const CSPRText = styled.span`
  font-family: ${DEFAULT_SECONDARY_FONT_FAMILIES};
`;
