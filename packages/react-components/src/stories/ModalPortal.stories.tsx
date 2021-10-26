import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  ModalPortal as ModalPortalComponent,
  IModalPortalProps,
} from '../components/Modal/ModalPortal';
import { ModalBase } from '../components/Modal/ModalBase';

export default {
  title: 'Components/Modal Portal',
  component: ModalPortalComponent,
} as ComponentMeta<typeof ModalPortalComponent>;

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
