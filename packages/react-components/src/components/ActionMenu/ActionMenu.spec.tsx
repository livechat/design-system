import * as React from 'react';
import { render, userEvent, fireEvent } from 'test-utils';
import noop from '../../utils/noop';
import { vi } from 'vitest';
import { ActionMenu, ActionMenuProps } from './ActionMenu';
import { exampleOptions } from './constants';

vi.mock('@floating-ui/react-dom', () => {
  return {
    useFloating: vi.fn(() => {
      return {
        x: 0,
        y: 0,
        placement: 'bottom',
        refs: {
          floating: 0,
          reference: 0,
        },
      };
    }),
    autoUpdate: vi.fn(),
    flip: vi.fn(),
    offset: vi.fn(),
    x: 0,
  };
});

const defaultProps = {
  options: exampleOptions,
  triggerRenderer: <div>Open menu</div>,
};

const renderComponent = (props: ActionMenuProps) => {
  return render(<ActionMenu data-testid="action-menu-test" {...props} />);
};

describe('<ActionMenu> component', () => {
  it('should render trigger button with given element', () => {
    const { getByTestId } = renderComponent(defaultProps);
    const trigger = getByTestId('action-menu-trigger-button');

    expect(trigger).toBeVisible();
    expect(trigger).toHaveTextContent('Open menu');
  });

  it('should show the menu list after trigger click', () => {
    const { getByTestId } = renderComponent(defaultProps);
    const trigger = getByTestId('action-menu-trigger-button');

    userEvent.click(trigger);
    expect(getByTestId('action-menu-test')).toHaveAttribute(
      'aria-hidden',
      'false'
    );
  });

  it('should call defined onClick function after menu item click', () => {
    const onClick = vi.fn();
    const { getByTestId, getByText } = renderComponent({
      ...defaultProps,
      options: [
        {
          key: 'one',
          element: 'Option one',
          onClick: noop,
        },
        {
          key: 'two',
          element: 'Option two',
          onClick: onClick,
        },
      ],
    });
    const trigger = getByTestId('action-menu-trigger-button');

    userEvent.click(trigger);
    userEvent.click(getByText('Option two'));
    expect(onClick).toBeCalled();
  });

  it('should keep menu open after option click if keepOpenOnClick is true', () => {
    const onClick = vi.fn();
    const { getByTestId, getByText } = renderComponent({
      ...defaultProps,
      keepOpenOnClick: true,
      options: [
        {
          key: 'one',
          element: 'Option one',
          onClick: noop,
        },
        {
          key: 'two',
          element: 'Option two',
          onClick: onClick,
        },
      ],
    });
    const trigger = getByTestId('action-menu-trigger-button');

    fireEvent.click(trigger);
    fireEvent.click(getByText('Option two'));
    expect(getByTestId('action-menu-test')).toHaveAttribute(
      'aria-hidden',
      'false'
    );
  });
});
