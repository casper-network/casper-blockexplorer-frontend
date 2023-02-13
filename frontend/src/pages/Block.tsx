import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  fetchBlock,
  getBlock,
  getBlockLoadingStatus,
  Loading,
  useAppDispatch,
  useAppSelector,
} from 'src/store';
import {
  BlockDetailsCard,
  MobileBlockDetailsCard,
  PageHead,
  PageWrapper,
} from '../components';
import { useAppWidth } from '../hooks';

export const BlockPage: React.FC = () => {
  const { id: blockHashOrHeight } = useParams();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBlock(blockHashOrHeight ?? ''));
  }, []);

  const block = useAppSelector(getBlock);
  const blockLoadingStatus = useAppSelector(getBlockLoadingStatus);

  const isLoading = blockLoadingStatus !== Loading.Complete;

  const { isMobile } = useAppWidth();

  const pageTitle = `${t('block-details')}`;

  return (
    <PageWrapper isLoading={isLoading}>
      <PageHead pageTitle={pageTitle} />
      {!isMobile && !isLoading && block && <BlockDetailsCard block={block} />}
      {isMobile && !isLoading && block && (
        <MobileBlockDetailsCard block={block} />
      )}
    </PageWrapper>
  );
};
