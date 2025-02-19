import { render } from 'test-utils';

import { Loader, LoaderProps } from './Loader';

const renderComponent = (props: LoaderProps) => render(<Loader {...props} />);

describe('<Loader> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({ className: 'my-custom-class' });

    expect(container.firstChild).toHaveClass('my-custom-class');
  });

  it('should render label if provided', () => {
    const { getByText } = renderComponent({ label: 'Label text' });

    expect(getByText('Label text')).toBeInTheDocument();
  });

  it('should allow for change colors of loader', () => {
    const { getByRole } = renderComponent({
      primaryColor: 'red',
      secondaryColor: 'blue',
    });
    const loader = getByRole('status');
    const { borderColor, borderTopColor } = getComputedStyle(loader);

    expect(borderColor).toBe('blue');
    expect(borderTopColor).toBe('rgb(255, 0, 0)');
  });
});
