import * as React from 'react';
import cx from 'classnames';

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  bold: boolean;
}

const baseClass = 'lc-link';

/**
 * Place the `<Link>` inside `<Text>` component or pass custom className to set the typography styles.
 *
 * Use `lc-link` & `lc-link--bold` classes for styling custom components like `ReactRouter.Link`.
 */
export const Link: React.FC<LinkProps> = ({
  bold = false,
  className = '',
  ...rest
}) => {
  return (
    <a
      className={cx(baseClass, bold && `${baseClass}--bold`, className)}
      {...rest}
    />
  );
};
