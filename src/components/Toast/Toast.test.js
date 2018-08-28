import React from 'react';
import { mount } from 'enzyme';
import Toast from './Toast';

const closeFn = jest.fn();
const animationDuration = 100;

describe('Toast', () => {
  it('should render success toast', () => {
    const component = mount(
      <Toast warning success>
        Toast content
      </Toast>
    );

    expect(component).toMatchSnapshot();
  });

  it('should render warning toast', () => {
    const component = mount(
      <Toast error warning>
        Toast content
      </Toast>
    );

    expect(component).toMatchSnapshot();
  });

  it('should render error toast', () => {
    const component = mount(
      <Toast info error>
        Toast content
      </Toast>
    );

    expect(component).toMatchSnapshot();
  });

  it('should render info toast', () => {
    const component = mount(<Toast info>Toast content</Toast>);

    expect(component).toMatchSnapshot();
  });

  it('on close call passed function', () => {
    const component = mount(<Toast onClose={closeFn}>Click me</Toast>);
    const closeEl = component.find('.toast-close');

    closeEl.simulate('click');
    setTimeout(() => {
      expect(closeFn).toHaveBeenCalled();
    }, animationDuration);
  });

  it('after autoHideDuration timeout call onClose function', () => {
    const autoHideDuration = 2000;
    mount(
      <Toast onClose={closeFn} autoHideDuration={autoHideDuration}>
        Toast content
      </Toast>
    );

    setTimeout(() => {
      expect(closeFn).toHaveBeenCalled();
    }, autoHideDuration + animationDuration);
  });
});
