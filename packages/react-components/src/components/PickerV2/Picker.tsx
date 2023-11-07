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
  useTypeahead,
  FloatingFocusManager,
} from '@floating-ui/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import * as ReactDOM from 'react-dom';

import { IPickerProps } from './types';

import styles from './Picker.module.scss';

const overflowPadding = 10;
const ITEM_HEIGHT = 35;
const ITEMS_COUNT = 35;

export const Picker: React.FC<IPickerProps> = ({
  // id,
  // className,
  // disabled,
  // error,
  options,
  // selected,
  // size = 'medium',
  // placeholder = 'Select option',
  // isRequired,
  // noSearchResultText = 'No results found',
  // selectAllOptionText,
  // type = 'single',
  // searchDisabled = false,
  // hideClearButton,
  // openedOnInit = false,
  // clearSearchAfterSelection,
  // onSelect,
}) => {
  const [open, setOpen] = React.useState(false);
  const [pointer, setPointer] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  // The initial max-height is what `react-virtual` uses to know how many
  // items to render. This needs to be a smaller value so it doesn't try
  // to render every single item on mount.
  const [maxHeight, setMaxHeight] = React.useState(400);

  const listElementsRef = React.useRef<Array<HTMLElement | null>>([]); // TODO ?
  const listContentRef = React.useRef<Array<string | null>>(
    options.map((item) => item?.name || 'noname')
  ); // TODO
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const isTypingRef = React.useRef(false);

  if (!open && pointer) {
    setPointer(false);
  }

  const { refs, floatingStyles, context, isPositioned } =
    useFloating<HTMLButtonElement>({
      open,
      onOpenChange: setOpen,
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(8),
        flip({ padding: 10 }),
        shift(),
        floatingSize({
          apply({ availableHeight }) {
            // Use state instead of directly mutating so that `react-virtual`
            // scrollToIndex() function works in the layout effect.
            ReactDOM.flushSync(() => {
              setMaxHeight(availableHeight);
            });
          },
          padding: overflowPadding,
        }),
      ],
    });

  const rowVirtualizer = useVirtualizer({
    count: options.length,
    getScrollElement: () => refs.floating.current,
    estimateSize: () => ITEM_HEIGHT,
    overscan: 5,
  });

  const click = useClick(context);
  const role = useRole(context, { role: 'listbox' });
  const dismiss = useDismiss(context);
  const listNavigation = useListNavigation(context, {
    listRef: listElementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
    disabledIndices: [],
  });
  const typeahead = useTypeahead(context, {
    listRef: listContentRef,
    activeIndex,
    onMatch: open ? setActiveIndex : setSelectedIndex,
    onTypingChange(isTyping) {
      isTypingRef.current = isTyping;
    },
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, role, dismiss, listNavigation, typeahead]
  );

  React.useLayoutEffect(() => {
    if (isPositioned && !pointer) {
      // Nothing has been selected, reset scrolling upon open
      if (activeIndex === null && selectedIndex === null) {
        rowVirtualizer.scrollToIndex(0);
      }

      // Scrolling is restored, but the item will be scrolled
      // into view when necessary
      if (activeIndex !== null) {
        wrapperRef.current?.focus({ preventScroll: true });
        rowVirtualizer.scrollToIndex(activeIndex);
      }
    }
  }, [rowVirtualizer, isPositioned, activeIndex, selectedIndex, pointer, refs]);

  const handleSelect = () => {
    if (activeIndex !== null) {
      setSelectedIndex(activeIndex);
      setOpen(false);
    }
  };

  return (
    <>
      <button ref={refs.setReference} {...getReferenceProps()}>
        Trigger
      </button>
      <FloatingPortal>
        {open && (
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              tabIndex={-1}
              className={styles['listbox']}
              style={{
                ...floatingStyles,
                maxHeight,
              }}
            >
              <div
                className={styles['listbox-wrapper']}
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                }}
                ref={wrapperRef}
                // Some screen readers do not like any wrapper tags inside
                // of the element with the role, so we spread it onto the
                // virtualizer wrapper.
                {...getFloatingProps({
                  onKeyDown(e) {
                    setPointer(false);

                    if (e.key === 'Enter' && activeIndex !== null) {
                      handleSelect();
                    }

                    if (e.key === ' ' && !isTypingRef.current) {
                      e.preventDefault();
                    }
                  },
                  onKeyUp(e) {
                    if (e.key === ' ' && !isTypingRef.current) {
                      handleSelect();
                    }
                  },
                  onPointerMove() {
                    setPointer(true);
                  },
                })}
                // Ensure this element receives focus upon open so keydowning works.
                tabIndex={0}
              >
                {rowVirtualizer.getVirtualItems().map((virtualItem) => (
                  <div
                    id={`item-${virtualItem.index}`}
                    key={virtualItem.key}
                    className={styles['listbox-option']}
                    tabIndex={-1}
                    ref={(node) => {
                      listElementsRef.current[virtualItem.index] = node;
                    }}
                    role="option"
                    aria-selected={activeIndex === virtualItem.index}
                    // As the list is virtualized, this lets the assistive tech know
                    // how many options there are total without looking at the DOM.
                    aria-setsize={ITEMS_COUNT} // TODO
                    aria-posinset={virtualItem.index + 1}
                    style={{
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${virtualItem.start}px)`,
                      background:
                        activeIndex === virtualItem.index
                          ? 'rgba(0, 200, 255, 0.3)'
                          : 'none',
                    }}
                    {...getItemProps({
                      onClick: handleSelect,
                    })}
                  >
                    List item {virtualItem.index + 1}
                    <span>
                      {virtualItem.index === selectedIndex ? '✔' : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  );
};
