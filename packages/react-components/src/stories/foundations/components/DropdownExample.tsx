import * as React from 'react';
import { Button } from '../../../components/Button';
import Dropdown from '../../../components/dropdown/Dropdown';
import * as PopperCore from '@popperjs/core';

export interface IDropdownExample {
  placement: PopperCore.Placement;
}

const DropdownExample: React.FC<IDropdownExample> = ({ placement }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const handleClose = () => {
    setIsVisible(false);
  };

  const handleTriggerClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div
      style={{
        width: '500px',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Dropdown
        isVisible={isVisible}
        placement={placement}
        onClose={handleClose}
        closeOnEscPress
        triggerRenderer={() => (
          <div>
            <Button onClick={handleTriggerClick}>Menu</Button>
          </div>
        )}
        modifiers={{
          arrow: {},
          preventOverflow: {},
        }}
      >
        <div style={{ padding: '100px', textAlign: 'center' }}>
          <div style={{ padding: '20px' }}>Dropdown content</div>
          <Button onClick={handleClose}>Close</Button>
        </div>
      </Dropdown>
    </div>
  );
};

export default DropdownExample;
