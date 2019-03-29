import * as React from 'react';
import { mount } from 'enzyme';
import Card from './Card';

describe('Card', () => {
  it('should render selected Card', () => {
    const component = mount(
      <Card isSelected description="1">
        Agents
      </Card>
    );

    expect(component).toMatchSnapshot();
  });
});
