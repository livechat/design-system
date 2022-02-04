import * as React from 'react';
import cx from 'classnames';
import {
  ChevronDown,
  Close,
} from '@livechat/design-system-icons/dist/material';
import { Icon, IconSizeName, IconTypeName } from '../Icon';

const baseClass = 'lc-trigger';

const DEFAULT_TRIGGER_TEXT = 'Choose an option';

export enum TriggerSize {
  Compact = 'compact',
  Medium = 'medium',
  Large = 'large',
}

interface ITriggerProps {
  selectedItemText?: string;
  size?: TriggerSize;
  triggerText?: string;
  onClick: () => void;
  onClearClick: () => void;
}

export const Trigger: React.FC<ITriggerProps> = ({
  selectedItemText,
  size = TriggerSize.Medium,
  triggerText = DEFAULT_TRIGGER_TEXT,
  onClick,
  onClearClick,
}) => {
  const mergedClassNames = cx(baseClass, [`${baseClass}--${size}`]);

  const getTriggerText = () => {
    if (selectedItemText) {
      return selectedItemText;
    }

    return triggerText || DEFAULT_TRIGGER_TEXT;
  };

  const handleTriggerClick = () => {
    return onClick();
  };

  const handleOnClearClick = () => {
    return onClearClick();
  };

  return (
    <div className={mergedClassNames} onClick={handleTriggerClick}>
      <div className={`${baseClass}_text`}>{getTriggerText()}</div>
      {selectedItemText && (
        <div onClick={handleOnClearClick}>
          <Icon iconType={IconTypeName.Link} source={Close} />
        </div>
      )}
      <Icon source={ChevronDown} size={IconSizeName.Large} />
    </div>
  );
};
