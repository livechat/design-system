import * as React from 'react';

import { ChevronRight } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Heading } from '../Typography';

import styles from './DetailsCard.module.scss';

export interface IDetailsCardProps {
  /**
   * The CSS class for accordion container
   */
  className?: string;
  /**
   * Set the label
   */
  label: string;
  /**
   * Define if divider should be visible
   */
  withDivider?: boolean;
  /**
   * Removes the spacing inside the main container
   */
  fullSpaceContent?: boolean;
  /**
   * Set if card should be open by default
   */
  openOnInit?: boolean;
  /**
   * Set to hide the label on card open
   */
  hideLabelOnOpen?: boolean;
}

const baseClass = 'details-card';

export const DetailsCard: React.FC<IDetailsCardProps> = ({
  children,
  className,
  label,
  withDivider,
  fullSpaceContent,
  openOnInit = false,
  hideLabelOnOpen,
}) => {
  const [isOpen, setIsOpen] = React.useState(openOnInit);
  const mergedClassNames = cx(
    styles[baseClass],
    withDivider && styles[`${baseClass}--with-divider`],
    className
  );
  const isMainButtonHidden = hideLabelOnOpen && isOpen;

  const handleButtonClick = () => setIsOpen((prevValue) => !prevValue);

  return (
    <div className={mergedClassNames}>
      <button
        className={cx(
          styles[`${baseClass}__button`],
          isMainButtonHidden && styles[`${baseClass}__button--hide`]
        )}
        onClick={handleButtonClick}
        aria-expanded={isOpen}
        aria-hidden={isMainButtonHidden}
        data-testid="details-card-button"
      >
        <Heading size="xs" className={styles[`${baseClass}__button__title`]}>
          {label}
        </Heading>
        {!hideLabelOnOpen && (
          <Icon
            className={cx(
              styles[`${baseClass}__button__icon`],
              isOpen && styles[`${baseClass}__button__icon--open`]
            )}
            source={ChevronRight}
          />
        )}
      </button>
      {hideLabelOnOpen && (
        <Button
          kind={isOpen ? 'float' : 'text'}
          icon={
            <Icon
              source={ChevronRight}
              className={cx(
                styles[`${baseClass}__float-button__icon`],
                isOpen && styles[`${baseClass}__float-button__icon--open`]
              )}
            />
          }
          className={cx(
            styles[`${baseClass}__float-button`],
            !isOpen && styles[`${baseClass}__float-button--closed`],
            isOpen && styles[`${baseClass}__float-button--open`]
          )}
          onClick={handleButtonClick}
          aria-expanded={isOpen}
          data-testid="details-card-floating-button"
        />
      )}
      <div
        className={cx(
          styles[`${baseClass}__content-wrapper`],
          isOpen && styles[`${baseClass}__content-wrapper--open`]
        )}
      >
        <div
          className={cx(
            styles[`${baseClass}__content`],
            fullSpaceContent && styles[`${baseClass}__content--full-space`],
            hideLabelOnOpen && styles[`${baseClass}__content--spacing`]
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
