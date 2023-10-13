import * as React from 'react';

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
    const { getByText, getByRole } = renderComponent(defaultProps);

    expect(getByText(label)).toBeVisible();
    expect(getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  });

  it('should toggle the card on button click', () => {
    const { getByRole } = renderComponent(defaultProps);
    const button = getByRole('button');

    userEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    userEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('should hide the label if card is open when hideLabelOnOpen is set', () => {
    const { queryByTestId, getByTestId } = renderComponent({
      ...defaultProps,
      hideLabelOnOpen: true,
    });
    const button = getByTestId('details-card-button');
    const floatButton = queryByTestId('details-card-floating-button');

    expect(button).toHaveAttribute('aria-hidden', 'false');
    expect(floatButton).toBeInTheDocument();
    expect(floatButton).toHaveAttribute('aria-expanded', 'false');
    userEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-hidden', 'true');
    expect(floatButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('should be open if openOnInit is set to true', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      openOnInit: true,
    });
    const button = getByRole('button');

    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});
