import { vi } from 'vitest';

import { render, userEvent } from 'test-utils';

import { SelectableCard } from './SelectableCard';
import { ISelectableCardProps } from './types';

const DEFAULT_PROPS = {
  selectionType: 'radio' as ISelectableCardProps['selectionType'],
  onClick: vi.fn(),
};

const renderComponent = (props: ISelectableCardProps) => {
  return render(<SelectableCard {...props} />);
};

describe('<SelectableCard> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({
      ...DEFAULT_PROPS,
      className: 'my-class',
    });

    expect(container.firstChild).toHaveClass('my-class');
  });

  it('should allow for inline styles', () => {
    const { container } = renderComponent({
      ...DEFAULT_PROPS,
      style: { color: '#fff' },
    });

    expect(container.firstChild).toHaveStyle('color: #fff');
  });

  it('should render as not selected by default', () => {
    const { getByRole } = renderComponent(DEFAULT_PROPS);

    expect(getByRole('button')).toHaveAttribute('aria-selected', 'false');
  });

  it('should render as selected if isSelected is set true', () => {
    const { getByRole } = renderComponent({
      ...DEFAULT_PROPS,
      isSelected: true,
    });

    expect(getByRole('button')).toHaveAttribute('aria-selected', 'true');
  });

  it('should render card content', () => {
    const { getByRole } = renderComponent({
      ...DEFAULT_PROPS,
      children: 'Card content',
    });

    expect(getByRole('button')).toHaveTextContent('Card content');
  });

  it('should call onClick when user clicks the card', () => {
    const onClick = vi.fn();
    const { getByRole } = renderComponent({
      ...DEFAULT_PROPS,
      onClick,
    });

    userEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render as radio type', () => {
    const { getByRole } = renderComponent({
      ...DEFAULT_PROPS,
    });

    expect(getByRole('radio')).toBeInTheDocument();
  });

  it('should render as checkbox type', () => {
    const { getByRole } = renderComponent({
      ...DEFAULT_PROPS,
      selectionType: 'checkbox',
    });

    expect(getByRole('checkbox')).toBeInTheDocument();
  });

  it('should allow to focus by tab press and call onClick on keyboard interaction', () => {
    const onClick = vi.fn();
    renderComponent({
      ...DEFAULT_PROPS,
      onClick,
    });

    userEvent.tab();
    userEvent.keyboard('{enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
