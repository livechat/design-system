import * as React from 'react';

import { vi } from 'vitest';

import { render, userEvent } from 'test-utils';

import { ActionBar, IActionBarProps } from './ActionBar';

vi.mock('@floating-ui/react-dom', () => {
  return {
    useFloating: vi.fn(() => {
      return {
        x: 0,
        y: 0,
        placement: 'bottom',
        middlewareData: {
          arrow: {
            x: 0,
            y: 0,
          },
        },
        refs: {
          floating: 0,
          reference: 0,
        },
      };
    }),
    arrow: vi.fn(),
    autoUpdate: vi.fn(),
    flip: vi.fn(),
    offset: vi.fn(),
    x: 0,
  };
});

const defaultOptions = [
  {
    key: 'one',
    element: <div>One</div>,
    label: 'One test',
    onClick: vi.fn(),
  },
  {
    key: 'two',
    element: <div>Two</div>,
    label: 'Two test',
    onClick: vi.fn(),
  },
  {
    key: 'three',
    element: <div>Three</div>,
    label: 'Three test',
    onClick: vi.fn(),
  },
];

const renderComponent = (props: IActionBarProps) => {
  return render(<ActionBar {...props} />);
};

describe('<ActionBar> component', () => {
  it('should render buttons', () => {
    const { getByText } = renderComponent({
      options: defaultOptions,
    });

    expect(getByText('One')).toBeVisible();
    expect(getByText('Two')).toBeVisible();
    expect(getByText('Three')).toBeVisible();
  });

  it('should call defined onClick function of selected button', () => {
    const onClick = vi.fn();
    const { getByText } = renderComponent({
      options: [
        ...defaultOptions,
        {
          key: 'four',
          element: <div>Four</div>,
          label: 'Four test',
          onClick: onClick,
        },
      ],
    });

    userEvent.click(getByText('Four'));
    expect(onClick).toBeCalled();
  });
});
