import * as React from 'react';
import cx from 'classnames';

export type IModalBodyProps = React.HTMLAttributes<HTMLDivElement>;

const baseClass = 'lc-modal__body';

export const ModalBody: React.FC<IModalBodyProps> = ({
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
