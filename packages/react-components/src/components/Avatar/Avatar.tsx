import * as React from 'react';
import cx from 'clsx';
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
  const isImproperImageSetup = type === 'image' && !src;
  const [shouldDisplayFallbackAvatar, setShouldDisplayFallbackAvatar] =
    React.useState(isImproperImageSetup);

  const shouldDisplayImage =
    type === 'image' && !!src && !shouldDisplayFallbackAvatar;
  const shouldDisplayInitials = type === 'text';
  const letterCount = ['xxxsmall', 'xxsmall', 'xsmall'].includes(size) ? 1 : 2;
  const initials = getInitials(text, letterCount);
  const backgroundColor = color || defaultBackgroundColor;
  const fontColor = color ? getFontColor(color) : defaultFontColor;

  const mergedClassNames = cx({
    [styles[baseClass]]: true,
    [styles[`${baseClass}--${shape}`]]: true,
    [styles[`${baseClass}--${size}`]]: true,
    [styles[`${baseClass}--with-rim`]]: withRim,
    [`${className}`]: className,
  });
  const mergedStatusClassNames = cx(
    styles[`${baseClass}__status`],
    styles[`${baseClass}__status--${shape}`],
    styles[`${baseClass}__status--${size}`],
    styles[`${baseClass}__status--${status}`]
  );
  const mergedIconClassNames = cx(
    styles[`${baseClass}__icon`],
    styles[`${baseClass}__icon--${size}`]
  );
  const mergedRimClassNames = cx(
    styles[`${baseClass}__rim`],
    styles[`${baseClass}__rim--${size}`]
  );

  const handleError: React.ReactEventHandler<HTMLImageElement> | undefined =
    React.useCallback(() => setShouldDisplayFallbackAvatar(true), []);

  React.useEffect(() => {
    setShouldDisplayFallbackAvatar(isImproperImageSetup);
  }, [isImproperImageSetup]);

  return (
    <div className={mergedClassNames} style={{ backgroundColor }}>
      {withRim && (
        <div
          data-testid={`${baseClass}__rim`}
          className={mergedRimClassNames}
        />
      )}
      {status && (
        <div
          data-testid={`${baseClass}__status`}
          className={mergedStatusClassNames}
        />
      )}
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
          data-testid={`${baseClass}__icon`}
          className={mergedIconClassNames}
          source={PersonIcon}
          kind="primary"
        />
      )}
    </div>
  );
};
