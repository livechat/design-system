import * as React from 'react';
import { shallow } from 'enzyme';
import { Button } from './Button';

const clickFn = jest.fn();
const focusFn = jest.fn();
const blurFn = jest.fn();

describe('Button', () => {
  it('should render primary button', () => {
    const component = shallow(
      <Button destructive primary>
        Click me
      </Button>
    );

    expect(component).toMatchSnapshot();
  });

  it('on click, focus and blur should call passed in props functions', () => {
    const component = shallow(
      <Button onClick={clickFn} onFocus={focusFn} onBlur={blurFn}>
        Click me
      </Button>
    );
    const button = component.find('button');

    button.simulate('click');
    expect(clickFn).toHaveBeenCalled();

    button.simulate('focus');
    expect(focusFn).toHaveBeenCalled();

    button.simulate('blur');
    expect(blurFn).toHaveBeenCalled();
  });
});
