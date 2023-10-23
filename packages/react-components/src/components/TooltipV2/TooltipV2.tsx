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
  useInteractions,
  useRole,
  FloatingArrow,
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

  // withFadeAnimation?: boolean;
  // transitionDuration?: number;
  // transitionDelay?: number;
  // hoverOutDelayTimeout?: number;
  // offsetMainAxis?: number;
  // triggerOnClick?: boolean;
  // arrowOffsetY?: number;
  // arrowOffsetX?: number;
  // fullSpaceContent?: boolean;
  // triggerRenderer: () => React.ReactNode;
  // referenceElement?: VirtualElement;
}

export const TooltipV2: React.FC<ITooltipV2Props> = ({
  children,
  className,
  triggerRenderer,
  theme,
  kind,
  placement = 'bottom',
  visible,
  fullSpaceContent,
  onClose,
  onOpen,
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

  const { floatingStyles, refs, context } = useFloating({
    middleware: [offset(8), shift(), flip(), arrow({ element: arrowRef })],
    placement: placement,
    open: currentlyVisible,
    onOpenChange: handleMenuStateChange,
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <>
      {React.cloneElement(triggerRenderer, {
        ref: refs.setReference,
        ...getReferenceProps(),
        ...triggerRenderer.props,
      })}
      {currentlyVisible && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className={mergedClassNames}
          {...getFloatingProps()}
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
