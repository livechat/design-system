import * as React from 'react';

import { Icon } from '@livechat/design-system-icons';

import noop from '../../utils/noop';

import { ActionMenuItem } from './ActionMenuItem';

export const exampleOptions = [
  {
    key: 'one',
    element: (
      <ActionMenuItem leftNode={<Icon name="ContentCopy" />}>
        Copy
      </ActionMenuItem>
    ),
    onClick: noop,
  },
  {
    key: 'two',
    element: (
      <ActionMenuItem leftNode={<Icon name="MoveTo" />}>
        Move to...
      </ActionMenuItem>
    ),
    onClick: noop,
  },
  {
    key: 'three',
    element: (
      <ActionMenuItem leftNode={<Icon name="Edit" />}>Edit</ActionMenuItem>
    ),
    onClick: noop,
  },
  {
    key: 'four',
    element: (
      <ActionMenuItem leftNode={<Icon name="Block" />}>Block</ActionMenuItem>
    ),
    disabled: true,
    onClick: noop,
  },
  {
    key: 'five',
    element: (
      <ActionMenuItem kind="warning" leftNode={<Icon name="Delete" />}>
        Delete item
      </ActionMenuItem>
    ),
    onClick: noop,
    withDivider: true,
  },
];
