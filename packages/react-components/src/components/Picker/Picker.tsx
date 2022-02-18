import * as React from 'react';
import { Trigger, TriggerSize } from './Trigger';
import { IPickerListItem, PickerList } from './PickerList';

const baseClass = 'lc-picker';

export interface IPickerProps {
  options: IPickerListItem[];
  size?: TriggerSize;
  placeholder?: string;
  onSelect: (selectedItem: IPickerListItem | null) => void;
}

export const Picker: React.FC<IPickerProps> = ({
  options,
  size,
  placeholder = 'Select option',
  onSelect,
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
    onSelect(item);
  };

  const handleOnClearClick = () => {
    setIsListOpen(false);
    setSelectedItem(null);
    onSelect(null);
  };

  return (
    <div className={baseClass}>
      <Trigger
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
