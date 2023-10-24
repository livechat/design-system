import * as React from 'react';

import {
  useFloating,
  offset,
  arrow,
  shift,
  flip,
  autoUpdate,
  useDismiss,
  useFocus,
  useHover,
  useClick,
  useInteractions,
  useRole,
  FloatingArrow,
  useTransitionStyles,
  useTransitionStatus,
} from '@floating-ui/react';
import cx from 'clsx';

import { ITooltipProps } from './types';

import styles from './Tooltip.module.scss';

const baseClass = 'tooltip';

export const Tooltip: React.FC<ITooltipProps> = ({
  children,
  className,
  triggerClassName,
  triggerRenderer,
  theme,
  kind,
  placement = 'bottom',
  visible,
  fullSpaceContent,
  onClose,
  onOpen,
  withFadeAnimation = true,
  transitionDuration = 200,
  hoverOnDuration,
  hoverOffDuration,
  transitionDelay = 0,
  hoverOnDelay,
  hoverOffDelay,
  triggerOnClick = false,
  offsetMainAxis = 8,
  referenceElement,
}) => {
  const isControlled = visible !== undefined;
  const [isVisible, setIsVisible] = React.useState(false);
  const arrowRef = React.useRef(null);
  const currentlyVisible = isControlled ? visible : isVisible;
  const tooltipStyle = kind || theme;
  const mergedClassNames = cx(
    styles[baseClass],
    className,
    tooltipStyle && styles[`${baseClass}--${tooltipStyle}`],
    fullSpaceContent && styles[`${baseClass}--full-space`]
  );

  const handleMenuStateChange = () => {
    if (currentlyVisible) {
      onClose?.();
      !isControlled && setIsVisible(false);
    } else {
      onOpen?.();
      !isControlled && setIsVisible(true);
    }
  };

  const getTransitionValue = (value?: number) => {
    if (!withFadeAnimation) {
      return 0;
    }

    return value ? value : transitionDuration;
  };

  const getTransitionDelayValue = (value?: number) => {
    return value ? value : transitionDelay;
  };

  const { floatingStyles, refs, context } = useFloating({
    middleware: [
      offset({ mainAxis: offsetMainAxis }),
      shift(),
      flip(),
      arrow({ element: arrowRef }),
    ],
    placement: placement,
    open: currentlyVisible,
    onOpenChange: handleMenuStateChange,
    whileElementsMounted: autoUpdate,
  });
  const hover = useHover(context, {
    move: false,
    delay: {
      open: getTransitionDelayValue(hoverOnDelay),
      close: getTransitionDelayValue(hoverOffDelay),
    },
    enabled: !triggerOnClick,
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });
  const click = useClick(context);
  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: {
      open: getTransitionValue(hoverOnDuration),
      close: getTransitionValue(hoverOffDuration),
    },
  });
  const { status } = useTransitionStatus(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
    click,
  ]);

  React.useEffect(() => {
    referenceElement && refs.setReference(referenceElement);
  }, [refs.setReference, referenceElement]);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={triggerClassName}
      >
        {triggerRenderer}
      </div>
      {isMounted && (
        <div
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
            ...transitionStyles,
          }}
          className={mergedClassNames}
          {...getFloatingProps()}
          data-status={status}
        >
          {children}
          <FloatingArrow
            className={styles[`${baseClass}__arrow`]}
            ref={arrowRef}
            context={context}
          />
        </div>
      )}
    </>
  );
};
