import * as React from 'react';

import {
  autoUpdate,
  flip,
  FloatingContext,
  offset,
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
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  listElementsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  virtualItemRef: React.RefObject<HTMLDivElement>;
  floatingStrategy?: Strategy;
  open: boolean;
  setOpen: (opened: boolean) => void;
  setMaxHeight: (height: number) => void;
  useClickHookProps?: UseClickProps;
  useDismissHookProps?: UseDismissProps;
}

interface IUseFloatingPicker {
  getReferenceProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
  setReference: (element: HTMLElement | null) => void;
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
  getItemProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
  floatingStyles: React.CSSProperties;
  isPositioned: boolean;
  context: FloatingContext<HTMLButtonElement>;
  nodeId: string;
  setFloating: (node: HTMLElement | null) => void;
}

export const useFloatingPicker = ({
  disabled,
  items,
  activeIndex,
  setActiveIndex,
  listElementsRef,
  virtualItemRef,
  floatingStrategy,
  open,
  setOpen,
  setMaxHeight,
  useDismissHookProps,
  useClickHookProps,
}: UseFloatingPickerProps): IUseFloatingPicker => {
  const nodeId = useFloatingNodeId();
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
  };
};
