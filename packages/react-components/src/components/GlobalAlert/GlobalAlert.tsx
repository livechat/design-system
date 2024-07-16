import * as React from 'react';
import { type FC, useRef, useState, useEffect } from 'react';

import { ChevronDown, ChevronUp, Close } from '@livechat/design-system-icons';
import cx from 'clsx';

import noop from '../../utils/noop';
import { useClickOutside } from '../../utils/useClickOutside';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Text } from '../Typography';

import { getTopBarAlertIcon } from './helpers';
import { type TopBarAlertKind } from './types';

import styles from './GlobalAlert.module.scss';

const baseClass = 'global-alert';

interface IGlobalAlert {
  className?: string;
  kind: TopBarAlertKind;
  icon?: FC;
  label: string;
  collapsable?: boolean;
  isVisible?: boolean;
  onVisibilityChange?: (isOpened: boolean) => void;
  onClose?: () => void;
  hoverDelay?: number;
  isMobileDevice?: boolean;
}

const HOVER_DELAY = 400;

export const GlobalAlert: FC<IGlobalAlert> = ({
  className,
  kind,
  icon,
  label,
  collapsable = true,
  isVisible: isVisibleProp,
  onVisibilityChange,
  onClose,
  hoverDelay = HOVER_DELAY,
  isMobileDevice = false,
  children,
}) => {
  const [isAlertToggled, setIsAlertToggled] = useState(false); // used to skip collapse animation on first render
  const [isVisibleInternal, setIsVisibleInternal] = useState(false);
  const alertContainerRef = useRef<HTMLDivElement | null>(null);
  const isControlled = isVisibleProp !== undefined;
  const isVisible = isControlled ? isVisibleProp : isVisibleInternal;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useClickOutside(alertContainerRef, () => {
    if (isVisible) {
      toggleVisibility();
    }
  });

  const toggleVisibility = (): void => {
    if (!collapsable) {
      return;
    }

    setIsAlertToggled(true);

    const newValue = !isVisible;
    if (!isControlled) {
      setIsVisibleInternal(newValue);
    }
    if (onVisibilityChange) {
      onVisibilityChange(newValue);
    }
  };

  const clearDelayTimeout = (): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseEvent = (condition: boolean): void => {
    if (isMobileDevice) {
      return;
    }

    clearDelayTimeout();
    timeoutRef.current = setTimeout(() => {
      if (condition && !isControlled && !isMobileDevice) {
        toggleVisibility();
      }
    }, hoverDelay);
  };

  const handleMouseEnter = (): void => handleMouseEvent(!isVisible);
  const handleMouseLeave = (): void => handleMouseEvent(isVisible);

  useEffect(() => {
    return () => {
      clearDelayTimeout();
    };
  }, []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={alertContainerRef}
      className={cx(
        styles[baseClass],
        styles[`${baseClass}--${kind}`],
        {
          [styles[`${baseClass}--expanded--${kind}`]]: isVisible,
        },
        className
      )}
    >
      <div className={styles[`${baseClass}__header-row`]}>
        <div
          className={styles[`${baseClass}__header-wrapper`]}
          onClick={isMobileDevice ? toggleVisibility : noop}
        >
          <Icon
            className={cx(
              styles[
                `${baseClass}__icon--${
                  isVisible ? 'expanded' : 'collapsed'
                }--${kind}`
              ]
            )}
            source={icon || getTopBarAlertIcon(kind)}
          />
          <Text
            className={cx(
              styles[`${baseClass}__label`],
              styles[
                `${baseClass}__label--${isVisible ? 'expanded' : 'collapsed'}`
              ]
            )}
            bold
          >
            {label}
          </Text>
        </div>
        {collapsable && (
          <Button
            className={cx(
              styles[`${baseClass}__action-button`],
              styles[
                `${baseClass}__action-button--${
                  isVisible ? 'expanded' : 'collapsed'
                }`
              ]
            )}
            kind="text"
            size="compact"
            onClick={toggleVisibility}
            icon={<Icon source={isVisible ? ChevronUp : ChevronDown} />}
          />
        )}
        {onClose && (
          <Button
            className={cx(styles[`${baseClass}__action-button`], {
              [styles[`${baseClass}__action-button--expanded`]]: isVisible,
            })}
            kind="text"
            size="compact"
            onClick={onClose}
            icon={<Icon source={Close} />}
            data-testid="close-alert"
          />
        )}
      </div>
      {children && (
        <div
          className={cx(styles[`${baseClass}__content-wrapper`], {
            [styles[`${baseClass}__content-wrapper--expanded`]]: isVisible,
            [styles[
              `${baseClass}__content-animation--${
                isVisible ? 'expanded' : 'collapsed'
              }`
            ]]: isAlertToggled,
          })}
        >
          <div className={styles[`${baseClass}__content`]}>{children}</div>
        </div>
      )}
    </div>
  );
};
