import { ComponentMeta } from '@storybook/react';
import { MoreHoriz } from '@livechat/design-system-icons/react/tabler';
import { Icon } from '../Icon';
import { ActionMenu } from './ActionMenu';
import { ActionMenuItemsDocumentationProps, exampleOptions } from './constants';

import './ActionMenu.stories.css';

export default {
  title: 'Components/ActionMenu',
  component: ActionMenu,
  argTypes: {
    className: {
      description: 'The CSS class for menu container',
      control: {
        disable: true,
      },
    },
    options: {
      description: 'Array of menu options',
      table: {
        type: {
          summary: 'ActionMenuItemsProps',
          detail: ActionMenuItemsDocumentationProps,
        },
      },
      control: {
        disable: true,
      },
    },
    triggerRenderer: {
      description: 'Trigger element',
      control: {
        disable: true,
      },
    },
    onClick: {
      table: {
        disable: true,
      },
      action: 'clicked',
    },
  },
} as ComponentMeta<typeof ActionMenu>;

export const Default = (): JSX.Element => (
  <div style={{ marginLeft: 200, marginBottom: 220 }}>
    <ActionMenu
      options={exampleOptions}
      triggerRenderer={<Icon source={MoreHoriz} kind="primary" />}
    />
  </div>
);
