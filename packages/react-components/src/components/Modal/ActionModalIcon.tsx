import * as React from 'react';
import cx from 'classnames';

export type IActionModalIconProps = React.HTMLAttributes<HTMLDivElement>;

const baseClass = 'lc-action-modal__icon';

export const ActionModalIcon: React.FC<IActionModalIconProps> = ({
  children,
  className = '',
  ...props
}) => {
  const mergedClassNames = cx(baseClass, className);

  return (
    <div {...props} className={mergedClassNames}>
      {children}
    </div>
  );
};
