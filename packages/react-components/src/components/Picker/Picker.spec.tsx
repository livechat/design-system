import * as React from 'react';
import { render } from '../../test-utils';
import noop from '../../utils/noop';
import { IPickerProps, Picker } from './Picker';

const defaultProps = {
  options: [
    { key: 'one', name: 'Option one' },
    { key: 'two', name: 'Option two' },
    { key: 'three', name: 'Option three' },
    { key: 'four', name: 'Option four' },
    { key: 'five', name: 'Option five' },
    { key: 'six', name: 'Option six' },
    { key: 'seven', name: 'Option seven' },
  ],
  onSelect: () => noop,
};

const renderComponent = (props: IPickerProps) => {
  return render(<Picker {...props} />);
};

describe('<Picker> component', () => {
  it('should render label if is set', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      label: 'Example label',
    });

    expect(getByText('Example label')).toBeVisible();
  });

  it('should render error if is set', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      error: 'Example error',
    });

    expect(getByText('Example error')).toBeVisible();
  });
});
