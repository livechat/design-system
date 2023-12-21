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
  const [pointer, setPointer] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [maxHeight, setMaxHeight] = React.useState(400);
  const listElementsRef = React.useRef<Array<HTMLElement | null>>([]);
  const virtualItemRef = React.useRef(null);
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
    setOpen,
  });
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
  } = useFloatingPicker({
    disabled,
    items: options,
    activeIndex,
    setActiveIndex,
    listElementsRef,
    virtualItemRef,
    floatingStrategy,
    open,
    setOpen,
    setMaxHeight,
    useClickHookProps,
    useDismissHookProps,
  });

  if (!open && pointer) {
    setPointer(false);
  }

  return (
    <div id={id} className={cx(styles['picker-wrapper'], className)}>
      <PickerTrigger
        getReferenceProps={getReferenceProps}
        setReference={setReference}
        testId={props['data-testid']}
        isItemSelected={selectedKeys.length > 0}
        isOpen={open}
        onClear={handleClear}
        hideClearButton={hideClearButton}
        isDisabled={disabled}
        isError={error}
        isRequired={isRequired}
        isMultiSelect={type === 'multi'}
        size={size}
      >
        <PickerTriggerBody
          isOpen={open}
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
        {open && (
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
