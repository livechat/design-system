import * as React from 'react';
import cx from 'classnames';
import { ChevronDown } from '@livechat/design-system-icons/dist/material';
import { Icon, IconSizeName } from '../Icon';

const baseClass = 'lc-trigger';

const DEFAULT_TRIGGER_TEXT = 'Choose an option';

export enum TriggerSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

interface ITriggerProps {
  className?: string;
  size?: TriggerSize;
  triggerText?: string;
  onClick: () => void;
}

export const Trigger: React.FC<ITriggerProps> = ({
  className,
  size = TriggerSize.Small,
  triggerText = DEFAULT_TRIGGER_TEXT,
  onClick,
}) => {
  const mergedClassNames = cx(baseClass, [`${baseClass}--${size}`], className);

  const handleTriggerClick = () => {
    return onClick();
  };

  return (
    <div className={mergedClassNames} onClick={handleTriggerClick}>
      {triggerText || DEFAULT_TRIGGER_TEXT}
      <Icon source={ChevronDown} size={IconSizeName.Large} />
    </div>
  );
};
