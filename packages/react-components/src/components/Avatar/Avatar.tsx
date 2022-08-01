import * as React from 'react';
import clsx from 'clsx';
import { Person as PersonIcon } from '@livechat/design-system-icons/react/material';

import { Icon } from '../Icon';

import { getFontColor, getInitials } from './Avatar.helpers';
import styles from './Avatar.module.scss';

type AvatarShape = 'circle' | 'rounded-square';
type AvatarSize =
  | 'xxxsmall'
  | 'xxsmall'
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge';
type AvatarStatus = 'available' | 'unavailable' | 'unknown';
type AvatarType = 'image' | 'text';

export interface AvatarProps {
  alt?: string;
  className?: string;
  color?: string;
  shape?: AvatarShape;
  size?: AvatarSize;
  src?: string;
  status?: AvatarStatus;
  text?: string;
  type: AvatarType;
  withRim?: boolean;
}

const baseClass = 'avatar';
const defaultBackgroundColor = 'var(--surface-basic-disabled)';
const defaultFontColor = 'var(--content-subtle)';

export const Avatar: React.FC<AvatarProps> = ({
  alt,
  className,
  color,
  shape = 'circle',
  size = 'medium',
  src,
  status,
  text,
  type,
  withRim = false,
}) => {
  const [shouldDisplayFallbackAvatar, setShouldDisplayFallbackAvatar] =
    React.useState(false);

  const shouldDisplayImage = type === 'image' && !shouldDisplayFallbackAvatar;
  const shouldDisplayInitials = type === 'text';
  const letterCount = ['xxxsmall', 'xxsmall', 'xsmall'].includes(size) ? 1 : 2;
  const initials = getInitials(text, letterCount);
  const backgroundColor = color || defaultBackgroundColor;
  const fontColor = color ? getFontColor(color) : defaultFontColor;

  const mergedClassNames = clsx(
    styles[baseClass],
    styles[`${baseClass}--${shape}`],
    styles[`${baseClass}--${size}`],
    className
  );
  const mergedStatusClassNames = clsx(
    styles[`${baseClass}__status`],
    styles[`${baseClass}__status--${shape}`],
    styles[`${baseClass}__status--${size}`],
    styles[`${baseClass}__status--${status}`]
  );
  const mergedIconClassNames = clsx(
    styles[`${baseClass}__icon`],
    styles[`${baseClass}__icon--${size}`]
  );
  const mergedRimClassNames = clsx(
    styles[`${baseClass}__rim`],
    styles[`${baseClass}__rim--${size}`]
  );

  const handleError: React.ReactEventHandler<HTMLImageElement> | undefined =
    React.useCallback(() => setShouldDisplayFallbackAvatar(true), []);

  return (
    <div className={mergedClassNames} style={{ backgroundColor }}>
      {withRim && <div className={mergedRimClassNames} />}
      {status && <div className={mergedStatusClassNames} />}
      {shouldDisplayImage && (
        <img
          className={styles[`${baseClass}__image`]}
          src={src}
          alt={alt}
          onError={handleError}
        />
      )}
      {shouldDisplayInitials && (
        <span style={{ color: fontColor }}>{initials}</span>
      )}
      {shouldDisplayFallbackAvatar && (
        <Icon
          className={mergedIconClassNames}
          source={PersonIcon}
          kind="primary"
        />
      )}
    </div>
  );
};
