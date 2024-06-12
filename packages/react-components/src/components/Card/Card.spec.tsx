import * as React from 'react';

import { render, vi, userEvent } from 'test-utils';

import { Card, CardProps } from './Card';

const renderComponent = (props: CardProps) => {
  return render(
    <Card {...props}>
      {props.children ? props.children : 'This example content'}
    </Card>
  );
};

describe('<Card> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({ className: 'my-css-class' });

    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should display title if it's provided', () => {
    const { getByText } = renderComponent({ title: 'Hello' });

    expect(getByText('Hello')).toBeInTheDocument();
  });

  it('should display image and description if provided', () => {
    const { getByText, getByRole } = renderComponent({
      title: 'Hello',
      src: 'https://via.placeholder.com/100',
      description: 'This is a description',
    });

    expect(getByText('This is a description')).toBeInTheDocument();
    expect(getByRole('img')).toBeInTheDocument();
  });

  it('should display image with alt text if provided', () => {
    const { getByAltText } = renderComponent({
      title: 'Hello',
      src: 'https://via.placeholder.com/100',
      alt: 'Image alt text',
    });

    expect(getByAltText('Image alt text')).toBeInTheDocument();
  });

  it('should not display header elements if title is not provided', () => {
    const { queryByText, queryByRole } = renderComponent({
      title: '',
      src: 'https://via.placeholder.com/100',
      description: 'This is a description',
    });

    expect(queryByText('This is a description')).not.toBeInTheDocument();
    expect(queryByRole('img')).not.toBeInTheDocument();
  });

  it('should display text children', () => {
    const { getByText } = renderComponent({});

    expect(getByText('This example content')).toBeInTheDocument();
  });

  it('should display nested elements as children', () => {
    const { getByRole } = renderComponent({ children: <h3>Header text</h3> });
    const nestedHeading = getByRole('heading');

    expect(nestedHeading).toBeInTheDocument();
    expect(nestedHeading).toHaveTextContent('Header text');
  });

  it('should show expandable button if expandableContent is provided and allow user to interact with it, showing and hiding expandable content', () => {
    const expandableText = 'Expanded text';
    const { queryByText, getByRole } = renderComponent({
      title: 'Hello',
      expandableContent: expandableText,
    });
    const expander = getByRole('button');

    expect(expander).toBeInTheDocument();
    expect(expander).toHaveTextContent('Show more');
    expect(queryByText(expandableText)).not.toBeInTheDocument();
    userEvent.click(expander);

    expect(expander).toHaveTextContent('Hide');
    expect(queryByText(expandableText)).toBeInTheDocument();
    userEvent.click(expander);

    expect(expander).toHaveTextContent('Show more');
    expect(queryByText(expandableText)).not.toBeInTheDocument();
  });

  it('should display action buttons if provided and call their handlers on user click', () => {
    const secondaryAction = vi.fn();
    const destructiveAction = vi.fn();
    const { getByRole } = renderComponent({
      buttonsOptions: [
        {
          kind: 'secondary',
          onClick: secondaryAction,
          children: 'Details',
        },
        {
          kind: 'destructive',
          onClick: destructiveAction,
          children: 'Delete',
        },
      ],
    });
    const secondaryButton = getByRole('button', { name: 'Details' });
    const destructiveButton = getByRole('button', { name: 'Delete' });

    expect(secondaryButton).toBeInTheDocument();
    expect(destructiveButton).toBeInTheDocument();
    userEvent.click(secondaryButton);
    expect(secondaryAction).toHaveBeenCalled();
    userEvent.click(destructiveButton);
    expect(destructiveAction).toHaveBeenCalled();
  });
});
