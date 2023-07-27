import * as React from 'react';

import noop from '../../utils/noop';
import { Button } from '../Button';
import './Modal.stories.css';
import { FormField } from '../FormField';
import { Input } from '../Input';
import { Picker } from '../Picker';
import { defaultPickerOptions } from '../Picker/constants';
import { Heading, Text } from '../Typography';

import modalImage from './assets/modal-image.png';

export const ModalFullSpaceContent: React.FC = () => {
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

export const ModalContent: React.FC = () => (
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

export const ModalFooter: React.FC = () => {
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
