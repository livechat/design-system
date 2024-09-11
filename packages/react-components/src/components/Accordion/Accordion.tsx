import * as React from 'react';

import { ChevronDown } from '@livechat/design-system-icons';
import cx from 'clsx';

import { useAnimations, useHeightResizer } from '../../hooks';
import { Icon } from '../Icon';
import { Text } from '../Typography';

import { AccordionMultilineElement } from './components/AccordionMultilineElement';
import { getLabel } from './helpers';
import { IAccordionProps } from './types';

import styles from './Accordion.module.scss';

const baseClass = 'accordion';

export const Accordion: React.FC<IAccordionProps> = ({
  className,
  children,
  label,
  multilineElement,
  kind = 'default',
  openOnInit = false,
  isOpen,
  onClose,
  onOpen,
  ...props
}) => {
  const isControlled = isOpen !== undefined;
  const currentlyOpen = isControlled ? isOpen : openOnInit;
  const contentRef = React.useRef<HTMLDivElement>(null);
  const {
    isOpen: isExpanded,
    isMounted,
    setIsOpen,
  } = useAnimations({
    isVisible: currentlyOpen,
    elementRef: contentRef,
  });
  const mergedClassName = cx(
    styles[baseClass],
    styles[`${baseClass}--${kind}`],
    {
      [styles[`${baseClass}--open`]]: isExpanded,
    },
    className
  );
  const { size, handleResizeRef } = useHeightResizer();

  const handleExpandChange = (isExpanded: boolean) => {
    if (isExpanded) {
      onClose?.();
      !isControlled && setIsOpen(false);
    } else {
      onOpen?.();
      !isControlled && setIsOpen(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isExpanded && (event.key === 'Enter' || event.key === ' ')) {
      handleExpandChange(isExpanded);
    }

    if (isExpanded && event.key === 'Escape') {
      handleExpandChange(isExpanded);
    }
  };

  return (
    <div
      tabIndex={0}
      aria-expanded={isExpanded}
      className={mergedClassName}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <Icon
        source={ChevronDown}
        className={cx(styles[`${baseClass}__chevron`], {
          [styles[`${baseClass}__chevron--open`]]: isExpanded,
        })}
      />
      <Text
        aria-expanded={isExpanded}
        role="button"
        as="div"
        bold
        className={styles[`${baseClass}__label`]}
        onClick={() => handleExpandChange(isExpanded)}
      >
        {getLabel(label, isExpanded)}
      </Text>
      {multilineElement && (
        <AccordionMultilineElement isExpanded={isExpanded}>
          {multilineElement}
        </AccordionMultilineElement>
      )}
      <div
        className={styles[`${baseClass}__content`]}
        style={{ maxHeight: isExpanded ? size : 0 }}
        ref={contentRef}
      >
        <div ref={handleResizeRef}>
          {isMounted && (
            <Text
              as="div"
              className={cx(styles[`${baseClass}__content__inner`], {
                [styles[`${baseClass}__content__inner--open`]]: isExpanded,
              })}
            >
              {children}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};
