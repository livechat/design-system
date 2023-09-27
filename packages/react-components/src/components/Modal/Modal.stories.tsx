import * as React from 'react';

import { ComponentMeta, Story } from '@storybook/react';

import noop from '../../utils/noop';

import {
  ModalContent,
  ModalFullSpaceContent,
  ModalFooter,
} from './StoriesComponents';

import {
  Modal as ModalComponent,
  ModalProps,
  ModalPortal as ModalPortalComponent,
  ModalPortalProps,
  ModalHeader,
  ModalBase,
} from './index';

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
  footer: <ModalFooter />,
  onClose: () => noop,
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
  heading: 'Modal header',
} as ModalProps;

export const ModalWithCustomHeader = StoryTemplate.bind({});
ModalWithCustomHeader.args = {
  ...defaultModalProps,
  heading: (
    <ModalHeader
      title="Modal Header"
      iconProps={{
        name: 'GreetingQuickReply',
        kind: 'primary',
        size: 'large',
      }}
    >
      {' '}
      Modal description{' '}
    </ModalHeader>
  ),
} as ModalProps;

export const ModalWithLabeledHeader = StoryTemplate.bind({});
ModalWithLabeledHeader.args = {
  ...defaultModalProps,
  labelHeading: (
    <ModalHeader
      title="Modal Header"
      iconProps={{
        name: 'GreetingQuickReply',
        kind: 'primary',
        size: 'large',
        customColor: '#fff',
      }}
    >
      {' '}
      Modal description{' '}
    </ModalHeader>
  ),
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
