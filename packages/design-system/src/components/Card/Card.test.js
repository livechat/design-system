import * as React from 'react';
import { mount } from 'enzyme';
import Card from './Card';

describe('Card', () => {
  it('should render Card', () => {
    const component = mount(
      <Card title="Title goes here" img="https://via.placeholder.com/100">
        test
      </Card>
    );
    expect(component).toMatchSnapshot();
  });

  it('should render Card without a title', () => {
    const component = mount(<Card>test</Card>);
    expect(component).toMatchSnapshot();
  });
});
