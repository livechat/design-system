import * as React from 'react';
import cx from 'classnames';

export type IModalFooterProps = React.HTMLAttributes<HTMLDivElement>;

const baseClass = 'lc-modal';

export const ModalFooter: React.FC<IModalFooterProps> = ({
  children,
  className = '',
}) => {
  const mergedClassNames = cx(`${baseClass}__footer`, className);

  return <div className={mergedClassNames}>{children}</div>;
};
