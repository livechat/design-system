import { FC } from 'react';

import { ComponentCoreProps } from '../../../../../utils/types';

import styles from './InteractiveGrid.module.scss';

interface IGridComponentProps extends ComponentCoreProps {}

const gridWrapperBaseClass = `grid-wrapper`;
export const GridWrapper: FC<IGridComponentProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`${styles[gridWrapperBaseClass]} ${className || ''}`}>
      {children}
    </div>
  );
};

const GridComponent: FC<
  IGridComponentProps & { baseClass: string; role?: string }
> = ({ children, className, baseClass, role = 'presentation' }) => (
  <div role={role} className={`${styles[baseClass]} ${className || ''}`}>
    {children}
  </div>
);

export const GridRow: FC<IGridComponentProps> = (props) => (
  <GridComponent {...props} baseClass="grid-row" />
);

export const GridCol: FC<IGridComponentProps> = (props) => (
  <GridComponent {...props} baseClass="grid-col" />
);
