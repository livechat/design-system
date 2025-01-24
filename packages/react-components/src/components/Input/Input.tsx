import * as React from 'react';

import {
  VisibilityOn as VisibilityOnIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@livechat/design-system-icons';
import cx from 'clsx';

import { useReadOnlyFormFieldContext } from '../../providers/ReadOnlyFormFieldProvider';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Text } from '../Typography';

import {
  IInputComponentProps,
  IInputIcon,
  IInputPromoProps,
  IInputProps,
} from './types';

import styles from './Input.module.scss';

const baseClass = 'input';

const renderIcon = (icon: IInputIcon, disabled?: boolean) =>
  React.cloneElement(icon.source, {
    ['data-testid']: `input-icon-${icon.place}`,
    className: cx(
      styles[`${baseClass}__icon`],
      styles[`${baseClass}__icon--${icon.place}`],
      {
        [styles[`${baseClass}__icon--disabled`]]: disabled,
      }
    ),
  });

export const InputComponent = React.forwardRef<
  HTMLInputElement,
  IInputComponentProps
>(
  (
    {
      error = false,
      disabled,
      icon = null,
      className,
      mainClassName,
      isPromo = false,
      cropOnBlur = true,
      noDataFallbackText = 'No data',
      ...inputProps
    },
    ref
  ) => {
    const innerRef = React.useRef<HTMLInputElement>(null);
    const { readOnly } = useReadOnlyFormFieldContext();
    const computedReadOnly = readOnly || inputProps.readOnly;

    React.useImperativeHandle(ref, () => innerRef.current!, []);
    const [isFocused, setIsFocused] = React.useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const { type, onFocus, onBlur } = inputProps;
    const mergedClassNames = cx(
      mainClassName,
      {
        [styles[`${baseClass}--disabled`]]: disabled,
        [styles[`${baseClass}--focused`]]: isFocused,
        [styles[`${baseClass}--error`]]: error,
        [styles[`${baseClass}--crop`]]: cropOnBlur,
        [styles[`${baseClass}--read-only`]]: computedReadOnly,
      },
      className
    );
    const iconCustomColor = !disabled
      ? 'var(--content-default)'
      : 'var(--content-disabled)';
    const iconSource = isPasswordVisible ? VisibilityOnIcon : VisibilityOffIcon;
    const shouldRenderLeftIcon = icon && icon.place === 'left';
    const shouldRenderRightIcon =
      icon && type !== 'password' && icon.place === 'right';

    const focusInput = () => {
      innerRef.current?.focus();
    };

    if (computedReadOnly) {
      return (
        <Text noMargin semiBold>
          {inputProps.value || noDataFallbackText}
        </Text>
      );
    }

    return (
      <Text
        as="div"
        size={isPromo ? 'lg' : 'md'}
        className={mergedClassNames}
        aria-disabled={disabled}
        tab-index="0"
        onClick={focusInput}
      >
        {shouldRenderLeftIcon && renderIcon(icon, disabled)}
        <input
          {...inputProps}
          readOnly={computedReadOnly}
          ref={innerRef}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          disabled={disabled}
          type={type && !isPasswordVisible ? type : 'text'}
        />
        {shouldRenderRightIcon && renderIcon(icon, disabled)}
        {type === 'password' && (
          <Button
            disabled={disabled}
            kind="text"
            size="compact"
            icon={<Icon customColor={iconCustomColor} source={iconSource} />}
            onClick={() => setIsPasswordVisible((v) => !v)}
            className={styles[`${baseClass}__visibility-button`]}
          />
        )}
      </Text>
    );
  }
);

export const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ inputSize = 'medium', ...props }, ref) => {
    const mainClassName = cx(
      styles[baseClass],
      styles[`${baseClass}--${inputSize}`]
    );

    return (
      <InputComponent mainClassName={mainClassName} {...props} ref={ref} />
    );
  }
);

const promoBaseClass = `${baseClass}--promo`;

export const InputPromo = React.forwardRef<HTMLInputElement, IInputPromoProps>(
  (props, ref) => {
    const mainClassName = cx(styles[baseClass], styles[promoBaseClass]);

    return (
      <InputComponent
        mainClassName={mainClassName}
        isPromo
        {...props}
        ref={ref}
      />
    );
  }
);
