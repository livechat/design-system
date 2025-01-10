import {
  MoveTo,
  Edit,
  ContentCopy,
  Block,
  Delete,
} from '@livechat/design-system-icons';

import noop from '../../utils/noop';
import { Icon } from '../Icon';
import { ListItem } from '../ListItem';

export const exampleOptions = [
  {
    key: 'one',
    element: <ListItem leftNode={<Icon source={ContentCopy} />}>Copy</ListItem>,
    onClick: noop,
  },
  {
    key: 'two',
    element: (
      <ListItem leftNode={<Icon source={MoveTo} />}>Move to...</ListItem>
    ),
    onClick: noop,
  },
  {
    key: 'three',
    element: <ListItem leftNode={<Icon source={Edit} />}>Edit</ListItem>,
    onClick: noop,
  },
  {
    key: 'four',
    element: <ListItem leftNode={<Icon source={Block} />}>Block</ListItem>,
    disabled: true,
    withDivider: true,
    onClick: noop,
  },
  {
    key: 'five',
    element: (
      <ListItem kind="warning" leftNode={<Icon source={Delete} />}>
        Delete item
      </ListItem>
    ),
    onClick: noop,
  },
  ...[...Array(10)].map((_, index) => ({
    key: `option${index + 8}`,
    element: <ListItem>{`Menu item #${index + 8}`}</ListItem>,
    onClick: noop,
  })),
];
