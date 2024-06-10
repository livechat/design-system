import { render, fireEvent, vi } from 'test-utils';

import loaderStyles from '../Loader/Loader.module.scss';

import { Switch } from './Switch';

describe('Switch', () => {
  it('should not change internal state when controlled (on) prop is passed', () => {
    const { getByRole } = render(<Switch on={true} />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toEqual(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
  });

  it('should call onChange and change internal state when no controlled (on) prop is passed', () => {
    const toggleFn = vi.fn();
    const { getByRole } = render(<Switch onChange={toggleFn} />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(toggleFn).toHaveBeenCalled();
    expect(checkbox.checked).toEqual(true);
  });

  it('should change state to checked (on) when user clicks on unchecked (off) switch', () => {
    const { getByRole } = render(<Switch />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
  });

  it('should not change state to unchecked (off) when user clicks on checked (on) switch', () => {
    const { getByRole } = render(<Switch on={true} />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toEqual(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
  });

  it('should be checked (on) if defaultOn is set to true', () => {
    const { getByRole } = render(<Switch defaultOn={true} />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toEqual(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
  });

  it('should be disabled if disabled is set to true', () => {
    const { getByRole } = render(<Switch disabled={true} />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.disabled).toEqual(true);
  });

  it('should display loader icon if in loading state and behave as disabled', () => {
    const { container, getByRole } = render(<Switch state="loading" />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    const loader = container.querySelector(`.${loaderStyles.loader__spinner}`);
    expect(checkbox.disabled).toEqual(true);
    expect(loader).toBeVisible();
  });

  it('should display lock icon if in locked state and behave as disabled', () => {
    const { getByTestId, getByRole } = render(<Switch state="locked" />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    const lockIcon = getByTestId('lock-icon');

    expect(checkbox.disabled).toEqual(true);
    expect(lockIcon).toBeVisible();
  });

  it('should allow setting accessible name for input element', () => {
    const label = 'Hello world';
    const { getByRole } = render(<Switch on={true} ariaLabel={label} />);

    const checkbox = getByRole('checkbox', { name: label });
    expect(checkbox).toHaveAccessibleName(label);
  });
});
