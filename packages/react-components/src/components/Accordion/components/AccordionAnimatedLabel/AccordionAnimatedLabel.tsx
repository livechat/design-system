import * as React from 'react';

import cx from 'clsx';

import { useAnimations } from '../../../../hooks';
import { IAccordionAnimatedLabelProps } from '../../types';

import styles from './AccordionAnimatedLabel.module.scss';

const baseClass = `accordion-animated-label`;

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
    <div
      className={styles[baseClass]}
      style={{ height: containerHeight ? `${containerHeight}px` : 'auto' }}
    >
      {isOpenMounted && (
        <div
          ref={openRef}
          className={cx(styles[`${baseClass}__open`], {
            [styles[`${baseClass}__open--visible`]]: isOpenVisible,
          })}
        >
          {open}
        </div>
      )}
      {isClosedMounted && (
        <div
          ref={closedRef}
          className={cx(styles[`${baseClass}__close`], {
            [styles[`${baseClass}__close--visible`]]: isClosedVisible,
          })}
        >
          {closed}
        </div>
      )}
    </div>
  );
};
