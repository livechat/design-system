import * as React from 'react';

import {
  useFloating,
  Placement,
  flip,
  offset,
  autoUpdate,
} from '@floating-ui/react-dom';
import cx from 'clsx';

import { Text } from '../Typography';

import cssStyles from './Popover.module.scss';

export interface IPopoverProps {
  children?: React.ReactNode;
  /**
   * The CSS class for popover container
   */
  className?: string;
  /**
   * The CSS class for trigger container
   */
  triggerClassName?: string;
  /**
   * The popover placement related to the trigger element
   */
  placement?: Placement;
  /**
   * Set popover visibility
   */
  isVisible?: boolean;
  /**
   * Set the popover placement to keep it in view
   */
  flipOptions?: Parameters<typeof flip>[0];
  /**
   * Set `false` if the menu is not to be closed with a esc press
   */
  closeOnEsc?: boolean;
  /**
   * Trigger element
   */
  triggerRenderer: () => React.ReactNode;
  /**
   * Optional callback called after popover close
   */
  onClose?: () => void;
}

export const Popover: React.FC<IPopoverProps> = ({
  triggerRenderer,
  onClose,
  children,
  className,
  triggerClassName,
  placement,
  flipOptions,
  isVisible = false,
  closeOnEsc = true,
}) => {
  const [visible, setVisibility] = React.useState(false);
  const prevVisibleState = React.useRef(false);
  const isTextContent = typeof children === 'string';

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    refs,
    update,
    placement: updatedPlacement,
  } = useFloating({
    middleware: [offset(4), flip(flipOptions)],
    placement: placement,
  });

  React.useEffect(() => {
    setVisibility(isVisible);
  }, [isVisible]);

  React.useEffect(() => {
    if (onClose && prevVisibleState.current !== visible && !visible) {
      onClose();
    }
    prevVisibleState.current = visible;
  }, [visible]);

  React.useEffect(() => {
    const handleHideOnEscape = (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === 'Escape') {
        setVisibility(false);
      }
    };
    document.addEventListener('keydown', handleHideOnEscape);

    return () => {
      document.removeEventListener('keydown', handleHideOnEscape);
    };
  }, [closeOnEsc]);

  React.useEffect(() => {
    if (!refs.reference.current || !refs.floating.current) {
      return;
    }

    // Only call this when the floating element is rendered
    return autoUpdate(refs.reference.current, refs.floating.current, update);
  }, [refs.reference, refs.floating, update, updatedPlacement, visible]);

  function handleDocumentClick(event: MouseEvent) {
    if (
      refs.floating.current &&
      (refs.floating.current as Node).contains(event.target as Node)
    ) {
      return;
    } else if (
      refs.reference.current &&
      (refs.reference.current as Node).contains(event.target as Node)
    ) {
      setVisibility((prevVisible) => !prevVisible);
    } else {
      setVisibility(false);
    }
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  const mergedClassNames = cx(cssStyles['popover'], className, {
    [cssStyles['popover--visible']]: visible,
  });

  const mergedTriggerClassNames = cx(
    cssStyles['popover-trigger'],
    triggerClassName
  );

  return (
    <>
      <div className={mergedTriggerClassNames} ref={reference}>
        {triggerRenderer()}
      </div>
      <div
        ref={floating}
        className={mergedClassNames}
        style={{
          position: strategy,
          top: y !== null && y !== undefined ? y : '',
          left: x !== null && x !== undefined ? x : '',
        }}
      >
        {isTextContent ? <Text as="div">{children}</Text> : children}
      </div>
    </>
  );
};
