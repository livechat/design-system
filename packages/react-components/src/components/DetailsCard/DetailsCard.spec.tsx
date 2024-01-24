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
    const { getByText, getByTestId } = renderComponent(defaultProps);

    expect(getByText(label)).toBeVisible();
    expect(getByTestId('details-card-label')).toHaveAttribute(
      'aria-expanded',
      'false'
    );
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

  it('should call onClick handler on label click', () => {
    const handler = vi.fn();
    const { getByRole } = renderComponent({
      ...defaultProps,
      onClick: handler,
    });
    const button = getByRole('button');
    userEvent.click(button);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
