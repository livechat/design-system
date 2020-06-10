import * as React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button', () => {
  const shallowButton = (props = {}) =>
    shallow(<Button {...props}>Click me</Button>);

  it('should render any type of button', () => {
    const primaryButton = shallowButton({
      kind: 'primary'
    });
    const destructiveButton = shallowButton({
      kind: 'destructive'
    });
    const secondaryButton = shallowButton({
      kind: 'secondary'
    });
    const textButton = shallowButton({
      kind: 'text'
    });
    const basicButton = shallowButton();

    expect(primaryButton).toMatchSnapshot();
    expect(destructiveButton).toMatchSnapshot();
    expect(secondaryButton).toMatchSnapshot();
    expect(textButton).toMatchSnapshot();
    expect(basicButton).toMatchSnapshot();
  });

  it('should render any size of button', () => {
    const compactButton = shallowButton({ size: 'compact' });
    const largeButton = shallowButton({ size: 'large' });

    expect(compactButton).toMatchSnapshot();
    expect(largeButton).toMatchSnapshot();
  });

  it('should render loading button', () => {
    const loadingButton = shallowButton({
      loading: true,
      loaderLabel: 'Processing'
    });

    expect(loadingButton).toMatchSnapshot();
  });

  it('should render full-width button', () => {
    const fullWidthButton = shallowButton({ fullWidth: true });

    expect(fullWidthButton).toMatchSnapshot();
  });

  it('should render disabled button', () => {
    const disabledButton = shallowButton({ disabled: true });

    expect(disabledButton).toMatchSnapshot();
  });

  it('on click, focus and blur should call passed in props functions', () => {
    const clickFn = jest.fn();
    const focusFn = jest.fn();
    const blurFn = jest.fn();

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
