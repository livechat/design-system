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
  withFadeAnimation?: boolean;
  transition?: number;
  transitionDelay?: number;
  hoverOutDelayTimeout?: number;
  offsetMainAxis?: number;
  triggerOnClick?: boolean;
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
    withFadeAnimation = true,
    transition = 200,
    transitionDelay = 500,
    hoverOutDelayTimeout = 100,
    offsetMainAxis = 8,
    triggerOnClick = false,
    onOpen,
    onClose,
  } = props;

  const arrowRef = React.useRef<HTMLDivElement | null>(null);

  const [visible, setVisibility] = React.useState(isVisible);
  const isHovered = React.useRef(false);

  const handleMouseLeave = () => {
    if (triggerOnClick) return;
    isHovered.current = false;
    void sleep(hoverOutDelayTimeout).then(() => {
      if (!isHovered.current) {
        setVisibility(false);
      }
    });
  };

  React.useEffect(() => {
    setVisibility(isVisible);
  }, [isVisible]);

  const handleOpen = () => {
    if (onOpen) onOpen();
    setVisibility(true);
  };

  const handleClosed = () => {
    if (onClose) onClose();
    setVisibility(false);
  };

  const handleMouseEnter = () => {
    if (triggerOnClick) return;
    isHovered.current = true;
    setVisibility(true);
  };

  const handleHideOnEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleClosed();
    }
  };

  const handleClick = () => {
    if (visible) {
      handleClosed();
    } else {
      handleOpen();
    }
  };

  const handleCloseOnClick = () => {
    handleClosed();
  };

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
    if (!refs.reference.current || !refs.floating.current) {
      return;
    }

    // Only call this when the floating element is rendered
    return autoUpdate(refs.reference.current, refs.floating.current, update);
  }, [refs.reference, refs.floating, update, updatedPlacement]);

  React.useEffect(() => {
    document.addEventListener('keydown', handleHideOnEscape);
    return () => {
      document.removeEventListener('keydown', handleHideOnEscape);
    };
  }, []);

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
          return React.cloneElement(child, { handleCloseOnClick });
        }
        return null;
      })}
      <div
        ref={arrowRef}
        className={cx('lc-tooltip__arrow')}
        data-popper-placement={updatedPlacement}
        style={{ top: arrowY, left: arrowX }}
      />
    </div>
  );

  function renderPopperComponent() {
    if (withFadeAnimation) {
      const appear = css`
        opacity: 0;
      `;

      const appearActive = css`
        opacity: 1;
        transition: opacity ${transition}ms ${transitionDelay}ms;
      `;

      const exit = css`
        opacity: 1;
      `;

      const exitActive = css`
        opacity: 0;
        transition: opacity ${transition}ms ${transitionDelay}ms;
      `;

      return (
        <CSSTransition
          timeout={transition}
          classNames={{
            appear: appear,
            appearActive: appearActive,
            exit: exit,
            exitActive: exitActive,
          }}
          in={visible}
          appear
        >
          {popperComponent}
        </CSSTransition>
      );
    } else {
      return popperComponent;
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
      {visible && renderPopperComponent()}
    </>
  );
};
