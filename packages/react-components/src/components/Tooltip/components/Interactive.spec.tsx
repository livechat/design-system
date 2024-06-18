import * as React from 'react';

import { vi } from 'vitest';

import { render, userEvent } from 'test-utils';

import { ITooltipInteractiveProps } from '../types';

import { Interactive } from './Interactive';

const defaultProps: ITooltipInteractiveProps = {
  text: 'Interactive tooltip',
  primaryButton: {
    label: 'Primary',
    handleClick: vi.fn(),
  },
  secondaryButton: {
    label: 'Secondary',
    handleClick: vi.fn(),
  },
};

const renderComponent = (props: ITooltipInteractiveProps) =>
  render(<Interactive {...props} />);

describe('<Interactive> component', () => {
  it('should render given text and buttons', () => {
    const { getByText, getByRole } = renderComponent(defaultProps);
    const primaryButton = getByRole('button', { name: 'Primary' });
    const secondaryButton = getByRole('button', { name: 'Secondary' });

    expect(getByText('Interactive tooltip')).toBeInTheDocument();
    expect(primaryButton).toBeInTheDocument();
    expect(secondaryButton).toBeInTheDocument();
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
    const button = getByRole('button', { name: 'Close tooltip' });

    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should render image if provided', () => {
    const { getByAltText } = renderComponent({
      ...defaultProps,
      image: {
        src: 'image.jpg',
        alt: 'Image',
      },
    });

    expect(getByAltText('Image')).toBeInTheDocument();
  });

  it('should call primary and secondary buttons handlers on user click', () => {
    const onPrimaryClick = vi.fn();
    const onSecondaryClick = vi.fn();
    const { getByRole } = renderComponent({
      ...defaultProps,
      primaryButton: {
        label: 'Primary',
        handleClick: onPrimaryClick,
      },
      secondaryButton: {
        label: 'Secondary',
        handleClick: onSecondaryClick,
      },
    });
    const primaryButton = getByRole('button', { name: 'Primary' });
    const secondaryButton = getByRole('button', { name: 'Secondary' });

    userEvent.click(primaryButton);
    expect(onPrimaryClick).toHaveBeenCalledTimes(1);
    userEvent.click(secondaryButton);
    expect(onSecondaryClick).toHaveBeenCalledTimes(1);
  });
});
