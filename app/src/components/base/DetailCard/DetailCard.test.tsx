import React from 'react';
import { render } from '../../../test-utils';
import { DetailCard } from './DetailCard';

const mockRows = [
  { key: 1, detailKey: 'Detail Key 1', value: 'Value 1' },
  { key: 2, detailKey: 'Detail Key 2', value: 'Value 2' },
  { key: 3, detailKey: 'Detail Key 3', value: 'Value 3' },
  { key: 4, detailKey: 'Detail Key 4', value: 'Value 4' },
  { key: 5, detailKey: 'Detail Key 5', value: 'Value 5' },
];

describe.skip(DetailCard, () => {
  it('should render 5 rows if given 5 rows', () => {
    const { getByTestId } = render(<DetailCard rows={mockRows} />);

    const fifthRow = getByTestId(5);

    expect(fifthRow).toBeInTheDocument();
  });

  it('should render detail key content', () => {
    const { getByText } = render(<DetailCard rows={mockRows} />);

    const detailKeyFive = getByText('Detail Key 5');

    expect(detailKeyFive).toBeInTheDocument();
  });

  it('should render row value content', () => {
    const { getByText } = render(<DetailCard rows={mockRows} />);

    const valueFive = getByText('Value 5');

    expect(valueFive).toBeInTheDocument();
  });
});
