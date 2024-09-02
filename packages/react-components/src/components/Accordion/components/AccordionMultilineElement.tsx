import * as React from 'react';

import { useAnimations } from '../../../utils';

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
  const [size, setSize] = React.useState(0);
  const previousMultilineSizeRef = React.useRef(size);
  const { isOpen: isVisible, isMounted } = useAnimations({
    isVisible: !isExpanded,
    elementRef: multilineRef,
  });

  React.useEffect(() => {
    const hasIOSupport = !!window.ResizeObserver;

    if (multilineRef.current && hasIOSupport) {
      const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;

        const newSize = entry.contentRect.height;

        if (previousMultilineSizeRef.current !== newSize) {
          setSize(newSize);
          previousMultilineSizeRef.current = newSize;
        }
      });

      resizeObserver.observe(multilineRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [multilineRef]);

  return (
    <div
      className={styles[`${baseClass}`]}
      style={{ maxHeight: isVisible ? size : 0 }}
    >
      <div aria-expanded={isExpanded} ref={multilineRef}>
        {isMounted && (
          <div className={styles[`${baseClass}__inner`]}>{children}</div>
        )}
      </div>
    </div>
  );
};
