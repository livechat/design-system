import * as React from 'react';
import { shallow } from 'enzyme';
import Switch from './Switch';

describe('Switch', () => {
  const toggleFn = jest.fn();

  it('should render basic Switch', () => {
    const component = shallow(<Switch onChange={toggleFn} />);

    expect(component).toMatchSnapshot();
  });

  it('should call on toggle when clicked', () => {
    const wrapper = shallow(<Switch onChange={toggleFn} />).dive();
    const checkbox = wrapper.find('input[type="checkbox"]');
    checkbox.simulate('change');
    expect(toggleFn).toHaveBeenCalled();
  });
});
