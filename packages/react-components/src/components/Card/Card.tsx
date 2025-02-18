import * as React from 'react';

import { ChevronUp, ChevronDown } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Button, ButtonProps } from '../Button';
import { Icon } from '../Icon';
import { Text, Heading } from '../Typography';

import * as styles from './styles';

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
  description?: React.ReactNode;
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
  const noImageAvailable = isImageAvailable ? '' : styles.cardHeaderNoImage;

  return (
    <div className={cx(styles.card, className)} {...divProps}>
      {isTitleAvailable && (
        <div className={cx(styles.cardHeader, noImageAvailable)}>
          {isImageAvailable && (
            <img alt={alt} className={styles.cardHeaderImage} src={src} />
          )}
          <div className={styles.cardHeaderHeading}>
            <Heading size="xs" className={styles.cardHeaderHeadingTitle}>
              {title}
            </Heading>
            {description && (
              <Text size="sm" className={styles.cardHeaderHeadingDescription}>
                {description}
              </Text>
            )}
          </div>
        </div>
      )}
      <Text as="div" size="md" className={styles.cardContent}>
        {children}
      </Text>
      {isExpanded && (
        <Text as="div" size="md" className={styles.cardContent}>
          {expandableContent}
        </Text>
      )}
      {shouldShowActions && (
        <div className={styles.cardActions}>
          <div className={styles.cardActionsLine} />
          <div className={styles.cardActionsButtons}>
            {shouldShowActionButtons &&
              buttonsOptions.map(
                ({ kind, onClick, children: buttonChildren }, index) => (
                  <Button
                    key={index}
                    size="compact"
                    kind={kind}
                    onClick={onClick}
                  >
                    {buttonChildren}
                  </Button>
                )
              )}
            {shouldShowExpandAction && (
              <Button
                className={styles.cardActionsButtonsExpander}
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
