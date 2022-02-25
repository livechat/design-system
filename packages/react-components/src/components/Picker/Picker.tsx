import * as React from 'react';
import { Error } from '@livechat/design-system-icons/dist/material';
import { Trigger, TriggerSize } from './Trigger';
import { IPickerListItem, PickerList } from './PickerList';
import Icon, { IconSizeName, IconTypeName } from '../Icon';

const baseClass = 'lc-picker';

export interface IPickerProps {
  disabled?: boolean;
  label?: string;
  error?: string;
  options: IPickerListItem[];
  size?: TriggerSize;
  placeholder?: string;
  onSelect: (selectedItem: IPickerListItem | null) => void;
}

export const Picker: React.FC<IPickerProps> = ({
  disabled,
  error,
  label,
  options,
  size,
  placeholder = 'Select option',
  onSelect,
}) => {
  const [isListOpen, setIsListOpen] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] =
    React.useState<IPickerListItem | null>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isListOpen) {
      return document.removeEventListener('click', onDocumentClick, true);
    }

    return document.addEventListener('click', onDocumentClick, true);
  }, [isListOpen]);

  const onDocumentClick = React.useCallback(
    (e) => {
      if (
        isListOpen &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        return setIsListOpen(false);
      }
    },
    [isListOpen]
  );

  const handleOnTriggerClick = () => {
    if (disabled) {
      return;
    }

    return setIsListOpen(true);
  };

  const handleOnSelect = (item: IPickerListItem) => {
    setIsListOpen(false);
    setSelectedItem(item);
    onSelect(item);
  };

  const handleOnClearClick = () => {
    setIsListOpen(false);
    setSelectedItem(null);
    onSelect(null);
  };

  return (
    <div ref={triggerRef} className={baseClass}>
      {label && <div className={`${baseClass}__label`}>{label}</div>}
      <div className={`${baseClass}__container`}>
        <Trigger
          isError={!!error}
          isOpen={isListOpen}
          isDisabled={disabled}
          isItemSelected={!!selectedItem}
          size={size}
          onClick={handleOnTriggerClick}
          onClearClick={handleOnClearClick}
        >
          {selectedItem ? selectedItem.name : placeholder}
        </Trigger>
        <PickerList
          selectedItem={selectedItem}
          items={options}
          isOpen={isListOpen}
          onSelect={handleOnSelect}
        />
      </div>
      {error && (
        <div className={`${baseClass}__error`}>
          <Icon
            className={`${baseClass}__error__icon`}
            source={Error}
            iconType={IconTypeName.Error}
            size={IconSizeName.Small}
          />
          {error}
        </div>
      )}
    </div>
  );
};
