import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import * as router from 'react-router';
import { getMockDeploy, render } from '../../../test-utils';
import { DeployDetailsCard } from './DeployDetailsCard';

const mockDeploy = getMockDeploy();
const navigate = jest.fn();

describe('DeployDetailsCard', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });
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

  it('Redirects to correct URL on click', () => {
    render(<DeployDetailsCard deploy={mockDeploy} isLoading={false} />);

    const blockHashLink = screen.getByTestId('block-hash-link');
    const publicKeyLink = screen.getByTestId('public-key-link');

    fireEvent.click(blockHashLink);
    expect(navigate).toHaveBeenCalledWith(
      `/block/${mockDeploy?.blockHash ?? ''}`,
    );
    fireEvent.click(publicKeyLink);
    expect(navigate).toHaveBeenCalledWith(
      `/account/${mockDeploy?.publicKey ?? ''}`,
    );
  });
});
