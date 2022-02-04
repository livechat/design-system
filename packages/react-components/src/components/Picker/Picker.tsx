import * as React from 'react';
import { Trigger, TriggerSize } from './Trigger';
import { IPickerListItem, PickerList } from './PickerList';

const baseClass = 'lc-picker';

export interface IPickerProps {
  items: IPickerListItem[];
  size?: TriggerSize;
  triggerText?: string;
}

export const Picker: React.FC<IPickerProps> = ({
  items,
  size,
  triggerText,
}) => {
  const [isListOpen, setIsListOpen] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] =
    React.useState<IPickerListItem | null>(null);

  const handleOnTriggerClick = () => {
    setIsListOpen(true);
  };

  const handleOnSelect = (item: IPickerListItem) => {
    setIsListOpen(false);
    setSelectedItem(item);
  };

  const handleOnClearClick = () => {
    setIsListOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className={baseClass}>
      <Trigger
        selectedItemText={selectedItem?.name}
        size={size}
        triggerText={triggerText}
        onClick={handleOnTriggerClick}
        onClearClick={handleOnClearClick}
      />
      <PickerList
        selectedItem={selectedItem}
        items={items}
        isOpen={isListOpen}
        onSelect={handleOnSelect}
      />
    </div>
  );
};
