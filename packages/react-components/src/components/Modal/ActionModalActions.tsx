import * as React from 'react';
import cx from 'classnames';

export type IActionModalActionsProps = React.HTMLAttributes<HTMLDivElement>;

const baseClass = 'lc-action-modal__actions';

export const ActionModalActions: React.FC<IActionModalActionsProps> = ({
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
