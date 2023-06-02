import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import { GreetingQuickReply } from '@livechat/design-system-icons/react/material';

import {
  Modal as ModalComponent,
  ModalProps,
  ModalPortal as ModalPortalComponent,
  ModalPortalProps,
  ModalBase,
} from './index';
import { ModalContent, ModalFullSpaceContent } from './StoriesComponents';
import { ModalHeader } from './ModalHeader';
import { ModalFooter } from './ModalFooter';
import { Button } from '../Button';

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
  // children: <ModalContent />,
  closeOnEscPress: true,
  closeOnOverlayPress: true,
};

function onClose() {
  console.log('onClose');
}

const StoryTemplate: Story<ModalProps> = ({
  children,
  ...args
}: ModalProps): React.ReactElement => (
  <ModalComponent {...args} title="Modal">
    <ModalHeader
      headerType="heading"
      title="Header Title"
      onClose={onClose}
      icon={GreetingQuickReply}
    >
      Header description
    </ModalHeader>
    <ModalContent />
    <ModalFooter>
      <Button
        size="medium"
        kind="secondary"
        style={{ marginRight: '8px' }}
        className="full-space-button"
      >
        Secondary
      </Button>
      <Button kind="primary" size="medium" className="full-space-button ">
        Primary
      </Button>
    </ModalFooter>
  </ModalComponent>
);

export const Modal = StoryTemplate.bind({});
Modal.args = {
  ...defaultModalProps,
} as ModalProps;

export const ModalWithCustomHeader = StoryTemplate.bind({});
ModalWithCustomHeader.args = {
  ...defaultModalProps,
} as ModalProps;

export const ModalWithLabeledHeader = StoryTemplate.bind({});
ModalWithLabeledHeader.args = {
  ...defaultModalProps,
} as ModalProps;

export const ModalWithFullSpaceContent = StoryTemplate.bind({});
ModalWithFullSpaceContent.args = {
  ...defaultModalProps,
  children: <ModalFullSpaceContent />,
  fullSpaceContent: true,
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
