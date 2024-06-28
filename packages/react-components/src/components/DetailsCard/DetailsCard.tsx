import * as React from 'react';

import { ChevronRight } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Heading } from '../Typography';

import styles from './DetailsCard.module.scss';

export interface IDetailsCardProps {
  /**
   * The CSS class for card container
   */
  className?: string;
  /**
   * Additional element for the label on the left
   */
  leftNode?: React.ReactNode;
  /**
   * Additional element for the label on the right
   */
  rightNode?: React.ReactNode;
  /**
   * Set the label
   */
  label: React.ReactNode;
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
  /**
   * Callback function called when the card label is clicked
   */
  onClick?: () => void;
}

const baseClass = 'details-card';

export const DetailsCard: React.FC<
  React.PropsWithChildren<IDetailsCardProps>
> = ({
  children,
  className,
  leftNode,
  rightNode,
  label,
  withDivider,
  fullSpaceContent,
  openOnInit = false,
  hideLabelOnOpen,
  onClick,
}) => {
  const [isOpen, setIsOpen] = React.useState(openOnInit);
  const [size, setSize] = React.useState(0);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const mergedClassNames = cx(
    styles[baseClass],
    withDivider && styles[`${baseClass}--with-divider`],
    className
  );
  const isLabelHidden = hideLabelOnOpen && isOpen;
  const isTextContent = typeof label === 'string';

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    setIsOpen((prevValue) => !prevValue);
    e.currentTarget.blur();
    onClick?.();
  };

  React.useEffect(() => {
    const hasIOSupport = !!window.IntersectionObserver;

    if (contentRef.current && hasIOSupport) {
      const resizeObserver = new ResizeObserver(() => {
        if (contentRef.current && size !== contentRef.current.offsetHeight) {
          setSize(contentRef.current.offsetHeight);
        }
      });

      resizeObserver.observe(contentRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [contentRef]);

  return (
    <div className={mergedClassNames}>
      <div
        className={cx(
          styles[`${baseClass}__label-wrapper`],
          hideLabelOnOpen && styles[`${baseClass}__label-wrapper--fading`],
          isLabelHidden && styles[`${baseClass}__label-wrapper--hide`],
          isOpen && styles[`${baseClass}__label-wrapper--open`]
        )}
        aria-expanded={isOpen}
        aria-hidden={isLabelHidden}
        data-testid="details-card-label"
      >
        <div
          className={cx(
            styles[`${baseClass}__label`],
            hideLabelOnOpen && styles[`${baseClass}__label--with-margin`]
          )}
        >
          {leftNode && (
            <div className={styles[`${baseClass}__label__left-node`]}>
              {leftNode}
            </div>
          )}
          {isTextContent ? (
            <Heading
              size="xs"
              className={styles[`${baseClass}__label__content`]}
            >
              {label}
            </Heading>
          ) : (
            <div className={styles[`${baseClass}__label__content`]}>
              {label}
            </div>
          )}
          {rightNode && (
            <div className={styles[`${baseClass}__label__right-node`]}>
              {rightNode}
            </div>
          )}
        </div>
      </div>
      <Button
        kind={isOpen && hideLabelOnOpen ? 'float' : 'text'}
        icon={
          <Icon
            source={ChevronRight}
            className={cx(
              styles[`${baseClass}__button__icon`],
              isOpen && styles[`${baseClass}__button__icon--open`]
            )}
          />
        }
        className={cx(
          styles[`${baseClass}__button`],
          !isOpen && styles[`${baseClass}__button--closed`],
          isOpen && styles[`${baseClass}__button--open`],
          hideLabelOnOpen && styles[`${baseClass}__button--fading`]
        )}
        onClick={handleButtonClick}
        aria-expanded={isOpen}
      />
      <div>
        <div
          className={cx(
            styles[`${baseClass}__content-wrapper`],
            isOpen && styles[`${baseClass}__content-wrapper--open`]
          )}
          style={{
            maxHeight: isOpen ? size : 0,
          }}
        >
          <div
            ref={contentRef}
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
    </div>
  );
};
