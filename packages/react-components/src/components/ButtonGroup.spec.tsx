import * as React from 'react';
import { render, userEvent } from '../test-utils';
import noop from '../utils/noop';
import { Button } from './Button';
import { ButtonGroup } from './ButtonGroup';

describe('<ButtonGroup> component', () => {
  function renderComponent(props = {}, onButtonClick = noop) {
    return render(
      <ButtonGroup {...props}>
        <Button onClick={onButtonClick}>First button</Button>
        <Button>Second button</Button>
      </ButtonGroup>
    );
  }

  it('should have custom css class', () => {
    const className = 'my-custom-class';
    const {
      container: { firstChild: el },
    } = renderComponent({ className });

    expect(el).toHaveClass(className);
  });

  it('should allow for controlled version of component by passing "currentIndex" prop', () => {
    const { getAllByRole } = renderComponent({ currentIndex: 1 });

    const [firstButton, secondButton] = getAllByRole('button');

    expect(firstButton).not.toHaveClass('lc-btn--active');
    expect(secondButton).toHaveClass('lc-btn--active');
  });

  it('should not have active button by default in unconrolled version', () => {
    const { getAllByRole } = renderComponent();

    const [firstButton, secondButton] = getAllByRole('button');

    expect(firstButton).not.toHaveClass('lc-btn--active');
    expect(secondButton).not.toHaveClass('lc-btn--active');
  });

  it('should call "onIndexChange" with index of current selected button on click', () => {
    const onIndexChange = jest.fn();
    const onButtonClick = jest.fn();
    const { getAllByRole } = renderComponent({ onIndexChange }, onButtonClick);

    const [firstButton] = getAllByRole('button');

    expect(firstButton).not.toHaveClass('lc-btn--active');

    userEvent.click(firstButton);

    expect(onIndexChange).toHaveBeenCalledWith(0, expect.anything());
    expect(onButtonClick).toHaveBeenCalled();
    expect(firstButton).toHaveClass('lc-btn--active');
  });
});
