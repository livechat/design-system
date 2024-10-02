import { vi } from 'vitest';

import { render, userEvent } from 'test-utils';

import { ITooltipInfoProps } from '../types';

import { Info } from './Info';

const defaultProps: ITooltipInfoProps = {
  text: 'Info tooltip',
};

const renderComponent = (props: ITooltipInfoProps) =>
  render(<Info {...props} />);

describe('<Info> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({
      ...defaultProps,
      className: 'custom-class',
    });

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should render given text', () => {
    const { getByText } = renderComponent(defaultProps);

    expect(getByText('Info tooltip')).toBeInTheDocument();
  });

  it('should render header if provided', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      header: 'Header',
    });

    expect(getByText('Header')).toBeInTheDocument();
  });

  it('should render close button if closeWithX is set to true and call the handler after user click', () => {
    const onClose = vi.fn();
    const { getByRole } = renderComponent({
      ...defaultProps,
      closeWithX: true,
      handleCloseAction: onClose,
    });
    const button = getByRole('button');

    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
