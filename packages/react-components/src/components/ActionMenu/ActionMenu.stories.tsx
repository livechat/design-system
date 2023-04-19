import { ComponentMeta } from '@storybook/react';
import { MoreHoriz } from '@livechat/design-system-icons/react/tabler';
import { Icon } from '../Icon';
import { ActionMenu, ActionMenuProps } from './ActionMenu';

const items = [
  {
    key: 'one',
    element: <div>Option one</div>,
    onClick: () => console.log('one'),
  },
  {
    key: 'two',
    element: <div>Option two</div>,
    disabled: true,
    onClick: () => console.log('two'),
  },
  {
    key: 'three',
    element: <div>Option three</div>,
    onClick: () => console.log('three'),
    withDivider: true,
  },
];

export default {
  title: 'Components/ActionMenu',
  component: ActionMenu,
} as ComponentMeta<typeof ActionMenu>;

export const Default = (args: ActionMenuProps): JSX.Element => (
  <div style={{ marginLeft: 200 }}>
    <ActionMenu {...args} />
  </div>
);
Default.args = {
  options: items,
  triggerRenderer: <Icon source={MoreHoriz} kind="primary" />,
};
