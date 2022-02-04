import * as React from 'react';
import cx from 'classnames';
import { Trigger, TriggerSize } from './Trigger';

const baseClass = 'lc-picker';

export interface IPickerProps {
  className?: string;
  size?: TriggerSize;
  triggerText?: string;
}

export const Picker: React.FC<IPickerProps> = ({
  className,
  size,
  triggerText,
}) => {
  const mergedClassNames = cx(baseClass);

  const handleOnClick = () => {
    console.log('handled onClick');
  };

  return (
    <div className={mergedClassNames}>
      {/* <FormField label="label"> */}
      <Trigger size={size} triggerText={triggerText} onClick={handleOnClick} />
      {/* </FormField> */}
      {/* <PickerList /> */}
    </div>
  );
};
