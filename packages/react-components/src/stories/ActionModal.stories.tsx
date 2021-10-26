import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  ActionModal as ActionModalComponent,
  IActionModalProps,
} from '../components/Modal/ActionModal';
import { Button } from '../components/Button';
import { Info } from '@livechat/design-system-icons/dist/material';
import { Icon, IconSizeName } from '../components/Icon';

export default {
  title: 'Components/Action Modal',
  component: ActionModalComponent,
} as ComponentMeta<typeof ActionModalComponent>;

export const ActionModal = ({
  children,
  ...args
}: IActionModalProps): React.ReactElement => (
  <ActionModalComponent {...args}>{children}</ActionModalComponent>
);

ActionModal.args = {
  heading: 'Danger! Danger!',
  style: { width: '410px' },
  children:
    'You’re about to do something that cannot be undone. Are you sure you want to continue?',
  actions: (
    <React.Fragment>
      <Button size="medium" kind="secondary" style={{ marginRight: '8px' }}>
        Secondary
      </Button>
      <Button kind="primary" size="medium">
        Primary
      </Button>
    </React.Fragment>
  ),
  icon: <Icon source={Info} size={IconSizeName.XLarge} />,
} as IActionModalProps;
