import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';

import { FloatingPortal } from '@floating-ui/react';
import cx from 'clsx';

import { Tooltip } from '../Tooltip';

import { IUserGuide } from './types';
import VirtualReference from './virtualElementReference';

import styles from './UserGuide.module.scss';

// TODO is it still needed
// const spotlightPadding = 8;
const baseClass = 'user-guide';

const virtualReference = (element: Element, padding: number = 0) =>
  new VirtualReference(element, padding);

export const UserGuide: FC<PropsWithChildren<IUserGuide>> = (props) => {
  const {
    className,
    parentElementName,
    isVisible = false,
    shouldSlide = true,
    elementStyles,
  } = props;

  const [parentElement, setParentElement] = useState<Element | null>(null);

  const [rect, setRect] = useState<DOMRect | null>(null);
  const [isSliding, setIsSliding] = useState<boolean>(shouldSlide);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleViewportChange = () => {
    if (parentElement) {
      setRect(
        virtualReference(parentElement).getBoundingClientRect() as DOMRect
      );
      setIsSliding(false);
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
    if (parentElementName) {
      const element = document.querySelector(parentElementName);
      setParentElement(element);
    }
  }, [parentElementName]);

  useEffect(() => {
    parentElement &&
      setRect(
        virtualReference(parentElement).getBoundingClientRect() as DOMRect
      );
    setIsSliding(true);
  }, [parentElement]);

  useEffect(() => {
    if (parentElement && containerRef.current) {
      containerRef.current.innerHTML = '';
      const clonedElement = parentElement.cloneNode(true) as HTMLElement;
      Object.assign(clonedElement.style, elementStyles);
      containerRef.current.appendChild(clonedElement);
    }
  }, [parentElement, containerRef.current, isVisible]);

  const cloneReferenceElement = () => {
    if (!rect) return null;

    return (
      <div
        ref={containerRef}
        className={cx({ [styles[`${baseClass}--slide`]]: isSliding })}
        style={{
          position: 'absolute',
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        }}
      ></div>
    );
  };

  return parentElement ? (
    <div>
      <div
        className={cx(styles[`${baseClass}__overlay`])}
        style={{
          display: isVisible ? 'block' : 'none',
        }}
      >
        {cloneReferenceElement()}
      </div>

      {isVisible && rect && (
        <FloatingPortal>
          <Tooltip
            {...props}
            triggerRenderer={<></>}
            referenceElement={{
              getBoundingClientRect: () => {
                return rect;
              },
              contextElement: parentElement,
            }}
            className={cx({
              [styles[baseClass]]: true,
              [styles[`${baseClass}--slide`]]: isSliding,
              className: className,
            })}
          >
            {props.children}
          </Tooltip>
        </FloatingPortal>
      )}
    </div>
  ) : null;
};
