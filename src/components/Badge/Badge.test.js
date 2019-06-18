import * as React from 'react';
import { shallow } from 'enzyme';
import Badge from './Badge';

describe('Button', () => {
  it('should render primary badge', () => {
    const component = shallow(<Badge>!</Badge>);

    expect(component).toMatchSnapshot();
  });

  it('should render light badge', () => {
    const component = shallow(<Badge type="light">!</Badge>);

    expect(component).toMatchSnapshot();
  });
});
