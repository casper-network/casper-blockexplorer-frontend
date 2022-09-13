import React, { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { useParams } from 'react-router-dom';
import { Block } from '../types';
import { truncateHash } from '../utils';
import { BlockDetailsCard, Loader } from '../components';
import { casperApi } from '../api';

export const BlockPage: React.FC = () => {
  const { id: blockHash } = useParams();

  const [block, setBlock] = useState<Block>();
  const [error, setError] = useState<boolean>(false);

  useAsyncEffect(async () => {
    if (blockHash) {
      const blockData = await casperApi.getBlock(blockHash);

      if (!blockData) {
        setError(true);
        return;
      }

      setBlock(blockData);
    }
  }, [blockHash]);

  if (!blockHash) {
    return (
      <div className=" w-full px-48 my-24">
        <div className="w-full max-w-1200">
          <h2 className="text-24 mb-8">Whoops! Something went wrong!</h2>
          <p>Please check if your url includes a block hash.</p>
        </div>
      </div>
    );
  }

  if (!block) {
    return (
      <div className="w-full h-[75vh] px-48 mt-24">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-48 my-24">
        <div className="w-full max-w-1200">
          <h2 className="text-24 mb-8">Whoops! Something went wrong!</h2>
          <p>We were unable to fetch block with hash:</p>
          <h3>{blockHash}</h3>
        </div>
      </div>
    );
  }

  const truncatedBlockHash = truncateHash(blockHash);

  return (
    <div className="w-full h-[75vh] px-48 mt-24">
      <div className="w-full max-w-1200">
        <div className="w-full text-black mb-24">
          <h2 className="text-24 mb-16">
            Block:{' '}
            <span className="tracking-2 font-normal">{truncatedBlockHash}</span>
          </h2>
        </div>
        <BlockDetailsCard block={block} />
      </div>
    </div>
  );
};
