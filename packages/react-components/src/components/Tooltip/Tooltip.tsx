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
import {
  ReactNode,
  FC,
  useRef,
  useState,
  useEffect,
  Children,
  isValidElement,
  cloneElement,
  MouseEvent,
} from 'react';

export interface ITooltipProps {
  children?: ReactNode;
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
  triggerRenderer: () => ReactNode;
  referenceElement?: VirtualElement;
  onOpen?: () => void;
  onClose?: () => void;
}

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const baseClass = 'tooltip';

export const Tooltip: FC<ITooltipProps> = (props) => {
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

  const isManaged = isVisible !== undefined;
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisibility] = useState(isVisible);
  const isHovered = useRef(false);

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

  useEffect(() => {
    referenceElement && reference(referenceElement);
  }, [reference, referenceElement]);

  useEffect(() => {
    setVisibility(isVisible);
  }, [isVisible]);

  useEffect(() => {
    document.addEventListener('keydown', handleCloseAction);
    return () => {
      document.removeEventListener('keydown', handleCloseAction);
    };
  }, []);

  useEffect(() => {
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
        setVisibility(false);
      }
    });
  };

  const handleOpen = () => {
    if (onOpen) onOpen();
    if (!isManaged) {
      setVisibility(true);
    }
  };

  const handleClose = () => {
    if (onClose) onClose();
    if (!isManaged) {
      setVisibility(false);
    }
  };

  const handleMouseEnter = () => {
    if (triggerOnClick || isManaged) return;
    isHovered.current = true;
    setVisibility(true);
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
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
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
        opacity: 0;
      `;

      const enterActive = css`
        opacity: 1;
        transition-property: opacity;
        transition-duration: ${transitionDuration}ms;
        transition-delay: ${transitionDelay}ms;
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
