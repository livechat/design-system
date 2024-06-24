import { render, userEvent, vi } from 'test-utils';

import { Checkbox, CheckboxProps } from './Checkbox';

const renderComponent = (props: CheckboxProps) => {
  return render(<Checkbox {...props} />);
};

describe('<Checkbox> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({ className: 'my-css-class' });

    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should not be checked by default and change the state on user click on uncontrolled mode', () => {
    const { getByRole } = renderComponent({});
    const checkbox = getByRole('checkbox');

    expect(checkbox).not.toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('should be disabled if prop is given and should not call the provided handler on user click', () => {
    const onChange = vi.fn();
    const { getByRole } = renderComponent({ disabled: true, onChange });
    const checkbox = getByRole('checkbox');

    expect(checkbox).toBeDisabled();
    userEvent.click(checkbox);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should call onChange handler on user click if provided and change the state for unconctrolled mode', () => {
    const onChange = vi.fn();
    const { getByRole } = renderComponent({ onChange });

    userEvent.click(getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target.checked).toBe(true);

    userEvent.click(getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange.mock.calls[0][0].target.checked).toBe(false);
  });

  it('should render children if provided, which should be clickable as checkbox label', () => {
    const onChange = vi.fn();
    const { getByText } = renderComponent({
      children: 'My checkbox',
      onChange,
    });
    const children = getByText('My checkbox');

    expect(children).toBeInTheDocument();
    userEvent.click(children);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should render description if provided', () => {
    const { getByText } = renderComponent({ description: 'My description' });
    const description = getByText('My description');

    expect(description).toBeInTheDocument();
  });

  it('should not change the state for controlled mode', () => {
    const { getByRole } = renderComponent({ checked: true });
    const checkbox = getByRole('checkbox');

    expect(checkbox).toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
