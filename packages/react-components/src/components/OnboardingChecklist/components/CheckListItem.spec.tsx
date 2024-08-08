import * as React from 'react';

import userEvent from '@testing-library/user-event';

import { render, vi } from 'test-utils';

import { ICheckListItem } from '../types';

import { CheckListItem } from './CheckListItem';

const defaultProps: ICheckListItem = {
  id: '1',
  title: 'Title',
  description: 'Description',
  cta: <button>CTA</button>,
  isActive: false,
  isChecked: false,
  isLastElement: false,
  onClick: vi.fn(),
};

const renderComponent = (props: ICheckListItem) => {
  return render(<CheckListItem {...props} />);
};

describe('<CheckListItem> component', () => {
  it('should render as closed item if isActive is false and should be clickable', () => {
    const onClick = vi.fn();
    const { getByText, getByTestId } = renderComponent({
      ...defaultProps,
      onClick,
    });
    const item = getByTestId('checklist-item-1');

    expect(getByText('Title')).toBeInTheDocument();
    expect(item).toHaveAttribute('aria-expanded', 'false');
    userEvent.click(item);
    expect(onClick).toHaveBeenCalledWith('1');
  });

  it('should render as open item if isActive is true and should not be clickable', () => {
    const onClick = vi.fn();
    const onButtonClick = vi.fn();
    const { getByText, getByTestId, getByRole } = renderComponent({
      ...defaultProps,
      isActive: true,
      onClick,
      cta: <button onClick={onButtonClick}>CTA</button>,
    });
    const item = getByTestId('checklist-item-1');

    expect(getByText('Description')).toBeInTheDocument();
    expect(item).toHaveAttribute('aria-expanded', 'true');
    userEvent.click(item);
    expect(onClick).not.toHaveBeenCalled();
    userEvent.click(getByRole('button'));
    expect(onButtonClick).toHaveBeenCalled();
  });
});
