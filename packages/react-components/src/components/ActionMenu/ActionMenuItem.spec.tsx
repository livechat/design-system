import * as React from 'react';

import { render } from 'test-utils';

import { ActionMenuItem } from './ActionMenuItem';
import { ActionMenuItemProps } from './types';

const defaultProps = {
  leftNode: <div>Left node</div>,
  rightNode: <div>Right node</div>,
};

const renderComponent = (props: ActionMenuItemProps) => {
  return render(<ActionMenuItem {...props}>Menu item</ActionMenuItem>);
};

describe('<ActionMenuItem> component', () => {
  it('should render given elements', () => {
    const { getByText } = renderComponent(defaultProps);

    expect(getByText('Menu item')).toBeInTheDocument();
    expect(getByText('Left node')).toBeInTheDocument();
    expect(getByText('Right node')).toBeInTheDocument();
  });
});
