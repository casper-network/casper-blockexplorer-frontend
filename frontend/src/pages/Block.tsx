import React, { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { useParams, useLocation } from 'react-router-dom';
import { Block } from '../types';
import { truncateHash } from '../utils';
import { BlockDetailsCard, PageError, PageWrapper } from '../components';
import { casperApi } from '../api';

const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};

export const BlockPage: React.FC = () => {
  const { id: blockIdentifier } = useParams();
  const query = useQuery();

  const [block, setBlock] = useState<Block>();
  const [error, setError] = useState<PageError>();

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
            message: `We were unable to locate block data for ${
              isHashIdentifier ? 'hash' : 'height'
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
      {!isLoading && blockIdentifier && (
        <>
          <div className="w-full text-black mb-24">
            <h2 className="text-24 mb-16">
              Block:{' '}
              <span className="tracking-2 font-normal">
                {truncateHash(block.hash)}
              </span>
            </h2>
          </div>
          <BlockDetailsCard block={block} />
        </>
      )}
    </PageWrapper>
  );
};
