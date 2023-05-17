import React from 'react';
import { render } from '../../../test-utils';
import { screen } from '@testing-library/react';
import { BlockDetailsCard } from './BlockDetailsCard';

jest.mock('react-i18next', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const englishTranslations = jest.requireActual(
    '../../../../public/locales/en/translation.json',
  );

  return {
    useTranslation: () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return { t: (key: string) => englishTranslations[key] };
    },
  };
});

const getMockBlock = () => ({
  hash: 'cc834d21631386f662c71340c280247408659d0daaeadec1db2c9d71068aa859',
  header: {
    parent_hash:
      '63fe8e857de5a2373c28bb99cd724577501de6503c436b54cd5f7c897d2357f3',
    state_root_hash:
      '742757f17899de99826e48257a144871bfe07654babc595c2ae37d60c8deea91',
    body_hash:
      '8838601f62413e9ff9144f52fda4a6d0b5c7152fe2f3f1cd1b7732794db9ef99',
    random_bit: true,
    accumulated_seed:
      '"5e843ced915f4324fb885e8ff15f791434acf950cac1f2d2c9c0adaf336d23fd"',
    era_end: null,
    timestamp: '2023-05-17T18:37:13.088Z',
    era_id: 9309,
    height: 1742904,
    protocol_version: '1.4.15',
  },
  body: {
    proposer:
      '0138e64f04c03346e94471e340ca7b94ba3581e5697f4d1e59f5a31c0da720de45',
    deploy_hashes: [],
    transfer_hashes: [],
  },
  proofs: [],
});

describe('BlockDetailsCard', () => {
  it('should render the BlockDetailsCard', () => {
    render(<BlockDetailsCard block={getMockBlock()} isLoading={false} />);
    const blockDetailsCard = screen.getByTestId('block-details-card');

    expect(blockDetailsCard).toBeInTheDocument();
  });

  it('should render skeleton loaders for card details ', () => {
    render(<BlockDetailsCard block={getMockBlock()} isLoading />);
    const skeletonLoaders = screen.getAllByTestId('skeleton-loader');

    expect(skeletonLoaders.length).toEqual(11);
  });

  it('should render the BaseCard Component', () => {
    render(<BlockDetailsCard block={getMockBlock()} isLoading={false} />);
    const baseCard = screen.getByTestId('baseCard');
    const baseCardBody = screen.getByTestId('baseCardBody');

    expect(baseCard).toBeInTheDocument();
    expect(baseCard).toContainElement(baseCardBody);
  });

  it('should render the BaseCard body content', async () => {
    render(<BlockDetailsCard block={getMockBlock()} isLoading={false} />);
    const { hash, header, body } = getMockBlock();

    const baseCardBody = screen.getByTestId('baseCardBody');
    const blockHeight = screen.getByTestId('block-height');
    const currentEra = screen.getByTestId('current-era');
    const timestamp = screen.getByTestId('timestamp');
    const parentHash = screen.getByTestId('parent-hash');
    const blockHash = screen.getByTestId('block-hash');
    const stateRootHash = screen.getByTestId('state-root-hash');
    const validator = screen.getByTestId('validator');

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
});
