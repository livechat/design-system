import * as React from 'react';
import { Icon } from '../Icon';
import { Close } from '@livechat/design-system-icons/react/material';
import { Button, ButtonKind } from '../Button';
import { getIconType } from './helpers';
import styles from './Tooltip.module.scss';

const baseClass = 'tooltip';

export const Interactive: React.FC<{
  /**
   * The header text
   */
  header?: string;
  /**
   * The content text
   */
  text: string;
  /**
   * Use it to show the image
   */
  image?: {
    src: string;
    alt: string;
  };
  /**
   * Shows the close button with icon that triggers `handleCloseAction`
   */
  closeWithX?: boolean;
  /**
   * The kind of tooltip
   */
  theme?: 'invert' | 'important';
  /**
   * The event handler for close button
   */
  handleCloseAction?: (ev: React.MouseEvent) => void;
  /**
   * Label and event handler for the primary button
   */
  primaryButton: {
    handleClick: () => void;
    label: string;
    kind?: ButtonKind;
  };
  /**
   * Label and event handler for the secondary button
   */
  secondaryButton: {
    handleClick: () => void;
    label: string;
    kind?: ButtonKind;
  };
}> = ({
  header,
  text,
  image,
  closeWithX,
  theme,
  handleCloseAction,
  primaryButton,
  secondaryButton,
}) => (
  <div style={{ width: '270px' }}>
    {closeWithX && (
      <div className={styles[`${baseClass}-close`]}>
        <div onClick={handleCloseAction}>
          <Icon
            source={Close}
            kind={theme ? getIconType(theme) : 'primary'}
          ></Icon>
        </div>
      </div>
    )}
    {image && (
      <div style={{ margin: '0 4px' }}>
        <img
          className={styles[`${baseClass}-image`]}
          src={image.src}
          alt={image.alt}
        />
      </div>
    )}
    {header && <div className={styles[`${baseClass}-header`]}>{header}</div>}
    <div className={styles[`${baseClass}-text`]}>{text}</div>
    <div className={styles[`${baseClass}-footer`]}>
      <Button
        kind={primaryButton.kind || 'primary'}
        onClick={primaryButton.handleClick}
      >
        {primaryButton.label}
      </Button>
      <Button
        kind={secondaryButton.kind || 'secondary'}
        onClick={secondaryButton.handleClick}
      >
        {secondaryButton.label}
      </Button>
    </div>
  </div>
);
