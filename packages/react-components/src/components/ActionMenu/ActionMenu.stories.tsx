import { ComponentMeta } from '@storybook/react';
import {
  MoreHoriz,
  AccountCircle,
  Add,
  ArrowForward,
  Block,
  ChatDots,
} from '@livechat/design-system-icons/react/tabler';
import { Icon } from '../Icon';
import { ActionMenu, ActionMenuProps } from './ActionMenu';

import './ActionMenu.stories.css';
import noop from '../../utils/noop';

const items = [
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

export default {
  title: 'Components/ActionMenu',
  component: ActionMenu,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof ActionMenu>;

export const Default = (args: ActionMenuProps): JSX.Element => (
  <div style={{ marginLeft: 200, marginBottom: 220 }}>
    <ActionMenu data-testid={'test id'} {...args} />
  </div>
);
Default.args = {
  options: items,
  triggerRenderer: <Icon source={MoreHoriz} kind="primary" />,
};
