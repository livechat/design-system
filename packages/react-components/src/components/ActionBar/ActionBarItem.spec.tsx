import * as React from 'react';

import { vi } from 'vitest';

import { render, userEvent, waitFor } from 'test-utils';

import { ActionBarItem } from './ActionBarItem';
import { IActionBarItem } from './types';

const defaultProps = {
  id: 'one',
  option: {
    key: 'one',
    element: <div>One</div>,
    label: 'One test',
    onClick: vi.fn(),
  },
  isHidden: false,
};

const renderComponent = (props: IActionBarItem) => {
  return render(<ActionBarItem {...props} />);
};

describe('<ActionBarItem> component', () => {
  it('should render', () => {
    const { getByRole } = renderComponent(defaultProps);

    expect(getByRole('button', { name: 'One' })).toBeVisible();
  });

  it('should call defined onClick function on button click', () => {
    const onClick = defaultProps.option.onClick;
    const { getByRole } = renderComponent(defaultProps);

    userEvent.click(getByRole('button', { name: 'One' }));
    expect(onClick).toHaveBeenCalled();
  });

  it('should render button with title attribute if showTooltip prop is not given', () => {
    const { getByRole } = renderComponent(defaultProps);

    expect(getByRole('button', { name: 'One' })).toHaveAttribute(
      'title',
      'One test'
    );
  });

  it('should show tooltip on button hover if showTooltip prop is given', async () => {
    const { getByRole, getByText } = renderComponent({
      ...defaultProps,
      option: {
        ...defaultProps.option,
        showTooltip: true,
      },
    });
    const button = getByRole('button', { name: 'One' });

    userEvent.hover(button);
    await waitFor(() => {
      expect(getByText('One test')).toBeVisible();
    });
  });
});
