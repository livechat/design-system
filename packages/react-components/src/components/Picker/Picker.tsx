import * as React from 'react';
import { Trigger, TriggerSize } from './Trigger';
import { IPickerListItem, PickerList } from './PickerList';

const baseClass = 'lc-picker';

export interface IPickerProps {
  disabled?: boolean;
  options: IPickerListItem[];
  size?: TriggerSize;
  placeholder?: string;
  onSelect: (selectedItem: IPickerListItem | null) => void;
}

export const Picker: React.FC<IPickerProps> = ({
  disabled,
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
      <Trigger
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
  );
};
