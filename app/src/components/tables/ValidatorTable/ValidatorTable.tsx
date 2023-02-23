import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { ColumnDef } from '@tanstack/react-table';
import { colors, pxToRem } from 'src/styled-theme';
import { ValidatorWeight } from 'casper-js-sdk';
import {
  getTotalEraValidators,
  getValidatorsTableOptions,
  setValidatorTableOptions,
  updateValidatorPageNum,
  useAppSelector,
} from 'src/store';
import { SelectOptions } from 'src/components/layout/Header/Partials';
import { Table } from '../../base';
import { NumberedPagination } from '../Pagination';

const rowCountSelectOptions: SelectOptions[] | null = [
  { value: '5', label: '5 rows' },
  { value: '10', label: '10 rows' },
  { value: '20', label: '20 rows' },
];

interface ValidatorTableProps {
  readonly validators: ValidatorWeight[];
  isTableLoading: boolean;
  setIsTableLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ValidatorTable: React.FC<ValidatorTableProps> = ({
  validators,
  isTableLoading,
  setIsTableLoading,
}) => {
  const { t } = useTranslation();

  const validatorsTableOptions = useAppSelector(getValidatorsTableOptions);
  const totalEraValidators = useAppSelector(getTotalEraValidators);

  console.log({ validatorsTableOptions });
  console.log({ totalEraValidators });

  const totalPages = useMemo(() => {
    return Math.ceil(
      totalEraValidators / validatorsTableOptions.pagination.pageSize,
    );
  }, [validatorsTableOptions, totalEraValidators]);

  const columns = useMemo<ColumnDef<ValidatorWeight>[]>(
    () => [
      {
        header: `${t('public-key')}`,
        accessorKey: 'public_key',
        enableSorting: false,
      },
      {
        header: `${t('weight')}`,
        accessorKey: 'weight',
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
    <Table<ValidatorWeight>
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
