import * as React from 'react';
import { GreetingQuickReply } from '@livechat/design-system-icons/react/material';
import { Button } from '../Button';
import { Icon } from '../Icon';
import './Modal.stories.css';
import modalImage from './modal-image.png';
import { Heading } from '../Typography';

interface ModalHeaderProps {
  color?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ color }) => {
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

export const ModalFooter: React.FC = () => {
  return (
    <React.Fragment>
      <Button size="medium" kind="secondary" style={{ marginRight: '8px' }}>
        Secondary
      </Button>
      <Button kind="primary" size="medium">
        Primary
      </Button>
    </React.Fragment>
  );
};

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
