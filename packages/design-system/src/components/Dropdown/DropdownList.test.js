import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import AlertCircleIcon from 'react-material-icon-svg/dist/AlertCircleIcon';
import DropdownList from './DropdownList';

const generateItems = (length = 10) =>
  Array.from(new Array(length), (_value, index) => ({
    itemId: index + 1,
    divider: index === 2,
    content: `Item ${index + 1}`,
    icon: <AlertCircleIcon height={16} width={16} fill="#4384f5" />,
    isSelected: index === 2,
    isDisabled: index === 0,
    onItemSelect: jest.fn()
  }));

describe('Components | DropdownList', () => {
  let items;

  beforeEach(() => {
    items = generateItems(4);
  });

  it('renders correctly four items with autofocused second item', () => {
    const renderer = new ShallowRenderer();
    const component = renderer.render(<DropdownList items={items} />);

    expect(component).toMatchSnapshot();
  });
});
