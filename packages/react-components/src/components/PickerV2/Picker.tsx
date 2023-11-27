import * as React from 'react';

import {
  autoUpdate,
  flip,
  shift,
  FloatingPortal,
  offset,
  size as floatingSize,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from '@floating-ui/react';
import * as ReactDOM from 'react-dom';

import { PickerList } from './components/PickerList';
import { PickerTrigger } from './components/PickerTrigger';
import { PickerTriggerBody } from './components/PickerTriggerBody';
import { findIndicesWhere } from './helpers';
import { IPickerListItem, IPickerProps } from './types';

const overflowPadding = 10;

export const Picker: React.FC<IPickerProps> = ({
  id,
  className,
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
  ...props
}) => {
  const [open, setOpen] = React.useState(openedOnInit);
  const [pointer, setPointer] = React.useState(false);
  const [selectedIndices, setSelectedIndices] = React.useState<number[]>(() => {
    if (selected) {
      return selected.map((selectedItem) =>
        options.findIndex((item) => item.key === selectedItem.key)
      );
    }

    return [];
  });
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [_searchPhrase, setSearchPhrase] = React.useState<string | null>(null);

  const [maxHeight, setMaxHeight] = React.useState(400);

  const listElementsRef = React.useRef<Array<HTMLElement | null>>([]); // TODO ?
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  if (!open && pointer) {
    setPointer(false);
  }

  const { refs, floatingStyles, context, isPositioned } =
    useFloating<HTMLButtonElement>({
      open,
      strategy: floatingStrategy,
      onOpenChange: setOpen,
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(8),
        flip({ padding: 10 }),
        shift(),
        floatingSize({
          apply({ availableHeight, rects, elements }) {
            ReactDOM.flushSync(() => {
              setMaxHeight(availableHeight);
            });
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
            });
          },
          padding: overflowPadding,
        }),
      ],
    });

  const click = useClick(context);
  const role = useRole(context, { role: 'listbox' });
  const dismiss = useDismiss(context);
  const listNavigation = useListNavigation(context, {
    listRef: listElementsRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
    disabledIndices: findIndicesWhere(
      options,
      (item) => !!item.disabled || !!item.groupHeader
    ),
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss, role, listNavigation]
  );

  const handleSelect = (index: number) => {
    setSelectedIndices((prev) => {
      const newSelectedIndices = prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index];

      onSelect(newSelectedIndices.map((i) => options[i]));

      return newSelectedIndices;
    });
  };

  const handleOnFilter = (text: string) => setSearchPhrase(text);

  const handleItemRemove = (item: IPickerListItem) => {
    const newSelectedItems = selected
      ? selected.filter((selectedItem) => selectedItem !== item)
      : null;

    if (newSelectedItems?.length === 0) {
      return onSelect(null);
    }

    onSelect(newSelectedItems);
  };

  const handleClear = () => {
    setOpen(false);
    setSelectedIndices([]);
    onSelect(null);
  };

  return (
    <>
      <PickerTrigger
        getReferenceProps={getReferenceProps}
        setReference={refs.setReference}
        testId={props['data-testid']}
        isItemSelected={selectedIndices.length > 0}
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
          onFilter={handleOnFilter}
        />
      </PickerTrigger>
      <FloatingPortal>
        {open && (
          <PickerList
            options={options}
            context={context}
            setFloating={refs.setFloating}
            floatingStyles={floatingStyles}
            maxHeight={maxHeight}
            floatingRef={refs.floating}
            wrapperRef={wrapperRef}
            isPositioned={isPositioned}
            pointer={pointer}
            activeIndex={activeIndex}
            selectedIndices={selectedIndices}
            listElementsRef={listElementsRef}
            setPointer={setPointer}
            handleSelect={handleSelect}
            getFloatingProps={getFloatingProps}
            getItemProps={getItemProps}
            emptyStateText={noSearchResultText}
            selectAllOptionText={selectAllOptionText}
          />
        )}
      </FloatingPortal>
    </>
  );
};
