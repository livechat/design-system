import * as React from 'react';

import { vi } from 'vitest';

import { render, userEvent, fireEvent } from 'test-utils';

import noop from '../../utils/noop';

import { ActionMenu } from './ActionMenu';
import { exampleOptions } from './constants';
import { IActionMenuProps } from './types';

const defaultProps = {
  options: exampleOptions,
  triggerRenderer: <div>Open menu</div>,
};

const renderComponent = (props: IActionMenuProps) => {
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
    const { getByTestId, queryByTestId } = renderComponent(defaultProps);
    const trigger = getByTestId('action-menu-trigger-button');

    expect(queryByTestId('action-menu-test')).not.toBeInTheDocument();
    userEvent.click(trigger);
    expect(queryByTestId('action-menu-test')).toBeInTheDocument();
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
    expect(onClick).toHaveBeenCalled();
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
    expect(getByTestId('action-menu-test')).toBeInTheDocument();
  });

  it('should call onOpen and onClose actions on menu visibility change', () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();
    const { getByTestId } = renderComponent({
      ...defaultProps,
      onOpen: onOpen,
      onClose: onClose,
    });
    const trigger = getByTestId('action-menu-trigger-button');

    fireEvent.click(trigger);
    expect(onOpen).toHaveBeenCalled();
    fireEvent.click(trigger);
    expect(onClose).toHaveBeenCalled();
  });

  it('should not change menu visibility in controlled state', () => {
    const { getByTestId, queryByTestId } = renderComponent({
      ...defaultProps,
      visible: false,
    });
    const trigger = getByTestId('action-menu-trigger-button');

    expect(queryByTestId('action-menu-test')).not.toBeInTheDocument();
    fireEvent.click(trigger);
    expect(queryByTestId('action-menu-test')).not.toBeInTheDocument();
  });

  it('should show the menu on render if openedOnInit is true', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      openedOnInit: true,
    });

    expect(getByTestId('action-menu-test')).toBeInTheDocument();
  });

  it('should show menu footer if footer is defined', () => {
    const { getByTestId, getByText } = renderComponent({
      ...defaultProps,
      footer: <div>Footer</div>,
    });
    const trigger = getByTestId('action-menu-trigger-button');

    fireEvent.click(trigger);
    expect(getByText('Footer')).toBeInTheDocument();
  });

  it('should show selected item icon if selectedOptions is defined', () => {
    const selectedOptionsKeys = ['one', 'two'];
    const { getByTestId } = renderComponent({
      ...defaultProps,
      selectedOptions: selectedOptionsKeys,
    });
    const trigger = getByTestId('action-menu-trigger-button');

    fireEvent.click(trigger);
    selectedOptionsKeys.map((key) =>
      expect(getByTestId(`${key}-selected-icon`)).toBeInTheDocument()
    );
  });
});
