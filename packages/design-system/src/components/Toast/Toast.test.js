import * as React from 'react';
import { mount, shallow } from 'enzyme';
import Toast from './Toast';
import { ANIMATION_TIME } from '../../constants/toast';

const closeFn = jest.fn();

describe('Toast', () => {
  it('should render success toast', () => {
    const component = mount(<Toast variant="success">Toast content</Toast>);

    expect(component).toMatchSnapshot();
  });

  it('on close call passed function', () => {
    const component = shallow(
      <Toast removable onClose={closeFn}>
        Click me
      </Toast>
    );
    const closeEl = component.find('[aria-label="Close toast"]');

    closeEl.simulate('click');
    setTimeout(() => {
      expect(closeFn).toHaveBeenCalled();
    }, ANIMATION_TIME);
  });
});
