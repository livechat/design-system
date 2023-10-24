import * as React from 'react';

import {
  useFloating,
  offset,
  arrow,
  shift,
  flip,
  autoUpdate,
  Placement,
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

import styles from './Tooltip.module.scss';

const baseClass = 'tooltip';

export interface ITooltipV2Props {
  /**
   * The CSS class for tooltip
   */
  className?: string;
  /**
   * The CSS class for trigger wrapper
   */
  triggerClassName?: string;
  /**
   * Trigger element
   */
  triggerRenderer: React.ReactElement;
  /**
   * Specify the tooltip kind
   * @deprecated we are changing the nomenclature to `kind` in order to maintain the constant naming of props
   */
  theme?: 'invert' | 'important' | undefined;
  /**
   * Specify the tooltip kind
   */
  kind?: 'invert' | 'important' | undefined;
  /**
   * The tooltip placement
   */
  placement?: Placement;
  /**
   * Set to control the menu visibility
   */
  visible?: boolean;
  /**
   * Removes the spacing inside the tooltip
   */
  fullSpaceContent?: boolean;
  /**
   * Optional handler called on tooltip hide
   */
  onClose?: () => void;
  /**
   * Optional handler called on tooltip show
   */
  onOpen?: () => void;
  /**
   * Set to enable/disable transition
   */
  withFadeAnimation?: boolean;
  /**
   * Set to define transition duration for showing and hiding tooltip
   */
  transitionDuration?: number;
  /**
   * Set to define transition duration for showing tooltip
   */
  hoverOnDuration?: number;
  /**
   * Set to define transition duration for hiding tooltip
   */
  hoverOffDuration?: number;
  /**
   * Set to define delay before transition start for showing and hiding tooltip
   */
  transitionDelay?: number;
  /**
   * Set to define delay before transition start for showing tooltip
   */
  hoverOnDelay?: number;
  /**
   * Set to define delay before transition start for hiding tooltip
   */
  hoverOffDelay?: number;
  /**
   * Set if you want to show tooltip after trigger click if state is not managed
   */
  triggerOnClick?: boolean;
  /**
   * Set the tooltip distance from the trigger
   */
  offsetMainAxis?: number;
}

export const TooltipV2: React.FC<ITooltipV2Props> = ({
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
