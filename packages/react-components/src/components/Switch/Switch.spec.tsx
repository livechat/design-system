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

  it('should change state to enabled when user clicks on disabled switch', () => {
    const { getByRole } = render(<Switch />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
  });

  it('should change state to disabled when user clicks on enabled switch', () => {
    const { getByRole } = render(<Switch on={true} />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toEqual(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
  });

  it('should be enabled if defaultOn is set to true', () => {
    const { getByRole } = render(<Switch defaultOn={true} />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toEqual(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
  });
});
1;
