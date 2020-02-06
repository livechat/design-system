import * as React from 'react';
import { shallow } from 'enzyme';
import Badge from './Badge';

describe('Badge', () => {
  it('should render primary badge', () => {
    const component = shallow(<Badge>!</Badge>);

    expect(component).toMatchSnapshot();
  });

  it('should render secondary badge', () => {
    const component = shallow(<Badge secondary>!</Badge>);

    expect(component).toMatchSnapshot();
  });
});
