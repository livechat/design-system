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
  ModalContent,
  ModalFullSpaceContent,
  ModalHeader,
} from './StoriesComponents';

import { action } from '@storybook/addon-actions';
import { NewModalHeader } from './ModalHeader';
import { GreetingQuickReply } from '@livechat/design-system-icons/react/material';

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
  children: <ModalContent />,
  closeOnEscPress: true,
  closeOnOverlayPress: true,
  footerLabel: 'Footer label',
  footerButtons: [
    {
      kind: 'secondary',
      size: 'wide',
      onClick: action('Secondary action clicked'),
      children: 'Secondary',
    },
    {
      kind: 'primary',
      size: 'medium',
      onClick: action('Primary action clicked'),
      children: 'Primary',
    },
  ],
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
  headingType: 'labelHeading',
  headerTitle: 'Title',
  headerDescription: 'Description',
} as ModalProps;

export const ModalWithLabeledHeader = StoryTemplate.bind({});
ModalWithLabeledHeader.args = {
  ...defaultModalProps,
  headingType: 'heading',
  headerTitle: 'Title',
  headerDescription: 'Description',
  icon: GreetingQuickReply,
} as ModalProps;

export const ModalWithFullSpaceContent = StoryTemplate.bind({});
ModalWithFullSpaceContent.args = {
  ...defaultModalProps,
  children: <ModalFullSpaceContent />,
  fullSpaceContent: true,
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
