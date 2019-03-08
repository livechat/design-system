import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import AlertCircleIcon from 'react-material-icon-svg/dist/AlertCircleIcon';
import DropdownList from './DropdownList';
import { KeyCodes } from '../../constants/keyCodes';

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

describe('Archives | Components | FiltersMenu', () => {
  let items;

  beforeEach(() => {
    items = generateItems(4);
  });

  it('renders correctly', () => {
    const renderer = new ShallowRenderer();
    const component = renderer.render(<DropdownList items={items} />);

    expect(component).toMatchSnapshot();
  });

  it('should add/remove document event listeners on mount, update and unmount', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const component = shallow(<DropdownList items={items} />);

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);

    const arrowUpEvent = new KeyboardEvent('keydown', {
      keyCode: KeyCodes.arrowUp
    });
    document.dispatchEvent(arrowUpEvent);

    component.unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
  });
});
