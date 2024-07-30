import * as React from 'react';

import { vi } from 'vitest';

import { render, userEvent } from 'test-utils';

import { DetailsCard, IDetailsCardProps } from './DetailsCard';

const label = 'Test label';
const text = 'Test text';

const defaultProps = {
  label: label,
  children: text,
};

const renderComponent = (props: IDetailsCardProps) => {
  return render(<DetailsCard {...props} />);
};

describe('<DetailsCard> component', () => {
  it('should render closed card with label by default', () => {
    const { getByTestId, getByText } = renderComponent(defaultProps);
    const label = getByTestId('details-card-label');

    expect(getByText('Test label')).toBeInTheDocument();
    expect(label).toHaveAttribute('aria-expanded', 'false');
  });

  it('should toggle the card on button click', () => {
    const { getByRole, getByTestId } = renderComponent(defaultProps);
    const button = getByRole('button');
    const label = getByTestId('details-card-label');

    userEvent.click(button);
    expect(label).toHaveAttribute('aria-expanded', 'true');

    userEvent.click(button);
    expect(label).toHaveAttribute('aria-expanded', 'false');
  });

  it('should hide the label if card is open when hideLabelOnOpen is set', () => {
    const { getByRole, getByTestId } = renderComponent({
      ...defaultProps,
      hideLabelOnOpen: true,
    });
    const label = getByTestId('details-card-label');
    const button = getByRole('button');

    expect(label).toHaveAttribute('aria-hidden', 'false');
    expect(label).toHaveAttribute('aria-expanded', 'false');

    userEvent.click(button);
    expect(label).toHaveAttribute('aria-expanded', 'true');
    expect(label).toHaveAttribute('aria-hidden', 'true');
  });

  it('should be open if openOnInit is set to true', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      openOnInit: true,
    });
    const label = getByTestId('details-card-label');

    expect(label).toHaveAttribute('aria-expanded', 'true');
  });

  it('should call onClick handler on label button click', () => {
    const handler = vi.fn();
    const { getByRole } = renderComponent({
      ...defaultProps,
      onClick: handler,
    });
    const button = getByRole('button');

    userEvent.click(button);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should display additional nodes when passed', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      leftNode: <div>Left node</div>,
      rightNode: <div>Right node</div>,
    });

    expect(getByText('Left node')).toBeInTheDocument();
    expect(getByText('Right node')).toBeInTheDocument();
  });

  it('should not call onClick handler if external interactive element is clicked', () => {
    const handler = vi.fn();
    const { getByRole, getByText } = renderComponent({
      ...defaultProps,
      onClick: handler,
      leftNode: <input />,
      rightNode: <span>text</span>,
    });
    const input = getByRole('textbox');
    const text = getByText('text');

    userEvent.click(input);
    expect(handler).toHaveBeenCalledTimes(0);
    userEvent.click(text);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
