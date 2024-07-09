import {
  useEffect,
  FC,
  useRef,
  PropsWithChildren,
  ReactNode,
  HTMLAttributes,
} from 'react';

import { createPortal } from 'react-dom';

export interface ModalPortalProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  zIndex: number;
  parentElementName?: string;
}

export const ModalPortal: FC<PropsWithChildren<ModalPortalProps>> = ({
  children,
  className = '',
  parentElementName = 'body',
  zIndex,
}) => {
  const containerRef = useRef(document.createElement('div'));

  useEffect(() => {
    const container = containerRef.current;
    const parentElement = document.querySelector(parentElementName);

    if (parentElement) {
      parentElement.appendChild(container);
    }

    return () => {
      if (parentElement) {
        parentElement.removeChild(container);
      }
    };
  }, [parentElementName]);

  useEffect(() => {
    const container = containerRef.current;
    if (className) {
      container.className = className;
    }
    if (zIndex) {
      container.style.zIndex = `${zIndex}`;
    }
  }, [className, zIndex]);

  return createPortal(<>{children}</>, containerRef.current);
};
