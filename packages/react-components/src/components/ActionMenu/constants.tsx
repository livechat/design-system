import * as React from 'react';
import {
  MoveTo,
  Edit,
  ContentCopy,
  Block,
  Delete,
} from '@livechat/design-system-icons/react/tabler';
import { Icon } from '../Icon';
import noop from '../../utils/noop';
import { ActionMenuItem } from './ActionMenuItem';

export const exampleOptions = [
  {
    key: 'one',
    element: (
      <ActionMenuItem leftNode={<Icon source={ContentCopy} />}>
        Copy
      </ActionMenuItem>
    ),
    onClick: noop,
  },
  {
    key: 'two',
    element: (
      <ActionMenuItem leftNode={<Icon source={MoveTo} />}>
        Move to...
      </ActionMenuItem>
    ),
    onClick: noop,
  },
  {
    key: 'three',
    element: (
      <ActionMenuItem leftNode={<Icon source={Edit} />}>Edit</ActionMenuItem>
    ),
    onClick: noop,
  },
  {
    key: 'four',
    element: (
      <ActionMenuItem leftNode={<Icon source={Block} />}>Block</ActionMenuItem>
    ),
    disabled: true,
    onClick: noop,
  },
  {
    key: 'five',
    element: (
      <ActionMenuItem kind="warning" leftNode={<Icon source={Delete} />}>
        Delete item
      </ActionMenuItem>
    ),
    onClick: noop,
    withDivider: true,
  },
];
