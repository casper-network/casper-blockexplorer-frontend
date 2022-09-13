import React from 'react';
import useAsyncEffect from 'use-async-effect';

import { BlockTable, Loader } from '../components';

import {
  getBlocks,
  getBlockLoadingStatus,
  useAppDispatch,
  useAppSelector,
  Loading,
  fetchBlocks,
} from '../store';

const Blocks: React.FC = () => {
  const dispatch = useAppDispatch();

  const blocks = useAppSelector(getBlocks);
  const blockLoadingStatus = useAppSelector(getBlockLoadingStatus);

  const isLoading = blockLoadingStatus !== Loading.Complete;

  useAsyncEffect(async () => {
    if (Loading.Idle === blockLoadingStatus) {
      dispatch(fetchBlocks());
    }
  }, []);

  return (
    <div>
      <div className="px-20 py-20">
        <h2 className="text-24 mb-25">Blocks</h2>
        {isLoading ? <Loader /> : <BlockTable blocks={blocks} showValidators />}
      </div>
    </div>
  );
};

export const Home: React.FC = () => {
  return (
    <div>
      <div>
        <Blocks />
      </div>
    </div>
  );
};
