import { HTMLAttributes, ReactNode, FC, useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';

export interface ModalPortalProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  zIndex: number;
  parentElementName?: string;
}

export const ModalPortal: FC<ModalPortalProps> = ({
  children,
  className = '',
  parentElementName = 'body',
  zIndex,
}) => {
  const [container] = useState(() => document.createElement('div'));

  if (className) {
    container.classList.add(className);
  }

  if (zIndex) {
    container.style.zIndex = zIndex.toString();
  }

  useEffect(() => {
    document.querySelector(parentElementName)?.appendChild(container);
    return () => {
      document.querySelector(parentElementName)?.removeChild(container);
    };
  }, [parentElementName]);

  // Fragment added to fix TS complaining about createPortal any type
  return <>{ReactDOM.createPortal(children, container)}</>;
};
