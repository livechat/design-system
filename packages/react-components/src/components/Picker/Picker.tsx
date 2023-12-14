import * as React from 'react';

import {
  autoUpdate,
  flip,
  FloatingNode,
  FloatingPortal,
  offset,
  shift,
  size as floatingSize,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useInteractions,
  useListNavigation,
  useRole,
} from '@floating-ui/react';
import cx from 'clsx';
import * as ReactDOM from 'react-dom';

import { PickerList } from './components/PickerList';
import { PickerTrigger } from './components/PickerTrigger';
import { PickerTriggerBody } from './components/PickerTriggerBody';
import { SELECT_ALL_OPTION_KEY } from './constants';
import { findIndicesWhere, getNormalizedItems } from './helpers';
import { IPickerListItem, IPickerProps } from './types';

import styles from './Picker.module.scss';

const overflowPadding = 10;

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
  ...props
}) => {
  const [open, setOpen] = React.useState(openedOnInit);
  const [pointer, setPointer] = React.useState(false);
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>(
    () => selected?.map(({ key }) => key) || []
  );
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [searchPhrase, setSearchPhrase] = React.useState<string>('');
  const [maxHeight, setMaxHeight] = React.useState(400);
  const listElementsRef = React.useRef<Array<HTMLElement | null>>([]);
  const virtualItemRef = React.useRef(null);
  const nodeId = useFloatingNodeId();

  if (!open && pointer) {
    setPointer(false);
  }

  const items = React.useMemo<IPickerListItem[]>(() => {
    const shouldShowSelectAll = type === 'multi' && selectAllOptionText;
    let items = options;

    if (searchPhrase) {
      items = items.filter((item) => {
        if (item.groupHeader) {
          return false;
        }

        const search = searchPhrase.toLowerCase();
        const itemName = item.name.toLowerCase();

        return itemName.includes(search);
      });
    }

    if (shouldShowSelectAll && items.length > 1) {
      items = [
        {
          key: SELECT_ALL_OPTION_KEY,
          name: selectAllOptionText,
        },
        ...items,
      ];
    }

    return items;
  }, [searchPhrase, options, type, selectAllOptionText]);

  const hasItems = items.length > 0;

  const { refs, floatingStyles, context, isPositioned } =
    useFloating<HTMLButtonElement>({
      nodeId,
      open,
      strategy: floatingStrategy,
      onOpenChange: (open) => {
        setOpen(open);
      },
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(4),
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
  const click = useClick(context, {
    enabled: !disabled,
    keyboardHandlers: false,
    toggle: false,
    ...useClickHookProps,
  });
  const role = useRole(context, { role: 'listbox' });
  const dismiss = useDismiss(context, useDismissHookProps);
  const listNavigation = useListNavigation(context, {
    enabled: hasItems && !disabled,
    listRef: listElementsRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    virtualItemRef,
    disabledIndices: findIndicesWhere(
      items,
      (item) => !!item.disabled || !!item.groupHeader
    ),
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss, role, listNavigation]
  );

  const handleSelect = (key: string) => {
    const item = items.find((item) => item.key === key);
    if (!item || item.disabled) {
      return;
    }

    if (type === 'single') {
      setOpen(false);
      setSelectedKeys(() => {
        onSelect([item]);

        return [key];
      });
    } else {
      if (key === SELECT_ALL_OPTION_KEY) {
        if (selectedKeys.length === getNormalizedItems(items).length) {
          setSelectedKeys(() => {
            onSelect(null);

            return [];
          });
        } else {
          setSelectedKeys(() => {
            const newItems = getNormalizedItems(items);
            onSelect(newItems);

            return newItems.map(({ key }) => key);
          });
        }
      } else {
        setSelectedKeys((prev) => {
          const newIndexes = prev.includes(key)
            ? prev.filter((i) => i !== key)
            : [...prev, key];
          onSelect(options.filter(({ key }) => newIndexes.includes(key)));

          return newIndexes;
        });
      }
    }
  };

  const handleOnFilter = (text: string) => setSearchPhrase(text);

  const handleItemRemove = (itemKey: string) => handleSelect(itemKey);

  const handleClear = () => {
    setOpen(false);
    setSelectedKeys([]);
    onSelect(null);
    setSearchPhrase('');
  };

  return (
    <div id={id} className={cx(styles['picker-wrapper'], className)}>
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
              setFloating={refs.setFloating}
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
            />
          </FloatingPortal>
        )}
      </FloatingNode>
    </div>
  );
};
