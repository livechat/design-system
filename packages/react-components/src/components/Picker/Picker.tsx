import * as React from 'react';

import { FloatingNode, FloatingPortal } from '@floating-ui/react';
import cx from 'clsx';

import { PickerList } from './components/PickerList';
import { PickerTrigger } from './components/PickerTrigger';
import { PickerTriggerBody } from './components/PickerTriggerBody';
import { useFloatingPicker } from './hooks/useFloatingPicker';
import { usePickerItems } from './hooks/usePickerItems';
import { IPickerProps } from './types';

import styles from './Picker.module.scss';

export const Picker: React.FC<IPickerProps> = ({
  id,
  className,
  listClassName,
  disabled,
  error,
  options,
  selected,
  size = 'medium',
  placeholder = 'Select option',
  isRequired,
  noSearchResultText = 'No results found',
  selectAllOptionText,
  type = 'single',
  searchDisabled = false,
  hideClearButton,
  isVisible,
  onOpen,
  onClose,
  openedOnInit = false,
  clearSearchAfterSelection,
  onSelect,
  floatingStrategy,
  useDismissHookProps,
  useClickHookProps,
  virtuosoProps,
  ...props
}) => {
  const [open, setOpen] = React.useState(openedOnInit);
  const isControlled = isVisible !== undefined;
  const isOpen = isControlled ? isVisible : open;

  const handleVisibilityChange = (isOpen: boolean, event?: Event) => {
    if (isOpen) {
      onOpen?.(event);
    } else {
      onClose?.(event);
    }

    !isControlled && setOpen(isOpen);
  };

  const {
    context,
    nodeId,
    getReferenceProps,
    setReference,
    getFloatingProps,
    getItemProps,
    isPositioned,
    setFloating,
    floatingStyles,
    listElementsRef,
    virtualItemRef,
    activeIndex,
    maxHeight,
    pointer,
    setPointer,
  } = useFloatingPicker({
    openedOnInit,
    disabled,
    items: options,
    floatingStrategy,
    useClickHookProps,
    useDismissHookProps,
    isOpen,
    onVisibilityChange: handleVisibilityChange,
  });

  const {
    selectedKeys,
    items,
    searchPhrase,
    handleSelect,
    handleOnFilter,
    handleItemRemove,
    handleClear,
  } = usePickerItems({
    selected,
    options,
    type,
    selectAllOptionText,
    onSelect,
    setOpen: handleVisibilityChange,
  });

  return (
    <div id={id} className={cx(styles['picker-wrapper'], className)}>
      <PickerTrigger
        getReferenceProps={getReferenceProps}
        setReference={setReference}
        testId={props['data-testid']}
        isItemSelected={selectedKeys.length > 0}
        isOpen={isOpen}
        onClear={handleClear}
        hideClearButton={hideClearButton}
        isDisabled={disabled}
        isError={error}
        isRequired={isRequired}
        isMultiSelect={type === 'multi'}
        size={size}
      >
        <PickerTriggerBody
          isOpen={isOpen}
          isSearchDisabled={searchDisabled}
          isDisabled={disabled}
          placeholder={placeholder}
          selectedItems={selected}
          type={type}
          size={size}
          clearSearchAfterSelection={clearSearchAfterSelection}
          onItemRemove={handleItemRemove}
          onSelect={handleSelect}
          onFilter={handleOnFilter}
          searchPhrase={searchPhrase}
          virtualItemRef={virtualItemRef}
        />
      </PickerTrigger>
      <FloatingNode id={nodeId}>
        {isOpen && (
          <FloatingPortal>
            <PickerList
              pickerType={type}
              options={items}
              listClassName={listClassName}
              context={context}
              setFloating={setFloating}
              floatingStyles={floatingStyles}
              maxHeight={maxHeight}
              isPositioned={isPositioned}
              pointer={pointer}
              activeIndex={activeIndex}
              selectedKeys={selectedKeys}
              listElementsRef={listElementsRef}
              setPointer={setPointer}
              onSelect={handleSelect}
              getFloatingProps={getFloatingProps}
              getItemProps={getItemProps}
              emptyStateText={noSearchResultText}
              virtuosoProps={virtuosoProps}
            />
          </FloatingPortal>
        )}
      </FloatingNode>
    </div>
  );
};
