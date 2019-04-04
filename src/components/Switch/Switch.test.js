import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Switch from './Switch';

describe('Switch', () => {
  it('should render basic Switch', () => {
    const component = shallow(<Switch />);

    expect(component).toMatchSnapshot();
  });

  it('should call on toggle when clicked', () => {
    const toggleFn = jest.fn();
    const component = mount(<Switch onToggle={toggleFn} />);
    const checkbox = component.find('input[type="checkbox"]');
    checkbox.simulate('change');
    expect(toggleFn).toHaveBeenCalled();
  });
});
