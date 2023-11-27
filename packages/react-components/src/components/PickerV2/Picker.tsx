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

import { IPickerListItem } from '../Picker';

import { PickerList } from './components/PickerList';
import { PickerTrigger } from './components/PickerTrigger';
import { PickerTriggerBody } from './components/PickerTriggerBody';
import { findIndicesWhere } from './helpers';
import { IPickerProps } from './types';

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
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>(
    () => selected?.map(({ key }) => key) || []
  );
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [searchPhrase, setSearchPhrase] = React.useState<string | null>(null);
  const [maxHeight, setMaxHeight] = React.useState(400);
  const listElementsRef = React.useRef<Array<HTMLElement | null>>([]); // TODO ?

  const { refs, floatingStyles, context, isPositioned } =
    useFloating<HTMLButtonElement>({
      open,
      strategy: floatingStrategy,
      onOpenChange: (open) => {
        setOpen(open);
        setSearchPhrase(null);
      },
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

  const click = useClick(context, { toggle: false });
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

  const handleSelect = (key: string) => {
    setSelectedKeys((prev) => {
      const newSelectedIndices = prev.includes(key)
        ? prev.filter((i) => i !== key)
        : [...prev, key];

      const newSelectedItems = options.filter((item) =>
        newSelectedIndices.includes(item.key)
      );

      onSelect(newSelectedItems);

      return newSelectedIndices;
    });
  };

  const handleOnFilter = (text: string) => setSearchPhrase(text);

  const handleItemRemove = (itemKey: string) => {
    handleSelect(itemKey);
  };

  const handleClear = () => {
    setOpen(false);
    setSelectedKeys([]);
    onSelect(null);
  };

  if (!open && pointer) {
    setPointer(false);
  }

  const items = React.useMemo<IPickerListItem[]>(() => {
    if (!searchPhrase) {
      return options;
    }

    return options.filter((item) => {
      if (item.groupHeader) {
        return false;
      }

      const search = searchPhrase.toLowerCase();
      const itemName = item.name.toLowerCase();

      return itemName.includes(search);
    });
  }, [searchPhrase, options]);

  return (
    <div id={id} className={className}>
      <PickerTrigger
        getReferenceProps={getReferenceProps}
        setReference={refs.setReference}
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
          onFilter={handleOnFilter}
        />
      </PickerTrigger>
      <FloatingPortal>
        {open && (
          <PickerList
            options={items}
            context={context}
            setFloating={refs.setFloating}
            floatingStyles={floatingStyles}
            maxHeight={maxHeight}
            floatingRef={refs.floating}
            isPositioned={isPositioned}
            pointer={pointer}
            activeIndex={activeIndex}
            selectedKeys={selectedKeys}
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
    </div>
  );
};
