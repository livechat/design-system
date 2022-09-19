import * as React from 'react';
import cx from 'clsx';
import {
  useFloating,
  Placement,
  flip,
  offset,
  autoUpdate,
  DetectOverflowOptions,
} from '@floating-ui/react-dom';
import type { Options as FlipOptions } from '@floating-ui/core/src/middleware/flip';

import cssStyles from './Popover.module.scss';

export interface IPopoverProps {
  children?: React.ReactNode;
  className?: string;
  placement?: Placement;
  isVisible?: boolean;
  flipOptions?: Partial<FlipOptions & DetectOverflowOptions>;
  triggerRenderer: () => React.ReactNode;
}

export const Popover: React.FC<IPopoverProps> = (props) => {
  const {
    triggerRenderer,
    children,
    className,
    placement,
    flipOptions,
    isVisible = false,
  } = props;
  const [visible, setVisibility] = React.useState(false);

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

  const handleHideOnEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setVisibility(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleHideOnEscape);
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('keydown', handleHideOnEscape);
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  const mergedClassNames = cx(cssStyles['popover'], className, {
    [cssStyles['popover--visible']]: visible,
  });

  return (
    <>
      <div style={{ width: 'fit-content' }} ref={reference}>
        {triggerRenderer()}
      </div>
      <div
        ref={floating}
        className={mergedClassNames}
        style={{
          position: strategy,
          top: y ?? '',
          left: x ?? '',
        }}
      >
        {children}
      </div>
    </>
  );
};
