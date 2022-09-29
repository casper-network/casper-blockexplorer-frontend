/* eslint-disable @typescript-eslint/no-array-constructor */
import React from 'react';
import { createMockBlocks, render, waitFor } from '../../test-utils';
import { Home } from '../Home';
import { casperApi } from '../../api';

describe(Home, () => {
  it('should render page title', async () => {
    const getBlocks = jest
      .spyOn(casperApi, 'getBlocks')
      .mockImplementation(async () => {
        return createMockBlocks();
      });

    const { findByTestId } = render(<Home />);

    await waitFor(() => expect(getBlocks).toHaveBeenCalled());

    const pageTitle = await findByTestId('page-title');

    expect(pageTitle).toBeInTheDocument();
  });
});
