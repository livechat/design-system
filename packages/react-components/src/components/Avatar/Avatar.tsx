import * as React from 'react';

import { Person as PersonIcon } from '@livechat/design-system-icons';
import cx from 'clsx';

import { ComponentCoreProps } from '../../utils/types';
import { Icon } from '../Icon';
import { Heading } from '../Typography';

import {
  getBackgroundColor,
  getFontColor,
  getInitials,
} from './Avatar.helpers';

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
  | 'xxlarge'
  | 'xxxlarge';
type AvatarStatus = 'available' | 'unavailable' | 'unknown';
type AvatarType = 'image' | 'text';

export interface AvatarProps extends ComponentCoreProps {
  /**
   * Alternate text for an image avatar
   */
  alt?: string;
  /**
   * Specify the background color
   */
  color?: string;
  /**
   * Specify the avatar shape
   */
  shape?: AvatarShape;
  /**
   * Specify the avatar size
   */
  size?: AvatarSize;
  /**
   * Image source for the image avatar
   */
  src?: string;
  /**
   * Displays status dot
   */
  status?: AvatarStatus;
  /**
   * Text for an text avatar
   */
  text?: string;
  /**
   * Specify the avatar type
   */
  type: AvatarType;
  /**
   * Displays rim
   */
  withRim?: boolean;
}

const baseClass = 'avatar';

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
  ...props
}) => {
  const isImproperImageSetup = type === 'image' && !src;
  const [shouldDisplayFallbackAvatar, setShouldDisplayFallbackAvatar] =
    React.useState(isImproperImageSetup);

  const shouldDisplayImage =
    type === 'image' && !!src && !shouldDisplayFallbackAvatar;
  const shouldDisplayInitials = type === 'text';

  const letterCount = ['xxxsmall', 'xxsmall', 'xsmall'].includes(size) ? 1 : 2;
  const initials = getInitials(text, letterCount);
  const isSmallSize = ['xxxsmall', 'xxsmall', 'xsmall', 'small'].includes(size);

  const backgroundColor = color || getBackgroundColor(text);
  const fontColor = backgroundColor ? getFontColor(backgroundColor) : undefined;
  const backgroundStyle = shouldDisplayInitials ? { backgroundColor } : {};

  const mergedClassNames = cx({
    [styles[baseClass]]: true,
    [styles[`${baseClass}--${shape}`]]: true,
    [styles[`${baseClass}--${size}`]]: true,
    [styles[`${baseClass}--with-rim`]]: withRim,
    ...(className ? { [`${className}`]: className } : {}),
  });
  const mergedStatusClassNames = cx(
    styles[`${baseClass}__status`],
    styles[`${baseClass}__status--${shape}`],
    styles[`${baseClass}__status--${size}`],
    ...(status ? [styles[`${baseClass}__status--${status}`]] : [])
  );
  const mergedIconClassNames = cx(
    styles[`${baseClass}__icon`],
    styles[`${baseClass}__icon--${size}`]
  );
  const mergedRimClassNames = cx(
    styles[`${baseClass}__rim`],
    styles[`${baseClass}__rim--${size}`]
  );

  const getTextSize = (size: AvatarSize) => {
    if (isSmallSize) {
      return '2xs';
    }

    if (['medium'].includes(size)) {
      return 'xs';
    }

    if (['large', 'xlarge'].includes(size)) {
      return 'sm';
    }

    if (['xxlarge'].includes(size)) {
      return 'lg';
    }

    return 'xl';
  };

  const handleError: React.ReactEventHandler<HTMLImageElement> | undefined =
    React.useCallback(() => setShouldDisplayFallbackAvatar(true), []);

  React.useEffect(() => {
    setShouldDisplayFallbackAvatar(isImproperImageSetup);
  }, [isImproperImageSetup]);

  return (
    <div className={mergedClassNames} style={backgroundStyle} {...props}>
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
        <Heading
          as="span"
          size={getTextSize(size)}
          style={{ color: fontColor }}
          bold={isSmallSize}
          uppercase={isSmallSize}
        >
          {initials}
        </Heading>
      )}
      {shouldDisplayFallbackAvatar && (
        <Icon
          data-testid={`${baseClass}__icon`}
          className={mergedIconClassNames}
          source={PersonIcon}
        />
      )}
    </div>
  );
};
