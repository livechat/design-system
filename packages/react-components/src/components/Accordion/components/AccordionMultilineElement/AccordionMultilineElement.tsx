import * as React from 'react';

import { useAnimations, useHeightResizer } from '../../../../hooks';

import * as styles from './styles';

export interface IAccordionMultilineElementProps {
  children: React.ReactNode;
  isExpanded: boolean;
}

export const AccordionMultilineElement: React.FC<
  IAccordionMultilineElementProps
> = ({ children, isExpanded }) => {
  const multilineRef = React.useRef<HTMLDivElement>(null);
  const { isOpen: isVisible, isMounted } = useAnimations({
    isVisible: !isExpanded,
    elementRef: multilineRef,
  });
  const { size, handleResizeRef } = useHeightResizer();

  return (
    <div
      className={styles.baseStyles}
      style={{ maxHeight: isVisible ? size : 0 }}
      ref={multilineRef}
    >
      <div ref={handleResizeRef}>
        {isMounted && <div className={styles.inner}>{children}</div>}
      </div>
    </div>
  );
};
