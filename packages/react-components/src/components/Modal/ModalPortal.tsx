import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface ModalPortalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  zIndex: number;
  parentElementName: string;
}

export const ModalPortal: React.FC<ModalPortalProps> = ({
  children,
  className = '',
  parentElementName = 'body',
  zIndex,
}) => {
  const [container] = React.useState(() => document.createElement('div'));

  if (className) {
    container.classList.add(className);
  }

  if (zIndex) {
    container.style.zIndex = zIndex.toString();
  }

  React.useEffect(() => {
    document.querySelector(parentElementName)?.appendChild(container);
    return () => {
      document.querySelector(parentElementName)?.removeChild(container);
    };
  }, [parentElementName]);

  // Fragment added to fix TS complaining about createPortal any type
  return <>{ReactDOM.createPortal(children, container)}</>;
};
