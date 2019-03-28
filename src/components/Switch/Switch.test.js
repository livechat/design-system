import * as React from 'react';
import { shallow } from 'enzyme';
import Switch from './Switch';

describe('Switch', () => {
  it('should render basic Switch', () => {
    const component = shallow(<Switch />);

    expect(component).toMatchSnapshot();
  });

  it('should call on toggle when clicked', () => {
    const toggleFn = jest.fn();
    const component = shallow(<Switch onToggle={toggleFn} />);
    component.simulate('click');
    expect(toggleFn).toHaveBeenCalled();
  });
});
