import * as React from 'react';

import userEvent from '@testing-library/user-event';

import { render, vi } from 'test-utils';

import { OnboardingChecklist } from './OnboardingChecklist';
import { IOnboardingChecklistProps } from './types';

const defaultItems = [
  {
    id: '1',
    title: 'Item 1',
    description: 'Description 1',
    cta: <button>CTA 1</button>,
    placeholder: <span>Placeholder 1</span>,
  },
  {
    id: '2',
    title: 'Item 2',
    description: 'Description 2',
    cta: <button>CTA 2</button>,
    placeholder: <span>Placeholder 2</span>,
  },
];

const defaultProps: IOnboardingChecklistProps = {
  title: 'Title',
  greetingText: 'Greeting',
  items: defaultItems,
  activeItemId: '1',
  completedItemsIds: [],
  onActiveChange: vi.fn(),
  completionMessageData: {
    title: 'Completion message',
    greetingText: 'Completion greeting',
    delay: 1,
  },
};

const renderComponent = (props: IOnboardingChecklistProps) => {
  return render(<OnboardingChecklist {...props} />);
};

describe('<OnboardingChecklist> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({
      ...defaultProps,
      className: 'custom-class',
    });

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should render component with initial state based on given props', () => {
    const { getByText, getByTestId } = renderComponent(defaultProps);
    const item1 = getByTestId('checklist-item-1');
    const item2 = getByTestId('checklist-item-2');

    expect(getByText('Title')).toBeInTheDocument();
    expect(getByText('Greeting')).toBeInTheDocument();
    expect(getByText('Item 1')).toBeInTheDocument();
    expect(getByText('Item 2')).toBeInTheDocument();
    expect(item1).toHaveAttribute('aria-expanded', 'true');
    expect(item2).toHaveAttribute('aria-expanded', 'false');
  });

  it('should call onActiveChange with correct item id after user click', () => {
    const onActiveChange = vi.fn();
    const { getByText } = renderComponent({
      ...defaultProps,
      onActiveChange,
    });

    userEvent.click(getByText('Item 2'));
    expect(onActiveChange).toHaveBeenCalledWith('2');
  });

  it('should render complete state when isCompleted is true', () => {
    const { getByText, queryByText } = renderComponent({
      ...defaultProps,
      isCompleted: true,
    });

    expect(queryByText('Title')).not.toBeInTheDocument();
    expect(queryByText('Item 1')).not.toBeInTheDocument();
    expect(queryByText('Item 2')).not.toBeInTheDocument();
    expect(getByText('Completion message')).toBeInTheDocument();
    expect(getByText('Completion greeting')).toBeInTheDocument();
  });
});
