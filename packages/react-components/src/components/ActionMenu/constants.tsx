import {
  AccountCircle,
  Add,
  ArrowForward,
  Block,
  ChatDots,
} from '@livechat/design-system-icons/react/tabler';
import { Icon } from '../Icon';
import noop from '../../utils/noop';

export const exampleOptions = [
  {
    key: 'one',
    element: (
      <>
        <Icon source={AccountCircle} className="menu-item-icon" /> Option one
      </>
    ),
    onClick: noop,
  },
  {
    key: 'two',
    element: (
      <>
        <Icon source={Add} className="menu-item-icon" /> Option two
      </>
    ),
    onClick: noop,
  },
  {
    key: 'three',
    element: (
      <>
        <Icon source={ArrowForward} className="menu-item-icon" /> Option three
      </>
    ),
    onClick: noop,
  },
  {
    key: 'four',
    element: (
      <>
        <Icon source={Block} className="menu-item-icon" /> Option four
      </>
    ),
    onClick: noop,
    disabled: true,
  },
  {
    key: 'five',
    element: (
      <>
        <Icon source={ChatDots} className="menu-item-icon" /> Option five
      </>
    ),
    onClick: noop,
    withDivider: true,
  },
];
