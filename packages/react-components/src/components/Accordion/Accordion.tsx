import * as React from 'react';

import { ChevronDown } from '@livechat/design-system-icons';
import cx from 'clsx';

import { useAnimations } from '../../utils';
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
  const [open, setOpen] = React.useState(openOnInit);
  const isControlled = isOpen !== undefined;
  const currentlyOpen = isControlled ? isOpen : open;
  const mergedClassName = cx(
    styles[baseClass],
    styles[`${baseClass}--${kind}`],
    {
      [styles[`${baseClass}--open`]]: currentlyOpen,
    },
    className
  );
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState(0);
  const previousSizeRef = React.useRef(size);
  const { isOpen: isExpanded, isMounted } = useAnimations({
    isVisible: currentlyOpen,
    elementRef: contentRef,
  });

  const handleStateChange = (state: boolean) => {
    if (state) {
      onClose?.();
      !isControlled && setOpen(false);
    } else {
      onOpen?.();
      !isControlled && setOpen(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isExpanded && (event.key === 'Enter' || event.key === ' ')) {
      handleStateChange(currentlyOpen);
    }

    if (isExpanded && event.key === 'Escape') {
      handleStateChange(currentlyOpen);
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
        bold
        className={styles[`${baseClass}__label`]}
        onClick={() => handleStateChange(isExpanded)}
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
      >
        <div aria-expanded={isExpanded} ref={contentRef}>
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
