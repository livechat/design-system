import * as React from 'react';
import cx from 'classnames';

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  bold: boolean;
}

const baseClass = 'lc-link';

/**
 * Simple component which renders an `<a>` element.
 *
 * Place the `<Link>` inside a `<Text>` component or pass a custom className to set the typography styles.
 *
 * Use `<Button kind="link">` to act as a `<button>` - <a target="_self" href="/story/components-button--kinds">see the story</a>.
 *
 * Use `<Button href="">` to display as a `<Button>` - <a target="_self" href="/story/components-button--link">see the story</a>.
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
