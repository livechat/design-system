import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';

import { FloatingPortal } from '@floating-ui/react';
import { autoUpdate, flip, shift, useFloating } from '@floating-ui/react-dom';
import cx from 'clsx';

import cursorImage from '../../stories/assets/cursor.svg';

import { IUserGuide } from './types';
import VirtualReference from './virtualElementReference';

import styles from './UserGuide.module.scss';

const baseClass = 'user-guide';

const virtualReference = (element: Element, padding: number = 0) =>
  new VirtualReference(element, padding);

export const UserGuide: FC<PropsWithChildren<IUserGuide>> = ({
  className,
  children,
  cursorPosition = 'bottom-start',
  cursorTiming = 'fast2',
  parentElementName,
  isVisible = false,
  elementClassName,
  zIndex,
  isFirstStep,
  isLastStep,
}) => {
  const [parentElement, setParentElement] = useState<Element | null>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cursorPlacement =
    isFirstStep || isLastStep ? 'bottom-start' : cursorPosition;

  const { refs, x, y, strategy, placement, update } = useFloating({
    middleware: [shift(), flip()],
    placement: cursorPlacement,
    open: true,
    whileElementsMounted: autoUpdate,
  });

  const handleViewportChange = () => {
    if (parentElement) {
      setRect(
        virtualReference(parentElement).getBoundingClientRect() as DOMRect
      );
    }
  };

  useEffect(() => {
    if (parentElement !== null) {
      window.addEventListener('resize', handleViewportChange);
      window.addEventListener('scroll', handleViewportChange);

      return () => {
        window.removeEventListener('resize', handleViewportChange);
        window.removeEventListener('scroll', handleViewportChange);
      };
    }
  }, [parentElement]);

  useEffect(() => {
    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, [update]);

  useEffect(() => {
    if (parentElementName) {
      const element = document.querySelector(parentElementName);
      setParentElement(element);
      refs.setReference(element);
    }
  }, [parentElementName]);

  useEffect(() => {
    parentElement &&
      setRect(
        virtualReference(parentElement).getBoundingClientRect() as DOMRect
      );
  }, [parentElement]);

  useEffect(() => {
    if (parentElement && containerRef.current) {
      containerRef.current.innerHTML = '';
      const clonedElement = parentElement.cloneNode(true) as HTMLElement;
      if (elementClassName) {
        clonedElement.className += ` ${elementClassName}`;
      }
      containerRef.current.appendChild(clonedElement);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [parentElement, containerRef.current, elementClassName]);

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add('user-guide-visible');
    } else {
      document.body.classList.remove('user-guide-visible');
    }

    return () => {
      document.body.classList.remove('user-guide-visible');
    };
  }, [isVisible]);

  const cloneReferenceElement = () => {
    if (!rect) return null;

    return (
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          pointerEvents: 'none',
        }}
      />
    );
  };

  return (
    <>
      <div
        className={cx(styles[`${baseClass}__overlay`])}
        style={{
          display: isVisible ? 'flex' : 'none',
          zIndex: zIndex,
        }}
      >
        {parentElement && cloneReferenceElement()}
      </div>
      {isVisible && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: isFirstStep || isLastStep ? '40%' : y,
              left: isFirstStep || isLastStep ? '45%' : x,
            }}
            className={cx(
              styles[`${baseClass}__floating`],
              styles[`${baseClass}__floating--${cursorTiming}`],
              className
            )}
          >
            <div
              ref={contentRef}
              className={cx(
                styles[`${baseClass}__guide`],
                styles[`${baseClass}__guide--${placement}`]
              )}
            >
              <div
                className={cx(
                  styles[`${baseClass}__guide__arrow`],
                  styles[`${baseClass}__guide__arrow--${placement}`],
                  styles[`${baseClass}__guide__arrow--${cursorTiming}`]
                )}
              >
                <img src={cursorImage} alt="cursor" />
              </div>
              {children && (
                <div
                  key={parentElementName}
                  className={cx(
                    styles[`${baseClass}__guide__content`],
                    styles[`${baseClass}__guide__content--${placement}`],
                    styles[`${baseClass}__guide__content--${cursorTiming}`]
                  )}
                >
                  {children}
                </div>
              )}
            </div>
          </div>
        </FloatingPortal>
      )}
    </>
  );
};
