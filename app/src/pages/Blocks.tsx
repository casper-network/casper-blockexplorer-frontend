import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageWrapper, PageHead, BlocksTable } from 'src/components';
import { PageTableHeader } from '../components/layout/Header/Header.styled';

export const Blocks: React.FC = () => {
  const { t } = useTranslation();

  const pageTitle = `${t('blocks')}`;

  return (
    <PageWrapper isLoading={false}>
      <PageHead pageTitle={pageTitle} />
      <PageTableHeader>{t('blocks')}</PageTableHeader>
      <BlocksTable
      // total={totalBlocks}
      // blocks={blocks}
      // isTableLoading={isTableLoading || isLoadingPage}
      // sorting={[
      //   {
      //     id: blocksTableOptions.sorting.sortBy,
      //     desc: blocksTableOptions.sorting.order === 'desc',
      //   },
      // ]}
      // onSortingChange={() => {
      //   setIsTableLoading(true);
      //   dispatch(
      //     updateBlocksSorting({
      //       sortBy: 'height',
      //       order:
      //         blocksTableOptions.sorting.order === 'desc' ? 'asc' : 'desc',
      //     }),
      //   );
      // }}
      // setIsTableLoading={setIsTableLoading}
      // initialSorting={initialSorting}
      />
    </PageWrapper>
  );
};
