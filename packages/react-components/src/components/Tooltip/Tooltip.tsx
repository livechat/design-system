import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import cx from 'clsx';
import { css } from '@emotion/css';
import {
  useFloating,
  arrow,
  Placement,
  autoUpdate,
  flip,
  offset,
  VirtualElement,
} from '@floating-ui/react-dom';

import styles from './Tooltip.module.scss';

export interface ITooltipProps {
  children?: React.ReactNode;
  className?: string;
  theme?: 'invert' | 'important' | undefined;
  placement?: Placement;
  isVisible?: boolean;
  withFadeAnimation?: boolean;
  transitionDuration?: number;
  transitionDelay?: number;
  hoverOutDelayTimeout?: number;
  offsetMainAxis?: number;
  triggerOnClick?: boolean;
  arrowOffsetY?: number;
  arrowOffsetX?: number;
  triggerRenderer: () => React.ReactNode;
  referenceElement?: VirtualElement;
  onOpen?: () => void;
  onClose?: () => void;
}

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const baseClass = 'tooltip';

export const Tooltip: React.FC<ITooltipProps> = (props) => {
  const {
    triggerRenderer,
    referenceElement,
    children,
    className,
    theme,
    placement,
    isVisible,
    withFadeAnimation = true,
    transitionDuration = 200,
    transitionDelay = 0,
    hoverOutDelayTimeout = 100,
    offsetMainAxis = 8,
    triggerOnClick = false,
    arrowOffsetY,
    arrowOffsetX,
    onOpen,
    onClose,
  } = props;
  const isFirstRender = React.useRef(true);
  const isManaged = isVisible !== undefined;
  const arrowRef = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisibility] = React.useState(isVisible);
  const isHovered = React.useRef(false);

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    update,
    refs,
    placement: updatedPlacement,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    middleware: [
      offset({ mainAxis: offsetMainAxis }),
      arrow({ element: arrowRef }),
      flip(),
    ],
    placement: placement,
  });

  const handleVisibilityChange = (newVisibility: boolean | undefined): void => {
    if (newVisibility) {
      !visible && onOpen?.();
    } else {
      visible && onClose?.();
    }
    if (!isManaged) {
      setVisibility(newVisibility);
    }
  };

  React.useEffect(() => {
    referenceElement && reference(referenceElement);
  }, [reference, referenceElement]);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isVisible === true) onOpen?.();
    if (isVisible === false) onClose?.(); // we need to check if it's false, because it can be undefined

    setVisibility(isVisible);
  }, [isVisible]);

  React.useEffect(() => {
    document.addEventListener('keydown', handleCloseAction);
    return () => {
      document.removeEventListener('keydown', handleCloseAction);
    };
  }, []);

  React.useEffect(() => {
    if (!refs.reference.current || !refs.floating.current) {
      return;
    }

    // Only call this when the floating element is rendered
    return autoUpdate(refs.reference.current, refs.floating.current, update);
  }, [refs.reference, refs.floating, update, updatedPlacement, visible]);

  const handleMouseLeave = () => {
    if (triggerOnClick || isManaged) return;
    isHovered.current = false;
    void sleep(hoverOutDelayTimeout).then(() => {
      if (!isHovered.current) {
        handleVisibilityChange(false);
      }
    });
  };

  const handleOpen = () => {
    handleVisibilityChange(true);
  };

  const handleClose = () => {
    handleVisibilityChange(false);
  };

  const handleMouseEnter = () => {
    if (triggerOnClick || isManaged) return;
    isHovered.current = true;
    handleVisibilityChange(true);
  };

  const handleCloseAction = (event: KeyboardEvent | MouseEvent) => {
    if (event instanceof KeyboardEvent && event.key === 'Escape') {
      handleClose();
    }

    if (event.type === 'click') {
      handleClose();
    }
  };

  const handleClick = () => {
    if (isManaged) return;
    if (visible) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  const top = arrowOffsetY && arrowY ? arrowY + arrowOffsetY : arrowY;
  const left = arrowOffsetX && arrowX ? arrowX + arrowOffsetX : arrowX;

  const mergedClassNames = cx(styles[baseClass], className, {
    [styles[`${baseClass}--invert`]]: theme === 'invert',
    [styles[`${baseClass}--important`]]: theme === 'important',
  });

  const floatingComponent = (
    <div
      ref={floating}
      style={{
        position: strategy,
        top: y ?? '',
        left: x ?? '',
      }}
      className={mergedClassNames}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            handleCloseAction,
            theme,
            ...child.props,
          });
        }
        return null;
      })}
      <div
        ref={arrowRef}
        className={cx([styles[`${baseClass}__arrow`]])}
        data-arrow-placement={updatedPlacement}
        style={{ top: top, left: left }}
      />
    </div>
  );

  function renderFloatingComponent() {
    if (withFadeAnimation) {
      const enter = css`
        pointer-events: none;
        opacity: 0;
      `;

      const enterActive = css`
        opacity: 1;
        transition-property: opacity;
        transition-duration: ${transitionDuration}ms;
        transition-delay: ${transitionDelay}ms;
      `;

      const enterDone = css`
        pointer-events: initial;
      `;

      const exit = css`
        opacity: 1;
      `;

      const exitActive = css`
        opacity: 0;
        transition-property: opacity;
        transition-duration: ${transitionDuration}ms;
        transition-delay: ${transitionDelay}ms;
      `;

      const timeout = transitionDuration + transitionDelay;

      return (
        <CSSTransition
          in={visible}
          mountOnEnter
          unmountOnExit
          timeout={timeout}
          classNames={{
            enter: enter,
            enterDone: enterDone,
            enterActive: enterActive,
            exit: exit,
            exitActive: exitActive,
          }}
        >
          {floatingComponent}
        </CSSTransition>
      );
    } else {
      return visible && floatingComponent;
    }
  }

  if (referenceElement) {
    return <>{renderFloatingComponent()}</>;
  }

  const referenceOptions = () => {
    if (!isManaged) {
      if (triggerOnClick) {
        return {
          onClick: handleClick,
        };
      } else {
        return {
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
        };
      }
    }
  };

  const triggerElement = (
    <div ref={reference} {...referenceOptions()}>
      {triggerRenderer()}
    </div>
  );

  return (
    <>
      {triggerElement}
      {renderFloatingComponent()}
    </>
  );
};
