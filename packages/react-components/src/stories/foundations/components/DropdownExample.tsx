import * as React from 'react';
import { Button } from '../../../components/Button';
import Dropdown from '../../../components/dropdown/Dropdown';

const DropdownExample = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const buttonRef = React.useRef(null);
  const handleClose = () => {
    setIsVisible(false);
  };

  const handleTriggerClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Dropdown
      isVisible={isVisible}
      placement="bottom"
      onClose={handleClose}
      closeOnEscPress
      triggerRenderer={() => (
        <div ref={buttonRef}>
          <Button onClick={handleTriggerClick}>Menu</Button>
        </div>
      )}
      modifiers={{
        flip: {
          behavior: 'flip',
        },
        arrow: {
          enabled: true,
        },
      }}
      referenceElement={buttonRef.current}
    >
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <div style={{ padding: '20px' }}>Dropdown content</div>
        <Button onClick={handleClose}>Close</Button>
      </div>
    </Dropdown>
  );
};

export default DropdownExample;
