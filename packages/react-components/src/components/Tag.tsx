import * as React from 'react';
import cx from 'classnames';
import { getContrast } from 'polished';
import { Close } from '@livechat/design-system-icons/dist/material';
import { Text } from './Text';
import Icon, { IconSizeName } from './Icon';

const baseClass = 'lc-tag';

export interface ITagProps extends React.HTMLAttributes<HTMLDivElement> {
  kind?: 'default' | 'info' | 'warning' | 'success' | 'error';
  size?: 'medium' | 'large';
  customColor?: string;
  dismissible?: boolean;
  outline?: boolean;
  onRemove?(): void;
  icon?: React.FC<React.SVGProps<SVGSVGElement>> | string;
  avatar?: string;
}

const getCustomTextClass = (customColor?: string) => {
  if (!customColor) {
    return '';
  }
  return getContrast(customColor, '#FFFFFF') > 4.5
    ? 'text-white'
    : 'text-black';
};

export const Tag: React.FC<ITagProps> = ({
  className = '',
  children,
  dismissible = false,
  size = 'medium',
  kind = 'default',
  onRemove,
  outline = false,
  icon,
  avatar,
  customColor,
  ...restProps
}) => {
  const mergedClassNames = cx(
    baseClass,
    className,
    `${baseClass}--${size}`,
    `${baseClass}--${kind}`,
    {
      [`${baseClass}--dismissible`]: dismissible,
      [`${baseClass}--outline`]: outline,
      [`${baseClass}--with-icon`]: !!icon || !!avatar,
      [`${baseClass}--${getCustomTextClass(customColor)}`]: !!customColor,
    }
  );

  const getCustomColorStyles = () => {
    if (!customColor) {
      return {};
    }
    if (outline) {
      return {
        style: {
          'background-color': 'transparent',
          color: customColor,
          'border-color': customColor,
        },
      };
    }
    return { style: { 'background-color': customColor } };
  };

  return (
    <Text
      className={mergedClassNames}
      {...restProps}
      {...getCustomColorStyles()}
      as="div"
      size="md"
    >
      {avatar && (
        <img className={`${baseClass}__avatar`} src={avatar} alt="tag-avatar" />
      )}{' '}
      {/*TODO replace with Avatar component*/}
      {icon && !avatar && (
        <Icon
          className={`${baseClass}__icon`}
          source={icon}
          size={IconSizeName.Small}
        />
      )}
      {children}
      {dismissible && (
        <button
          title="Remove"
          onClick={onRemove}
          type="button"
          className={`${baseClass}__remove`}
        >
          <Icon source={Close} size={IconSizeName.Medium} />
        </button>
      )}
    </Text>
  );
};
