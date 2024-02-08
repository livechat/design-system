import * as React from 'react';

import cx from 'clsx';

import { THeadingSize } from './types';

import styles from './Typography.module.scss';

const SIZE_TO_ELEMENT_MAP = {
  xl: 'h1',
  lg: 'h2',
  md: 'h3',
  sm: 'h4',
  xs: 'h5',
  ['2xs']: 'h6',
};

interface IProps extends React.HTMLAttributes<HTMLElement> {
  size?: THeadingSize;
  /** DOM element name that will be rendered */
  as?: string;
  /** Optional custom className */
  className?: string;
  /** Optional prop to set the uppercase */
  uppercase?: boolean;
  /** Optional prop to set the bold */
  bold?: boolean;
}

export const Heading: React.FC<React.PropsWithChildren<IProps>> = ({
  as,
  size = 'md',
  children,
  className,
  uppercase,
  bold,
  ...props
}) => {
  return React.createElement(
    as || SIZE_TO_ELEMENT_MAP[size],
    {
      className: cx(
        {
          [styles[`heading-${size}`]]: true,
          [styles[`heading-uppercase`]]: uppercase,
          [styles[`heading-bold`]]: bold,
        },
        className
      ),
      ...props,
    },
    children
  );
};
