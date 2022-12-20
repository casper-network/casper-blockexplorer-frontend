import React, { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { casperApi, Block } from '../api';
import { useAppWidth } from '../hooks';
import {
  BlockDetailsCard,
  MobileBlockDetailsCard,
  PageError,
  PageWrapper,
} from '../components';

const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};

export const BlockPage: React.FC = () => {
  const { id: blockIdentifier } = useParams();
  const query = useQuery();

  const { t } = useTranslation();

  const [block, setBlock] = useState<Block>();
  const [error, setError] = useState<PageError>();

  const { isMobile } = useAppWidth();

  // TODO: Get rid of this 'magic string'
  const isHashIdentifier = query.get('type') !== 'height';

  useAsyncEffect(async () => {
    if (blockIdentifier) {
      try {
        const blockData = isHashIdentifier
          ? await casperApi.getBlock(blockIdentifier)
          : await casperApi.getBlockByHeight(parseInt(blockIdentifier, 10));

        if (!blockData) {
          setError({
            message: `${t('unable-to-locate-block')} ${
              isHashIdentifier ? t('hash') : t('height')
            } ${blockIdentifier}`,
          });
          return;
        }

        setBlock(blockData);
      } catch (err: any) {
        setError({
          message: (err as Error).message,
        });
      }
    }
  }, [blockIdentifier]);

  const isLoading = !block;

  return (
    <PageWrapper error={error} isLoading={isLoading}>
      {!isMobile && !isLoading && blockIdentifier && (
        <BlockDetailsCard block={block} />
      )}
      {isMobile && !isLoading && blockIdentifier && (
        <MobileBlockDetailsCard block={block} />
      )}
    </PageWrapper>
  );
};
