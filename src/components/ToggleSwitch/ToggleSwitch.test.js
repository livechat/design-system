import * as React from 'react';
import { shallow } from 'enzyme';
import ToggleSwitch from './ToggleSwitch';

describe('ToggleSwitch', () => {
  it('should render basic ToggleSwitch', () => {
    const component = shallow(<ToggleSwitch />);

    expect(component).toMatchSnapshot();
  });

  it('should call on toggle when clicked', () => {
    const toggleFn = jest.fn();
    const component = shallow(<ToggleSwitch onToggle={toggleFn} />);
    component.simulate('click');
    expect(toggleFn).toHaveBeenCalled();
  });
});
