import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { ColumnDef } from '@tanstack/react-table';
import { colors, pxToRem } from 'src/styled-theme';
import {
  getTotalEraValidators,
  getValidatorsTableOptions,
  setValidatorTableOptions,
  updateValidatorPageNum,
  useAppSelector,
} from 'src/store';
import { truncateHash } from 'src/utils';
import { ApiData } from 'src/api/types';
import { SelectOptions } from 'src/components/layout/Header/Partials';
import { Table } from '../../base';
import { NumberedPagination } from '../Pagination';

interface ValidatorTableProps {
  readonly validators: ApiData.ValidatorsInfo[];
  isTableLoading: boolean;
  setIsTableLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ValidatorTable: React.FC<ValidatorTableProps> = ({
  validators,
  isTableLoading,
  setIsTableLoading,
}) => {
  const { t } = useTranslation();

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

  const validatorsTableOptions = useAppSelector(getValidatorsTableOptions);
  const totalEraValidators = useAppSelector(getTotalEraValidators);

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
        cell: ({ getValue }) => truncateHash(getValue<string>()),
      },
      {
        header: `${t('fee-percentage')}`,
        accessorKey: 'feePercentage',
        enableSorting: false,
      },
      {
        header: `${t('delegators')}`,
        accessorKey: 'delegatorsCount',
        enableSorting: false,
      },
      {
        header: `${t('total-stake')}`,
        accessorKey: 'totalStakeCspr',
        enableSorting: false,
      },
      {
        header: `${t('self-percentage')}`,
        accessorKey: 'selfPercentage',
        enableSorting: false,
      },
      {
        header: `${t('network-percentage')}`,
        accessorKey: 'percentageOfNetwork',
        enableSorting: false,
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

  return (
    <Table<ApiData.ValidatorsInfo>
      header={header}
      columns={columns}
      data={validators}
      footer={<ValidatorFooter />}
      tableBodyLoading={isTableLoading}
      currentPageSize={validatorsTableOptions.pagination.pageSize}
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
