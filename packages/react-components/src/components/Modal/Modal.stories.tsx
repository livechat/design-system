import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Error } from '@livechat/design-system-icons/react/material';

import {
  Modal as ModalComponent,
  ModalProps,
  ActionModal as ActionModalComponent,
  ActionModalProps,
  ModalPortal as ModalPortalComponent,
  ModalPortalProps,
  ModalBase,
} from './index';
import { Button } from '../Button';
import { Icon, IconSizeName } from '../Icon';

export default {
  title: 'Components/Modal',
  component: ModalComponent,
} as ComponentMeta<typeof ModalComponent>;

export const Modal = ({
  children,
  ...args
}: ModalProps): React.ReactElement => (
  <ModalComponent {...args}>{children}</ModalComponent>
);

Modal.args = {
  heading: 'Modal',
  children: 'Modal content',
  closeOnEscPress: true,
  style: { width: '600px', height: '400px' },
  footer: (
    <React.Fragment>
      <Button size="medium" kind="secondary" style={{ marginRight: '8px' }}>
        Secondary
      </Button>
      <Button kind="primary" size="medium">
        Primary
      </Button>
    </React.Fragment>
  ),
} as ModalProps;

export const ActionModal = ({
  children,
  ...args
}: ActionModalProps): React.ReactElement => (
  <ActionModalComponent {...args}>{children}</ActionModalComponent>
);

ActionModal.args = {
  heading: 'Danger! Danger!',
  style: { width: '410px' },
  closeOnEscPress: true,
  children:
    'You’re about to do something that cannot be undone. Are you sure you want to continue?',
  actions: (
    <React.Fragment>
      <Button size="medium" kind="secondary" style={{ marginRight: '8px' }}>
        Wait, go back
      </Button>
      <Button kind="destructive" size="medium">
        Yes, delete
      </Button>
    </React.Fragment>
  ),
  icon: <Icon source={Error} size={IconSizeName.XLarge} />,
} as ActionModalProps;

export const ModalPortal = ({
  children,
  ...args
}: ModalPortalProps): React.ReactElement => (
  <ModalPortalComponent {...args}>{children}</ModalPortalComponent>
);

ModalPortal.args = {
  children: (
    <ModalBase onClose={() => ({})} style={{ width: '600px', height: '400px' }}>
      <div style={{ margin: 'auto' }}>Modal Portal content</div>
    </ModalBase>
  ),
} as ModalPortalProps;
