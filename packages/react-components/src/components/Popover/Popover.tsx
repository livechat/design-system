import * as React from 'react';

import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingNode,
  FloatingTree,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import cx from 'clsx';

import { Text } from '../Typography';

import { IPopoverProps } from './types';

import styles from './Popover.module.scss';

export const Popover: React.FC<IPopoverProps> = ({
  triggerRenderer,
  onClose,
  onOpen,
  children,
  className,
  triggerClassName,
  placement,
  flipOptions,
  offsetSize = 4,
  isVisible,
  openedOnInit,
  closeOnEsc = true,
  useDismissHookProps,
  useClickHookProps,
  floatingStrategy,
}) => {
  const [visible, setVisible] = React.useState(openedOnInit);
  const parentId = useFloatingParentNodeId();
  const nodeId = useFloatingNodeId();
  const isControlled = isVisible !== undefined;
  const currentlyVisible = isControlled ? isVisible : visible;
  const isTextContent = typeof children === 'string';
  const isTriggerAsFunction = typeof triggerRenderer === 'function';

  const handleVisibilityChange = (isOpen: boolean, event?: Event) => {
    if (isOpen) {
      onOpen?.(event);
    } else {
      onClose?.(event);
    }

    !isControlled && setVisible(isOpen);
  };

  const { refs, context, floatingStyles } = useFloating({
    nodeId,
    open: currentlyVisible,
    onOpenChange: handleVisibilityChange,
    middleware: [offset(offsetSize), flip(flipOptions), shift()],
    placement: placement,
    strategy: floatingStrategy,
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, useClickHookProps);
  const dismiss = useDismiss(context, {
    escapeKey: closeOnEsc,
    ...useDismissHookProps,
  });
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const mergedClassNames = cx(styles['popover'], className);

  const PopoverComponent = (
    <>
      <div
        data-testid="popover-trigger-button"
        ref={refs.setReference}
        {...getReferenceProps()}
        className={triggerClassName}
      >
        {isTriggerAsFunction ? triggerRenderer() : triggerRenderer}
      </div>
      <FloatingNode id={nodeId}>
        {currentlyVisible && (
          <FloatingFocusManager context={context} modal={false}>
            <div
              className={mergedClassNames}
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              {isTextContent ? <Text as="div">{children}</Text> : children}
            </div>
          </FloatingFocusManager>
        )}
      </FloatingNode>
    </>
  );

  if (parentId === null) {
    return <FloatingTree>{PopoverComponent}</FloatingTree>;
  }

  return PopoverComponent;
};
