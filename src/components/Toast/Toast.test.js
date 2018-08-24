import React from 'react';
import { mount } from 'enzyme';
import Toast from './Toast';

const closeFn = jest.fn();

describe('Toast', () => {
  it('should render success toast', () => {
    const component = mount(
      <Toast error success>
        Toast content
      </Toast>
    );

    expect(component).toMatchSnapshot();
  });

  it('on close call passed function', () => {
    const component = mount(<Toast onClose={closeFn}>Click me</Toast>);
    const closeEl = component.find('.toast-close');

    closeEl.simulate('click');
    expect(closeFn).toHaveBeenCalled();
  });
});
