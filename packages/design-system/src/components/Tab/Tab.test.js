import * as React from 'react';
import { mount } from 'enzyme';
import Tab from './Tab';

describe('Tab', () => {
  it('should render selected tab', () => {
    const component = mount(
      <Tab isSelected description="1">
        Agents
      </Tab>
    );

    expect(component).toMatchSnapshot();
  });
});
