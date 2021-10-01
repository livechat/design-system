import * as React from 'react';
import { render } from '../test-utils';
import { ToastWrapper } from './ToastWrapper';

const customClass = 'my-css-class';

jest.mock('react-transition-group', () => {
  // eslint-disable-next-line
  const FakeTransitionGroup = jest.fn(({ children }) => children);
  const FakeCSSTransition = jest.fn((props) =>
    props.in ? (
      <FakeTransitionGroup>{props.children}</FakeTransitionGroup>
    ) : null
  );
  return {
    CSSTransition: FakeCSSTransition,
    TransitionGroup: FakeTransitionGroup,
  };
});

describe('<Banner> component', () => {
  it('should allow for custom class', () => {
    const { container } = render(
      <ToastWrapper toasts={[]} className={customClass} />
    );

    expect(container.firstChild).toHaveClass(customClass);
  });
});
