import { ComponentMeta } from '@storybook/react';
import { MoreHoriz } from '@livechat/design-system-icons/react/tabler';
import { Icon } from '../Icon';
import { ActionMenu } from './ActionMenu';
import { exampleOptions } from './constants';
import docs from './ActionMenuDocs.mdx';

import './ActionMenu.stories.css';

export default {
  title: 'Components/ActionMenu',
  component: ActionMenu,
  parameters: {
    docs: {
      page: docs,
      source: {
        code: null,
      },
    },
  },
} as ComponentMeta<typeof ActionMenu>;

export const Default = (): JSX.Element => (
  <div style={{ marginBottom: 160 }}>
    <ActionMenu
      options={exampleOptions}
      triggerRenderer={<Icon source={MoreHoriz} kind="primary" />}
    />
  </div>
);
