import * as React from 'react';

import cx from 'clsx';

import { IAccordionAnimatedLabelProps } from '../types';

import styles from './AccordionAnimatedLabel.module.scss';

const baseClass = `accordion-animated-label`;

export const AccordionAnimatedLabel: React.FC<IAccordionAnimatedLabelProps> = ({
  open,
  closed,
  isOpen,
}) => {
  const openLabelRef = React.useRef<HTMLDivElement>(null);
  const closeLabelRef = React.useRef<HTMLDivElement>(null);
  const [isOpenMounted, setIsOpenMounted] = React.useState(isOpen);
  const [isOpenVisible, setIsOpenVisible] = React.useState(isOpen);
  const [isClosedMounted, setIsClosedMounted] = React.useState(!isOpen);
  const [isClosedVisible, setIsClosedVisible] = React.useState(!isOpen);

  React.useEffect(() => {
    const openRef = openLabelRef.current;
    const closeRef = closeLabelRef.current;
    const currentRef = isOpen ? openRef : closeRef;

    if (isOpen) {
      setIsOpenMounted(true);
      setIsClosedVisible(false);
    } else {
      setIsClosedMounted(true);
      setIsOpenVisible(false);
    }

    requestAnimationFrame(() =>
      isOpen ? setIsOpenVisible(true) : setIsClosedVisible(true)
    );

    currentRef &&
      currentRef.addEventListener(
        'transitionend',
        () => (isOpen ? setIsClosedMounted(false) : setIsOpenMounted(false)),
        { once: true }
      );
  }, [isOpen]);

  return (
    <div className={styles[baseClass]}>
      {isOpenMounted && (
        <div
          ref={openLabelRef}
          className={cx(styles[`${baseClass}__open`], {
            [styles[`${baseClass}__open--visible`]]: isOpenVisible,
          })}
        >
          {open}
        </div>
      )}
      {isClosedMounted && (
        <div
          ref={closeLabelRef}
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
