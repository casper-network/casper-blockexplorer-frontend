/* eslint-disable @typescript-eslint/no-array-constructor */
import React from 'react';
import { createMockBlocks, render } from '../../test-utils';
import { Home } from '../Home';
import { casperApi } from '../../api';

describe(Home, () => {
  it('should render page title', async () => {
    jest.spyOn(casperApi, 'getBlocks').mockImplementation(async () => {
      return createMockBlocks();
    });

    const { findByTestId } = render(<Home />);

    const pageTitle = await findByTestId('page-title');

    expect(pageTitle).toBeInTheDocument();
  });

  it('should render 5 recent blocks if only 5 blocks exists', async () => {
    jest.spyOn(casperApi, 'getBlocks').mockImplementation(async () => {
      return createMockBlocks(5);
    });

    const { findByTestId } = render(<Home />);

    const fifthRow = await findByTestId('row-5');

    expect(fifthRow).toBeInTheDocument();
  });

  it('should render only 10 blocks if more than 10 blocks are in the store', async () => {
    jest.spyOn(casperApi, 'getBlocks').mockImplementation(async () => {
      return createMockBlocks(20);
    });

    const { findByTestId } = render(<Home />);

    const tenthRow = await findByTestId('row-10');

    expect(tenthRow).toBeInTheDocument();
  });
});
