import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  Modal as ModalComponent,
  IModalProps,
} from '../components/Modal/Modal';
import { Button } from '../components/Button';

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
