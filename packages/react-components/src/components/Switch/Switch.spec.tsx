import * as React from 'react';
import { render, fireEvent, vi } from 'test-utils';
import { baseClass, Switch } from './Switch';
import loaderStyles from '../Loader/Loader.module.scss';

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

  it('should be disabled if disabled is set to true', () => {
    const { getByRole, getByTestId } = render(<Switch disabled={true} />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.disabled).toEqual(true);
    expect(getByTestId(`${baseClass}__disabled-icon`)).toBeVisible();
  });

  it('should have loader icon visible if loading is set to true', () => {
    const { container } = render(<Switch loading={true} />);
    const loader = container.querySelector(
      `.${loaderStyles['loader__spinner']}`
    );
    expect(loader).toBeVisible();
  });

  it('should always show loader icon on top if there are other icons to be displayed', () => {
    const { container, queryByTestId } = render(
      <Switch loading={true} disabled={true} />
    );
    const loader = container.querySelector(
      `.${loaderStyles['loader__spinner']}`
    );
    expect(loader).toBeVisible();
    expect(
      queryByTestId(`${baseClass}__disabled-icon`)
    ).not.toBeInTheDocument();
  });
});
