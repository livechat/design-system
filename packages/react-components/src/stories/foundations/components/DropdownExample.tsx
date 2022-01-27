import * as React from 'react';
import { Button } from '../../../components/Button';
import Dropdown from '../../../components/dropdown/Dropdown';
import * as PopperCore from '@popperjs/core';

import { DropDown } from '@livechat/design-system-icons/dist/material';
import { Icon, IconSizeName, IconTypeName } from '../../../components/Icon';

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
            <Button
              onClick={handleTriggerClick}
              icon={<Icon source={DropDown} />}
              iconPosition={'right'}
            >
              Open dropdown
            </Button>
          </div>
        )}
        modifiers={{
          preventOverflow: {},
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '12px',
            width: '308px',
            height: '308px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px dashed var(--border-default)',
              backgroundColor: 'var(--surface-basic-default)',
              width: '100%',
              height: '100%',
              borderRadius: '4px',
            }}
          >
            Dropdown content
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default DropdownExample;
