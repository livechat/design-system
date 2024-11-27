import * as React from 'react';
import { useState, useEffect } from 'react';

import cx from 'clsx';

import styles from './AnimatedButton.module.scss';

export interface AnimatedIconButtonProps {
  /**
   * The icon to display inside the button.
   */
  icon: React.ReactElement;
  /**
   * The text to display alongside the icon.
   */
  text: string;
  /**
   * Optional click handler.
   */
  onClick?: () => void;
  /**
   * Optional className to apply to the button.
   */
  className?: string;
  /**
   * Optional prop to control the expanded state of the button.
   */
  isExpanded?: boolean;
}

export const AnimatedButton: React.FC<AnimatedIconButtonProps> = ({
  icon,
  text,
  onClick,
  className,
  isExpanded,
}) => {
  const [internalIsExpanded, setInternalIsExpanded] = useState(false);

  const isControlled = isExpanded !== undefined;
  const expanded = isControlled ? isExpanded : internalIsExpanded;

  const handleMouseEnter = () => {
    setInternalIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setInternalIsExpanded(false);
  };

  useEffect(() => {
    if (isControlled && !isExpanded) {
      setInternalIsExpanded(false);
    }
  }, [isControlled, isExpanded]);

  return (
    <button
      type="button"
      className={cx(
        styles['animated-button'],
        { [styles.expanded]: expanded },
        className
      )}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={styles.icon}>{icon}</span>
      <span className={styles.text}>{text}</span>
    </button>
  );
};
