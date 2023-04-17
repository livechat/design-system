import { GreetingQuickReply } from '@livechat/design-system-icons/react/material';
import { Button } from '../Button';
import { Icon } from '../Icon';
import './Modal.stories.css';
import modalImage from './assets/modal-image.png';
import { Heading, Text } from '../Typography';
import { FormField } from '../FormField';
import { Input } from '../Input';
import { defaultPickerOptions } from '../Picker/constants';
import { Picker } from '../Picker';
import noop from '../../utils/noop';
import { FC } from 'react';

interface ModalHeaderProps {
  color?: string;
}

export const ModalHeader: FC<ModalHeaderProps> = ({ color }) => {
  return (
    <div className="heading-wrapper">
      <Icon
        source={GreetingQuickReply}
        kind="primary"
        size="large"
        className="heading-icon"
        customColor={color}
      />
      <div className="heading">
        <div>Modal Header</div>
        <div className="heading-description">Modal description</div>
      </div>
    </div>
  );
};

export const ModalFooter: FC = () => {
  return (
    <div>
      <Button size="medium" kind="secondary" style={{ marginRight: '8px' }}>
        Secondary
      </Button>
      <Button kind="primary" size="medium">
        Primary
      </Button>
    </div>
  );
};

export const ModalFullSpaceContent: FC = () => {
  return (
    <div className="full-space-wrapper">
      <img src={modalImage} alt="modal image" />
      <div className="full-space-content">
        <Heading size="lg" as="div" className="full-space-header">
          Modal header
        </Heading>
        <div className="full-space-text">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </div>
        <div className="full-space-buttons">
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
        </div>
      </div>
    </div>
  );
};

export const ModalContent: FC = () => (
  <div style={{ maxWidth: 400 }}>
    <Heading size="lg" as="div">
      Modal header
    </Heading>
    <Text size="sm">
      Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
      Velit officia consequat duis enim velit mollit. Exercitation veniam
      consequat sunt nostrud amet.
    </Text>
    <FormField className="example-field" labelText="Options">
      <Picker options={defaultPickerOptions} onSelect={noop} />
    </FormField>
    <FormField className="example-field" labelText="Name" labelFor="input-name">
      <Input id="input-name" />
    </FormField>
    <FormField
      className="example-field"
      labelText="E-mail"
      labelFor="input-email"
    >
      <Input id="input-email" type="email" />
    </FormField>
  </div>
);
