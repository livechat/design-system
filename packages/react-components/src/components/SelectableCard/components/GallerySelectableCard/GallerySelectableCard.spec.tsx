import { vi } from 'vitest';

import { render } from 'test-utils';

import { ISelectableCardProps } from '../../types';

import { GallerySelectableCard } from './GallerySelectableCard';
import { IGallerySelectableCardProps } from './types';

const DEFAULT_PROPS = {
  selectionType: 'radio' as ISelectableCardProps['selectionType'],
  onClick: vi.fn(),
};

const renderComponent = (props: IGallerySelectableCardProps) => {
  return render(<GallerySelectableCard {...props} />);
};

describe('<GallerySelectableCard> component', () => {
  it('should allow for custom class for card wrapper and content', () => {
    const { container, getByRole } = renderComponent({
      ...DEFAULT_PROPS,
      className: 'my-class',
      contentClassName: 'my-content-class',
      icon: <div role="img" />,
    });

    expect(container.firstChild).toHaveClass('my-class');
    expect(getByRole('presentation')).toHaveClass('my-content-class');
  });

  it('should render with provided icon', () => {
    const { getByRole } = renderComponent({
      ...DEFAULT_PROPS,
      icon: <div role="img" />,
    });

    expect(getByRole('img')).toBeInTheDocument();
  });

  it('should render with provided label and add extra bottom margin', () => {
    const { container, getByText } = renderComponent({
      ...DEFAULT_PROPS,
      label: 'Label',
      icon: <div role="img" />,
    });

    expect(getByText('Label')).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle('margin-bottom: 29px');
  });

  it('should render custom element', () => {
    const { getByText } = renderComponent({
      ...DEFAULT_PROPS,
      customElement: <div>Custom element</div>,
    });

    expect(getByText('Custom element')).toBeInTheDocument();
  });
});
