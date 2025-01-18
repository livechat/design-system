import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';

import { FloatingPortal } from '@floating-ui/react';
import cx from 'clsx';

import { Tooltip } from '../Tooltip';

import { IUserGuide } from './types';
import VirtualReference from './virtualElementReference';

import styles from './UserGuide.module.scss';

const baseClass = 'user-guide';

const virtualReference = (element: Element, padding: number = 0) =>
  new VirtualReference(element, padding);

export const UserGuide: FC<PropsWithChildren<IUserGuide>> = (props) => {
  const {
    className,
    parentElementName,
    isVisible = false,
    elementStyles,
  } = props;

  const [parentElement, setParentElement] = useState<Element | null>(null);

  const [rect, setRect] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
  }, [parentElement]);

  useEffect(() => {
    if (parentElement && containerRef.current) {
      containerRef.current.innerHTML = '';
      const clonedElement = parentElement.cloneNode(true) as HTMLElement;
      Object.assign(clonedElement.style, elementStyles);
      containerRef.current.appendChild(clonedElement);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [parentElement, containerRef.current, isVisible]);

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
