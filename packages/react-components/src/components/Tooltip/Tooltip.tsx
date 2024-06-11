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
  useTransitionStyles,
  useTransitionStatus,
  safePolygon,
  FloatingArrow,
  FloatingNode,
  useFloatingNodeId,
} from '@floating-ui/react';
import cx from 'clsx';

import { Text } from '../Typography';

import { getArrowPositionStyles, getArrowTokens } from './helpers';
import { ITooltipProps } from './types';

import styles from './Tooltip.module.scss';

const baseClass = 'tooltip';

export const Tooltip: React.FC<React.PropsWithChildren<ITooltipProps>> = ({
  children,
  className,
  triggerClassName,
  triggerRenderer,
  theme,
  kind,
  placement = 'bottom',
  isVisible,
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
  activationThreshold = 0,
  useDismissHookProps,
  useClickHookProps,
  hoverOutDelayTimeout = 100,
  arrowOffsetY,
  arrowOffsetX,
  closeOnTriggerBlur = false,
  floatingStrategy,
}) => {
  const isControlled = isVisible !== undefined;
  const [visible, setVisible] = React.useState(false);
  const arrowRef = React.useRef(null);
  const currentlyVisible = isControlled ? isVisible : visible;
  const tooltipStyle = kind || theme;
  const nodeId = useFloatingNodeId();
  const mergedClassNames = cx(
    styles[baseClass],
    className,
    tooltipStyle && styles[`${baseClass}--${tooltipStyle}`],
    fullSpaceContent && styles[`${baseClass}--full-space`]
  );
  const isTriggerAsFunction = typeof triggerRenderer === 'function';

  const handleMenuStateChange = (isOpen: boolean) => {
    if (isOpen === currentlyVisible) {
      return;
    }

    if (isOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }

    !isControlled && setVisible(isOpen);
  };

  const getTransitionDuration = (value?: number) => {
    if (!withFadeAnimation) {
      return 0;
    }

    return value ?? transitionDuration;
  };

  const getTransitionDelay = (value?: number) => {
    return value ?? transitionDelay;
  };

  const {
    floatingStyles,
    refs,
    context,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    middleware: [
      offset({ mainAxis: offsetMainAxis }),
      shift(),
      flip(),
      arrow({ element: arrowRef }),
    ],
    placement: placement,
    open: currentlyVisible,
    strategy: floatingStrategy,
    onOpenChange: handleMenuStateChange,
    whileElementsMounted: autoUpdate,
  });
  const hover = useHover(context, {
    move: false,
    restMs: activationThreshold,
    delay: {
      open: getTransitionDelay(hoverOnDelay),
      close: getTransitionDelay(hoverOffDelay || hoverOutDelayTimeout),
    },
    enabled: !triggerOnClick,
    handleClose: closeOnTriggerBlur ? null : safePolygon(),
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context, useDismissHookProps);
  const role = useRole(context, { role: 'tooltip' });
  const click = useClick(context, {
    enabled: triggerOnClick,
    ...useClickHookProps,
  });
  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: {
      open: getTransitionDuration(hoverOnDuration),
      close: getTransitionDuration(hoverOffDuration),
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
        {isTriggerAsFunction ? triggerRenderer() : triggerRenderer}
      </div>
      <FloatingNode id={nodeId}>
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
            <Text as="div" className={styles[`${baseClass}__content`]}>
              {children}
            </Text>
            <FloatingArrow
              ref={arrowRef}
              context={context}
              strokeWidth={1}
              width={10}
              height={5}
              style={{
                ...getArrowPositionStyles(
                  arrowOffsetY,
                  arrowOffsetX,
                  arrowY,
                  arrowX
                ),
              }}
              {...getArrowTokens(tooltipStyle)}
            />
          </div>
        )}
      </FloatingNode>
    </>
  );
};
