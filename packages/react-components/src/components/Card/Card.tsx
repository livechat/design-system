import * as React from 'react';
import cx from 'clsx';
import {
  ChevronUp,
  ChevronDown,
} from '@livechat/design-system-icons/react/material';

import { Text, Heading } from '../Typography';
import { Button, ButtonProps } from '../Button';
import { Icon } from '../Icon';

import styles from './Card.module.scss';

export type CardButtonOptions = Pick<
  ButtonProps,
  'children' | 'kind' | 'onClick'
>;

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  alt?: string;
  buttonsOptions?: CardButtonOptions[];
  description?: string;
  expandableContent?: React.ReactNode;
  src?: string;
  title: string;
}

const baseClass = 'card';
const headerClass = `${baseClass}__header`;
const headingClass = `${headerClass}__heading`;
const actionsClass = `${baseClass}__actions`;

export const Card: React.FC<CardProps> = ({
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

  return (
    <div className={cx(styles[baseClass], className)} {...divProps}>
      <div className={styles[headerClass]}>
        {src && (
          <img
            alt={alt}
            className={styles[`${headerClass}__image`]}
            src={src}
          />
        )}
        <div className={styles[headingClass]}>
          <Heading size="sm" className={styles[`${headingClass}__title`]}>
            {title}
          </Heading>
          <Text size="sm" className={styles[`${headingClass}__description`]}>
            {description}
          </Text>
        </div>
      </div>
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
                kind="plain"
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
