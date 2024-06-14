import * as React from 'react';

import { render, userEvent, vi } from 'test-utils';

import { ActionCard } from './ActionCard';
import { ActionCardProps } from './types';

const renderComponent = (props: ActionCardProps, buttonOnClick?: () => void) =>
  render(
    <ActionCard {...props}>
      Example content
      <button onClick={buttonOnClick}>Example button</button>
    </ActionCard>
  );

describe('<ActionCard> component', () => {
  it('should accept custom className', () => {
    const { getByRole } = renderComponent({ className: 'my-custom-class' });

    expect(getByRole('button', { name: 'Action Card' })).toHaveClass(
      'my-custom-class'
    );
  });

  it('should render given element', () => {
    const { getByText } = renderComponent({});

    expect(getByText('Example content')).toBeInTheDocument();
  });

  it('should render second column if secondColumn is provided', () => {
    const { getByText } = renderComponent({
      secondColumn: 'Secondary example content',
    });

    expect(getByText('Secondary example content')).toBeInTheDocument();
  });

  it('should accept custom classNames for first and second column', () => {
    const { getByTestId } = renderComponent({
      secondColumn: 'Secondary example content',
      firstColumnClassName: 'first-column-class',
      secondColumnClassName: 'second-column-class',
    });

    expect(getByTestId('action-card-first-column')).toHaveClass(
      'first-column-class'
    );
    expect(getByTestId('action-card-second-column')).toHaveClass(
      'second-column-class'
    );
  });

  it('should call onClick handler on card click', () => {
    const onClick = vi.fn();
    const { getByRole } = renderComponent({
      onClick,
    });

    userEvent.click(getByRole('button', { name: 'Action Card' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick handler on interactive element click inside the component and call that element handler', () => {
    const onClick = vi.fn();
    const onButtonClick = vi.fn();
    const { getByRole } = renderComponent(
      {
        onClick,
      },
      onButtonClick
    );

    userEvent.click(getByRole('button', { name: 'Example button' }));
    expect(onClick).not.toHaveBeenCalled();
    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });
});
