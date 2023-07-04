import React from 'react';
import { render } from '../../../test-utils';
import { PageWrapper } from './PageWrapper';

describe(PageWrapper, () => {
  it('should render loader when page is loading', () => {
    const { getByTestId } = render(
      <PageWrapper isLoading>Content</PageWrapper>,
    );

    const loader = getByTestId('loader');

    expect(loader).toBeInTheDocument();
  });

  it('should render error content when error occurred', () => {
    const { getByTestId } = render(
      <PageWrapper error={{ message: 'error message' }}>Content</PageWrapper>,
    );

    const errorContent = getByTestId('error-content');

    expect(errorContent).toBeInTheDocument();
    expect(errorContent.textContent).toContain('error message');
  });

  it('should render children when done loading & no error', () => {
    const { getByTestId } = render(
      <PageWrapper>
        <p data-testid="children-content">Content</p>
      </PageWrapper>,
    );

    const pageContent = getByTestId('children-content').textContent;

    expect(pageContent).toBe('Content');
  });
});
