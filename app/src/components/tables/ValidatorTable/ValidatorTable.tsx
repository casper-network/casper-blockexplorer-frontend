import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { ColumnDef } from '@tanstack/react-table';
import { colors, fontWeight } from 'src/styled-theme';
import { ValidatorWeight } from 'casper-js-sdk';
import { Table } from '../../base';

interface ValidatorTableProps {
  readonly validators: ValidatorWeight[];
}

export const ValidatorTable: React.FC<ValidatorTableProps> = ({
  validators,
}) => {
  const { t } = useTranslation();
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
      <HeadLabel>{t('currently-online')}</HeadLabel>
      <HeadValue>
        {validators.length} {t('total-rows')}
      </HeadValue>
    </ValidatorTableHead>
  );

  return (
    <Table<ValidatorWeight>
      header={header}
      columns={columns}
      data={validators}
    />
  );
};

const ValidatorTableHead = styled.div`
  display: flex;
`;

const HeadLabel = styled.p`
  color: ${colors.black};
  font-weight: ${fontWeight.bold};
  padding-right: 2rem;
`;

const HeadValue = styled.p`
  color: ${colors.lightSupporting};
`;
