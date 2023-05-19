import React from 'react';
import { screen } from '@testing-library/react';
import { getMockDeploy, render } from '../../../test-utils';
import { DeployDetailsCard } from './DeployDetailsCard';

const mockDeploy = getMockDeploy();

describe('DeployDetailsCard', () => {
  it('should render DeployDetailsCard  ', () => {
    render(<DeployDetailsCard deploy={mockDeploy} isLoading={false} />);

    const deployDetailsCard = screen.getByTestId('deploy-details-card');

    expect(deployDetailsCard).toBeInTheDocument();
  });

  it('should render skeleton loaders for card details ', () => {
    render(<DeployDetailsCard deploy={mockDeploy} isLoading />);

    const skeletonLoaders = screen.getAllByTestId('skeleton-loader');

    expect(skeletonLoaders.length).toEqual(5);
  });

  it('should render deploy details ', () => {
    render(<DeployDetailsCard deploy={mockDeploy} isLoading={false} />);

    const blockHash = screen.getByTestId('block-hash');
    const publicKey = screen.getByTestId('public-key');
    const deploy = screen.getByTestId('deploy-hash');

    expect(blockHash).toHaveTextContent(mockDeploy.blockHash);
    expect(publicKey).toHaveTextContent(mockDeploy.publicKey);
    expect(deploy).toHaveTextContent(mockDeploy.deployHash);
  });
});
