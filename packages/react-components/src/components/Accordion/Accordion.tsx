import * as React from 'react';

import { ChevronDown } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Icon } from '../Icon';
import { Text } from '../Typography';

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
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(openOnInit);
  const currentlyOpen = isControlled ? isOpen : open;
  const [size, setSize] = React.useState(0);
  const previousSizeRef = React.useRef(size);
  const mergedClassName = cx(
    styles[baseClass],
    styles[`${baseClass}--${kind}`],
    {
      [styles[`${baseClass}--open`]]: currentlyOpen,
    },
    className
  );

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
    if (!currentlyOpen && (event.key === 'Enter' || event.key === ' ')) {
      handleStateChange(currentlyOpen);
    }

    if (currentlyOpen && event.key === 'Escape') {
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
      aria-expanded={currentlyOpen}
      className={mergedClassName}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <Icon
        source={ChevronDown}
        className={cx(styles[`${baseClass}__chevron`], {
          [styles[`${baseClass}__chevron--open`]]: currentlyOpen,
        })}
      />
      <Text
        bold
        className={styles[`${baseClass}__label`]}
        onClick={() => handleStateChange(currentlyOpen)}
      >
        {getLabel(label, currentlyOpen)}
      </Text>
      {multilineElement && (
        <div className={styles[`${baseClass}__multiline-element`]}>
          {multilineElement}
        </div>
      )}
      <div
        className={styles[`${baseClass}__content`]}
        style={{ maxHeight: currentlyOpen ? size : 0 }}
      >
        <div aria-expanded={currentlyOpen} ref={contentRef}>
          <Text
            as="div"
            className={cx(styles[`${baseClass}__content__inner`], {
              [styles[`${baseClass}__content__inner--open`]]: currentlyOpen,
            })}
          >
            {children}
          </Text>
        </div>
      </div>
    </div>
  );
};
