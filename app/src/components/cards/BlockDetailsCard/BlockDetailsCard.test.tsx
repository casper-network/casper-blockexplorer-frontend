import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../../test-utils';
import { getMockBlock } from '../../../mocks/mock-block';
import { BlockDetailsCard } from './BlockDetailsCard';

const mockBlock = getMockBlock();

const mockedUseNavigate = jest.fn();

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('BlockDetailsCard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the BlockDetailsCard', () => {
    render(<BlockDetailsCard block={mockBlock} isLoading={false} />);
    const blockDetailsCard = screen.getByTestId('block-details-card');

    expect(blockDetailsCard).toBeInTheDocument();
  });

  it('should render skeleton loaders for card details ', () => {
    render(<BlockDetailsCard block={mockBlock} isLoading />);
    const skeletonLoaders = screen.getAllByTestId('skeleton-loader');

    expect(skeletonLoaders.length).toEqual(11);
  });

  it('should render the BaseCard Component', () => {
    render(<BlockDetailsCard block={mockBlock} isLoading={false} />);
    const baseCard = screen.getByTestId('base-card');
    const baseCardBody = screen.getByTestId('base-card-body');

    expect(baseCard).toBeInTheDocument();
    expect(baseCard).toContainElement(baseCardBody);
  });

  it('should render the BaseCard body content', () => {
    render(<BlockDetailsCard block={mockBlock} isLoading={false} />);
    const { hash, header, body } = mockBlock;

    const baseCardBody = screen.getByTestId('base-card-body');
    const blockHeight = screen.getByTestId('block-height');
    const currentEra = screen.getByTestId('current-era');
    const timestamp = screen.getByTestId('timestamp');
    const parentHash = screen.getByRole('link', {
      name: `${header.parent_hash}`,
    });
    const blockHash = screen.getByTestId('block-hash');
    const stateRootHash = screen.getByTestId('state-root-hash');
    const validator = screen.getByRole('link', {
      name: `${body.proposer}`,
    });

    expect(baseCardBody).toBeInTheDocument();

    expect(baseCardBody).toHaveTextContent('Block Height');
    expect(blockHeight).toHaveTextContent(header.height.toString());
    expect(baseCardBody).toHaveTextContent('Current Era');
    expect(currentEra).toHaveTextContent(header.era_id.toString());
    expect(baseCardBody).toHaveTextContent('Timestamp');
    expect(timestamp).toHaveTextContent(header.timestamp);
    expect(baseCardBody).toHaveTextContent('Parent Hash');
    expect(parentHash).toHaveTextContent(header.parent_hash);
    expect(baseCardBody).toHaveTextContent('Block Hash');
    expect(blockHash).toHaveTextContent(hash);
    expect(baseCardBody).toHaveTextContent('State Root Hash');
    expect(stateRootHash).toHaveTextContent(header.state_root_hash);
    expect(baseCardBody).toHaveTextContent('Validator');
    expect(validator).toHaveTextContent(body.proposer);
    expect(baseCardBody).toHaveTextContent('Raw Data');
    expect(baseCardBody).toHaveTextContent('Deploys');
    expect(baseCardBody).toHaveTextContent('Transfers');
  });

  it('should ensure that links direct users with appropriate url paths ', () => {
    render(<BlockDetailsCard block={mockBlock} isLoading={false} />);
    const { header, body } = mockBlock;

    const parentHash = screen.getByRole('link', {
      name: `${header.parent_hash}`,
    });
    const validator = screen.getByRole('link', {
      name: `${body.proposer}`,
    });

    userEvent.click(parentHash);
    userEvent.click(validator);

    expect(parentHash).toHaveAttribute('href', `/block/${header.parent_hash}`);
    expect(validator).toHaveAttribute('href', `/account/${body.proposer}`);
  });

  it('should navigate to /block/:id on click', () => {
    render(<BlockDetailsCard block={mockBlock} isLoading={false} />);
    const { header } = mockBlock;

    const parentHash = screen.getByRole('link', {
      name: `${header.parent_hash}`,
    });

    userEvent.click(parentHash);

    expect(mockedUseNavigate).toHaveBeenCalledWith(
      `/block/${header.parent_hash}`,
    );
  });

  it('should  navigate to /account/:id on click', () => {
    render(<BlockDetailsCard block={mockBlock} isLoading={false} />);
    const { body } = mockBlock;

    const validator = screen.getByRole('link', {
      name: `${body.proposer}`,
    });

    userEvent.click(validator);

    expect(mockedUseNavigate).toHaveBeenCalledWith(`/account/${body.proposer}`);
  });
});
