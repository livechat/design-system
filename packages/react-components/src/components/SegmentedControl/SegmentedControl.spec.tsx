import { render, userEvent, vi } from 'test-utils';

import { SegmentedControl, SegmentedControlProps } from './SegmentedControl';

const defaultProps: SegmentedControlProps = {
  buttons: [
    { id: 'one', label: 'one' },
    { id: 'two', label: 'two' },
  ],
};

const renderComponent = (props: SegmentedControlProps) => {
  return render(<SegmentedControl {...props} />);
};

describe('<SegmentedControl> component', () => {
  it('should allow for custom class', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      className: 'test-class',
    });

    expect(getByRole('group')).toHaveClass('test-class');
  });

  it('should not have active buttons by default in unconrolled version', () => {
    const { getAllByRole } = renderComponent({ ...defaultProps });
    const [firstButton, secondButton] = getAllByRole('button');

    expect(firstButton).toHaveAttribute('aria-pressed', 'false');
    expect(secondButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('should select correct button if initialId is provided and should change the selected button on user click (uncontrolled mode)', () => {
    const { getAllByRole } = renderComponent({
      ...defaultProps,
      initialId: 'one',
    });
    const [firstButton, secondButton] = getAllByRole('button');

    expect(firstButton).toHaveAttribute('aria-pressed', 'true');
    expect(secondButton).toHaveAttribute('aria-pressed', 'false');
    userEvent.click(secondButton);

    const [rerenderFirstButton, rerenderSecondButton] = getAllByRole('button');

    expect(rerenderFirstButton).toHaveAttribute('aria-pressed', 'false');
    expect(rerenderSecondButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('should select correct button if currentId is provided and should not change the selected button on user click (controlled mode)', () => {
    const { getAllByRole } = renderComponent({
      ...defaultProps,
      currentId: 'one',
    });
    const [firstButton, secondButton] = getAllByRole('button');

    expect(firstButton).toHaveAttribute('aria-pressed', 'true');
    expect(secondButton).toHaveAttribute('aria-pressed', 'false');
    userEvent.click(secondButton);

    const [rerenderFirstButton, rerenderSecondButton] = getAllByRole('button');

    expect(rerenderFirstButton).toHaveAttribute('aria-pressed', 'true');
    expect(rerenderSecondButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('should call "onButtonClick" with id of current selected button on click', () => {
    const onButtonClick = vi.fn();
    const { getAllByRole } = renderComponent({
      ...defaultProps,
      onButtonClick,
      initialId: 'two',
    });

    const [firstButton] = getAllByRole('button');

    expect(firstButton).toHaveAttribute('aria-pressed', 'false');
    userEvent.click(firstButton);

    expect(onButtonClick).toHaveBeenCalledTimes(1);
    expect(onButtonClick).toHaveBeenCalledWith('one', expect.any(Object));
    expect(firstButton).toHaveAttribute('aria-pressed', 'true');
  });
});
