import * as React from 'react';

import { ChevronRight } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Heading } from '../Typography';

import * as styles from './styles';

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
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>
  ) => void;
}

const NON_INTERACTIVE_TAGS = ['input', 'button', 'select', 'textarea', 'a'];

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
  const mergedClassNames = cx(styles.baseStyles(withDivider), className);
  const isLabelHidden = hideLabelOnOpen && isOpen;
  const isTextContent = typeof label === 'string';

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    setIsOpen((prevValue) => !prevValue);
    e.currentTarget.blur();
    onClick?.(e);
  };

  const handleLabelClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement;
    const targetTagName = target.tagName.toLowerCase();

    if (!NON_INTERACTIVE_TAGS.includes(targetTagName)) {
      setIsOpen((prevValue) => !prevValue);
      onClick?.(e);
    }
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
        className={styles.labelWrapper(hideLabelOnOpen, isLabelHidden)}
        aria-expanded={isOpen}
        aria-hidden={isLabelHidden}
        data-testid="details-card-label"
        onClick={handleLabelClick}
      >
        <div className={styles.label(hideLabelOnOpen)}>
          {leftNode && <div className={styles.leftNode}>{leftNode}</div>}
          {isTextContent ? (
            <Heading size="xs" className={styles.contentLabel}>
              {label}
            </Heading>
          ) : (
            <div className={styles.contentLabel}>{label}</div>
          )}
          {rightNode && <div className={styles.rightNode}>{rightNode}</div>}
        </div>
      </div>
      <Button
        kind={isOpen && hideLabelOnOpen ? 'float' : 'text'}
        icon={
          <Icon
            source={ChevronRight}
            className={styles.buttonWithIcon(isOpen)}
          />
        }
        className={cx(styles.button(isOpen, hideLabelOnOpen), {
          [styles.FADING_BUTTON_CLASS]: hideLabelOnOpen,
        })}
        onClick={handleButtonClick}
        aria-expanded={isOpen}
      />
      <div>
        <div
          className={styles.contentWrapper(isOpen)}
          style={{
            maxHeight: isOpen ? size : 0,
          }}
        >
          <div
            ref={contentRef}
            className={styles.content(fullSpaceContent, hideLabelOnOpen)}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
