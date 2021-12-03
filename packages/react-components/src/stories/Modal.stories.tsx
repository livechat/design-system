import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  Modal as ModalComponent,
  IModalProps,
} from '../components/Modal/Modal';
import {
  ActionModal as ActionModalComponent,
  IActionModalProps,
} from '../components/Modal/ActionModal';
import {
  ModalPortal as ModalPortalComponent,
  IModalPortalProps,
} from '../components/Modal/ModalPortal';
import { Button } from '../components/Button';
import { Icon, IconSizeName } from '../components/Icon';
import { Error } from '@livechat/design-system-icons/dist/material';
import { ModalBase } from '../components/Modal/ModalBase';

export default {
  title: 'Components/Modal',
  component: ModalComponent,
} as ComponentMeta<typeof ModalComponent>;

export const Modal = ({
  children,
  ...args
}: IModalProps): React.ReactElement => (
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
} as IModalProps;

export const ActionModal = ({
  children,
  ...args
}: IActionModalProps): React.ReactElement => (
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
} as IActionModalProps;

export const ModalPortal = ({
  children,
  ...args
}: IModalPortalProps): React.ReactElement => (
  <ModalPortalComponent {...args}>{children}</ModalPortalComponent>
);

ModalPortal.args = {
  children: (
    <ModalBase onClose={() => ({})} style={{ width: '600px', height: '400px' }}>
      <div style={{ margin: 'auto' }}>Modal Portal content</div>
    </ModalBase>
  ),
} as IModalPortalProps;
