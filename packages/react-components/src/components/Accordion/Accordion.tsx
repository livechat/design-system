import * as React from 'react';

import { cx } from '@emotion/css';
import { ChevronDown } from '@livechat/design-system-icons';

import { useAnimations, useHeightResizer } from '../../hooks';
import { Icon } from '../Icon';
import { Heading, Text, TTextSize } from '../Typography';

import { AccordionMultilineElement } from './components/AccordionMultilineElement';
import { getLabel } from './helpers';
import { useAccordion } from './hooks';
import * as styles from './styles';
import {
  IAccordionProps,
  IAccordionPromoProps,
  IAccordionComponentProps,
} from './types';

const AccordionComponent: React.FC<IAccordionComponentProps> = ({
  className,
  mainClassName,
  children,
  label,
  multilineElement,
  openOnInit = false,
  isOpen,
  isPromo,
  footer,
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
    setShouldBeVisible,
  } = useAnimations({
    isVisible: currentlyOpen,
    elementRef: contentRef,
  });
  const { size, handleResizeRef } = useHeightResizer();
  const { handleExpandChange, handleKeyDown } = useAccordion({
    isControlled,
    isExpanded,
    setShouldBeVisible,
    onOpen,
    onClose,
  });
  const mergedClassName = cx(
    mainClassName,
    {
      [styles.open]: isExpanded,
    },
    className
  );

  const buildHeader = (isPromo?: boolean) => {
    const Component = isPromo ? Heading : Text;
    const props = {
      'aria-expanded': isExpanded,
      as: 'div',
      className: styles.label(isPromo),
      onClick: () => handleExpandChange(isExpanded),
      bold: !isPromo ? true : undefined,
      ...(isPromo ? { size: 'xs' as TTextSize } : {}),
    };

    return <Component {...props}>{getLabel(label, isExpanded)}</Component>;
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
        className={styles.chevron(isExpanded, isPromo)}
      />
      {buildHeader(isPromo)}
      {multilineElement && (
        <AccordionMultilineElement isExpanded={isExpanded}>
          {multilineElement}
        </AccordionMultilineElement>
      )}
      <div
        className={styles.content}
        style={{ maxHeight: isExpanded ? size : 0 }}
        ref={contentRef}
      >
        <div ref={handleResizeRef}>
          {isMounted && (
            <>
              <Text
                as="div"
                className={styles.contentInner(isExpanded, isPromo)}
              >
                {children}
              </Text>
              {footer && (
                <Text
                  as="div"
                  aria-label="Accordion footer"
                  role="complementary"
                  className={styles.footer(isPromo)}
                >
                  {footer}
                </Text>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const Accordion: React.FC<IAccordionProps> = ({ kind, ...props }) => {
  const mainClassName = cx(styles.baseStyles(), styles.kind(kind));

  return <AccordionComponent mainClassName={mainClassName} {...props} />;
};

export const AccordionPromo: React.FC<IAccordionPromoProps> = (props) => {
  const mainClassName = cx(styles.baseStyles(true));

  return (
    <AccordionComponent mainClassName={mainClassName} isPromo {...props} />
  );
};
