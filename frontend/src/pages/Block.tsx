import React, { useMemo } from 'react';

import { useParams } from 'react-router-dom';
import { useAppWidth, useBlock } from '../hooks';
import {
  BlockDetailsCard,
  MobileBlockDetailsCard,
  PageWrapper,
} from '../components';

export const BlockPage: React.FC = () => {
  const { id: blockHashOrHeight } = useParams();

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

  return (
    <PageWrapper error={error} isLoading={isLoading}>
      {!isMobile && !isLoading && block && <BlockDetailsCard block={block} />}
      {isMobile && !isLoading && block && (
        <MobileBlockDetailsCard block={block} />
      )}
    </PageWrapper>
  );
};
