import * as React from 'react';

import {
  arrow,
  autoUpdate,
  flip,
  offset,
  useFloating,
} from '@floating-ui/react';
import cx from 'clsx';

import { FloatingComponent } from './components/FloatingComponent';
import { sleep } from './helpers';
import { ITooltipProps } from './types';

import styles from './Tooltip.module.scss';

const baseClass = 'tooltip';

export const Tooltip: React.FC<ITooltipProps> = (props) => {
  const {
    triggerRenderer,
    referenceElement,
    children,
    className,
    triggerClassName,
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
    fullSpaceContent,
    onOpen,
    onClose,
  } = props;
  const isFirstRender = React.useRef(true);
  const isManaged = isVisible !== undefined;
  const arrowRef = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisibility] = React.useState(isVisible);
  const isHovered = React.useRef(false);

  const floatingOptions = useFloating({
    middleware: [
      offset({ mainAxis: offsetMainAxis }),
      arrow({ element: arrowRef }),
      flip(),
    ],
    placement: placement,
    whileElementsMounted: autoUpdate,
  });

  const handleVisibilityChange = (newVisibility: boolean | undefined): void => {
    // used when visibility changes inside the component
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
    // handles visibility changes from outside the component
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

  const handleMouseEnter = () => {
    if (triggerOnClick || isManaged) return;
    isHovered.current = true;
    handleVisibilityChange(true);
  };

  const handleMouseLeave = () => {
    if (triggerOnClick || isManaged) return;
    isHovered.current = false;
    void sleep(hoverOutDelayTimeout).then(() => {
      if (!isHovered.current) {
        handleVisibilityChange(false);
      }
    });
  };

  const handleCloseAction = (event: KeyboardEvent | MouseEvent) => {
    if (
      (event instanceof KeyboardEvent && event.key === 'Escape') ||
      event.type === 'click'
    ) {
      handleVisibilityChange(false);
    }
  };

  const floatingComponent = (
    <FloatingComponent
      baseClass={baseClass}
      className={className}
      visible={visible}
      floatingOptions={floatingOptions}
      arrowRef={arrowRef}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
      handleCloseAction={handleCloseAction}
      childrenElements={children}
      transitionDuration={transitionDuration}
      transitionDelay={transitionDelay}
      referenceElement={referenceElement}
      arrowOffsetX={arrowOffsetX}
      arrowOffsetY={arrowOffsetY}
      theme={theme}
      withFadeAnimation={withFadeAnimation}
      fullSpaceContent={fullSpaceContent}
    />
  );

  if (referenceElement) {
    return floatingComponent;
  }

  const handleClick = () => {
    if (visible) {
      handleVisibilityChange(false);
    } else {
      handleVisibilityChange(true);
    }
  };

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

  return (
    <>
      <div
        className={cx(styles[`${baseClass}__wrapper`], triggerClassName)}
        ref={floatingOptions.refs.setReference}
        {...referenceOptions()}
      >
        {triggerRenderer()}
      </div>
      {floatingComponent}
    </>
  );
};
