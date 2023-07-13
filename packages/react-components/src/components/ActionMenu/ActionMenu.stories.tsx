import * as React from 'react';
import { MoreHoriz } from '@livechat/design-system-icons/react/tabler';
import { Icon } from '../Icon';
import { ActionMenu } from './ActionMenu';
import { ActionMenuItem } from './ActionMenuItem';
import { exampleOptions } from './constants';
import docs from './ActionMenu.mdx';
import './ActionMenu.stories.css';

export default {
  title: 'Components/ActionMenu',
  component: ActionMenu,
  subcomponents: {
    ActionMenuItem,
  },
  parameters: {
    docs: {
      page: docs,
      source: {
        code: null,
      },
    },
  },
};

export const Default = (): JSX.Element => (
  <div className="action-menu-preview">
    <ActionMenu
      options={exampleOptions}
      triggerRenderer={<Icon source={MoreHoriz} kind="primary" />}
      openedOnInit
    />
  </div>
);
