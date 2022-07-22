import * as React from 'react';
import { render, fireEvent, vi } from 'test-utils';
import { Switch } from './Switch';

describe('Switch', () => {
  it('should call onChange without changing state when custom handler is passed', () => {
    const toggleFn = vi.fn();
    const { getByRole } = render(<Switch onChange={toggleFn} />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(toggleFn).toHaveBeenCalled();
    expect(checkbox.checked).toEqual(false);
  });

  it('should change state to checked (on) when user clicks on unchecked (off) switch', () => {
    const { getByRole } = render(<Switch />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
  });

  it('should change state to unchecked (off) when user clicks on checked (on) switch', () => {
    const { getByRole } = render(<Switch on={true} />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toEqual(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
  });

  it('should be checked (on) if defaultOn is set to true', () => {
    const { getByRole } = render(<Switch defaultOn={true} />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toEqual(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
  });
});
