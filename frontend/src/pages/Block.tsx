import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppWidth, useBlock } from '../hooks';
import {
  BlockDetailsCard,
  MobileBlockDetailsCard,
  PageHead,
  PageWrapper,
} from '../components';

export const BlockPage: React.FC = () => {
  const { id: blockHashOrHeight } = useParams();
  const { t } = useTranslation();
  const {
    data: block,
    isLoading,
    error: blockError,
  } = useBlock({
    blockHashOrHeight: blockHashOrHeight || '',
  });

  const { isMobile } = useAppWidth();

  const error = useMemo(() => {
    if (blockError) return { message: blockError.response?.statusText || '' };
  }, [blockError]);

  const pageTitle = `${t('block-details')}`;

  return (
    <PageWrapper error={error} isLoading={isLoading}>
      <PageHead pageTitle={pageTitle} />
      {!isMobile && !isLoading && block && <BlockDetailsCard block={block} />}
      {isMobile && !isLoading && block && (
        <MobileBlockDetailsCard block={block} />
      )}
    </PageWrapper>
  );
};
