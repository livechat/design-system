import * as React from 'react';

import { ChevronDown } from '@livechat/design-system-icons';
import cx from 'clsx';

import { ComponentCoreProps } from '../../utils/types';
import { Icon } from '../Icon';
import { Text } from '../Typography';

import styles from './Accordion.module.scss';

const baseClass = 'accordion';

export interface IAccordionProps extends ComponentCoreProps {
  /**
   * Specify the content of the accordion
   */
  children: React.ReactNode;
  /**
   * Specify the label of the accordion
   */
  label: React.ReactNode;
  /**
   * Specify the multiline element, which will be displayed under the label
   */
  multilineElement?: React.ReactNode;
  /**
   * Specify the kind of the accordion
   */
  kind?: 'default' | 'warning' | 'error';
}

export const Accordion: React.FC<IAccordionProps> = ({
  children,
  label,
  multilineElement,
  kind = 'default',
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState(0);
  const previousSizeRef = React.useRef(size);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsOpen((prev) => !prev);
    }
  };

  React.useEffect(() => {
    const hasIOSupport = !!window.ResizeObserver;

    if (contentRef.current && hasIOSupport) {
      const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;

        const newSize = entry.contentRect.height;

        if (previousSizeRef.current !== newSize) {
          setSize(newSize);
          previousSizeRef.current = newSize;
        }
      });

      resizeObserver.observe(contentRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [contentRef]);

  return (
    <div
      tabIndex={0}
      aria-expanded={isOpen}
      className={cx(styles[baseClass], styles[`${baseClass}--${kind}`], {
        [styles[`${baseClass}--open`]]: isOpen,
      })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <Icon
        source={ChevronDown}
        className={cx(styles[`${baseClass}__chevron`], {
          [styles[`${baseClass}__chevron--open`]]: isOpen,
        })}
      />
      <Text bold className={styles[`${baseClass}__label`]}>
        {label}
      </Text>
      {multilineElement && (
        <div className={styles[`${baseClass}__multiline-element`]}>
          {multilineElement}
        </div>
      )}
      <div
        className={styles[`${baseClass}__content`]}
        style={{ maxHeight: isOpen ? size : 0 }}
      >
        <div aria-expanded={isOpen} ref={contentRef}>
          <Text as="div" className={styles[`${baseClass}__content__inner`]}>
            {children}
          </Text>
        </div>
      </div>
    </div>
  );
};
