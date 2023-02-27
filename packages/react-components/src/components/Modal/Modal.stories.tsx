import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import {
  Modal as ModalComponent,
  ModalProps,
  ModalPortal as ModalPortalComponent,
  ModalPortalProps,
  ModalBase,
} from './index';
import {
  ModalFooter,
  ModalFullSpaceContent,
  ModalHeader,
} from './StoriesComponents';

export default {
  title: 'Components/Modal',
  component: ModalComponent,
  parameters: {
    viewMode: 'story',
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
} as ComponentMeta<typeof ModalComponent>;

const defaultModalProps = {
  children: 'Modal content',
  closeOnEscPress: true,
  closeOnOverlayPress: true,
  style: { width: '600px', height: '400px' },
  footer: <ModalFooter />,
};

const StoryTemplate: Story<ModalProps> = ({
  children,
  ...args
}: ModalProps): React.ReactElement => (
  <ModalComponent {...args} title="Modal">
    {children}
  </ModalComponent>
);

export const Modal = StoryTemplate.bind({});
Modal.args = {
  ...defaultModalProps,
  heading: 'Modal',
} as ModalProps;

export const ModalWithCustomHeader = StoryTemplate.bind({});
ModalWithCustomHeader.args = {
  ...defaultModalProps,
  heading: <ModalHeader />,
} as ModalProps;

export const ModalWithLabeledHeader = StoryTemplate.bind({});
ModalWithLabeledHeader.args = {
  ...defaultModalProps,
  labelHeading: <ModalHeader color="#fff" />,
} as ModalProps;

export const ModalWithFullSpaceContent = StoryTemplate.bind({});
ModalWithFullSpaceContent.args = {
  ...defaultModalProps,
  children: <ModalFullSpaceContent />,
  fullSpaceContent: true,
  style: { width: '600px' },
  footer: null,
} as ModalProps;

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
