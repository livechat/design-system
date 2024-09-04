import * as React from 'react';

import { useAnimations, useHeightResizer } from '../../../hooks';

import styles from './AccordionMultilineElement.module.scss';

const baseClass = 'accordion-multiline';

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
  const { size, handleResize } = useHeightResizer();

  return (
    <div
      className={styles[`${baseClass}`]}
      style={{ maxHeight: isVisible ? size : 0 }}
      ref={multilineRef}
    >
      <div ref={handleResize}>
        {isMounted && (
          <div className={styles[`${baseClass}__inner`]}>{children}</div>
        )}
      </div>
    </div>
  );
};
