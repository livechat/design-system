import * as React from 'react';

import {
  autoUpdate,
  flip,
  FloatingContext,
  offset,
  Placement,
  shift,
  size as floatingSize,
  Strategy,
  useClick,
  UseClickProps,
  useDismiss,
  UseDismissProps,
  useFloating,
  useFloatingNodeId,
  useInteractions,
  useListNavigation,
  useRole,
} from '@floating-ui/react';
import * as ReactDOM from 'react-dom';

import { findIndicesWhere } from '../helpers';
import { IPickerListItem } from '../types';

const overflowPadding = 10;

interface UseFloatingPickerProps {
  disabled?: boolean;
  items: IPickerListItem[];
  placement?: Placement;
  floatingStrategy?: Strategy;
  useClickHookProps?: UseClickProps;
  useDismissHookProps?: UseDismissProps;
  openedOnInit: boolean;
  minListHeight: number;
  maxListHeight: number;
  isOpen?: boolean;
  onVisibilityChange?: (open: boolean, event?: Event | undefined) => void;
}

interface IUseFloatingPicker {
  getReferenceProps: (
    userProps?: React.HTMLProps<Element> | undefined
  ) => Record<string, unknown>;
  setReference: (element: HTMLElement | null) => void;
  getFloatingProps: (
    userProps?: React.HTMLProps<Element> | undefined
  ) => Record<string, unknown>;
  getItemProps: (
    userProps?: React.HTMLProps<Element> | undefined
  ) => Record<string, unknown>;
  floatingStyles: React.CSSProperties;
  isPositioned: boolean;
  context: FloatingContext<HTMLButtonElement>;
  nodeId: string;
  setFloating: (node: HTMLElement | null) => void;
  activeIndex: number | null;
  listElementsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  virtualItemRef: React.RefObject<HTMLDivElement>;
  maxHeight: number;
  pointer: boolean;
  setPointer: (pointer: boolean) => void;
}

export const useFloatingPicker = ({
  disabled,
  items,
  placement,
  minListHeight,
  maxListHeight,
  floatingStrategy,
  useDismissHookProps,
  useClickHookProps,
  isOpen,
  onVisibilityChange,
}: UseFloatingPickerProps): IUseFloatingPicker => {
  const nodeId = useFloatingNodeId();
  const [pointer, setPointer] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [maxHeight, setMaxHeight] = React.useState(maxListHeight);
  const listElementsRef = React.useRef<Array<HTMLElement | null>>([]);
  const virtualItemRef = React.useRef(null);

  const { refs, floatingStyles, context, isPositioned } =
    useFloating<HTMLButtonElement>({
      nodeId,
      open: isOpen,
      strategy: floatingStrategy,
      onOpenChange: onVisibilityChange,
      whileElementsMounted: autoUpdate,
      placement,
      middleware: [
        offset(4),
        flip({ padding: 10 }),
        shift(),
        floatingSize({
          apply({ availableHeight, rects, elements }) {
            ReactDOM.flushSync(() => {
              setMaxHeight(
                Math.max(
                  Math.min(maxListHeight, Number(availableHeight)),
                  minListHeight
                )
              );
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
    enabled: items.length > 0 && !disabled,
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

  if (!isOpen && pointer) {
    setPointer(false);
  }

  return {
    getReferenceProps,
    getFloatingProps,
    getItemProps,
    setReference: refs.setReference,
    floatingStyles,
    isPositioned,
    context,
    nodeId,
    setFloating: refs.setFloating,
    activeIndex,
    listElementsRef,
    virtualItemRef,
    maxHeight,
    pointer,
    setPointer,
  };
};
