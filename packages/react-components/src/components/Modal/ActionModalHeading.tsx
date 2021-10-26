import * as React from 'react';
import cx from 'classnames';

export type IActionModalHeadingProps = React.HTMLAttributes<HTMLHeadingElement>;

const baseClass = 'lc-action-modal__heading';

export const ActionModalHeading: React.FC<IActionModalHeadingProps> = ({
  children,
  className = '',
  ...props
}) => {
  const mergedClassNames = cx(baseClass, className);

  return (
    <h2 {...props} className={mergedClassNames}>
      {children}
    </h2>
  );
};
