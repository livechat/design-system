import * as React from 'react';

import { useAnimations } from '../../../hooks';
import { IAccordionAnimatedLabelProps } from '../types';

import * as styles from './styles';

export const AccordionAnimatedLabel: React.FC<IAccordionAnimatedLabelProps> = ({
  open,
  closed,
  isOpen,
}) => {
  const openRef = React.useRef<HTMLDivElement>(null);
  const closedRef = React.useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = React.useState<
    number | undefined
  >(undefined);
  const { isOpen: isOpenVisible, isMounted: isOpenMounted } = useAnimations({
    isVisible: isOpen,
    elementRef: openRef,
  });
  const { isOpen: isClosedVisible, isMounted: isClosedMounted } = useAnimations(
    {
      isVisible: !isOpen,
      elementRef: closedRef,
    }
  );

  React.useEffect(() => {
    const activeRef = isOpen ? openRef.current : closedRef.current;
    if (activeRef) {
      const newHeight = activeRef.getBoundingClientRect().height;
      setContainerHeight(newHeight);
    }
  }, [isOpen, isOpenMounted, isClosedMounted]);

  return (
    <div className={styles.animatedLabelBaseStyles(containerHeight)}>
      {isOpenMounted && (
        <div ref={openRef} className={styles.element(isOpenVisible)}>
          {open}
        </div>
      )}
      {isClosedMounted && (
        <div ref={closedRef} className={styles.element(isClosedVisible)}>
          {closed}
        </div>
      )}
    </div>
  );
};
