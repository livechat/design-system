import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import cx from 'classnames';
import { css } from '@emotion/css';
import {
  useFloating,
  arrow,
  Placement,
  autoUpdate,
  flip,
  offset,
} from '@floating-ui/react-dom';

export interface ITooltipProps {
  children?: React.ReactNode;
  className?: string;
  theme?: 'invert' | 'important' | undefined;
  placement?: Placement;
  isVisible?: boolean;
  isManaged?: boolean;
  withFadeAnimation?: boolean;
  transitionDuration?: number;
  transitionDelay?: number;
  hoverOutDelayTimeout?: number;
  offsetMainAxis?: number;
  triggerOnClick?: boolean;
  arrowOffsetY?: number;
  arrowOffsetX?: number;
  triggerRenderer: () => React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const Tooltip: React.FC<ITooltipProps> = (props) => {
  const {
    triggerRenderer,
    children,
    className,
    theme,
    placement,
    isVisible = false,
    isManaged = false,
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

  React.useEffect(() => {
    setVisibility(isVisible);
  }, [isVisible]);

  React.useEffect(() => {
    document.addEventListener('keydown', handleHideOnEscape);
    return () => {
      document.removeEventListener('keydown', handleHideOnEscape);
    };
  }, []);

  React.useEffect(() => {
    if (!refs.reference.current || !refs.floating.current) {
      return;
    }

    // Only call this when the floating element is rendered
    return autoUpdate(refs.reference.current, refs.floating.current, update);
  }, [refs.reference, refs.floating, update, updatedPlacement]);

  const handleMouseLeave = () => {
    if (triggerOnClick) return;
    isHovered.current = false;
    void sleep(hoverOutDelayTimeout).then(() => {
      if (!isHovered.current) {
        setVisibility(false);
      }
    });
  };

  const handleOpen = () => {
    if (onOpen) onOpen();
    setVisibility(true);
  };

  const handleClose = () => {
    if (onClose) onClose();
    setVisibility(false);
  };

  const handleMouseEnter = () => {
    if (triggerOnClick || isManaged) return;
    isHovered.current = true;
    setVisibility(true);
  };

  const handleHideOnEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
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

  const handleCloseOnClick = () => {
    handleClose();
  };

  const top = arrowOffsetY && arrowY ? arrowY + arrowOffsetY : arrowY;
  const left = arrowOffsetX && arrowX ? arrowX + arrowOffsetX : arrowX;

  const mergedClassNames = cx('lc-tooltip', {
    [className]: className,
    [`lc-tooltip--invert`]: theme === 'invert',
    [`lc-tooltip--important`]: theme === 'important',
  });

  const popperComponent = (
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
          return React.cloneElement(child, { handleCloseOnClick, theme });
        }
        return null;
      })}
      <div
        ref={arrowRef}
        className={cx('lc-tooltip__arrow')}
        data-popper-placement={updatedPlacement}
        style={{ top: top, left: left }}
      />
    </div>
  );

  function renderPopperComponent() {
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
          {popperComponent}
        </CSSTransition>
      );
    } else {
      return visible && popperComponent;
    }
  }
  let referenceElement;

  if (triggerOnClick) {
    referenceElement = (
      <div onClick={handleClick} ref={reference}>
        {triggerRenderer()}
      </div>
    );
  } else {
    referenceElement = (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={reference}
      >
        {triggerRenderer()}
      </div>
    );
  }

  return (
    <>
      {referenceElement}
      {renderPopperComponent()}
    </>
  );
};
