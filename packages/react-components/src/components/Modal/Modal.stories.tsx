import * as React from 'react';

import { GreetingQuickReply } from '@livechat/design-system-icons';
import { Meta, StoryFn } from '@storybook/react';

import noop from '../../utils/noop';
import { Button } from '../Button';

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
  subcomponents: { ModalHeader },
  parameters: {
    viewMode: 'story',
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    layout: 'centered',
  },
} as Meta<typeof ModalComponent>;

const defaultModalProps = {
  children: <ModalContent />,
  closeOnEscPress: true,
  closeOnOverlayPress: true,
  footer: <ModalFooter />,
  onClose: () => noop,
};

const StoryTemplate: StoryFn<ModalProps> = ({
  children,
  ...args
}: ModalProps): React.ReactElement => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      {isOpen && (
        <ModalComponent
          {...args}
          title="Modal"
          onClose={() => setIsOpen(false)}
        >
          {children}
        </ModalComponent>
      )}
    </>
  );
};

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
        source: GreetingQuickReply,
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
        source: GreetingQuickReply,
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
  labelHeading: (
    <ModalHeader
      title="Modal Header"
      avatarProps={{
        type: 'image',
        size: 'small',
        src: 'https://cdn-labs.livechat-files.com/api/file/lc/img/100019504/df59da4b5b0cdb6030efb08787fd255d.jpg',
      }}
    >
      {' '}
      Modal description{' '}
    </ModalHeader>
  ),
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
