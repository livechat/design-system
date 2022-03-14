import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import cx from 'classnames';
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
  placement?: Placement;
  isVisible?: boolean;
  withFadeAnimation?: boolean;
  offsetMainAxis?: number;
  triggerRenderer: () => React.ReactNode;
}

export const Tooltip: React.FC<ITooltipProps> = (props) => {
  const {
    triggerRenderer,
    children,
    className,
    placement,
    isVisible = false,
    withFadeAnimation = true,
    offsetMainAxis = 8,
  } = props;

  const arrowRef = React.useRef<HTMLDivElement | null>(null);

  const [visible, setVisibility] = React.useState(isVisible);

  React.useLayoutEffect(() => {
    setVisibility(isVisible);
  }, [isVisible]);

  const handleMouseEnter = () => {
    setVisibility(true);
  };

  const handleMouseLeave = () => {
    setVisibility(false);
  };

  const handleHideOnEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setVisibility(false);
    }
  };

  const handleCloseOnClick = () => {
    setVisibility(false);
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
      document.addEventListener('keydown', handleHideOnEscape);
    };
  }, []);

  const mergedClassNames = cx('lc-tooltip', {
    [className ]: className,
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
        className={'lc-tooltip__arrow'}
        data-popper-placement={updatedPlacement}
        style={{ top: arrowY, left: arrowX }}
      />
    </div>
  );

  function renderPopperComponent() {
    if (withFadeAnimation) {
      return (
        <CSSTransition
          timeout={200}
          classNames="lc-tooltip"
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

  return (
    <>
      <div
        ref={reference}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {triggerRenderer()}
      </div>
      {visible && renderPopperComponent()}
    </>
  );
};
