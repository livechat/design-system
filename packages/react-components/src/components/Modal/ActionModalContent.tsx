import * as React from 'react';
import cx from 'classnames';

export type IActionModalContentProps = React.HTMLAttributes<HTMLDivElement>;

const baseClass = 'lc-action-modal__content';

export const ActionModalContent: React.FC<IActionModalContentProps> = ({
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
