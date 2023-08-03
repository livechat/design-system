import * as React from 'react';

import { render, userEvent, vi } from 'test-utils';

import { IPromoBannerV2Props, PromoBannerV2 } from './PromoBannerV2';

const contentText = 'Example content';
const additionalContentText = 'Additional example content';

const renderComponent = (props: IPromoBannerV2Props) => {
  return render(<PromoBannerV2 {...props}>{contentText}</PromoBannerV2>);
};

describe('<PromoBanner> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({
      className: 'my-css-class',
    });

    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should render given content', () => {
    const { getByText } = renderComponent({});

    expect(getByText(contentText)).toBeInTheDocument();
  });

  it('should render given additional content', () => {
    const { getByText } = renderComponent({
      additionalContent: additionalContentText,
    });

    expect(getByText(additionalContentText)).toBeInTheDocument();
  });

  it('should render buttons and fire handlers after click', () => {
    const onPrimaryButtonClick = vi.fn();
    const onSecondaryButtonClick = vi.fn();

    const { getByText } = renderComponent({
      primaryButton: {
        handleClick: onPrimaryButtonClick,
        label: 'Primary',
      },
      secondaryButton: {
        handleClick: onSecondaryButtonClick,
        label: 'Secondary',
      },
    });

    const primaryButton = getByText('Primary');
    const secondaryButton = getByText('Secondary');

    expect(primaryButton).toBeInTheDocument();
    userEvent.click(primaryButton);
    expect(onPrimaryButtonClick).toBeCalled();
    expect(secondaryButton).toBeInTheDocument();
    userEvent.click(secondaryButton);
    expect(onSecondaryButtonClick).toBeCalled();
  });

  it('should render close button if handler is given and fire it after click', () => {
    const onClick = vi.fn();
    const { getByRole } = renderComponent({
      onClose: onClick,
    });

    const button = getByRole('button');

    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(onClick).toBeCalled();
  });
});
