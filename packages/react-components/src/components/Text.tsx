import * as React from 'react';
import cx from 'classnames';

type TSize = 'm' | 's' | 'xs';
type TDecoriation = 'bold' | 'underline' | 'strike';

interface IProps {
  /** DOM element name that will be rendered */
  as?: string;
  size?: TSize;
  /** Optional custom className */
  className?: string;
  caps?: boolean;
  decoration?: TDecoriation;
}

function calculateClassName(
  caps: boolean,
  size: TSize,
  decoration: TDecoriation
) {
  const decorationSuffix = decoration ? `-${decoration}` : '';
  if (caps) {
    return `lc-caps` + decorationSuffix;
  }

  return `lc-p-${size}` + decorationSuffix;
}

export const Text: React.FC<IProps> = ({
  as = 'p',
  size = 'm',
  caps = false,
  decoration,
  children,
  className,
  ...props
}) => {
  return React.createElement(
    as || 'p',
    {
      className: cx(calculateClassName(caps, size, decoration), className),
      ...props,
    },
    children
  );
};
