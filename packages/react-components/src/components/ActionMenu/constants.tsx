import * as React from 'react';
import {
  AccountCircle,
  Add,
  ArrowForward,
  Block,
  ChatDots,
} from '@livechat/design-system-icons/react/tabler';
import { Icon } from '../Icon';
import noop from '../../utils/noop';
import { ActionMenuItem } from './ActionMenuItem';

export const exampleOptions = [
  {
    key: 'one',
    element: (
      <ActionMenuItem leftNode={<Icon source={ArrowForward} />}>
        Option one
      </ActionMenuItem>
    ),
    onClick: noop,
  },
  {
    key: 'two',
    element: (
      <ActionMenuItem leftNode={<Icon source={AccountCircle} />}>
        Option two
      </ActionMenuItem>
    ),
    onClick: noop,
  },
  {
    key: 'three',
    element: (
      <ActionMenuItem leftNode={<Icon source={Add} />}>
        Option three
      </ActionMenuItem>
    ),
    onClick: noop,
  },
  {
    key: 'four',
    element: (
      <ActionMenuItem leftNode={<Icon source={Block} />}>
        Option four
      </ActionMenuItem>
    ),
    disabled: true,
    onClick: noop,
  },
  {
    key: 'five',
    element: (
      <ActionMenuItem leftNode={<Icon source={ChatDots} />}>
        Option five
      </ActionMenuItem>
    ),
    onClick: noop,
    withDivider: true,
  },
];
