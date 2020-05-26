import * as React from 'react';
import { shallow } from 'enzyme';
import Banner from './Banner';

describe('Banner', () => {
  it('should render primary Banner', () => {
    const component = shallow(<Banner>!</Banner>);

    expect(component).toMatchSnapshot();
  });

  it('should render secondary Banner', () => {
    const component = shallow(<Banner secondary>!</Banner>);

    expect(component).toMatchSnapshot();
  });
});
