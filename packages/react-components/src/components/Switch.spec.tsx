import { fireEvent } from '@testing-library/dom';
import * as React from 'react';
import { render } from '../test-utils';
import { Switch } from './Switch';

describe('Switch', () => {
  const toggleFn = jest.fn();

  it('should call on toggle when clicked', () => {
    const { getByRole } = render(<Switch onChange={toggleFn} />);
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(toggleFn).toHaveBeenCalled();
  });
});
