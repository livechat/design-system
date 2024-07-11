import {
  MoveTo,
  Edit,
  ContentCopy,
  Block,
  Delete,
} from '@livechat/design-system-icons';

import noop from '../../utils/noop';
import { Icon } from '../Icon';

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
    withDivider: true,
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
  },
  ...[...Array(10)].map((_, index) => ({
    key: `option${index + 8}`,
    element: <ActionMenuItem>{`Menu item #${index + 8}`}</ActionMenuItem>,
    onClick: noop,
  })),
];
