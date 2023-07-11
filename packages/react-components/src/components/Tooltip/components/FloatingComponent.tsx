import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import cx from 'clsx';
import { css } from '@emotion/css';
import styles from '../Tooltip.module.scss';
import { autoUpdate, UseFloatingReturn } from '@floating-ui/react-dom';
import { ITooltipProps } from '../types';

type IProps = Pick<
  ITooltipProps,
  | 'referenceElement'
  | 'arrowOffsetX'
  | 'arrowOffsetY'
  | 'className'
  | 'theme'
  | 'withFadeAnimation'
  | 'transitionDuration'
  | 'transitionDelay'
> & {
  visible?: boolean;
  floatingOptions: UseFloatingReturn;
  baseClass: string;
  arrowRef: React.RefObject<HTMLDivElement>;
  transitionDuration: number;
  transitionDelay: number;
  handleMouseEnter: (event: React.MouseEvent) => void;
  handleMouseLeave: (event: React.MouseEvent) => void;
  handleCloseAction: (event: MouseEvent | KeyboardEvent) => void;
  childrenElements: React.ReactNode;
  fullSpaceContent?: boolean;
};

export const FloatingComponent: React.FC<IProps> = ({
  visible,
  floatingOptions,
  referenceElement,
  arrowOffsetX,
  arrowOffsetY,
  baseClass,
  className,
  theme,
  withFadeAnimation,
  transitionDuration,
  transitionDelay,
  handleMouseEnter,
  handleMouseLeave,
  handleCloseAction,
  arrowRef,
  childrenElements,
  fullSpaceContent,
}) => {
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
  } = floatingOptions;

  React.useEffect(() => {
    if (!refs.reference.current || !refs.floating.current) {
      return;
    }

    // Only call this when the floating element is rendered
    return autoUpdate(refs.reference.current, refs.floating.current, update);
  }, [refs.reference, refs.floating, update, updatedPlacement, visible]);

  React.useEffect(() => {
    referenceElement && reference(referenceElement);
  }, [reference, referenceElement]);

  const top = arrowOffsetY && arrowY ? arrowY + arrowOffsetY : arrowY;
  const left = arrowOffsetX && arrowX ? arrowX + arrowOffsetX : arrowX;

  const mergedClassNames = cx(styles[baseClass], className, {
    [styles[`${baseClass}--invert`]]: theme === 'invert',
    [styles[`${baseClass}--important`]]: theme === 'important',
    [styles[`${baseClass}--full-space`]]: fullSpaceContent,
  });

  const floatingComponent = (
    <div
      ref={floating}
      style={{
        position: strategy,
        top: y !== null && y !== undefined ? y : '',
        left: x !== null && x !== undefined ? x : '',
      }}
      className={mergedClassNames}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {React.Children.map(childrenElements, (child) => {
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

  return <>{renderFloatingComponent()}</>;
};
