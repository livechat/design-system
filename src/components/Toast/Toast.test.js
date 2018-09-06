import React from 'react';
import { mount } from 'enzyme';
import Toast from './Toast';
import { ANIMATION_TIME } from './constants';

const closeFn = jest.fn();

describe('Toast', () => {
  it('should render success toast', () => {
    const component = mount(
      <Toast warning success>
        Toast content
      </Toast>
    );

    expect(component).toMatchSnapshot();
  });

  it('on close call passed function', () => {
    const component = mount(<Toast onClose={closeFn}>Click me</Toast>);
    const closeEl = component.find('.toast-close');

    closeEl.simulate('click');
    setTimeout(() => {
      expect(closeFn).toHaveBeenCalled();
    }, ANIMATION_TIME);
  });

  it('after hideDelayTime timeout call onClose function', () => {
    const hideDelayTime = 2000;
    mount(
      <Toast onClose={closeFn} hideDelayTime={hideDelayTime}>
        Toast content
      </Toast>
    );

    setTimeout(() => {
      expect(closeFn).toHaveBeenCalled();
    }, hideDelayTime + ANIMATION_TIME);
  });
});
