import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getMockDeploy, render } from '../../../test-utils';
import { DeployDetailsCard } from './DeployDetailsCard';

const mockDeploy = getMockDeploy();
const mockedUseNavigate = jest.fn();

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('DeployDetailsCard', () => {
  afterEach(() => {
    jest.clearAllMocks();
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

    userEvent.click(blockHashLink);
    expect(mockedUseNavigate).toHaveBeenCalledWith(
      `/block/${mockDeploy?.blockHash ?? ''}`,
    );
    userEvent.click(publicKeyLink);
    expect(mockedUseNavigate).toHaveBeenCalledWith(
      `/account/${mockDeploy?.publicKey ?? ''}`,
    );
  });
});
