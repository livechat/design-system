import * as React from 'react';

import { ChevronDown } from '@livechat/design-system-icons';
import cx from 'clsx';

import { useAnimations, useHeightResizer } from '../../hooks';
import { Icon } from '../Icon';
import { Heading, Text, TTextSize } from '../Typography';

import { AccordionMultilineElement } from './components/AccordionMultilineElement';
import { getLabel } from './helpers';
import { useAccordion } from './hooks';
import {
  IAccordionProps,
  IAccordionPromoProps,
  IAccordionComponentProps,
} from './types';

import styles from './Accordion.module.scss';

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
      [styles[`${baseClass}--open`]]: isExpanded,
    },
    className
  );

  const buildHeader = (isPromo?: boolean) => {
    const Component = isPromo ? Heading : Text;
    const props = {
      'aria-expanded': isExpanded,
      as: 'div',
      className: cx(styles[`${baseClass}__label`], {
        [styles[`${baseClass}__label--promo`]]: isPromo,
      }),
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
        className={cx(styles[`${baseClass}__chevron`], {
          [styles[`${baseClass}__chevron--open`]]: isExpanded,
          [styles[`${baseClass}__chevron--promo`]]: isPromo,
        })}
      />
      {buildHeader(isPromo)}
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
            <>
              <Text
                as="div"
                className={cx(styles[`${baseClass}__content__inner`], {
                  [styles[`${baseClass}__content__inner--open`]]: isExpanded,
                  [styles[`${baseClass}__content__inner--promo`]]: isPromo,
                })}
              >
                {children}
              </Text>
              {footer && (
                <Text
                  as="div"
                  className={cx(styles[`${baseClass}__footer`], {
                    [styles[`${baseClass}__footer--promo`]]: isPromo,
                  })}
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

const baseClass = 'accordion';

export const Accordion: React.FC<IAccordionProps> = ({ kind, ...props }) => {
  const mainClassName = cx(styles[baseClass], styles[`${baseClass}--${kind}`]);

  return <AccordionComponent mainClassName={mainClassName} {...props} />;
};

const promoBaseClass = `${baseClass}--promo`;

export const AccordionPromo: React.FC<IAccordionPromoProps> = (props) => {
  const mainClassName = cx(styles[baseClass], styles[promoBaseClass]);

  return (
    <AccordionComponent mainClassName={mainClassName} isPromo {...props} />
  );
};
