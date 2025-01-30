import * as React from 'react';

import { FloatingNode, FloatingPortal } from '@floating-ui/react';
import cx from 'clsx';

import { useReadOnlyFormFieldContext } from '../../providers/ReadOnlyFormFieldProvider';
import { ReadOnlyText } from '../ReadOnlyText';

import { PickerList } from './components/PickerList';
import { PickerTrigger } from './components/PickerTrigger';
import { PickerTriggerBody } from './components/PickerTriggerBody';
import { DEFAULT_LIST_HEIGHT, MIN_LIST_HEIGHT } from './constants';
import { useFloatingPicker } from './hooks/useFloatingPicker';
import { usePickerItems } from './hooks/usePickerItems';
import { IPickerProps } from './types';

import styles from './Picker.module.scss';

export const Picker: React.FC<IPickerProps> = ({
  id,
  className,
  listClassName,
  minListHeight = MIN_LIST_HEIGHT,
  maxListHeight = DEFAULT_LIST_HEIGHT,
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
  clearSearchAfterSelection = true,
  onSelect,
  placement,
  floatingStrategy,
  root,
  useDismissHookProps,
  useClickHookProps,
  virtuosoProps,
  inputProps,
  noDataFallbackText = 'No data',
  ...props
}) => {
  const [open, setOpen] = React.useState(openedOnInit);
  const [triggerFocus, setTriggerFocus] = React.useState(false);
  const isControlled = isVisible !== undefined;
  const isOpen = isControlled ? isVisible : open;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { readOnly } = useReadOnlyFormFieldContext();
  const computedReadOnly = readOnly || inputProps?.readOnly;

  const handleVisibilityChange = (newValue: boolean, event?: Event) => {
    if (newValue) {
      !isOpen && onOpen?.(event);
    } else {
      isOpen && onClose?.(event);
    }

    !isControlled && setOpen(newValue);
  };

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
    clearSearchAfterSelection,
    inputRef,
  });

  const {
    context,
    nodeId,
    getReferenceProps,
    setReference,
    getFloatingProps,
    getItemProps,
    setFloating,
    floatingStyles,
    listElementsRef,
    virtualItemRef,
    activeIndex,
    maxHeight,
    setPointer,
    isPositioned,
  } = useFloatingPicker({
    openedOnInit,
    disabled,
    items,
    placement,
    minListHeight,
    maxListHeight,
    floatingStrategy,
    useClickHookProps,
    useDismissHookProps,
    isOpen,
    onVisibilityChange: handleVisibilityChange,
    searchPhrase,
  });

  if (computedReadOnly) {
    return (
      <ReadOnlyText
        value={selected
          ?.map((option) => (!option.groupHeader ? option.name : null))
          .filter(Boolean)
          .join(', ')}
        noDataFallbackText={noDataFallbackText}
      />
    );
  }

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
        setTriggerFocus={setTriggerFocus}
        onArrowClick={() => handleVisibilityChange(!isOpen)}
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
          inputRef={inputRef}
          onItemRemove={handleItemRemove}
          onSelect={handleSelect}
          onFilter={handleOnFilter}
          onClear={handleClear}
          searchPhrase={searchPhrase}
          virtualItemRef={virtualItemRef}
          isTriggerFocused={triggerFocus}
          inputProps={inputProps}
        />
      </PickerTrigger>
      <FloatingNode id={nodeId}>
        {isOpen && (
          <FloatingPortal root={root}>
            <PickerList
              pickerType={type}
              options={items}
              listClassName={listClassName}
              context={context}
              setFloating={setFloating}
              floatingStyles={floatingStyles}
              maxHeight={maxHeight}
              activeIndex={activeIndex}
              selectedKeys={selectedKeys}
              listElementsRef={listElementsRef}
              searchDisabled={searchDisabled}
              isPositioned={isPositioned}
              onItemRemove={handleItemRemove}
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
