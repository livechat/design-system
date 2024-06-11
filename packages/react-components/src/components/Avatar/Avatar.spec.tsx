import { render, fireEvent } from 'test-utils';

import { Avatar, AvatarProps } from './Avatar';

const renderComponent = (props: AvatarProps) => {
  return render(<Avatar {...props} />);
};

const baseClass = 'avatar';

describe('<Avatar> component', () => {
  it('should allow for custom CSS class', () => {
    const customClass = 'custom-class';
    const { container } = renderComponent({
      type: 'text',
      className: customClass,
    });

    expect(container.firstChild).toHaveClass(customClass);
  });

  it('should display initials if text is selected as type', () => {
    const { getByText } = renderComponent({
      type: 'text',
      text: 'John Doe',
    });

    expect(getByText('JD')).toBeVisible();
  });

  it('should display custom color as background if provided', () => {
    const customColor = 'green';
    const { container } = renderComponent({
      type: 'text',
      text: 'John Doe',
      color: customColor,
    });

    expect(container.firstChild).toHaveStyle(
      `background-color: ${customColor}`
    );
  });

  const extraSmallSizes: AvatarProps['size'][] = [
    'xxxsmall',
    'xxsmall',
    'xsmall',
  ];
  it.each(extraSmallSizes)(
    'should display single-letter initial for %s size',
    (size) => {
      const { getByText } = renderComponent({
        type: 'text',
        text: 'John Doe',
        size,
      });

      expect(getByText('J')).toBeVisible();
    }
  );

  const smallAndAboveSizes: AvatarProps['size'][] = [
    'small',
    'medium',
    'large',
    'xlarge',
    'xxlarge',
  ];
  it.each(smallAndAboveSizes)(
    'should display two-letter initials for %s size',
    (size) => {
      const { getByText } = renderComponent({
        type: 'text',
        text: 'John Doe',
        size,
      });

      expect(getByText('JD')).toBeVisible();
    }
  );

  it('should display image if such type is specified', () => {
    const imageSource =
      'https://cdn.livechatinc.com/cloud/?uri=https://livechat.s3.amazonaws.com/default/avatars/female_63.jpg';
    const { getByRole } = renderComponent({
      type: 'image',
      src: imageSource,
    });

    const image = getByRole('img');

    expect(image).toBeVisible();
    expect(image).toHaveAttribute('src', imageSource);
  });

  it('should display fallback avatar in case of missing src', () => {
    const { getByTestId } = renderComponent({
      type: 'image',
    });

    expect(getByTestId(`${baseClass}__icon`)).toBeVisible();
  });

  it('should display fallback avatar in case invalid URL (or that do not return proper image)', () => {
    const { getByTestId, getByRole } = renderComponent({
      type: 'image',
      src: 'https://example.com/not-a-proper-image.png',
    });
    const image = getByRole('img');
    fireEvent.error(image);

    expect(getByTestId(`${baseClass}__icon`)).toBeVisible();
  });

  const statuses: AvatarProps['status'][] = [
    'available',
    'unavailable',
    'unknown',
  ];
  it.each(statuses)('should display status icon %s as status', (status) => {
    const { getByTestId } = renderComponent({
      type: 'text',
      text: 'John Doe',
      status,
    });

    expect(getByTestId(`${baseClass}__status`)).toBeVisible();
  });

  it('should display rim', () => {
    const { getByTestId } = renderComponent({
      type: 'text',
      text: 'John Doe',
      withRim: true,
    });

    expect(getByTestId(`${baseClass}__rim`)).toBeVisible();
  });
});
