import * as React from 'react';

import { ChevronUp, ChevronDown } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Button, ButtonProps } from '../Button';
import { Icon } from '../Icon';
import { Text, Heading } from '../Typography';

import styles from './Card.module.scss';

export type CardButtonOptions = Pick<
  ButtonProps,
  'children' | 'kind' | 'onClick'
>;

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Alternate text for an image card
   */
  alt?: string;
  /**
   * Array of card buttons
   */
  buttonsOptions?: CardButtonOptions[];
  /**
   * Card description
   */
  description?: string;
  /**
   * Element to display in the expandable area
   */
  expandableContent?: React.ReactNode;
  /**
   * Image source for the image card
   */
  src?: string;
  /**
   * Card title
   */
  title?: string;
}

const baseClass = 'card';
const headerClass = `${baseClass}__header`;
const headingClass = `${headerClass}__heading`;
const actionsClass = `${baseClass}__actions`;
const noImageClass = `${headerClass}__no-image`;

export const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  alt,
  buttonsOptions = [],
  children,
  className,
  description,
  expandableContent,
  src,
  title,
  ...divProps
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const expandIcon = isExpanded ? ChevronUp : ChevronDown;
  const expandButtonText = isExpanded ? 'Hide' : 'Show more';
  const shouldShowActionButtons = buttonsOptions?.length > 0;
  const shouldShowExpandAction = !!expandableContent;
  const shouldShowActions = shouldShowActionButtons || shouldShowExpandAction;
  const isTitleAvailable = title;
  const isImageAvailable = src;
  const noImageAvailable = isImageAvailable ? '' : styles[noImageClass];

  return (
    <div className={cx(styles[baseClass], className)} {...divProps}>
      {isTitleAvailable && (
        <div className={cx(styles[headerClass], noImageAvailable)}>
          {isImageAvailable && (
            <img
              alt={alt}
              className={styles[`${headerClass}__image`]}
              src={src}
            />
          )}
          <div className={styles[headingClass]}>
            <Heading size="xs" className={styles[`${headingClass}__title`]}>
              {title}
            </Heading>
            <Text size="sm" className={styles[`${headingClass}__description`]}>
              {description}
            </Text>
          </div>
        </div>
      )}
      <Text as="div" size="md" className={styles[`${baseClass}__content`]}>
        {children}
      </Text>
      {isExpanded && (
        <Text
          as="div"
          size="md"
          className={styles[`${baseClass}__expanded-content`]}
        >
          {expandableContent}
        </Text>
      )}
      {shouldShowActions && (
        <div className={styles[actionsClass]}>
          <div className={styles[`${actionsClass}__line`]} />
          <div className={styles[`${actionsClass}__buttons`]}>
            {shouldShowActionButtons &&
              buttonsOptions.map(
                ({ kind, onClick, children: buttonChildren }) => (
                  <Button size="compact" kind={kind} onClick={onClick}>
                    {buttonChildren}
                  </Button>
                )
              )}
            {shouldShowExpandAction && (
              <Button
                className={styles[`${actionsClass}__buttons-expander`]}
                kind="link"
                iconPosition="right"
                icon={<Icon source={expandIcon} />}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {expandButtonText}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
