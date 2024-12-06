import { vi } from 'vitest';

import { render } from 'test-utils';

import { ISelectableCardProps } from '../../types';

import { InteractiveSelectableCard } from './InteractiveSelectableCard';
import { IInteractiveSelectableCardProps } from './types';

const DEFAULT_PROPS = {
  selectionType: 'radio' as ISelectableCardProps['selectionType'],
  onClick: vi.fn(),
};

const renderComponent = (props: IInteractiveSelectableCardProps) => {
  return render(<InteractiveSelectableCard {...props} />);
};

describe('<InteractiveSelectableCard> component', () => {
  it('should allow for custom class for card wrapper and content', () => {
    const { container, getByRole } = renderComponent({
      ...DEFAULT_PROPS,
      className: 'my-class',
      contentClassName: 'my-content-class',
    });

    expect(container.firstChild).toHaveClass('my-class');
    expect(getByRole('presentation')).toHaveClass('my-content-class');
  });

  it('should render content', () => {
    const { getByText } = renderComponent({
      ...DEFAULT_PROPS,
      children: 'Card content',
    });

    expect(getByText('Card content')).toBeInTheDocument();
  });
});
