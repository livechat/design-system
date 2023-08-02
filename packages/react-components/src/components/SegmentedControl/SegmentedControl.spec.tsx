import * as React from 'react';

import { render, userEvent, vi } from 'test-utils';

import { SegmentedControl, SegmentedControlProps } from './SegmentedControl';

import styles from './SegmentedControl.module.scss';

const defaultProps: SegmentedControlProps = {
  buttons: [
    { id: 'one', label: 'one' },
    { id: 'two', label: 'two' },
  ],
};

describe('<SegmentedControl> component', () => {
  function renderComponent(props: SegmentedControlProps) {
    return render(<SegmentedControl {...props} />);
  }

  it('should have custom css class', () => {
    const className = 'my-custom-class';
    const {
      container: { firstChild: el },
    } = renderComponent({ ...defaultProps, className });

    expect(el).toHaveClass(className);
  });

  it('should allow for controlled version of component by passing "currentIndex" prop', () => {
    const { getAllByRole } = renderComponent({
      ...defaultProps,
      currentId: 'one',
    });

    const [firstButton, secondButton] = getAllByRole('button');

    expect(firstButton).toHaveClass(styles['btn--active']);
    expect(secondButton).not.toHaveClass(styles['btn--active']);
  });

  it('should not have active button by default in unconrolled version', () => {
    const { getAllByRole } = renderComponent({ ...defaultProps });

    const [firstButton, secondButton] = getAllByRole('button');

    expect(firstButton).not.toHaveClass(styles['btn--active']);
    expect(secondButton).not.toHaveClass(styles['btn--active']);
  });

  it('should call "onButtonClick" with index of current selected button on click', () => {
    const onButtonClick = vi.fn();
    const { getAllByRole } = renderComponent({
      ...defaultProps,
      onButtonClick,
      initialId: 'two',
    });

    const [firstButton] = getAllByRole('button');

    expect(firstButton).not.toHaveClass(styles['btn--active']);

    userEvent.click(firstButton);
    expect(onButtonClick).toHaveBeenCalled();
    expect(firstButton).toHaveClass(styles['btn--active']);
  });
});
