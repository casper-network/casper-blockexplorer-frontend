import React from 'react';
import { useTranslation } from 'react-i18next';
import useAsyncEffect from 'use-async-effect';

import { BlockTable, GradientHeading, PageWrapper } from '../components';

import {
  getBlocks,
  getBlockLoadingStatus,
  useAppDispatch,
  useAppSelector,
  Loading,
  fetchBlocks,
} from '../store';

export const Blocks: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const blocks = useAppSelector(getBlocks);
  const blockLoadingStatus = useAppSelector(getBlockLoadingStatus);

  const isLoading = blockLoadingStatus !== Loading.Complete;

  useAsyncEffect(async () => {
    if (blockLoadingStatus === Loading.Idle) {
      dispatch(fetchBlocks());
    }
  }, []);

  return (
    <PageWrapper isLoading={isLoading}>
      <GradientHeading type="h2">{t('blocks')}</GradientHeading>
      <BlockTable blocks={blocks} />
    </PageWrapper>
  );
};
