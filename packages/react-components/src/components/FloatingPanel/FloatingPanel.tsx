import { FC, useEffect, useRef, useState } from 'react';

import cx from 'clsx';

import { useAnimations } from '../../hooks';

import { getFloatingStyles } from './helpers';
import { IFloatingPanelProps } from './types';

import styles from './FloatingPanel.module.scss';

const baseClass = 'floating-panel';

export const FloatingPanel: FC<IFloatingPanelProps> = ({
  children,
  isVisible = false,
  placement = 'bottom',
}) => {
  const [panelHeight, setPanelHeight] = useState<number>(0);
  const [panelWidth, setPanelWidth] = useState<number>(0);
  const floatingElementWrapperRef = useRef<HTMLDivElement>(null);
  const { isOpen, isMounted } = useAnimations({
    isVisible: isVisible,
    elementRef: floatingElementWrapperRef,
    animationDuration: 500,
  });

  useEffect(() => {
    if (isMounted && panelHeight === 0) {
      setPanelHeight(
        floatingElementWrapperRef?.current?.getBoundingClientRect().height || 0
      );
      setPanelWidth(
        floatingElementWrapperRef?.current?.getBoundingClientRect().width || 0
      );
    }
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      ref={floatingElementWrapperRef}
      className={cx(styles[baseClass], styles[`${baseClass}--${placement}`], {
        [styles[`${baseClass}--visible`]]: isOpen,
      })}
      style={getFloatingStyles(placement, isOpen, panelHeight, panelWidth)}
    >
      {children}
    </div>
  );
};
