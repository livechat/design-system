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
} from '@floating-ui/react';
import * as ReactDOM from 'react-dom';

import { PickerList } from './components/PickerList';
import { IPickerProps } from './types';

const overflowPadding = 10;

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
            selectedIndex={selectedIndex}
            listElementsRef={listElementsRef}
            isTypingRef={isTypingRef}
            setPointer={setPointer}
            handleSelect={handleSelect}
            getFloatingProps={getFloatingProps}
            getItemProps={getItemProps}
          />
        )}
      </FloatingPortal>
    </>
  );
};
