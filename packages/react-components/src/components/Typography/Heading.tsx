import * as React from 'react';

import cx from 'clsx';

import styles from './Typography.module.scss';

const SIZE_TO_ELEMENT_MAP = {
  xl: 'h1',
  lg: 'h2',
  md: 'h3',
  sm: 'h4',
  xs: 'h5',
};

export type THeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface IProps {
  size?: THeadingSize;
  /** DOM element name that will be rendered */
  as?: string;
  /** Optional custom className */
  className?: string;
  /** Optional prop to set the uppercase */
  uppercase?: boolean;
}

export const Heading: React.FC<React.PropsWithChildren<IProps>> = ({
  as,
  size = 'md',
  children,
  className,
  uppercase,
  ...props
}) => {
  return React.createElement(
    as || SIZE_TO_ELEMENT_MAP[size],
    {
      className: cx(
        {
          [styles[`heading-${size}`]]: true,
          [styles[`heading-uppercase`]]: uppercase,
        },
        className
      ),
      ...props,
    },
    children
  );
};
