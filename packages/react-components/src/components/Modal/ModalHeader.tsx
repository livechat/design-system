import * as React from 'react';
import cx from 'classnames';
import { Heading } from '../Heading';

export type IModalHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const baseClass = 'lc-modal';

export const ModalHeader: React.FC<IModalHeaderProps> = ({
  children,
  className = '',
}) => {
  const mergedClassNames = cx(`${baseClass}__header`, className);

  return (
    <div className={mergedClassNames}>
      <Heading size="sm" as="div" className={`${baseClass}__heading`}>
        {children}
      </Heading>
    </div>
  );
};
