import { FC, useEffect, useRef, useState } from 'react';

import cx from 'clsx';

import { useAnimations } from '../../hooks';

import { getFloatingStyles } from './helpers';
import { IFloatingPanelProps } from './types';

import styles from './FloatingPanel.module.scss';

const baseClass = 'floating-panel';

export const FloatingPanel: FC<IFloatingPanelProps> = ({
  children,
  className,
  isVisible = false,
  placement = 'bottom',
  ...props
}) => {
  const [panelHeight, setPanelHeight] = useState<number>(0);
  const [panelWidth, setPanelWidth] = useState<number>(0);
  const floatingElementWrapperRef = useRef<HTMLDivElement>(null);
  const { isOpen, isMounted } = useAnimations({
    isVisible: isVisible,
    elementRef: floatingElementWrapperRef,
    animationDuration: 500,
  });
  const mergedClassNames = cx(
    styles[baseClass],
    styles[`${baseClass}--${placement}`],
    className,
    {
      [styles[`${baseClass}--visible`]]: isOpen,
    }
  );

  useEffect(() => {
    if (isMounted) {
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
      role="floating-panel"
      aria-visible={isOpen}
      ref={floatingElementWrapperRef}
      className={mergedClassNames}
      style={getFloatingStyles(placement, isOpen, panelHeight, panelWidth)}
      {...props}
    >
      {children}
    </div>
  );
};
