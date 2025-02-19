import { render, userEvent, vi } from 'test-utils';

import { PromoBannerV2 } from './PromoBannerV2';
import { IPromoBannerV2Props } from './types';

const contentText = 'Example content';
const additionalContentText = 'Additional example content';

const renderComponent = (props: IPromoBannerV2Props) => {
  return render(<PromoBannerV2 {...props}>{contentText}</PromoBannerV2>);
};

describe('<PromoBanner> component', () => {
  it('should allow for custom class', () => {
    const { getByRole } = renderComponent({
      className: 'my-css-class',
    });

    expect(getByRole('banner')).toHaveClass('my-css-class');
  });

  it('should allow for custom class for content container', () => {
    const { getByTestId } = renderComponent({
      contentClassName: 'my-content-css-class',
    });

    expect(getByTestId('content')).toHaveClass('my-content-css-class');
  });

  it('should allow for custom class for additional content container', () => {
    const { getByTestId } = renderComponent({
      additionalContent: additionalContentText,
      additionalContentClassName: 'my-additional-content-css-class',
    });

    expect(getByTestId('additional-content')).toHaveClass(
      'my-additional-content-css-class'
    );
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
    expect(onPrimaryButtonClick).toHaveBeenCalled();
    expect(secondaryButton).toBeInTheDocument();
    userEvent.click(secondaryButton);
    expect(onSecondaryButtonClick).toHaveBeenCalled();
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
