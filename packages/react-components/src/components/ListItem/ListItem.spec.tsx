import { render } from 'test-utils';

import { ListItem } from './ListItem';
import { ListItemProps } from './types';

const defaultProps = {
  leftNode: <div>Left node</div>,
  rightNode: <div>Right node</div>,
};

const renderComponent = (props: ListItemProps) => {
  return render(<ListItem {...props}>List item</ListItem>);
};

describe('<ListItem> component', () => {
  it('should render given elements', () => {
    const { getByText } = renderComponent(defaultProps);

    expect(getByText('List item')).toBeInTheDocument();
    expect(getByText('Left node')).toBeInTheDocument();
    expect(getByText('Right node')).toBeInTheDocument();
  });
});
