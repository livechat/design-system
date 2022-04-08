import * as React from 'react';
import { Error } from '@livechat/design-system-icons/react/material';
import { Trigger, TriggerSize } from './Trigger';
import { IPickerListItem, PickerList } from './PickerList';
import { Icon, IconSizeName, IconTypeName } from '../Icon';
import styles from './Picker.module.scss';
import cx from 'clsx';

const baseClass = 'picker';

export interface IPickerProps {
  disabled?: boolean;
  label?: string;
  error?: string;
  options: IPickerListItem[];
  size?: TriggerSize;
  placeholder?: string;
  isRequired?: boolean;
  onSelect: (selectedItem: IPickerListItem | null) => void;
}

export const Picker: React.FC<IPickerProps> = ({
  disabled,
  error,
  label,
  options,
  size = TriggerSize.Medium,
  placeholder = 'Select option',
  isRequired,
  onSelect,
}) => {
  const [isListOpen, setIsListOpen] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] =
    React.useState<IPickerListItem | null>(null);
  const [searchPhrase, setSearchPhrase] = React.useState<string | null>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onDocumentClick = (e: MouseEvent) => {
      if ((e.target as Element).contains(triggerRef.current) && isListOpen) {
        return setIsListOpen(false);
      }

      return;
    };

    document.addEventListener('click', onDocumentClick);

    return () => document.removeEventListener('click', onDocumentClick);
  }, [isListOpen]);

  const handleOnTriggerClick = () => {
    if (disabled) {
      return;
    }

    return setIsListOpen((prev) => !prev);
  };

  const handleOnClose = () => {
    setIsListOpen(false);
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

  const handleOnFilter = (text: string) => setSearchPhrase(text);

  const getOptions = (): IPickerListItem[] => {
    if (!searchPhrase) {
      return options;
    }

    return options.filter((item: IPickerListItem) => {
      const search = searchPhrase.toLowerCase();
      const itemName = item.name.toLowerCase();

      if (itemName.includes(search) && !item.groupHeader) {
        return item;
      }
    });
  };

  return (
    <div ref={triggerRef} className={baseClass}>
      {label && (
        <div
          className={cx(styles[`${baseClass}__label`], {
            [styles[`${baseClass}__label--disabled`]]: disabled,
          })}
        >
          {label}
        </div>
      )}
      <div className={styles[`${baseClass}__container`]}>
        <Trigger
          isError={!!error}
          isOpen={isListOpen}
          isDisabled={disabled}
          isItemSelected={!!selectedItem}
          isRequired={isRequired}
          size={size}
          onClick={handleOnTriggerClick}
          onClearClick={handleOnClearClick}
          onFilter={handleOnFilter}
        >
          {selectedItem ? selectedItem.name : placeholder}
        </Trigger>
        <PickerList
          selectedItem={selectedItem}
          items={getOptions()}
          isOpen={isListOpen}
          size={size}
          onClose={handleOnClose}
          onSelect={handleOnSelect}
        />
      </div>
      {error && (
        <div className={styles[`${baseClass}__error`]}>
          <Icon
            className={styles[`${baseClass}__error__icon`]}
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
