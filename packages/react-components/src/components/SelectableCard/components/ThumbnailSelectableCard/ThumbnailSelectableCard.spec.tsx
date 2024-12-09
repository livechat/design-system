import { vi } from 'vitest';

import { render } from 'test-utils';

import { ISelectableCardProps } from '../../types';

import { ThumbnailSelectableCard } from './ThumbnailSelectableCard';
import { IThumbnailSelectableCardProps } from './types';

const DEFAULT_PROPS = {
  label: 'Label',
  selectionType: 'radio' as ISelectableCardProps['selectionType'],
  onClick: vi.fn(),
};

const renderComponent = (props: IThumbnailSelectableCardProps) => {
  return render(<ThumbnailSelectableCard {...props} />);
};

describe('<ThumbnailSelectableCard> component', () => {
  it('should allow for custom class for card wrapper and content', () => {
    const { container, getByRole } = renderComponent({
      ...DEFAULT_PROPS,
      className: 'my-class',
      contentClassName: 'my-content-class',
    });

    expect(container.firstChild).toHaveClass('my-class');
    expect(getByRole('presentation')).toHaveClass('my-content-class');
  });

  it('should render with label', () => {
    const { getByText } = renderComponent(DEFAULT_PROPS);

    expect(getByText('Label')).toBeInTheDocument();
  });

  it('should render with description if provided', () => {
    const { getByText } = renderComponent({
      ...DEFAULT_PROPS,
      description: 'Description',
    });

    expect(getByText('Description')).toBeInTheDocument();
  });

  it('should render with icon if provided', () => {
    const { getByRole } = renderComponent({
      ...DEFAULT_PROPS,
      icon: <div role="img" />,
    });

    expect(getByRole('img')).toBeInTheDocument();
  });

  it('should not render label and other elements if custom element is provided', () => {
    const { getByText, queryByRole, queryByText } = renderComponent({
      ...DEFAULT_PROPS,
      description: 'Description',
      icon: <div role="img" />,
      customElement: <div>Custom element</div>,
    });

    expect(queryByRole('img')).not.toBeInTheDocument();
    expect(queryByText('Label')).not.toBeInTheDocument();
    expect(queryByText('Description')).not.toBeInTheDocument();
    expect(getByText('Custom element')).toBeInTheDocument();
  });
});
